/* ========================================
   AI Agent Guide - 阅读工具
   字号调整 · 语音朗读（Web Speech API，纯前端免费）
   ======================================== */

const Reader = {
  SCALE_KEY: 'ai-agent-guide-reader-scale',
  TTS_KEY: 'ai-agent-guide-tts-settings',

  scale: 1,
  MIN_SCALE: 0.8,
  MAX_SCALE: 1.6,
  STEP: 0.1,

  panelEl: null,
  panelMode: null, // 'font' | 'tts' | null

  voices: [],
  tts: {
    segments: [],
    index: 0,
    state: 'idle', // idle | playing | paused
    settings: { voiceURI: '', rate: 1, pitch: 1 }
  },

  init() {
    // 恢复字号
    const savedScale = parseFloat(localStorage.getItem(this.SCALE_KEY));
    if (!isNaN(savedScale) && savedScale >= this.MIN_SCALE && savedScale <= this.MAX_SCALE) {
      this.scale = savedScale;
    }
    this.applyScale(this.scale);

    // 恢复朗读设置
    try {
      const s = JSON.parse(localStorage.getItem(this.TTS_KEY));
      if (s) this.tts.settings = { ...this.tts.settings, ...s };
    } catch (e) { /* ignore */ }

    this.injectButtons();
    this.loadVoices();
    if ('speechSynthesis' in window) {
      // Chrome 异步加载音色列表
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  },

  /* ================= 顶栏按钮 & 弹层 ================= */

  injectButtons() {
    const header = document.querySelector('.content-header');
    const navBtns = header?.querySelector('.nav-buttons');
    if (!header || !navBtns || document.getElementById('readerFontBtn')) return;

    const ttsBtn = document.createElement('button');
    ttsBtn.className = 'nav-btn tool-btn';
    ttsBtn.id = 'readerTtsBtn';
    ttsBtn.textContent = '🔊';
    ttsBtn.title = '语音朗读';
    ttsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!('speechSynthesis' in window)) {
        App.showToast('当前浏览器不支持语音朗读');
        return;
      }
      this.togglePanel('tts');
    });

    const fontBtn = document.createElement('button');
    fontBtn.className = 'nav-btn tool-btn';
    fontBtn.id = 'readerFontBtn';
    fontBtn.textContent = 'Aa';
    fontBtn.title = '调整字号';
    fontBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePanel('font');
    });

    // 插到「上一章/下一章」按钮前面
    navBtns.insertBefore(fontBtn, navBtns.firstChild);
    navBtns.insertBefore(ttsBtn, fontBtn);

    // 弹层容器
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'reader-popover';
    this.panelEl.id = 'readerPopover';
    header.appendChild(this.panelEl);

    // 点击空白关闭
    document.addEventListener('click', (e) => {
      if (this.panelMode && this.panelEl && !this.panelEl.contains(e.target) &&
          e.target !== fontBtn && e.target !== ttsBtn) {
        this.closePanel();
      }
    });
  },

  togglePanel(mode) {
    if (this.panelMode === mode) {
      this.closePanel();
      return;
    }
    this.panelMode = mode;
    if (mode === 'font') this.renderFontPanel();
    else this.renderTtsPanel();
    this.panelEl.classList.add('show');
  },

  closePanel() {
    this.panelMode = null;
    if (this.panelEl) this.panelEl.classList.remove('show');
  },

  renderFontPanel() {
    this.panelEl.innerHTML = `
      <div class="reader-pop-title">🔤 字号调整</div>
      <div class="reader-font-controls">
        <button id="fontDecBtn" title="缩小字号">A－</button>
        <span class="reader-font-value" id="fontValue">${Math.round(this.scale * 100)}%</span>
        <button id="fontIncBtn" title="放大字号">A＋</button>
      </div>
      <button class="reader-reset-btn" id="fontResetBtn">恢复默认 100%</button>
      <div class="reader-pop-hint" style="margin-top:8px;">范围 80% – 160%，自动保存，仅影响正文阅读区（表格/代码保持不变）</div>
    `;
    this.updateFontButtons();
    document.getElementById('fontDecBtn').addEventListener('click', () => this.stepScale(-1));
    document.getElementById('fontIncBtn').addEventListener('click', () => this.stepScale(1));
    document.getElementById('fontResetBtn').addEventListener('click', () => this.applyScale(1));
  },

  stepScale(dir) {
    let next = Math.round((this.scale + dir * this.STEP) * 10) / 10;
    next = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, next));
    this.applyScale(next);
  },

  applyScale(scale, save = true) {
    this.scale = scale;
    document.documentElement.style.setProperty('--reader-scale', scale);
    if (save) localStorage.setItem(this.SCALE_KEY, String(scale));
    this.updateFontButtons();
  },

  updateFontButtons() {
    const val = document.getElementById('fontValue');
    if (val) val.textContent = Math.round(this.scale * 100) + '%';
    const dec = document.getElementById('fontDecBtn');
    const inc = document.getElementById('fontIncBtn');
    if (dec) dec.disabled = this.scale <= this.MIN_SCALE;
    if (inc) inc.disabled = this.scale >= this.MAX_SCALE;
  },

  /* ================= 语音朗读 ================= */

  loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const all = speechSynthesis.getVoices();
    if (!all.length) return;
    const zh = all.filter(v => /^zh[-_]?/i.test(v.lang) || /中文|Chinese|普通话/i.test(v.name));
    this.voices = zh.length ? zh : all;
    // 已保存的音色失效时回退到第一个
    if (this.voices.length && !this.voices.some(v => v.voiceURI === this.tts.settings.voiceURI)) {
      this.tts.settings.voiceURI = this.voices[0].voiceURI;
    }
    this.renderVoiceOptions();
  },

  _niceName(v) {
    const map = [
      ['ting-ting', '婷婷 · 女声'], ['tingting', '婷婷 · 女声'],
      ['mei-jia', '美佳 · 女声'], ['sinji', '善怡 · 粤语女声'],
      ['google 普通话', '谷歌 · 普通话女声'],
      ['xiaoxiao', '晓晓 · 女声'], ['yunxi', '云希 · 男声'],
      ['yunyang', '云扬 · 新闻男声'], ['yunjian', '云健 · 男声'],
      ['xiaoyi', '晓伊 · 女声'], ['lili', '莉莉 · 女声'],
      ['xiaohan', '晓涵 · 女声'], ['xiaomo', '晓墨 · 女声'],
      ['yunye', '云野 · 男声']
    ];
    const key = v.name.toLowerCase();
    for (const [k, label] of map) {
      if (key.includes(k)) return label;
    }
    return v.name;
  },

  renderVoiceOptions() {
    const select = document.getElementById('ttsVoiceSelect');
    if (!select) return;
    select.innerHTML = this.voices.map(v => {
      const label = this._niceName(v);
      const tag = v.lang.toUpperCase();
      return `<option value="${this.escapeAttr(v.voiceURI)}" ${v.voiceURI === this.tts.settings.voiceURI ? 'selected' : ''}>${this.escapeAttr(label)}（${tag}）</option>`;
    }).join('');
  },

  renderTtsPanel() {
    this.panelEl.innerHTML = `
      <div class="reader-pop-title">🔊 语音朗读</div>
      <label class="reader-field">音色
        <select id="ttsVoiceSelect"></select>
      </label>
      <label class="reader-field">语速 <span id="ttsRateValue">${this.tts.settings.rate.toFixed(1)}x</span>
        <input type="range" id="ttsRate" min="0.5" max="2" step="0.1" value="${this.tts.settings.rate}">
      </label>
      <label class="reader-field">音调 <span id="ttsPitchValue">${this.tts.settings.pitch.toFixed(1)}</span>
        <input type="range" id="ttsPitch" min="0.5" max="2" step="0.1" value="${this.tts.settings.pitch}">
      </label>
      <div class="reader-tts-controls">
        <button id="ttsPlayBtn" class="primary">▶ 朗读</button>
        <button id="ttsPauseBtn">⏸ 暂停</button>
        <button id="ttsStopBtn">⏹ 停止</button>
      </div>
      <div class="reader-tts-status" id="ttsStatus">${this._statusText()}</div>
      <div class="reader-pop-hint">朗读时自动高亮并跟随当前段落；切换章节自动停止</div>
    `;
    this.renderVoiceOptions();

    document.getElementById('ttsVoiceSelect').addEventListener('change', (e) => {
      this.tts.settings.voiceURI = e.target.value;
      this.saveTtsSettings();
      // 换音色立即生效：重新朗读当前段
      if (this.tts.state === 'playing') {
        speechSynthesis.cancel();
        this._speakCurrent();
      }
    });
    const rate = document.getElementById('ttsRate');
    rate.addEventListener('input', (e) => {
      this.tts.settings.rate = parseFloat(e.target.value);
      document.getElementById('ttsRateValue').textContent = this.tts.settings.rate.toFixed(1) + 'x';
      this.saveTtsSettings();
    });
    rate.addEventListener('change', () => {
      // 拖动结束后重读当前段，让语速立即生效
      if (this.tts.state === 'playing') {
        speechSynthesis.cancel();
        this._speakCurrent();
      }
    });
    const pitch = document.getElementById('ttsPitch');
    pitch.addEventListener('input', (e) => {
      this.tts.settings.pitch = parseFloat(e.target.value);
      document.getElementById('ttsPitchValue').textContent = this.tts.settings.pitch.toFixed(1);
      this.saveTtsSettings();
    });

    document.getElementById('ttsPlayBtn').addEventListener('click', () => this.play());
    document.getElementById('ttsPauseBtn').addEventListener('click', () => this.pauseToggle());
    document.getElementById('ttsStopBtn').addEventListener('click', () => this.stopTTS());
    this.updateTtsButtons();
  },

  saveTtsSettings() {
    localStorage.setItem(this.TTS_KEY, JSON.stringify(this.tts.settings));
  },

  _statusText() {
    if (this.tts.state === 'playing') {
      return `正在朗读 ${this.tts.index + 1}/${this.tts.segments.length} 段…`;
    }
    if (this.tts.state === 'paused') return '已暂停';
    return '未在朗读';
  },

  updateTtsButtons() {
    const playBtn = document.getElementById('ttsPlayBtn');
    const pauseBtn = document.getElementById('ttsPauseBtn');
    const status = document.getElementById('ttsStatus');
    if (playBtn) {
      playBtn.textContent = this.tts.state === 'paused' ? '▶ 继续' : '▶ 朗读';
      playBtn.disabled = this.tts.state === 'playing';
    }
    if (pauseBtn) pauseBtn.disabled = this.tts.state === 'idle';
    if (status) status.textContent = this._statusText();
    // 顶栏按钮高亮
    const ttsBtn = document.getElementById('readerTtsBtn');
    if (ttsBtn) ttsBtn.classList.toggle('active', this.tts.state !== 'idle');
  },

  /**
   * 收集当前章节可朗读的段落（仅当前可见 Tab 的正文）
   */
  collectSegments() {
    const body = document.getElementById('contentBody');
    if (!body) return [];
    const SEL = 'p, li, blockquote, h1.chapter-title, h2.section-heading, h3.sub-heading, .qa-question, .qa-answer, .summary-title';
    const out = [];
    body.querySelectorAll(SEL).forEach(el => {
      // 跳过代码、按钮、考试题、隐藏 Tab、底部导航
      if (el.closest('pre, code, .code-block, .code-block-wrapper, script, button, .step-controls, .chapter-tabs-nav, .chapter-nav-bottom, .quiz-section, #quizArea, .tab-hidden, .flowchart-container, svg')) return;
      // 含有子文本块的容器跳过（避免重复朗读）
      if (el.querySelector('p, li, blockquote, .qa-question, .qa-answer, h2, h3')) return;
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (!text || text.length < 2) return;
      // 长段落按句子拆分，避免一次性朗读过长
      if (text.length > 160) {
        const parts = text.match(/[^。！？!?；;\n]+[。！？!?；;]?/g) || [text];
        let buf = '';
        parts.forEach(p => {
          if ((buf + p).length > 160) {
            if (buf) out.push({ el, text: buf });
            buf = p;
          } else {
            buf += p;
          }
        });
        if (buf) out.push({ el, text: buf });
      } else {
        out.push({ el, text });
      }
    });
    return out;
  },

  play() {
    if (!('speechSynthesis' in window)) {
      App.showToast('当前浏览器不支持语音朗读');
      return;
    }
    if (this.tts.state === 'paused') {
      speechSynthesis.resume();
      this.tts.state = 'playing';
      this.updateTtsButtons();
      return;
    }
    if (this.tts.state === 'playing') return;

    this.tts.segments = this.collectSegments();
    if (!this.tts.segments.length) {
      App.showToast('当前章节没有可朗读的文本');
      return;
    }
    this.tts.index = 0;
    this.tts.state = 'playing';
    this._speakCurrent();
  },

  _speakCurrent() {
    if (this.tts.state !== 'playing') return;
    const seg = this.tts.segments[this.tts.index];
    if (!seg) {
      // 读完了
      this.stopTTS();
      App.showToast('✅ 本章朗读完成');
      return;
    }
    this._highlight(seg.el);
    this.updateTtsButtons();

    const u = new SpeechSynthesisUtterance(seg.text);
    const voice = this.voices.find(v => v.voiceURI === this.tts.settings.voiceURI);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = 'zh-CN';
    }
    u.rate = this.tts.settings.rate;
    u.pitch = this.tts.settings.pitch;
    u.onend = () => {
      if (this.tts.state !== 'playing') return;
      this.tts.index++;
      // 段与段之间稍作停顿
      setTimeout(() => this._speakCurrent(), 180);
    };
    u.onerror = () => {
      if (this.tts.state !== 'playing') return;
      this.tts.index++;
      setTimeout(() => this._speakCurrent(), 180);
    };
    speechSynthesis.speak(u);
  },

  _highlight(el) {
    document.querySelectorAll('.tts-reading').forEach(x => x.classList.remove('tts-reading'));
    if (!el) return;
    el.classList.add('tts-reading');
    // 仅当目标不在视口时滚动
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < 80 || rect.bottom > vh - 120) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  pauseToggle() {
    if (this.tts.state === 'playing') {
      speechSynthesis.pause();
      this.tts.state = 'paused';
    } else if (this.tts.state === 'paused') {
      speechSynthesis.resume();
      this.tts.state = 'playing';
    }
    this.updateTtsButtons();
  },

  stopTTS(silent = false) {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    this.tts.state = 'idle';
    this.tts.segments = [];
    this.tts.index = 0;
    this._highlight(null);
    this.updateTtsButtons();
    if (!silent && this.panelMode === 'tts') this.updateTtsButtons();
  },

  /**
   * 章节切换 / 回首页时调用
   */
  onChapterChange() {
    this.stopTTS(true);
    this.closePanel();
  },

  escapeAttr(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
};

window.Reader = Reader;
