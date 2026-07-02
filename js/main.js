/* ========================================
   AI Agent 百科全书 - 主控制器
   16章 · 翻页导航 · 主题切换 · 随机考试
   ======================================== */

const App = {
  currentChapter: null,
  examQuestions: [],
  examAnswers: {},
  examStartTime: null,
  examTimer: null,

  chapters: [
    // 序章
    { id: 'ch00', num: 0, title: 'Agent 能力全景展示', section: '🎬 序章', file: 'chapters/ch00-fundamentals.html' },

    // 第一篇：Agent 基础
    { id: 'ch01', num: 1, title: '大模型与 Agent 基础概念', section: '📖 第一篇：Agent 基础', file: 'chapters/ch01-llm-basics.html' },
    { id: 'ch02', num: 2, title: '什么是 AI Agent？', section: '📖 第一篇：Agent 基础', file: 'chapters/ch02-what-is-agent.html' },
    { id: 'ch03', num: 3, title: '你的第一个 Agent：天气查询', section: '📖 第一篇：Agent 基础', file: 'chapters/ch03-weather-agent.html' },
    { id: 'ch04', num: 4, title: 'ReAct：让 Agent 学会思考', section: '📖 第一篇：Agent 基础', file: 'chapters/ch04-react-pattern.html' },
    { id: 'ch05', num: 5, title: 'Agent 的记忆系统', section: '📖 第一篇：Agent 基础', file: 'chapters/ch05-memory.html' },

    // 第二篇：Agent 的手脚
    { id: 'ch06', num: 6, title: 'Function Calling 与工具设计', section: '🛠️ 第二篇：Agent 的手脚', file: 'chapters/ch06-tools.html' },
    { id: 'ch07', num: 7, title: 'MCP：工具的标准化接口', section: '🛠️ 第二篇：Agent 的手脚', file: 'chapters/ch07-mcp.html' },
    { id: 'ch08', num: 8, title: 'Skills：工具的组合与复用', section: '🛠️ 第二篇：Agent 的手脚', file: 'chapters/ch08-skills.html' },

    // 第三篇：多 Agent 协作
    { id: 'ch09', num: 9, title: '多 Agent 系统架构', section: '🤝 第三篇：多 Agent 协作', file: 'chapters/ch09-multi-agent.html' },
    { id: 'ch10', num: 10, title: 'LangGraph 与状态机', section: '🤝 第三篇：多 Agent 协作', file: 'chapters/ch10-langgraph.html' },

    // 第四篇：框架与平台
    { id: 'ch11', num: 11, title: '主流 Agent 框架对比', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch11-framework-comparison.html' },
    { id: 'ch12', num: 12, title: 'Dify、Coze 与可视化编排', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch12-dify-coze.html' },
    { id: 'ch13', num: 13, title: 'Agent 评估与可观测性', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch13-evaluation.html' },

    // 第五篇：综合实战
    { id: 'ch14', num: 14, title: 'CLI Agent：命令行智能助手', section: '🚀 第五篇：综合实战', file: 'chapters/ch14-cli-agent.html' },
    { id: 'ch15', num: 15, title: 'GUI Agent：浏览器自动化', section: '🚀 第五篇：综合实战', file: 'chapters/ch15-gui-agent.html' },

    // 终章
    { id: 'ch16', num: 16, title: '2026 Agent 技术展望', section: '🔮 终章', file: 'chapters/ch16-future-summary.html' }
  ],

  /**
   * 初始化
   */
  async init() {
    this.renderSidebar();
    this.bindEvents();
    this.loadTheme();
    Progress.updateUI();
    AIChat.init();
    this.showCover();
  },

  /**
   * 渲染侧边栏
   */
  renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    const sections = {};
    this.chapters.forEach(ch => {
      if (!sections[ch.section]) sections[ch.section] = [];
      sections[ch.section].push(ch);
    });

    let html = '';
    Object.keys(sections).forEach(sectionName => {
      html += `<div class="nav-section">
        <div class="nav-section-title">${sectionName}</div>
      `;
      sections[sectionName].forEach(ch => {
        html += `
          <a class="nav-item" data-chapter="${ch.id}" onclick="App.loadChapter('${ch.id}')">
            <span class="nav-number">${ch.num}</span>
            <span>${ch.title}</span>
          </a>
        `;
      });
      html += `</div>`;
    });

    nav.innerHTML = html;
  },

  /**
   * 绑定全局事件
   */
  bindEvents() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevChapter());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextChapter());

    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => AIChat.saveSettings());
    }
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    if (closeSettingsBtn) {
      closeSettingsBtn.addEventListener('click', () => AIChat.closeSettings());
    }
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) AIChat.closeSettings();
      });
    }

    // 考试遮罩关闭
    const examOverlay = document.getElementById('examOverlay');
    if (examOverlay) {
      examOverlay.addEventListener('click', (e) => {
        if (e.target === examOverlay && confirm('确定要退出考试吗？')) {
          this.closeExam();
        }
      });
    }
    
    // TOC 折叠按钮
    const tocToggleBtn = document.getElementById('toolbarTocBtn');
    if (tocToggleBtn) {
      tocToggleBtn.addEventListener('click', () => this.toggleTOC());
    }

    // AI助手展开/收起
    const chatToggleBtn = document.getElementById('toolbarChatBtn');
    if (chatToggleBtn) {
      chatToggleBtn.addEventListener('click', () => this.toggleChat());
    }
  },
  
  /**
   * 切换 TOC 显示/隐藏
   */
  toggleTOC() {
    const layout = document.querySelector('.app-layout');
    if (layout) {
      layout.classList.toggle('toc-collapsed');
      const btn = document.getElementById('toolbarTocBtn');
      if (btn) {
        btn.classList.toggle('active', !layout.classList.contains('toc-collapsed'));
      }
    }
  },

  /**
   * 切换 AI 助手对话栏 显示/隐藏
   */
  toggleChat() {
    const layout = document.querySelector('.app-layout');
    if (layout) {
      layout.classList.toggle('chat-collapsed');
      const btn = document.getElementById('toolbarChatBtn');
      if (btn) {
        btn.classList.toggle('active', !layout.classList.contains('chat-collapsed'));
      }
    }
  },

  /**
   * 显示书籍封面（首页） - 漫入式设计
   */
  showCover() {
    const contentArea = document.getElementById('contentBody');
    if (!contentArea) return;

    const chaptersMap = this.chapters.map(ch => 
      `<div class="hero-map-card" onclick="App.loadChapter('${ch.id}')">
        <span class="map-num">${ch.num}</span>
        <span class="map-title">${ch.title}</span>
      </div>`
    ).join('');

    contentArea.innerHTML = `
      <div class="hero-section page-transition">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-agent-loop">
            <div class="hero-loop-step">
              <span class="loop-icon">👀</span>
              <span>感知</span>
              <span class="loop-arrow">→</span>
            </div>
            <div class="hero-loop-step">
              <span class="loop-icon">🧠</span>
              <span>规划</span>
              <span class="loop-arrow">→</span>
            </div>
            <div class="hero-loop-step">
              <span class="loop-icon">⚡</span>
              <span>行动</span>
              <span class="loop-arrow">→</span>
            </div>
            <div class="hero-loop-step">
              <span class="loop-icon">🔍</span>
              <span>观察</span>
              <span class="loop-arrow">→</span>
            </div>
            <div class="hero-loop-step">
              <span class="loop-icon">🔄</span>
              <span>反思</span>
            </div>
          </div>

          <div class="cover-badge">2026 · 渐进式可视化教程</div>
          <h1 class="hero-title">AI Agent 百科全书</h1>
          <p class="hero-subtitle">从基础认知到面试通关 · 16章渐进式可视化教程</p>
          
          <div class="hero-btn-group">
            <button class="hero-btn primary" onclick="App.loadChapter('ch00')">
              📖 开始学习
            </button>
            <button class="hero-btn secondary" onclick="App.startRandomExam()">
              📝 先考个试
            </button>
          </div>
          
          <div class="hero-stats">
            <div class="hero-stat-item">
              <span class="stat-num" data-target="16">0</span>
              <span class="stat-label">章节</span>
            </div>
            <div class="hero-stat-item">
              <span class="stat-num" data-target="60">0</span>
              <span class="stat-label">动画演示</span>
            </div>
            <div class="hero-stat-item">
              <span class="stat-num" data-target="130">0</span>
              <span class="stat-label">面试题</span>
            </div>
            <div class="hero-stat-item">
              <span class="stat-num" data-target="8">0</span>
              <span class="stat-label">主流框架</span>
            </div>
          </div>

          <div class="hero-chapter-map">
            <div class="hero-map-title">📚 章节导航 · 点击开始</div>
            <div class="hero-map-scroll">
              ${chaptersMap}
            </div>
          </div>
        </div>
      </div>
    `;

    // 数字计数动画
    this.animateNumbers();

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) breadcrumb.textContent = '首页';

    const prevBtn = document.getElementById('prevChapter');
    if (prevBtn) prevBtn.disabled = true;
    const nextBtn = document.getElementById('nextChapter');
    if (nextBtn) nextBtn.disabled = false;
  },

  /**
   * 数字计数动画 (0 → target, easeOut)
   */
  animateNumbers() {
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1500;
      const start = Date.now();
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        el.textContent = value + (target >= 60 ? '+' : '');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  },

  /**
   * 加载章节
   */
  async loadChapter(chapterId) {
    const chapter = this.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    this.currentChapter = chapterId;
    document.body.dataset.chapter = chapterId;
    document.body.dataset.chapterTitle = chapter.title;

    Progress.markLearning(chapterId);

    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.chapter === chapterId) {
        item.classList.add('active');
      }
    });

    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `<span>${chapter.section}</span> → <span>第${chapter.num}章 ${chapter.title}</span>`;
    }

    // 更新 AI 助手上下文
    const chatContextTitle = document.getElementById('chatContextTitle');
    const chatContextBadge = document.getElementById('chatContextBadge');
    if (chatContextTitle && chatContextBadge) {
      chatContextTitle.textContent = `第${chapter.num}章 ${chapter.title}`;
      chatContextBadge.style.display = 'block';
    }

    const contentArea = document.getElementById('contentBody');
    
    // 骨架屏
    contentArea.innerHTML = `<div class="skeleton-loader"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line"></div><div class="skeleton-line medium"></div></div>`;

    try {
      const response = await fetch(chapter.file);
      if (response.ok) {
        const html = await response.text();
        contentArea.innerHTML = `<div class="page-transition">${html}</div>`;
        
        // 后处理：执行章节内的 <script> 标签（如 ch00 的交互图）
        this.executeChapterScripts(contentArea);
        
        // 后处理：生成右侧目录
        this.generateTOC();
        
        // 后处理：代码块增强
        this.addCodeBlockFeatures();
        // 后处理：表格包装
        this.wrapTables();
        // 后处理：章节底部导航
        this.addChapterNav();
        // 渲染流程图（自动渲染带 data-flowchart 属性的容器）
        if (typeof FlowChart !== 'undefined' && FlowChart.init) {
          FlowChart.init();
        }
        // 加载章节考试题
        if (typeof Quiz !== 'undefined' && Quiz.loadChapterQuiz) {
          Quiz.loadChapterQuiz(chapterId);
        }
      } else {
        contentArea.innerHTML = this.getPlaceholderContent(chapter);
      }
    } catch (e) {
      contentArea.innerHTML = this.getPlaceholderContent(chapter);
    }

    const contentMain = document.querySelector('.content-area');
    if (contentMain) contentMain.scrollTop = 0;

    this.updateNavButtons();

    setTimeout(() => Progress.markCompleted(chapterId), 5000);
  },

  /**
   * 执行章节内的 <script> 标签（innerHTML 不会自动执行脚本）
   * 等待 DOM 完全就绪后再执行，确保容器元素存在
   */
  executeChapterScripts(container) {
    const scripts = container.querySelectorAll('script');
    const scriptTexts = []; // 收集脚本内容
    scripts.forEach(oldScript => {
      scriptTexts.push({
        text: oldScript.textContent,
        src: oldScript.src || null
      });
      // 移除原始脚本（避免后续干扰）
      oldScript.remove();
    });
    // 等待 DOM 渲染完成后执行所有脚本
    if (scriptTexts.length > 0) {
      requestAnimationFrame(() => {
        scriptTexts.forEach(({ text, src }) => {
          if (src) {
            // 外部脚本：动态加载
            const newScript = document.createElement('script');
            newScript.src = src;
            document.head.appendChild(newScript);
          } else if (text) {
            // 内联脚本：直接 eval
            try {
              eval(text);
            } catch (e) {
              console.error('[ChapterScript] eval error:', e);
            }
          }
        });
      });
    }
  },

  /**
   * 生成右侧目录 (TOC)
   */
  generateTOC() {
    const tocNav = document.getElementById('tocNav');
    if (!tocNav) return;
    
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;
    
    // 清空现有目录
    tocNav.innerHTML = '';
    
    // 查找所有标题 (h2.section-heading, h3.sub-heading)
    const headings = contentBody.querySelectorAll('h2.section-heading, h3.sub-heading');
    
    if (headings.length === 0) {
      tocNav.innerHTML = '<div style="padding: 20px; color: var(--color-text-tertiary); font-size: 12px; text-align: center;">暂无目录</div>';
      return;
    }
    
    // 按 section 分组
    let currentSection = null;
    
    headings.forEach((heading, index) => {
      const fullText = heading.textContent.trim();
      const isH2 = heading.tagName === 'H2';
      
      if (isH2) {
        // 新的大节 (h2)
        currentSection = document.createElement('div');
        currentSection.className = 'toc-section';
        
        // 提取节号 (如 "0.1"、"1.1")
        const sectionMatch = fullText.match(/^(\d+\.\d+)\s*(.+)$/);
        const sectionNum = sectionMatch ? sectionMatch[1] : '';
        const sectionTitle = sectionMatch ? sectionMatch[2] : fullText;
        
        // 创建大节标题
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-header';
        sectionHeader.innerHTML = `<span class="toc-num">${sectionNum}</span><span class="toc-title">${sectionTitle}</span>`;
        sectionHeader.dataset.index = index;
        sectionHeader.addEventListener('click', () => {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.highlightTOCItem(index);
        });
        currentSection.appendChild(sectionHeader);
        
        // 创建子项容器
        const subContainer = document.createElement('div');
        subContainer.className = 'toc-sub-items';
        currentSection.appendChild(subContainer);
        
        tocNav.appendChild(currentSection);
      } else {
        // 小节 (h3) - 添加到当前大节的子项中
        if (currentSection) {
          const subContainer = currentSection.querySelector('.toc-sub-items');
          if (subContainer) {
            // h3 标题可能没有小节号（如 "Agent 交互流程图"）
            const subMatch = fullText.match(/^(\d+\.\d+\.\d+)\s*(.+)$/);
            const subNum = subMatch ? subMatch[1] : '';
            const subTitle = subMatch ? subMatch[2] : fullText;
            
            const subItem = document.createElement('div');
            subItem.className = 'toc-sub-item';
            subItem.innerHTML = `<span class="toc-num">${subNum}</span><span class="toc-title">${subTitle}</span>`;
            subItem.dataset.index = index;
            subItem.addEventListener('click', () => {
              heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
              this.highlightTOCItem(index);
            });
            subContainer.appendChild(subItem);
          }
        }
      }
    });
    
    // 滚动监听：自动高亮当前章节
    this.setupTOCScrollSpy(headings);
  },
  
  /**
   * 高亮 TOC 中的指定项
   */
  highlightTOCItem(index) {
    const tocNav = document.getElementById('tocNav');
    if (!tocNav) return;
    
    tocNav.querySelectorAll('.toc-section-header, .toc-sub-item').forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.index) === index);
    });
  },

  /**
   * TOC 滚动监听：自动高亮当前可见的章节
   */
  setupTOCScrollSpy(headings) {
    const tocNav = document.getElementById('tocNav');
    if (!tocNav) return;
    
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    
    const updateActiveTOC = () => {
      const scrollTop = contentArea.scrollTop;
      const containerHeight = contentArea.clientHeight;
      
      let activeIndex = 0;
      headings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect();
        const relativeTop = rect.top - contentArea.getBoundingClientRect().top;
        
        if (relativeTop <= 100) { // 标题进入视口顶部 100px 内
          activeIndex = index;
        }
      });
      
      this.highlightTOCItem(activeIndex);
    };
    
    contentArea.addEventListener('scroll', updateActiveTOC, { passive: true });
    updateActiveTOC(); // 初始状态
  },

  /**
   * 包装裸表格：为不在 .comparison-table 或 .table-wrapper 内的 <table> 加 wrapper
   */
  wrapTables() {
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;
    contentBody.querySelectorAll('table').forEach(table => {
      // 跳过已在 comparison-table 或 table-wrapper 内的
      if (table.closest('.comparison-table') || table.closest('.table-wrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  },

  /**
   * 代码块增强：语言标签 + 复制按钮 + Prism 高亮
   */
  addCodeBlockFeatures() {
    // 1) 收集所有需要处理的 <pre> 元素
    //    - .code-block div 内的 <pre>（优先从 div 入口处理）
    //    - 不在 .code-block 内的裸 <pre>
    const allPres = [];
    // 先处理 .code-block div
    document.querySelectorAll('.code-block').forEach(div => {
      const pre = div.querySelector('pre');
      if (pre && !pre.dataset.enhanced) {
        allPres.push({ pre, codeBlockDiv: div });
        pre.dataset.enhanced = 'true';
      }
    });
    // 再处理不在 .code-block 内的裸 <pre>
    document.querySelectorAll('pre').forEach(pre => {
      if (!pre.dataset.enhanced && !pre.closest('.code-block')) {
        allPres.push({ pre, codeBlockDiv: null });
        pre.dataset.enhanced = 'true';
      }
    });

    allPres.forEach(({ pre, codeBlockDiv }) => {
      let codeEl = pre.querySelector('code');

      // 如果 <pre> 内没有 <code>，包裹一个
      if (!codeEl) {
        codeEl = document.createElement('code');
        // 保留原始文本内容
        codeEl.textContent = pre.textContent;
        // 清空 pre 并放入 code
        pre.innerHTML = '';
        pre.appendChild(codeEl);
      }

      // 推断语言
      let lang = 'Code';
      if (codeEl.className) {
        const match = codeEl.className.match(/language-(\w+)/);
        if (match) lang = match[1];
      }
      if (lang === 'Code') {
        const code = codeEl.textContent || '';
        if (/def |import |from |print\(|class |self\./.test(code)) lang = 'Python';
        else if (/const |function |var |let |=>|async /.test(code)) lang = 'JavaScript';
        else if (/<\/?\s*(html|div|span|script|style)/.test(code)) lang = 'HTML';
        else if (/\{.*".*:/.test(code) && /[{}]/.test(code)) lang = 'JSON';
        else if (/^\s*[a-zA-Z]+:/.test(code) && /---/.test(code)) lang = 'YAML';
        else if (/public |private |class |interface |@Override/.test(code)) lang = 'Java';
        else if (/func |package |import /.test(code) && /fmt\./.test(code)) lang = 'Go';
      }

      // Prism 自动高亮
      codeEl.className = `language-${lang.toLowerCase()}`;
      if (typeof Prism !== 'undefined') {
        Prism.highlightElement(codeEl);
      }

      // 移除旧的 code-label span（如果存在）
      const oldLabel = codeBlockDiv?.querySelector('.code-label, .code_label');
      if (oldLabel) oldLabel.remove();

      // 包装: header + pre
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const header = document.createElement('div');
      header.className = 'code-block-header';
      header.innerHTML = `<span class="code-lang-label">${lang}</span><button class="copy-code-btn" onclick="App.copyCode(this)" title="复制代码">📋</button>`;

      wrapper.appendChild(header);

      if (codeBlockDiv) {
        // 替换 .code-block div 的全部内容为 wrapper
        // 先把 pre 移到 wrapper 里，再清空 div 并放入 wrapper
        wrapper.appendChild(pre);
        codeBlockDiv.innerHTML = '';  // 清空旧内容（code-label 等已移除）
        codeBlockDiv.appendChild(wrapper);
      } else {
        // 裸 pre — 在原位置插入 wrapper
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }
    });
  },

  /**
   * 复制代码
   */
  copyCode(btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    if (!wrapper) return;
    const code = wrapper.querySelector('pre');
    if (!code) return;
    const text = code.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = '✓';
      btn.classList.add('copied');
      // 显示 toast
      App.showToast('已复制到剪贴板');
      setTimeout(() => {
        btn.innerHTML = '📋';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      btn.innerHTML = '✗';
      setTimeout(() => { btn.innerHTML = '📋'; }, 2000);
    });
  },

  /**
   * Toast 消息
   */
  showToast(msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:8px 20px;background:var(--color-primary);color:var(--color-text-inverse);border-radius:100px;font-size:13px;z-index:999;opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  },

  /**
   * 章节底部导航
   */
  addChapterNav() {
    const contentBody = document.getElementById('contentBody');
    if (!contentBody) return;

    const idx = this.currentChapter 
      ? this.chapters.findIndex(c => c.id === this.currentChapter) 
      : -1;
    if (idx < 0) return;

    const prev = idx > 0 ? this.chapters[idx - 1] : null;
    const next = idx < this.chapters.length - 1 ? this.chapters[idx + 1] : null;

    let navHtml = '<div class="chapter-nav-bottom">';
    if (prev) {
      navHtml += `<button class="chapter-nav-btn prev" onclick="App.prevChapter()">
        <span class="nav-arrow">←</span>
        <span class="nav-info"><span class="nav-label">上一章</span><span class="nav-title">${prev.num}. ${prev.title}</span></span>
      </button>`;
    } else {
      navHtml += '<div></div>';
    }
    if (next) {
      navHtml += `<button class="chapter-nav-btn next" onclick="App.nextChapter()">
        <span class="nav-info"><span class="nav-label">下一章</span><span class="nav-title">${next.num}. ${next.title}</span></span>
        <span class="nav-arrow">→</span>
      </button>`;
    } else {
      navHtml += '<div></div>';
    }
    navHtml += '</div>';

    contentBody.querySelector('.page-transition')?.insertAdjacentHTML('beforeend', navHtml);
  },

  /**
   * 上一章
   */
  prevChapter() {
    if (!this.currentChapter) return;
    const idx = this.chapters.findIndex(c => c.id === this.currentChapter);
    if (idx > 0) {
      this.loadChapter(this.chapters[idx - 1].id);
    }
  },

  /**
   * 下一章
   */
  nextChapter() {
    if (!this.currentChapter) {
      this.loadChapter('ch00');
      return;
    }
    const idx = this.chapters.findIndex(c => c.id === this.currentChapter);
    if (idx < this.chapters.length - 1) {
      this.loadChapter(this.chapters[idx + 1].id);
    }
  },

  /**
   * 更新翻页按钮状态
   */
  updateNavButtons() {
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');

    if (!this.currentChapter) {
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = false;
      return;
    }

    const idx = this.chapters.findIndex(c => c.id === this.currentChapter);
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= this.chapters.length - 1;
  },

  /**
   * 切换主题
   */
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ai-agent-guide-theme', next);
    
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  },

  /**
   * 加载主题
   */
  loadTheme() {
    const saved = localStorage.getItem('ai-agent-guide-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      const btn = document.getElementById('themeToggle');
      if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    }
  },

  /**
   * 随机考试模式
   */
  async startRandomExam() {
    // 加载题库
    let quizBank = {};
    try {
      const resp = await fetch('data/quiz-bank.json');
      if (resp.ok) {
        quizBank = await resp.json();
      }
    } catch (e) {
      console.error('题库加载失败', e);
    }

    // 收集所有题目
    const allQuestions = [];
    Object.keys(quizBank).forEach(chId => {
      quizBank[chId].forEach((q, i) => {
        allQuestions.push({ ...q, chapterId: chId, originalIndex: i });
      });
    });

    if (allQuestions.length < 10) {
      alert('题库题目不足，请先完善题库文件。当前题目数：' + allQuestions.length);
      return;
    }

    // 随机抽取20道（或全部如果不足20）
    const examCount = Math.min(20, allQuestions.length);
    this.examQuestions = [];
    const pool = [...allQuestions];
    for (let i = 0; i < examCount; i++) {
      const randIdx = Math.floor(Math.random() * pool.length);
      this.examQuestions.push(pool[randIdx]);
      pool.splice(randIdx, 1);
    }

    this.examAnswers = {};
    this.examStartTime = Date.now();

    // 显示考试界面
    const overlay = document.getElementById('examOverlay');
    if (overlay) overlay.style.display = 'flex';

    this.renderExam();
    this.startExamTimer();
  },

  /**
   * 渲染考试界面
   */
  renderExam() {
    const container = document.getElementById('examContainer');
    if (!container) return;

    let html = `
      <div class="exam-header">
        <h2>📝 AI Agent 综合考试</h2>
        <div class="exam-info">
          <span class="exam-count">共 ${this.examQuestions.length} 题</span>
          <span class="exam-timer" id="examTimer">⏱ 30:00</span>
          <button class="exam-close-btn" onclick="App.closeExam()">✕</button>
        </div>
      </div>
      <div class="exam-progress-bar">
        <div class="exam-progress-fill" id="examProgressFill" style="width:0%"></div>
      </div>
      <div class="exam-body">
    `;

    this.examQuestions.forEach((q, i) => {
      const chNum = q.chapterId.replace('ch', '');
      html += `
        <div class="exam-question" data-qindex="${i}">
          <div class="exam-q-header">
            <span class="exam-q-num">Q${i + 1}</span>
            <span class="exam-q-type ${q.type}">${q.type === 'single' ? '单选' : '多选'}</span>
            <span class="exam-q-chapter">来自第${parseInt(chNum)}章</span>
          </div>
          <div class="exam-q-text">${q.question}</div>
          <div class="exam-options">
      `;
      q.options.forEach((opt, oi) => {
        html += `
          <label class="exam-option" onclick="App.selectExamAnswer(${i}, ${oi})">
            <input type="${q.type === 'single' ? 'radio' : 'checkbox'}" name="exam-q${i}" value="${oi}">
            <span class="exam-option-text">${String.fromCharCode(65 + oi)}. ${opt}</span>
          </label>
        `;
      });
      html += `
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <div class="exam-footer">
        <button class="exam-submit-btn" onclick="App.submitExam()">交卷</button>
      </div>
    `;

    container.innerHTML = html;
  },

  /**
   * 选择考试答案
   */
  selectExamAnswer(qIndex, optionIndex) {
    const q = this.examQuestions[qIndex];
    if (!q) return;

    if (q.type === 'single') {
      this.examAnswers[qIndex] = [optionIndex];
      // 更新UI
      const qEl = document.querySelector(`.exam-question[data-qindex="${qIndex}"]`);
      if (qEl) {
        qEl.querySelectorAll('.exam-option').forEach((el, i) => {
          el.classList.toggle('selected', i === optionIndex);
          const input = el.querySelector('input');
          if (input) input.checked = i === optionIndex;
        });
      }
    } else {
      if (!this.examAnswers[qIndex]) this.examAnswers[qIndex] = [];
      const arr = this.examAnswers[qIndex];
      const pos = arr.indexOf(optionIndex);
      if (pos >= 0) {
        arr.splice(pos, 1);
      } else {
        arr.push(optionIndex);
      }
      const qEl = document.querySelector(`.exam-question[data-qindex="${qIndex}"]`);
      if (qEl) {
        qEl.querySelectorAll('.exam-option').forEach((el, i) => {
          el.classList.toggle('selected', arr.includes(i));
          const input = el.querySelector('input');
          if (input) input.checked = arr.includes(i);
        });
      }
    }

    // 更新进度
    const answered = Object.keys(this.examAnswers).length;
    const total = this.examQuestions.length;
    const fill = document.getElementById('examProgressFill');
    if (fill) fill.style.width = `${(answered / total) * 100}%`;
  },

  /**
   * 考试计时器
   */
  startExamTimer() {
    const totalSeconds = 30 * 60;
    if (this.examTimer) clearInterval(this.examTimer);
    
    this.examTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.examStartTime) / 1000);
      const remaining = totalSeconds - elapsed;
      
      if (remaining <= 0) {
        clearInterval(this.examTimer);
        this.submitExam();
        return;
      }
      
      const min = Math.floor(remaining / 60);
      const sec = remaining % 60;
      const timerEl = document.getElementById('examTimer');
      if (timerEl) {
        timerEl.textContent = `⏱ ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        if (remaining < 60) timerEl.style.color = '#e63946';
      }
    }, 1000);
  },

  /**
   * 提交考试
   */
  submitExam() {
    if (this.examTimer) clearInterval(this.examTimer);

    let correct = 0;
    let wrongQuestions = [];

    this.examQuestions.forEach((q, i) => {
      const userAnswer = this.examAnswers[i] || [];
      const correctAnswer = q.answer || [];
      
      const isCorrect = userAnswer.length === correctAnswer.length &&
        correctAnswer.every(a => userAnswer.includes(a));
      
      if (isCorrect) {
        correct++;
      } else {
        wrongQuestions.push({ q, userAnswer, correctAnswer, index: i });
      }
    });

    const total = this.examQuestions.length;
    const score = Math.round((correct / total) * 100);

    // 评级
    let grade, advice;
    if (score >= 90) {
      grade = '🏆 优秀';
      advice = '你可以直接去面试了！你的 AI Agent 知识储备非常扎实。';
    } else if (score >= 75) {
      grade = '🥈 良好';
      advice = '基础不错！建议针对性复习薄弱章节，查漏补缺。';
    } else if (score >= 60) {
      grade = '🥉 及格';
      advice = '基本概念已掌握，建议系统化学习各章节内容。';
    } else {
      grade = '📚 需加油';
      advice = '从第1章开始系统学习吧，循序渐进效果更好。';
    }

    // 统计错题来源
    const wrongChapters = {};
    wrongQuestions.forEach(wq => {
      const chId = wq.q.chapterId;
      if (!wrongChapters[chId]) wrongChapters[chId] = 0;
      wrongChapters[chId]++;
    });

    const chapterAdvice = Object.keys(wrongChapters)
      .sort((a, b) => wrongChapters[b] - wrongChapters[a])
      .map(chId => {
        const ch = this.chapters.find(c => c.id === chId);
        const chNum = chId.replace('ch', '');
        return ch ? `第${ch.num}章 ${ch.title}（错${wrongChapters[chId]}题）` : `第${parseInt(chNum)}章（错${wrongChapters[chId]}题）`;
      })
      .join('、');

    // 渲染结果
    const container = document.getElementById('examContainer');
    if (!container) return;

    let html = `
      <div class="exam-result">
        <div class="exam-result-header">
          <h2>📊 考试结果</h2>
        </div>
        <div class="exam-score-circle ${score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'pass' : 'fail'}">
          <span class="score-num">${score}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="exam-grade">${grade}</div>
        <div class="exam-advice">${advice}</div>
        <div class="exam-stats">
          <div class="exam-stat"><span class="stat-val">${correct}</span><span class="stat-key">答对</span></div>
          <div class="exam-stat"><span class="stat-val">${total - correct}</span><span class="stat-key">答错</span></div>
          <div class="exam-stat"><span class="stat-val">${total}</span><span class="stat-key">总题数</span></div>
        </div>
      `;

    if (wrongQuestions.length > 0) {
      html += `
        <div class="exam-weak-chapters">
          <h3>📋 薄弱章节</h3>
          <p>${chapterAdvice}</p>
        </div>
        <div class="exam-wrong-list">
          <h3>❌ 错题回顾</h3>
      `;
      wrongQuestions.forEach((wq, i) => {
        const chNum = wq.q.chapterId.replace('ch', '');
        const userText = wq.userAnswer.map(a => String.fromCharCode(65 + a)).join('、') || '未作答';
        const correctText = wq.correctAnswer.map(a => String.fromCharCode(65 + a)).join('、');
        html += `
          <div class="exam-wrong-item">
            <div class="wrong-q-header">
              <span class="wrong-q-num">Q${wq.index + 1}</span>
              <span class="wrong-q-chapter">第${parseInt(chNum)}章</span>
            </div>
            <div class="wrong-q-text">${wq.q.question}</div>
            <div class="wrong-q-answer">
              <span class="wrong-user">你的答案：${userText}</span>
              <span class="wrong-correct">正确答案：${correctText}</span>
            </div>
            <div class="wrong-explanation">${wq.q.explanation || '暂无解析'}</div>
          </div>
        `;
      });
      html += '</div>';
    }

    html += `
      <div class="exam-result-actions">
        <button class="hero-btn secondary" onclick="App.closeExam()">关闭</button>
        <button class="hero-btn primary" onclick="App.closeExam(); App.loadChapter('${wrongQuestions.length > 0 ? wrongQuestions[0].q.chapterId : 'ch00'}')">开始学习</button>
      </div>
    `;

    html += '</div>';
    container.innerHTML = html;

    // 保存成绩
    Progress.saveExamScore(score, correct, total);
  },

  /**
   * 关闭考试
   */
  closeExam() {
    const overlay = document.getElementById('examOverlay');
    if (overlay) overlay.style.display = 'none';
    if (this.examTimer) {
      clearInterval(this.examTimer);
      this.examTimer = null;
    }
    this.examQuestions = [];
    this.examAnswers = {};
  },

  /**
   * 占位内容
   */
  getPlaceholderContent(chapter) {
    return `
      <div class="page-transition">
        <h1 class="chapter-title">第${chapter.num}章 ${chapter.title}</h1>
        <p class="chapter-subtitle">${chapter.section}</p>
        
        <div class="info-banner">
          <div class="banner-title">📌 本章内容</div>
          <p>本章节正在编写中，即将上线。这里是第 ${chapter.num} 章「${chapter.title}」的内容区域。</p>
          <p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">预计包含：动画演示、概念讲解、代码示例、八股总结、课后考试</p>
        </div>
        
        <div class="tip-banner">
          <div class="banner-title">📖 学习提示</div>
          <p>本教程采用渐进式学习设计，建议按顺序逐章阅读。每章配有可视化动画和面试八股题，帮助你在理解概念的同时准备面试。</p>
        </div>
      </div>
    `;
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
