// 场景7：页面销毁后引擎继续播（首页迷你播放条语义）
// 1) 全局广播：onStateChange 收到 chapterId/title/state
// 2) getPlaying() 返回当前播放信息
// 3) 非活跃引擎（离开页面的旧引擎）stop() 不误伤当前播放
// 4) stopActive() 全局停止；暂停/恢复切换
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

// 全局订阅（模拟首页迷你播放条）
const received = [];
const unsub = tts.onStateChange((info) => received.push(`${info.chapterId}:${info.state}`));

// 页面 A：播放章节 a（随后「销毁」，不再持有引擎引用之外的生命周期）
const eA = tts.createEngine({ chapterId: 'a', title: '第3章 记忆', onState() {} });
eA.setSegments([{ text: '章节甲的段落。' }, { text: '第二段。' }]);
eA.play(0);

setTimeout(() => {
  const g = tts.getPlaying();
  console.log('1) getPlaying:', g ? `${g.chapterId} ${g.state} ${g.title}` : 'null', g && g.chapterId === 'a' && g.state === 'playing' ? 'PASS' : 'FAIL');
  console.log('   broadcast:', received.join(' | '), received.some(x => x === 'a:playing') ? 'PASS' : 'FAIL');

  // 模拟另一个页面对同一章的引擎接管后：旧引擎（非活跃）被 stop —— 不应误伤当前播放
  // 这里直接构造非活跃引擎 eB（未播放），stop 它，确认 bgm 不受影响
  const eB = tts.createEngine({ chapterId: 'b', title: 'B', onState() {} });
  eB.setSegments([{ text: '乙章。' }]);
  eB.stop();
  console.log('2) 非活跃引擎 stop 后 bgm.src 保留:', bgmState.src ? 'PASS' : 'FAIL', 'src=' + bgmState.src);
  console.log('   A 仍 playing:', eA.getState() === 'playing' ? 'PASS' : 'FAIL');

  // 全局暂停/恢复
  tts.pauseActive();
  console.log('3) pauseActive 后:', tts.getPlaying() && tts.getPlaying().state === 'paused' ? 'paused PASS' : 'FAIL');
  tts.resumeActive();
  console.log('   resumeActive 后:', tts.getPlaying() && tts.getPlaying().state === 'playing' ? 'playing PASS' : 'FAIL');

  // 全局停止
  tts.stopActive();
  setTimeout(() => {
    console.log('4) stopActive 后 getPlaying:', tts.getPlaying() === null ? 'null PASS' : 'FAIL');
    console.log('   bgm 已停:', bgmState.src === '' ? 'PASS' : 'FAIL');
    console.log('   收到 idle 广播:', received.some(x => x === 'a:idle') ? 'PASS' : 'FAIL');
    unsub();
    process.exit(0);
  }, 50);
}, 60);
