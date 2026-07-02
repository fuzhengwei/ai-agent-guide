# AI Agent 渐进式可视化教程

> 从零到面试通关 — 18章渐进式可视化教程

## 项目结构

```
ai-agent-guide.xiaofuge.cn/
├── index.html              # 主页面（三栏布局）
├── css/
│   ├── book.css            # 核心样式系统（设计令牌、布局、组件）
│   └── animations.css      # 动画效果库
├── js/
│   ├── main.js             # 主控制器（翻页、导航、主题、初始化）
│   ├── flowchart.js        # 自研 SVG 流程图渲染引擎
│   ├── quiz.js             # 考试系统（题库、答题、判分、错题）
│   ├── progress.js         # 学习进度追踪（localStorage）
│   └── chat.js             # AI 对话助手（OpenAI 兼容协议）
├── chapters/               # 18个章节内容
│   └── ch01-what-is-agent.html  # 第1章（已完成范例）
├── data/
│   └── quiz-bank.json      # 题库（按章节组织）
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
- **左侧（280px）**：目录导航，带进度条和章节完成状态
- **中间**：内容阅读区，支持翻页过渡动画
- **右侧（380px）**：AI 学习助手，可配置多个 OpenAI 兼容 API

### AI 对话助手
- 用户可自定义多个 API 配置（name / baseUrl / apiKey / model）
- 支持 OpenAI 兼容协议（GPT、Claude、Gemini、国产模型等）
- 配置持久化到 localStorage
- 对话上下文携带当前章节信息，助教能针对性回答

## 18章大纲

| 篇 | 章 | 标题 |
|---|---|------|
| 基础认知 | 1 | 什么是AI Agent？ ✅ |
| | 2 | Agent核心架构 |
| | 3 | ReAct模式详解 |
| 核心能力 | 4 | 记忆系统 |
| | 5 | 工具调用与Skills |
| | 6 | RAG检索增强生成 |
| 进阶架构 | 7 | 多智能体协作 |
| | 8 | 工作流vs自主智能体 |
| | 9 | 编排者-执行者模式 |
| | 10 | 反思与自我纠正 |
| | 11 | Google ADK |
| | 12 | Spring AI / Spring AI Alibaba |
| 工程实战 | 13 | LangGraph实战 |
| | 14 | MCP协议详解 |
| | 15 | Agent评估体系 |
| | 16 | Agentic RAG专项 |
| | 17 | 工程化实践 |
| 前沿展望 | 18 | AI Agent编年史与未来 |

## 八股题设计原则

- **有浅有深**：从概念辨析到架构设计，模拟真实面试
- **面试官视角**：题目表述像面试官在提问，解析像面试官在点评
- **每章 5单选+3多选**（第18章 3+2），总计约130题
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
```
