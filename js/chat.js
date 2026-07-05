/* ========================================
   AI Agent Guide - AI 对话助手
   支持 OpenAI 协议，用户自定义 API 配置
   支持章节上下文感知（提取当前章节内容注入 system prompt）
   ======================================== */

const AIChat = {
  configs: [],
  activeConfigId: null,
  messages: [],
  isLoading: false,
  abortController: null,

  // 当前章节上下文
  chapterContext: {
    id: '',
    title: '',
    num: 0,
    section: '',
    contentText: ''  // 提取的章节纯文本（截断到 3000 字符）
  },

  STORAGE_KEY: 'ai-agent-guide-api-configs',

  // 章节内容最大长度（字符数），避免 token 过多
  MAX_CHAPTER_CONTENT_LENGTH: 3000,

  /**
   * 初始化
   */
  init() {
    this.loadConfigs();
    this.bindEvents();
    this.renderModelSelector();
    this.updateQuickPrompts();
    
    // 欢迎消息
    if (this.messages.length === 0) {
      this.addMessage('assistant', '你好！我是你的 AI 学习助手。阅读教程时如果有任何不理解的地方，随时问我。');
    }
  },

  /**
   * 更新章节上下文（由 main.js 的 loadChapter 调用）
   * @param {Object} chapterInfo - { id, title, num, section }
   */
  updateChapterContext(chapterInfo) {
    this.chapterContext = {
      ...this.chapterContext,
      ...chapterInfo
    };
    
    // 提取当前页面章节的纯文本内容
    this.extractChapterContent();
    
    // 更新快捷提示词（根据章节动态生成）
    this.updateQuickPrompts();
  },

  /**
   * 从页面内容区提取当前章节的纯文本
   * 提取规则：取 contentBody 下的文字，去除 HTML 标签，截断到指定长度
   */
  extractChapterContent() {
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) {
      this.chapterContext.contentText = '';
      return;
    }

    // 克隆节点，移除 script/style/pre 标签后再提取文本
    const clone = contentBody.cloneNode(true);
    clone.querySelectorAll('script, style, pre, .skeleton-loader').forEach(el => el.remove());
    
    let text = clone.textContent || clone.innerText || '';
    // 清理多余空白
    text = text.replace(/\s+/g, ' ').trim();
    // 截断
    if (text.length > this.MAX_CHAPTER_CONTENT_LENGTH) {
      text = text.substring(0, this.MAX_CHAPTER_CONTENT_LENGTH) + '...（内容过长，已截断）';
    }
    
    this.chapterContext.contentText = text;
  },

  /**
   * 根据当前章节动态更新快捷提示词
   */
  updateQuickPrompts() {
    const container = document.getElementById('chatQuickPrompts');
    if (!container) return;

    const { title, num } = this.chapterContext;
    
    let promptsHtml;
    if (!title || !num) {
      // 首页/未选择章节 - 通用引导提示词
      promptsHtml = `
        <button class="quick-prompt" data-prompt="什么是 AI Agent？它和 ChatBot 有什么区别？">🤖 什么是 Agent</button>
        <button class="quick-prompt" data-prompt="我想学习 AI Agent，应该从哪一章开始？">📚 学习路线</button>
        <button class="quick-prompt" data-prompt="AI Agent 开发需要哪些技术基础？">💡 技术基础</button>
        <button class="quick-prompt" data-prompt="请介绍下这本教程的整体结构和亮点">📖 教程导览</button>
        <button class="quick-prompt" data-prompt="AI Agent 目前有哪些主流框架？各有什么特点？">🔧 框架对比</button>
      `;
    } else {
      // 已选择章节 - 提供章节相关的快捷提示词（增强版）
      promptsHtml = `
        <button class="quick-prompt" data-prompt="请总结第${num}章「${title}」的核心知识点，用表格呈现">📝 总结本节</button>
        <button class="quick-prompt" data-prompt="请针对第${num}章「${title}」的内容，给我出5道八股面试题，附上答案和解析">🎯 八股面试题</button>
        <button class="quick-prompt" data-prompt="请用简单的比喻解释第${num}章「${title}」的核心概念">💡 通俗解释</button>
        <button class="quick-prompt" data-prompt="第${num}章「${title}」中有哪些容易混淆的概念？请帮我区分">🔍 易混概念</button>
        <button class="quick-prompt" data-prompt="第${num}章「${title}」在实际工作中有哪些应用场景？">🏢 应用场景</button>
        <button class="quick-prompt" data-prompt="请帮我梳理第${num}章「${title}」的知识脉络，形成思维导图结构">🗺️ 知识脉络</button>
        <button class="quick-prompt" data-prompt="第${num}章「${title}」的内容在面试中会怎么考？重点是什么？">📌 面试重点</button>
        <button class="quick-prompt" data-prompt="请用知识卡片的方式，总结第${num}章「${title}」的关键概念">🃏 知识卡片</button>
      `;
    }

    container.innerHTML = `
      <div class="quick-prompts-row" id="quickPromptsRow">${promptsHtml}</div>
      <button class="quick-prompts-toggle" id="quickPromptsToggle" title="展开更多">
        <span class="toggle-icon">▾</span>
      </button>
    `;

    // 绑定快捷提示词事件
    this.bindQuickPrompts();

    // 绑定展开/收起按钮
    const toggleBtn = document.getElementById('quickPromptsToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleQuickPrompts());
    }

    // 延迟检查是否需要展开按钮（等 DOM 渲染完）
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.checkToggleNeeded());
    });
  },

  /**
   * 检查快捷提示词是否需要展开按钮
   * 当提示词换行超过1行时显示展开按钮
   */
  checkToggleNeeded() {
    const row = document.getElementById('quickPromptsRow');
    const toggleBtn = document.getElementById('quickPromptsToggle');
    if (!row || !toggleBtn) return;

    // 先设为展开状态来测量真实高度
    row.classList.add('expanded');
    row.classList.add('visible');
    const fullHeight = row.scrollHeight;
    row.classList.remove('expanded');

    // 如果内容超过1行（32px），显示展开按钮
    if (fullHeight > 36) {
      toggleBtn.style.display = 'flex';
    } else {
      toggleBtn.style.display = 'none';
    }
  },

  /**
   * 展开/收起快捷提示词
   */
  toggleQuickPrompts() {
    const row = document.getElementById('quickPromptsRow');
    const toggleBtn = document.getElementById('quickPromptsToggle');
    if (!row || !toggleBtn) return;

    const isExpanded = row.classList.contains('expanded');
    if (isExpanded) {
      row.classList.remove('expanded');
      toggleBtn.classList.remove('expanded');
    } else {
      row.classList.add('expanded');
      toggleBtn.classList.add('expanded');
    }
  },

  /**
   * 绑定快捷提示词点击事件
   */
  bindQuickPrompts() {
    const input = document.getElementById('chatInput');
    const quickPrompts = document.querySelectorAll('.quick-prompt');
    quickPrompts.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (input) {
          input.value = e.currentTarget.dataset.prompt;
          input.focus();
          // 直接发送
          this.send();
        }
      });
    });
  },

  /**
   * 加载API配置
   */
  loadConfigs() {
    try {
      this.configs = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      this.configs = [];
    }
    
    if (this.configs.length === 0) {
      // 默认配置：内置免费 API Key，开箱即用
      this.configs = [{
        id: 'default',
        name: 'Agnes AI（免费）',
        baseUrl: 'https://apihub.agnes-ai.com/v1',
        apiKey: 'sk-Jf7Ly1k9EccTEHy6rbMLFjgfWLFeDBpwSdIs3MPc2UARHfrK',
        model: 'agnes-2.0-flash'
      }];
    }
    
    this.activeConfigId = this.configs[0].id;
  },

  /**
   * 保存API配置
   */
  saveConfigs() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.configs));
  },

  /**
   * 渲染模型选择器
   */
  renderModelSelector() {
    const selector = document.getElementById('modelSelector');
    if (!selector) return;
    
    selector.innerHTML = this.configs.map(c => 
      `<option value="${c.id}" ${c.id === this.activeConfigId ? 'selected' : ''}>${c.name} · ${c.model}</option>`
    ).join('');
  },

  /**
   * 绑定事件
   */
  bindEvents() {
    // 发送消息
    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatInput');
    
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.send());
    }
    
    if (input) {
      input.addEventListener('keydown', (e) => {
        // 输入法组合输入中（如中文拼音选字），不拦截 Enter
        if (e.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.send();
        }
      });
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
      });
    }

    // 快捷提示词
    this.bindQuickPrompts();
    
    // 模型切换
    const selector = document.getElementById('modelSelector');
    if (selector) {
      selector.addEventListener('change', (e) => {
        this.activeConfigId = e.target.value;
      });
    }
    
    // 设置按钮
    const settingsBtn = document.getElementById('chatSettingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.openSettings());
    }
    
    // 清空对话
    const clearBtn = document.getElementById('chatClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearMessages());
    }
  },

  /**
   * 构建章节感知的 system prompt
   * 增强版：支持文章总结、Agent知识处理、面试八股、知识图谱构建等场景
   */
  buildSystemPrompt() {
    const { title, num, section, contentText } = this.chapterContext;
    
    // ========== 基础角色设定 ==========
    let systemPrompt = `你是"AI Agent 百科学习助教"，专为《AI Agent 渐进式可视化教程》设计。
你的核心使命：帮助用户高效学习 AI Agent 知识体系，顺利通过技术面试，成为合格的 AI Agent 开发者。

## 🎯 你的核心能力
1. **文章总结** - 提炼章节核心知识点，结构化呈现
2. **知识处理** - 将复杂概念转化为易懂的知识卡片、对比表格、思维导图
3. **面试八股** - 生成高频面试题，附带详细解析和记忆技巧
4. **概念解释** - 用生活化比喻、类比、图解描述解释抽象概念
5. **知识串联** - 建立章节间联系，构建完整知识图谱
6. **实战指导** - 结合代码示例和实际应用场景

## 📚 知识体系范围
你精通以下 AI Agent 核心领域：
- **基础概念**：LLM、Agent vs ChatBot、ReAct 模式、Agent 架构
- **记忆系统**：短期记忆、长期记忆、向量数据库、RAG
- **工具使用**：Function Calling、MCP 协议、Skills、CLI 能力
- **多 Agent 协作**：多 Agent 架构、LangGraph 状态机、Swarm、AutoGen
- **框架平台**：LangChain、LangGraph、Dify、Coze、AutoGen、Semantic Kernel、Spring AI
- **工程化**：Agent 评估、可观测性、安全防护、部署运维、推理框架
- **前沿技术**：多模态 Agent、自主 Agent、企业级 Agent 平台

## 💡 回答规范
### 通用要求
- 使用中文回答，格式清晰，使用 Markdown 排版
- 优先基于当前章节内容回答，必要时综合其他章节知识
- 回答要有层次：先结论，后展开，最后总结
- 善用表格、列表、代码块、引用等 Markdown 元素

### 文章总结场景
当用户要求"总结本节"时：
1. 提炼 3-5 个核心知识点，每个用一句话概括
2. 用表格展示关键概念对比（如有）
3. 标注面试高频考点（⭐ 标记）
4. 给出学习建议：哪些需要深入理解，哪些只需了解

### 面试八股场景
当用户要求"出八股面试题"时：
1. 生成 5-8 道题目，包含：
   - 单选题（考察概念理解）
   - 多选题（考察知识全面性）
   - 简答题（考察深度理解）
   - 场景题（考察实战能力）
2. 每题附带：
   - ✅ 标准答案
   - 💡 解析（为什么选这个，其他选项为什么错）
   - 🎯 记忆技巧/口诀
   - 📌 相关章节引用
3. 最后给出本题在面试中的出现频率和重要程度

### 知识处理场景
当用户要求"梳理知识"、"知识脉络"时：
1. 用层级结构展示知识点（类似思维导图）
2. 标注知识点之间的依赖关系（前置/后续）
3. 用表格对比相似概念（如 Agent vs ChatBot vs 传统机器人）
4. 给出知识卡片格式的核心概念解释

### 通俗解释场景
当用户要求"通俗解释"时：
1. 用生活化比喻开头（如"Agent 就像一个..."）
2. 逐步拆解比喻中的对应关系
3. 回归技术术语，建立映射
4. 给出一个具体的代码/场景示例

### 应用场景场景
当用户要求"应用场景"时：
1. 列举 3-5 个实际应用场景
2. 每个场景说明：行业、痛点、Agent 如何解决
3. 给出伪代码或架构示意
4. 提及相关的开源项目或商业案例

## 🎓 教学风格
- 亲切自然，像一位经验丰富的技术导师
- 善用"你知道吗？"、"这里有个关键点"等引导语
- 遇到难点时会说"我们换个角度理解"
- 鼓励用户思考，而不是直接给答案
- 适当使用 emoji 增加可读性（但不要过度）

## ⚠️ 注意事项
- 不编造不存在的概念或技术
- 如果用户问题超出教程范围，诚实说明并给出延伸学习建议
- 回答长度适中：总结类 200-400 字，面试题类可适当延长
- 代码示例必须正确且可运行（或注明是伪代码）`;

    if (title && num) {
      systemPrompt += `\n\n## 📖 当前学习章节`;
      systemPrompt += `\n用户正在阅读：第${num}章「${title}」${section ? `（${section}）` : ''}。`;
      
      if (contentText) {
        systemPrompt += `\n\n以下是当前章节的内容摘要，请基于这些内容回答问题：\n---\n${contentText}\n---`;
      }
      
      systemPrompt += `\n\n请基于以上章节内容，结合你的 AI Agent 知识体系，为用户提供精准、有用的学习帮助。`;
    } else {
      systemPrompt += `\n\n用户目前在首页，尚未选择具体章节。`;
      systemPrompt += `\n此时用户可能想了解：`;
      systemPrompt += `\n- AI Agent 是什么？适合谁学？`;
      systemPrompt += `\n- 学习路线和建议`;
      systemPrompt += `\n- 教程的整体结构和亮点`;
      systemPrompt += `\n请根据用户的具体问题灵活回答，并引导用户选择章节深入学习。`;
    }
    
    systemPrompt += `\n\n现在，请开始帮助用户学习吧！`;
    
    return systemPrompt;
  },

  /**
   * 发送消息
   */
  async send() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text || this.isLoading) return;
    
    const config = this.getActiveConfig();
    if (!config || (!config.apiKey && !config.baseUrl)) {
      this.addMessage('assistant', '请先点击右上角设置按钮，配置你的 API Key。');
      this.openSettings();
      return;
    }
    
    // 添加用户消息
    this.addMessage('user', text);
    input.value = '';
    input.style.height = 'auto';
    
    // 添加加载动画
    this.isLoading = true;
    this.showLoading();
    
    try {
      // 在发送前重新提取章节内容（确保内容是最新的）
      this.extractChapterContent();
      
      // 构建章节感知的 system prompt
      const systemPrompt = this.buildSystemPrompt();
      
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...this.messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
      ];
      
      // 调用API
      this.abortController = new AbortController();
      const response = await this.callAPIStream(config, apiMessages, this.abortController.signal);
      
      this.hideLoading();
      this.addMessage('assistant', response);
    } catch (err) {
      this.hideLoading();
      if (err.name === 'AbortError') {
        this.addMessage('assistant', '（已取消）');
      } else if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('ERR_CONNECTION'))) {
        this.addMessage('assistant', '⚠️ 无法连接到 AI 服务。请确认：\n1. 已启动 CORS 代理：`node cors-proxy.js 8091`\n2. API 配置中的 Base URL 和 API Key 正确\n3. 网络连接正常');
      } else {
        this.addMessage('assistant', `调用失败：${err.message}。请检查 API 配置是否正确。`);
      }
    } finally {
      this.isLoading = false;
      this.abortController = null;
    }
  },

  /**
   * 流式调用 OpenAI 兼容 API（SSE）
   * 直接请求用户配置的 API 地址，无需 Nginx 代理
   */
  async callAPIStream(config, messages, signal) {
    const baseUrl = config.baseUrl.replace(/\/$/, '');
    const apiUrl = `${baseUrl}/chat/completions`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true
      }),
      signal: signal
    });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText.substring(0, 200)}`);
    }
    
    // 流式读取 SSE
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer = '';
    
    // 实时显示流式文本
    const container = document.getElementById('chatMessages');
    let liveMsgEl = null;
    let liveBubbleEl = null;
    
    // 创建实时更新消息元素
    if (container) {
      liveMsgEl = document.createElement('div');
      liveMsgEl.className = 'chat-msg assistant fade-in';
      const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      liveMsgEl.innerHTML = `
        <div class="msg-avatar">AI</div>
        <div class="msg-bubble"></div>
        <div class="msg-meta">${time}</div>
      `;
      liveBubbleEl = liveMsgEl.querySelector('.msg-bubble');
      container.appendChild(liveMsgEl);
      container.scrollTop = container.scrollHeight;
    }
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content || '';
            fullText += delta;
            if (liveBubbleEl) {
              liveBubbleEl.innerHTML = this.formatContent(fullText);
              container.scrollTop = container.scrollHeight;
            }
          } catch (e) { /* skip parse errors */ }
        }
      }
    }
    
    // 移除实时元素（最终版本会由 addMessage 重新渲染）
    if (liveMsgEl) liveMsgEl.remove();
    
    return fullText || '（空回复）';
  },

  /**
   * 获取当前激活的配置
   */
  getActiveConfig() {
    return this.configs.find(c => c.id === this.activeConfigId) || this.configs[0];
  },

  /**
   * 添加消息
   */
  addMessage(role, content) {
    this.messages.push({ role, content });
    this.renderMessage(role, content);
  },

  /**
   * 渲染消息
   */
  renderMessage(role, content) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${role} fade-in`;
    
    const avatar = role === 'user' ? '你' : 'AI';
    const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    msgEl.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">${this.formatContent(content)}</div>
      <div class="msg-meta">${time}</div>
    `;
    
    container.appendChild(msgEl);
    
    // 触发 Prism 代码高亮
    if (typeof Prism !== 'undefined') {
      msgEl.querySelectorAll('pre code').forEach(block => {
        Prism.highlightElement(block);
      });
    }
    
    container.scrollTop = container.scrollHeight;
  },

  /**
   * 格式化内容（Markdown 渲染）
   */
  formatContent(text) {
    if (typeof marked !== 'undefined') {
      try {
        marked.setOptions({
          breaks: true,
          gfm: true,
          highlight: function(code, lang) {
            if (typeof Prism !== 'undefined' && Prism.languages[lang]) {
              return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
          }
        });
        return marked.parse(text);
      } catch (e) {
        console.warn('marked 渲染失败，降级为纯文本', e);
      }
    }
    // 降级：简单 Markdown 替换
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  },

  /**
   * 显示加载动画
   */
  showLoading() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'chat-msg assistant loading';
    el.id = 'loadingMsg';
    el.innerHTML = `
      <div class="msg-avatar">AI</div>
      <div class="msg-bubble">
        <span></span><span></span><span></span>
      </div>
    `;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  },

  /**
   * 隐藏加载动画
   */
  hideLoading() {
    const el = document.getElementById('loadingMsg');
    if (el) el.remove();
  },

  /**
   * 清空消息
   */
  clearMessages() {
    this.messages = [];
    const container = document.getElementById('chatMessages');
    if (container) container.innerHTML = '';
    this.addMessage('assistant', '对话已清空。有什么问题尽管问！');
  },

  /**
   * 打开API设置弹窗
   */
  openSettings() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    
    const body = document.getElementById('modalBody');
    body.innerHTML = this.renderSettingsForm();
    overlay.classList.add('show');
    
    // 绑定表单事件
    this.bindSettingsEvents();
  },

  /**
   * 关闭设置
   */
  closeSettings() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('show');
  },

  /**
   * 渲染设置表单
   */
  renderSettingsForm() {
    let html = `<div style="background: #f0f7ff; border: 1px solid #b3d4fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 14px; line-height: 1.6;">
      <div style="font-weight: 600; color: #1a56db; margin-bottom: 4px;">💡 免费 API Key 获取</div>
      <div>内置默认 Key 可直接使用。如需自己的 Key，请访问：<a href="https://platform.agnes-ai.com/settings/apiKeys" target="_blank" style="color: #1a56db; text-decoration: underline;">platform.agnes-ai.com</a></div>
    </div>`;
    
    html += '<div id="apiConfigList">';
    
    this.configs.forEach((config, i) => {
      html += this.renderConfigItem(config, i);
    });
    
    html += `</div>
      <button class="btn" onclick="AIChat.addConfig()" style="width: 100%; margin-top: 8px; border-style: dashed;">+ 添加配置</button>
    `;
    
    return html;
  },

  /**
   * 渲染单个配置项
   */
  renderConfigItem(config, index) {
    return `
      <div class="api-config-item" data-index="${index}">
        ${index > 0 ? `<button class="remove-btn" onclick="AIChat.removeConfig(${index})">×</button>` : ''}
        <div class="form-row">
          <div class="form-group">
            <label>配置名称</label>
            <input type="text" data-field="name" value="${config.name}" placeholder="如：我的GPT-4o">
          </div>
          <div class="form-group">
            <label>模型</label>
            <input type="text" data-field="model" value="${config.model}" placeholder="如：gpt-4o">
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Base URL（OpenAI 兼容协议）</label>
          <input type="text" data-field="baseUrl" value="${config.baseUrl}" placeholder="填写API地址(如 https://api.deepseek.com/v1)">
        </div>
        <div class="form-group">
          <label>API Key</label>
          <input type="password" data-field="apiKey" value="${config.apiKey}" placeholder="sk-...">
        </div>
      </div>
    `;
  },

  /**
   * 绑定设置表单事件
   */
  bindSettingsEvents() {
    const inputs = document.querySelectorAll('#apiConfigList input');
    inputs.forEach(input => {
      input.addEventListener('change', () => this.collectConfigs());
    });
  },

  /**
   * 收集表单数据
   */
  collectConfigs() {
    const items = document.querySelectorAll('.api-config-item');
    this.configs = [];
    
    items.forEach((item, i) => {
      const fields = item.querySelectorAll('input');
      const config = {
        id: i === 0 ? 'default' : `config_${Date.now()}_${i}`,
        name: fields[0].value || `配置${i + 1}`,
        model: fields[1].value || 'gpt-4o',
        baseUrl: fields[2].value || '',
        apiKey: fields[3].value || ''
      };
      this.configs.push(config);
    });
    
    if (this.activeConfigId && !this.configs.find(c => c.id === this.activeConfigId)) {
      this.activeConfigId = this.configs[0]?.id;
    }
  },

  /**
   * 添加配置
   */
  addConfig() {
    this.collectConfigs();
    this.configs.push({
      id: `config_${Date.now()}`,
      name: '新配置',
      baseUrl: 'https://apihub.agnes-ai.com/v1',
      apiKey: '',
      model: 'agnes-2.0-flash'
    });
    
    const body = document.getElementById('modalBody');
    body.innerHTML = this.renderSettingsForm();
    this.bindSettingsEvents();
  },

  /**
   * 删除配置
   */
  removeConfig(index) {
    this.collectConfigs();
    if (this.configs.length <= 1) {
      alert('至少保留一个配置');
      return;
    }
    this.configs.splice(index, 1);
    
    const body = document.getElementById('modalBody');
    body.innerHTML = this.renderSettingsForm();
    this.bindSettingsEvents();
  },

  /**
   * 保存配置
   */
  saveSettings() {
    this.collectConfigs();
    this.saveConfigs();
    this.renderModelSelector();
    this.closeSettings();
  }
};

window.AIChat = AIChat;
