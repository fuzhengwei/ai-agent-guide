const api = require('../../../../utils/toy-api.js');
const ARTICLES = require('../../data/articles.js');

/**
 * 轨迹类型 → web 端「泥土系」配色（与 ToyAgent style.css .tstep 一致）
 */
const TRACE_COLORS = {
  thought: '#7c5cb0', prompt: '#7c5cb0', memory: '#7c5cb0',
  action: '#4a6b8a',
  observation: '#2f6b66', mcp: '#2f6b66', retrieve: '#2f6b66',
  tool: '#8a6116', compress: '#8a6116', warn: '#8a6116',
  intent: '#a04f6e', skill: '#a04f6e',
  agent: '#9a4a1e', node: '#9a4a1e', route: '#9a4a1e',
  guard: '#a03028',
  edge: '#837a6d',
  final: '#3d6b4f',
};

/** 轨迹类型 → 中文标签（流程图节点用） */
const TYPE_LABELS = {
  thought: '思考', prompt: '组装提示', memory: '记忆', action: '行动',
  observation: '观察', mcp: 'MCP', retrieve: '检索', tool: '工具',
  compress: '压缩', intent: '意图', skill: '技能', agent: '智能体',
  node: '节点', route: '路由', guard: '守卫', warn: '警告',
  edge: '流转', final: '完成',
};

