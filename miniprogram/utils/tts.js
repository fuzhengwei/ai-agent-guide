/**
 * 语音朗读模块（云函数 TTS 方案）
 *
 * 原理：wx.cloud.callFunction('tts', { text, voice, rate }) → 返回 base64 mp3
 *       → InnerAudioContext 播放临时文件
 *
 * 前置条件：
 * 1. 云开发环境已开通（project.config.json 的 cloudfunctionRoot）
 * 2. 部署 cloudfunctions/tts 到云端（右键「上传并部署：云端安装依赖」）
 * 3. 云函数环境变量配置 TENCENT_SECRET_ID / TENCENT_SECRET_KEY
 *    （腾讯云控制台 -> API 密钥管理 创建；TTS 需开通，新账号有免费额度）
 *
 * 音色选项：腾讯云 TTS VoiceType，见 VOICE_MAP
 */

const app = getApp();

// 音色选项：腾讯云 TTS VoiceType（中文女声为主，后续可扩男声 101004 智云等）
const VOICES = [
  { id: 'standard', label: '智瑜 · 女声', desc: '默认，清晰自然', voiceType: 101001 },
  { id: 'bright',   label: '智聆 · 清亮', desc: '音调偏高，偏活泼', voiceType: 101002 },
  { id: 'deep',     label: '智美 · 沉稳', desc: '音调偏低，偏磁性', voiceType: 101003 },
];

function getVoices() { return VOICES; }

function isSupported() {
  return !!(app && app.cloudReady && wx.cloud);
}

/**
 * 创建朗读引擎
 * onState({ state, index, total }) — state: 'idle'|'playing'|'paused'|'synthesizing'|'finished'
 */
function createEngine(opts) {
  const onState = (opts && opts.onState) || function () {};
  const ctx = wx.createInnerAudioContext();
  ctx.obeyMuteSwitch = false;

  let segments = [];   // [{ idx, text }]
  let index = 0;
  let state = 'idle';
  let voice = VOICES[0];
  let rate = 1.0;
  let _gen = 0; // 代际令牌，避免旧请求回调污染新会话

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

  function _synth(text, cb) {
    if (!isSupported()) { cb(new Error('cloud-not-ready')); return; }
    const gen = _gen;
    wx.cloud.callFunction({
      name: 'tts',
      data: { text, voice: voice.id, rate },
      success: (res) => {
        if (gen !== _gen) return;
        const r = res.result || {};
        if (!r.ok || !r.audio) { cb(new Error(r.msg || 'synth-failed')); return; }
        // base64 → 临时文件
        const filePath = `${wx.env.USER_DATA_PATH}/tts-${Date.now()}.mp3`;
        try {
          fs.writeFileSync(filePath, r.audio, 'base64');
          cb(null, filePath);
        } catch (e) {
          cb(e);
        }
      },
      fail: (err) => {
        if (gen !== _gen) return;
        cb(err || new Error('network-failed'));
      },
    });
  }

  function _speakCurrent() {
    if (state !== 'playing') return;
    const seg = segments[index];
    if (!seg) { stop(); onState({ state: 'finished', index, total: segments.length }); return; }
    const text = _cleanText(seg.text);
    if (!text) { index++; return _speakCurrent(); }

    state = 'synthesizing';
    notify();
    _synth(text, (err, filePath) => {
      if (err) {
        engine._failCount = (engine._failCount || 0) + 1;
        if (engine._failCount >= 5) {
          stop();
          wx.showToast({ title: '朗读服务繁忙，稍后再试', icon: 'none' });
          return;
        }
        index++;
        state = 'playing';
        notify();
        return _speakCurrent();
      }
      engine._failCount = 0;
      if (state === 'synthesizing') state = 'playing';
      notify();
      ctx.src = filePath;
      ctx.playbackRate = rate;
      ctx.play();
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

module.exports = { createEngine, getVoices, isSupported };
