/**
 * 语音朗读模块（云函数 TTS 方案 + 背景音频 + 整章合并）
 *
 * 播放链路（首选整章模式）：
 *   wx.cloud.callFunction('tts', { action: 'chapter', items, rate })
 *     → 全章段落服务端合成拼接为一个 mp3 → 云存储临时 URL → BackgroundAudioManager
 *   整章一次播放，段间不依赖 JS 接力 —— 缩小小程序/熄屏后 JS 被挂起，
 *   当前段播完仍由系统音频继续放整章，不会断。
 *
 * 兜底链路（整章合成失败/超时自动降级为逐段接力）：
 *   wx.cloud.callFunction('tts') → 单段云存储临时 URL → BackgroundAudioManager
 *   onEnded 驱动下一段（后台被挂起时会在段间断，但前台完整可用）
 *
 * ⚠️ 播放通道为 wx.getBackgroundAudioManager()（全局唯一背景音频）：
 *   - 熄屏、切到微信后台（聊天列表/其他小程序）都能继续朗读
 *   - 系统锁屏/控制中心面板显示标题，可暂停/恢复/关闭
 *   - 依赖 app.json requiredBackgroundModes: ["audio"]（体验版直接生效，正式版需审核）
 *   - 背景音频只支持网络 URL，不吃本地缓存文件
 *
 * 缓存策略：
 *   整章缓存：云存储 tts-chapter/{chapterHash}.mp3（音色+语速+全章文本共同决定）
 *   URL 会话缓存（L1）：段落/整章的临时 URL（约 2h 有效，onError 自动失效重取）
 *   本地文件缓存（L2）：仅用于音色试听（InnerAudioContext 即时播放）
 *   云存储（L3）：tts-audio/{md5}.mp3 单段，所有用户共享
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

// L2 本地缓存元数据（现仅用于试听音频）：按章 LRU，最多 MAX_CACHED_CHAPTERS 章
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

/* ===== 背景音频管理器（全局唯一，多引擎共享，事件派发给活跃引擎） ===== */
let bgm = null;
let activeEngine = null;

function ensureBgm() {
  if (bgm) return bgm;
  bgm = wx.getBackgroundAudioManager();
  bgm.epname = 'AI Agent 通识教程';
  bgm.singer = 'AI 朗读';
  bgm.onEnded(() => { if (activeEngine) activeEngine._onBgmEnded(); });
  bgm.onError(() => { if (activeEngine) activeEngine._onBgmError(); });
  bgm.onPause(() => { if (activeEngine) activeEngine._onBgmPaused(); });
  bgm.onStop(() => { if (activeEngine) activeEngine._onBgmStopped(); });
  bgm.onPlay(() => { if (activeEngine) activeEngine._onBgmPlay(); });
  return bgm;
}

