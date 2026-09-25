/**
 * 语音朗读模块（云函数 TTS 方案 + 三级缓存）
 *
 * 播放链路：wx.cloud.callFunction('tts') → 云存储 URL / base64 → InnerAudioContext
 *
 * 三级缓存（同音色同语速同文本只合成一次）：
 *   L1 内存 Map：当前会话即时命中
 *   L2 本地文件：wx 文件系统持久化，跨启动保留，按章节清理（最多保留 3 章）
 *   L3 云存储：tts-audio/{md5}.mp3，所有用户共享，命中即返临时 URL
 *
 * 预取：播放第 N 段时后台预取 N+1/N+2 段，听感无缝
 */

const app = getApp();

// 音色选项（与云函数 VOICE_MAP 对应）
const VOICES = [
  { id: 'standard',  label: '智瑜', desc: '情感女声 · 默认', voiceType: 101001, emoji: '👩' },
  { id: 'bright',    label: '智聆', desc: '通用女声 · 清亮', voiceType: 101002, emoji: '👧' },
  { id: 'sweet',     label: '智甜', desc: '甜美女声 · 软萌', voiceType: 101016, emoji: '🍭' },
  { id: 'assistant', label: '智言', desc: '助手女声 · 亲切', voiceType: 101006, emoji: '🤖' },
  { id: 'deep',      label: '智美', desc: '客服女声 · 沉稳', voiceType: 101003, emoji: '👩‍💼' },
  { id: 'male',      label: '智云', desc: '通用男声 · 标准', voiceType: 101004, emoji: '👨' },
  { id: 'reader',    label: '智华', desc: '阅读男声 · 成熟', voiceType: 101010, emoji: '🎙️' },
  { id: 'boy',       label: '智萌', desc: '男童声 · 卡通',   voiceType: 101015, emoji: '🧒' },
];

// 试听示例语（一次合成后各级缓存都命中，重复试听几乎免费）
const PREVIEW_TEXT = '你好，我是你的学习伙伴，让我为你朗读这篇文章吧。';

const CACHE_PREFIX = 'tts-cache-v1:';
const CHAPTER_LIST_KEY = 'tts-cache-chapters';
const MAX_CACHED_CHAPTERS = 3;
// 缓存版本：与云函数 CACHE_VERSION 保持一致；升级模型/音色品质时 +1，全站旧缓存自动作废
const CACHE_VERSION = 'v1';

function getVoices() { return VOICES; }

function isSupported() {
  return !!(app && app.cloudReady && wx.cloud);
}

// 本地缓存命名用的字符串 hash（与云函数 md5 不同，本地散列够用即可）
function _hash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
}

// L2 本地缓存元数据：记录每章有哪些 key，用于按章清理（LRU，最多 MAX_CACHED_CHAPTERS 章）
function _chapterList() {
  try { return wx.getStorageSync(CHAPTER_LIST_KEY) || []; } catch (e) { return []; }
}
function _clearChapter(chId) {
  const keysKey = CACHE_PREFIX + 'keys:' + chId;
  try {
    const keys = wx.getStorageSync(keysKey) || [];
    keys.forEach(k => {
      const p = wx.getStorageSync(CACHE_PREFIX + k);
      if (p) { try { wx.getFileSystemManager().unlinkSync(p); } catch (e) {} }
      try { wx.removeStorageSync(CACHE_PREFIX + k); } catch (e) {}
    });
    wx.removeStorageSync(keysKey);
  } catch (e) {}
}
function _touchChapter(chId) {
  if (!chId) return;
  let list = _chapterList().filter(x => x !== chId);
  list.push(chId);
  while (list.length > MAX_CACHED_CHAPTERS) {
    const evicted = list.shift();
    _clearChapter(evicted);
  }
  try { wx.setStorageSync(CHAPTER_LIST_KEY, list); } catch (e) {}
}
function _saveLocal(chId, key, filePath) {
  if (!chId) return;
  const keysKey = CACHE_PREFIX + 'keys:' + chId;
  try {
    let keys = wx.getStorageSync(keysKey) || [];
    if (keys.indexOf(key) < 0) { keys.push(key); wx.setStorageSync(keysKey, keys); }
    wx.setStorageSync(CACHE_PREFIX + key, filePath);
    _touchChapter(chId);
  } catch (e) {}
}
function _loadLocal(key) {
  try {
    const p = wx.getStorageSync(CACHE_PREFIX + key);
    if (!p) return null;
    wx.getFileSystemManager().accessSync(p); // 文件可能已被系统清理
    return p;
  } catch (e) {
    try { wx.removeStorageSync(CACHE_PREFIX + key); } catch (e2) {}
    return null;
  }
}

