// 场景6：听一听面板元数据（封面转存云存储 + singer/title 刷新）
let bgmState = { src: '', paused: true, title: '', singer: '', cover: '' };
let coverUploads = 0;
global.wx = {
  getBackgroundAudioManager() {
    return {
      get src() { return bgmState.src; },
      set src(v) { bgmState.src = v; bgmState.paused = false; },
      get paused() { return bgmState.paused; },
      set title(v) { bgmState.title = v; },
      set singer(v) { bgmState.singer = v; },
      set epname(v) {},
      set coverImgUrl(v) { bgmState.cover = v; },
      playbackRate: 1,
      play() { bgmState.paused = false; },
      pause() { bgmState.paused = true; },
      stop() { bgmState.src = ''; bgmState.paused = true; },
      onEnded(f) { this._ended = f; }, onError(f) { this._error = f; },
      onPause(f) { this._pause = f; }, onStop(f) { this._stop = f; }, onPlay(f) { this._play = f; },
    };
  },
  cloud: {
    callFunction({ data, success }) {
      setImmediate(() => {
        if (data.action === 'chapter') return success({ result: { ok: true, url: 'https://mock/chapter.mp3' } });
        success({ result: { ok: true, url: 'https://mock/seg.mp3' } });
      });
    },
    uploadFile({ cloudPath, success }) { coverUploads++; setImmediate(() => success({ fileID: 'cloud://fake/' + cloudPath })); },
    getTempFileURL({ fileList, success }) { setImmediate(() => success({ fileList: fileList.map(id => ({ fileID: id, status: 0, tempFileURL: 'https://cos.mock/cover.png' })) })); },
  },
  getFileSystemManager() {
    return {
      accessSync() {}, writeFileSync() {},
      readFile({ success }) { setImmediate(() => success({ data: new ArrayBuffer(10) })); },
    };
  },
  getStorageSync() { return []; }, setStorageSync() {},
  showToast() {}, env: { USER_DATA_PATH: '/tmp' },
};
global.getApp = () => ({ cloudReady: true });
const tts = require('/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/utils/tts.js');
const engine = tts.createEngine({ chapterId: 't6', title: '第1章 测试', onState() {} });
engine.setSegments([{ text: '第一段。' }, { text: '第二段。' }]);
engine.play(0);
setTimeout(() => {
  console.log('面板元数据: title=%j singer=%j cover=%j', bgmState.title, bgmState.singer, bgmState.cover);
  console.log('封面转存次数(应=1):', coverUploads);
  // 换音色 → singer 应刷新
  engine.setVoice('male');
  setTimeout(() => {
    console.log('换音色后: singer=%j', bgmState.singer);
    console.log(coverUploads === 1 && bgmState.singer.indexOf('智云') >= 0 ? 'PASS' : 'FAIL');
    process.exit(0);
  }, 80);
}, 120);
