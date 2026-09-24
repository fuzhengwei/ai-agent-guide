const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');
const share = require('../../utils/share.js');

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
    studyTimeText: '',
    studyDays: 0,
    payEnabled: pay.CONFIG.PAY_ENABLED,
    priceLabel: pay.CONFIG.PRICE_LABEL,
    freeCount: pay.CONFIG.FREE_CHAPTER_COUNT,
  },

  onShow() {
    const readMap = store.getReadMap();
    const enriched = chapters.map((c, i) => {
      const pos = store.getReadPos(c.key);
      // readPct：有明确 pct 用之；没有但有位置且已读过，按位置粗估；都没则 0
      let readPct = 0;
      if (pos) {
        if (typeof pos.pct === 'number') readPct = pos.pct;
        else if (pos.top >= 300) readPct = Math.min(95, Math.round(pos.top / 200)); // 粗估
      }
      if (readMap[c.key] && readPct < 100 && readPct === 0) readPct = 5; // 打开过但没滚动
      return {
        ...c,
        index: i,
        read: !!readMap[c.key],
        readPct: Math.min(100, readPct),
        locked: pay.isLocked(c),
      };
    });

    const stages = STAGES.map(st => {
      const list = enriched.filter(c => st.nums.includes(c.num));
      return {
        ...st,
        list,
        done: list.filter(c => c.read).length,
      };
    }).filter(st => st.list.length);

    // 继续学习：优先「最近打开且未读完」的章节，其次第一个未读
    const last = store.getLastChapter();
    let nextChapter = enriched.find(c => c.key === (last && last.key) && !c.read);
    if (!nextChapter) nextChapter = enriched.find(c => !c.read);
    if (!nextChapter) nextChapter = enriched[enriched.length - 1];

    // 学习时长展示
    const st = store.getStudyTime();
    const totalMin = Math.floor(st.total / 60000);
    const studyTimeText = totalMin >= 60
      ? `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`
      : (totalMin > 0 ? `${totalMin}m` : '未开始');

    this.setData({
      stages,
      totalChapters: enriched.length,
      readCount: enriched.filter(c => c.read).length,
      nextChapter,
      studyTimeText,
      studyDays: st.days,
    });

    this._promptResume(enriched);
  },

  // 微信文章式：再次打开时提示是否继续上次读到的章节/位置
  _promptResume(enriched) {
    if (this._resumeAsked) return;
    const last = store.getLastChapter();
    if (!last || !last.key) return;
    const ch = enriched.find(c => c.key === last.key);
    if (!ch) return;
    // 上次阅读位置太靠开头就不打扰
    const pos = store.getReadPos(last.key);
    if (!pos || pos.top < 300) return;
    // 看完的章节（在最后一屏附近）也不再提示
    this._resumeAsked = true;
    if (pay.isLocked(ch)) return;
    wx.showModal({
      title: '继续上次阅读',
      content: '上次读到「' + (ch.title || '') + '」，是否继续？',
      confirmText: '继续阅读',
      cancelText: '不了',
      success: (res) => {
        if (!res.confirm) return;
        wx.navigateTo({
          url: `/packages/${ch.pkg}/pages/reader/reader?key=${ch.key}&slug=${ch.slug}`,
        });
      },
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

  // 分享/转发（含朋友圈入口）
  ...share.attach(
    'AI Agent 通识教程：28 章学会 Agent 开发，配 463 道大厂面试题',
    '/pages/index/index'
  ),
});
