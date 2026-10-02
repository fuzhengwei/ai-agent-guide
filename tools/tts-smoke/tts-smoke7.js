// 场景7：qa-listen 跨页播放——离开页面不停 + 重新进入接管引擎
let bgmState = { src: '', paused: true, title: '', ended: null };
let segCalls = 0;
global.wx = {
  getBackgroundAudioManager() {
    return {
      get src() { return bgmState.src; },
      set src(v) { bgmState.src = v; bgmState.paused = false; },
      get paused() { return bgmState.paused; },
      set title(v) { bgmState.title = v; }, set singer(v) {}, set epname(v) {}, set coverImgUrl(v) {},
      playbackRate: 1,
      play() { bgmState.paused = false; }, pause() { bgmState.paused = true; },
      stop() { bgmState.src = ''; bgmState.paused = true; },
      onEnded(f) { bgmState.ended = f; }, onError(f) {}, onPause(f) {}, onStop(f) {}, onPlay(f) {},
    };
  },
  cloud: {
    callFunction({ data, success }) {
      setImmediate(() => {
        if (data.action === 'chapter') return success({ result: { ok: false, msg: 'no-whole' } });
        segCalls++;
        success({ result: { ok: true, url: 'https://mock/seg-' + segCalls + '.mp3' } });
      });
    },
  },
  getFileSystemManager() { return { accessSync() { throw new Error('no'); }, writeFileSync() {} }; },
  getStorageSync() { return []; }, setStorageSync() {},
  showToast() {}, env: { USER_DATA_PATH: '/tmp' },
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');

// ===== 模拟 qa-listen 页面 A =====
let aStates = [];
const engineA = tts.createEngine({
  chapterId: 'qa-listen', title: '第1章 · 面试题讲解', source: 'qa',
  onState: (s) => aStates.push(s.state),
});
engineA.setVoice('reader');
engineA.setSegments([
  { role: 'teacher', voice: 'reader', text: '第一题。' },
  { role: 'student', voice: 'standard', text: '答案是A。' },
  { role: 'teacher', voice: 'reader', text: '第二题。' },
]);
engineA.play(0);

setTimeout(() => {
  console.log('A 播放中: state=%s bgmSrc=%s', engineA.getState(), !!bgmState.src);
  // ===== 模拟离开页面（onUnload 不再 destroy）=====
  engineA.setOnState(() => {});   // 页面 detached，回调静默（_safeSet 不写 UI）
  console.log('离开页面后引擎仍活: state=%s (应为 playing)', engineA.getState());
  console.log('getPlaying 识别 qa:', tts.getPlaying() && tts.getPlaying().source === 'qa' ? 'PASS' : 'FAIL');

  // ===== 模拟重新进入 qa-listen 页面（接管）=====
  const g = tts.getPlaying();
  let bStates = [];
  const engineB = tts.createEngine({   // 新页面 onLoad 会先新建引擎
    chapterId: 'qa-listen', title: '第1章 · 面试题讲解', source: 'qa',
    onState: (s) => bStates.push(s.state),
  });
  // _adoptGlobalTts：发现全局引擎是 qa → 换绑接管，新引擎弃用
  const adopted = g && g.engine.getChapterId() === 'qa-listen';
  const active = adopted ? g.engine : engineB;
  active.setOnState((s) => bStates.push(s.state));
  console.log('接管成功:', adopted && active === engineA ? 'PASS' : 'FAIL');
  console.log('接管后进度: index=%s total=%s', active.getIndex(), active.getSegments().length);

  // 接管的引擎继续播：模拟下一段 onEnded
  bgmState.ended && bgmState.ended();
  setTimeout(() => {
    console.log('接力继续: state=%s bgmSrc=%s (应=playing 且换段)', active.getState(), !!bgmState.src);
    // 新页面点停止
    active.stop();
    console.log('停止后: state=%s bgmSrc=%s (应=idle/empty)', active.getState(), !!bgmState.src);
    console.log(adopted && active === engineA ? 'PASS 全链路' : 'FAIL');
    process.exit(0);
  }, 100);
}, 120);
