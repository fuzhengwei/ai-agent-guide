// 场景5：单独验证降级路径（整章失败后应调逐段并出声）
let bgmState = { src: '', paused: true, title: '' };
let chapterFail = true, segCalls = 0;
global.wx = {
  getBackgroundAudioManager() {
    return {
      get src() { return bgmState.src; },
      set src(v) { bgmState.src = v; bgmState.paused = false; },
      get paused() { return bgmState.paused; },
      set title(v) { bgmState.title = v; },
      epname: '', singer: '', playbackRate: 1,
      play() { bgmState.paused = false; },
      pause() { bgmState.paused = true; },
      stop() { bgmState.src = ''; bgmState.paused = true; },
      onEnded(f) { this._ended = f; },
      onError(f) { this._error = f; },
      onPause(f) { this._pause = f; },
      onStop(f) { this._stop = f; },
      onPlay(f) { this._play = f; },
    };
  },
  cloud: {
    callFunction({ data, success }) {
      if (data.action === 'chapter') {
        setImmediate(() => success({ result: { ok: false, msg: 'always-fail' } }));
      } else {
        segCalls++;
        setImmediate(() => success({ result: { ok: true, url: 'https://mock/seg.mp3' } }));
      }
    },
  },
  getFileSystemManager() { return { accessSync() { throw new Error('no'); }, writeFileSync() {} }; },
  getStorageSync() { return []; },
  setStorageSync() {},
  showToast() {},
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');
const log = [];
const e = tts.createEngine({ chapterId: 'x', title: '降级测试', onState(s) { log.push(s.state + ':' + s.index); } });
e.setSegments([{ text: '一段。' }, { text: '二段。' }]);
e.play(0);
setTimeout(() => {
  console.log('segCalls(应=1):', segCalls, 'bgmSrc:', bgmState.src, 'state:', e.getState());
  console.log('序列:', log.join(' | '));
  process.exit(0);
}, 150);
