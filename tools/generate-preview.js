#!/usr/bin/env node
/** 生成 miniprogram-preview.html：小程序 UI 的浏览器预览（内嵌真实转换数据） */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MP = path.join(ROOT, 'miniprogram');

const chapters = JSON.parse(fs.readFileSync(path.join(MP, 'data', 'chapters.json'), 'utf8'));
const ch02 = JSON.parse(fs.readFileSync(path.join(MP, 'packages/content-a/data/ch02-what-is-agent.json'), 'utf8'));
const quiz = JSON.parse(fs.readFileSync(path.join(MP, 'packages/quiz/data/ch02.json'), 'utf8')).slice(0, 3);
const quizIndex = JSON.parse(fs.readFileSync(path.join(MP, 'data', 'quiz-index.json'), 'utf8'));

const chapterRows = chapters.map((c, i) => `
  <div class="chapter-item" data-ch="${c.slug}">
    <div class="chapter-badge">${i}</div>
    <div class="chapter-info">
      <div class="chapter-title">${c.title}</div>
      <div class="chapter-sub">${c.subtitle || ''}</div>
    </div>
    <div class="chapter-arrow">›</div>
  </div>`).join('');

const quizRows = chapters.filter(c => c.quizKey).slice(0, 8).map(c => `
  <div class="quiz-item">
    <div class="quiz-info">
      <div class="quiz-title">${c.title}</div>
      <div class="quiz-meta">${(quizIndex.find(q => q.ch === c.quizKey) || { count: '?' }).count} 题</div>
    </div>
    <div class="quiz-btn">开始</div>
  </div>`).join('');

