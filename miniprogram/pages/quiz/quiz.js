/**
 * 面试 tab 首页：教程配套面试入口
 *
 * 28 章教程题库逐章面试 + 4 种面试官风格 + 大厂真题 + 混合面试
 */
const store = require('../../utils/store.js');
const share = require('../../utils/share.js');
const IV = require('../../utils/interview.js');
const MIX = require('../../utils/mix.js');

const STYLES = [
  { id: 'sharp',  name: '犀利施压', emoji: '🔥', tagline: '追问到底 · 还原大厂压力面' },
  { id: 'gentle', name: '温柔引导', emoji: '🌸', tagline: '循循善诱 · 适合初学者' },
  { id: 'boss',   name: '大厂实战', emoji: '💼', tagline: '只聊能上线的方案' },
  { id: 'steady', name: '稳重基础', emoji: '📐', tagline: '抠概念准确性 · 基本功决定下限' },
];

const BOSS_LIST = [
  { quizKey: 'bytedance', name: '字节跳动', emoji: '🎵', count: 10 },
  { quizKey: 'meituan',   name: '美团',     emoji: '🟡', count: 10 },
  { quizKey: 'jd',        name: '京东',     emoji: '🛒', count: 10 },
];

Page({
  data: {
    styles: STYLES,
    style: 'steady',
    curStyle: STYLES[3],
    bossList: BOSS_LIST,
    mixList: [],
    chapters: [],
    chapterCount: 0,
    passedCount: 0,
    avgRate: 0,
  },

  onLoad() {
    try {
      const saved = wx.getStorageSync('dsh_iv_style');
      if (saved && STYLES.find(s => s.id === saved)) {
        this.setData({ style: saved, curStyle: STYLES.find(s => s.id === saved) });
      }
    } catch (e) {}
  },

  onShow() {
    this._build();
  },

  _build() {
    const chapters = require('../../data/chapters.js');
    const quizIndex = require('../../data/quiz-index.js');
    const records = store.getQuizRecords();

    // 混合面试
    const mixList = MIX.MODES.map(m => ({
      id: m.id,
      name: m.name,
      emoji: m.emoji,
      desc: m.desc,
      hot: !!m.hot,
    }));

    // 章节面试
    const chapterList = chapters.filter(c => c.quizKey && !c.isBoss);
    const chList = chapterList.map(c => {
      const idx = quizIndex.find(x => x.ch === c.quizKey);
      const rec = records[c.quizKey] || {};
      const total = rec.total || 0;
      const correct = rec.correct || 0;
      const rate = total > 0 ? Math.round(correct / total * 100) : 0;
      return {
        key: c.key,
        num: c.num,
        quizKey: c.quizKey,
        title: c.title,
        shortTitle: c.title.replace(/^第\d+章\s*/, ''),
        subtitle: c.subtitle || '',
        count: idx ? idx.count : 10,
        done: total > 0,
        passed: rate >= 80,
        rate,
      };
    });

    const doneList = chList.filter(c => c.done);
    const passedCount = chList.filter(c => c.passed).length;
    const avgRate = doneList.length
      ? Math.round(doneList.reduce((s, c) => s + c.rate, 0) / doneList.length)
      : 0;

    this.setData({
      mixList,
      chapters: chList,
      chapterCount: chList.length,
      passedCount,
      avgRate,
    });
  },

  pickStyle(e) {
    const id = e.currentTarget.dataset.id;
    const cur = STYLES.find(s => s.id === id);
    if (!cur) return;
    this.setData({ style: id, curStyle: cur });
    try { wx.setStorageSync('dsh_iv_style', id); } catch (err) {}
    wx.vibrateShort({ type: 'light' });
  },

  // 语音讲解入口
  goListen() {
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({ url: '/packages/quiz/pages/qa-listen/qa-listen' });
  },

  startChapter(e) {
    const key = e.currentTarget.dataset.key;
    const title = e.currentTarget.dataset.title;
    if (!key) return;
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({
      url: `/packages/quiz/pages/runner/runner?ch=${key}&style=${this.data.style}&title=${encodeURIComponent(title || '')}`,
    });
  },

  startMix(e) {
    const id = e.currentTarget.dataset.id;
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({
      url: `/packages/quiz/pages/runner/runner?mix=${id}&style=${this.data.style}`,
    });
  },

  ...share.attach(
    'AI Agent 教程配套面试：28 章逐章检验，4 种面试官风格，大厂真题实战',
    '/pages/quiz/quiz'
  ),
});
