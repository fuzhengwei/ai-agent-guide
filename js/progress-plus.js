/* ========================================
   AI Agent Guide - 学习进度增强
   累计学习时长 · 阅读位置记忆与恢复 · 阅读进度条 · 继续学习
   ======================================== */

const ProgressPlus = {
  STORE_KEY: 'ai-agent-guide-progress-plus',
  MAX_SCROLL_TIME_GAP: 30000, // 计时：超过 30s 无滚动视为离开

  data: null,
  _timeTimer: null,
  _saveTimer: null,
  _lastActive: Date.now(),

  init() {
    try {
      this.data = JSON.parse(localStorage.getItem(this.STORE_KEY)) || {};
    } catch (e) {
      this.data = {};
    }
    this.data.chapters = this.data.chapters || {};
    this.data.totalTime = this.data.totalTime || 0;      // 累计学习毫秒数
    this.data.days = this.data.days || {};               // 每日学习毫秒数 { 'YYYY-MM-DD': ms }
    this._injectReadingBar();
    this._injectStudyTimeBadge();
    this._bindActivityTracking();
  },

  /* ================= 数据层 ================= */

  save() {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(this.data));
  },

  getChapter(id) {
    return this.data.chapters[id] || {};
  },

  setChapter(id, patch) {
    if (!this.data.chapters[id]) this.data.chapters[id] = {};
    Object.assign(this.data.chapters[id], patch);
    this._scheduleSave();
  },

  _scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this.save(), 800);
  },

  /* ================= 阅读进度条（内容区顶部） ================= */

  _injectReadingBar() {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    const bar = document.createElement('div');
    bar.className = 'reading-progress-bar';
    bar.innerHTML = '<div class="reading-progress-fill" id="readingProgressFill"></div>';
    contentArea.insertBefore(bar, contentArea.firstChild);

    const fill = bar.querySelector('.reading-progress-fill');
    contentArea.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = contentArea;
      const max = scrollHeight - clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((scrollTop / max) * 100)) : 0;
      fill.style.width = pct + '%';
      fill.dataset.pct = pct;

      // 节流记录阅读位置
      const chId = App.currentChapter;
      if (chId) {
        const prev = this.getChapter(chId).scrollPct || 0;
        if (pct >= prev) this.setChapter(chId, { scrollPct: pct, updatedAt: Date.now() });
      }
    }, { passive: true });
  },

  /* ================= 侧边栏累计学习时长 ================= */

  _injectStudyTimeBadge() {
    const progressBox = document.querySelector('.sidebar-progress');
    if (!progressBox || document.getElementById('studyTimeBadge')) return;
    const badge = document.createElement('div');
    badge.className = 'study-time-badge';
    badge.id = 'studyTimeBadge';
    progressBox.appendChild(badge);
    this.updateStudyTimeBadge();
  },

  updateStudyTimeBadge() {
    const badge = document.getElementById('studyTimeBadge');
    if (!badge) return;
    const ms = (this.data.totalTime || 0);
    const mins = Math.floor(ms / 60000);
    const days = Object.keys(this.data.days).length;
    let text;
    if (mins < 1) text = '今天开始学习吧';
    else if (mins < 60) text = `累计学习 ${mins} 分钟`;
    else text = `累计学习 ${Math.floor(mins / 60)} 小时 ${mins % 60} 分`;
    badge.innerHTML = `<span>⏱ ${text}</span>${days > 0 ? `<span class="study-days">📅 ${days} 天</span>` : ''}`;
  },

  /* ================= 学习时长统计 ================= */

  _bindActivityTracking() {
    // 每 15 秒结算一次活跃时间（页面可见时）
    this._timeTimer = setInterval(() => this._accrueTime(), 15000);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this._accrueTime();
      this._lastActive = Date.now();
    });
    // 滚动视为活跃
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.addEventListener('scroll', () => { this._lastActive = Date.now(); }, { passive: true });
    }
    window.addEventListener('beforeunload', () => this._accrueTime());
  },

  _accrueTime() {
    // 页面隐藏或长时间无交互不计时
    if (document.hidden) return;
    if (Date.now() - this._lastActive > this.MAX_SCROLL_TIME_GAP) {
      this._lastActive = Date.now();
      return;
    }
    const delta = 15000;
    this.data.totalTime = (this.data.totalTime || 0) + delta;
    const day = this._today();
    this.data.days[day] = (this.data.days[day] || 0) + delta;
    this._lastActive = Date.now();
    this.updateStudyTimeBadge();
    this._scheduleSave();
  },

  _today() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  },

  /* ================= 阅读位置恢复 ================= */

  /**
   * 章节内容加载完成后调用：询问是否恢复上次阅读位置
   */
  maybeRestorePosition(chapterId) {
    const info = this.getChapter(chapterId);
    const pct = info.scrollPct || 0;
    if (pct < 8 || pct > 92) return; // 开头/结尾不需要恢复
    const bar = document.getElementById('readingProgressFill');
    const barPct = bar ? (parseFloat(bar.dataset.pct) || 0) : 0;
    if (barPct > 8) return; // 用户已经自己在滚动了

    const tip = document.createElement('div');
    tip.className = 'resume-position-tip';
    tip.innerHTML = `
      <span>📖 上次读到本章 <b>${pct}%</b> 处</span>
      <button class="resume-yes">跳转过去</button>
      <button class="resume-no">从头看</button>
    `;
    document.getElementById('contentBody').appendChild(tip);
    const remove = () => tip.remove();
    tip.querySelector('.resume-yes').addEventListener('click', () => {
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        const max = contentArea.scrollHeight - contentArea.clientHeight;
        contentArea.scrollTo({ top: max * pct / 100, behavior: 'smooth' });
      }
      remove();
    });
    tip.querySelector('.resume-no').addEventListener('click', () => {
      this.setChapter(chapterId, { scrollPct: 0 });
      remove();
    });
    // 10 秒后自动消失
    setTimeout(() => { if (tip.isConnected) remove(); }, 10000);
  },

  /* ================= 封面「继续学习」 ================= */

  injectContinueCard() {
    const btnGroup = document.querySelector('.hero-btn-group');
    if (!btnGroup || document.getElementById('continueStudyBtn')) return;

    // 找最近学习的章节：优先「学习中」，其次「已完成」里最新的
    const all = Progress.getAll();
    let lastId = null, lastTs = 0;
    Object.keys(all.chapters).forEach(id => {
      const c = all.chapters[id];
      const ts = c.completedAt || c.startedAt || 0;
      if (c.status === 'learning' && ts > lastTs) { lastId = id; lastTs = ts; }
    });
    if (!lastId) {
      Object.keys(all.chapters).forEach(id => {
        const c = all.chapters[id];
        const ts = c.completedAt || c.startedAt || 0;
        if (ts > lastTs) { lastId = id; lastTs = ts; }
      });
    }

    const ch = lastId && App.chapters ? App.chapters.find(c => c.id === lastId) : null;
    const ms = this.data.totalTime || 0;
    const mins = Math.floor(ms / 60000);
    const timeText = mins >= 60
      ? `${Math.floor(mins / 60)} 小时 ${mins % 60} 分`
      : (mins > 0 ? `${mins} 分钟` : '尚未开始');

    const card = document.createElement('div');
    card.className = 'hero-continue-card';
    card.id = 'continueStudyBtn';
    card.innerHTML = ch
      ? `<div class="hc-info">
           <span class="hc-label">📅 上次学习</span>
           <span class="hc-title">第${ch.num}章 ${ch.title}</span>
           <span class="hc-meta">⏱ 累计学习 ${timeText} · 已学 ${Object.keys(all.chapters).length} 章</span>
         </div>
         <button class="hc-btn" onclick="App.loadChapter('${ch.id}')">继续学习 →</button>`
      : `<div class="hc-info">
           <span class="hc-label">👋 欢迎开始学习</span>
           <span class="hc-meta">⏱ 累计学习 ${timeText}</span>
         </div>`;
    btnGroup.parentNode.insertBefore(card, btnGroup.nextSibling);
  },

  /* ================= 章节切换钩子 ================= */

  onChapterLoaded(chapterId) {
    // 重置阅读进度条到 0
    const fill = document.getElementById('readingProgressFill');
    if (fill) { fill.style.width = '0%'; fill.dataset.pct = '0'; }
    this._lastActive = Date.now();
    // 内容渲染完成后延迟检测恢复位置（等骨架屏/动画结束）
    setTimeout(() => this.maybeRestorePosition(chapterId), 1200);
  },

  onGoHome() {
    this._accrueTime();
    this.injectContinueCard();
    const fill = document.getElementById('readingProgressFill');
    if (fill) { fill.style.width = '0%'; fill.dataset.pct = '0'; }
  }
};

window.ProgressPlus = ProgressPlus;
