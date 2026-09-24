const chapters = require('../../../../data/chapters.js');
const store = require('../../../../utils/store.js');
const pay = require('../../../../utils/pay.js');
const share = require('../../../../utils/share.js');
const cloud = require('../../../../utils/cloud.js');
const tts = require('../../../../utils/tts.js');

// 阅读偏好持久化
const PREF_KEY = 'dsh_reader_pref';

function loadPref() {
  try {
    return wx.getStorageSync(PREF_KEY) || {};
  } catch (e) { return {}; }
}

function savePref(patch, cur) {
  const next = Object.assign({}, cur, patch);
  try { wx.setStorageSync(PREF_KEY, next); } catch (e) {}
  return next;
}

Page({
  data: {
    title: '',
    subtitle: '',
    nodes: [],          // 章节内容节点树（替代原 rich-text 的 html 字符串）
    chapterNum: '',
    quizKey: '',
    currentIndex: 0,
    total: chapters.length,
    progress: 0,
    finished: false,
    // 阅读设置
    nightMode: false,
    fontSize: 28,        // 正文字号 rpx（22~38 连续调节）
    fontPercent: 100,
    panelOpen: false,
    // 语音朗读
    ttsPanelOpen: false,
    ttsSupported: false,
    voices: [],
    ttsVoice: 'standard',
    ttsRate: 1,
    ttsState: 'idle',    // idle | playing | paused | synthesizing | finished
    ttsIndex: 0,
    ttsTotal: 0,
    // 章节目录
    toc: [],
    tocOpen: false,
    tocAnchor: '',
    tocStamp: 0,
    // 阅读位置恢复提示
    resumeTip: false,
    // 收藏弹窗
    favModal: false,
    favText: '',
    favTextPreview: '',
    favNoteInput: '',
  },

  onLoad(query) {
    const pref = loadPref();
    const key = query.key;
    const index = chapters.findIndex(c => c.key === key);
    if (index === -1) {
      wx.showToast({ title: '章节不存在', icon: 'error' });
      return;
    }
    if (pay.isLocked(chapters[index])) {
      pay.promptUnlock();
      setTimeout(() => wx.navigateBack({ fail: () => {} }), 300);
      return;
    }
    this._pref = pref;
    // 字号兼容：旧版存 fontMode(s/m/l)，新版存 fontSize(数字)
    let fontSize = pref.fontSize;
    if (typeof fontSize !== 'number') {
      fontSize = { s: 24, m: 28, l: 32 }[pref.fontMode] || 28;
    }
    this.setData({
      currentIndex: index,
      nightMode: !!pref.nightMode,
      fontSize,
      fontPercent: Math.round(fontSize / 28 * 100),
      ttsSupported: tts.isSupported(),
      voices: tts.getVoices(),
      ttsVoice: pref.ttsVoice || 'standard',
      ttsRate: pref.ttsRate || 1,
    });
    this.applyNavStyle(pref.nightMode);
    this.loadChapter(index);
    this._startStudyTimer();
  },

  /* ===== 阅读时长计时（每 15s 记一次，前后台切换自动结算） ===== */
  _startStudyTimer() {
    this._studyTick = setInterval(() => {
      store.addStudyTime(15000);
      // 每 2 分钟向云端同步一次
      this._studyAcc = (this._studyAcc || 0) + 15000;
      if (this._studyAcc >= 120000) { this._studyAcc = 0; this._reportStats(); }
    }, 15000);
  },

  _reportStats() {
    if (!cloud.ready()) return;
    const st = store.getStudyTime();
    const gs = store.getGameStats();
    cloud.reportStats({
      totalStudyMs: st.total,
      readCount: Object.keys(store.getReadMap()).length,
      xp: gs.xp,
      stars: gs.stars,
    });
  },

  loadChapter(index) {
    // 切章先停朗读
    this._stopTts();

    const meta = chapters[index];
    const dataMap = require('../../data/index.js');
    const ch = dataMap[meta.slug];
    if (!ch) {
      wx.showToast({ title: '内容加载失败', icon: 'error' });
      return;
    }
    store.markRead(meta.key);
    // 记录最近打开的章节（首页「继续上次阅读」提示用）
    store.setLastChapter({ key: meta.key, slug: meta.slug, pkg: meta.pkg, title: meta.title });
    wx.setNavigationBarTitle({ title: meta.title });
    this._ttsSegs = Array.isArray(ch.ttsSegs) ? ch.ttsSegs : [];
    this.setData({
      title: ch.title,
      subtitle: ch.subtitle || '',
      nodes: Array.isArray(ch.nodes) ? ch.nodes : [],
      toc: Array.isArray(ch.toc) ? ch.toc : [],
      tocOpen: false,
      tocAnchor: '',
      chapterNum: meta.num !== null && meta.num !== undefined ? meta.num : '',
      quizKey: meta.quizKey || '',
      currentIndex: index,
      finished: index === chapters.length - 1,
      progress: 0,
      resumeTip: false,
      ttsIndex: 0,
      ttsTotal: 0,
      ttsState: 'idle',
    });
    this._tocStamp = Date.now();
    this._resumeDone = false;
    this._docHeight = 0;
    this.setData({ tocStamp: this._tocStamp });
    wx.pageScrollTo({ scrollTop: 0, duration: 0 });
    this._restorePos(meta.key);
  },

  // 分享/转发：标题与路径随当前章节动态变化（含朋友圈入口）
  ...share.attach(
    function () { return this.data.title || 'AI Agent 通识教程'; },
    function () {
      const c = chapters[this.data.currentIndex];
      return c ? `/packages/${c.pkg}/pages/reader/reader?key=${c.key}&slug=${c.slug}` : '/pages/index/index';
    }
  ),

  // 微信文章式阅读位置：进入时若上次读到中段，提示并自动滚回
  _restorePos(key) {
    const rec = store.getReadPos(key);
    if (!rec || rec.top < 300) return;   // 只看了个开头就不打扰
    // 等内容渲染一帧后再滚动，避免内容未铺好导致滚动失败
    setTimeout(() => {
      if (this._resumeDone) return;
      this._resumeDone = true;
      wx.pageScrollTo({ scrollTop: rec.top, duration: 0 });
      this.setData({ resumeTip: true });
      setTimeout(() => this.setData({ resumeTip: false }), 2600);
    }, 350);
  },

  onPageScroll(e) {
    // 记录实际 scrollTop；阅读进度按「当前位置/文档高度」估算（文档高度一次性缓存）
    const top = e.scrollTop;
    if (!this._docHeight) {
      this._calcDocHeight();
    }
    const docH = this._docHeight || 20000;
    const percent = Math.min(100, Math.max(0, Math.round((top / Math.max(docH - 800, 1)) * 100)));
    if (percent !== this.data.progress) this.setData({ progress: percent });
    // 阅读位置持久化（200ms 节流，滚动停止后总能落盘到最后位置）
    const key = (chapters[this.data.currentIndex] || {}).key;
    if (!key) return;
    clearTimeout(this._posT);
    this._posT = setTimeout(() => store.saveReadPos(key, top, percent), 200);
  },

  _calcDocHeight() {
    wx.createSelectorQuery()
      .select('.reader-wrap')
      .boundingClientRect(rect => {
        if (rect && rect.height > 500) this._docHeight = rect.height;
      })
      .exec();
  },

  onUnload() {
    // 退出前兜底落盘一次，防止最后一帧滚动还没触发节流回调
    clearTimeout(this._posT);
    clearInterval(this._studyTick);
    this._stopTts();
    this._reportStats();
  },

  onHide() {
    clearTimeout(this._posT);
    clearInterval(this._studyTick);
    // 页面隐藏时暂停朗读（保留位置，回来可继续）
    if (this._ttsEngine && this._ttsEngine.getState() === 'playing') {
      this._ttsEngine.pause();
    }
  },

  onShow() {
    // 从后台切回继续计时
    if (!this._studyTick && this.data.title) this._startStudyTimer();
  },

  /* ===== 收藏与笔记 ===== */

  // 点收藏按钮：尝试取剪贴板里刚复制的选段
  onFavTap() {
    wx.getClipboardData({
      success: (res) => {
        const text = (res.data || '').trim();
        if (text && text.length >= 4 && text.length <= 2000 && text !== this._lastFavText) {
          this._openFavModal(text);
        } else {
          this.onFavHelp();
        }
      },
      fail: () => this.onFavHelp(),
    });
  },

  onFavHelp() {
    wx.showModal({
      title: '如何收藏段落',
      content: '长按正文选中一段文字 → 点「复制」→ 再点这里 ☆，即可收藏并写笔记',
      showCancel: false,
      confirmText: '知道了',
    });
  },

  _openFavModal(text) {
    this.setData({
      favModal: true,
      favText: text,
      favTextPreview: text.length > 80 ? text.slice(0, 80) + '…' : text,
      favNoteInput: '',
    });
  },

  onFavNoteInput(e) {
    this.setData({ favNoteInput: e.detail.value });
  },

  closeFavModal() {
    this.setData({ favModal: false });
  },

  saveFav() {
    const text = this.data.favText;
    const note = this.data.favNoteInput.trim();
    const meta = chapters[this.data.currentIndex] || {};
    this._lastFavText = text;
    this.setData({ favModal: false });

    if (!cloud.ready()) {
      wx.showToast({ title: '云功能未开通，仅本次有效', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '保存中', mask: true });
    cloud.addNote({
      chapterId: meta.key || '',
      chapterTitle: meta.title || this.data.title,
      selectedText: text,
      noteText: note,
      type: note ? 'note' : 'favorite',
    }).then((res) => {
      wx.hideLoading();
      if (res.ok) {
        wx.showToast({ title: note ? '笔记已保存 ✓' : '已收藏 ✓', icon: 'success' });
      } else {
        wx.showToast({ title: res.offline ? '网络异常，稍后重试' : (res.msg || '保存失败'), icon: 'none' });
      }
    });
  },

  /* ===== 章节目录 ===== */

  toggleToc() {
    const open = !this.data.tocOpen;
    // 每次打开换一个时间戳锚点，保证 tocAnchor 变化触发 scroll-into-view 回顶
    const stamp = Date.now();
    this._tocStamp = stamp;
    this.setData({ tocOpen: open, tocStamp: stamp, tocAnchor: open ? 'toc-top-' + stamp : '' });
  },

  tapTocItem(e) {
    const anchor = e.currentTarget.dataset.anchor;
    if (!anchor) return;
    this.setData({ tocOpen: false });
    // 等抽屉收起动画后再跳转，避免同帧布局抖动。
    // 标题现在是真实 view 节点（id=h-N），createSelectorQuery 可直接定位。
    setTimeout(() => {
      wx.createSelectorQuery()
        .select('#' + anchor)
        .boundingClientRect(rect => {
          if (!rect) return;
          wx.createSelectorQuery()
            .selectViewport()
            .scrollOffset(pos => {
              const top = (pos ? pos.scrollTop : 0) + rect.top - 20;
              wx.pageScrollTo({ scrollTop: Math.max(0, top), duration: 220 });
            })
            .exec();
        })
        .exec();
    }, 160);
  },

  /* ===== 阅读设置 ===== */

  togglePanel() {
    this.setData({ panelOpen: !this.data.panelOpen });
  },

  toggleNight(e) {
    const night = !!e.detail.value;
    this._pref = savePref({ nightMode: night }, this._pref || {});
    this.setData({ nightMode: night });
    this.applyNavStyle(night);
  },

  // 字号步进：22 ~ 38 rpx，步进 2
  stepFont(e) {
    const dir = +e.currentTarget.dataset.dir;
    let next = this.data.fontSize + dir * 2;
    next = Math.max(22, Math.min(38, next));
    if (next === this.data.fontSize) return;
    this._pref = savePref({ fontSize: next }, this._pref || {});
    this.setData({ fontSize: next, fontPercent: Math.round(next / 28 * 100) });
    // 字号变化后文档高度失效，重新测量以保证进度条准确
    this._docHeight = 0;
  },

  /* ===== 语音朗读 ===== */

  toggleTtsPanel() {
    this.setData({ ttsPanelOpen: !this.data.ttsPanelOpen });
  },

  setVoice(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    this._pref = savePref({ ttsVoice: id }, this._pref || {});
    this.setData({ ttsVoice: id });
    if (this._ttsEngine) this._ttsEngine.setVoice(id);
  },

  onRateChanging(e) {
    const v = Math.round(e.detail.value * 10) / 10;
    this.setData({ ttsRate: v });
  },

  onRateChange(e) {
    const v = Math.round(e.detail.value * 10) / 10;
    this._pref = savePref({ ttsRate: v }, this._pref || {});
    this.setData({ ttsRate: v });
    if (this._ttsEngine) this._ttsEngine.setRate(v);
  },

  _ensureTtsEngine() {
    if (this._ttsEngine) return this._ttsEngine;
    if (!tts.isSupported()) return null;
    this._ttsEngine = tts.createEngine({
      onState: (s) => {
        const patch = {
          ttsState: s.state === 'finished' ? 'idle' : s.state,
          ttsIndex: s.index,
          ttsTotal: s.total,
        };
        this.setData(patch);
        if (s.state === 'finished') {
          wx.showToast({ title: '✅ 本章朗读完成', icon: 'none' });
        }
        // 滚动跟随当前朗读段落
        if ((s.state === 'playing' || s.state === 'synthesizing') && s.index >= 0) {
          this._scrollToTts(s.index);
        }
      },
    });
    this._ttsEngine.setVoice(this.data.ttsVoice);
    this._ttsEngine.setRate(this.data.ttsRate);
    return this._ttsEngine;
  },

  /**
   * 朗读滚动跟随：tts 索引现在直接对应 data-tts-idx 属性的真实 view 节点，
   * 用 SelectorQuery 定位后滚动到视口 1/3 处。
   */
  _scrollToTts(idx) {
    wx.createSelectorQuery()
      .select(`[data-tts-idx="${idx}"]`)
      .boundingClientRect(rect => {
        if (!rect) return;
        const vh = wx.getWindowInfo().windowHeight;
        if (rect.top < 100 || rect.top > vh - 200) {
          wx.createSelectorQuery()
            .selectViewport()
            .scrollOffset(pos => {
              const top = (pos ? pos.scrollTop : 0) + rect.top - vh / 3;
              wx.pageScrollTo({ scrollTop: Math.max(0, top), duration: 200 });
            })
            .exec();
        }
      })
      .exec();
  },

  ttsPlay() {
    const engine = this._ensureTtsEngine();
    if (!engine) {
      wx.showToast({ title: '朗读服务不可用，请升级微信', icon: 'none' });
      return;
    }
    if (this.data.ttsState === 'paused') {
      engine.resume();
      return;
    }
    const segs = this._ttsSegs || [];
    if (!segs.length) {
      wx.showToast({ title: '本章没有可朗读内容', icon: 'none' });
      return;
    }
    engine.setSegments(segs);
    engine.setVoice(this.data.ttsVoice);
    engine.setRate(this.data.ttsRate);
    engine.play(0);
  },

  ttsPause() { if (this._ttsEngine) this._ttsEngine.pause(); },
  ttsResume() { if (this._ttsEngine) this._ttsEngine.resume(); },
  ttsStop() { this._stopTts(); },

  _stopTts() {
    if (this._ttsEngine) {
      this._ttsEngine.stop();
    }
    this.setData({ ttsState: 'idle', ttsIndex: 0, ttsTotal: 0 });
  },

  applyNavStyle(night) {
    wx.setNavigationBarColor({
      frontColor: night ? '#ffffff' : '#000000',
      backgroundColor: night ? '#14161c' : '#ffffff',
      fail: () => {},
    });
  },

  goQuiz() {
    if (!this.data.quizKey) return;
    wx.navigateTo({ url: '/packages/quiz/pages/runner/runner?ch=' + this.data.quizKey });
  },

  goPrev() {
    const i = this.data.currentIndex;
    if (i <= 0) return wx.showToast({ title: '已是第一章', icon: 'none' });
    this.loadChapter(i - 1);
  },

  goNext() {
    const i = this.data.currentIndex;
    if (i >= chapters.length - 1) return wx.showToast({ title: '已是最后一章', icon: 'none' });
    if (pay.isLocked(chapters[i + 1])) {
      pay.promptUnlock();
      return;
    }
    // 跨分包跳转
    const next = chapters[i + 1];
    wx.navigateTo({
      url: `/packages/${next.pkg}/pages/reader/reader?key=${next.key}&slug=${next.slug}`,
    });
  },
});
