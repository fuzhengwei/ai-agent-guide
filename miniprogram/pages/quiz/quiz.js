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

/**
 * 把 PATH_D 的「M x,y C ...」三次贝塞尔串采样成折线小段的工具函数。
 * 输出单位为地图坐标系（宽 100、高 1700），由 WXML 侧负责 ×1.5 转 rpx。
 *
 * 真机小程序不支持 <svg>，只能把曲线拍扁成一串圆角小条来拼。
 */
function parsePathD(d) {
  // 词法：拆出命令字母与数字
  const tokens = d.match(/[MC]|-?\d+(?:\.\d+)?/g) || [];
  const segs = [];
  let i = 0, cx = 0, cy = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M') {
      cx = parseFloat(tokens[i++]); cy = parseFloat(tokens[i++]);
    } else if (cmd === 'C') {
      const x1 = parseFloat(tokens[i++]), y1 = parseFloat(tokens[i++]);
      const x2 = parseFloat(tokens[i++]), y2 = parseFloat(tokens[i++]);
      const x3 = parseFloat(tokens[i++]), y3 = parseFloat(tokens[i++]);
      // 三次贝塞尔采样 8 段（28 关地图约 224 段路基，渲染压力可控）
      const N = 8;
      let px = cx, py = cy;
      for (let t = 1; t <= N; t++) {
        const u = t / N, v = 1 - u;
        const x = v*v*v*cx + 3*v*v*u*x1 + 3*v*u*u*x2 + u*u*u*x3;
        const y = v*v*v*cy + 3*v*v*u*y1 + 3*v*u*u*y2 + u*u*u*y3;
        segs.push([px, py, x, y]);
        px = x; py = y;
      }
      cx = x3; cy = y3;
    }
  }
  return segs;
}

/**
 * 折线 → 渲染用的小段数据：
 * 每段转成「中心点 + 长度 + 旋转角」的胶囊条。
 * 同时生成土黄色路基（粗）与白色虚线（细、浅色、叠加在上）。
 *
 * 尺寸说明：路基宽 7，虚线宽 1.2（同 SVG 里的 stroke-width）。
 * 返回渲染数组（已按 rpx 换算，WXML 直接用）。
 */
function buildPathSegs(d) {
  const segs = parsePathD(d);
  const out = [];
  segs.forEach(([x1, y1, x2, y2]) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.01) return;
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    // 角度：默认 view 是水平条，要旋转到和线段同向
    const rot = Math.atan2(dy, dx) * 180 / Math.PI;
    // 路基（土黄色粗条）
    out.push({
      x: cx, y: cy,
      w: (len + 1) * 1.5,          // 让相邻段有 1 单位重叠，避免缝隙
      h: 7 * 1.5,
      rot,
      kind: 'base',
    });
  });
  // 白色虚线：每 3 段画 1 段，间隔 2 段
  for (let i = 0; i < segs.length; i++) {
    if (i % 5 >= 2) continue;
    const [x1, y1, x2, y2] = segs[i];
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.01) continue;
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rot = Math.atan2(dy, dx) * 180 / Math.PI;
    out.push({
      x: cx, y: cy,
      w: len * 1.5,
      h: 1.2 * 1.5,
      rot,
      kind: 'dash',
    });
  }
  return out;
}

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
    pathSegs: buildPathSegs(ADV.PATH_D),
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
    // 星空 / 区域横幅
    stars: [],
    zoneBanners: [],
  },

  onLoad() {
    // 深色星空：从顶部墨蓝到底部深紫蓝
    this.setData({
      bgGrad: 'linear-gradient(180deg, #05091a 0%, #0b1530 30%, #152248 65%, #1d2f5e 100%)',
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

    // 星空背景：80 颗随机星点（种子随机，保证每次渲染一致）
    const stars = this._genStars(80, 42);
    // 区域横幅：7 个区域的标题牌
    const zoneBanners = this._genZoneBanners();

    this.setData({
      levels,
      chests,
      cleared: Math.min(progress.unlocked, ADV.LEVELS.length),
      isAllClear,
      hasSave: progress.unlocked > 0,
      crown: { ...ADV.CROWN, lit: isAllClear },
      fox: { x: cur.px, y: cur.py },
      popup: null,
      stars,
      zoneBanners,
    });
  },

  // 种子随机数生成器（保证每次渲染星点位置一致，避免闪烁跳动）
  _seededRandom(seed) {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  },

  _genStars(count, seed) {
    const rand = this._seededRandom(seed);
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand() * 100,                    // 横向百分比
        y: rand() * MAP_H * 1.5,            // 纵向 rpx
        s: 1 + rand() * 2.5,                // 大小 1-3.5rpx
        delay: rand() * 3,                  // 闪烁相位
        opacity: 0.3 + rand() * 0.7,
      });
    }
    return stars;
  },

  _genZoneBanners() {
    // 7 个区域，取每个区域 y 范围的中点作为横幅位置
    const ZONE_NAMES = ['翠绿山谷', '金黄田野', '碧波湖畔', '紫藤竹林', '樱花高地', '云端栈道', '冰雪之巅'];
    // 按 LEVELS 的 zone 字段分组
    const zoneYs = [[], [], [], [], [], [], []];
    ADV.LEVELS.forEach(lv => zoneYs[lv.zone].push(lv.py));
    return ZONE_NAMES.map((name, i) => {
      const ys = zoneYs[i];
      if (!ys.length) return null;
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      return {
        name,
        y: (minY + maxY) / 2 - 30,   // 放在区域中点稍上方
      };
    }).filter(Boolean);
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