function createEngine(opts) {
  const onState = (opts && opts.onState) || function () {};
  const chapterId = (opts && opts.chapterId) || '';
  let chapterTitle = (opts && opts.title) || '语音朗读';

  let segments = [];
  let index = 0;
  let state = 'idle';
  let voice = VOICES[0];
  let rate = 1.0;
  let _gen = 0;
  const urlCache = {};   // L1: cacheKey -> 云存储临时 URL（会话内，约 2h 有效）
  const fs = wx.getFileSystemManager();

  // 长文本分段播放（>280 字的段落切句连播）——仅逐段兜底模式用
  let chunks = null;      // 当前段的分句数组；null = 普通段
  let chunkIdx = 0;
  let chunkVoice = null;
  let _lastKey = '';      // 当前播放的 cache key（onError 失效 URL 缓存用）
  let _intentionalStop = false; // 引擎主动 stop 标志（区分系统面板停止）
  let _errCount = 0;      // 连续错误计数（防死循环）

  // 整章合并模式状态
  let wholeMode = false;      // true = 整章一个音频播放中（无段间接力）
  let _chapterJob = 0;        // 整章合成请求序号（竞态保护）
  let _chapterUrlCache = {};  // chapterHash -> { url, time }（临时 URL 会话缓存）
  let _pendingWhole = false;  // 整章合成进行中标记

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

  function _splitLong(text) {
    const t = String(text || '').trim();
    if (t.length <= 280) return [t];
    const parts = t.split(/(?<=[。！？；!?;])/);
    const out = [];
    let cur = '';
    parts.forEach(p => {
      if ((cur + p).length > 280) { if (cur) out.push(cur); cur = p; }
      else cur += p;
    });
    if (cur) out.push(cur);
    // 兜底：单句仍超限则硬切
    const final = [];
    out.forEach(p => {
      while (p.length > 280) { final.push(p.slice(0, 280)); p = p.slice(280); }
      if (p) final.push(p);
    });
    return final;
  }

  function _key(text, v, r) {
    const rt = Math.round((r || 1) * 10) / 10;
    return _hash(`${CACHE_VERSION}|${(v || voice).voiceType}|${rt}|${text}`);
  }

  /* ===== 整章合并模式 ===== */

  // 章节归一化 + hash：与云函数 tts-chapter 缓存 key 对应（仅用于本地 URL 缓存索引）
  function _chapterHashOf(list, r) {
    const rt = Math.round((r || 1) * 10) / 10;
    const parts = [];
    for (const seg of list) {
      const t = _cleanText(seg.text);
      if (!t) continue;
      const vt = (_segVoice(seg) || voice).voiceType;
      parts.push(vt + ':' + t);
    }
    return _hash(`${CACHE_VERSION}|ch|${rt}|` + parts.join('\u0001'));
  }

  // 请求整章合并音频：成功返回 url；失败/超时走 cb(err) 由调用方降级逐段
  function _fetchChapterUrl(list, cb) {
    if (!isSupported()) return cb(new Error('cloud-not-ready'));
    const rateR = Math.round(rate * 10) / 10;
    const chHash = _chapterHashOf(list, rateR);
    const cached = _chapterUrlCache[chHash];
    if (cached && Date.now() - cached.time < 90 * 60 * 1000) {  // 临时 URL 2h 有效，取 1.5h 内的
      return cb(null, cached.url, chHash);
    }
    const items = [];
    for (const seg of list) {
      const t = String(seg.text || '').trim();
      if (t) items.push({ text: t, voice: (seg.voice ? (_segVoice(seg).id) : voice.id) });
    }
    if (!items.length) return cb(new Error('no-content'));
    const job = ++_chapterJob;
    _pendingWhole = true;
    // 云函数超时保护：整章合成最多等 25s，超时降级逐段
    let settled = false;
    const timer = setTimeout(() => {
      if (settled || job !== _chapterJob) return;
      settled = true;
      _pendingWhole = false;
      cb(new Error('chapter-timeout'));
    }, 25000);
    wx.cloud.callFunction({
      name: 'tts',
      data: { action: 'chapter', items, rate: rateR },
      success: (res) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        _pendingWhole = false;
        if (job !== _chapterJob) return;
        const r0 = res.result || {};
        if (!r0.ok || !r0.url) return cb(new Error(r0.msg || 'chapter-failed'));
        _chapterUrlCache[chHash] = { url: r0.url, time: Date.now() };
        cb(null, r0.url, chHash);
      },
      fail: (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        _pendingWhole = false;
        if (job !== _chapterJob) return;
        cb(new Error((err && err.errMsg) || 'chapter-network-failed'));
      },
    });
  }

  // base64 兜底：客户端把音频转存云存储（与云函数同路径，下次服务端即命中）换临时 URL
  function _uploadForUrl(filePath, key, cb) {
    wx.cloud.uploadFile({
      cloudPath: `tts-audio/${key}.mp3`,
      filePath,
      success: (up) => {
        if (!up.fileID) return cb(new Error('upload-failed'));
        wx.cloud.getTempFileURL({ fileList: [up.fileID] }).then((res) => {
          const f = (res.fileList || [])[0];
          if (f && f.status === 0 && f.tempFileURL) cb(null, f.tempFileURL);
          else cb(new Error('temp-url-failed'));
        }).catch(() => cb(new Error('temp-url-failed')));
      },
      fail: () => cb(new Error('upload-failed')),
    });
  }

  // 取一段音频的播放 URL：L1 URL 缓存 → 云函数（L3 云存储在服务端命中）
  // 背景音频只能播网络 URL，正文播放不再走本地文件缓存
  function _fetchUrl(text, v, r, cb) {
    const key = _key(text, v, r);
    if (urlCache[key]) return cb(null, urlCache[key], key);
    if (!isSupported()) return cb(new Error('cloud-not-ready'));

    const gen = _gen;
    wx.cloud.callFunction({
      name: 'tts',
      data: { text, voice: (v || voice).id, rate: r || rate },
      success: (res) => {
        if (gen !== _gen) return;
        const r0 = res.result || {};
        if (!r0.ok) return cb(new Error(r0.msg || 'synth-failed'));
        if (r0.url) {
          urlCache[key] = r0.url;
          return cb(null, r0.url, key);
        }
        // 云函数返回 base64（服务端上传云存储失败时的兜底）：客户端转存换 URL
        if (r0.audio) {
          const fp = `${wx.env.USER_DATA_PATH}/tts-${key}.mp3`;
          try {
            fs.writeFileSync(fp, r0.audio, 'base64');
            _saveLocal(chapterId, key, fp);
          } catch (e) { /* 写本地失败不影响转存 */ }
          _uploadForUrl(fp, key, (err, url) => {
            if (!err && url) urlCache[key] = url;
            cb(err, url, key);
          });
          return;
        }
        cb(new Error(r0.msg || 'synth-failed'));
      },
      fail: (err) => {
        if (gen !== _gen) return;
        cb(new Error((err && err.errMsg) || 'network-failed'));
      },
    });
  }

  // 取一段音频的本地文件（仅供音色试听的 InnerAudioContext 即时播放）
  function _fetchLocal(text, v, r, cb) {
    const key = _key(text, v, r);
    const filePath = `${wx.env.USER_DATA_PATH}/tts-${key}.mp3`;
    try {
      fs.accessSync(filePath);
      return cb(null, filePath);
    } catch (e) { /* 未缓存，继续 */ }
    if (!isSupported()) return cb(new Error('cloud-not-ready'));

    wx.cloud.callFunction({
      name: 'tts',
      data: { text, voice: (v || voice).id, rate: r || rate },
      success: (res) => {
        const r0 = res.result || {};
        if (!r0.ok) return cb(new Error(r0.msg || 'synth-failed'));
        if (r0.audio) {
          try {
            fs.writeFileSync(filePath, r0.audio, 'base64');
            _saveLocal(chapterId, key, filePath);
            return cb(null, filePath);
          } catch (e) { return cb(e); }
        }
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
        cb(new Error('synth-failed'));
      },
      fail: (err) => cb(new Error((err && err.errMsg) || 'network-failed')),
    });
  }

  function _segVoice(seg) {
    // 段级音色（双角色对话讲解用）：段对象带 voice 字段则按段合成，否则用引擎当前音色
    if (seg && seg.voice) {
      return VOICES.find(x => x.id === seg.voice) || voice;
    }
    return voice;
  }

  // 背景音频播放：设置 src 即自动播放（勿再调 play()，会打断）
  function _bgmPlay(url, displayTitle) {
    const m = ensureBgm();
    m.title = displayTitle || `${chapterTitle} ${index + 1}/${segments.length}`;
    m.playbackRate = rate;
    m.src = url;
  }

  // 播放中预取接下来两段的 URL（chunk 模式预取当前段的后续分句）
  function _prefetchUrl() {
    if (state !== 'playing' && state !== 'synthesizing') return;
    if (chunks) {
      for (let i = chunkIdx; i < Math.min(chunkIdx + 2, chunks.length); i++) {
        const text = _cleanText(chunks[i]);
        if (text) _fetchUrl(text, chunkVoice, rate, () => {});
      }
      return;
    }
    for (let i = index + 1; i <= Math.min(index + 2, segments.length - 1); i++) {
      const seg = segments[i];
      if (!seg) continue;
      const text = _cleanText(seg.text);
      if (!text) continue;
      _fetchUrl(text, _segVoice(seg), rate, () => {});
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

  // 段错误处理：连错 3 段中止（防死循环）；单次错误跳段
  function _segFail(err) {
    _errCount++;
    if (_errCount >= 3) {
      stop();
      wx.showToast({ title: _errMsg(err), icon: 'none', duration: 3000 });
      return true;
    }
    return false;
  }

  function _speakCurrent() {
    if (state !== 'playing') return;
    const seg = segments[index];
    if (!seg) { stop(); onState({ state: 'finished', index, total: segments.length }); return; }
    // 长文本（如面试讲解的完整解析）切句连播，不再被 300 字截断
    const rawText = String(seg.text || '').trim();
    if (rawText.length > 280) {
      chunks = _splitLong(rawText);
      chunkIdx = 0;
      chunkVoice = _segVoice(seg);
      _playChunk();
      return;
    }
    const text = _cleanText(seg.text);
    if (!text) { index++; return _speakCurrent(); }
    state = 'synthesizing';
    notify();
    _fetchUrl(text, _segVoice(seg), rate, (err, url, key) => {
      // 过期回调已由 _fetchUrl 内部 gen 检查拦截，这里不能引用未定义的 gen
      if (err) {
        if (_segFail(err)) return;
        index++;
        state = 'playing';
        notify();
        return _speakCurrent();
      }
      _errCount = 0;
      _lastKey = key;
      state = 'playing';
      notify();
      _bgmPlay(url);
      _prefetchUrl();
    });
  }

  // 播放当前 chunk（chunks/chunkIdx 由调用方维护）
  function _playChunk() {
    if (chunkIdx >= chunks.length) {
      // 本段所有分句播完 → 下一段
      chunks = null;
      chunkIdx = 0;
      index++;
      return _speakCurrent();
    }
    const text = _cleanText(chunks[chunkIdx]);
    if (!text) { chunkIdx++; return _playChunk(); }
    state = 'synthesizing';
    notify();
    _fetchUrl(text, chunkVoice, rate, (err, url, key) => {
      // 过期回调已由 _fetchUrl 内部 gen 检查拦截
      if (err) {
        if (_segFail(err)) return;
        chunkIdx++;
        state = 'playing';
        return _playChunk();
      }
      _errCount = 0;
      _lastKey = key;
      state = 'playing';
      notify();
      _bgmPlay(url);
      _prefetchUrl();
    });
  }

  /* ===== 背景音频事件派发（ensureBgm 统一转发到活跃引擎） ===== */
  const engine = {
    _onBgmEnded() {
      if (state !== 'playing') return;
      // 整章模式：全章音频播完 = 朗读完成
      if (wholeMode) {
        wholeMode = false;
        stop();
        onState({ state: 'finished', index: segments.length - 1, total: segments.length });
        return;
      }
      if (chunks) {
        // 长段切句连播：先推进分句游标，还有剩余分句则继续；全播完再下一段
        chunkIdx++;
        if (chunkIdx < chunks.length) return _playChunk();
        chunks = null;
        chunkIdx = 0;
      }
      index++;
      _speakCurrent();
    },

    _onBgmError() {
      if (state !== 'playing') return;
      // 整章模式失败（URL 过期等）：清缓存重取一次；再失败降级逐段
      if (wholeMode) {
        wholeMode = false;
        for (const k of Object.keys(_chapterUrlCache)) delete _chapterUrlCache[k];
        const myGen = _gen;
        _fetchChapterUrl(segments, (err, url) => {
          if (myGen !== _gen) return;
          if (err || !url || state !== 'playing') {
            // 降级逐段
            if (state === 'playing') { wholeMode = false; _speakCurrent(); }
            return;
          }
          _bgmPlay(url, `${chapterTitle} · 全文朗读`);
        });
        return;
      }
      // 逐段模式：URL 过期/加载失败，清缓存重取当前段；同一处连错 3 次中止
      if (_lastKey) delete urlCache[_lastKey];
      _errCount++;
      if (_errCount >= 3) {
        stop();
        wx.showToast({ title: '播放失败，请稍后重试', icon: 'none', duration: 3000 });
        return;
      }
      if (chunks) return _playChunk();
      _speakCurrent();
    },

    _onBgmPaused() {
      // 系统面板暂停 / 引擎 pause() 都会走到这里
      if (state === 'playing') { state = 'paused'; notify(); }
    },

    _onBgmStopped() {
      if (_intentionalStop) { _intentionalStop = false; return; }
      // 用户在系统音乐面板点了关闭/停止
      state = 'idle';
      index = 0;
      chunks = null;
      chunkIdx = 0;
      wholeMode = false;
      notify();
    },

    _onBgmPlay() {
      // 系统面板点播放恢复
      if (state === 'paused') { state = 'playing'; notify(); }
    },

    // 被其他页面引擎抢占 bgm 时，静默复位自己
    _release() {
      state = 'idle';
      index = 0;
      chunks = null;
      chunkIdx = 0;
      wholeMode = false;
      notify();
    },

    setSegments(list) { segments = Array.isArray(list) ? list : []; },
    getSegments() { return segments; },
    getIndex() { return index; },
    getState() { return state; },

    // 同页切章时更新锁屏面板标题
    setTitle(t) { if (t) chapterTitle = String(t); },

    setVoice(id) {
      const found = VOICES.find(x => x.id === id);
      if (found) voice = found;
      if (state === 'playing' || state === 'synthesizing') {
        chunks = null;
        chunkIdx = 0;
        state = 'playing';
        // 整章模式换音色：整章缓存 key 含音色，重取即得新音色音频
        if (wholeMode) {
          const myGen = _gen;
          _fetchChapterUrl(segments, (err, url) => {
            if (myGen !== _gen) return;
            if (err || !url || state !== 'playing') return;
            _bgmPlay(url, `${chapterTitle} · 全文朗读`);
          });
        } else {
          _speakCurrent();  // 逐段模式：用新音色重播当前段
        }
      }
      notify();
    },
    getVoice() { return voice; },

    setRate(r) {
      rate = Math.min(1.8, Math.max(0.6, r));
      try { ensureBgm().playbackRate = rate; } catch (e) {}
      notify();
    },
    getRate() { return rate; },

    play(startIndex) {
      if (typeof startIndex === 'number') index = Math.max(0, Math.min(segments.length - 1, startIndex));
      if (!segments.length) return false;
      // 抢占：bgm 全局唯一，接管前把旧引擎静默复位
      if (activeEngine && activeEngine !== engine) activeEngine._release();
      activeEngine = engine;
      ensureBgm();
      if (state === 'paused' && bgm.src) { state = 'playing'; bgm.play(); notify(); return true; }
      _gen++;
      state = 'playing';
      notify();
    // 首选整章合并模式：一次播放全章，段间无 JS 接力 → 缩小小程序/熄屏不断播
      // 仅纯文本段可合并（带段级 voice 的双角色对话走逐段模式保留音色切换）
      const mergeable = segments.every(s => !s.voice);
      if (mergeable) {
        wholeMode = true;
        const myGen = _gen;
        state = 'synthesizing';   // 整章准备中（面板显示合成中）
        notify();
        _fetchChapterUrl(segments, (err, url) => {
          if (myGen !== _gen) return;   // 期间 stop/重播过，放弃
          if (err || !url) {
            // 降级：逐段接力模式（整章合成失败/超时）
            wholeMode = false;
            if (state === 'playing' || state === 'synthesizing') {
              // _speakCurrent 有 state==='playing' 守卫，synthesizing 时需先复位再进入
              state = 'playing';
              _speakCurrent();
            }
            return;
          }
          if (state !== 'playing' && state !== 'synthesizing') return;
          state = 'playing';
          notify();
          _bgmPlay(url, `${chapterTitle} · 全文朗读`);
        });
        return true;
      }
      // 双角色对话（段级音色）：逐段接力播放
      wholeMode = false;
      _speakCurrent();
      return true;
    },

    pause() {
      if (state === 'playing') {
        try { ensureBgm().pause(); } catch (e) {}
        state = 'paused'; notify();
      } else if (state === 'synthesizing') {
        // 还在取 URL：停掉 bgm（可能有上一段残留），回停后 resume 从段头重来
        if (bgm && bgm.src) _intentionalStop = true;
        try { ensureBgm().stop(); } catch (e) {}
        state = 'paused'; notify();
      }
    },

    resume() {
      if (state !== 'paused') return;
      state = 'playing';
      if (bgm && bgm.src && bgm.paused) { bgm.play(); notify(); return; }
      // synthesizing 时暂停的：重新合成播放当前段/分句
      if (chunks) return _playChunk();
      _speakCurrent();
    },

    // 试听指定音色（独立 InnerAudioContext 通道，本地缓存即时播放，不影响朗读状态）
    preview(voiceId, cb) {
      const v = VOICES.find(x => x.id === voiceId) || voice;
      _fetchLocal(PREVIEW_TEXT, v, 1.0, (err, filePath) => {
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
    _chapterJob++;            // 作废在途的整章合成回调
    _pendingWhole = false;
    // bgm 有音频时 stop() 会触发 onStop 事件，标志交给事件消费；
    // 无音频时不会有 onStop，直接复位，避免标志残留吞掉后续系统面板停止事件
    if (bgm && bgm.src) _intentionalStop = true;
    try { ensureBgm().stop(); } catch (e) {}
    if (activeEngine === engine) activeEngine = null;
    state = 'idle';
    index = 0;
    chunks = null;
    chunkIdx = 0;
    wholeMode = false;
    notify();
  }

  engine.stop = stop;
  engine.destroy = function () {
    stop();
  };

  return engine;
}

module.exports = { createEngine, getVoices, isSupported, PREVIEW_TEXT };
