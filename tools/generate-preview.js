#!/usr/bin/env node
/**
 * 生成 miniprogram-preview.html：小程序阅读体验的浏览器预览
 * 数据取构建产物（miniprogram/packages/* 的 .js 模块），样式直接编译
 * tools/mp-templates/reader/reader.wxss（rpx → px / 变量展开 / rich-text 作用域改写），
 * 因此代码块、表格、卡片等渲染效果与小程序端 1:1 一致。
 *
 * 预览重点（对应本次 6 项修复）：
 *  ① 代码块横滑（mac 风卡 + 滑动提示 + 行尾渐隐）  ② 表格细线网格
 *  ③ 章内目录抽屉（右侧滑出、点击跳转）           ④ 阅读位置记忆（localStorage 模拟）
 *
 * 运行：node tools/generate-preview.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MP = path.join(ROOT, 'miniprogram');

/* ---------- 读取构建产物（CommonJS 模块直接 require） ---------- */
const chapters = require(path.join(MP, 'data', 'chapters.js'));
// 选一章代码/表格/卡片都丰富的章节做演示：ch11-langgraph 之外用 ch07-mcp 更全面
const DEMO_SLUG = fs.existsSync(path.join(MP, 'packages/content-b/data/ch07-mcp.js'))
  ? { pkg: 'content-b', slug: 'ch07-mcp' }
  : { pkg: 'content-a', slug: 'ch02-what-is-agent' };
const demo = require(path.join(MP, 'packages', DEMO_SLUG.pkg, 'data', DEMO_SLUG.slug + '.js'));
const demoMeta = chapters.find(c => c.slug === DEMO_SLUG.slug) || {};

/* ---------- 编译 reader.wxss → 预览用 CSS ---------- */
function compileWxss(src) {
  let css = src;
  // 1) CSS 变量（仅取日间主题的）
  const vars = {};
  const varBlock = css.match(/\.reader-wrap\s*\{([\s\S]*?)\n\}/);
  if (varBlock) {
    const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = re.exec(varBlock[1]))) vars[m[1]] = m[2].trim();
  }
  css = css.replace(/var\((--[\w-]+)\)/g, (s, name) => vars[name] || s);
  // 2) 夜间主题整块去掉（预览只演示日间）
  css = css.replace(/\.night[^{}]*\{[^{}]*\}/g, '');
  css = css.replace(/\.reader-wrap\.night\s*\{[\s\S]*?\n\}/, '');
  // 3) rpx → px（750rpx = 375px）
  css = css.replace(/([\d.]+)rpx/g, (s, n) => (parseFloat(n) / 2) + 'px');
  // 4) 小程序标签选择器 → 预览 DOM 标签
  css = css.replace(/\.reader-wrap/g, '.phone-screen-reader');
  css = css.replace(/\.rich/g, '.rich-html');
  css = css.replace(/\brich-text\b/g, '.rich-html');
  // 5) ::after 渐隐在预览里同样生效，无需改
  return css;
}
const readerCss = compileWxss(fs.readFileSync(path.join(ROOT, 'tools/mp-templates/reader/reader.wxss'), 'utf8'));

/* ---------- 章节目录（构建产物 toc） ---------- */
const toc = Array.isArray(demo.toc) ? demo.toc : [];
const tocRows = toc.map(t =>
  `  <div class="toc-item lv${t.level}" data-anchor="${t.anchor}">${t.text}</div>`).join('\n');