/** hex → 柔和底色 rgba（流程图节点背景，对应 web 端 classDef 的 fill） */
function hexBg(hex, alpha) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return 'rgba(0,0,0,0.05)';
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha || 0.08})`;
}

function clipText(s, n) {
  s = String(s || '');
  return s.length > n ? s.slice(0, n) + '…' : s;
}

/**
 * 把执行轨迹转成「执行流程图」节点序列（web 端 mermaid 的原生复刻）：
 * - 用户输入 → 圆角 pill 起点；
 * - 每个轨迹步骤 → 按类型着色的节点卡；
 * - 观察→思考 之间 = 循环回边（虚线「继续循环」，对应 web 的 -.-> 标注）；
 * - edge 类型 = 连线上标签（工作流状态机的迁移条件）。
 */
function buildDiagram(steps, userMsg) {
  const items = [{ kind: 'user', text: clipText(userMsg, 24) }];
  let prevType = '';
  let pendingEdge = '';
  (steps || []).forEach((s) => {
    if (s.type === 'edge') {
      pendingEdge = clipText((s.label ? s.label + ' · ' : '') + (s.detail || ''), 18);
      return;
    }
    const color = TRACE_COLORS[s.type] || '#9a4a1e';
    items.push({
      kind: s.type === 'final' ? 'final' : 'step',
      loopIn: prevType === 'observation' && s.type === 'thought',
      via: pendingEdge,
      color,
      bg: hexBg(color, s.type === 'final' ? 0.14 : 0.08),
      title: TYPE_LABELS[s.type] || s.type,
      text: clipText((s.label ? s.label + ' · ' : '') + (s.detail || ''), 42),
    });
    pendingEdge = '';
    prevType = s.type;
  });
  return items;
}

/**
 * 把 web 文章 HTML 转成 rich-text 可靠渲染的格式：
 * 1. pre>code 代码块摘出（换行转 <br/>，避免全局替换污染正文间距）；
 * 2. 其余标签注入内联样式（rich-text 对外部 class 支持不稳，内联 style 最可靠）；
 * 3. 配色与 ToyAgent web 端「纸面编辑部」一致。
 */
const SERIF = 'font-family:"Songti SC",Georgia,serif;';
const MONO = 'font-family:Menlo,Consolas,monospace;';

function toRichHtml(raw) {
  const blocks = [];
  let html = raw.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (m, code) => {
    const i = blocks.push(code.replace(/\n/g, '<br/>')) - 1;
    return '@@CB' + i + '@@';
  });

  html = html
    .replace(/\n/g, ' ')
    .replace(/<h2>/g, '<h2 style="' + SERIF + 'font-size:15px;font-weight:700;color:#1f1b16;border-left:2.5px solid #9a4a1e;padding-left:8px;margin:14px 0 8px;line-height:1.4">')
    .replace(/<h3>/g, '<h3 style="font-size:14px;font-weight:700;color:#1f1b16;margin:12px 0 6px">')
    .replace(/<p>/g, '<p style="margin:8px 0">')
    .replace(/<strong>/g, '<strong style="color:#1f1b16;font-weight:700">')
    .replace(/<blockquote>/g, '<blockquote style="border-left:3px solid #9a4a1e;background:#f6ede3;padding:8px 12px;margin:10px 0;border-radius:0 8px 8px 0;color:#7f3c17">')
    .replace(/<div class="co-title">/g, '<div style="font-weight:700;color:#9a4a1e;margin-bottom:4px">')
    .replace(/<div class="callout[^"]*">/g, '<div style="background:#f6ede3;border:1px solid #ddc4ab;border-radius:8px;padding:10px 14px;margin:10px 0;color:#7f3c17">')
    .replace(/<table>/g, '<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:11.5px">')
    .replace(/<th>/g, '<th style="border:1px solid #e0dbcf;background:#f6f4ef;padding:5px 8px;text-align:left;color:#1f1b16">')
    .replace(/<td>/g, '<td style="border:1px solid #e9e5da;padding:5px 8px;color:#3d372f">')
    .replace(/<ul>/g, '<ul style="padding-left:18px;margin:8px 0">')
    .replace(/<li>/g, '<li style="margin:4px 0;color:#3d372f">')
    .replace(/<code>/g, '<code style="' + MONO + 'font-size:11px;background:#f6ede3;color:#7f3c17;padding:1px 5px;border-radius:4px">');

  html = html.replace(/@@CB(\d+)@@/g, (m, i) =>
    '<code style="' + MONO + 'display:block;font-size:11px;line-height:1.7;background:#2a251f;color:#ece7dc;padding:10px 12px;border-radius:8px;margin:10px 0;white-space:pre-wrap;word-break:break-all">' + blocks[+i] + '</code>'
  );
  return html;
}

Page({
  data: {
    id: '',
    title: '',
    sub: '',
    article: null,       // { title, lede, chapters, html }
    articleOpen: false,  // 默认收起，点输入条右侧「文档」按钮展开
    messages: [],
    samples: [],
    input: '',
    busy: false,
    scrollTop: 0,
  },

  onLoad(options) {
    const title = decodeURIComponent(options.title || 'ToyAgent');
    const sub = decodeURIComponent(options.sub || '');
    wx.setNavigationBarTitle({ title });
    const SCENARIOS = require('../../../../data/toy-scenarios.js').SCENARIOS;
    const scenario = SCENARIOS.find(s => s.id === options.id);
    const raw = ARTICLES[options.id] || null;
    this.setData({
      id: options.id || '',
      title,
      sub,
      samples: (scenario && scenario.samples) ? scenario.samples.slice(0, 4) : [],
      article: raw ? {
        title: raw.title,
        lede: raw.lede || '',
        chapters: raw.chapters || [],
        html: toRichHtml(raw.html || ''),
      } : null,
    });
  },

  toggleArticle() {
    this.setData({ articleOpen: !this.data.articleOpen });
  },

  onInput(e) {
    this.setData({ input: e.detail.value });
  },

  tapSample(e) {
    this.setData({ input: e.currentTarget.dataset.text }, () => this.send());
  },

  async send() {
    const text = (this.data.input || '').trim();
    if (!text || this.data.busy || !this.data.id) return;
    const messages = this.data.messages.concat([{ role: 'user', text }]);
    this.setData({ messages, input: '', busy: true, scrollTop: 999999 });

    try {
      const res = await api.chat(this.data.id, text);
      const trace = (res.trace || []).map(t => ({
        ...t,
        color: TRACE_COLORS[t.type] || '#9a4a1e',
      }));
      const msgs = this.data.messages.concat([
        { role: 'agent', text: res.answer || '', trace, diagram: buildDiagram(trace, text), viewMode: 'diagram', ms: res.ms || 0, showTrace: true },
      ]);
      this.setData({ messages: msgs, busy: false, scrollTop: 999999 });
    } catch (e) {
      const msgs = this.data.messages.concat([
        { role: 'agent', text: '连接失败：' + e.message + '。若为首次使用，请点右上角「…」打开调试模式后再试。', trace: [], ms: 0, showTrace: false, failed: true },
      ]);
      this.setData({ messages: msgs, busy: false, scrollTop: 999999 });
    }
  },

  toggleTrace(e) {
    const idx = e.currentTarget.dataset.idx;
    const key = `messages[${idx}].showTrace`;
    this.setData({ [key]: !this.data.messages[idx].showTrace });
  },

  /** 流程图 / 时间线 视图切换 */
  toggleView(e) {
    const { idx, mode } = e.currentTarget.dataset;
    this.setData({ [`messages[${idx}].viewMode`]: mode });
  },

  async doReset() {
    if (!this.data.id) return;
    try {
      await api.reset(this.data.id);
      this.setData({ messages: [] });
      wx.showToast({ title: '已重置', icon: 'success' });
    } catch (e) {
      wx.showToast({ title: '重置失败', icon: 'none' });
    }
  },

  copyAnswer(e) {
    const text = e.currentTarget.dataset.text;
    if (text) wx.setClipboardData({ data: text });
  },
});
