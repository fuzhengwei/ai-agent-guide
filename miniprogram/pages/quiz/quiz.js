const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const IV = require('../../utils/interview.js');

Page({
  data: {
    sessions: [],
    panel: IV.PANEL,
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
        const iv = IV.pick(i);
        const count = byCount[c.quizKey];
        return {
          key: c.quizKey,
          title: c.title,
          no: ('0' + (i + 1)).slice(-2),
          count,
          minutes: Math.max(3, Math.round(count * 0.55)),
          ivName: iv.name,
          ivInitial: iv.initial,
          ivGradient: iv.gradient,
          done: !!rec,
          stars,
          grade: g ? g.grade : '',
          gradeLabel: g ? g.label : '',
          bestScore: rec ? rec.bestScore || 0 : 0,
          answered: rec ? rec.total : count,
        };
      });

    // 解锁链依赖前一场面试是否通过，必须二段式计算
    const list = base.map((item, i) => {
      const passed = item.done && store.isPassed(records[item.key]);
      const prev = i > 0 ? records[base[i - 1].key] : null;
      return {
        ...item,
        passed,
        unlocked: i === 0 || !!(prev && store.isPassed(prev)),
      };
    });

    this.setData({
      sessions: list,
      total: list.length,
      doneCount: list.filter(x => x.done).length,
      passedCount: list.filter(x => x.passed).length,
      totalQuestions: list.reduce((s, x) => s + x.count, 0),
      xp: stats.xp,
    });
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
    wx.navigateTo({ url: `/packages/quiz/pages/runner/runner?ch=${key}` });
  },
});
