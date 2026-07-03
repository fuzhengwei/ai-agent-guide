# AI Agent 渐进式可视化教程

> 从零到面试通关 — 17章渐进式可视化教程

## 项目结构

```
ai-agent-guide.xiaofuge.cn/
├── index.html              # 主页面（三栏布局）
├── cors-proxy.js           # CORS 代理（AI 对话助手用，Node.js）
├── css/
│   ├── book.css            # 核心样式系统（设计令牌、布局、组件、主题）
│   └── animations.css      # 动画效果库
├── js/
│   ├── main.js             # 主控制器（翻页、导航、主题、考试、Tab 书签）
│   ├── flowchart.js        # 自研 SVG 流程图渲染引擎
│   ├── quiz.js             # 考试系统（题库、答题、判分、错题）
│   ├── progress.js         # 学习进度追踪（localStorage）
│   └── chat.js             # AI 对话助手（OpenAI 兼容协议）
├── chapters/               # 17个章节内容（ch00~ch16）
│   └── chXX-xxx.html       # 每章含：文章 + 八股总结 + 课后考试（三标签页）
├── data/
│   └── quiz-bank.json      # 题库（按章节组织，约130题）
└── assets/
    ├── diagrams/           # SVG 图表素材
    └── icons/              # 图标素材
```

## 设计理念

### 不要"AI味"
- **配色**：沉稳蓝灰 + 暖色点缀（#2c3e50 + #d4a574），不用紫蓝渐变
- **字体**：系统字体栈，不用花哨的 Google Font
- **布局**：三栏式书籍阅读体验，不堆砌卡片和动效
- **风格**：干净、统一、实用，像一本设计精良的技术书

### 三栏布局
- **左侧（260px）**：目录导航，带进度条和章节完成状态
- **中间**：内容阅读区，支持翻页过渡动画
- **右侧（340px）**：AI 学习助手，可配置多个 OpenAI 兼容 API

### 章节书签 Tab
每章内容顶部有三个书签标签页：
- 📖 **文章**：章节正文内容
- 📋 **八股**：面试高频考点总结（带题目计数徽章）
- 📝 **面试**：课后考试题（单选+多选，自动判分）

### AI 对话助手
- 用户可自定义多个 API 配置（name / baseUrl / apiKey / model）
- 支持 OpenAI 兼容协议（GPT、Claude、Gemini、国产模型等）
- 配置持久化到 localStorage
- 对话上下文携带当前章节信息，助教能针对性回答
- 需要本地启动 `cors-proxy.js` 代理（端口 8091）

## 17章大纲

| 篇 | 章 | 标题 |
|---|---|------|
| 序章 | 0 | Agent 能力全景展示 |
| Agent 基础 | 1 | 大模型与 Agent 基础概念 |
| | 2 | 什么是 AI Agent？ |
| | 3 | 你的第一个 Agent：天气查询 |
| | 4 | ReAct：让 Agent 学会思考 |
| | 5 | Agent 的记忆系统 |
| Agent 的手脚 | 6 | Function Calling 与工具设计 |
| | 7 | MCP：工具的标准化接口 |
| | 8 | Skills：工具的组合与复用 |
| 多 Agent 协作 | 9 | 多 Agent 系统架构 |
| | 10 | LangGraph 与状态机 |
| 框架与平台 | 11 | 主流 Agent 框架对比 |
| | 12 | Dify、Coze 与可视化编排 |
| | 13 | Agent 评估与可观测性 |
| 综合实战 | 14 | CLI Agent：命令行智能助手 |
| | 15 | GUI Agent：浏览器自动化 |
| 终章 | 16 | 2026 Agent 技术展望 |

## 八股题设计原则

- **有浅有深**：从概念辨析到架构设计，模拟真实面试
- **面试官视角**：题目表述像面试官在提问，解析像面试官在点评
- **每章 5单选+3多选**（第16章 3+2），总计约130题
- **错题本**：答错的题目自动记录，可回顾

## 技术栈

- 纯静态：HTML + CSS + Vanilla JS，无构建工具
- 自研 SVG 流程图引擎，不依赖 Mermaid/D3
- localStorage 进度追踪，无需后端
- 响应式设计，支持深色主题

## 本地预览

```bash
cd ai-agent-guide.xiaofuge.cn
python3 -m http.server 8080
# 打开 http://localhost:8080

# 可选：启动 AI 对话助手的 CORS 代理
node cors-proxy.js 8091
```
