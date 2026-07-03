/* ========================================
   AI Agent Guide - AI 对话助手
   支持 OpenAI 协议，用户自定义 API 配置
   ======================================== */

const AIChat = {
  configs: [],
  activeConfigId: null,
  messages: [],
  isLoading: false,
  abortController: null,

  STORAGE_KEY: 'ai-agent-guide-api-configs',

  /**
   * 初始化
   */
  init() {
    this.loadConfigs();
    this.bindEvents();
    this.renderModelSelector();
    
    // 欢迎消息
    if (this.messages.length === 0) {
      this.addMessage('assistant', '你好！我是你的 AI 学习助手。阅读教程时如果有任何不理解的地方，随时问我。');
    }
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
      // 默认配置模板
      this.configs = [{
        id: 'default',
        name: '默认配置',
        baseUrl: '',
        apiKey: '',
        model: 'gpt-4o'
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
    const quickPrompts = document.querySelectorAll('.quick-prompt');
    quickPrompts.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (input) {
          input.value = e.target.dataset.prompt;
          input.focus();
          // 可选：直接发送
          // this.send();
        }
      });
    });
    
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
   * 发送消息
   */
  async send() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text || this.isLoading) return;
    
    const config = this.getActiveConfig();
    if (!config || !config.apiKey) {
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
      // 构建上下文
      const currentChapter = document.body.dataset.chapter || '';
      const chapterTitle = document.body.dataset.chapterTitle || '';
      
      const systemPrompt = `你是一个 AI Agent 学习助教。用户正在学习《AI Agent 渐进式可视化教程》。${chapterTitle ? `当前正在阅读：${chapterTitle}。` : ''}请用简洁、准确的方式回答问题，帮助用户理解 AI Agent 相关概念。回答用中文，格式清晰。`;
      
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
   */
  async callAPIStream(config, messages, signal) {
    // 使用本地 CORS Proxy 绕过浏览器 CORS 限制
    const PROXY_PORT = 8091;
    const proxyUrl = `http://${window.location.hostname}:${PROXY_PORT}/proxy/chat/completions`;
    const baseUrl = config.baseUrl.replace(/\/$/, '');
    
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'X-Base-URL': baseUrl
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
    container.scrollTop = container.scrollHeight;
  },

  /**
   * 格式化内容（简单Markdown）
   */
  formatContent(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
        return `<pre>${code.trim()}</pre>`;
      })
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
    let html = '<div id="apiConfigList">';
    
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
      baseUrl: '',
      apiKey: '',
      model: 'gpt-4o'
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
