const chapters = require('../../../../data/chapters.js');
const store = require('../../../../utils/store.js');
const pay = require('../../../../utils/pay.js');

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
    html: '',
    chapterNum: '',
    quizKey: '',
    currentIndex: 0,
    total: chapters.length,
    progress: 0,
    finished: false,
    // 阅读设置
    nightMode: false,
    fontMode: 'm',   // s | m | l
    panelOpen: false,
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
    this.setData({ currentIndex: index, nightMode: !!pref.nightMode, fontMode: pref.fontMode || 'm' });
    this.applyNavStyle(pref.nightMode);
    this.loadChapter(index);
  },

  loadChapter(index) {
    const meta = chapters[index];
    const dataMap = require('../../data/index.js');
    const ch = dataMap[meta.slug];
    if (!ch) {
      wx.showToast({ title: '内容加载失败', icon: 'error' });
      return;
    }
    store.markRead(meta.key);
    wx.setNavigationBarTitle({ title: meta.title });
    this.setData({
      title: ch.title,
      subtitle: ch.subtitle || '',
      html: ch.html,
      chapterNum: meta.num !== null && meta.num !== undefined ? meta.num : '',
      quizKey: meta.quizKey || '',
      currentIndex: index,
      finished: index === chapters.length - 1,
    });
    wx.pageScrollTo({ scrollTop: 0, duration: 0 });
  },

  onPageScroll(e) {
    // 简单滚动进度（按固定估算高度，只作指示用）
    const percent = Math.min(100, Math.round((e.scrollTop / 20000) * 100));
    if (percent !== this.data.progress) this.setData({ progress: percent });
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

  setFont(e) {
    const mode = e.currentTarget.dataset.mode;
    if (!mode || mode === this.data.fontMode) return;
    this._pref = savePref({ fontMode: mode }, this._pref || {});
    this.setData({ fontMode: mode });
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
