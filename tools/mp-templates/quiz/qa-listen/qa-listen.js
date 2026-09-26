/**
 * 面试题语音讲解：小傅哥念题、咖辣米讲解的双角色课堂模式
 *
 * - 小傅哥（智华·阅读男声）念题目与选项，咖辣米（智瑜·女声）讲答案与解析
 * - 聊天气泡式文字展示：语音播到哪句，对应的题目/选项/答案气泡就滚出来
 * - 默认选中最近学习的章节（没读过则第 0 章）；进度条 + 题目跳转 + 续听位置记忆
 * - 复用 TTS 三级缓存引擎（内存 → 本地文件 → 云存储），重复听几乎免费
 */
const tts = require('../../../../utils/tts.js');
const store = require('../../../../utils/store.js');
const chapters = require('../../../../data/chapters.js');

const TEACHER = { voice: 'reader', name: '小傅哥', emoji: '🧑‍🏫' };  // 智华 · 阅读男声
const STUDENT = { voice: 'standard', name: '咖辣米', emoji: '👧' };  // 智瑜 · 情感女声
const POS_KEY = 'dsh_qa_listen_pos'; // { quizKey: { idx, time } }

const TYPE_LABEL = { single: '单选题', multi: '多选题', multiple: '多选题', judge: '判断题' };
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 把一道题整理成口语化讲解段落（小傅哥/咖辣米交替），同时产出聊天气泡展示数据
function buildSegments(questions) {
  const segs = [];
  const bubbles = [];
  questions.forEach((q, i) => {
    const type = TYPE_LABEL[q.type] || '单选题';
    const opts = Array.isArray(q.options) ? q.options : [];
    const optsText = opts.map((o, j) => `${LETTERS[j] || j}. ${o}`);

    // —— 小傅哥念题 ——（题面末尾已有标点则不再补句号，避免"？。"叠印）
    const qEnd = /[。？！？?!\s]$/.test(q.question) ? '' : '。';
    let qText = `第 ${i + 1} 题，${type}。${q.question}${qEnd}`;
    if (opts.length) {
      qText += '选项分别是：' + opts.map((o, j) => `${LETTERS[j] || j}，${o}`).join('。');
    }
    segs.push({
      role: 'teacher', voice: TEACHER.voice, text: qText, qIndex: i,
      bubble: {
        mid: `t-${i}`, role: 'teacher', qIndex: i,
        title: `第 ${i + 1} 题 · ${type}`,
        question: q.question,
        options: optsText,
      },
    });

    // —— 咖辣米讲答案 ——
    const ansLetters = (q.answer || []).map(a => LETTERS[a] || a).join(' 和 ');
    let aText = `正确答案是 ${ansLetters}。`;
    if (q.explanation) aText += q.explanation;
    segs.push({
      role: 'student', voice: STUDENT.voice, text: aText, qIndex: i,
      bubble: {
        mid: `s-${i}`, role: 'student', qIndex: i,
        answer: ansLetters,
        explanation: q.explanation || '',
      },
    });
  });
  segs.forEach(s => bubbles.push(s.bubble));
  return { segs, bubbles };
}

// 每个题目的起始段下标（题目跳转条用）
function questionAnchors(segs) {
  const anchors = [];
  segs.forEach((s, i) => {
    if (s.role === 'teacher') anchors[s.qIndex] = i;
  });
  return anchors;
}

