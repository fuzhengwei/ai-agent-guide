const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const IV = require('../../utils/interview.js');

// 每种风格的展示卡（阵容区按风格分组展示）
const STYLE_CARDS = [
  { id: 'steady', name: '稳重基础', desc: '老架构师 · 重概念与基本功', tag: '入门友好', emoji: '📘' },
  { id: 'gentle', name: '温柔引导', desc: '循循善诱 · 答错也不打击', tag: '零压力', emoji: '🌸' },
  { id: 'sharp',  name: '犀利施压', desc: '追问到底 · 还原大厂压力面', tag: '硬核', emoji: '🔥' },
  { id: 'boss',   name: '大厂实战', desc: '字节/美团/京东真题 · 紧盯落地', tag: '真题', emoji: '🏢' },
];

Page({
  data: {
    sessions: [],
    panel: [],
    styleCards: STYLE_CARDS,
    selectedStyle: '',       // '' = 自动轮换
    doneCount: 0,
    passedCount: 0,
    totalQuestions: 0,
    xp: 0,
    total: 0,
  },

  onShow() {
    const records = store.getQuizRecords();
    const stats = store.getGameStats();
    const index = require('../../data/quiz-index.js');
    const byCount = {};
    index.forEach(i => { byCount[i.ch] = i.count; });

    const base = chapters
      .filter(c => c.quizKey && byCount[c.quizKey])
      .map((c, i) => {
        const rec = records[c.quizKey];
        const stars = rec ? store.calcStars(rec.correct, rec.total) : 0;
        const g = rec ? IV.gradeOf(stars) : null;
        const count = byCount[c.quizKey];
        return {
          key: c.quizKey,
          title: c.title,
          no: ('0' + (i + 1)).slice(-2),
          count,
          minutes: Math.max(3, Math.round(count * 0.55)),
          isBoss: !!c.isBoss,
          done: !!rec,
          stars,
          grade: g ? g.grade : '',
          gradeLabel: g ? g.label : '',
          bestScore: rec ? rec.bestScore || 0 : 0,
          answered: rec ? rec.total : count,
        };
      });

    // 解锁链依赖前一场面试是否通过；大厂真题场始终开放
    const list = base.map((item, i) => {
      const passed = item.done && store.isPassed(records[item.key]);
      const prev = i > 0 ? records[base[i - 1].key] : null;
      return {
        ...item,
        passed,
        unlocked: i === 0 || !!(prev && store.isPassed(prev)) || !!item.isBoss,
      };
    });

    // 当前选中风格下各场次的面试官
    const sel = this.data.selectedStyle;
    const sessions = list.map(item => {
      const iv = sel
        ? IV.pickByStyle(sel, item.key.length + item.no.length)
        : IV.pick(this._sessionPos(item.key));
      return {
        ...item,
        ivName: iv.name,
        ivInitial: iv.initial,
        ivGradient: iv.gradient,
        ivStyle: iv.styleName,
      };
    });

    // 面试官阵容（按当前风格筛选；未选风格展示全部）
    const panel = sel ? IV.PANEL.filter(p => p.styleId === sel) : IV.PANEL;

    this.setData({
      sessions,
      panel,
      total: sessions.length,
      doneCount: sessions.filter(x => x.done).length,
      passedCount: sessions.filter(x => x.passed).length,
      totalQuestions: sessions.reduce((s, x) => s + x.count, 0),
      xp: stats.xp,
    });
  },

  // 章节序号（作为面试官轮换种子）
  _sessionPos(key) {
    const list = this.data.sessions || [];
    const pos = list.findIndex(x => x.key === key);
    return pos >= 0 ? pos : 0;
  },

  // 选择面试官风格；再次点击同风格取消（回到自动轮换）
  pickStyle(e) {
    const id = e.currentTarget.dataset.id || '';
    this.setData({ selectedStyle: this.data.selectedStyle === id ? '' : id });
    this.onShow();
  },

  startSession(e) {
    const { key, unlocked } = e.currentTarget.dataset;
    if (!unlocked) {
      wx.showModal({
        title: '这场还没解锁',
        content: '先通过前一场面试（正确率 ≥ 60%）即可解锁。也可以现在直接开始这一场。',
        confirmText: '直接开始',
        cancelText: '返回',
        success: (res) => {
          if (res.confirm) this.go(key);
        },
      });
      return;
    }
    this.go(key);
  },

  go(key) {
    const style = this.data.selectedStyle ? '&style=' + this.data.selectedStyle : '';
    wx.navigateTo({ url: `/packages/quiz/pages/runner/runner?ch=${key}${style}` });
  },
});
