<p align="center">
  <img src="https://img.shields.io/badge/章节-21-blueviolet" alt="21 Chapters">
  <img src="https://img.shields.io/badge/题库-130%2B%20题-orange" alt="130+ Questions">
  <img src="https://img.shields.io/badge/技术栈-HTML%20%2B%20CSS%20%2B%20Vanilla%20JS-green" alt="Tech Stack">
  <img src="https://img.shields.io/badge/部署-Nginx%20%2B%20SSL-brightgreen" alt="Deploy">
</p>

# AI Agent 百科全书

> 从零到面试通关 — 21 章渐进式可视化教程，动画拆解 AI Agent 核心概念

在线阅读：[ai-agent-guide.xiaofuge.cn](https://ai-agent-guide.xiaofuge.cn)

---

## ✨ 项目亮点

- 🎬 **动画拆解**：自研 SVG 流程图引擎，ReAct 循环、MCP 调用链等核心流程可视化呈现
- 📚 **21 章体系**：从 LLM 基础到 2026 技术展望，6 大篇章渐进式学习路径
- 📋 **八股速记**：每章面试高频考点精炼总结，面试官视角点评
- 📝 **在线考试**：130+ 道单选/多选题，自动判分 + 错题本，模拟真实面试
- 💬 **AI 助教**：内置 AI 学习助手，支持 OpenAI 兼容协议，阅读中随时提问
- 🌙 **深色主题**：一键切换亮/暗主题，护眼阅读
- 📊 **进度追踪**：localStorage 记录学习进度，断点续读
- 🚀 **零依赖部署**：纯静态 HTML + CSS + JS，Nginx 直接托管

---

## 📖 21 章大纲

| 篇章 | 章 | 标题 | 核心内容 |
|:---:|:---:|------|------|
| 🎬 序章 | 0 | Agent 能力全景展示 | Token、Prompt、Embedding 全景认知 |
| 📖 第一篇 | 1 | 大模型与 Agent 基础概念 | LLM 原理、Token 机制、Prompt Engineering |
| | 2 | 什么是 AI Agent？ | Agent 定义、架构、与 Chatbot 的区别 |
| | 3 | 你的第一个 Agent：天气查询 | 从零构建 Agent，Function Calling 实战 |
| | 4 | ReAct：让 Agent 学会思考 | Reasoning + Acting 循环，思维链拆解 |
| | 5 | Agent 的记忆系统 | 短期/长期记忆、向量检索、记忆管理 |
| 🛠️ 第二篇 | 6 | Function Calling 与工具设计 | 工具协议、参数 Schema、最佳实践 |
| | 7 | MCP：工具的标准化接口 | Model Context Protocol、Server/Client 架构 |
| | 8 | Skills：工具的组合与复用 | 技能编排、Prompt 模板、组合调用 |
| | 9 | CLI 能力：Agent 操作本地工具 | Shell 执行、文件操作、系统交互 |
| 🤝 第三篇 | 10 | 多 Agent 系统架构 | 协作模式、通信机制、分工策略 |
| | 11 | LangGraph 与状态机 | 图编排、状态流转、条件分支 |
| 🏗️ 第四篇 | 12 | 主流 Agent 框架对比 | LangChain / CrewAI / AutoGen 横评 |
| | 13 | Dify、Coze 与可视化编排 | 低代码平台、工作流设计、插件生态 |
| 🚀 第五篇 | 14 | CLI Agent：命令行智能助手 | 终端 Agent 实战、代码生成、运维自动化 |
| | 15 | GUI Agent：浏览器自动化 | 网页操作、表单填写、截图理解 |
| | 16 | RAG：检索增强生成 | 文档切分、向量化、检索策略 |
| ⚙️ 第六篇 | 17 | Agent 评估与可观测性 | 评测指标、Trace 追踪、LangSmith |
| | 18 | Agent 安全与防护 | Prompt 注入、权限控制、沙箱隔离 |
| | 19 | Agent 部署与运维 | 容器化、弹性伸缩、监控告警 |
| | 20 | 推理框架与模型服务化 | Ollama、vLLM、Spring AI 部署实践 |
| 🔮 终章 | 21 | 2026 Agent 技术展望 | 多模态、具身智能、Agent 生态趋势 |

---

## 🏗️ 项目结构

```
ai-agent-guide/
├── index.html                    # 主页面（三栏布局 + 工具栏）
├── cors-proxy.js                 # CORS 代理（AI 对话助手，Node.js）
├── css/
│   ├── book.css                  # 核心样式系统（设计令牌 + 组件 + 深色主题）
│   └── animations.css            # 动画效果库（翻页、渐入、高亮）
├── js/
│   ├── main.js                   # 主控制器（导航、主题、考试、Tab 书签）
│   ├── flowchart.js              # 自研 SVG 流程图渲染引擎
│   ├── quiz.js                   # 考试系统（题库加载、答题、判分、错题）
│   ├── progress.js               # 学习进度追踪（localStorage 持久化）
│   └── chat.js                   # AI 对话助手（OpenAI 兼容协议 + 流式响应）
├── chapters/                     # 21 个章节内容
│   ├── ch00-fundamentals.html    # 序章：Agent 能力全景展示
│   ├── ch01-llm-basics.html      # 第1章：大模型与 Agent 基础概念
│   ├── ch02-what-is-agent.html   # 第2章：什么是 AI Agent？
│   ├── ...
│   └── ch20-inference-framework.html  # 第20章：推理框架与模型服务化
├── data/
│   └── quiz-bank.json            # 题库（21 章，约 130+ 题，162KB）
├── nginx/                        # Nginx 部署配置
│   ├── conf/conf.d/              # 站点配置（HTTPS + SPA 路由）
│   └── ssl/                      # SSL 证书
└── assets/                       # 静态资源
```

---

## 🎨 设计理念

### 不要"AI味"

| 维度 | 选择 | 拒绝 |
|------|------|------|
| 配色 | 沉稳蓝灰 `#0f172a` + 靛蓝点缀 `#4f46e5` | 紫蓝渐变、荧光色 |
| 字体 | 系统字体栈（PingFang SC / SF Mono） | 花哨 Google Font |
| 布局 | 三栏式书籍阅读体验 | 卡片堆砌、过度动效 |
| 风格 | 干净、统一、实用，像一本设计精良的技术书 | 花哨、炫技、信息密度低 |

### 三栏布局

```
┌──────────┬────────────────────────────┬──────────┐
│  左侧栏  │         中间内容区          │  右侧栏  │
│  260px   │                            │  340px   │
│          │                            │          │
│ 📚 目录  │   📖 文章 / 📋 八股 / 📝 考试  │ 💬 AI   │
│ 进度条   │   翻页过渡动画              │ 学习助手 │
│ 章节状态 │   自研流程图渲染            │ 流式对话 │
│          │   Prism.js 代码高亮         │ 多模型   │
└──────────┴────────────────────────────┴──────────┘
```

- **左侧（260px）**：目录导航，带进度条和章节完成状态
- **中间**：内容阅读区，每章三个书签标签页（📖 文章 / 📋 八股 / 📝 考试）
- **右侧（340px）**：AI 学习助手，可配置多个 OpenAI 兼容 API

### 章节书签 Tab

每章内容顶部有三个书签标签页：

- 📖 **文章**：章节正文内容，含动画流程图和代码示例
- 📋 **八股**：面试高频考点总结（带题目计数徽章）
- 📝 **考试**：课后考试题（单选 + 多选，自动判分，错题收录）

---

## 💬 AI 学习助手

内置 AI 对话助手，阅读过程中随时提问：

- **开箱即用**：内置免费 API 配置（Agnes AI），无需额外设置
- **自定义模型**：支持配置多个 OpenAI 兼容 API（GPT / Claude / Gemini / 国产模型）
- **流式响应**：支持 SSE 流式输出，打字机效果实时显示
- **上下文感知**：对话自动携带当前章节信息，助教能针对性回答
- **配置持久化**：API 配置保存到 localStorage，刷新不丢失
- **CORS 代理**：内置 `cors-proxy.js` 代理服务，绕过浏览器跨域限制

---

## 📝 考试系统

### 题库设计

- **题量**：21 章，约 130+ 道题（每章 5 单选 + 3 多选）
- **题型**：单选题 + 多选题，自动判分
- **来源**：`data/quiz-bank.json`（162KB），按章节组织
- **面试官视角**：题目表述像面试官在提问，解析像面试官在点评

### 考试功能

- ✅ 章节考试：学完一章立即测试
- ✅ 随机考试：全库随机抽题，模拟综合面试
- ✅ 自动判分：提交后即时出分 + 逐题解析
- ✅ 错题本：答错的题目自动记录，可回顾复习
- ✅ 计时器：考试计时，模拟真实面试压力

---

## 🛠️ 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Vanilla JS | 零依赖，纯原生实现 |
| 样式系统 | CSS Custom Properties | 设计令牌驱动，深色主题一键切换 |
| 流程图 | 自研 SVG 引擎 | `flowchart.js`，不依赖 Mermaid / D3 |
| 代码高亮 | Prism.js | Python / JSON / YAML / Java / Bash |
| 进度追踪 | localStorage | 无需后端，断点续读 |
| AI 对话 | OpenAI 兼容协议 | 流式 SSE，多模型切换 |
| CORS 代理 | Node.js | `cors-proxy.js`，轻量代理服务 |
| 部署 | Nginx + SSL | 纯静态托管，HTTPS + SPA 路由 |

---

## 🚀 本地预览

### 方式一：Python HTTP Server

```bash
cd ai-agent-guide
python3 -m http.server 8080
# 打开 http://localhost:8080
```

### 方式二：启动 AI 对话助手（可选）

AI 助手默认使用内置免费 API，可直接使用。如需自定义 API，启动 CORS 代理：

```bash
node cors-proxy.js 8092
# 代理运行在 http://localhost:8092/proxy/chat/completions
```

---

## 🌐 线上部署

项目使用 Nginx 托管，配置文件位于 `nginx/` 目录：

```bash
# 1. 将静态文件部署到服务器
scp -r ./* user@server:/usr/share/nginx/html/ai-agent-guide.xiaofuge.cn/

# 2. 配置 Nginx（已包含 HTTPS + SPA 路由）
cp nginx/conf/conf.d/ai-agent-guide.xiaofuge.cn.conf /etc/nginx/conf.d/

# 3. 重载 Nginx
nginx -s reload
```

Nginx 配置要点：
- HTTP → HTTPS 自动重定向
- SPA 路由回退（`try_files $uri /index.html`）
- 静态资源 7 天缓存（CSS / JS / 图片 / 字体）
- UTF-8 字符编码

---

## 📊 项目数据

| 指标 | 数值 |
|------|------|
| 章节数 | 21 章 |
| 题库题量 | 130+ 道 |
| 题库大小 | 162 KB |
| 核心样式 | 2,800+ 行 CSS |
| 主控制器 | 1,500+ 行 JS |
| 流程图引擎 | 350+ 行 JS |
| 总代码量 | 约 1.5 MB（含章节 HTML） |
| 外部依赖 | 仅 Prism.js（CDN） |

---

## 📜 License

Apache-2.0
