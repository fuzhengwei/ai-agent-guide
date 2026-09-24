/**
 * 排行榜模块 — 学习时长榜 + 考试高分榜
 * 依赖：UserNotes（云客户端与登录态）、Progress、ProgressPlus
 * 数据：user_profiles（昵称/时长/完成章节数，本人可写）、exam_records（每次成绩，本人可写）
 * 排行：get_leaderboard RPC（SECURITY DEFINER，只暴露昵称，不暴露邮箱）
 */
const Leaderboard = {
  _syncTimer: null,
  _lastSyncedMs: 0,
  SYNC_INTERVAL: 60000,       // 每 60s 检查一次是否需要同步时长
  MIN_SYNC_DELTA: 120000,     // 至少积累 2 分钟新时长才上传，省资源点

  init() {
    if (typeof UserNotes === 'undefined' || !UserNotes.cloud) return;
    this.injectStyles();
    this.injectToolbarButton();
    this.buildPanel();
    this.hookProgressSync();

    UserNotes.cloud.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') this.onSignedIn();
    });
    UserNotes.cloud.auth.getSession().then(({ data }) => {
      if (data) this.onSignedIn();
    }).catch(() => {});
  },

  get cloud() { return UserNotes.cloud; },
  get signedIn() { return !!UserNotes.session; },

  /* ================= 昵称与档案 ================= */
  async onSignedIn() {
    await this.ensureProfile();
    this.syncStudyTime(true); // 登录后立即同步一次
    this._syncTimer = setInterval(() => this.syncStudyTime(false), this.SYNC_INTERVAL);
  },

  async ensureProfile() {
    const { data } = await this.cloud.database.from('user_profiles')
      .select('owner_id, nickname').maybeSingle();
    if (!data) {
      // 默认昵称：学习者 + 邮箱前缀脱敏
      const email = UserNotes.session?.user?.email || '';
      const local = email.split('@')[0] || '';
      const masked = local.length > 2 ? local[0] + '***' + local.slice(-1) : '学习者';
      await this.cloud.database.from('user_profiles').insert({ nickname: masked }).select();
    }
  },

  async setNickname(name) {
    name = (name || '').trim().slice(0, 12);
    if (!name) return false;
    const { data, error } = await this.cloud.database.from('user_profiles')
      .update({ nickname: name, updated_at: new Date().toISOString() })
      .select();
    if (error || !(data || []).length) return false;
    return true;
  },

  /* ================= 学习时长同步 ================= */
  async syncStudyTime(force) {
    if (!this.signedIn || typeof ProgressPlus === 'undefined' || !ProgressPlus.data) return;
    const totalMs = ProgressPlus.data.totalTime || 0;
    if (!force && totalMs - this._lastSyncedMs < this.MIN_SYNC_DELTA) return;
    const completed = typeof Progress !== 'undefined'
      ? Object.values(Progress.getAll().chapters).filter(c => c.status === 'completed').length : 0;
    const { data, error } = await this.cloud.database.from('user_profiles')
      .update({
        total_study_ms: totalMs,
        completed_chapters: completed,
        updated_at: new Date().toISOString()
      })
      .select();
    if (!error && (data || []).length) this._lastSyncedMs = totalMs;
  },

  /* ================= 成绩上报（hook 原有保存函数） ================= */
  hookProgressSync() {
    // 章测试
    if (typeof Progress !== 'undefined' && Progress.saveQuizResult && !Progress.saveQuizResult._lbHooked) {
      const orig = Progress.saveQuizResult.bind(Progress);
      Progress.saveQuizResult = (chapterId, result) => {
        orig(chapterId, result);
        this.reportExam('chapter', chapterId, result.score, result.correct, result.total);
      };
      Progress.saveQuizResult._lbHooked = true;
    }
    // 综合考试
    if (typeof Progress !== 'undefined' && Progress.saveExamScore && !Progress.saveExamScore._lbHooked) {
      const orig = Progress.saveExamScore.bind(Progress);
      Progress.saveExamScore = (score, correct, total) => {
        orig(score, correct, total);
        this.reportExam('exam', null, score, correct, total);
      };
      Progress.saveExamScore._lbHooked = true;
    }
    // 页面关闭前同步时长
    window.addEventListener('beforeunload', () => this.syncStudyTime(false));
  },

  async reportExam(examType, refId, score, correct, total) {
    if (!this.signedIn) return;
    await this.cloud.database.from('exam_records').insert({
      exam_type: examType, ref_id: refId || null,
      score, correct, total
    });
  },

  /* ================= 排行榜面板 ================= */
  injectToolbarButton() {
    const toolbar = document.querySelector('.right-toolbar');
    if (!toolbar) return;
    const btn = document.createElement('button');
    btn.className = 'toolbar-btn';
    btn.id = 'leaderboardBtn';
    btn.title = '排行榜';
    btn.textContent = '🏆';
    btn.addEventListener('click', () => this.togglePanel());
    // 放在笔记按钮之后
    const notesBtn = document.getElementById('notesAccountBtn');
    if (notesBtn && notesBtn.nextSibling) toolbar.insertBefore(btn, notesBtn.nextSibling);
    else toolbar.insertBefore(btn, toolbar.firstChild);
  },

  buildPanel() {
    const panel = document.createElement('div');
    panel.id = 'leaderboardPanel';
    panel.className = 'lb-panel';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="lb-header">
        <h3>🏆 排行榜</h3>
        <button class="lb-close" id="lbClose">×</button>
      </div>
      <div class="lb-tabs">
        <button class="lb-tab active" data-board="study">⏱ 学习时长</button>
        <button class="lb-tab" data-board="exam">📝 考试高分</button>
      </div>
      <div class="lb-me" id="lbMe"></div>
      <div class="lb-body" id="lbBody"></div>
      <div class="lb-footer">
        <button class="lb-nick-btn" id="lbNickBtn">✏️ 设置我的昵称</button>
      </div>`;
    document.body.appendChild(panel);

    panel.querySelector('#lbClose').addEventListener('click', () => this.togglePanel(false));
    panel.querySelectorAll('.lb-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        panel.querySelectorAll('.lb-tab').forEach(t => t.classList.toggle('active', t === tab));
        this.loadBoard(tab.dataset.board);
      });
    });
    panel.querySelector('#lbNickBtn').addEventListener('click', () => this.promptNickname());
  },

  togglePanel(force) {
    const panel = document.getElementById('leaderboardPanel');
    const show = force !== undefined ? force : panel.style.display === 'none';
    panel.style.display = show ? 'flex' : 'none';
    if (show) {
      if (!this.signedIn) {
        document.getElementById('lbBody').innerHTML =
          '<div class="lb-empty">登录后可参与排行<br><small>点击右侧 👤 按钮登录</small></div>';
        document.getElementById('lbMe').innerHTML = '';
      } else {
        this.renderMe();
        this.loadBoard('study');
      }
    }
  },

  async renderMe() {
    const me = document.getElementById('lbMe');
    const { data } = await this.cloud.database.from('user_profiles')
      .select('nickname, total_study_ms, completed_chapters').maybeSingle();
    const ms = data?.total_study_ms || (typeof ProgressPlus !== 'undefined' ? ProgressPlus.data.totalTime : 0);
    const mins = Math.floor(ms / 60000);
    const timeText = mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60}m` : `${mins}m`;
    me.innerHTML = data
      ? `👤 <b>${this._esc(data.nickname)}</b> · 已学 ${data.completed_chapters} 章 · ⏱ ${timeText}`
      : '👤 档案初始化中…';
  },

  async loadBoard(board) {
    const body = document.getElementById('lbBody');
    body.innerHTML = '<div class="lb-empty">加载中…</div>';
    const { data, error } = await this.cloud.database.rpc('get_leaderboard', { board, lim: 20 });
    if (error) { body.innerHTML = '<div class="lb-empty">加载失败，请稍后重试</div>'; return; }
    const rows = (data || []).filter(r => r.value !== null);
    if (!rows.length) {
      body.innerHTML = '<div class="lb-empty">还没有人上榜<br><small>快去学习/考试抢占第一名！</small></div>';
      return;
    }
    body.innerHTML = rows.map(r => {
      const medal = r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `<span class="lb-rank">${r.rank}</span>`;
      const val = board === 'study'
        ? this._fmtMs(r.value)
        : `${r.value} 分 <small>(${r.extra} 次)</small>`;
      const sub = board === 'study' ? `完成 ${r.extra} 章` : '';
      return `<div class="lb-row ${r.rank <= 3 ? 'top' : ''}">
        <span class="lb-medal">${medal}</span>
        <span class="lb-name">${this._esc(r.nickname)}${sub ? `<small>${sub}</small>` : ''}</span>
        <span class="lb-val">${val}</span>
      </div>`;
    }).join('');
  },

  async promptNickname() {
    if (!this.signedIn) return;
    const name = prompt('设置排行榜昵称（最多12字，公开可见）：');
    if (!name) return;
    const ok = await this.setNickname(name);
    if (ok) {
      UserNotes.toast('昵称已更新 ✓');
      this.renderMe();
      const active = document.querySelector('.lb-tab.active');
      if (active) this.loadBoard(active.dataset.board);
    } else {
      UserNotes.toast('昵称设置失败');
    }
  },

  _fmtMs(ms) {
    const mins = Math.floor(ms / 60000);
    if (mins < 60) return `${mins} 分钟`;
    return `${Math.floor(mins / 60)} 小时 ${mins % 60} 分`;
  },

  _esc(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  injectStyles() {
    const css = `
      .lb-panel { position: fixed; top: 0; right: 0; bottom: 0; width: min(340px, 92vw); background: var(--color-bg-primary, #fff); border-left: 1px solid var(--color-border-light, #e5e7eb); box-shadow: -8px 0 24px rgba(0,0,0,.1); z-index: 9001; display: flex; flex-direction: column; }
      .lb-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--color-border-light, #e5e7eb); }
      .lb-header h3 { margin: 0; font-size: 15px; color: var(--color-text-primary, #111); }
      .lb-close { background: none; border: none; font-size: 20px; cursor: pointer; color: var(--color-text-secondary, #999); }
      .lb-tabs { display: flex; gap: 6px; padding: 10px 16px 0; }
      .lb-tab { flex: 1; border: 1px solid var(--color-border-light, #e5e7eb); background: none; border-radius: 8px; padding: 7px; font-size: 13px; cursor: pointer; color: var(--color-text-secondary, #666); }
      .lb-tab.active { background: var(--color-primary, #4f46e5); color: #fff; border-color: transparent; font-weight: 600; }
      .lb-me { margin: 10px 16px 0; padding: 8px 12px; background: var(--color-bg-secondary, #f9fafb); border-radius: 8px; font-size: 12px; color: var(--color-text-secondary, #555); }
      .lb-body { flex: 1; overflow-y: auto; padding: 12px 16px; }
      .lb-empty { text-align: center; color: var(--color-text-secondary, #999); padding: 40px 0; font-size: 13px; line-height: 2; }
      .lb-row { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; font-size: 13px; }
      .lb-row.top { background: var(--color-bg-secondary, #f9fafb); }
      .lb-medal { width: 28px; text-align: center; flex-shrink: 0; }
      .lb-rank { font-size: 12px; color: var(--color-text-secondary, #999); }
      .lb-name { flex: 1; color: var(--color-text-primary, #111); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lb-name small { display: block; font-size: 11px; color: var(--color-text-secondary, #999); }
      .lb-val { font-weight: 600; color: var(--color-text-primary, #111); white-space: nowrap; }
      .lb-val small { font-weight: 400; color: var(--color-text-secondary, #999); }
      .lb-footer { padding: 12px 16px; border-top: 1px solid var(--color-border-light, #e5e7eb); }
      .lb-nick-btn { width: 100%; border: 1px dashed var(--color-border-light, #d1d5db); background: none; border-radius: 8px; padding: 8px; font-size: 13px; cursor: pointer; color: var(--color-text-secondary, #666); }
      .lb-nick-btn:hover { color: var(--color-primary, #4f46e5); border-color: var(--color-primary, #4f46e5); }
      @media (max-width: 768px) { .lb-panel { width: 100vw; } }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

/* 启动：等 UserNotes 初始化完成后再挂上 */
document.addEventListener('DOMContentLoaded', () => {
  const tryInit = () => {
    if (typeof UserNotes !== 'undefined' && UserNotes.cloud) Leaderboard.init();
    else setTimeout(tryInit, 300);
  };
  setTimeout(tryInit, 300);
});
