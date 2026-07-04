/* ========================================
   AI Agent 百科全书 - 主控制器
   20章 · 翻页导航 · 主题切换 · 随机考试
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
    { id: 'ch09', num: 9, title: 'CLI 能力：Agent 操作本地工具', section: '🛠️ 第二篇：Agent 的手脚', file: 'chapters/ch09-cli-capability.html' },

    // 第三篇：多 Agent 协作
    { id: 'ch10', num: 10, title: '多 Agent 系统架构', section: '🤝 第三篇：多 Agent 协作', file: 'chapters/ch09-multi-agent.html' },
    { id: 'ch11', num: 11, title: 'LangGraph 与状态机', section: '🤝 第三篇：多 Agent 协作', file: 'chapters/ch10-langgraph.html' },

    // 第四篇：框架与平台
    { id: 'ch12', num: 12, title: '主流 Agent 框架对比', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch11-framework-comparison.html' },
    { id: 'ch13', num: 13, title: 'Dify、Coze 与可视化编排', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch12-dify-coze.html' },
    { id: 'ch14', num: 14, title: 'Agent 评估与可观测性', section: '🏗️ 第四篇：框架与平台', file: 'chapters/ch13-evaluation.html' },

    // 第五篇：综合实战
    { id: 'ch15', num: 15, title: 'CLI Agent：命令行智能助手', section: '🚀 第五篇：综合实战', file: 'chapters/ch14-cli-agent.html' },
    { id: 'ch16', num: 16, title: 'GUI Agent：浏览器自动化', section: '🚀 第五篇：综合实战', file: 'chapters/ch15-gui-agent.html' },

    // 第六篇：工程化
    { id: 'ch18', num: 18, title: 'RAG：检索增强生成', section: '⚙️ 第六篇：工程化', file: 'chapters/ch17-rag.html' },
    { id: 'ch19', num: 19, title: 'Agent 安全与防护', section: '⚙️ 第六篇：工程化', file: 'chapters/ch18-security.html' },
    { id: 'ch20', num: 20, title: 'Agent 部署与运维', section: '⚙️ 第六篇：工程化', file: 'chapters/ch19-deployment.html' },

    // 终章
    { id: 'ch17', num: 17, title: '2026 Agent 技术展望', section: '🔮 终章', file: 'chapters/ch16-future-summary.html' }
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
    
    // AI助手默认展开（收藏到侧边栏）
    this.setDefaultChatVisible();
    
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
        if (e.target === examOverlay) {
          this.showExamExitConfirm();
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

    // 回到顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    const contentArea = document.querySelector('.content-area');
    if (backToTopBtn && contentArea) {
      backToTopBtn.addEventListener('click', () => {
        contentArea.scrollTo({ top: 0, behavior: 'smooth' });
      });
      contentArea.addEventListener('scroll', () => {
        if (contentArea.scrollTop > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, { passive: true });
    }
  },
  
  /**
   * 切换 TOC 显示/隐藏
   */
  toggleTOC() {
    const layout = document.querySelector('.app-layout');
    const tocBtn = document.getElementById('toolbarTocBtn');
    if (!layout) return;
    
    layout.classList.toggle('toc-collapsed');
    const isCollapsed = layout.classList.contains('toc-collapsed');
    if (tocBtn) {
      tocBtn.classList.toggle('active', !isCollapsed);
    }
  },

  /**
   * 设置 AI 助手默认收起（点击后展开）
   * 首次访问时默认收起，用户手动展开后记住状态
   */
  setDefaultChatVisible() {
    const layout = document.querySelector('.app-layout');
    const chatBtn = document.getElementById('toolbarChatBtn');
    if (!layout) return;
    
    // 检查用户是否曾经手动展开过AI助手
    const chatShown = localStorage.getItem('ai-agent-guide-chat-shown');
    
    if (chatShown === 'true') {
      // 用户之前展开过，保持展开状态
      layout.classList.remove('chat-collapsed');
      if (chatBtn) chatBtn.classList.add('active');
    } else {
      // 默认收起AI助手（用户点击按钮后再展开）
      layout.classList.add('chat-collapsed');
      if (chatBtn) chatBtn.classList.remove('active');
    }
  },

  /**
   * 切换 AI 助手对话栏 显示/隐藏
   */
  toggleChat() {
    const layout = document.querySelector('.app-layout');
    if (!layout) return;
    
    const chatBtn = document.getElementById('toolbarChatBtn');
    const isCollapsed = layout.classList.contains('chat-collapsed');
    
    if (isCollapsed) {
      // 展开
      layout.classList.remove('chat-collapsed');
      if (chatBtn) chatBtn.classList.add('active');
      // 记住用户选择了展开
      localStorage.setItem('ai-agent-guide-chat-shown', 'true');
    } else {
      // 收起
      layout.classList.add('chat-collapsed');
      if (chatBtn) chatBtn.classList.remove('active');
      // 记住用户选择了收起
      localStorage.removeItem('ai-agent-guide-chat-shown');
    }
  },

  /**
   * 显示书籍封面（首页） - 漫入式设计
   */
  showCover() {
    const contentArea = document.getElementById('contentBody');
    const layout = document.querySelector('.app-layout');
    if (!contentArea) return;

    // 首页不显示目录：收起目录面板
    if (layout) layout.classList.add('toc-collapsed');
    // 清空 tocNav 内容
    const tocNav = document.getElementById('tocNav');
    if (tocNav) tocNav.innerHTML = '';

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
          <p class="hero-subtitle">从基础认知到面试通关 · 20章渐进式可视化教程</p>
          
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
        
        // 后处理：八股/考试标签页包装（在脚本执行之前，标记区域）
        this.wrapTabSections(contentArea);
        // 后处理：执行章节内的 <script> 标签（如 ch00 的交互图、Quiz.render）
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
        // 后处理：让宽内容（流程图、SVG架构图）突破 max-width 限制
        this.expandWideContent();
      } else {
        contentArea.innerHTML = this.getPlaceholderContent(chapter);
      }
    } catch (e) {
      contentArea.innerHTML = this.getPlaceholderContent(chapter);
    }

    const contentMain = document.querySelector('.content-area');
    if (contentMain) contentMain.scrollTop = 0;

    this.updateNavButtons();

    // 滚动到底部时标记章节完成（替代原来的 5 秒自动完成）
    this.setupScrollCompletion(chapterId);
  },

  /**
   * 滚动到底部标记完成
   */
  setupScrollCompletion(chapterId) {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;

    let marked = false;
    const checkScroll = () => {
      if (marked) return;
      const { scrollTop, scrollHeight, clientHeight } = contentArea;
      // 滚动到距底部 100px 以内时标记完成
      if (scrollHeight - scrollTop - clientHeight < 100) {
        marked = true;
        Progress.markCompleted(chapterId);
        contentArea.removeEventListener('scroll', checkScroll);
      }
    };
    contentArea.addEventListener('scroll', checkScroll, { passive: true });
  },

  /**
   * 让宽内容（流程图、SVG 架构图）突破 content-body 的 max-width 限制
   * 动态计算 content-area 的实际宽度，给超宽元素设置负 margin 撑满
   */
  expandWideContent() {
    const contentBody = document.querySelector('.content-body');
    if (!contentBody) return;

    // 查找包含宽 SVG 的 div（排除卡片等容器），标记为可横向滚动
    const svgContainers = contentBody.querySelectorAll('div');
    svgContainers.forEach(div => {
      if (div.querySelector(':scope > svg[width]') && 
          !div.classList.contains('card') && 
          !div.classList.contains('qa-item') && 
          !div.classList.contains('summary-box') &&
          !div.classList.contains('tab-content') &&
          !div.classList.contains('chapter-tabs-nav') &&
          !div.dataset.wideMarked) {
        div.dataset.wideMarked = '1';
        div.classList.add('wide-svg-container');
      }
    });
  },

  /**
   * 执行章节内的 <script> 标签（innerHTML 不会自动执行脚本）
   * 使用 <script> 元素 append 方式替代 eval()，更安全且支持调试
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
            // 内联脚本：通过 <script> 元素执行（替代 eval，更安全且支持调试）
            try {
              const newScript = document.createElement('script');
              newScript.textContent = text;
              document.head.appendChild(newScript);
              // 执行后移除，避免 DOM 膨胀
              document.head.removeChild(newScript);
            } catch (e) {
              console.error('[ChapterScript] execution error:', e);
            }
          }
        });
      });
    }
  },

  /**
   * 生成内联目录 (TOC)
   * 智能显示：如果当前章节没有 h2/h3 标题，则不展示目录。
   * 目录以 content-body 的子元素身份在章节内容右侧内联展示 (CSS Grid 右侧 sticky 列)，
   * 配色与章节正文 (section-heading / sub-heading) 保持一致。
   */
  generateTOC() {
    const contentBody = document.getElementById('contentBody');
    const layout = document.querySelector('.app-layout');
    if (!contentBody || !layout) return;

    // 查找所有标题 (h2.section-heading, h3.sub-heading)
    const headings = contentBody.querySelectorAll('h2.section-heading, h3.sub-heading');

    // 获取 toc-panel 中的 tocNav 元素
    const tocNav = document.getElementById('tocNav');
    if (tocNav) tocNav.innerHTML = ''; // 清空旧内容

    if (headings.length === 0) {
      // 没有标题：收起目录面板，不显示任何目录栏效果
      layout.classList.add('toc-collapsed');
      return;
    }

    // 有标题：展开目录面板
    layout.classList.remove('toc-collapsed');

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
   * 将章节内容包装成顶部三标签页：文章 / 八股 / 面试
   * 兼容多种八股格式：
   *   - 标准格式：<div class="summary-title">📋 八股总结 — 面试高频考点</div>
   *   - 非标准格式：<h2 class="section-heading">📋 八股总结</h2>
   * 使用 CSS 控制显示/隐藏，不移动 DOM 节点
   */
  wrapTabSections(container) {
    const pageDiv = container.querySelector('.page-transition');
    if (!pageDiv) return;

    // 查找八股总结区域 — 兼容多种格式
    let baguStartEl = null;
    let baguParentEl = null;
    // 格式1: <div class="summary-title"> 含"八股"文字（标准格式，含 qa-item 卡片）
    const allSummaryTitles = pageDiv.querySelectorAll('.summary-title');
    for (const el of allSummaryTitles) {
      const text = el.textContent.trim();
      // 匹配"八股总结"或"面试高频考点"
      if (/八股|面试高频/.test(text)) {
        baguStartEl = el;
        // 找到该 summary-title 所在 summary-box（通常是 pageDiv 的直接子元素）
        baguParentEl = el.closest('.summary-box');
        break;
      }
    }
    // 格式2: <h2 class="section-heading"> 含"八股"文字（非标准格式，含 ol 列表）
    if (!baguStartEl) {
      const allHeadings = pageDiv.querySelectorAll('h2.section-heading');
      for (const el of allHeadings) {
        if (/八股/.test(el.textContent.trim())) {
          baguStartEl = el;
          baguParentEl = el;
          break;
        }
      }
    }

    // 查找考试区域
    const quizStartEl = pageDiv.querySelector('#quizArea');

    // 既没有八股也没有考试，跳过
    if (!baguStartEl && !quizStartEl) return;

    // 标记各个区域的内容
    let currentSection = 'article';
    const children = Array.from(pageDiv.children);

    // 用于统计八股题目数和面试题目数
    let baguCount = 0;
    let quizCount = 0;

    children.forEach(child => {
      // 检查是否是八股开始（用 contains 判断，因为 baguStartEl 可能是子元素而非直接子元素）
      if (baguParentEl && baguParentEl.contains(child)) {
        currentSection = 'bagu';
      }
      // 检查是否是考试开始
      if (child === quizStartEl || child.id === 'quizArea') {
        currentSection = 'quiz';
      }

      // 添加数据属性标记
      child.dataset.tabSection = currentSection;

      // 统计八股题目数
      if (currentSection === 'bagu') {
        baguCount += child.querySelectorAll('.qa-item').length;
        // 非标准格式用 ol > li
        if (!baguCount) {
          baguCount += child.querySelectorAll('ol > li').length;
        }
      }
    });

    // 面试题目数：从 quizArea 内的 quiz-question 统计，或从题库 JSON 预估
    if (quizStartEl) {
      // quizArea 初始为空，Quiz.render 后才有内容，延迟统计
      setTimeout(() => {
        const quizQs = quizStartEl.querySelectorAll('.quiz-question').length;
        const badge = navDiv.querySelector('[data-tab="quiz"] .tab-badge');
        if (badge && quizQs > 0) badge.textContent = quizQs;
      }, 800);
    }

    // 创建标签页导航栏
    const navDiv = document.createElement('div');
    navDiv.className = 'chapter-tabs-nav';

    const hasArticle = children.some(c => c.dataset.tabSection === 'article');
    const hasBagu = children.some(c => c.dataset.tabSection === 'bagu');
    const hasQuiz = children.some(c => c.dataset.tabSection === 'quiz');

    // Tab 定义：图标 + 标签 + 徽章
    const tabIcons = { article: '📖', bagu: '📋', quiz: '📝' };
    const tabLabels = { article: '文章', bagu: '八股', quiz: '面试' };

    const tabDefs = [];
    if (hasArticle) tabDefs.push({ id: 'article', active: true });
    if (hasBagu) tabDefs.push({ id: 'bagu', active: !hasArticle, badge: baguCount || null });
    if (hasQuiz) tabDefs.push({ id: 'quiz', active: !hasArticle && !hasBagu });

    // 绑定标签切换事件
    const switchTab = (tabId) => {
      // 更新按钮状态
      navDiv.querySelectorAll('.chapter-tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = navDiv.querySelector(`[data-tab="${tabId}"]`);
      if (activeBtn) activeBtn.classList.add('active');

      // 更新内容显示
      const allChildren = Array.from(pageDiv.children);
      allChildren.forEach(child => {
        if (child.classList.contains('chapter-tabs-nav')) return;

        const section = child.dataset.tabSection || 'article';
        if (section === tabId) {
          child.classList.remove('tab-hidden');
        } else {
          child.classList.add('tab-hidden');
        }
      });

      // 重新生成 TOC
      setTimeout(() => this.generateTOC(), 50);
    };

    // 创建标签按钮（带图标和计数徽章）
    tabDefs.forEach(def => {
      const btn = document.createElement('button');
      btn.className = 'chapter-tab-btn' + (def.active ? ' active' : '');
      btn.dataset.tab = def.id;
      btn.type = 'button';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'tab-icon';
      iconSpan.textContent = tabIcons[def.id];

      const labelSpan = document.createElement('span');
      labelSpan.textContent = tabLabels[def.id];

      btn.appendChild(iconSpan);
      btn.appendChild(labelSpan);

      // 计数徽章
      if (def.badge) {
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'tab-badge';
        badgeSpan.textContent = def.badge;
        btn.appendChild(badgeSpan);
      } else if (def.id === 'quiz') {
        // 面试 Tab 的徽章延迟填充，先占位
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'tab-badge';
        badgeSpan.textContent = '?';
        btn.appendChild(badgeSpan);
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        switchTab(def.id);
      });
      navDiv.appendChild(btn);
    });

    // 插入导航栏到 pageDiv 开头
    pageDiv.insertBefore(navDiv, pageDiv.firstChild);

    // 初始化：隐藏非活动标签的内容
    const activeTab = tabDefs.find(t => t.active)?.id || 'article';
    children.forEach(child => {
      const section = child.dataset.tabSection || 'article';
      if (section !== activeTab) {
        child.classList.add('tab-hidden');
      }
    });

    // 监听滚动，Tab 栏吸顶时添加 is-stuck 样式
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      const checkStuck = () => {
        const navRect = navDiv.getBoundingClientRect();
        const headerRect = document.querySelector('.content-header')?.getBoundingClientRect();
        const headerBottom = headerRect ? headerRect.bottom : 57;
        // Tab 栏顶部紧贴或低于 header 底部时即为吸顶状态
        if (Math.abs(navRect.top - headerBottom) < 2) {
          navDiv.classList.add('is-stuck');
        } else {
          navDiv.classList.remove('is-stuck');
        }
      };
      contentArea.addEventListener('scroll', checkStuck, { passive: true });
      // 初始检查一次
      checkStuck();
    }
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
    // 加载题库（复用 Quiz 缓存）
    let quizBank = {};
    try {
      if (typeof Quiz !== 'undefined' && Quiz._bankCache) {
        quizBank = Quiz._bankCache;
      } else {
        const resp = await fetch('data/quiz-bank.json');
        if (resp.ok) {
          quizBank = await resp.json();
          if (typeof Quiz !== 'undefined') Quiz._bankCache = quizBank;
        }
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
          <div class="exam-q-text">${this.escapeHtml(q.question)}</div>
          <div class="exam-options">
      `;
      q.options.forEach((opt, oi) => {
        html += `
          <label class="exam-option" onclick="App.selectExamAnswer(${i}, ${oi})">
            <input type="${q.type === 'single' ? 'radio' : 'checkbox'}" name="exam-q${i}" value="${oi}">
            <span class="exam-option-text">${String.fromCharCode(65 + oi)}. ${this.escapeHtml(opt)}</span>
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
   * 考试退出确认弹窗（替代原生 confirm）
   */
  showExamExitConfirm() {
    const examContainer = document.getElementById('examContainer');
    if (!examContainer) return;

    // 如果已有确认弹窗则不重复创建
    if (document.getElementById('examExitConfirm')) return;

    const confirmDiv = document.createElement('div');
    confirmDiv.id = 'examExitConfirm';
    confirmDiv.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:100;';
    confirmDiv.innerHTML = `
      <div style="background:var(--color-surface);border-radius:var(--radius-lg);padding:32px;max-width:360px;text-align:center;box-shadow:var(--shadow-lg);">
        <div style="font-size:28px;margin-bottom:12px;">⚠️</div>
        <div style="font-size:var(--text-lg);font-weight:600;color:var(--color-text);margin-bottom:8px;">确定退出考试？</div>
        <div style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:24px;">退出后当前答题进度不会保存</div>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="examExitCancel" style="padding:8px 24px;border:1px solid var(--color-border);border-radius:var(--radius-sm);background:transparent;color:var(--color-text);cursor:pointer;font-size:var(--text-sm);">继续考试</button>
          <button id="examExitConfirmBtn" style="padding:8px 24px;border:none;border-radius:var(--radius-sm);background:var(--color-error);color:#fff;cursor:pointer;font-size:var(--text-sm);">确认退出</button>
        </div>
      </div>
    `;
    examContainer.appendChild(confirmDiv);

    document.getElementById('examExitCancel').addEventListener('click', () => {
      confirmDiv.remove();
    });
    document.getElementById('examExitConfirmBtn').addEventListener('click', () => {
      confirmDiv.remove();
      this.closeExam();
    });
  },

  /**
   * HTML 转义工具方法 — 防止 XSS
   */
  escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
