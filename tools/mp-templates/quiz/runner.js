/**
 * 模拟面试：面试官以聊天气泡逐题提问 → 作答 → 现场点评 + 标准答案 → 面试报告
 * 去掉生命值/倒计时/连击，保留进度与评级（复用 store 的正确率评级规则）
 *
 * 两种进入方式：
 *   ?ch=ch01           单章面试（章节解锁链，存章节记录）
 *   ?mix=mix_all       混合面试（utils/mix.js 跨章组题，不计入解锁链）
 * 可选 &style=sharp   指定面试官风格
 */
const store = require('../../../../utils/store.js');
const IV = require('../../../../utils/interview.js');
const MIX = require('../../../../utils/mix.js');
const share = require('../../../../utils/share.js');

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

Page({
  data: {
    iv: {},
    chKey: '',
    title: '',
    isMix: false,
    // 对话流
    messages: [],
    typing: false,
    tick: 0,
    scrollInto: '',
    dayText: '',
    // 当前题
    index: 0,
    total: 0,
    options: [],
    selected: [],
    awaiting: false,      // 回答区是否可点
    multiMode: false,
    progressText: '',
    correctCount: 0,
    // 报告
    finished: false,
    report: null,
    hasNext: false,
    nextKey: '',
  },

  onLoad(query) {
    const bank = require('../../data/index.js');
    let questions = [];
    let chKey = '';
    let title = '';
    let isMix = false;
    let next = null;

    if (query.mix) {
      // ===== 混合面试：跨章随机组题 =====
      const mode = MIX.byId(query.mix);
      if (!mode) {
        wx.showToast({ title: '面试方式不存在', icon: 'error' });
        return;
      }
      questions = MIX.build(mode, bank, store.getQuizRecords());
      if (!questions.length) {
        wx.showToast({ title: mode.wrong ? '错题本是空的' : '题库为空', icon: 'none' });
        setTimeout(() => wx.navigateBack({ fail: () => {} }), 600);
        return;
      }
      isMix = true;
      chKey = 'mix_' + mode.id;
      title = mode.emoji + ' ' + mode.name + ' · 混合面试';
    } else {
      // ===== 单章面试 =====
      chKey = query.ch;
      questions = bank[chKey] || [];
      if (!questions.length) {
        wx.showToast({ title: '题库为空', icon: 'error' });
        return;
      }
      const chapters = require('../../../../data/chapters.js');
      const meta = chapters.find(c => c.quizKey === chKey);
      const quizList = chapters.filter(c => c.quizKey);
      const pos = quizList.findIndex(c => c.quizKey === chKey);
      next = pos !== -1 && pos < quizList.length - 1 ? quizList[pos + 1] : null;
      title = meta ? meta.title : chKey;
    }

    const posForIv = isMix ? Math.floor(Math.random() * 7) : this._chapterPos(chKey);
    const iv = query.style
      ? IV.pickByStyle(query.style, posForIv)
      : IV.pick(posForIv);

    this._questions = questions;
    this._results = [];
    this._seq = 0;
    this._start = Date.now();
    this._iv = iv;
    this._isMix = isMix;
    this._modeId = query.mix || '';
    this._styleParam = query.style || '';

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');

    this.setData({
      iv: { name: iv.name, initial: iv.initial, title: iv.title, gradient: iv.gradient },
      chKey,
      title,
      isMix,
      total: questions.length,
      progressText: '第 1 / ' + questions.length + ' 题',
      dayText: hh + ':' + mm,
      nextKey: next ? next.quizKey : '',
      hasNext: !!next,
    });
    wx.setNavigationBarTitle({ title: '模拟面试 · ' + title });

    const lines = iv.open.map(t => t.replace('{title}', title).replace('{n}', questions.length));
    this._say(lines.map(text => ({ role: 'iv', kind: 'plain', text })), () => this.ask(0));
  },

  // 章节场：面试官按章节顺序轮换，保证同场次复访面试官一致
  _chapterPos(chKey) {
    const chapters = require('../../../../data/chapters.js');
    const quizList = chapters.filter(c => c.quizKey);
    const pos = quizList.findIndex(c => c.quizKey === chKey);
    return pos >= 0 ? pos : 0;
  },

  // 分享/转发：转发文案随面试场次与成绩动态变化（含朋友圈入口）
  ...share.attach(
    function () {
      const r = this.data.report;
      if (this.data.finished && r) {
        return `我刚通过了一场 AI Agent 模拟面试，${r.total} 题答对 ${r.correct} 题，评级 ${r.grade}，你也来试试？`;
      }
      return 'AI Agent 模拟面试 · 大厂面试官现场点评';
    },
    function () {
      const style = this._styleParam ? '&style=' + this._styleParam : '';
      return this._isMix
        ? '/packages/quiz/pages/runner/runner?mix=' + this._modeId + style
        : '/packages/quiz/pages/runner/runner?ch=' + this.data.chKey + style;
    }
  ),

  onUnload() {
    this._gone = true;
    clearTimeout(this._t1);
    clearTimeout(this._t2);
  },

  /* ================= 消息流 ================= */

  _say(list, done) {
    let i = 0;
    const step = () => {
      if (this._gone) return;
      if (i >= list.length) { if (done) done(); return; }
      const msg = list[i];
      this.setData({ typing: true });
      // 分析类气泡（标准答案+解析）很长，等它渲染完再校准一次滚动
      this._bottom(msg.kind === 'analysis');
      const wait = Math.min(420 + (msg.text || '').length * 12, 1200);
      this._t1 = setTimeout(() => {
        if (this._gone) return;
        this.setData({ typing: false });
        this._push(msg);
        i++;
        this._t2 = setTimeout(step, 240);
      }, wait);
    };
    step();
  },

  _push(msg) {
    const id = ++this._seq;
    const payload = { id, role: msg.role, kind: msg.kind, text: msg.text || '' };
    if (msg.label) payload.label = msg.label;
    if (msg.title) payload.title = msg.title;
    if (msg.answerText) payload.answerText = msg.answerText;
    this.setData({ messages: this.data.messages.concat([payload]) });
    this._bottom();
  },

  // 滚到底部：scroll-into-view 只有值变化才触发。
  // 但 scroll-view 内容高度尚未铺好时立即 setData 会被忽略，
  // 这里先清空、等下一帧内容渲染完成后再设置目标锚点，保证每次必滚。
  // again=true 时 400ms 后再校准一次：选项面板弹出/收起、长气泡渲染
  // 都会改变容器高度，等布局稳定后再跳一次，避免新内容被面板挡在屏幕外。
  _bottom(again) {
    const jump = () => {
      if (this._gone) return;
      const tick = this.data.tick + 1;
      const target = 'bt' + tick;
      this.setData({ tick, scrollInto: '' });
      setTimeout(() => {
        if (this._gone) return;
        this.setData({ scrollInto: target });
      }, 60);
    };
    jump();
    if (again) setTimeout(jump, 400);
  },

  _random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  _stageNote(correct, done) {
    const r = correct / done;
    if (r >= 0.8) return '前面这几个问题答得都不错，我们保持这个节奏。';
    if (r >= 0.5) return '嗯，中间有几处需要留意，我们接着往下。';
    return '前面这部分基础还不太牢，后面的题我讲细一点。';
  },

  /* ================= 出题 ================= */

  ask(i) {
    const q = this._questions[i];
    const multiMode = q.type === 'multi' || (Array.isArray(q.answer) && q.answer.length > 1);
    this.setData({
      index: i,
      awaiting: false,
      selected: [],
      options: [],
      multiMode,
      progressText: '第 ' + (i + 1) + ' / ' + this.data.total + ' 题',
    });
    this._say([{
      role: 'iv', kind: 'question',
      label: '问题 ' + (i + 1) + ' / ' + this.data.total,
      text: q.question,
    }], () => {
      // awaiting=true 会让底部选项面板弹出、对话区变矮，面板动画 300ms；
      // 这里二次校准滚动，确保新题完整滚进视野
      this.setData({ options: this._buildOptions(q, [], false), awaiting: true });
      this._bottom(true);
    });
  },

  /* WXML 不支持方法调用，选项状态一律在 JS 算好 */
  _buildOptions(q, selected, answered) {
    const right = Array.isArray(q.answer) ? q.answer : [q.answer];
    return q.options.map((text, oi) => {
      let cls = '';
      let mark = '';
      if (answered) {
        if (right.indexOf(oi) !== -1) { cls = 'right'; mark = '✓'; }
        else if (selected.indexOf(oi) !== -1) { cls = 'wrong'; mark = '✗'; }
      } else if (selected.indexOf(oi) !== -1) {
        cls = 'picked';
      }
      return { oi, letter: LETTERS[oi], text, cls, mark };
    });
  },

  /* ================= 作答 ================= */

  pickOption(e) {
    if (!this.data.awaiting) return;
    const i = Number(e.currentTarget.dataset.i);
    const q = this._questions[this.data.index];
    if (this.data.multiMode) {
      const selected = this.data.selected.slice();
      const pos = selected.indexOf(i);
      if (pos === -1) selected.push(i); else selected.splice(pos, 1);
      this.setData({ selected, options: this._buildOptions(q, selected, false) });
      wx.vibrateShort({ type: 'light' });
      return;
    }
    this.send([i]);
  },

  sendMulti() {
    if (!this.data.awaiting) return;
    if (!this.data.selected.length) {
      wx.showToast({ title: '先选一个再发送', icon: 'none' });
      return;
    }
    this.send(this.data.selected.slice());
  },

  send(sel) {
    const idx = this.data.index;
    const q = this._questions[idx];
    const right = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ok = right.length === sel.length &&
      right.every(a => sel.indexOf(a) !== -1) &&
      sel.every(a => right.indexOf(a) !== -1);
    const correctCount = this.data.correctCount + (ok ? 1 : 0);
    this._results[idx] = ok;

    this.setData({
      awaiting: false,
      selected: [],
      options: [],
      correctCount,
    });

    // ① 我的回答落成气泡（回答后面板收起、点评气泡较长，二次校准）
    this._push({
      role: 'me', kind: 'answer',
      text: sel.slice().sort((a, b) => a - b)
        .map(i => LETTERS[i] + '. ' + q.options[i]).join('；'),
    });
    wx.vibrateShort({ type: ok ? 'light' : 'heavy' });

    // ② 面试官点评 + 标准答案
    const iv = this._iv;
    const lines = [{
      role: 'iv',
      kind: ok ? 'ok' : 'bad',
      text: this._random(ok ? iv.praise : iv.push),
    }];
    if (ok) {
      if (q.explanation) {
        lines.push({ role: 'iv', kind: 'analysis', title: '考点延伸', text: q.explanation });
      }
    } else {
      lines.push({
        role: 'iv', kind: 'analysis',
        title: '面试官给你的标准答案',
        answerText: right.map(a => LETTERS[a] + '. ' + q.options[a]).join('；'),
        text: q.explanation || '',
      });
    }

    this._say(lines, () => {
      const i = this.data.index;
      if (i >= this.data.total - 1) return this.finish();
      const done = i + 1;
      // 每 5 题给一次阶段性反馈，让对话有节奏
      if (done % 5 === 0 && done < this.data.total) {
        this._say([{ role: 'iv', kind: 'note', text: this._stageNote(correctCount, done) }],
          () => this.ask(i + 1));
        return;
      }
      this.ask(i + 1);
    });
  },

  /* ================= 面试报告 ================= */

  finish() {
    const total = this.data.total;
    const correct = this.data.correctCount;
    const ratio = total ? correct / total : 0;
    const stars = store.calcStars(correct, total);
    const score = correct * 10 + (ratio === 1 ? 20 : 0);
    const g = IV.gradeOf(stars);
    const seconds = Math.max(1, Math.round((Date.now() - this._start) / 1000));
    const durationText = Math.floor(seconds / 60) + ' 分 ' + (seconds % 60) + ' 秒';
    const prev = store.getQuizRecords()[this.data.chKey];

    // 错题 id 集合：混合场与章节场都记，供错题重练使用
    const wrongIds = this._questions
      .map((q, i) => (this._results[i] ? null : q.id))
      .filter(Boolean);

    store.saveQuizResult(this.data.chKey, { correct, total, score, stars, wrongIds });

    // 错题重练模式：本次答对的题从错题本移除
    if (this._isMix && this._modeId === 'mix_wrong') {
      const rightIds = this._questions
        .map((q, i) => (this._results[i] ? q.id : null))
        .filter(Boolean);
      // 错题原属各章节记录，按 id 全局移除
      const records = store.getQuizRecords();
      Object.keys(records).forEach(k => {
        const hit = (records[k].wrongIds || []).filter(id => rightIds.indexOf(id) !== -1);
        if (hit.length) store.removeWrongIds(k, hit);
      });
    }

    const wrongList = [];
    this._questions.forEach((q, i) => {
      if (this._results[i]) return;
      const right = Array.isArray(q.answer) ? q.answer : [q.answer];
      wrongList.push({
        n: i + 1,
        question: q.question,
        answer: right.map(a => LETTERS[a] + '. ' + q.options[a]).join('；'),
        explanation: q.explanation || '',
      });
    });

    const sheet = this._questions.map((q, i) => ({
      n: i + 1,
      st: this._results[i] ? 'right' : 'wrong',
    }));

    const report = {
      stars,
      grade: g.grade,
      gradeLabel: g.label,
      remark: g.remark,
      score,
      correct,
      total,
      durationText,
      sheet,
      wrongList,
      newRecord: !prev || score > (prev.bestScore || 0),
      firstTime: !prev,
      rate: Math.round(ratio * 100),
    };

    this._say([
      { role: 'iv', kind: 'plain', text: '好，我这边的问题问完了。' },
      { role: 'iv', kind: 'plain', text: IV.closingByRatio(ratio) },
    ], () => {
      this.setData({ finished: true, report, awaiting: false });
    });
  },

  restart() {
    // 混合面试「再来一局」重新随机组题；章节场沿用原题
    if (this._isMix) {
      this._reloadMix();
      return;
    }
    this._resetChat();
    const iv = this._iv;
    const lines = iv.open.map(t => t.replace('{title}', this.data.title).replace('{n}', this.data.total));
    this._say(lines.map(text => ({ role: 'iv', kind: 'plain', text })), () => this.ask(0));
  },

  // 混合场重新组题（同一模式再抽一次）
  _reloadMix() {
    const mode = MIX.byId(this._modeId);
    if (!mode) return this._resetChat();
    const bank = require('../../data/index.js');
    const questions = MIX.build(mode, bank, store.getQuizRecords());
    if (!questions.length) return this._resetChat();
    this._questions = questions;
    this._resetChat();
    const iv = this._iv;
    const lines = iv.open.map(t => t.replace('{title}', this.data.title).replace('{n}', this.data.total));
    this._say(lines.map(text => ({ role: 'iv', kind: 'plain', text })), () => this.ask(0));
  },

  _resetChat() {
    this._results = [];
    this._seq = 0;
    this._start = Date.now();
    this.setData({
      messages: [], typing: false, options: [], selected: [], awaiting: false,
      index: 0, correctCount: 0, finished: false, report: null,
      progressText: '第 1 / ' + (this._questions ? this._questions.length : 0) + ' 题',
      total: this._questions ? this._questions.length : 0,
      tick: 0, scrollInto: '',
    });
  },

  goNextLevel() {
    if (!this.data.nextKey) return;
    wx.redirectTo({ url: '/packages/quiz/pages/runner/runner?ch=' + this.data.nextKey });
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
});
