/**
 * 勇者冒险岛 · 闯关答题页
 *
 * 规则：
 *  - 进入 ?level=<idx>，从该关题库随机抽 ROUND(10) 题（不足则取全部）
 *  - 全部答对 → 通关：烟火结算 + 解锁下一关
 *  - 错任意一题 → 未通关：留在当前关重新挑战（题目重新随机）
 *  - 已通关的关可自由重玩（练习模式），不影响解锁进度
 */
const store = require('../../../../utils/store.js');
const share = require('../../../../utils/share.js');
const ADV = require('../../../../data/adventure.js');

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const MAX_HEARTS = 3;

// 固定数量烟花粒子（WXML wx:for 渲染，CSS 变量控制绽放角度/距离/色相）
const BURSTS = [0, 1, 2].map(b => ({
  b,
  parts: Array.from({ length: 10 }).map((_, i) => ({
    rot: i * 36,
    dist: 52 + ((i * 13 + b * 29) % 28),
    hue: (b * 120 + i * 37) % 360,
    delay: i * 20,
  })),
}));

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

Page({
  data: {
    levelIdx: 0,
    levelName: '',
    levelIcon: '',
    roundTotal: ADV.ROUND,
    practice: false,     // 已通关后的自由练习
    phase: 'ask',        // ask | result
    // 题目
    index: 0,
    total: 0,
    options: [],
    selected: [],
    multiMode: false,
    locked: false,       // 当前题已作答（单选立即判题）
    // 状态
    hearts: MAX_HEARTS,
    progressPct: 0,
    qText: '',
    // 答错反馈
    showOops: false,
    oopsTitle: '',
    oopsCorrect: '',
    oopsExplain: '',
    // 结算
    passed: false,
    statTime: '',
    statWrong: 0,
    statBestCombo: 0,
    statAttempt: 1,
    newBest: false,
    bursts: [],
    failQuip: '',
  },

  onLoad(query) {
    const idx = Math.max(0, Math.min(ADV.LEVELS.length - 1, Number(query.level) || 0));
    const lv = ADV.LEVELS[idx];
    const bank = require('../../data/index.js');
    const pool = bank[lv.quizKey] || [];
    if (!pool.length) {
      wx.showToast({ title: '这一关的题目还在路上', icon: 'none' });
      setTimeout(() => wx.navigateBack({ fail: () => {} }), 600);
      return;
    }

    this._lv = lv;
    this._pool = pool;

    const progress = this._getProgress();
    const practice = idx < progress.unlocked;
    const rec = (store.getQuizRecords()['adv_' + lv.quizKey]) || {};
    const attempt = practice ? 0 : (rec.attempts || 0) + 1;

    this.setData({
      levelIdx: idx,
      levelName: lv.name,
      levelIcon: lv.icon,
      practice,
      statAttempt: practice ? 0 : attempt,
      failQuip: this._random([
        '小怪「' + lv.monster + '」拍了拍你：再来一次！',
        '勇者不倒，只是原地满血复活。',
        '差一点点！题目已经重新洗牌了。',
      ]),
    });
    wx.setNavigationBarTitle({ title: '第 ' + (idx + 1) + ' 关 · ' + lv.name });

    this._newRound();
  },

  /* ================= 组题 ================= */

  _newRound() {
    const picked = shuffle(this._pool).slice(0, ADV.ROUND);
    // 选项乱序：拷贝题目并同步重排 answer 下标
    this._questions = picked.map(q => {
      const order = shuffle(q.options.map((_, i) => i));
      const answer = (Array.isArray(q.answer) ? q.answer : [q.answer])
        .map(a => order.indexOf(a)).sort((a, b) => a - b);
      return {
        id: q.id,
        type: q.type,
        question: q.question,
        explanation: q.explanation || '',
        options: order.map(i => q.options[i]),
        answer,
      };
    });
    this._combo = 0;
    this._bestCombo = 0;
    this._wrong = 0;
    this._start = Date.now();
    this.setData({
      total: this._questions.length,
      hearts: MAX_HEARTS,
    });
    this._ask(0);
  },

  _ask(i) {
    const q = this._questions[i];
    const multiMode = q.type === 'multi' || q.answer.length > 1;
    this.setData({
      index: i,
      phase: 'ask',
      locked: false,
      selected: [],
      multiMode,
      options: this._buildOptions(q, []),
      progressPct: Math.round(i / this._questions.length * 100),
      qText: q.question,
    });
  },

  _buildOptions(q, selected, answered) {
    return q.options.map((text, oi) => {
      let cls = '', mark = '';
      if (answered) {
        if (q.answer.indexOf(oi) !== -1) { cls = 'right'; mark = '✓'; }
        else if (selected.indexOf(oi) !== -1) { cls = 'wrong'; mark = '✗'; }
      } else if (selected.indexOf(oi) !== -1) {
        cls = 'picked';
      }
      return { oi, letter: LETTERS[oi], text, cls, mark };
    });
  },

  /* ================= 作答 ================= */

  pickOption(e) {
    if (this.data.locked) return;
    const i = Number(e.currentTarget.dataset.i);
    const q = this._questions[this.data.index];
    if (this.data.multiMode) {
      const selected = this.data.selected.slice();
      const pos = selected.indexOf(i);
      if (pos === -1) selected.push(i); else selected.splice(pos, 1);
      this.setData({ selected, options: this._buildOptions(q, selected) });
      wx.vibrateShort({ type: 'light' });
      return;
    }
    this._judge([i]);
  },

  sendMulti() {
    if (this.data.locked) return;
    if (!this.data.selected.length) {
      wx.showToast({ title: '先选答案哦', icon: 'none' });
      return;
    }
    this._judge(this.data.selected.slice());
  },

  _judge(sel) {
    const q = this._questions[this.data.index];
    const ok = sel.length === q.answer.length &&
      sel.every(a => q.answer.indexOf(a) !== -1);

    this.setData({
      locked: true,
      selected: sel,
      options: this._buildOptions(q, sel, true),
    });

    if (ok) {
      this._combo++;
      this._bestCombo = Math.max(this._bestCombo, this._combo);
      wx.vibrateShort({ type: 'light' });
      this.setData({ progressPct: Math.round((this.data.index + 1) / this._questions.length * 100) });
      this._t1 = setTimeout(() => this._next(), 720);
    } else {
      this._combo = 0;
      this._wrong++;
      wx.vibrateShort({ type: 'heavy' });
      // 碎一颗心（最低为 0，仅表现层）
      this.setData({ hearts: Math.max(0, this.data.hearts - 1) });
      this._t2 = setTimeout(() => {
        this.setData({
          showOops: true,
          oopsTitle: this._random(['哎呀，答错了！', '小怪挡路！', '就差一点点！', '勇者别灰心！']),
          oopsCorrect: q.answer.map(a => LETTERS[a] + '. ' + q.options[a]).join('；'),
          oopsExplain: q.explanation,
        });
      }, 620);
    }
  },

  closeOops() {
    this.setData({ showOops: false });
    this._next();
  },

  _next() {
    const i = this.data.index;
    if (i >= this._questions.length - 1) return this._finish();
    this._ask(i + 1);
  },

  /* ================= 结算 ================= */

  _finish() {
    const total = this._questions.length;
    const wrong = this._wrong;
    const passed = wrong === 0;
    const lv = this._lv;
    const seconds = Math.max(1, Math.round((Date.now() - this._start) / 1000));
    const statTime = Math.floor(seconds / 60) + ' 分 ' + (seconds % 60) + ' 秒';

    let newBest = false;

    // 写入该关记录（沿用 dsh_quiz_records，key 加 adv_ 前缀，不污染面试统计）
    const stars = passed ? 3 : 0;
    const score = passed ? 100 + Math.max(0, 60 - seconds) + this._bestCombo * 5 : 0;
    const prev = (store.getQuizRecords()['adv_' + lv.quizKey]) || {};
    store.saveQuizResult('adv_' + lv.quizKey, {
      correct: total - wrong, total, score, stars,
      wrongIds: [],
    });
    newBest = passed && score > (prev.bestScore || 0);

    // 通关 → 推进冒险进度
    if (passed && !this.data.practice) {
      const progress = this._getProgress();
      if (this.data.levelIdx === progress.unlocked && progress.unlocked < ADV.LEVELS.length) {
        progress.unlocked++;
        this._saveProgress(progress);
      }
    }

    if (passed) {
      wx.vibrateLong && wx.vibrateLong();
      this.setData({ bursts: BURSTS });
    } else {
      const lv = this._lv;
      this.setData({
        failQuip: this._random([
          '小怪「' + lv.monster + '」嘿嘿一笑：题目重新洗牌了哦！',
          '答错 ' + wrong + ' 题，勇者原地休整，满血再战！',
          '差一点就登顶这一关了，再来一次一定行！',
        ]),
      });
    }

    this.setData({
      phase: 'result',
      passed,
      statTime,
      statWrong: wrong,
      statBestCombo: this._bestCombo,
      newBest,
    });
    wx.setNavigationBarTitle({ title: passed ? '🎉 通关成功' : '💪 再接再厉' });
  },

  /* ================= 按钮 ================= */

  goMap() {
    wx.navigateBack({ delta: 1, fail: () => {} });
  },

  retry() {
    // 重新随机组题，原地再战
    const rec = (store.getQuizRecords()['adv_' + this._lv.quizKey]) || {};
    this.setData({
      statAttempt: this.data.practice ? 0 : (rec.attempts || 0) + 1,
      bursts: [],
    });
    wx.setNavigationBarTitle({ title: '第 ' + (this.data.levelIdx + 1) + ' 关 · ' + this._lv.name });
    this._newRound();
  },

  nextLevel() {
    const next = this.data.levelIdx + 1;
    if (next >= ADV.LEVELS.length) return this.goMap();
    wx.redirectTo({
      url: '/packages/quiz/pages/adventure/adventure?level=' + next,
      fail: () => this.goMap(),
    });
  },

  /* ================= 工具 ================= */

  _getProgress() {
    try {
      return wx.getStorageSync('dsh_adventure') || { unlocked: 0 };
    } catch (e) { return { unlocked: 0 }; }
  },

  _saveProgress(p) {
    try { wx.setStorageSync('dsh_adventure', p); } catch (e) {}
  },

  _random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // 空操作：拦截弹层点击穿透
  noop() {},

  onUnload() {
    clearTimeout(this._t1);
    clearTimeout(this._t2);
  },

  ...share.attach(
    function () {
      return this.data.passed
        ? '我在「勇者冒险岛」第 ' + (this.data.levelIdx + 1) + ' 关满分通关！你也来挑战？'
        : 'AI Agent 勇者冒险岛：答题闯关，满 10 题全对才能进阶，敢来吗？';
    },
    function () {
      return '/packages/quiz/pages/adventure/adventure?level=' + this.data.levelIdx;
    }
  ),
});
