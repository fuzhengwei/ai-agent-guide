/**
 * 语音朗读模块（基于微信同声传译插件 wechatsi 的 textToSpeech）
 *
 * 使用前提：小程序管理后台添加插件 wechatsi（appid: wx069ba97219f66d99），
 * 并在 app.json 注册：
 *   "plugins": { "WechatSI": { "version": "0.3.5", "provider": "wx069ba97219f66d99" } }
 *
 * 说明：
 * - wechatsi 单次 textToSpeech 有字数与频率限制，逐段合成；
 * - 页内无原生 TTS 音色选择，音色通过 lang + 不同发音风格模拟（见 VOICES）。
 * - 合成音频是临时文件路径，用 InnerAudioContext 播放。
 * - 插件未添加时（requirePlugin 抛错或返回 undefined），isSupported() 返回 false，页面降级提示。
 */

// 模块顶层不做 requirePlugin（未添加插件时整个模块会加载失败，影响阅读页）
let _si = null;
let _siChecked = false;
function si() {
  if (!_siChecked) {
    _siChecked = true;
    try {
      const p = requirePlugin('WechatSI');
      _si = (p && typeof p.textToSpeech === 'function') ? p : null;
    } catch (e) {
      _si = null;
    }
  }
  return _si;
}

function isSupported() { return si() !== null; }

// 音色选项：wechatsi 只有 zh_CN 一种女声合成，音调用 playbackRate 微调模拟不同声色
const VOICES = [
  { id: 'standard', label: '标准女声', desc: '默认，清晰自然', rateFactor: 1.0 },
  { id: 'bright',   label: '悦耳清亮', desc: '音调偏高，偏活泼', rateFactor: 1.08 },
  { id: 'deep',     label: '沉稳低沉', desc: '音调偏低，偏磁性', rateFactor: 0.92 },
];

function getVoices() { return VOICES; }

/**
 * 创建朗读引擎
 * onState({ state, index, total }) — state: 'idle'|'playing'|'paused'|'synthesizing'
 */
function createEngine(opts) {
  const onState = (opts && opts.onState) || function () {};
  const ctx = wx.createInnerAudioContext();
  ctx.obeyMuteSwitch = false;

  let segments = [];   // [{ id, text, el }]
  let index = 0;
  let state = 'idle';
  let voice = VOICES[0];
  let rate = 1.0;
  let _gen = 0; // 代际令牌，避免旧请求回调污染新会话

  function notify() {
    onState({ state, index, total: segments.length, voice, rate });
  }

  function _cleanText(t) {
    // 去掉可能导致合成失败的控制符，压缩空白
    return String(t || '')
      .replace(/[​﻿]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      // 截断过长段落（插件建议 ≤300 字/次）
      .slice(0, 300);
  }

  function _synth(text, cb) {
    const plugin = si();
    if (!plugin) { cb(new Error('plugin-not-loaded')); return; }
    const gen = _gen;
    plugin.textToSpeech({
      lang: 'zh_CN',
      content: text,
      success(res) {
        if (gen !== _gen) return;
        if (res && res.filename) cb(null, res.filename);
        else cb(new Error('empty-result'));
      },
      fail(err) {
        if (gen !== _gen) return;
        cb(err || new Error('synth-failed'));
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
    _synth(text, (err, file) => {
      if (err) {
        // 合成失败跳过该段，连续失败 5 次自动停止
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
      ctx.src = file;
      // 音色差异通过 playbackRate 微调模拟
      ctx.playbackRate = rate * voice.rateFactor;
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

    setVoice(v) {
      const found = VOICES.find(x => x.id === v);
      if (found) voice = found;
      // 播放中换音色：立即重新合成当前段
      if (state === 'playing' || state === 'synthesizing') {
        ctx.stop();
        state = 'playing';
        _speakCurrent();
      }
      notify();
    },
    getVoice() { return voice; },

    setRate(r) {
      rate = Math.min(2, Math.max(0.5, r));
      ctx.playbackRate = rate * voice.rateFactor;
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
      else if (state === 'synthesizing') { state = 'paused'; notify(); } // 下一段不再继续
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
