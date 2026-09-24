/**
 * 面试间首页：选风格 → 选场次（大厂真题 / 混合 / 章节）→ 进入对话流
 *
 * 取代原冒险岛地图页。保留 4 风格面试官池和评级/错题统计，去除 28 关解锁链。
 */
const store = require('../../utils/store.js');
const share = require('../../utils/share.js');
const IV = require('../../utils/interview.js');
const MIX = require('../../utils/mix.js');

const STYLES = [
  { id: 'sharp',  name: '犀利施压', emoji: '🔥', desc: '追问到底 · 还原大厂压力面', tagline: '林致远之外的另一种残酷' },
  { id: 'gentle', name: '温柔引导', emoji: '🌸', desc: '循循善诱 · 适合初学者',       tagline: '答错也不会让你难堪' },
  { id: 'boss',   name: '大厂实战', emoji: '💼', desc: '字节/美团/京东业务视角',      tagline: '只聊能上线的方案' },
  { id: 'steady', name: '稳重基础', emoji: '📐', desc: '老架构师 · 抠概念准确性',     tagline: '基本功决定下限' },
];

const BOSS_LIST = [
  { quizKey: 'bytedance', name: '字节跳动', emoji: '🎵', desc: '算法 + 工程双重压力', count: 10 },
  { quizKey: 'meituan',   name: '美团',     emoji: '🟡', desc: 'Agent 业务落地',     count: 10 },
  { quizKey: 'jd',        name: '京东',     emoji: '🛒', desc: '电商 AI 架构场景',   count: 10 },
];

Page({
  data: {
    styles: STYLES,
    style: 'steady',                  // 默认稳重基础
    curStyle: STYLES[3],
    bossList: BOSS_LIST,
    mixList: [],
    chapters: [],
    totalCount: 0,
    passedCount: 0,
    avgRate: 0,
  },

  onLoad() {
    // 读取用户上次选择的风格
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

    // ===== 混合面试 =====
    const mixList = MIX.MODES.map(m => ({
      id: m.id,
      name: m.name,
      emoji: m.emoji,
      desc: m.desc,
      hot: !!m.hot,
    }));

    // ===== 章节面试 =====
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
        // 从 "第N章 xxx" 中抽出短标题
        shortTitle: c.title.replace(/^第\d+章\s*/, ''),
        subtitle: c.subtitle || '',
        count: idx ? idx.count : 10,
        done: total > 0,
        passed: rate >= 80,
        rate,
      };
    });

    // ===== 汇总 =====
    const doneList = chList.filter(c => c.done);
    const passedCount = chList.filter(c => c.passed).length;
    const avgRate = doneList.length
      ? Math.round(doneList.reduce((s, c) => s + c.rate, 0) / doneList.length)
      : 0;

    this.setData({
      mixList,
      chapters: chList,
      totalCount: chList.length + BOSS_LIST.length + mixList.length,
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
    'AI Agent 面试间：7 位面试官 4 种风格，大厂真题+章节面试，来一场真实的技术面试',
    '/pages/quiz/quiz'
  ),
});
