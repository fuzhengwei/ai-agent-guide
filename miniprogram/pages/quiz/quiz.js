/**
 * 勇者冒险岛 · 地图页（替换题库 tab 首页）
 *
 * 竖版长卷地图：翠谷 → 田野 → 湖畔 → 竹林 → 樱丘 → 云端 → 雪巅，
 * 28 关沿一条弯弯绕绕的山路排布，一路向北直到王城。
 * 首屏自动定位到当前关卡；通关解锁下一关。
 */
const store = require('../../utils/store.js');
const share = require('../../utils/share.js');
const ADV = require('../../data/adventure.js');

const MAP_H = 1700;   // 地图坐标系总高
const MAP_W = 100;

// 多选答案拼接：'A. 文本；B. 文本'
function answerText(q) {
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const right = Array.isArray(q.answer) ? q.answer : [q.answer];
  return right.map(a => LETTERS[a] + '. ' + q.options[a]).join('；');
}

// 通关彩蛋文案（宝箱）
const CHEST_QUIPS = [
  '宝箱里是一张字条：「真正的勇者，错题也要回头看。」',
  '开出一枚「毅力徽章」：原地复活也是一种超能力。',
  '宝箱蹦出一颗星星：「全对通关的你，值得这颗星。」',
  '里面躺着一把小铲子：「去知识的土里继续挖吧！」',
];

Page({
  data: {
    bgGrad: '',
    pathD: ADV.PATH_D,
    mapH: MAP_H,
    levels: [],
    decors: ADV.DECORS,
    clouds: ADV.CLOUDS,
    chests: [],
    crown: null,
    cleared: 0,
    isAllClear: false,
    hasSave: false,
    scrollTopV: 0,
    // 关卡弹窗
    popup: null,
    // 小狐狸位置
    fox: { x: 0, y: 0 },
  },

  onLoad() {
    const skyTop = ADV.ZONES[0].sky[0];
    const skyBot = ADV.ZONES[6].sky[1];
    this.setData({
      bgGrad: 'linear-gradient(to top, ' + skyTop + ' 0%, #cfe8ff 50%, ' + skyBot + ' 100%)',
    });
    this._needScroll = true;
  },

  onShow() {
    this._build();
    if (this._needScroll) {
      this._needScroll = false;
      // 等首帧渲染完成后定位到当前关
      setTimeout(() => this._scrollToCurrent(), 120);
    } else {
      // 闯关回来：把狐狸移到新的当前关
      setTimeout(() => this._scrollToCurrent(true), 260);
    }
  },

  _build() {
    const progress = this._getProgress();
    const unlocked = Math.min(progress.unlocked || 0, ADV.LEVELS.length - 1);
    const records = store.getQuizRecords();

    const levels = ADV.LEVELS.map((lv, i) => {
      const rec = records['adv_' + lv.quizKey];
      const cleared = i < progress.unlocked;
      const attempts = rec ? rec.attempts || 0 : 0;
      return {
        ...lv,
        idx: i,
        num: i + 1,
        state: cleared ? 'cleared' : (i === unlocked ? 'current' : 'locked'),
        attempts,
      };
    });

    const chests = ADV.CHESTS.map(c => ({
      ...c,
      opened: progress.unlocked > c.after,
    }));

    const isAllClear = progress.unlocked >= ADV.LEVELS.length;
    const cur = ADV.LEVELS[unlocked];

    this.setData({
      levels,
      chests,
      cleared: Math.min(progress.unlocked, ADV.LEVELS.length),
      isAllClear,
      hasSave: progress.unlocked > 0,
      crown: { ...ADV.CROWN, lit: isAllClear },
      fox: { x: cur.px, y: cur.py },
      popup: null,
    });
  },

  /* ================= 定位 ================= */

  _scrollToCurrent(onlyFox) {
    const unlocked = Math.min(this._getProgress().unlocked || 0, ADV.LEVELS.length - 1);
    const cur = ADV.LEVELS[unlocked];
    const winH = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()).windowHeight;
    const yRpx = cur.py * 1.5;
    const top = Math.max(0, yRpx - winH * 0.55);
    this.setData({ fox: { x: cur.px, y: cur.py }, scrollTopV: top });
  },

  /* ================= 弹窗 ================= */

  tapLevel(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    const lv = this.data.levels[idx];
    if (!lv || lv.state === 'locked') {
      wx.vibrateShort({ type: 'heavy' });
      wx.showToast({ title: '先通过前面的关卡哦', icon: 'none' });
      return;
    }
    wx.vibrateShort({ type: 'light' });

    const bankIndex = require('../../data/quiz-index.js');
    const hit = bankIndex.find(x => x.ch === lv.quizKey);
    const poolCount = hit ? hit.count : 10;

    // 从题库找一道示例题做「本关小贴士」
    let tip = null;
    try {
      const bank = require('../../packages/quiz/data/index.js');
      const pool = bank[lv.quizKey] || [];
      if (pool.length) {
        const q = pool[Math.floor(Math.random() * pool.length)];
        tip = { question: q.question, answer: answerText(q) };
      }
    } catch (err) {}

    const zone = ADV.ZONES[lv.zone];
    this.setData({
      popup: {
        idx,
        num: lv.num,
        name: lv.name,
        icon: lv.icon,
        monster: lv.monster,
        poolCount: Math.max(poolCount, 10),
        cleared: lv.state === 'cleared',
        bestScore: (store.getQuizRecords()['adv_' + lv.quizKey] || {}).bestScore || 0,
        zoneLine: zone.line,
        tip,
      },
    });
  },

  closePopup() {
    this.setData({ popup: null });
  },

  startLevel() {
    const popup = this.data.popup;
    if (!popup) return;
    this.setData({ popup: null });
    wx.navigateTo({
      url: '/packages/quiz/pages/adventure/adventure?level=' + popup.idx,
    });
  },

  tapChest(e) {
    const i = Number(e.currentTarget.dataset.i);
    const chest = this.data.chests[i];
    if (!chest) return;
    if (!chest.opened) {
      wx.showToast({ title: '通关第 ' + (chest.after + 1) + ' 关后开启', icon: 'none' });
      return;
    }
    wx.vibrateShort({ type: 'light' });
    const quip = CHEST_QUIPS[i % CHEST_QUIPS.length];
    wx.showModal({ title: '🎁 宝箱', content: quip, showCancel: false, confirmText: '收下啦' });
  },

  noop() {},

  /* ================= 存档 ================= */

  resetSave() {
    wx.showModal({
      title: '重置冒险进度',
      content: '将清空闯关进度与本模式的关卡记录（不影响模拟面试成绩），确定重新开始冒险吗？',
      confirmText: '重新开始',
      confirmColor: '#e5484d',
      success: (res) => {
        if (!res.confirm) return;
        try {
          wx.removeStorageSync('dsh_adventure');
          const records = store.getQuizRecords();
          Object.keys(records).forEach(k => {
            if (k.indexOf('adv_') === 0) delete records[k];
          });
          wx.setStorageSync('dsh_quiz_records', records);
        } catch (e) {}
        this._needScroll = true;
        this._build();
        setTimeout(() => {
          this._needScroll = false;
          this._scrollToCurrent();
        }, 120);
        wx.showToast({ title: '已回到营地', icon: 'none' });
      },
    });
  },

  ...share.attach(
    '勇者冒险岛：AI Agent 答题闯关，28 关弯弯曲曲的冒险之路，满 10 题全对才能进阶！',
    '/pages/quiz/quiz'
  ),
});
