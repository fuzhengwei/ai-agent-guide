/**
 * 笔记与收藏模块（划线 / 收藏 / 个人笔记 + 邮箱登录云同步）
 * 依赖：WorkBuddyCloud SDK（CDN）、main.js 的 App.chapters / App.currentChapter
 */
const UserNotes = {
  cloud: null,
  session: null,
  chapterNotes: [],      // 当前章节的划线记录
  pendingSelection: null, // 当前选区快照
  panelOpen: false,

  CLOUD_CONFIG: {
    endpoint: 'https://ai-agent-guide-66900.app.workbuddy.host',
    publishableKey: 'wbpk_62qsE5HMRFHmZdl8SnVl74_X2Vz2yyYmBpJOoRV7RNOR6xcdjKYcOTs'
  },

  /* ================= 初始化 ================= */
  init() {
    if (typeof WorkBuddyCloud === 'undefined') {
      console.warn('[Notes] WorkBuddyCloud SDK 未加载');
      return;
    }
    this.cloud = WorkBuddyCloud.createWorkBuddyCloud(this.CLOUD_CONFIG);
    this.injectStyles();
    this.injectToolbarButton();
    this.buildLoginModal();
    this.buildSelectionToolbar();
    this.buildNotesPanel();
    this.bindSelectionEvents();

    this.cloud.auth.onAuthStateChange((event, session) => {
      this.session = session;
      this.renderAccountBtn();
      if (event === 'SIGNED_IN') {
        this.closeLoginModal();
        this.reloadChapterNotes();
      } else if (event === 'SIGNED_OUT') {
        this.chapterNotes = [];
        this.clearHighlights();
        if (this.panelOpen) this.renderNotesPanel();
      }
    });

    this.cloud.auth.getSession().then(({ data }) => {
      this.session = data;
      this.renderAccountBtn();
      if (data) this.reloadChapterNotes();
    }).catch(() => {});
  },

  /* ================= 划线选区 ================= */
  bindSelectionEvents() {
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;

    document.addEventListener('mouseup', (e) => {
      if (this._toolbarContains(e.target)) return;
      setTimeout(() => this.onSelectionEnd(), 10);
    });
    document.addEventListener('touchend', (e) => {
      if (this._toolbarContains(e.target)) return;
      setTimeout(() => this.onSelectionEnd(), 300);
    });
    document.addEventListener('mousedown', (e) => {
      if (!this._toolbarContains(e.target)) this.hideSelectionToolbar();
    });
    document.addEventListener('selectionchange', () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        if (!this._toolbarVisible()) this.pendingSelection = null;
      }
    });
  },

  _toolbarContains(node) {
    const tb = document.getElementById('notesSelectionToolbar');
    return tb && node && tb.contains(node);
  },
  _toolbarVisible() {
    const tb = document.getElementById('notesSelectionToolbar');
    return tb && tb.style.display !== 'none';
  },

  onSelectionEnd() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) { return; }
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const containerEl = container.nodeType === 1 ? container : container.parentElement;
    if (!containerEl || !contentBody.contains(containerEl)) return;
    // 排除代码块内的划选（避免破坏语法高亮）
    if (containerEl.closest('pre, code, .chat-messages, input, textarea')) return;

    const text = sel.toString().trim();
    if (text.length < 2 || text.length > 2000) return;

    this.pendingSelection = {
      text,
      chapterId: document.body.dataset.chapter || null,
      chapterTitle: document.body.dataset.chapterTitle || ''
    };
    this.showSelectionToolbar(range);
  },

  buildSelectionToolbar() {
    const tb = document.createElement('div');
    tb.id = 'notesSelectionToolbar';
    tb.className = 'notes-selection-toolbar';
    tb.style.display = 'none';
    tb.innerHTML = `
      <button class="nst-btn" data-action="highlight" title="划线标记">🖊 划线</button>
      <button class="nst-btn" data-action="favorite" title="收藏该段">⭐ 收藏</button>
      <button class="nst-btn" data-action="note" title="收藏并写笔记">📝 笔记</button>
    `;
    document.body.appendChild(tb);
    tb.addEventListener('click', (e) => {
      const btn = e.target.closest('.nst-btn');
      if (!btn) return;
      e.preventDefault();
      this.handleSelectionAction(btn.dataset.action);
    });
  },

  showSelectionToolbar(range) {
    const tb = document.getElementById('notesSelectionToolbar');
    const rect = range.getBoundingClientRect();
    tb.style.display = 'flex';
    const tbWidth = tb.offsetWidth || 210;
    let left = rect.left + rect.width / 2 - tbWidth / 2 + window.scrollX;
    left = Math.max(8, Math.min(left, window.innerWidth - tbWidth - 8));
    tb.style.left = left + 'px';
    tb.style.top = (rect.top + window.scrollY - tb.offsetHeight - 8) + 'px';
  },

  hideSelectionToolbar() {
    const tb = document.getElementById('notesSelectionToolbar');
    if (tb) tb.style.display = 'none';
  },

  async handleSelectionAction(action) {
    const snap = this.pendingSelection;
    this.hideSelectionToolbar();
    window.getSelection()?.removeAllRanges();
    if (!snap || !snap.chapterId) return;

    if (!this.session) {
      this.openLoginModal('登录后即可保存划线与收藏');
      return;
    }

    const row = {
      chapter_id: snap.chapterId,
      chapter_title: snap.chapterTitle,
      note_type: action === 'highlight' ? 'highlight' : 'favorite',
      selected_text: snap.text,
      color: 'yellow'
    };

    if (action === 'note') {
      const noteText = await this.promptNoteText(snap.text);
      if (noteText === null) return; // 用户取消
      row.note_text = noteText;
    }

    const { data, error } = await this.cloud.database.from('user_notes').insert(row).select();
    if (error) {
      this.toast('保存失败：' + (error.message || '请稍后重试'));
      return;
    }
    if (data && data[0]) {
      this.chapterNotes.push(data[0]);
      this.applyHighlight(data[0]);
      this.toast(action === 'highlight' ? '已划线保存 ✓' : (action === 'note' ? '笔记已保存 ✓' : '已收藏 ✓'));
      if (this.panelOpen) this.renderNotesPanel();
    }
  },

  promptNoteText(selectedText) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'notes-prompt-overlay';
      overlay.innerHTML = `
        <div class="notes-prompt">
          <div class="notes-prompt-quote">"${this.escapeHtml(selectedText.slice(0, 80))}${selectedText.length > 80 ? '…' : ''}"</div>
          <textarea class="notes-prompt-input" placeholder="写下你的想法…（可直接保存为空）" rows="3"></textarea>
          <div class="notes-prompt-actions">
            <button class="np-btn" data-act="cancel">取消</button>
            <button class="np-btn primary" data-act="save">保存笔记</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const ta = overlay.querySelector('textarea');
      ta.focus();
      overlay.addEventListener('click', (e) => {
        const act = e.target.dataset?.act;
        if (act === 'save') { overlay.remove(); resolve(ta.value.trim()); }
        else if (act === 'cancel' || e.target === overlay) { overlay.remove(); resolve(null); }
      });
      ta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { overlay.remove(); resolve(ta.value.trim()); }
        if (e.key === 'Escape') { overlay.remove(); resolve(null); }
      });
    });
  },

  /* ================= 划线渲染 ================= */
  async reloadChapterNotes() {
    const chapterId = document.body.dataset.chapter;
    if (!chapterId || !this.session) { this.chapterNotes = []; return; }
    const { data, error } = await this.cloud.database
      .from('user_notes')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('created_at', { ascending: true })
      .limit(500);
    if (error) { console.warn('[Notes] 加载划线失败', error); return; }
    this.chapterNotes = data || [];
    this.restoreHighlights();
  },

  clearHighlights() {
    document.querySelectorAll('mark.user-note-mark').forEach(mark => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
  },

  restoreHighlights() {
    this.clearHighlights();
    this.chapterNotes.forEach(note => this.applyHighlight(note));
  },

  /** 在内容区中定位 selected_text 并用 <mark> 包裹（文本节点级匹配，支持跨元素） */
  applyHighlight(note) {
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;
    const target = note.selected_text;
    if (!target || target.length < 2) return;

    // 先尝试单个文本节点内匹配
    const walker = document.createTreeWalker(contentBody, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (n.parentElement.closest('pre, code, script, style, mark.user-note-mark, .notes-selection-toolbar')) return NodeFilter.FILTER_REJECT;
        return n.textContent.includes(target) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    const node = walker.nextNode();
    if (node) { this._wrapInNode(node, target, note); return; }

    // 退化为规范化空白后的跨节点匹配
    this._wrapAcrossNodes(contentBody, target.replace(/\s+/g, ' '), note);
  },

  _wrapInNode(textNode, target, note) {
    const idx = textNode.textContent.indexOf(target);
    if (idx < 0) return false;
    const range = document.createRange();
    range.setStart(textNode, idx);
    range.setEnd(textNode, idx + target.length);
    const mark = this._makeMark(note);
    try { range.surroundContents(mark); } catch (e) { return false; }
    return true;
  },

  _wrapAcrossNodes(root, target, note) {
    // 收集所有可见文本节点，拼接后在合并串中找目标
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => n.parentElement.closest('pre, code, script, style, mark.user-note-mark')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    let combined = '';
    let n;
    while ((n = walker.nextNode())) {
      nodes.push({ node: n, start: combined.length });
      combined += n.textContent.replace(/\s+/g, ' ');
    }
    const idx = combined.indexOf(target);
    if (idx < 0) return false;
    const endIdx = idx + target.length;
    const affected = nodes.filter(x => {
      const nodeEnd = x.start + x.node.textContent.replace(/\s+/g, ' ').length;
      return x.start < endIdx && nodeEnd > idx;
    });
    if (!affected.length) return false;
    const mark = this._makeMark(note);
    const first = affected[0].node;
    const localStart = idx - affected[0].start;
    const parent = first.parentNode;
    const after = first.splitText(localStart);
    parent.insertBefore(mark, after);
    mark.textContent = after.textContent.slice(0, target.length);
    // 移除被包裹的原文（跨节点时只取首个节点片段，简化处理）
    if (after.textContent.length <= target.length) after.remove();
    else after.textContent = after.textContent.slice(target.length);
    return true;
  },

  _makeMark(note) {
    const mark = document.createElement('mark');
    mark.className = 'user-note-mark' + (note.note_type === 'favorite' ? ' is-favorite' : '');
    mark.dataset.noteId = note.id;
    mark.title = note.note_text ? `📝 ${note.note_text}` : (note.note_type === 'favorite' ? '⭐ 已收藏' : '🖊 划线');
    mark.addEventListener('click', () => this.showNotePopover(mark, note));
    return mark;
  },

  showNotePopover(mark, note) {
    this.closePopover();
    const pop = document.createElement('div');
    pop.className = 'notes-popover';
    pop.innerHTML = `
      <div class="np-type">${note.note_type === 'favorite' ? '⭐ 收藏' : '🖊 划线'} · ${this.escapeHtml(note.chapter_title || '')}</div>
      ${note.note_text ? `<div class="np-note">${this.escapeHtml(note.note_text)}</div>` : ''}
      <div class="np-actions">
        <button class="np-mini" data-act="edit">${note.note_text ? '编辑笔记' : '加笔记'}</button>
        <button class="np-mini danger" data-act="del">删除</button>
      </div>`;
    document.body.appendChild(pop);
    const rect = mark.getBoundingClientRect();
    pop.style.left = Math.max(8, rect.left + window.scrollX - 40) + 'px';
    pop.style.top = (rect.bottom + window.scrollY + 6) + 'px';
    pop.addEventListener('click', async (e) => {
      const act = e.target.dataset?.act;
      if (act === 'del') { this.closePopover(); await this.deleteNote(note.id, mark); }
      else if (act === 'edit') {
        this.closePopover();
        const text = await this.promptNoteText(note.selected_text);
        if (text === null) return;
        const { error } = await this.cloud.database.from('user_notes')
          .update({ note_text: text, note_type: 'favorite' }).eq('id', note.id).select();
        if (!error) {
          note.note_text = text; note.note_type = 'favorite';
          mark.title = `📝 ${text}`;
          mark.classList.add('is-favorite');
          this.toast('笔记已更新 ✓');
          if (this.panelOpen) this.renderNotesPanel();
        }
      }
    });
    setTimeout(() => document.addEventListener('mousedown', this._popCloser = (e) => {
      if (!pop.contains(e.target)) this.closePopover();
    }), 10);
  },

  closePopover() {
    document.querySelector('.notes-popover')?.remove();
    if (this._popCloser) { document.removeEventListener('mousedown', this._popCloser); this._popCloser = null; }
  },

  async deleteNote(id, markEl) {
    const { error } = await this.cloud.database.from('user_notes').delete().eq('id', id).select();
    if (error) { this.toast('删除失败'); return; }
    this.chapterNotes = this.chapterNotes.filter(x => x.id !== id);
    if (markEl) {
      const parent = markEl.parentNode;
      while (markEl.firstChild) parent.insertBefore(markEl.firstChild, markEl);
      parent.removeChild(markEl);
      parent.normalize();
    }
    this.toast('已删除');
    if (this.panelOpen) this.renderNotesPanel();
  },

  /* ================= 顶部账户按钮 ================= */
  injectToolbarButton() {
    const toolbar = document.querySelector('.right-toolbar');
    if (!toolbar) return;
    const btn = document.createElement('button');
    btn.className = 'toolbar-btn';
    btn.id = 'notesAccountBtn';
    btn.title = '我的笔记 / 登录';
    btn.textContent = '👤';
    btn.addEventListener('click', () => {
      if (this.session) this.toggleNotesPanel();
      else this.openLoginModal();
    });
    toolbar.insertBefore(btn, toolbar.firstChild);
  },

  renderAccountBtn() {
    const btn = document.getElementById('notesAccountBtn');
    if (!btn) return;
    if (this.session) {
      const email = this.session.user?.email || '';
      btn.textContent = '📒';
      btn.title = `我的笔记（${email}）`;
    } else {
      btn.textContent = '👤';
      btn.title = '登录后同步划线与收藏';
    }
  },

  /* ================= 登录弹窗 ================= */
  buildLoginModal() {
    const wrap = document.createElement('div');
    wrap.id = 'notesLoginModal';
    wrap.className = 'notes-login-overlay';
    wrap.style.display = 'none';
    wrap.innerHTML = `
      <div class="notes-login">
        <div class="nl-header">
          <h3>登录 / 注册</h3>
          <button class="nl-close" data-act="close">×</button>
        </div>
        <div class="nl-tip" id="nlTip">登录后，划线、收藏和笔记会同步到你的账号</div>
        <div class="nl-tabs">
          <button class="nl-tab active" data-tab="password">密码登录</button>
          <button class="nl-tab" data-tab="otp">验证码登录</button>
          <button class="nl-tab" data-tab="signup">注册</button>
        </div>
        <div class="nl-pane" data-pane="password">
          <input type="email" class="nl-input" id="nlPwEmail" placeholder="邮箱">
          <input type="password" class="nl-input" id="nlPwPass" placeholder="密码">
          <button class="nl-submit" id="nlPwSubmit">登录</button>
          <button class="nl-link" id="nlForgot">忘记密码？</button>
        </div>
        <div class="nl-pane" data-pane="otp" style="display:none;">
          <input type="email" class="nl-input" id="nlOtpEmail" placeholder="邮箱">
          <div class="nl-otp-row">
            <input type="text" class="nl-input" id="nlOtpCode" placeholder="验证码" maxlength="6">
            <button class="nl-otp-btn" id="nlOtpSend">发送验证码</button>
          </div>
          <button class="nl-submit" id="nlOtpSubmit">登录</button>
        </div>
        <div class="nl-pane" data-pane="signup" style="display:none;">
          <input type="email" class="nl-input" id="nlSuEmail" placeholder="邮箱">
          <input type="password" class="nl-input" id="nlSuPass" placeholder="设置密码（至少6位）">
          <div class="nl-otp-row">
            <input type="text" class="nl-input" id="nlSuCode" placeholder="邮箱验证码" maxlength="6">
            <button class="nl-otp-btn" id="nlSuSend">发送验证码</button>
          </div>
          <button class="nl-submit" id="nlSuSubmit">注册并登录</button>
        </div>
        <div class="nl-error" id="nlError"></div>
      </div>`;
    document.body.appendChild(wrap);

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap || e.target.dataset?.act === 'close') this.closeLoginModal();
      const tab = e.target.dataset?.tab;
      if (tab) {
        wrap.querySelectorAll('.nl-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        wrap.querySelectorAll('.nl-pane').forEach(p => p.style.display = p.dataset.pane === tab ? '' : 'none');
        this.nlError('');
      }
    });

    wrap.querySelector('#nlPwSubmit').addEventListener('click', () => this.doPasswordLogin());
    wrap.querySelector('#nlOtpSend').addEventListener('click', () => this.doSendOtp('nlOtpEmail', 'nlOtpSend'));
    wrap.querySelector('#nlOtpSubmit').addEventListener('click', () => this.doOtpLogin());
    wrap.querySelector('#nlSuSend').addEventListener('click', () => this.doSendOtp('nlSuEmail', 'nlSuSend', true));
    wrap.querySelector('#nlSuSubmit').addEventListener('click', () => this.doSignup());
    wrap.querySelector('#nlForgot').addEventListener('click', () => this.doForgot());
  },

  openLoginModal(tip) {
    const m = document.getElementById('notesLoginModal');
    if (tip) document.getElementById('nlTip').textContent = tip;
    m.style.display = 'flex';
  },
  closeLoginModal() {
    document.getElementById('notesLoginModal').style.display = 'none';
  },
  nlError(msg) {
    document.getElementById('nlError').textContent = msg || '';
  },
  _nlVal(id) { return document.getElementById(id).value.trim(); },

  async doPasswordLogin() {
    const email = this._nlVal('nlPwEmail'), password = this._nlVal('nlPwPass');
    if (!email || !password) return this.nlError('请输入邮箱和密码');
    const { error } = await this.cloud.auth.signInWithPassword({ email, password });
    if (error) this.nlError('账号或密码错误');
  },

  async doSendOtp(emailId, btnId, forSignup) {
    const email = this._nlVal(emailId);
    if (!email) return this.nlError('请输入邮箱');
    const btn = document.getElementById(btnId);
    btn.disabled = true;
    const { data, error } = await this.cloud.auth.sendOtp({ email });
    if (error) { this.nlError(error.message || '发送失败'); btn.disabled = false; return; }
    this._otpContext = { verificationId: data.verificationId, isExistingUser: data.isExistingUser, email };
    this.nlError('');
    let sec = 60;
    btn.textContent = `${sec}s 后重发`;
    const timer = setInterval(() => {
      sec--;
      if (sec <= 0) { clearInterval(timer); btn.disabled = false; btn.textContent = '发送验证码'; }
      else btn.textContent = `${sec}s 后重发`;
    }, 1000);
    this.toast('验证码已发送，请查收邮箱');
  },

  async doOtpLogin() {
    const code = this._nlVal('nlOtpCode');
    if (!this._otpContext || !code) return this.nlError('请先发送验证码并填写');
    const { error } = await this.cloud.auth.verifyOtp({
      verificationId: this._otpContext.verificationId,
      token: code,
      email: this._otpContext.email,
      isExistingUser: this._otpContext.isExistingUser
    });
    if (error) this.nlError(error.message || '验证码错误');
  },

  async doSignup() {
    const email = this._nlVal('nlSuEmail'), password = this._nlVal('nlSuPass'), code = this._nlVal('nlSuCode');
    if (!email || password.length < 6 || !code) return this.nlError('请填写邮箱、至少6位密码和验证码');
    if (!this._otpContext || this._otpContext.email !== email) return this.nlError('请先发送验证码');
    if (this._otpContext.isExistingUser) { this.nlError('该邮箱已注册，请直接登录'); return; }
    const { error } = await this.cloud.auth.verifyOtp({
      verificationId: this._otpContext.verificationId,
      token: code,
      email,
      isExistingUser: false,
      password
    });
    if (error) this.nlError(error.message || '注册失败');
  },

  async doForgot() {
    const email = this._nlVal('nlPwEmail');
    if (!email) return this.nlError('请先输入邮箱');
    const started = await this.cloud.auth.resetPasswordForEmail(email);
    if (started.error) return this.nlError(started.error.message || '发送失败');
    const code = prompt('重置验证码已发送到邮箱，请输入验证码：');
    if (!code) return;
    const newPassword = prompt('请输入新密码（至少6位）：');
    if (!newPassword || newPassword.length < 6) return this.nlError('密码至少6位');
    const done = await started.data.updateUser({ nonce: code.trim(), password: newPassword });
    if (done.error) this.nlError(done.error.message || '重置失败');
    else this.toast('密码已重置并登录 ✓');
  },

  /* ================= 笔记面板 ================= */
  buildNotesPanel() {
    const panel = document.createElement('div');
    panel.id = 'notesPanel';
    panel.className = 'notes-panel';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="npanel-header">
        <h3>📒 我的笔记</h3>
        <div>
          <button class="npanel-act" id="npanelSignout" title="退出登录">退出</button>
          <button class="npanel-act" id="npanelClose" title="关闭">×</button>
        </div>
      </div>
      <div class="npanel-body" id="npanelBody"></div>`;
    document.body.appendChild(panel);
    panel.querySelector('#npanelClose').addEventListener('click', () => this.toggleNotesPanel(false));
    panel.querySelector('#npanelSignout').addEventListener('click', async () => {
      await this.cloud.auth.signOut();
      this.toggleNotesPanel(false);
      this.toast('已退出登录');
    });
  },

  toggleNotesPanel(force) {
    const panel = document.getElementById('notesPanel');
    this.panelOpen = force !== undefined ? force : !this.panelOpen;
    panel.style.display = this.panelOpen ? 'flex' : 'none';
    if (this.panelOpen) this.renderNotesPanel();
  },

  async renderNotesPanel() {
    const body = document.getElementById('npanelBody');
    body.innerHTML = '<div class="npanel-loading">加载中…</div>';
    const { data, error } = await this.cloud.database
      .from('user_notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) { body.innerHTML = '<div class="npanel-empty">加载失败，请稍后重试</div>'; return; }
    const notes = data || [];
    if (!notes.length) {
      body.innerHTML = '<div class="npanel-empty">还没有笔记<br><small>选中正文任意文字即可划线 / 收藏</small></div>';
      return;
    }
    // 按章节分组
    const groups = {};
    notes.forEach(n => {
      (groups[n.chapter_id] = groups[n.chapter_id] || { title: n.chapter_title || n.chapter_id, items: [] }).items.push(n);
    });
    body.innerHTML = Object.entries(groups).map(([cid, g]) => `
      <div class="npanel-group">
        <div class="npanel-group-title">${this.escapeHtml(g.title)}</div>
        ${g.items.map(n => `
          <div class="npanel-item" data-id="${n.id}" data-chapter="${this.escapeHtml(n.chapter_id)}">
            <div class="npanel-item-text ${n.note_type === 'favorite' ? 'fav' : ''}">${n.note_type === 'favorite' ? '⭐ ' : ''}${this.escapeHtml(n.selected_text)}</div>
            ${n.note_text ? `<div class="npanel-item-note">📝 ${this.escapeHtml(n.note_text)}</div>` : ''}
            <div class="npanel-item-meta">
              <span>${new Date(n.created_at).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              <button class="np-mini danger" data-del="${n.id}">删除</button>
            </div>
          </div>`).join('')}
      </div>`).join('');

    body.querySelectorAll('.npanel-item').forEach(el => {
      el.addEventListener('click', async (e) => {
        const delBtn = e.target.closest('[data-del]');
        if (delBtn) {
          e.stopPropagation();
          await this.deleteNote(parseInt(delBtn.dataset.del, 10), null);
          this.renderNotesPanel();
          this.restoreHighlights();
          return;
        }
        const cid = el.dataset.chapter;
        if (cid && cid !== document.body.dataset.chapter) {
          this.toggleNotesPanel(false);
          App.loadChapter(cid);
        }
      });
    });
  },

  /* ================= 工具 ================= */
  escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  toast(msg) {
    document.querySelector('.notes-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'notes-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
  },

  /* ================= 样式 ================= */
  injectStyles() {
    const css = `
      /* 划线标记 */
      mark.user-note-mark { background: rgba(250, 204, 21, .35); border-bottom: 2px solid #eab308; padding: 0 1px; border-radius: 2px; cursor: pointer; color: inherit; }
      mark.user-note-mark.is-favorite { background: rgba(251, 146, 60, .28); border-bottom-color: #f97316; }
      mark.user-note-mark:hover { filter: brightness(.95); }

      /* 划选工具条 */
      .notes-selection-toolbar { position: absolute; z-index: 9999; display: flex; gap: 2px; background: #1f2937; border-radius: 8px; padding: 4px; box-shadow: 0 4px 16px rgba(0,0,0,.25); }
      .nst-btn { background: none; border: none; color: #e5e7eb; font-size: 12px; padding: 6px 10px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
      .nst-btn:hover { background: rgba(255,255,255,.12); color: #fff; }

      /* 点击划线的气泡 */
      .notes-popover { position: absolute; z-index: 9999; background: var(--color-bg-primary, #fff); border: 1px solid var(--color-border-light, #e5e7eb); border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.14); padding: 10px 12px; max-width: 300px; font-size: 13px; }
      .np-type { font-size: 12px; color: var(--color-text-secondary, #6b7280); margin-bottom: 4px; }
      .np-note { margin: 6px 0; color: var(--color-text-primary, #111); line-height: 1.5; }
      .np-actions { display: flex; gap: 8px; margin-top: 6px; }
      .np-mini { border: 1px solid var(--color-border-light, #e5e7eb); background: none; border-radius: 6px; padding: 3px 10px; font-size: 12px; cursor: pointer; color: var(--color-text-primary, #333); }
      .np-mini:hover { background: var(--color-bg-secondary, #f3f4f6); }
      .np-mini.danger { color: #dc2626; border-color: #fecaca; }

      /* 写笔记弹窗 */
      .notes-prompt-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 10001; display: flex; align-items: center; justify-content: center; }
      .notes-prompt { background: var(--color-bg-primary, #fff); border-radius: 12px; padding: 20px; width: min(440px, 90vw); }
      .notes-prompt-quote { font-size: 13px; color: var(--color-text-secondary, #6b7280); border-left: 3px solid #eab308; padding-left: 10px; margin-bottom: 12px; line-height: 1.5; }
      .notes-prompt-input { width: 100%; border: 1px solid var(--color-border-light, #e5e7eb); border-radius: 8px; padding: 10px; font-size: 14px; font-family: inherit; resize: vertical; box-sizing: border-box; background: var(--color-bg-primary, #fff); color: var(--color-text-primary, #111); }
      .notes-prompt-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
      .np-btn { border: 1px solid var(--color-border-light, #e5e7eb); background: none; border-radius: 8px; padding: 7px 16px; font-size: 13px; cursor: pointer; color: var(--color-text-primary, #333); }
      .np-btn.primary { background: var(--color-primary, #4f46e5); color: #fff; border-color: transparent; }

      /* 登录弹窗 */
      .notes-login-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 10000; display: flex; align-items: center; justify-content: center; }
      .notes-login { background: var(--color-bg-primary, #fff); border-radius: 14px; padding: 24px; width: min(380px, 92vw); box-shadow: 0 20px 60px rgba(0,0,0,.25); }
      .nl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
      .nl-header h3 { margin: 0; font-size: 18px; color: var(--color-text-primary, #111); }
      .nl-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--color-text-secondary, #999); }
      .nl-tip { font-size: 12px; color: var(--color-text-secondary, #6b7280); margin-bottom: 14px; }
      .nl-tabs { display: flex; gap: 4px; margin-bottom: 14px; background: var(--color-bg-secondary, #f3f4f6); border-radius: 8px; padding: 3px; }
      .nl-tab { flex: 1; border: none; background: none; padding: 7px; font-size: 13px; border-radius: 6px; cursor: pointer; color: var(--color-text-secondary, #666); }
      .nl-tab.active { background: var(--color-bg-primary, #fff); color: var(--color-text-primary, #111); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
      .nl-input { width: 100%; border: 1px solid var(--color-border-light, #e5e7eb); border-radius: 8px; padding: 10px 12px; font-size: 14px; margin-bottom: 10px; box-sizing: border-box; background: var(--color-bg-primary, #fff); color: var(--color-text-primary, #111); }
      .nl-input:focus { outline: 2px solid var(--color-primary, #4f46e5); outline-offset: -1px; }
      .nl-otp-row { display: flex; gap: 8px; }
      .nl-otp-row .nl-input { flex: 1; }
      .nl-otp-btn { border: 1px solid var(--color-primary, #4f46e5); color: var(--color-primary, #4f46e5); background: none; border-radius: 8px; padding: 0 14px; font-size: 13px; cursor: pointer; white-space: nowrap; margin-bottom: 10px; }
      .nl-otp-btn:disabled { opacity: .5; cursor: default; }
      .nl-submit { width: 100%; background: var(--color-primary, #4f46e5); color: #fff; border: none; border-radius: 8px; padding: 11px; font-size: 14px; font-weight: 600; cursor: pointer; }
      .nl-link { background: none; border: none; color: var(--color-text-secondary, #6b7280); font-size: 12px; cursor: pointer; margin-top: 10px; width: 100%; text-align: center; }
      .nl-error { color: #dc2626; font-size: 12px; margin-top: 8px; min-height: 16px; text-align: center; }

      /* 笔记面板 */
      .notes-panel { position: fixed; top: 0; right: 0; bottom: 0; width: min(360px, 92vw); background: var(--color-bg-primary, #fff); border-left: 1px solid var(--color-border-light, #e5e7eb); box-shadow: -8px 0 24px rgba(0,0,0,.1); z-index: 9000; display: flex; flex-direction: column; }
      .npanel-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--color-border-light, #e5e7eb); }
      .npanel-header h3 { margin: 0; font-size: 15px; color: var(--color-text-primary, #111); }
      .npanel-act { background: none; border: none; font-size: 13px; cursor: pointer; color: var(--color-text-secondary, #666); padding: 4px 8px; }
      .npanel-body { flex: 1; overflow-y: auto; padding: 12px 16px; }
      .npanel-loading, .npanel-empty { text-align: center; color: var(--color-text-secondary, #999); padding: 40px 0; font-size: 13px; line-height: 2; }
      .npanel-group-title { font-size: 12px; font-weight: 700; color: var(--color-text-secondary, #6b7280); margin: 14px 0 8px; }
      .npanel-item { border: 1px solid var(--color-border-light, #e5e7eb); border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; cursor: pointer; transition: box-shadow .15s; }
      .npanel-item:hover { box-shadow: 0 2px 10px rgba(0,0,0,.08); }
      .npanel-item-text { font-size: 13px; line-height: 1.6; color: var(--color-text-primary, #111); border-left: 3px solid #eab308; padding-left: 8px; }
      .npanel-item-text.fav { border-left-color: #f97316; }
      .npanel-item-note { font-size: 12px; color: var(--color-text-secondary, #555); margin-top: 6px; background: var(--color-bg-secondary, #f9fafb); border-radius: 6px; padding: 6px 8px; }
      .npanel-item-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 11px; color: var(--color-text-secondary, #9ca3af); }

      /* Toast */
      .notes-toast { position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%) translateY(20px); background: #1f2937; color: #fff; font-size: 13px; padding: 9px 18px; border-radius: 20px; z-index: 10002; opacity: 0; transition: all .3s; pointer-events: none; }
      .notes-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

      @media (max-width: 768px) {
        .notes-panel { width: 100vw; }
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

/* 启动 */
document.addEventListener('DOMContentLoaded', () => UserNotes.init());
/* 章节切换后恢复划线（hook App.loadChapter 完成时机） */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof App !== 'undefined' && App.loadChapter && !App.loadChapter._notesHooked) {
    const orig = App.loadChapter.bind(App);
    App.loadChapter = async function (chapterId) {
      await orig(chapterId);
      if (UserNotes.session) setTimeout(() => UserNotes.reloadChapterNotes(), 400);
    };
    App.loadChapter._notesHooked = true;
  }
});
