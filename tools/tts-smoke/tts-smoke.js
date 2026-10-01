// 轻量模拟测试：mock wx 环境，驱动引擎状态机跑一遍
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
      pause() { bgmState.paused = true; },
      stop() { bgmState.src = ''; bgmState.paused = true; },
      _handlers: {},
      onEnded(f) { this._handlers.ended = f; },
      onError(f) { this._handlers.error = f; },
      onPause(f) { this._handlers.pause = f; },
      onStop(f) { this._handlers.stop = f; },
      onPlay(f) { this._handlers.play = f; },
    };
  },
  cloud: {
    callFunction({ data, success }) {
      // 模拟云函数命中缓存返 URL
      setImmediate(() => success({ result: { ok: true, url: 'https://mock.example/tts.mp3', cached: true } }));
    },
  },
  getFileSystemManager() { return { accessSync() { throw new Error('no file'); }, writeFileSync() {} }; },
  getStorageSync() { return []; },
  setStorageSync() {},
  showToast() {},
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');
const engine = tts.createEngine({
  chapterId: 'test', title: '测试章节',
  onState(s) {
    console.log('[state]', s.state, 'index=' + s.index, 'total=' + s.total, 'bgmSrc=' + (bgmState.src ? 'set' : 'empty'));
  },
});
const segs = [
  { text: '第一段，比较短。' },
  { text: '第二段也很短。' },
];
engine.setSegments(segs);
console.log('--- play() ---');
engine.play(0);
setTimeout(() => {
  console.log('--- 模拟第一段播完（onEnded）---');
  // (直接调 engine._onBgmEnded)
  engine._onBgmEnded();
  setTimeout(() => {
    console.log('--- 模拟第二段播完 ---');
    engine._onBgmEnded();
    setTimeout(() => {
      console.log('--- 最终 bgm src:', bgmState.src || '(empty，已停止=正确)');
      process.exit(0);
    }, 50);
  }, 50);
}, 50);