Page({
  data: {
    ttsOk: false,
    chapters: [],        // 章节选择卡
    quizKey: '',
    chTitle: '',
    qCount: 0,
    anchors: [],
    // 播放状态
    state: 'idle',       // idle / playing / synthesizing / paused / finished
    segIndex: 0,
    qIndex: 0,           // 当前讲到第几题（0 基）
    pct: 0,
    playing: false,
    role: '',            // 当前发声角色 teacher/student
    // 聊天气泡：全文常驻显示（微信聊天记录式），播过的会话变色、当前发声高亮
    bubbles: [],
    saidCount: 0,        // 已播过的段数（播过的气泡做"已读"态）
    curBubble: -1,       // 当前发声的气泡下标
    // 续听
    resumeIdx: -1,
    rate: 1.0,
    cast: { teacher: TEACHER, student: STUDENT },
    scrollId: '',        // 气泡自动滚动锚点
  },

  onLoad(options) {
    const ttsOk = tts.isSupported();
    const chs = chapters.filter(c => c.quizKey && !c.isBoss);
    this.setData({
      ttsOk,
      chapters: chs.map(c => ({ quizKey: c.quizKey, num: c.num, shortTitle: c.title.replace(/^第\d+章\s*/, '') })),
    });

    this._engine = tts.createEngine({
      chapterId: 'qa-listen',
      onState: (s) => this._onState(s),
    });
    this._engine.setVoice(TEACHER.voice);

    if (options && options.ch) {
      this._loadChapter(options.ch);
      return;
    }
    // 默认选中最近学习的章节；没读过则第 0 章
    let defKey = chs.length ? chs[0].quizKey : '';
    try {
      const last = store.getLastChapter();
      if (last && last.key) {
        const hit = chs.find(c => c.key === last.key || c.quizKey === last.key);
        if (hit) defKey = hit.quizKey;
      }
    } catch (e) {}
    if (defKey) this._loadChapter(defKey);
  },

  onUnload() {
    this._savePos();
    if (this._engine) this._engine.destroy();
  },
  onHide() {
    this._savePos();
  },

  _onState(s) {
    const segs = this._engine ? this._engine.getSegments() : [];
    const seg = segs[s.index] || null;
    const qIndex = seg ? seg.qIndex : this.data.qIndex;
    const totalBubbles = this.data.bubbles.length;

    // 气泡展示（全文常驻，微信聊天记录式）：
    //  - 播过的段做"已读"态，当前段高亮描边 + 🔊
    //  - idle（停止）：已读清空回到起点；paused：保持现状
    let saidCount = this.data.saidCount;
    let curBubble = -1;
    if (s.state === 'playing' || s.state === 'synthesizing') {
      saidCount = Math.max(saidCount, s.index + 1);
      curBubble = s.index;
    } else if (s.state === 'finished') {
      saidCount = totalBubbles;
    } else if (s.state === 'idle') {
      saidCount = 0;
    }

    const pct = s.total > 0 ? Math.min(100, Math.round(s.index / s.total * 100)) : 0;

    this.setData({
      state: s.state,
      segIndex: s.index,
      qIndex,
      pct: s.state === 'finished' ? 100 : pct,
      playing: s.state === 'playing' || s.state === 'synthesizing',
      role: seg ? seg.role : '',
      saidCount,
      curBubble,
      scrollId: 'bb-' + Math.max(0, Math.min(s.index, totalBubbles - 1)),
    });
    if (s.state === 'finished') {
      this._clearPos();
      wx.showToast({ title: '本章讲解完毕 🎉', icon: 'none' });
    } else if (s.state === 'playing' || s.state === 'synthesizing') {
      this._savePos();
    }
  },

  // 加载一个章节的题库
  _loadChapter(quizKey, startIdx) {
    let questions = [];
    try {
      // 小程序不支持完全动态 require，走构建期生成的静态索引
      const dataIndex = require('../../data/index.js');
      questions = dataIndex[quizKey];
    } catch (e) {
      questions = null;
    }
    if (!Array.isArray(questions) || !questions.length) {
      wx.showToast({ title: '题库加载失败', icon: 'none' });
      return;
    }
    const ch = chapters.find(c => c.quizKey === quizKey);
    const { segs, bubbles } = buildSegments(questions);
    this._engine.setSegments(segs);

    // 查续听位置
    let resumeIdx = -1;
    if (typeof startIdx === 'number') {
      resumeIdx = startIdx;
    } else {
      try {
        const map = wx.getStorageSync(POS_KEY) || {};
        const rec = map[quizKey];
        if (rec && typeof rec.idx === 'number' && rec.idx > 0 && rec.idx < segs.length) {
          resumeIdx = rec.idx;
        }
      } catch (e) {}
    }

    this.setData({
      quizKey,
      chTitle: ch ? ch.title : quizKey,
      bubbles,
      qCount: questions.length,
      anchors: questionAnchors(segs),
      segIndex: 0,
      qIndex: 0,
      pct: 0,
      state: 'idle',
      playing: false,
      saidCount: 0,
      curBubble: -1,
      resumeIdx,
      // 全文常驻：无续听时先看到开头，有续听则定位到上次位置
      scrollId: resumeIdx >= 0 ? 'bb-' + resumeIdx : '',
    });

    if (resumeIdx >= 0) {
      // 续听：定位到上次气泡位置，弹窗询问
      wx.showModal({
        title: '继续上次收听？',
        content: `上次听到第 ${segs[resumeIdx] ? segs[resumeIdx].qIndex + 1 : 1} 题附近`,
        confirmText: '继续收听',
        cancelText: '从头开始',
        success: (r) => {
          if (r.confirm) {
            this.setData({ saidCount: resumeIdx });
            this._play(resumeIdx);
          }
        },
      });
    }
  },

  pickChapter(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    // 播放中切章节容易听感混乱，先停再切
    if (this.data.playing) {
      wx.showToast({ title: '已停止当前播放', icon: 'none' });
      this._engine.stop();
    }
    wx.vibrateShort({ type: 'light' });
    this._loadChapter(key);
  },

  // 题目胶囊跳转：从该题的"小傅哥念题"段开始
  jumpQuestion(e) {
    const qi = Number(e.currentTarget.dataset.qi);
    const anchor = this.data.anchors[qi];
    if (typeof anchor !== 'number') return;
    wx.vibrateShort({ type: 'light' });
    this._play(anchor);
  },

  // 点气泡从该段重听
  replayBubble(e) {
    const bi = Number(e.currentTarget.dataset.bi);
    if (bi >= 0) this._play(bi);
  },

  togglePlay() {
    if (!this.data.quizKey) {
      wx.showToast({ title: '先选择一个章节', icon: 'none' });
      return;
    }
    const st = this.data.state;
    if (st === 'playing' || st === 'synthesizing') {
      this._engine.pause();
    } else if (st === 'paused') {
      this._engine.resume();
    } else {
      this._play(this.data.segIndex || 0);
    }
  },

  prevQuestion() { this._stepQuestion(-1); },
  nextQuestion() { this._stepQuestion(1); },
  _stepQuestion(delta) {
    const qi = Math.max(0, Math.min(this.data.qCount - 1, this.data.qIndex + delta));
    const anchor = this.data.anchors[qi];
    if (typeof anchor === 'number') this._play(anchor);
  },

  _play(segIdx) {
    if (!this.data.ttsOk) {
      wx.showToast({ title: '云服务未就绪，请稍后再试', icon: 'none' });
      return;
    }
    this._engine.play(segIdx);
  },

  stopPlay() {
    this._engine.stop();
    this.setData({
      playing: false, state: 'idle', pct: 0, segIndex: 0, qIndex: 0,
      saidCount: 0, curBubble: -1, scrollId: '',
    });
    this._clearPos();
  },

  setRate(e) {
    const r = Number(e.currentTarget.dataset.rate);
    this._engine.setRate(r);
    this.setData({ rate: r });
  },

  _savePos() {
    if (!this.data.quizKey || !this._engine) return;
    const idx = this._engine.getIndex();
    if (idx > 0) {
      try {
        const map = wx.getStorageSync(POS_KEY) || {};
        map[this.data.quizKey] = { idx, time: Date.now() };
        wx.setStorageSync(POS_KEY, map);
      } catch (e) {}
    }
  },
  _clearPos() {
    if (!this.data.quizKey) return;
    try {
      const map = wx.getStorageSync(POS_KEY) || {};
      delete map[this.data.quizKey];
      wx.setStorageSync(POS_KEY, map);
    } catch (e) {}
    this.setData({ resumeIdx: -1 });
  },
});
