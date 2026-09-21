const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');

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
  },

  onShow() {
    const readMap = store.getReadMap();
    const records = store.getQuizRecords();
    const recordKeys = Object.keys(records);
    const gameStats = store.getGameStats();
    const quizIndex = require('../../data/quiz-index.js');
    this.setData({
      total: chapters.length,
      readCount: Object.keys(readMap).length,
      quizAttempts: recordKeys.reduce((s, k) => s + (records[k].attempts || 0), 0),
      quizDone: recordKeys.length,
      xp: gameStats.xp,
      stars: gameStats.stars,
      totalStars: quizIndex.length * 3,
      unlocked: pay.isUnlocked(),
    });
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
});
