const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');

// 阶段划分（按章节显示序号 num 分组）
const STAGES = [
  { name: '入门认知', icon: '🌱', desc: '从零理解 Agent 是什么', color: 'green', nums: [0, 1, 2, 3, 4] },
  { name: '核心机制', icon: '⚙️', desc: 'ReAct · 上下文 · 记忆 · RAG', color: 'blue', nums: [5, 6, 7, 8, 9, 10, 11, 12] },
  { name: '工具与能力', icon: '🛠️', desc: 'FC · MCP · Skills · 多 Agent', color: 'purple', nums: [13, 14, 15, 16, 17, 18, 19] },
  { name: '平台实战', icon: '🚀', desc: 'Dify · CLI Agent · GUI', color: 'orange', nums: [20, 21, 22] },
  { name: '工程化进阶', icon: '🏔️', desc: '评估 · 安全 · 部署 · 展望', color: 'red', nums: [23, 24, 25, 26, 27] },
];

Page({
  data: {
    stages: [],
    totalChapters: 0,
    readCount: 0,
    totalQuestions: 463,
    nextChapter: null,   // 继续学习目标
    payEnabled: pay.CONFIG.PAY_ENABLED,
    priceLabel: pay.CONFIG.PRICE_LABEL,
    freeCount: pay.CONFIG.FREE_CHAPTER_COUNT,
  },

  onShow() {
    const readMap = store.getReadMap();
    const enriched = chapters.map((c, i) => ({
      ...c,
      index: i,
      read: !!readMap[c.key],
      locked: pay.isLocked(c),
    }));

    const stages = STAGES.map(st => {
      const list = enriched.filter(c => st.nums.includes(c.num));
      return {
        ...st,
        list,
        done: list.filter(c => c.read).length,
      };
    }).filter(st => st.list.length);

    const firstUnread = enriched.find(c => !c.read);
    this.setData({
      stages,
      totalChapters: enriched.length,
      readCount: enriched.filter(c => c.read).length,
      nextChapter: firstUnread || enriched[enriched.length - 1],
    });
  },

  tapContinue() {
    const c = this.data.nextChapter;
    if (!c) return;
    if (pay.isLocked(c)) return pay.promptUnlock();
    wx.navigateTo({ url: `/packages/${c.pkg}/pages/reader/reader?key=${c.key}&slug=${c.slug}` });
  },

  tapUnlock() {
    pay.requestUnlock();
  },

  openChapter(e) {
    const { key, pkg, slug } = e.currentTarget.dataset;
    const chapter = chapters.find(c => c.key === key);
    if (pay.isLocked(chapter)) {
      pay.promptUnlock();
      return;
    }
    wx.navigateTo({
      url: `/packages/${pkg}/pages/reader/reader?key=${key}&slug=${slug}`,
    });
  },
});
