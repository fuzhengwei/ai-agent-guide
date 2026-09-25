#!/usr/bin/env node
/**
 * build-miniprogram.js
 * 将 chapters/*.html 教程内容转换为微信小程序分包数据（rich-text 友好的 HTML 片段 JSON），
 * 并拆分题库 quiz-bank.json 到对应分包。
 *
 * 运行：NODE_PATH=<workspace>/node_modules node tools/build-miniprogram.js
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.join(ROOT, 'chapters');
const QUIZ_FILE = path.join(ROOT, 'data', 'quiz-bank.json');
const MP_DIR = path.join(ROOT, 'miniprogram');
const PKG_DIR = path.join(MP_DIR, 'packages');

// 教程顺序（与 js/main.js 权威章序一致：第0章 ~ 第28章）
const ORDERED_FILES = [
  'ch00-fundamentals', 'ch01-llm-basics', 'ch02-what-is-agent', 'ch03-weather-agent',
  'ch04-prompt-engineering', 'ch04b-context-engineering', 'ch04-react-pattern', 'ch05-memory',
  'ch06-brain-intent-router', 'ch21-loop-runtime-sandbox', 'ch22-harness', 'ch27-dsh-java-anatomy', 'ch16-rag',
  'ch26-llm-wiki', 'ch06-tools', 'ch07-mcp', 'ch08-skills',
  'ch09-cli-capability', 'ch10-multi-agent', 'ch11-langgraph', 'ch12-framework-comparison',
  'ch13-dify-coze', 'ch14-cli-agent', 'ch15-gui-agent', 'ch17-evaluation',
  'ch18-security', 'ch19-deployment', 'ch20-inference-framework', 'ch24-jev-decision-model', 'ch23-future-summary',
];

// 分包划分：每包约 7 章
const SUBPACKAGES = [
  { name: 'content-a', files: ORDERED_FILES.slice(0, 7) },
  { name: 'content-b', files: ORDERED_FILES.slice(7, 14) },
  { name: 'content-c', files: ORDERED_FILES.slice(14, 21) },
  { name: 'content-d', files: ORDERED_FILES.slice(21) },
];

// 章节 slug -> quiz-bank.json 题库 key 的显式映射。
// 注意：quiz-bank 的 key 是历史编号，与章节显示序号（第N章）不一致，
// 必须按题目内容归属显式指定；缺省回退为 ch{显示章号}。
const QUIZ_KEY_BY_SLUG = {
  'ch00-fundamentals': 'ch00',
  'ch01-llm-basics': 'ch01',
  'ch02-what-is-agent': 'ch02',
  'ch03-weather-agent': 'ch03',
  'ch04-prompt-engineering': 'ch04',
  'ch04b-context-engineering': 'ch26',   // 第5章 上下文工程
  'ch04-react-pattern': 'ch05',          // 第6章 ReAct
  'ch05-memory': 'ch06',                 // 第7章 记忆
  'ch06-brain-intent-router': 'ch07',    // 第8章 意图
  'ch21-loop-runtime-sandbox': 'ch08',   // 第9章 运行时
  'ch22-harness': 'ch09',                // 第10章 Harness
  'ch06-tools': 'ch10',                  // 第13章 Function Calling
  'ch07-mcp': 'ch11',                    // 第14章 MCP
  'ch08-skills': 'ch12',                 // 第15章 Skills
  'ch09-cli-capability': 'ch13',         // 第16章 CLI 能力
  'ch10-multi-agent': 'ch14',            // 第17章 多 Agent
  'ch11-langgraph': 'ch15',              // 第18章 LangGraph
  'ch12-framework-comparison': 'ch16',   // 第19章 框架对比
  'ch13-dify-coze': 'ch17',              // 第20章 Dify/Coze
  'ch14-cli-agent': 'ch18',              // 第21章 CLI Agent
  'ch15-gui-agent': 'ch19',              // 第22章 GUI
  'ch16-rag': 'ch20',                    // 第11章 RAG
  'ch17-evaluation': 'ch21',             // 第23章 评估
  'ch18-security': 'ch22',               // 第24章 安全
  'ch19-deployment': 'ch23',             // 第25章 部署
  'ch20-inference-framework': 'ch24',    // 第26章 推理框架
  'ch23-future-summary': 'ch25',         // 第28章 展望
  'ch26-llm-wiki': 'ch27',               // 第12章 LLM-Wiki
  'ch24-jev-decision-model': 'ch28',     // 第27章 Jev 决策模型
  'ch27-dsh-java-anatomy': 'ch29',       // 第11章 工业级 Harness 解剖（DSH Java）
};

/* ---------------- 工具函数 ---------------- */