function createEngine(opts) {
  const onState = (opts && opts.onState) || function () {};
  const chapterId = (opts && opts.chapterId) || '';
  const ctx = wx.createInnerAudioContext();
  ctx.obeyMuteSwitch = false;

  let segments = [];
  let index = 0;
  let state = 'idle';
  let voice = VOICES[0];
  let rate = 1.0;
  let _gen = 0;
  const memCache = {}; // L1: key -> filePath

  const fs = wx.getFileSystemManager();

  function notify() {
    onState({ state, index, total: segments.length, voice: voice.id, rate });
  }

  function _cleanText(t) {
    return String(t || '')
      .replace(/[​﻿]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 300);
  }

  function _key(text, v, r) {
    const rt = Math.round((r || 1) * 10) / 10;
    return _hash(`${CACHE_VERSION}|${(v || voice).voiceType}|${rt}|${text}`);
  }

  // 云函数返回（url 或 base64）→ 本地文件路径
  function _materialize(r0, key, cb) {
    const filePath = `${wx.env.USER_DATA_PATH}/tts-${key}.mp3`;
    if (r0.url) {
      wx.downloadFile({
        url: r0.url,
        filePath,
        success: (d) => {
          if (d.statusCode >= 200 && d.statusCode < 300) {
            _saveLocal(chapterId, key, filePath);
            cb(null, filePath);
          } else cb(new Error('download-' + d.statusCode));
        },
        fail: () => cb(new Error('download-failed')),
      });
      return;
    }
    if (r0.audio) {
      try {
        fs.writeFileSync(filePath, r0.audio, 'base64');
        _saveLocal(chapterId, key, filePath);
        cb(null, filePath);
      } catch (e) { cb(e); }
      return;
    }
    cb(new Error(r0.msg || 'synth-failed'));
  }

  // 取一段音频：L1 → L2 → 云函数（L3 在云函数侧）
  function _fetch(text, v, r, cb) {
    const key = _key(text, v, r);
    if (memCache[key]) return cb(null, memCache[key]);
    const local = _loadLocal(key);
    if (local) { memCache[key] = local; return cb(null, local); }
    if (!isSupported()) return cb(new Error('cloud-not-ready'));

    const gen = _gen;
    wx.cloud.callFunction({
      name: 'tts',
      data: { text, voice: (v || voice).id, rate: r || rate },
      success: (res) => {
        if (gen !== _gen) return;
        const r0 = res.result || {};
        if (!r0.ok) return cb(new Error(r0.msg || 'synth-failed'));
        _materialize(r0, key, (err, filePath) => {
          if (!err) memCache[key] = filePath;
          cb(err, filePath);
        });
      },
      fail: (err) => {
        if (gen !== _gen) return;
        cb(new Error((err && err.errMsg) || 'network-failed'));
      },
    });
  }

  // 播放中后台预取接下来两段
  function _prefetch(fromIdx) {
    if (state !== 'playing' && state !== 'synthesizing') return;
    for (let i = fromIdx + 1; i <= Math.min(fromIdx + 2, segments.length - 1); i++) {
      const seg = segments[i];
      if (!seg) continue;
      const text = _cleanText(seg.text);
      if (!text) continue;
      _fetch(text, voice, rate, () => {});
    }
  }

  function _errMsg(err) {
    const raw = (err && (err.message || err.errMsg)) || String(err || '');
    if (/missing-credentials|TTS 服务未配置/.test(raw)) return '朗读服务未配置，请联系开发者';
    if (/function not exist|FunctionName|not found/i.test(raw)) return '朗读服务未部署，请联系开发者';
    if (/cloud-not-ready/.test(raw)) return '云服务未就绪，请稍后再试';
    if (/AuthFailure|SecretId|签名|Credential/i.test(raw)) return '朗读服务密钥无效，请联系开发者';
    if (/ResourceUnavailable|未开通|not support/i.test(raw)) return '朗读服务未开通，请联系开发者';
    if (/RequestLimitExceeded|配额|quota|LimitExceeded/i.test(raw)) return '朗读额度已用完，请稍后再试';
    if (/network|timeout|fail/i.test(raw)) return '网络异常，请稍后再试';
    return '朗读失败：' + (raw || '未知错误').slice(0, 40);
  }

  function _speakCurrent() {
    if (state !== 'playing') return;
    const seg = segments[index];
    if (!seg) { stop(); onState({ state: 'finished', index, total: segments.length }); return; }
    const text = _cleanText(seg.text);
    if (!text) { index++; return _speakCurrent(); }

    state = 'synthesizing';
    notify();
    _fetch(text, voice, rate, (err, filePath) => {
      if (err) {
        engine._failCount = (engine._failCount || 0) + 1;
        // 首段失败 = 服务整体不可用，直接报真实原因；中途偶发失败跳段，连错 3 段中止
        if (engine._failCount >= 3 || engine._synthOk !== true) {
          stop();
          wx.showToast({ title: _errMsg(err), icon: 'none', duration: 3000 });
          return;
        }
        index++;
        state = 'playing';
        notify();
        return _speakCurrent();
      }
      engine._failCount = 0;
      engine._synthOk = true;
      if (state === 'synthesizing') state = 'playing';
      notify();
      ctx.src = filePath;
      ctx.playbackRate = rate;
      ctx.play();
      _prefetch(index);
    });
  }

  ctx.onEnded(() => {
    if (state !== 'playing') return;
    index++;
    _speakCurrent();
  });
  ctx.onError(() => {
    if (state !== 'playing') return;
    index++;
    _speakCurrent();
  });

  const engine = {
    setSegments(list) { segments = Array.isArray(list) ? list : []; },
    getSegments() { return segments; },
    getIndex() { return index; },
    getState() { return state; },

    setVoice(id) {
      const found = VOICES.find(x => x.id === id);
      if (found) voice = found;
      if (state === 'playing' || state === 'synthesizing') {
        ctx.stop();
        state = 'playing';
        _speakCurrent();
      }
      notify();
    },
    getVoice() { return voice; },

    setRate(r) {
      rate = Math.min(1.8, Math.max(0.6, r));
      ctx.playbackRate = rate;
      notify();
    },
    getRate() { return rate; },

    play(startIndex) {
      if (typeof startIndex === 'number') index = Math.max(0, Math.min(segments.length - 1, startIndex));
      if (!segments.length) return false;
      if (state === 'paused') { ctx.play(); state = 'playing'; notify(); return true; }
      _gen++;
      state = 'playing';
      notify();
      _speakCurrent();
      return true;
    },

    pause() {
      if (state === 'playing') { ctx.pause(); state = 'paused'; notify(); }
      else if (state === 'synthesizing') { state = 'paused'; notify(); }
    },

    resume() {
      if (state !== 'paused') return;
      state = 'playing';
      notify();
      _speakCurrent();
    },

    // 试听指定音色（独立播放通道，不影响朗读状态）
    preview(voiceId, cb) {
      const v = VOICES.find(x => x.id === voiceId) || voice;
      _fetch(PREVIEW_TEXT, v, 1.0, (err, filePath) => {
        if (err) { cb && cb(err); return; }
        const pctx = wx.createInnerAudioContext();
        pctx.obeyMuteSwitch = false;
        pctx.src = filePath;
        const cleanup = () => { try { pctx.destroy(); } catch (e) {} };
        pctx.onEnded(cleanup);
        pctx.onError(cleanup);
        pctx.play();
        cb && cb(null);
      });
    },
  };

  function stop() {
    _gen++;
    ctx.stop();
    state = 'idle';
    index = 0;
    notify();
  }

  engine.stop = stop;
  engine.destroy = function () {
    stop();
    try { ctx.destroy(); } catch (e) {}
  };

  return engine;
}

module.exports = { createEngine, getVoices, isSupported, PREVIEW_TEXT };