/* ---------- 章节列表（首页） ---------- */
const chapterRows = chapters.filter(c => !c.isBoss).slice(0, 12).map((c, i) => `
  <div class="chapter-item" data-slug="${c.slug}">
    <div class="chapter-badge">${c.num !== null ? c.num : '·'}</div>
    <div class="chapter-info">
      <div class="chapter-title">${c.title}</div>
      <div class="chapter-sub">${c.subtitle || ''}</div>
    </div>
    <div class="chapter-arrow">›</div>
  </div>`).join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>小程序阅读体验预览 · AI Agent 通识教程</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background:#e8ebf0; font-family:-apple-system,"PingFang SC","HarmonyOS Sans SC",sans-serif;
  display:flex; flex-direction:column; align-items:center; padding:30px 16px 60px; gap:18px;
}
.intro { max-width:760px; background:#fff; border-radius:14px; padding:18px 22px; font-size:13.5px; color:#475569; line-height:1.9; box-shadow:0 4px 16px rgba(0,0,0,.06); }
.intro b { color:#111827; }
.intro .tag { display:inline-block; background:#eef2ff; color:#4338ca; border-radius:99px; padding:1px 10px; font-size:12px; font-weight:600; margin-right:4px; }
.phones { display:flex; gap:28px; flex-wrap:wrap; justify-content:center; align-items:flex-start; }
.phone-col { display:flex; flex-direction:column; gap:10px; align-items:center; }
.phone-cap { font-size:12.5px; color:#64748b; font-weight:600; }
.phone {
  width:375px; height:740px; background:#fff; border-radius:40px; border:9px solid #111827;
  overflow:hidden; display:flex; flex-direction:column; position:relative;
  box-shadow:0 24px 60px rgba(0,0,0,.25);
}
.statusbar { height:30px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:#111; flex-shrink:0; }
.navbar { height:42px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:600; color:#111; border-bottom:1px solid #f0f0f0; flex-shrink:0; padding:0 14px; }
.navbar .nav-t { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.phone-screen { flex:1; overflow-y:auto; position:relative; }
.phone-screen::-webkit-scrollbar { width:0; }
/* 预览适配：让手机框成为 fixed 元素的包含块（模拟小程序屏幕），
   同时保留内部滚动（与小程序 pageScroll 行为一致） */
.phone { contain: layout; }

/* ===== 首页（简化） ===== */
.home-wrap { padding:12px; }
.hero { background:linear-gradient(135deg,#0f172a,#1e3a8a 55%,#2563eb); border-radius:14px; padding:22px 18px; color:#fff; margin-bottom:12px; }
.hero h2 { font-size:19px; } .hero p { font-size:12.5px; opacity:.85; margin-top:4px; }
.continue-card { display:flex; align-items:center; background:#fff; border-radius:10px; padding:13px 14px; margin-bottom:12px; box-shadow:0 3px 12px rgba(15,23,42,.07); border-left:4px solid #f59e0b; }
.continue-left { flex:1; overflow:hidden; }
.continue-label { font-size:11px; color:#f59e0b; font-weight:700; letter-spacing:1px; }
.continue-title { font-size:14.5px; font-weight:600; color:#111827; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.continue-btn { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#f97316); color:#fff; text-align:center; line-height:36px; font-size:13px; flex-shrink:0; }
.chapter-item { display:flex; align-items:center; background:#fff; border-radius:8px; padding:11px 12px; margin-bottom:7px; cursor:pointer; }
.chapter-item:active { background:#f0f6ff; }
.chapter-badge { width:30px; height:30px; border-radius:7px; background:#eff6ff; color:#2563eb; font-size:13px; text-align:center; line-height:30px; margin-right:10px; font-weight:600; flex-shrink:0; }
.chapter-info { flex:1; overflow:hidden; }
.chapter-title { font-size:14px; font-weight:600; color:#111827; }
.chapter-sub { font-size:11.5px; color:#9ca3af; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.chapter-arrow { color:#d1d5db; font-size:19px; margin-left:8px; }
/* 继续阅读弹窗（模拟 wx.showModal） */
.resume-modal-mask { position:absolute; inset:0; background:rgba(15,23,42,.4); z-index:60; display:flex; align-items:center; justify-content:center; }
.resume-modal { width:270px; background:#fff; border-radius:12px; overflow:hidden; text-align:center; animation:pop .22s ease both; }
@keyframes pop { from { transform:scale(.92); opacity:0; } to { transform:scale(1); opacity:1; } }
.resume-modal .rm-title { font-size:16px; font-weight:700; color:#111827; padding:20px 18px 8px; }
.resume-modal .rm-body { font-size:13.5px; color:#4b5563; padding:0 20px 18px; line-height:1.6; }
.resume-modal .rm-btns { display:flex; border-top:1px solid #eef1f6; }
.resume-modal .rm-btn { flex:1; padding:12px 0; font-size:15px; cursor:pointer; }
.resume-modal .rm-btn.cancel { color:#6b7280; border-right:1px solid #eef1f6; }
.resume-modal .rm-btn.ok { color:#2563eb; font-weight:700; }

/* ===== 阅读页容器 ===== */
.phone-screen-reader { min-height:100%; }
/* rich-text 模拟容器：继承 reader.wxss 编译样式 */
.rich-html { display:block; }
/* 预览适配说明：.phone 有 contain:layout，fixed 元素相对手机框定位，
   与小程序里相对屏幕定位的行为一致；工具按钮/抽屉会跟随手机屏幕，不随内容滚走 */

/* ===== 面试页（简化演示自动滚动） ===== */
.iv-wrap { display:flex; flex-direction:column; height:100%; background:#eef0f5; }
.iv-bar { flex-shrink:0; display:flex; align-items:center; padding:10px 13px; background:#fff; border-bottom:1px solid #e9ecf1; }
.iv-avatar { width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:#fff; font-size:16px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.iv-info { flex:1; margin-left:9px; }
.iv-name { font-size:15px; font-weight:700; }
.iv-title { font-size:10.5px; color:#94a3b8; margin-top:3px; }
.iv-progress { font-size:11px; font-weight:600; color:#2563eb; background:#eff6ff; padding:5px 9px; border-radius:99px; }
.chat { flex:1; overflow-y:auto; padding:12px; scroll-behavior:smooth; }
.chat::-webkit-scrollbar { width:0; }
.row { display:flex; margin-bottom:12px; animation:bubble-in .26s ease both; }
@keyframes bubble-in { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:none; } }
.row.me { justify-content:flex-end; }
.bubble { padding:10px 12px; font-size:14px; line-height:1.6; max-width:260px; word-break:break-word; }
.bubble.iv { background:#fff; color:#1f2937; border-radius:3px 10px 10px 10px; box-shadow:0 1px 5px rgba(15,23,42,.05); }
.bubble.iv.question { border-left:3px solid #2563eb; }
.bubble.iv.ok { border-left:3px solid #22c55e; }
.bubble.me { background:#95ec69; color:#10281a; border-radius:10px 3px 10px 10px; }
.q-label { font-size:10.5px; font-weight:700; color:#2563eb; margin-bottom:5px; }
.ap { flex-shrink:0; background:#fff; border-top:1px solid #e9ecf1; padding:11px 12px 14px; }
.ap-tip { font-size:10.5px; color:#9aa4b2; margin-bottom:7px; }
.ap-opt { display:flex; align-items:flex-start; padding:10px 11px; margin-bottom:7px; border:1px solid #e6e9f0; border-radius:8px; background:#fbfcfe; cursor:pointer; }
.ap-letter { width:21px; height:21px; border-radius:50%; flex-shrink:0; margin-right:8px; background:#eef2f7; color:#64748b; font-size:11.5px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.ap-text { flex:1; font-size:13px; color:#374151; line-height:1.5; }
.autoscroll-note { text-align:center; font-size:11px; color:#94a3b8; padding:8px 0; }

/* ===== 编译后的小程序阅读页样式（rpx→px，日间主题） ===== */
${readerCss}
</style>
</head>
<body>

<div class="intro">
  <b>小程序阅读体验预览</b> · 样式直接编译自 <code>reader.wxss</code>，数据取构建产物，与真机 1:1。<br>
  <span class="tag">① 代码块横滑</span><span class="tag">② 表格细线</span><span class="tag">③ 章内目录</span><span class="tag">④ 位置记忆</span><span class="tag">⑤ 面试自动滚动</span><br>
  中间手机为阅读页：代码块可<b>左右拖动</b>；右下角 <b>☰</b> 打开章内目录；滚动一段后点顶部「⟳ 模拟重进」会回到上次位置并弹出提示。左手机为首页「继续上次阅读」弹窗，右手机为面试自动滚到底部演示。
</div>

<div class="phones">

  <!-- ① 首页：继续上次阅读弹窗 -->
  <div class="phone-col">
    <div class="phone">
      <div class="statusbar">9:41</div>
      <div class="navbar"><div class="nav-t">AI Agent 通识教程</div></div>
      <div class="phone-screen">
        <div class="home-wrap">
          <div class="hero"><h2>AI Agent 通识教程</h2><p>从基础认知到面试通关 · ${chapters.length} 章渐进式学习</p></div>
          <div class="continue-card">
            <div class="continue-left">
              <div class="continue-label">继续学习</div>
              <div class="continue-title">${demoMeta.title || demo.title}</div>
            </div>
            <div class="continue-btn">▶</div>
          </div>
          ${chapterRows}
        </div>
      </div>
      <div class="resume-modal-mask" id="resumeModal">
        <div class="resume-modal">
          <div class="rm-title">继续上次阅读</div>
          <div class="rm-body">上次读到「${demoMeta.title || demo.title}」，是否继续？</div>
          <div class="rm-btns">
            <div class="rm-btn cancel" onclick="document.getElementById('resumeModal').style.display='none'">不了</div>
            <div class="rm-btn ok" onclick="document.getElementById('resumeModal').style.display='none'">继续阅读</div>
          </div>
        </div>
      </div>
    </div>
    <div class="phone-cap">首页 · 再开小程序弹「继续上次阅读」</div>
  </div>

  <!-- ② 阅读页：目录 + 代码块 + 表格 + 位置记忆 -->
  <div class="phone-col">
    <div class="phone">
      <div class="statusbar">9:41</div>
      <div class="navbar"><div class="nav-t" id="readerNav">${demoMeta.title || demo.title}</div></div>
      <div class="phone-screen" id="readerScreen">
        <div class="phone-screen-reader fs-m">
          <div class="read-progress"><div class="read-progress-fill" id="readProgress" style="width:0%"></div></div>
          <div class="resume-tip" id="resumeTip" style="display:none">📖 已回到上次阅读位置</div>

          <div class="reader-tools">
            <div class="tool-btn toc-btn" id="tocBtn">☰</div>
            <div class="tool-btn">Aa</div>
          </div>

          <div class="toc-mask" id="tocMask" style="display:none"></div>
          <div class="toc-panel" id="tocPanel" style="display:none">
            <div class="toc-head">
              <div class="toc-title">本章目录</div>
              <div class="toc-close" id="tocClose">✕</div>
            </div>
            <div class="toc-list" id="tocList">
${tocRows}
            </div>
          </div>

          <div class="reader-head">
            <div class="reader-chip" ${demoMeta.num == null ? 'style="display:none"' : ''}>第 ${demoMeta.num} 章</div>
            <div class="reader-title">${demo.title}</div>
            <div class="reader-sub">${demo.subtitle || ''}</div>
          </div>

          <div class="rich-html rich" id="richBody">${demo.html}</div>

          <div class="reader-end">— 本章完 · 已自动记录阅读进度 —</div>
          <div class="reader-nav">
            <div class="nav-btn prev" id="reenterBtn">⟳ 模拟重进</div>
            <div class="nav-btn next">下一章 →</div>
          </div>
          <div class="nav-progress">${(demoMeta.num != null ? demoMeta.num + 1 : '?')} / ${chapters.length}</div>
        </div>
      </div>
    </div>
    <div class="phone-cap">阅读页 · 代码块横滑 / ☰目录 / 位置记忆</div>
  </div>

  <!-- ③ 面试页：自动滚动 -->
  <div class="phone-col">
    <div class="phone">
      <div class="statusbar">9:41</div>
      <div class="navbar"><div class="nav-t">模拟面试 · ${demoMeta.title || demo.title}</div></div>
      <div class="phone-screen" style="overflow:hidden">
        <div class="iv-wrap">
          <div class="iv-bar">
            <div class="iv-avatar">林</div>
            <div class="iv-info">
              <div class="iv-name">林工 · 资深架构师</div>
              <div class="iv-title">尖锐直接 · 追问到底</div>
            </div>
            <div class="iv-progress" id="ivProgress">第 1 / 3 题</div>
          </div>
          <div class="chat" id="ivChat">
            <div class="autoscroll-note">▼ 新消息自动滚到底部，无需手动 ▼</div>
          </div>
          <div class="ap" id="ivPanel" style="display:none">
            <div class="ap-tip">点击选项即可作答</div>
            <div id="ivOpts"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="phone-cap">面试页 · 消息自动滚到底部</div>
  </div>

</div>

<script>
/* ===== 阅读页交互 ===== */
const screen2 = document.getElementById('readerScreen');
const progress = document.getElementById('readProgress');
const resumeTip = document.getElementById('resumeTip');
const POS_KEY = 'preview_read_pos';

screen2.addEventListener('scroll', () => {
  const max = screen2.scrollHeight - screen2.clientHeight;
  progress.style.width = Math.min(100, Math.round(screen2.scrollTop / max * 100)) + '%';
  clearTimeout(window._posT);
  window._posT = setTimeout(() => localStorage.setItem(POS_KEY, screen2.scrollTop), 200);
});

// 模拟重进：回顶后自动恢复到上次位置
document.getElementById('reenterBtn').addEventListener('click', () => {
  const top = parseInt(localStorage.getItem(POS_KEY) || '0', 10);
  screen2.scrollTop = 0;
  if (top > 300) {
    setTimeout(() => {
      screen2.scrollTop = top;
      resumeTip.style.display = 'block';
      setTimeout(() => resumeTip.style.display = 'none', 2600);
    }, 350);
  }
});
// 进入时若已有记录，直接演示恢复
(function () {
  const top = parseInt(localStorage.getItem(POS_KEY) || '0', 10);
  if (top > 300) {
    setTimeout(() => { screen2.scrollTop = top; resumeTip.style.display = 'block';
      setTimeout(() => resumeTip.style.display = 'none', 2600); }, 350);
  }
})();

// 目录抽屉
const tocPanel = document.getElementById('tocPanel');
const tocMask = document.getElementById('tocMask');
function setToc(open) {
  tocPanel.style.display = open ? 'block' : 'none';
  tocMask.style.display = open ? 'block' : 'none';
  document.getElementById('tocBtn').classList.toggle('on', open);
}
document.getElementById('tocBtn').addEventListener('click', () => setToc(tocPanel.style.display === 'none'));
document.getElementById('tocClose').addEventListener('click', () => setToc(false));
tocMask.addEventListener('click', () => setToc(false));
document.querySelectorAll('.toc-item').forEach(el => {
  el.addEventListener('click', () => {
    const anchor = el.dataset.anchor;
    setToc(false);
    setTimeout(() => {
      const target = document.getElementById(anchor);
      if (!target) return;
      // 等价于小程序里 boundingClientRect + scrollOffset 的算法
      const top = target.getBoundingClientRect().top - screen2.getBoundingClientRect().top + screen2.scrollTop - 10;
      screen2.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 160);
  });
});

/* ===== 面试自动滚动演示 ===== */
const chat = document.getElementById('ivChat');
const panel = document.getElementById('ivPanel');
const optsBox = document.getElementById('ivOpts');
const ivProgress = document.getElementById('ivProgress');
const demoQ = [
  { q: 'MCP 协议主要解决什么问题？', opts: ['统一工具接入协议，即插即用', '提升模型推理速度', '压缩上下文长度', '替代 Function Calling'], a: 0 },
  { q: 'Function Calling 的本质是？', opts: ['模型直接执行代码', 'LLM 输出结构化调用请求，由宿主执行', '一种微调方法', '向量检索技术'], a: 1 },
  { q: 'ReAct 模式的核心循环是？', opts: ['Plan → Do → Check', 'Thought → Action → Observation', 'Prompt → Answer', 'Retrieve → Generate'], a: 1 },
];
let qi = 0;
function bottom() { requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; }); }
function sayIv(html, cls) {
  const d = document.createElement('div');
  d.className = 'row iv';
  d.innerHTML = '<div class="bubble iv ' + (cls || '') + '">' + html + '</div>';
  chat.appendChild(d); bottom();
}
function sayMe(text) {
  const d = document.createElement('div');
  d.className = 'row me';
  d.innerHTML = '<div class="bubble me">' + text + '</div>';
  chat.appendChild(d); bottom();
}
function ask() {
  if (qi >= demoQ.length) {
    sayIv('好，我这边的问题问完了。演示结束 —— 注意全程滚动都是自动的。');
    panel.style.display = 'none';
    return;
  }
  ivProgress.textContent = '第 ' + (qi + 1) + ' / ' + demoQ.length + ' 题';
  setTimeout(() => {
    sayIv('<div class="q-label">问题 ' + (qi + 1) + ' / ' + demoQ.length + '</div><b>' + demoQ[qi].q + '</b>', 'question');
    optsBox.innerHTML = '';
    demoQ[qi].opts.forEach((o, i) => {
      const el = document.createElement('div');
      el.className = 'ap-opt';
      el.innerHTML = '<div class="ap-letter">' + 'ABCD'[i] + '</div><div class="ap-text">' + o + '</div>';
      el.addEventListener('click', () => answer(i));
      optsBox.appendChild(el);
    });
    panel.style.display = 'block';
    bottom();
  }, 700);
}
function answer(i) {
  const q = demoQ[qi];
  sayMe('ABCD'[i] + '. ' + q.opts[i]);
  panel.style.display = 'none';
  const right = i === q.a;
  setTimeout(() => {
    sayIv(right ? '✅ 答得不错，继续保持。' : '❌ 这里不对，正确答案是 ' + 'ABCD'[q.a] + '。', right ? 'ok' : 'bad');
    qi++;
    ask();
  }, 800);
}
setTimeout(() => {
  sayIv('你好，我是今天的面试官林工。我们开始吧。');
  ask();
}, 500);
</script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'miniprogram-preview.html'), html, 'utf8');
console.log('✅ 预览已生成: miniprogram-preview.html');
console.log('   演示章节:', DEMO_SLUG.slug, '| 目录条目:', toc.length);