function extractJsonConfig(scriptText, fnName) {
  // 从 <script>fnName('xx', { ... });</script> 中提取第二个参数的对象字面量。
  // 注意 1：源码是 JS 对象字面量（key 无引号、可能有尾逗号/注释），不能直接 JSON.parse。
  // 注意 2：可能存在 `typeof X !== 'undefined' && X.render` 这样的前置引用，
  //          必须匹配「X.render('id'」形式（带左括号），否则会误命中 if 块的花括号。
  const callPattern = new RegExp(fnName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\s*\\(\\s*['\"]");
  const m = scriptText.match(callPattern);
  if (!m) return null;
  const braceStart = scriptText.indexOf('{', m.index);
  if (braceStart === -1) return null;
  let depth = 0, inStr = false, quote = '';
  let end = -1;
  for (let i = braceStart; i < scriptText.length; i++) {
    const ch = scriptText[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === quote) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; quote = ch; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end === -1) return null;
  const raw = scriptText.slice(braceStart, end);
  try { return JSON.parse(raw); } catch (_) { /* fallthrough */ }
  // JS → JSON 归一化（逐字符状态机）
  let json = '';
  try {
    json = jsLiteralToJson(raw);
  } catch (e) {
    return null;
  }
  try { return JSON.parse(json); } catch (e) { return null; }
}

// 逐字符 JS 对象字面量 → JSON：key 加引号、单引号串转双引号、去尾逗号
function jsLiteralToJson(src) {
  let out = '';
  let i = 0;
  const n = src.length;
  let prevMeaningful = '';  // 上一个有意义的输出字符（用于判断 { 或 , 后是 key）
  while (i < n) {
    const ch = src[i];
    // 字符串（单/双引号）
    if (ch === '"' || ch === "'") {
      let j = i + 1, str = '';
      while (j < n) {
        if (src[j] === '\\') { str += src[j] + src[j + 1]; j += 2; continue; }
        if (src[j] === ch) break;
        str += src[j]; j++;
      }
      // 转义并输出为 JSON 字符串
      out += '"' + str.replace(/"/g, '\\"') + '"';
      i = j + 1;
      prevMeaningful = '"';
      continue;
    }
    // 注释
    if (ch === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (ch === '/' && src[i + 1] === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
    // key 判断：处于 { 或 , 之后遇到的标识符
    if (/[A-Za-z_$]/.test(ch) && (prevMeaningful === '{' || prevMeaningful === ',')) {
      // 向后看是否是 key（后面跟 : 而非 ( )
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(src[j])) j++;
      let k = j;
      while (k < n && /\s/.test(src[k])) k++;
      if (src[k] === ':') {
        out += '"' + src.slice(i, j) + '":';
        i = k + 1;              // 连冒号一起消费，避免下一轮重复输出 ':'
        prevMeaningful = ':';
        continue;
      }
      // 不是 key，普通标识符原样输出
      out += src.slice(i, j);
      prevMeaningful = src[j - 1];
      i = j;
      continue;
    }
    // 尾逗号：, 后（跳过空白与注释）紧跟 } 或 ]
    if (ch === ',') {
      let k = i + 1;
      while (k < n) {
        if (/\s/.test(src[k])) { k++; continue; }
        if (src[k] === '/' && src[k + 1] === '/') { while (k < n && src[k] !== '\n') k++; continue; }
        if (src[k] === '/' && src[k + 1] === '*') { k += 2; while (k < n && !(src[k] === '*' && src[k + 1] === '/')) k++; k += 2; continue; }
        break;
      }
      if (src[k] === '}' || src[k] === ']') { i++; continue; } // 跳过尾逗号
    }
    out += ch;
    if (!/\s/.test(ch)) prevMeaningful = ch;
    i++;
  }
  return out;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ---------------- 构建期语法高亮 ----------------
 * 已改为纯文本行切分的高亮（行首加 "> " 前缀着色标记，阅读页 nd-code-line 渲染）。
 * 不再输出 span token：节点树模式下代码是 scroll-view 里的纯文本，
 * 行级着色即可满足可读性，且避免 token 标签破坏节点结构。
 */

// 关键字集合（按语言家族粗分：通用 / Python / JS/TS / Shell / JSON）
const KW_COMMON = new Set(['if', 'else', 'elif', 'for', 'while', 'return', 'break', 'continue', 'def', 'class', 'import', 'from', 'as', 'with', 'try', 'except', 'finally', 'raise', 'yield', 'lambda', 'pass', 'in', 'is', 'not', 'and', 'or', 'None', 'True', 'False', 'await', 'async', 'global', 'nonlocal', 'assert', 'del']);
const KW_JS = new Set(['const', 'let', 'var', 'function', 'new', 'this', 'typeof', 'instanceof', 'extends', 'super', 'export', 'default', 'null', 'undefined', 'true', 'false', 'switch', 'case', 'do', 'throw', 'catch', 'static', 'get', 'set', 'of', 'delete', 'void']);
// Go / Java 家族（按 token 出现频率合并一个集合即可，关键字交集安全）
const KW_GO_JAVA = new Set(['func', 'package', 'defer', 'chan', 'go', 'range', 'map', 'struct', 'interface', 'select', 'fallthrough', 'var', 'string', 'int', 'int64', 'float64', 'bool', 'byte', 'error', 'public', 'private', 'protected', 'void', 'final', 'extends', 'implements', 'package', 'interface', 'throws', 'synchronized', 'volatile', 'boolean', 'double', 'float', 'long', 'short', 'char', 'byte', 'String', 'Integer', 'List', 'Map', 'ArrayList', 'HashMap']);
const KW_SHELL = new Set(['export', 'echo', 'cd', 'pip', 'npm', 'npx', 'node', 'python', 'python3', 'git', 'curl', 'source', 'sudo', 'apt', 'brew', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'docker', 'kubectl', 'uv', 'which', 'set']);

function highlightCode(code, langHint) {
  const lang = (langHint || '').toLowerCase();
  const isJsLike = /js|ts|javascript|typescript/.test(lang);
  const isGoJava = /go|golang|java|kotlin|c#|cs|cpp|c\+\+|rust/.test(lang);
  const isShell = /sh|shell|bash|zsh|console|terminal/.test(lang) || !langHint;
  const isJson = /json/.test(lang);

  const out = [];
  let i = 0;
  const n = code.length;
  while (i < n) {
    const ch = code[i];
    // 注释
    if (ch === '#') { // Python/Shell 行注释
      let j = i; while (j < n && code[j] !== '\n') j++;
      out.push(`<span class="tok-c">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    if (ch === '/' && code[i + 1] === '/') {
      // URL 协议头（http:// https:// ws:// file://）不算注释
      const prev = code.slice(Math.max(0, i - 8), i);
      if (/https?:$|wss?:$|file:$/.test(prev)) {
        out.push(escapeHtml('//')); i += 2; continue;
      }
      let j = i; while (j < n && code[j] !== '\n') j++;
      out.push(`<span class="tok-c">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      let j = i + 2; while (j < n && !(code[j] === '*' && code[j + 1] === '/')) j++;
      j = Math.min(j + 2, n);
      out.push(`<span class="tok-c">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // Python 三引号字符串（""" 或 '''），避免被切成三段高亮碎片
    if ((ch === '"' || ch === "'") && code[i + 1] === ch && code[i + 2] === ch) {
      let j = i + 3;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === ch && code[j + 1] === ch && code[j + 2] === ch) { j += 3; break; }
        j++;
      }
      out.push(`<span class="tok-s">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // 装饰器 @xxx（Python）
    if (ch === '@' && /[A-Za-z_]/.test(code[i + 1] || '')) {
      let j = i + 1; while (j < n && /[A-Za-z0-9_.]/.test(code[j])) j++;
      out.push(`<span class="tok-t">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // Shell 变量 $VAR / ${VAR}
    if (ch === '$' && (/[A-Za-z_{]/.test(code[i + 1] || ''))) {
      let j = i + 1;
      if (code[j] === '{') { j++; while (j < n && code[j] !== '}') j++; j++; }
      else while (j < n && /[A-Za-z0-9_]/.test(code[j])) j++;
      out.push(`<span class="tok-t">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // 字符串（含模板串、三引号）
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === ch) { j++; break; }
        if (code[j] === '\n' && ch !== '`') break; // 未闭合按行断（容错）
        j++;
      }
      // Shell 里 '-d '{...}' 整段 JSON 包在单引号里：起始后紧跟 { 时跨行吃引号体
      if (/sh|shell|bash|zsh|console/.test(lang) && ch === "'" && code[i + 1] === '{') {
        const close = code.indexOf("'", i + 1);
        j = close === -1 ? n : close + 1;
      }
      out.push(`<span class="tok-s">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // 数字
    if (/[0-9]/.test(ch) && !/[A-Za-z_]/.test(code[i - 1] || '')) {
      let j = i; while (j < n && /[0-9._xXbBeE+-]/.test(code[j])) {
        // 防止把 1e+5 之后的 + 吃太多：遇 e/E 后的 +/- 只允许一次
        if (/[+-]/.test(code[j]) && !/[eE]/.test(code[j - 1])) break;
        j++;
      }
      out.push(`<span class="tok-n">${escapeHtml(code.slice(i, j))}</span>`); i = j; continue;
    }
    // 标识符/关键字
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i; while (j < n && /[A-Za-z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      // 后面紧跟 ( → 函数名
      let k = j; while (k < n && /\s/.test(code[k])) k++;
      let cls = null;
      if (KW_COMMON.has(word) || (isJsLike && KW_JS.has(word)) || (isGoJava && KW_GO_JAVA.has(word)) || (isShell && KW_SHELL.has(word))) cls = 'tok-k';
      else if (code[k] === '(') cls = 'tok-f';
      else if (/^[A-Z][A-Za-z0-9_]*$/.test(word) && !isJson) cls = 'tok-t'; // 类名/类型
      if (isJson && code[k] === ':') cls = 'tok-t';           // JSON key
      if (cls) out.push(`<span class="${cls}">${escapeHtml(word)}</span>`);
      else out.push(escapeHtml(word));
      i = j; continue;
    }
    // JSON key（"xxx": 模式已作为字符串着色，够用）
    out.push(escapeHtml(ch));
    i++;
  }
  return out.join('');
}

/* ---------------- 动画块转换 ---------------- */

// compare-animation → 静态双栏卡片节点
function convertCompare($, el) {
  const sides = [];
  $(el).find('.compare-side').each((_, side) => {
    const label = $(side).find('.side-label').first().text().trim();
    const lines = [];
    $(side).find('.highlight-line').each((__, ln) => lines.push(cleanText($(ln).text())));
    sides.push({ label, lines });
  });
  return { type: 'compare', sides };
}

// 把「节点对象」序列化成带 mp- 前缀 class 的占位 DOM，方便 replaceWith 后由渲染器识别。
// 渲染器遇到 mp-json 类会把 data-json 里的节点还原出来。用 html 实体编码存 JSON。
function nodeToPlaceholder(node) {
  const json = JSON.stringify(node).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<div class="mp-json" data-json="${json}"></div>`;
}

// flowchart-container → 移动端友好的竖向流程卡（从内联脚本提取节点/边）
// 结构：<div class="mp-flow"><div class="mp-flow-card mp-flow-start">…</div><div class="mp-flow-link">标签 ↓</div>…</div>
function convertFlowchart($, el, scriptAll) {
  const id = $(el).attr('id') || '';
  // 优先级 1：data-flowchart 内联 JSON 属性（部分章节用此方式）
  const dataAttr = $(el).attr('data-flowchart');
  let cfg = null;
  if (dataAttr) {
    try { cfg = JSON.parse(dataAttr); } catch (_) { cfg = null; }
  }
  // 优先级 2：内联脚本中的 FlowChart.render 调用
  if (!cfg) {
    scriptAll.each((_, s) => {
      if (cfg) return;
      const text = $(s).html() || '';
      if (text.includes(`FlowChart.render('${id}'`) || text.includes(`FlowChart.render("${id}"`)) {
        cfg = extractJsonConfig(text, 'FlowChart.render');
      }
    });
  }
  // 优先级 3：脚本以 container.innerHTML = `...` 自绘（无 nodes/edges 配置）
  // → 提取模板中的 <h3>/<strong> 标题 + 相邻 <p> 描述，转为步骤信息卡
  if (!cfg) {
    let injected = null;
    scriptAll.each((_, s) => {
      if (injected) return;
      const text = $(s).html() || '';
      if (id && text.includes(`'${id}'`)) {
        const m = text.match(/innerHTML\s*=\s*`([\s\S]*?)`;/);
        if (m) injected = m[1];
      }
    });
    if (injected) {
      const cards = [];
      const re = /<(?:h\d|strong)[^>]*>([\s\S]*?)<\/(?:h\d|strong)>(?:\s*<p[^>]*>([\s\S]*?)<\/p>)?/g;
      let mm;
      while ((mm = re.exec(injected)) !== null) {
        const t = mm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const d = mm[2] ? mm[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
        if (t) cards.push({ title: t, desc: d });
      }
      if (cards.length) {
        return { type: 'steps', items: cards.map((c, i) => ({ num: i + 1, title: c.title, desc: c.desc })) };
      }
    }
  }
  if (cfg && Array.isArray(cfg.nodes) && cfg.nodes.length) {
    const edgeLabel = (from, to) => {
      if (!Array.isArray(cfg.edges)) return '';
      const e = cfg.edges.find(x => x.from === from && x.to === to);
      return e && e.label ? e.label : '';
    };
    // 主链：按 nodes 顺序渲染；若某边在 edges 里不存在（分叉/汇聚），尝试沿 edges 走主链
    let chain = cfg.nodes.map(n => n.id);
    if (Array.isArray(cfg.edges) && cfg.edges.length) {
      // 从 start 节点开始沿边连通的主路径
      const byId = {}; cfg.nodes.forEach(n => { byId[n.id] = n; });
      const startNode = cfg.nodes.find(n => n.type === 'start') || cfg.nodes[0];
      const outEdges = id2 => cfg.edges.filter(e => e.from === id2);
      const walked = [startNode.id];
      let cur = startNode.id;
      while (walked.length < cfg.nodes.length) {
        const outs = outEdges(cur);
        if (!outs.length) break;
        // 优先选未走过的、带 label 的主边
        const next = outs.find(e => !walked.includes(e.to) && byId[e.to]) ||
                     outs.find(e => !walked.includes(e.to) && byId[e.to] === undefined ? false : outs.indexOf(e) >= 0 && !walked.includes(e.to) && byId[e.to]);
        if (!next || !byId[next.to]) break;
        walked.push(next.to);
        cur = next.to;
      }
      if (walked.length > 1) chain = walked;
    }
    const nodesById = {}; cfg.nodes.forEach(n => { nodesById[n.id] = n; });
    // 未上主链的节点追加在末尾（分叉旁路），保证信息不丢失
    const chainSet = new Set(chain);
    const rest = cfg.nodes.filter(n => !chainSet.has(n.id));

    const steps = [];
    chain.forEach((nid, i) => {
      const n = nodesById[nid];
      if (!n) return;
      const lbl = i > 0 ? edgeLabel(chain[i - 1], nid) : '';
      const label = String(n.label || '').split('\n').map(s => s.trim()).filter(Boolean).join(' / ');
      steps.push({ kind: String(n.type || 'process'), label, edge: lbl, branch: false });
    });
    rest.forEach(n => {
      const label = String(n.label || '').split('\n').map(s => s.trim()).filter(Boolean).join(' / ');
      steps.push({ kind: String(n.type || 'process'), label, edge: '', branch: true });
    });
    return { type: 'flow', steps };
  }
  return { type: 'note', text: '📌 此处原文为可交互动画流程图，完整动画请访问网页版。' };
}

// step-animation → 静态步骤列表（提取顺序：DOM 兜底 → steps 数组配置）
function convertStep($, el, scriptAll) {
  const id = $(el).attr('id') || '';
  // 兜底 1：DOM 内已有完整步骤内容（step-number/step-title/step-desc）
  const domSteps = [];
  $(el).find('.step-content').each((_, c) => {
    const num = $(c).find('.step-number').first().text().trim();
    const title = $(c).find('.step-title').first().text().trim();
    const desc = $(c).find('.step-desc').first().text().trim();
    if (title || desc) domSteps.push({ title: (num ? num + '. ' : '') + title, desc });
  });
  // 兜底 2：从脚本提取 steps 数组（各种命名：xxx.steps / StepAnimation.render）
  let steps = null;
  scriptAll.each((_, s) => {
    if (steps) return;
    const text = $(s).html() || '';
    if (!id || !text.includes(id)) return;
    // 匹配 steps: [ ... ] 数组字面量（含 num/title/desc 字段）
    const m = text.match(/steps\s*:\s*\[/);
    if (m) {
      const arrStart = text.indexOf('[', m.index);
      let depth = 0, inStr = false, quote = '', end = -1;
      for (let i = arrStart; i < text.length; i++) {
        const ch = text[i];
        if (inStr) { if (ch === '\\') { i++; continue; } if (ch === quote) inStr = false; continue; }
        if (ch === '"' || ch === "'") { inStr = true; quote = ch; continue; }
        if (ch === '{' || ch === '[') depth++;
        else if (ch === '}' || ch === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
      }
      if (end !== -1) {
        try {
          const arr = JSON.parse(jsLiteralToJson(text.slice(arrStart, end)));
          if (Array.isArray(arr) && arr.length) steps = arr;
        } catch (_) {}
      }
    }
    if (!steps) {
      const cfg = extractJsonConfig(text, 'StepAnimation.render') || extractJsonConfig(text, 'render');
      if (cfg && Array.isArray(cfg.steps) && cfg.steps.length) steps = cfg.steps;
    }
  });
  if (!steps && domSteps.length) steps = domSteps;
  if (!steps) {
    const num = $(el).find('.step-number').first().text().trim();
    const title = $(el).find('.step-title').first().text().trim();
    const desc = $(el).find('.step-desc').first().text().trim();
    if (title) steps = [{ title, desc }];
  }
  if (!steps || !steps.length) {
    return { type: 'note', text: '📌 此处原文为可交互动画演示，完整动画请访问网页版。' };
  }
  return {
    type: 'steps',
    items: steps.map((st, i) => ({ num: st.num || i + 1, title: st.title || '', desc: st.desc || '' })),
  };
}

/* ---------------- 主体转换 ----------------
 * 说明：老实现只遍历 body 的「顶层」节点，凡是被容器包住的块（.comparison-table 里的表格、
 * .summary-box/.qa-item 里的问答、.multi-lang 里的代码）都会被「拍平」成一段纯文本，
 * 于是小程序里表格/代码就「渲染不出来」。这里改成递归渲染：块级元素按类型转成
 * mp-* 结构，行内内容按 inline/block 混排算法聚合为 <p>。
 */

const BLOCK_TAGS = new Set(['div', 'section', 'article', 'header', 'footer', 'main', 'aside', 'nav',
  'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'table', 'thead', 'tbody',
  'tfoot', 'tr', 'td', 'th', 'blockquote', 'figure', 'figcaption', 'hr', 'dl', 'dt', 'dd',
  'caption', 'colgroup', 'col', 'form', 'iframe']);
const INLINE_TAGS = new Set(['strong', 'em', 'code', 'span', 'a', 'b', 'i', 'mark', 'sub', 'sup',
  'br', 'small', 'u', 'del', 'ins', 's', 'q', 'abbr', 'label', 'font', 'tt', 'big', 'cite']);

// 网页版专有的装饰/交互节点，整块丢弃
const DROP_SELECTOR = 'script, style, link, meta, noscript, iframe, button, input, form, svg, video, audio,'
  + ' .step-controls, .quiz-container, .quiz-options, .nav-buttons, .lang-tabs, .toc, .code-header,'
  + ' .reader-nav, .page-nav, .chapter-nav, .quiz-area, .quiz-block';

// 卡片型容器（浅底壳 + 标题）
const CARD_RE = /(^|[-\s])(card|box|banner|panel|callout|qa-item|item)([-\s]|$)/;
// 代码块容器
const CODE_RE = /code-block|multi-lang|lang-pane/;
// 导航/工具条等纯装饰容器
const DROP_BOX_RE = /(^|[-\s])(nav|navbar|footer|toolbar|breadcrumb|pagination|tabs|progress)([-\s]|$)/;
// QA 问句行
const QA_Q_RE = /(^|[-\s])(qa-question|qa-q)([-\s]|$)/;
// 引用
const QUOTE_RE = /(^|[-\s])(quote|blockquote)([-\s]|$)/;
// 卡片标题选择器（banner-title：info/tip/warning-banner 的标题行）
const CARD_TITLE_SEL = '.card-title, .info-card-title, .summary-title, .box-title, .panel-title, .banner-title';
// banner 类型 → 提示卡配色（info/tip/warning-banner）
const BANNER_ACCENT = { 'info-banner': 'mp-accent-info', 'tip-banner': 'mp-accent-success', 'warning-banner': 'mp-accent-warning' };
// 网页版卡片左侧色条 var(--color-xxx) → 小程序强调色类
const ACCENT_MAP = {
  success: 'mp-accent-success', warning: 'mp-accent-warning', error: 'mp-accent-error',
  danger: 'mp-accent-error', info: 'mp-accent-info', accent: 'mp-accent-accent',
  primary: 'mp-accent-accent',
};

// 清洗行内片段：去掉行内样式/事件，解包不认识的自定义标签（纯文本化前的预处理）
function sanitizeFragment($, html) {
  if (!html) return '';
  const $frag = cheerio.load('<div id="__frag__"></div>', { decodeEntities: false });
  const $root = $frag('#__frag__');
  $root.html(html);
  $root.find('*').each((_, n) => {
    if (n.type !== 'tag') return;
    const $n = $frag(n);
    $n.removeAttr('style');
    $n.removeAttr('id');
    Object.keys(n.attribs || {}).forEach(a => {
      if (/^on/i.test(a) || /^data-/i.test(a)) $n.removeAttr(a);
    });
    if (!BLOCK_TAGS.has(n.tagName) && !INLINE_TAGS.has(n.tagName)) $n.replaceWith($n.contents());
  });
  return $root.html().trim();
}

// 取元素的纯文本（多空白归一化）。节点树模式下正文都是纯文本 view。
function cleanText(s) {
  return String(s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

function textOnly(html) {
  return String(html || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

// 表格：清掉网页版行内样式（含 var(--color-*) 变量，小程序里无效），统一挂 mp-table
function normalizeTables($) {
  $('table').each((_, t) => {
    const $t = $(t);
    $t.find('*').each((__, c) => {
      if (c.type !== 'tag') return;
      $(c).removeAttr('style');
      $(c).removeAttr('class');
    });
    $t.removeAttr('style').attr('class', 'mp-table');
  });
}

// 代码块 → 节点 { type:'code', lang, code }：正文是 scroll-view 里的纯文本 view，
// 不再依赖 rich-text 的 catchtouchmove（那会把整个页面竖滑也吃掉）。
// 兼容 code-block（.code-lang-pane）与 multi-lang（.lang-pane + .lang-tabs）两种标记，
// 取当前语言的 pane（没有 active 就取第一个）。
function codeBlockNode($, el) {
  const panes = el.find('.code-lang-pane, .lang-pane');
  let target = null;
  if (panes.length) {
    target = panes.filter('.active').first();
    if (!target.length) target = panes.first();
  }
  let code = '', langHint = '', label = '';
  if (target) {
    const pre = target.find('pre').first();
    code = pre.length ? pre.text() : target.text();
    langHint = target.attr('data-lang') || '';
    label = target.attr('data-label') || langHint || '';
  } else {
    const pre = el.find('pre').first();
    code = pre.length ? pre.text() : el.text();
    label = el.find('.code-label').first().text().trim();
    const codeEl = (pre.length ? pre : el).find('code').first();
    const cls = codeEl.attr('class') || '';
    langHint = (/language-([\w+#-]+)/.exec(cls) || /lang-([\w+#-]+)/.exec(cls) || [])[1] || '';
    if (!langHint && label) {
      const lm = /^(python|shell|bash|typescript|javascript|go|java|json|yaml|markdown|prompt|modelfile|dockerfile)/i.exec(label);
      if (lm) langHint = lm[1];
    }
  }
  if (!label) label = langHint;
  // 保留原始换行（scroll-view 里 white-space:pre 渲染），只去掉首尾空行
  code = String(code).replace(/^\n+/, '').replace(/\n+$/, '');
  return { type: 'code', lang: label || '', code };
}

// 表格 → 节点 { type:'table', rows:[{head, cells:[..]}] }
function tableNode($, el) {
  const rows = [];
  el.find('tr').each((_, tr) => {
    const $tr = $(tr);
    const head = $tr.find('th').length > 0;
    const cells = [];
    $tr.find('th, td').each((__, c) => cells.push(cleanText($(c).text())));
    if (cells.length) rows.push({ head, cells });
  });
  return rows.length ? { type: 'table', rows } : null;
}

// 行内/块级混排：连续的行内内容聚合为一个段落节点，遇到块级元素先冲刷缓冲区。
// out 是「节点数组」（不再是 HTML 字符串），阅读页用 WXML 递归渲染。
function renderFlow($, container, out, toc) {
  let buf = '';
  const flush = () => {
    const html = sanitizeFragment($, buf);
    const t = textOnly(html);
    if (t) out.push({ type: 'p', text: cleanText(t) });
    buf = '';
  };
  $(container).contents().each((_, n) => {
    if (n.type === 'comment') return;
    if (n.type === 'text') { buf += escapeHtml(n.data || ''); return; }
    if (n.type !== 'tag') return;
    if (BLOCK_TAGS.has(n.tagName) || /^mp-/.test($(n).attr('class') || '')) {
      flush();
      renderNode($, n, out, toc);
      return;
    }
    buf += $.html(n);
  });
  flush();
  return out;
}

function renderContainer($, el, cls, out, toc) {
  if (DROP_BOX_RE.test(cls)) return;                       // 装饰容器整块丢弃
  if (CODE_RE.test(cls)) { out.push(codeBlockNode($, el)); return; }

  if (QA_Q_RE.test(cls)) {                                 // 问答：问句行
    const t = cleanText(textOnly(sanitizeFragment($, el.html())));
    if (t) out.push({ type: 'qaq', text: t });
    return;
  }

  if (/\bchat-line\b/.test(cls)) {                         // 对话模拟行：标签胶囊 + 正文气泡
    const $label = el.find('.chat-label').first();
    const label = $label.length ? cleanText($label.text()) : '';
    if ($label.length) $label.remove();
    const children = renderFlow($, el, [], toc);
    if (!children.length && !label) return;
    // 类型色：thought 思考/observe 观察/action 行动/reply 回答/user 用户
    let tone = 'chat-user';
    if (/chat-thought/.test(cls)) tone = 'chat-thought';
    else if (/chat-observe/.test(cls)) tone = 'chat-observe';
    else if (/chat-action/.test(cls)) tone = 'chat-action';
    else if (/chat-reply/.test(cls)) tone = 'chat-reply';
    else if (/chat-user/.test(cls)) tone = 'chat-user';
    out.push({ type: 'chat', tone, label, children });
    return;
  }

  if (CARD_RE.test(cls)) {                                 // 卡片：浅底壳 + 标题 + 递归内容
    const $title = el.find(CARD_TITLE_SEL).first();
    const title = $title.length ? cleanText($title.text()) : '';
    const accentKey = ((el.attr('style') || '').match(/--color-([a-z]+)/) || [])[1] || '';
    const accent = BANNER_ACCENT[cls.trim()] || ACCENT_MAP[accentKey] || '';
    if ($title.length) $title.remove();
    const children = renderFlow($, el, [], toc);
    if (!children.length && !title) return;
    // accent 映射为节点修饰类（mp-accent-* → 保留给 wxss 配色用）
    out.push({ type: 'card', title, accent, children, qa: /qa-item/.test(cls) });
    return;
  }

  renderFlow($, el, out, toc);                             // 其他容器：透明向下递归
}

function renderNode($, node, out, toc) {
  const el = $(node);
  const tag = node.tagName;
  const cls = el.attr('class') || '';

  // 动画块转换期埋下的占位节点：还原 data-json 里的节点对象
  if (/^mp-json/.test(cls)) {
    try {
      const json = (el.attr('data-json') || '').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      const n = JSON.parse(json);
      if (n && n.type) out.push(n);
    } catch (_) {}
    return;
  }

  if (tag === 'h1') {
    const t = cleanText(textOnly(sanitizeFragment($, el.html())));
    if (t) out.push({ type: 'h1', text: t });
    return;
  }
  if (/^h[2-6]$/.test(tag)) {
    const t = cleanText(textOnly(sanitizeFragment($, el.html())));
    if (!t) return;
    const level = +tag[1];
    // h2/h3 纳入章节目录：锚点是真实节点 id，阅读页目录点击可 scroll 定位
    if (toc && (tag === 'h2' || tag === 'h3')) {
      const anchor = 'h-' + toc.length;
      toc.push({ level, text: t, anchor });
      out.push({ type: 'h', level, text: t, anchor });
      return;
    }
    out.push({ type: 'h', level, text: t, anchor: '' });
    return;
  }
  if (tag === 'p') {
    const t = cleanText(textOnly(sanitizeFragment($, el.html())));
    if (!t) return;
    out.push({ type: 'p', text: t, sub: /chapter-subtitle/.test(cls) });
    return;
  }
  if (tag === 'pre') { out.push(codeBlockNode($, el)); return; }
  if (tag === 'table') { const tn = tableNode($, el); if (tn) out.push(tn); return; }
  if (tag === 'ul' || tag === 'ol') {
    const items = [];
    el.children('li').each((_, li) => {
      const t = cleanText(textOnly(sanitizeFragment($, $(li).html())));
      if (t) items.push({ text: t });
    });
    if (items.length) out.push({ type: 'list', ordered: tag === 'ol', items });
    return;
  }
  if (tag === 'blockquote' || QUOTE_RE.test(cls)) {
    const inner = renderFlow($, el, [], toc);
    const text = cleanText(inner.map(n => n.text || '').filter(Boolean).join(' '));
    if (text) out.push({ type: 'quote', text });
    return;
  }
  if (tag === 'hr' || tag === 'img' || tag === 'tr' || tag === 'td' || tag === 'th') return;
  if (BLOCK_TAGS.has(tag)) { renderContainer($, el, cls, out, toc); return; }

  const t = cleanText(textOnly(sanitizeFragment($, $.html(el))));
  if (t) out.push({ type: 'p', text: t });
}

/* ---------------- 主体转换 ---------------- */

function convertChapterHtml(rawHtml) {
  const $ = cheerio.load(rawHtml, { decodeEntities: false });

  const title = $('h1.chapter-title').first().text().trim();
  const subtitle = $('p.chapter-subtitle').first().text().trim();

  // 章节头已由阅读页 reader-head 卡片统一渲染（含章节序号 chip / 标题 / 副标题），
  // 这里把正文里的重复 h1.chapter-title / p.chapter-subtitle 摘掉，避免上下两处展示同一标题。
  $('h1.chapter-title').first().remove();
  $('p.chapter-subtitle').first().remove();

  // 先处理动画类容器（需要读取 script 配置），转成 mp-json 占位节点
  const scriptAll = $('script');
  $('div.compare-animation').each((_, el) => $(el).replaceWith(nodeToPlaceholder(convertCompare($, el))));
  $('div.flowchart-container').each((_, el) => $(el).replaceWith(nodeToPlaceholder(convertFlowchart($, el, scriptAll))));
  $('div.step-animation').each((_, el) => $(el).replaceWith(nodeToPlaceholder(convertStep($, el, scriptAll))));
  // 兜底：容器内含 innerHTML 自绘内容（脚本以 container.innerHTML = `...` 注入）
  // 此时脚本移除后容器是空的 → 从脚本提取 innerHTML 模板中的标题/描述对，转为信息卡组
  $('div.flowchart-container:empty').each((_, el) => {
    const id = $(el).attr('id') || '';
    let injected = null;
    scriptAll.each((_, s) => {
      if (injected) return;
      const text = $(s).html() || '';
      if (id && text.includes(`'${id}'`)) {
        const m = text.match(/innerHTML\s*=\s*`([\s\S]*?)`;/);
        if (m) injected = m[1];
      }
    });
    if (!injected) return;
    // 提取 <h3>/<strong> 标题 + 相邻 <p> 描述
    const cards = [];
    const re = /<(?:h\d|strong)[^>]*>([\s\S]*?)<\/(?:h\d|strong)>\s*(?:<p[^>]*>([\s\S]*?)<\/p>)?/g;
    let mm;
    while ((mm = re.exec(injected)) !== null) {
      const t = mm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const d = mm[2] ? mm[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
      if (t) cards.push({ title: t, desc: d });
    }
    if (cards.length) {
      $(el).replaceWith(nodeToPlaceholder({
        type: 'steps',
        items: cards.map((c, i) => ({ num: i + 1, title: c.title, desc: c.desc })),
      }));
    }
  });

  // 移除网页版专有的装饰/交互节点
  $(DROP_SELECTOR).remove();

  // 表格全局规整：顶层、卡片内、comparison-table 内都要走一遍（清行内样式）
  normalizeTables($);

  const nodes = [];
  const toc = [];          // 章节目录：{ level, text, anchor }，阅读页目录抽屉用
  renderFlow($, $('body'), nodes, toc);

  // 语音朗读：为可朗读段落分配 tts 索引（阅读页按索引收集文本/定位）
  assignTts(nodes);

  return { title, subtitle, nodes, toc };
}

/**
 * 为可朗读段落分配 tts 序号（替代原 injectTtsSpans 的 data-tts-idx 属性注入）。
 * 目标：p / quote / list 的项 / 标题 h，跳过代码块与表格。
 */
function assignTts(nodes) {
  let idx = 0;
  const visit = (list) => {
    list.forEach(n => {
      if (!n || !n.type) return;
      if (n.type === 'p' || n.type === 'quote' || n.type === 'qaq' || n.type === 'h') {
        if (n.text && n.text.length >= 2) n.tts = idx++;
      } else if (n.type === 'list') {
        (n.items || []).forEach(li => { if (li.text && li.text.length >= 2) li.tts = idx++; });
      } else if (n.children) {
        visit(n.children);
      }
    });
  };
  visit(nodes);
}

/**
 * 把节点树展平成朗读段落数组 [{idx, text}]（供阅读页 _collectSegments 直接用）。
 * 顺序与 assignTts 一致。
 */
function flattenTts(nodes, out) {
  out = out || [];
  nodes.forEach(n => {
    if (!n || !n.type) return;
    if (n.tts !== undefined && n.tts !== null && n.text) out.push({ idx: n.tts, text: n.text });
    if (n.type === 'list') (n.items || []).forEach(li => {
      if (li.tts !== undefined && li.tts !== null && li.text) out.push({ idx: li.tts, text: li.text });
    });
    if (n.children) flattenTts(n.children, out);
  });
  return out;
}

/* ---------------- 执行 ---------------- */

function main() {
  if (fs.existsSync(PKG_DIR)) fs.rmSync(PKG_DIR, { recursive: true });
  fs.mkdirSync(PKG_DIR, { recursive: true });
  fs.mkdirSync(path.join(MP_DIR, 'data'), { recursive: true });

  const registry = [];       // 主包章节注册表
  const subpkgPages = [];    // app.json subpackages 配置
  const stats = [];

  SUBPACKAGES.forEach((pkg, pi) => {
    const pkgRoot = path.join(PKG_DIR, pkg.name);
    const dataDir = path.join(pkgRoot, 'data');
    fs.mkdirSync(dataDir, { recursive: true });

    pkg.files.forEach((slug, ci) => {
      const file = path.join(CHAPTERS_DIR, `${slug}.html`);
      if (!fs.existsSync(file)) { console.warn('跳过缺失章节:', slug); return; }
      const raw = fs.readFileSync(file, 'utf8');
      const conv = convertChapterHtml(raw);
      const chKey = `c${String(registry.length).padStart(2, '0')}`;
      const dataFile = `${slug}.js`; // 小程序 require 不支持 .json，数据必须以 .js 模块提供
      fs.writeFileSync(path.join(dataDir, dataFile), 'module.exports = ' + JSON.stringify({
        key: chKey, slug, title: conv.title, subtitle: conv.subtitle,
        nodes: conv.nodes, ttsSegs: flattenTts(conv.nodes), toc: conv.toc,
      }) + ';\n', 'utf8');
      const chNum = (conv.title.match(/第(\d+)章/) || [])[1];
      const quizKey = QUIZ_KEY_BY_SLUG[slug] || (chNum ? `ch${String(+chNum).padStart(2, '0')}` : null);
      registry.push({
        key: chKey, slug, pkg: pkg.name, title: conv.title, subtitle: conv.subtitle,
        num: chNum ? +chNum : null,
        quizKey,
      });
      stats.push(`${chKey} ${conv.title} (${(fs.statSync(path.join(dataDir, dataFile)).size / 1024).toFixed(0)}KB)`);
    });

    // 生成静态 require 索引（小程序 require 不支持完全动态路径）
    const mapLines = pkg.files.filter(slug => fs.existsSync(path.join(dataDir, `${slug}.js`)))
      .map(slug => `  '${slug}': require('./${slug}.js'),`).join('\n');
    fs.writeFileSync(path.join(dataDir, 'index.js'), `module.exports = {\n${mapLines}\n};\n`, 'utf8');

    // 每个内容分包放一个薄壳阅读页（逻辑复用主包 utils）
    const readerDir = path.join(pkgRoot, 'pages', 'reader');
    fs.mkdirSync(readerDir, { recursive: true });
    const tpl = path.join(ROOT, 'tools', 'mp-templates', 'reader');
    ['reader.js', 'reader.wxml', 'reader.wxss', 'reader.json'].forEach(f => {
      fs.copyFileSync(path.join(tpl, f), path.join(readerDir, f));
    });
    subpkgPages.push({ root: `packages/${pkg.name}`, pages: ['pages/reader/reader'] });
  });

  // 按章节数字号排序（标题形如「第N章 …」），保证阅读顺序正确
  registry.sort((a, b) => {
    const na = (a.title.match(/第(\d+)章/) || [])[1];
    const nb = (b.title.match(/第(\d+)章/) || [])[1];
    return (na ? +na : 999) - (nb ? +nb : 999);
  });

  // 大厂真题场景题库（无对应章节，作为独立面试场次进入注册表）
  const BOSS_QUIZZES = [
    { key: 'bytedance', title: '字节跳动 · AI 算法真题场', subtitle: 'Transformer / RLHF / Agent 记忆与场景设计（源自字节 2025-2026 真实面经）' },
    { key: 'meituan',   title: '美团 · Agent 落地真题场',   subtitle: 'RAG 排查 / 工具容错 / 场景设计（源自美团 Agent 岗真实面经）' },
    { key: 'jd',        title: '京东 · 电商 AI 真题场',     subtitle: '注意力变体 / 电商场景 / 资源调度（源自京东 AI 岗真实面经）' },
  ];

  // 题库分包
  const quizPkg = path.join(PKG_DIR, 'quiz');
  const quizDataDir = path.join(quizPkg, 'data');
  fs.mkdirSync(quizDataDir, { recursive: true });
  const quizBank = JSON.parse(fs.readFileSync(QUIZ_FILE, 'utf8'));
  const quizIndex = [];
  Object.keys(quizBank).forEach(chKey => {
    fs.writeFileSync(path.join(quizDataDir, `${chKey}.js`), 'module.exports = ' + JSON.stringify(quizBank[chKey]) + ';\n', 'utf8');
    quizIndex.push({ ch: chKey, count: quizBank[chKey].length });
  });
  // 主包题库首页使用的索引（小程序 require 不支持 .json，写为 .js 模块）
  fs.writeFileSync(path.join(MP_DIR, 'data', 'quiz-index.js'), 'module.exports = ' + JSON.stringify(quizIndex) + ';\n', 'utf8');
  const quizMapLines = Object.keys(quizBank).map(k => `  '${k}': require('./${k}.js'),`).join('\n');
  fs.writeFileSync(path.join(quizDataDir, 'index.js'), `module.exports = {\n${quizMapLines}\n  index: ${JSON.stringify(quizIndex)},\n};\n`, 'utf8');
  const quizTpl = path.join(ROOT, 'tools', 'mp-templates', 'quiz');
  const quizRunnerDir = path.join(quizPkg, 'pages', 'runner');
  fs.mkdirSync(quizRunnerDir, { recursive: true });
  ['runner.js', 'runner.wxml', 'runner.wxss', 'runner.json'].forEach(f => {
    fs.copyFileSync(path.join(quizTpl, f), path.join(quizRunnerDir, f));
  });
  // 语音讲解页（老师/同学双角色朗读面试题）：模板源在 mp-templates/quiz/qa-listen/
  const qaListenDir = path.join(quizPkg, 'pages', 'qa-listen');
  fs.mkdirSync(qaListenDir, { recursive: true });
  ['qa-listen.js', 'qa-listen.wxml', 'qa-listen.wxss', 'qa-listen.json'].forEach(f => {
    fs.copyFileSync(path.join(quizTpl, 'qa-listen', f), path.join(qaListenDir, f));
  });
  subpkgPages.push({ root: 'packages/quiz', pages: ['pages/runner/runner', 'pages/qa-listen/qa-listen'] });

  // 大厂真题场次追加到主包章节注册表（排在教程章节之后，复用同一套面试 runner）
  BOSS_QUIZZES.forEach(b => {
    if (quizBank[b.key] && quizBank[b.key].length) {
      registry.push({
        key: 'boss_' + b.key, slug: b.key, pkg: 'quiz', title: b.title, subtitle: b.subtitle,
        num: null, quizKey: b.key, isBoss: true,
      });
    }
  });

  // 主包章节注册表
  fs.mkdirSync(path.join(MP_DIR, 'data'), { recursive: true });
  fs.writeFileSync(path.join(MP_DIR, 'data', 'chapters.js'), 'module.exports = ' + JSON.stringify(registry) + ';\n', 'utf8');

  // app.json subpackages 注入
  const appJsonPath = path.join(MP_DIR, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appJson.subpackages = subpkgPages;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), 'utf8');

  console.log('✅ 构建完成');
  console.log(`章节注册表: ${registry.length} 章`);
  stats.forEach(s => console.log('  ' + s));
  const total = execSize(MP_DIR);
  console.log(`小程序总体积: ${(total / 1024 / 1024).toFixed(2)}MB`);
}

function execSize(dir) {
  let size = 0;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    size += st.isDirectory() ? execSize(p) : st.size;
  }
  return size;
}

main();
