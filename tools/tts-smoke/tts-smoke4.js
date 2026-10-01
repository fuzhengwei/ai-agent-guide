// 场景4：整章合并模式 —— play 走 chapter action、onEnded 触发 finished、降级逻辑、双角色走逐段
let bgmState = { src: '', paused: true, title: '' };
let chapterCalls = 0, chapterFailFirst = false, segCalls = 0;
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
      stop() { bgmState.src = ''; bgmState.paused = true; this._stop && this._stop(); },
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
        chapterCalls++;
        setImmediate(() => {
          if (chapterFailFirst && chapterCalls === 1) { chapterFailFirst = false; return success({ result: { ok: false, msg: 'mock-chapter-fail' } }); }
          success({ result: { ok: true, url: 'https://mock/whole-chapter.mp3', segments: data.items.length } });
        });
      } else {
        segCalls++;
        setImmediate(() => success({ result: { ok: true, url: 'https://mock/seg-' + segCalls + '.mp3' } }));
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

// A: 纯文本 → 整章模式
const log = [];
const e1 = tts.createEngine({ chapterId: 'a', title: '第1章', onState(s) { log.push(s.state + ':' + s.index); } });
e1.setSegments([{ text: '段一。' }, { text: '段二。' }, { text: '段三。' }]);
e1.play(0);
setTimeout(() => {
  console.log('A 整章模式 bgmSrc:', bgmState.src, 'title:', bgmState.title);
  console.log('A chapterCalls(应为1):', chapterCalls, 'segCalls(应为0):', segCalls);
  // 模拟整章播完
  e1._onBgmEnded();
  console.log('A 播完后状态:', e1.getState(), '(finished 后 stop=idle)');
  console.log('A 状态序列:', log.join(' | '));

  // B: 整章失败 → 降级逐段
  chapterFailFirst = true;
  const log2 = [];
  const e2 = tts.createEngine({ chapterId: 'b', title: '第2章', onState(s) { log2.push(s.state + ':' + s.index); } });
  e2.setSegments([{ text: '甲段。' }, { text: '乙段。' }]);
  e2.play(0);
  setTimeout(() => {
    console.log('---');
    console.log('B 降级后 segCalls(应>0):', segCalls, 'bgmSrc:', bgmState.src);
    console.log('B 状态序列:', log2.join(' | '));

    // C: 双角色（段级 voice）→ 直接逐段
    const log3 = [];
    const e3 = tts.createEngine({ chapterId: 'c', title: '第3章', onState(s) { log3.push(s.state + ':' + s.index); } });
    e3.setSegments([{ text: '老师讲。', voice: 'reader' }, { text: '学生答。', voice: 'standard' }]);
    e3.play(0);
    setTimeout(() => {
      console.log('---');
      console.log('C 双角色 chapterCalls(应仍为2):', chapterCalls, '逐段模式 bgmSrc:', bgmState.src);
      console.log('C 状态序列:', log3.join(' | '));
      process.exit(0);
    }, 120);
  }, 150);
}, 120);
