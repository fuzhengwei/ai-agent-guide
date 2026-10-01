// 场景3：暂停/恢复（playing 与 synthesizing 两种态）+ 主动 stop + 引擎抢占
let bgmState = { src: '', paused: true, title: '' };
global.wx = {
  getBackgroundAudioManager() {
    return {
      get src() { return bgmState.src; },
      set src(v) { bgmState.src = v; bgmState.paused = false; },
      get paused() { return bgmState.paused; },
      set title(v) { bgmState.title = v; },
      epname: '', singer: '', playbackRate: 1,
      play() { bgmState.paused = false; },
      pause() { bgmState.paused = true; this._pause && this._pause(); },
      stop() { bgmState.src = ''; bgmState.paused = true; this._stop && this._stop(); },
      onEnded(f) { this._ended = f; },
      onError(f) { this._error = f; },
      onPause(f) { this._pause = f; },
      onStop(f) { this._stop = f; },
      onPlay(f) { this._play = f; },
    };
  },
  cloud: {
    callFunction({ success }) { setImmediate(() => success({ result: { ok: true, url: 'https://mock/x.mp3' } })); },
  },
  getFileSystemManager() { return { accessSync() { throw new Error('no'); }, writeFileSync() {} }; },
  getStorageSync() { return []; },
  setStorageSync() {},
  showToast() {},
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');
const states = [];
const e1 = tts.createEngine({ chapterId: 'a', title: 'A', onState(s) { states.push('A:' + s.state + ':' + s.index); } });
e1.setSegments([{ text: '段一。' }, { text: '段二。' }]);
e1.play(0);
setTimeout(() => {
  e1.pause();               // playing → paused（bgm.pause 触发 onPause，state 已是 paused，幂等）
  console.log('after pause:', e1.getState());
  e1.resume();              // paused → playing（bgm.src 存在 → bgm.play）
  console.log('after resume:', e1.getState());
  e1.stop();                // 主动停（bgm.src 存在 → onStop 被标志消费）
  console.log('after stop:', e1.getState(), 'activeEngine cleared?');
  // 引擎抢占场景
  const e2 = tts.createEngine({ chapterId: 'b', title: 'B', onState(s) { states.push('B:' + s.state + ':' + s.index); } });
  e2.setSegments([{ text: '另一章。' }]);
  e1.play(0);               // e1 先占
  setTimeout(() => {
    e2.play(0);             // e2 抢占，e1 应被静默复位
    setTimeout(() => {
      console.log('e1 state after e2 preempts:', e1.getState(), '(idle=正确)');
      console.log('e2 state:', e2.getState());
      console.log(states.join(' | '));
      process.exit(0);
    }, 60);
  }, 60);
}, 80);