const q = quiz[0];
const quizDemo = `
  <div class="quiz-header"><span>1 / ${quiz.length}</span><span class="green">已对 0</span></div>
  <div class="question-card">
    <div class="q-type">${(q.answer || []).length > 1 ? '多选题' : '单选题'}</div>
    <div class="q-text">${q.question}</div>
    ${q.options.map((o, i) => `
      <div class="option ${i === (q.answer || [])[0] ? 'right' : ''}">
        <div class="option-mark">${'ABCDEF'[i]}</div>
        <div class="option-text">${o}</div>
      </div>`).join('')}
  </div>
  <div class="explanation"><div class="exp-title">解析</div><div class="exp-body">${q.explanation}</div></div>`;

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Agent 通识教程 · 小程序预览</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#e8ebf0; font-family:-apple-system,"PingFang SC",sans-serif; display:flex; flex-direction:column; align-items:center; padding:32px 16px; gap:16px; }
.phone { width:390px; height:780px; background:#f6f7f9; border-radius:44px; border:10px solid #111827; overflow:hidden; display:flex; flex-direction:column; position:relative; box-shadow:0 24px 60px rgba(0,0,0,.25); }
.statusbar { height:44px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600; color:#111; flex-shrink:0; }
.navbar { height:44px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:600; color:#111; border-bottom:1px solid #f0f0f0; flex-shrink:0; }
.screen { flex:1; overflow-y:auto; padding:12px; }
.screen::-webkit-scrollbar{display:none}
.tabbar { height:56px; background:#fff; border-top:1px solid #eee; display:flex; flex-shrink:0; padding-bottom:10px; }
.tab { flex:1; display:flex; align-items:center; justify-content:center; font-size:12px; color:#8a94a6; }
.tab.active { color:#2563eb; font-weight:600; }
.page { display:none; } .page.active { display:block; }
.hero { background:linear-gradient(135deg,#1e3a8a,#2563eb); border-radius:10px; padding:20px 16px; color:#fff; margin-bottom:14px; }
.hero h2 { font-size:20px; } .hero p { font-size:13px; opacity:.85; margin-top:5px; }
.progress-bar { height:3px; background:#dbeafe; border-radius:2px; margin-top:14px; }
.progress-fill { height:100%; width:18%; background:#fff; border-radius:2px; }
.progress-text { font-size:12px; margin-top:6px; opacity:.9; }
.chapter-item { display:flex; align-items:center; background:#fff; border-radius:8px; padding:12px; margin-bottom:8px; cursor:pointer; }
.chapter-item:hover { background:#f0f6ff; }
.chapter-badge { width:30px; height:30px; border-radius:7px; background:#eff6ff; color:#2563eb; font-size:13px; text-align:center; line-height:30px; margin-right:10px; font-weight:600; flex-shrink:0; }
.chapter-info { flex:1; overflow:hidden; }
.chapter-title { font-size:14px; font-weight:600; color:#111827; }
.chapter-sub { font-size:12px; color:#9ca3af; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.chapter-arrow { color:#d1d5db; font-size:20px; margin-left:8px; }
.quiz-item { display:flex; align-items:center; background:#fff; border-radius:8px; padding:12px; margin-bottom:8px; }
.quiz-btn { background:#2563eb; color:#fff; font-size:12px; padding:5px 14px; border-radius:99px; }
.stats { display:flex; gap:8px; margin-bottom:14px; }
.stat-card { flex:1; background:#fff; border-radius:8px; padding:14px 0; text-align:center; }
.stat-num { font-size:18px; font-weight:700; color:#2563eb; }
.stat-label { font-size:12px; color:#9ca3af; margin-top:4px; }
.menu { background:#fff; border-radius:8px; }
.menu-item { display:flex; justify-content:space-between; padding:14px; border-bottom:1px solid #f3f4f6; font-size:14px; }
.menu-item:last-child { border-bottom:none; }
.footer { text-align:center; color:#9ca3af; font-size:12px; margin-top:24px; }
/* 阅读页 */
.reader-head { margin-bottom:12px; }
.reader-title { font-size:22px; font-weight:700; color:#111827; line-height:1.35; }
.reader-sub { font-size:13px; color:#6b7280; margin-top:5px; }
.rich { font-size:15px; color:#374151; line-height:1.7; }
.rich p { margin:10px 0; }
.rich .ct { font-size:22px; font-weight:700; color:#111827; margin:4px 0 6px; }
.rich .cs { font-size:14px; color:#6b7280; margin:0 0 12px; }
.rich .sh { font-size:18px; font-weight:600; color:#1e3a8a; margin:20px 0 8px; padding-left:9px; border-left:4px solid #3b82f6; }
.rich .mp-card { background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:12px; margin:12px 0; }
.rich .mp-card-title { font-weight:700; font-size:15px; color:#1d4ed8; margin-bottom:6px; }
.rich .mp-quote { background:#eff6ff; border-left:4px solid #60a5fa; color:#1e40af; border-radius:0 6px 6px 0; padding:10px 12px; margin:12px 0; font-weight:500; }
.rich pre.code { background:#0f172a; color:#e2e8f0; border-radius:6px; padding:12px; margin:12px 0; font-family:Menlo,monospace; font-size:12px; white-space:pre-wrap; word-break:break-all; }
.rich .mp-compare { display:flex; gap:8px; margin:12px 0; }
.rich .mp-compare-side { flex:1; background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:10px; }
.rich .mp-compare-label { font-weight:700; text-align:center; color:#1d4ed8; margin-bottom:6px; font-size:14px; }
.rich .mp-compare-line { font-size:12px; color:#475569; padding:4px 0; border-bottom:1px dashed #f1f5f9; }
.rich .mp-flow { background:#fff; border:1px dashed #c7d2fe; border-radius:8px; padding:14px; margin:12px 0; display:flex; flex-direction:column; align-items:center; }
.rich .mp-flow-node { background:#eef2ff; color:#3730a3; border:1px solid #c7d2fe; border-radius:6px; padding:6px 16px; font-size:13px; width:70%; text-align:center; }
.rich .mp-flow-start { background:#dcfce7; border-color:#86efac; color:#166534; }
.rich .mp-flow-end { background:#fef9c3; border-color:#fde047; color:#854d0e; }
.rich .mp-flow-tool { background:#ffe4e6; border-color:#fda4af; color:#9f1239; }
.rich .mp-flow-arrow { color:#94a3b8; font-size:12px; margin:4px 0; }
.rich .mp-note { background:#fffbeb; border:1px solid #fde68a; color:#92400e; border-radius:6px; padding:8px 10px; font-size:12px; margin:10px 0; }
.reader-end { text-align:center; color:#c0c7d1; font-size:12px; margin:30px 0 15px; }
.reader-nav { display:flex; align-items:center; gap:10px; }
.nav-btn { flex:1; text-align:center; padding:11px 0; border-radius:99px; font-size:14px; font-weight:600; cursor:pointer; }
.nav-btn.prev { background:#fff; color:#475569; border:1px solid #e2e8f0; }
.nav-btn.next { background:#2563eb; color:#fff; }
.nav-progress { font-size:12px; color:#9ca3af; flex-shrink:0; }
/* 刷题页 */
.quiz-header { display:flex; justify-content:space-between; font-size:13px; color:#6b7280; margin-bottom:10px; }
.green { color:#16a34a; }
.question-card { background:#fff; border-radius:10px; padding:16px 14px; }
.q-type { display:inline-block; font-size:11px; color:#2563eb; background:#eff6ff; border-radius:4px; padding:2px 7px; margin-bottom:8px; }
.q-text { font-size:15px; font-weight:600; color:#111827; line-height:1.6; margin-bottom:14px; }
.option { display:flex; align-items:flex-start; padding:11px; border:1px solid #e5e7eb; border-radius:7px; margin-bottom:8px; }
.option.right { border-color:#16a34a; background:#f0fdf4; }
.option-mark { width:22px; height:22px; border-radius:50%; background:#f1f5f9; color:#475569; text-align:center; line-height:22px; font-size:12px; margin-right:9px; flex-shrink:0; }
.option.right .option-mark { background:#16a34a; color:#fff; }
.option-text { flex:1; font-size:14px; color:#374151; }
.explanation { background:#fff; border-radius:10px; padding:14px; margin-top:10px; }
.exp-title { font-size:13px; font-weight:700; color:#1d4ed8; margin-bottom:5px; }
.exp-body { font-size:13px; color:#4b5563; line-height:1.7; }
.action-btn { margin-top:18px; text-align:center; padding:12px 0; border-radius:99px; font-size:15px; font-weight:600; background:#2563eb; color:#fff; cursor:pointer; }
.hint { max-width:430px; background:#fff; border-radius:12px; padding:16px 20px; font-size:13px; color:#475569; line-height:1.8; box-shadow:0 4px 16px rgba(0,0,0,.06); }
.hint b { color:#111827; }
</style>
</head>
<body>
<div class="hint"><b>小程序 UI 预览</b> — 左侧手机画面为 miniprogram/ 工程的实际效果（内嵌真实转换数据）。底部 Tab 可切换：课程 / 题库 / 我的；课程页点击章节可进入阅读页。上架需完成本页下方清单中的账号配置步骤。</div>
<div class="phone">
  <div class="statusbar">9:41</div>
  <div class="navbar" id="navTitle">AI Agent 通识教程</div>
  <div class="screen">
    <!-- 课程 -->
    <div class="page active" id="page-home">
      <div class="hero">
        <h2>AI Agent 通识教程</h2>
        <p>从基础认知到面试通关 · ${chapters.length} 章渐进式教程</p>
        <div class="progress-bar"><div class="progress-fill"></div></div>
        <div class="progress-text">已读 5 / ${chapters.length} 章</div>
      </div>
      ${chapterRows}
      <div class="footer">配套 433 道面试题 · 切换「题库」开始刷题</div>
    </div>
    <!-- 题库 -->
    <div class="page" id="page-quiz">
      <div class="hero" style="background:linear-gradient(135deg,#312e81,#6d28d9)">
        <h2>面试题库</h2>
        <p>共 433 道题 · 覆盖 ${quizIndex.length} 章</p>
      </div>
      ${quizRows}
    </div>
    <!-- 我的 -->
    <div class="page" id="page-mine">
      <div class="stats">
        <div class="stat-card"><div class="stat-num">5/${chapters.length}</div><div class="stat-label">已读章节</div></div>
        <div class="stat-card"><div class="stat-num">3</div><div class="stat-label">刷题章节</div></div>
        <div class="stat-card"><div class="stat-num">12</div><div class="stat-label">练习次数</div></div>
      </div>
      <div class="menu">
        <div class="menu-item"><span>关于本教程</span><span style="color:#d1d5db">›</span></div>
        <div class="menu-item" style="color:#dc2626"><span>清除学习记录</span><span style="color:#d1d5db">›</span></div>
      </div>
      <div class="footer">AI Agent 通识教程 v1.0</div>
    </div>
    <!-- 阅读页 -->
    <div class="page" id="page-reader">
      <div class="reader-head">
        <div class="reader-title">${ch02.title}</div>
        <div class="reader-sub">${ch02.subtitle}</div>
      </div>
      <div class="rich">${ch02.html}</div>
      <div class="reader-end">— 本章完 · 已自动记录阅读进度 —</div>
      <div class="reader-nav">
        <div class="nav-btn prev" onclick="showPage('home')">返回目录</div>
        <div class="nav-progress">3 / ${chapters.length}</div>
        <div class="nav-btn next" onclick="alert('进入下一章（跨分包跳转）')">下一章</div>
      </div>
    </div>
    <!-- 刷题运行页 -->
    <div class="page" id="page-runner">
      ${quizDemo}
      <div class="action-btn" onclick="alert('记录成绩并返回题库')">下一题</div>
    </div>
  </div>
  <div class="tabbar">
    <div class="tab active" data-page="home" onclick="showPage('home', this, 'AI Agent 通识教程')">📚<br>课程</div>
    <div class="tab" data-page="quiz" onclick="showPage('quiz', this, '面试题库')">📝<br>题库</div>
    <div class="tab" data-page="mine" onclick="showPage('mine', this, '我的')">👤<br>我的</div>
  </div>
</div>
<script>
function showPage(id, tab, title) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (tab) tab.classList.add('active');
  document.getElementById('navTitle').textContent = title || 'AI Agent 通识教程';
  document.querySelector('.screen').scrollTop = 0;
}
document.querySelectorAll('.chapter-item').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-reader').classList.add('active');
    document.getElementById('navTitle').textContent = '章节阅读';
    document.querySelector('.screen').scrollTop = 0;
  });
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'miniprogram-preview.html'), html, 'utf8');
console.log('✅ 预览已生成: miniprogram-preview.html');
