const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');
const share = require('../../utils/share.js');

Page({
  data: {
    total: 0,
    readCount: 0,
    quizAttempts: 0,
    quizDone: 0,
    xp: 0,
    stars: 0,
    totalStars: 0,
    payEnabled: pay.CONFIG.PAY_ENABLED,
    unlocked: true,
    studyTimeText: '尚未开始',
    studyDays: 0,
  },

  onShow() {
    const readMap = store.getReadMap();
    const records = store.getQuizRecords();
    const recordKeys = Object.keys(records);
    const gameStats = store.getGameStats();
    const quizIndex = require('../../data/quiz-index.js');
    const st = store.getStudyTime();
    this.setData({
      total: chapters.length,
      readCount: Object.keys(readMap).length,
      quizAttempts: recordKeys.reduce((s, k) => s + (records[k].attempts || 0), 0),
      quizDone: recordKeys.length,
      xp: gameStats.xp,
      stars: gameStats.stars,
      totalStars: quizIndex.length * 3,
      unlocked: pay.isUnlocked(),
      studyTimeText: this._fmtMs(st.total),
      studyDays: st.days,
    });
  },

  goNotes() {
    wx.navigateTo({ url: '/pages/notes/notes' });
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' });
  },

  _fmtMs(ms) {
    const mins = Math.floor((ms || 0) / 60000);
    if (mins < 1) return '尚未开始';
    if (mins < 60) return `累计学习 ${mins} 分钟`;
    return `累计学习 ${Math.floor(mins / 60)} 小时 ${mins % 60} 分`;
  },

  toggleUnlock() {
    if (pay.isUnlocked()) {
      wx.showToast({ title: '已解锁全部章节', icon: 'none' });
    } else {
      pay.requestUnlock();
    }
  },

  clearData() {
    wx.showModal({
      title: '清除学习记录',
      content: '将清除全部阅读进度与做题记录，且不可恢复。',
      confirmColor: '#dc2626',
      success: (res) => {
        if (res.confirm) {
          store.clearAll();
          this.onShow();
          wx.showToast({ title: '已清除', icon: 'success' });
        }
      },
    });
  },

  about() {
    wx.showModal({
      title: '关于',
      content: 'AI Agent 通识教程 · 28 章渐进式可视化教程，配套 463 道面试题。\n网页版：ai-agent-guide.xiaofuge.cn',
      showCancel: false,
    });
  },

  // 分享/转发：附上当前学习进度（含朋友圈入口）
  ...share.attach(
    function () {
      const n = this.data.readCount;
      return n > 0
        ? `我在学 AI Agent 通识教程，已读完 ${n}/${this.data.total} 章，来和我一起打卡！`
        : 'AI Agent 通识教程：28 章学会 Agent 开发，配 463 道大厂面试题';
    },
    '/pages/index/index'
  ),
});
