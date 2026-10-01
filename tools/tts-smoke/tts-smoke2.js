// 场景2：长段落切句连播 + 暂停/恢复 + URL 失效重试
let bgmState = { src: '', paused: true, title: '' };
let failOnce = true;
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
      setImmediate(() => {
        const texts = data.action === 'chapter' ? data.items.map(i => i.text) : [data.text];
        if (failOnce && texts.some(t => (t || '').indexOf('第一') >= 0)) { failOnce = false; return success({ result: { ok: false, msg: 'mock-fail-once' } }); }
        if (data.action === 'chapter') return success({ result: { ok: true, url: 'https://mock.example/chapter.mp3' } });
        success({ result: { ok: true, url: 'https://mock.example/' + encodeURIComponent(data.text.slice(0, 6)) + '.mp3' } });
      });
    },
  },
  getFileSystemManager() { return { accessSync() { throw new Error('no'); }, writeFileSync() {} }; },
  getStorageSync() { return []; },
  setStorageSync() {},
  showToast(o) { console.log('[toast]', o.title); },
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');
const longText = '这是第一句。这是第二句。'.repeat(30); // >280 字触发切句
const engine = tts.createEngine({
  chapterId: 't2', title: '长文测试',
  onState(s) { console.log('[state]', s.state, 'index=' + s.index); },
});
engine.setSegments([{ text: longText }, { text: '末段。' }]);
engine.play(0);
setTimeout(() => {
  console.log('--- 模拟分句1播完 ---'); engine._onBgmEnded();
  setTimeout(() => {
    console.log('--- 模拟分句2播完（60句全完→末段） ---'); engine._onBgmEnded();
    setTimeout(() => {
      console.log('--- 模拟末段播完 ---'); engine._onBgmEnded();
      setTimeout(() => process.exit(0), 60);
    }, 60);
  }, 60);
}, 80);
