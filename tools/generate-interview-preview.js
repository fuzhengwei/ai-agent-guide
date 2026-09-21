/**
 * 生成模拟面试交互预览页 interview-preview.html
 * 复用小程序真实数据（题库 + 面试官池 + 评级规则），在浏览器里 1:1 演示面试对话流程
 * 用法：node tools/generate-interview-preview.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const chapters = require(path.join(ROOT, 'miniprogram/data/chapters.js'));
const bank = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/quiz-bank.json'), 'utf8'));
const ivSrc = fs.readFileSync(path.join(ROOT, 'miniprogram/utils/interview.js'), 'utf8');
const storeSrc = fs.readFileSync(path.join(ROOT, 'miniprogram/utils/store.js'), 'utf8');

// 预览场次：取前 4 章，覆盖不同题量
const DEMO = chapters.filter(c => c.quizKey && bank[c.quizKey] && bank[c.quizKey].length).slice(0, 4);

const payload = DEMO.map((c, i) => {
  const ivMod = { exports: {} };
  new Function('module', 'exports', ivSrc)(ivMod, ivMod.exports);
  const iv = ivMod.exports.pick(i);
  return {
    key: c.quizKey,
    title: c.title,
    iv: {
      name: iv.name, initial: iv.initial, title: iv.title, gradient: iv.gradient,
      open: iv.open, praise: iv.praise, push: iv.push,
    },
    questions: bank[c.quizKey],
  };
});

const totalQ = payload.reduce((s, p) => s + p.questions.length, 0);

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模拟面试 · 交互预览 | AI Agent 通识教程</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #eef0f5; color: #111827; min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC",
      "HarmonyOS Sans SC", "MiSans", "OPPO Sans", "Source Han Sans SC",
      "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 30px 20px 60px;
  }
  .page-head { max-width: 1080px; margin: 0 auto 24px; }
  .page-head h1 { font-size: 26px; font-weight: 800; letter-spacing: .5px; }
  .page-head h1 span { font-size: 14px; font-weight: 500; color: #6b7280; margin-left: 10px; }
  .page-head p { font-size: 14px; color: #6b7280; margin-top: 10px; line-height: 1.7; }

  .layout { max-width: 1080px; margin: 0 auto; display: flex; gap: 28px; align-items: flex-start; flex-wrap: wrap; }

  /* ---------- 手机框 ---------- */
  .phone {
    width: 375px; height: 748px; flex-shrink: 0; background: #eef0f5;
    border-radius: 40px; box-shadow: 0 24px 60px rgba(15,23,42,.22), 0 0 0 10px #1f2937;
    overflow: hidden; display: flex; flex-direction: column; position: relative;
  }
  .statusbar {
    height: 26px; flex-shrink: 0; background: #fff; display: flex; align-items: center;
    justify-content: space-between; padding: 0 18px; font-size: 11px; font-weight: 600; color: #111827;
  }
  .navbar {
    height: 42px; flex-shrink: 0; background: #fff; display: flex; align-items: center;
    justify-content: center; position: relative; border-bottom: 1px solid #e9ecf1;
    font-size: 15px; font-weight: 600;
  }
  .navbar .back { position: absolute; left: 16px; font-size: 16px; color: #374151; }

  /* 面试官条 */
  .iv-bar { flex-shrink: 0; display: flex; align-items: center; padding: 10px 13px; background: #fff; border-bottom: 1px solid #e9ecf1; }
  .avatar {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; color: #fff;
    font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 8px rgba(15,23,42,.16);
  }
  .avatar.sm { width: 30px; height: 30px; border-radius: 8px; font-size: 13px; margin-right: 8px; box-shadow: none; }
  .iv-info { flex: 1; overflow: hidden; margin-left: 9px; }
  .iv-name { font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
  .iv-online { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
  .iv-title { font-size: 10.5px; color: #94a3b8; margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .iv-progress { flex-shrink: 0; font-size: 11px; font-weight: 600; color: #2563eb; background: #eff6ff; padding: 5px 9px; border-radius: 99px; }

  /* 聊天区 */
  .chat { flex: 1; overflow-y: auto; padding: 0 12px; scroll-behavior: smooth; }
  .chat::-webkit-scrollbar { width: 0; }
  .day { text-align: center; font-size: 10.5px; color: #a3adbd; margin: 11px 0 13px; }
  .chat-pad { height: 16px; }

  .row { display: flex; align-items: flex-start; margin-bottom: 12px; animation: bubble-in .26s ease both; }
  .row.iv { justify-content: flex-start; }
  .row.me { justify-content: flex-end; }
  @keyframes bubble-in { from { opacity: 0; transform: translateY(7px) scale(.98); } to { opacity: 1; transform: none; } }

  .bubble { padding: 10px 12px; font-size: 14px; line-height: 1.6; word-break: break-word; max-width: 258px; }
  .bubble.iv { background: #fff; color: #1f2937; border-radius: 3px 10px 10px 10px; box-shadow: 0 1px 5px rgba(15,23,42,.05); }
  .bubble.iv.question { border-left: 3px solid #2563eb; }
  .q-label { font-size: 10.5px; font-weight: 700; color: #2563eb; letter-spacing: .5px; margin-bottom: 5px; }
  .q-body { font-size: 14.5px; font-weight: 600; line-height: 1.55; }
  .bubble.iv.ok { border-left: 3px solid #22c55e; }
  .bubble.iv.bad { border-left: 3px solid #f97316; }
  .v-tag { font-size: 10.5px; font-weight: 700; margin-bottom: 4px; }
  .bubble.iv.ok .v-tag { color: #16a34a; }
  .bubble.iv.bad .v-tag { color: #ea580c; }
  .bubble.iv.analysis { border-radius: 10px; border: 1px solid #e6e9f0; }
  .an-title { font-size: 11px; font-weight: 700; color: #7c3aed; margin-bottom: 6px; }
  .an-answer { font-size: 13px; font-weight: 700; color: #15803d; line-height: 1.5; background: #f0fdf4; border-radius: 6px; padding: 7px 9px; margin-bottom: 7px; }
  .an-body { font-size: 13px; color: #4b5563; line-height: 1.75; }
  .bubble.iv.note { background: #fefce8; color: #854d0e; border-left: 3px solid #facc15; font-size: 13px; }

  .bubble.me.answer { background: #95ec69; color: #10281a; border-radius: 10px 3px 10px 10px; box-shadow: 0 1px 5px rgba(21,128,61,.14); }
  .ans-tag { font-size: 10px; font-weight: 700; color: #3f7a45; margin-bottom: 3px; }
  .me-avatar {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; margin-left: 8px;
    background: linear-gradient(135deg,#64748b,#334155); color: #fff; font-size: 12px;
    display: flex; align-items: center; justify-content: center;
  }

  .bubble.iv.typing { display: flex; align-items: center; padding: 12px 13px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; margin-right: 5px; animation: blink 1.2s infinite; }
  .dot:nth-child(2) { animation-delay: .2s; }
  .dot:nth-child(3) { animation-delay: .4s; margin-right: 0; }
  @keyframes blink { 0%,60%,100% { opacity: .35; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }

  /* 回答区 */
  .answer-panel {
    flex-shrink: 0; background: #fff; border-top: 1px solid #e9ecf1;
    padding: 11px 12px 14px; box-shadow: 0 -3px 12px rgba(15,23,42,.06); animation: panel-in .3s ease both;
  }
  @keyframes panel-in { from { transform: translateY(15px); opacity: 0; } to { transform: none; opacity: 1; } }
  .ap-tip { font-size: 10.5px; color: #9aa4b2; margin-bottom: 7px; }
  .ap-opt {
    display: flex; align-items: flex-start; padding: 10px 11px; margin-bottom: 7px;
    border: 1px solid #e6e9f0; border-radius: 8px; background: #fbfcfe; cursor: pointer; transition: all .15s;
  }
  .ap-opt:hover { border-color: #bfdbfe; background: #f5f9ff; }
  .ap-opt.picked { border-color: #2563eb; background: #eff6ff; }
  .ap-letter {
    width: 21px; height: 21px; border-radius: 50%; flex-shrink: 0; margin-right: 8px;
    background: #eef2f7; color: #64748b; font-size: 11.5px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .ap-opt.picked .ap-letter { background: #2563eb; color: #fff; }
  .ap-text { flex: 1; font-size: 13px; color: #374151; line-height: 1.5; }
  .ap-send { margin-top: 4px; text-align: center; padding: 11px; border-radius: 99px; background: #e9edf3; color: #9aa4b2; font-size: 14px; font-weight: 600; cursor: pointer; }
  .ap-send.on { background: #2563eb; color: #fff; box-shadow: 0 4px 10px rgba(37,99,235,.25); }

  .answer-hint {
    flex-shrink: 0; background: #fff; border-top: 1px solid #e9ecf1; padding: 14px 0;
    text-align: center; font-size: 11px; color: #a3adbd;
  }
  .hint-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; margin-right: 6px; animation: blink 1.4s infinite; }

  /* 报告 */
  .report { flex: 1; overflow-y: auto; padding: 12px; }
  .report::-webkit-scrollbar { width: 0; }
  .rp-hero {
    position: relative; overflow: hidden; text-align: center; color: #fff;
    background: linear-gradient(150deg,#1e1b4b 0%,#4c1d95 62%,#6d28d9 100%);
    border-radius: 14px; padding: 22px 16px 20px; box-shadow: 0 6px 18px rgba(76,29,149,.28);
  }
  .rp-deco { position: absolute; width: 130px; height: 130px; border-radius: 50%; background: #fff; opacity: .08; right: -40px; top: -50px; }
  .rp-avatar { width: 44px; height: 44px; border-radius: 12px; margin: 0 auto 8px; color: #fff; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .rp-from { font-size: 12px; opacity: .82; }
  .rp-grade { font-size: 56px; font-weight: 900; line-height: 1.15; letter-spacing: 2px; }
  .rp-grade.g3 { color: #fde047; }
  .rp-grade.g2 { color: #93c5fd; }
  .rp-grade.g1 { color: #6ee7b7; }
  .rp-grade.g0 { color: #fda4af; }
  .rp-grade-label { font-size: 15px; font-weight: 700; margin-top: -3px; }
  .rp-remark { font-size: 12.5px; line-height: 1.7; opacity: .88; margin-top: 11px; text-align: left; }
  .rp-stats { display: flex; align-items: center; background: #fff; border-radius: 11px; padding: 13px 0; margin-top: 11px; }
  .rp-stat { flex: 1; text-align: center; }
  .rp-stat-num { font-size: 16px; font-weight: 800; }
  .rp-stat-num small { font-size: 10.5px; font-weight: 400; color: #9aa4b2; }
  .rp-stat-label { font-size: 10.5px; color: #9aa4b2; margin-top: 3px; }
  .rp-divider { width: 1px; height: 23px; background: #eef1f6; }
  .rp-card { background: #fff; border-radius: 11px; padding: 14px 13px; margin-top: 11px; }
  .rp-card-title { font-size: 14px; font-weight: 700; margin-bottom: 10px; }
  .rp-card-title small { font-size: 11px; font-weight: 400; color: #9aa4b2; }
  .rp-sheet { display: flex; flex-wrap: wrap; gap: 7px; }
  .rp-cell { width: 34px; height: 34px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
  .rp-cell.right { background: #dcfce7; color: #15803d; }
  .rp-cell.wrong { background: #ffe4e6; color: #be123c; }
  .rp-item { border-top: 1px solid #f1f4f8; padding-top: 11px; margin-top: 11px; }
  .rp-item:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
  .rp-q { font-size: 13px; font-weight: 600; line-height: 1.55; }
  .rp-a { font-size: 12.5px; color: #15803d; background: #f0fdf4; border-radius: 6px; padding: 7px 9px; margin-top: 6px; line-height: 1.5; }
  .rp-e { font-size: 12px; color: #6b7280; line-height: 1.7; margin-top: 6px; }
  .rp-perfect { text-align: center; padding: 18px 0; }
  .rp-perfect div:first-child { font-size: 32px; }
  .rp-perfect div:last-child { font-size: 13px; color: #15803d; font-weight: 600; margin-top: 6px; }
  .rp-actions { display: flex; gap: 10px; margin-top: 15px; }
  .rp-btn { flex: 1; text-align: center; padding: 13px 0; border-radius: 99px; font-size: 14px; font-weight: 700; cursor: pointer; }
  .rp-btn.ghost { background: #fff; color: #475569; border: 1px solid #e2e8f0; }
  .rp-btn.primary { background: linear-gradient(135deg,#2563eb,#6d28d9); color: #fff; box-shadow: 0 5px 12px rgba(37,99,235,.28); }
  .rp-foot { text-align: center; font-size: 10.5px; color: #a3adbd; margin: 13px 0 20px; }

  /* ---------- 右侧说明 ---------- */
  .side { flex: 1; min-width: 300px; }
  .card { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 2px 14px rgba(15,23,42,.06); margin-bottom: 16px; }
  .card h2 { font-size: 15px; font-weight: 700; margin-bottom: 12px; }
  .card p { font-size: 13px; color: #4b5563; line-height: 1.8; }
  .card ul { list-style: none; }
  .card li { font-size: 13px; color: #4b5563; line-height: 1.8; padding-left: 18px; position: relative; margin-bottom: 4px; }
  .card li::before { content: "·"; position: absolute; left: 6px; color: #2563eb; font-weight: 800; }
  .ctrl { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .ctrl button {
    font-family: inherit; font-size: 12.5px; font-weight: 600; color: #475569;
    background: #fff; border: 1px solid #e2e8f0; border-radius: 99px; padding: 8px 14px; cursor: pointer; transition: all .15s;
  }
  .ctrl button:hover { border-color: #bfdbfe; color: #2563eb; }
  .ctrl button.active { background: #2563eb; border-color: #2563eb; color: #fff; }
  .ctrl .label { font-size: 12px; color: #9aa4b2; align-self: center; margin-right: 2px; }
  .hint { font-size: 12px; color: #9aa4b2; line-height: 1.7; }
  .kbd { background: #f1f5f9; border-radius: 4px; padding: 1px 5px; font-size: 11px; }
</style>
</head>
<body>

<div class="page-head">
  <h1>🎤 模拟面试 · 交互预览<span>AI Agent 通识教程 · 小程序题库改版</span></h1>
  <p>面试官以聊天方式逐题提问，你点选答案后，面试官当场点评并给出标准答案，最后出一份面试反馈。下面是可点击的真实交互（数据取自 ${payload.length} 个真实题库，共 ${totalQ} 道题）。</p>
</div>

<div class="layout">
  <div class="phone" id="phone">
    <div class="statusbar"><span>9:41</span><span>●●●●  5G  ▮</span></div>
    <div class="navbar"><span class="back">‹</span>模拟面试</div>
    <div id="app" style="flex:1;display:flex;flex-direction:column;overflow:hidden;"></div>
  </div>

  <div class="side">
    <div class="card">
      <h2>选择面试场次</h2>
      <div class="ctrl" id="chCtrl"></div>
      <div class="ctrl">
        <span class="label">语速</span>
        <button data-speed="1" class="active">正常</button>
        <button data-speed="2">2×</button>
        <button data-speed="4">4×</button>
      </div>
      <div class="ctrl">
        <button id="btnFast">一键答完看报告</button>
        <button id="btnRestart">重新开始</button>
      </div>
      <p class="hint">面试官按场次轮换（林致远 / 苏晚 / 陈默），不同面试官点评语气不同。打字中会有省略号动效，回答区在面试官问完后才出现。</p>
    </div>

    <div class="card">
      <h2>这一版改了什么</h2>
      <ul>
        <li>题库 Tab：闯关地图 → <b>面试大厅</b>，每章一场面试，显示面试官、题量、预计时长与评级</li>
        <li>答题页：生命值 / 30 秒倒计时 / 连击飘分 → <b>聊天对话流</b>（面试官头像 + 气泡 + 打字动效）</li>
        <li>作答即"发消息"：点选项 → 选项变成绿色「我的回答」气泡</li>
        <li>每题即时反馈：答对给「面试官点评 + 考点延伸」，答错给「面试官纠正 + 标准答案」</li>
        <li>每 5 题一次阶段性反馈，让对话有节奏</li>
        <li>结算 → <b>面试反馈报告</b>：S / A / B / C 评级 + 逐题表现 + 面试官建议复习的点</li>
      </ul>
    </div>

    <div class="card">
      <h2>评级规则（沿用原有通过线）</h2>
      <p><b>S 强烈推荐</b> ≥ 90% · <b>A 建议录用</b> ≥ 70% · <b>B 勉强通过</b> ≥ 60% · <b>C 暂不通过</b> &lt; 60%</p>
      <p style="margin-top:8px;">通关线与"解锁下一场"的判断沿用原来的正确率 ≥ 60%，历史做题记录、解锁链、我的页统计全部兼容，不需要清缓存。</p>
    </div>
  </div>
</div>

<script>
/* ===== 复用小程序源码：面试官池 / 评级 / 正确率规则 ===== */
const IV_SRC = ${JSON.stringify(ivSrc)};
const STORE_SRC = ${JSON.stringify(storeSrc)};
function loadModule(src) {
  const mod = { exports: {} };
  new Function('module', 'exports', src)(mod, mod.exports);
  return mod.exports;
}
const IV = loadModule(IV_SRC);
const store = loadModule(STORE_SRC);
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SESSIONS = ${JSON.stringify(payload)};
const DATE_TEXT = (() => {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
})();

/* ===== 状态 ===== */
let S = { idx: 0, speed: 1, session: 0, seq: 0, msgs: [], questions: [], iv: null, index: 0,
          selected: [], multiMode: false, awaiting: false, correct: 0, results: [], startTime: 0, finished: false };

const app = document.getElementById('app');

function el(tag, cls, html) {
  const d = document.createElement(tag);
  if (cls) d.className = cls;
  if (html != null) d.innerHTML = html;
  return d;
}
function esc(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }
function pickRandom(a) { return a[Math.floor(Math.random() * a.length)]; }
const D = ms => Math.round(ms / S.speed);

/* ===== 骨架 ===== */
function renderShell() {
  app.innerHTML = '';
  const bar = el('div', 'iv-bar');
  bar.appendChild(el('div', 'avatar', S.iv.initial)).style.background = S.iv.gradient;
  const info = el('div', 'iv-info');
  info.appendChild(el('div', 'iv-name', esc(S.iv.name) + '<span class="iv-online"></span>'));
  info.appendChild(el('div', 'iv-title', esc(S.iv.title)));
  bar.appendChild(info);
  bar.appendChild(el('div', 'iv-progress', '第 ' + (S.index + 1) + ' / ' + S.questions.length + ' 题'));
  app.appendChild(bar);

  const chat = el('div', 'chat'); chat.id = 'chat';
  chat.appendChild(el('div', 'day', DATE_TEXT));
  app.appendChild(chat);

  const bottom = el('div'); bottom.id = 'bottom';
  app.appendChild(bottom);
  return chat;
}

function bottomSlot() { return document.getElementById('bottom'); }

function renderAnswerPanel() {
  const slot = bottomSlot();
  if (!S.awaiting) {
    slot.innerHTML = '<div class="answer-hint"><span class="hint-dot"></span>面试中…</div>';
    return;
  }
  const panel = el('div', 'answer-panel');
  panel.appendChild(el('div', 'ap-tip', S.multiMode ? '这道题是多选 · 选好后点发送' : '点击选项即可作答'));
  S.questions[S.index].options.forEach((text, i) => {
    const o = el('div', 'ap-opt' + (S.selected.indexOf(i) !== -1 ? ' picked' : ''));
    o.appendChild(el('div', 'ap-letter', LETTERS[i]));
    o.appendChild(el('div', 'ap-text', esc(text)));
    o.onclick = () => pickOption(i);
    panel.appendChild(o);
  });
  if (S.multiMode) {
    const btn = el('div', 'ap-send' + (S.selected.length ? ' on' : ''), '发送回答（已选 ' + S.selected.length + ' 项）');
    btn.onclick = sendMulti;
    panel.appendChild(btn);
  }
  slot.innerHTML = '';
  slot.appendChild(panel);
}

/* ===== 消息 ===== */
function appendMsg(m) {
  const chat = document.getElementById('chat');
  const row = el('div', 'row ' + (m.role === 'me' ? 'me' : 'iv'));
  if (m.role === 'me') {
    const b = el('div', 'bubble me answer');
    b.appendChild(el('div', 'ans-tag', '我的回答'));
    b.appendChild(el('div', '', esc(m.text)));
    row.appendChild(b);
    row.appendChild(el('div', 'me-avatar', '我'));
  } else {
    const av = el('div', 'avatar sm', S.iv.initial); av.style.background = S.iv.gradient;
    row.appendChild(av);
    if (m.kind === 'question') {
      const b = el('div', 'bubble iv question');
      b.appendChild(el('div', 'q-label', esc(m.label)));
      b.appendChild(el('div', 'q-body', esc(m.text)));
      row.appendChild(b);
    } else if (m.kind === 'ok' || m.kind === 'bad') {
      const b = el('div', 'bubble iv ' + m.kind);
      b.appendChild(el('div', 'v-tag', m.kind === 'ok' ? '面试官点评' : '面试官纠正'));
      b.appendChild(el('div', '', esc(m.text)));
      row.appendChild(b);
    } else if (m.kind === 'analysis') {
      const b = el('div', 'bubble iv analysis');
      b.appendChild(el('div', 'an-title', esc(m.title)));
      if (m.answerText) b.appendChild(el('div', 'an-answer', esc(m.answerText)));
      if (m.text) b.appendChild(el('div', 'an-body', esc(m.text)));
      row.appendChild(b);
    } else if (m.kind === 'note') {
      row.appendChild(el('div', 'bubble iv note', esc(m.text)));
    } else {
      row.appendChild(el('div', 'bubble iv', esc(m.text)));
    }
  }
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
  S.msgs.push(m);
}

function showTyping(on) {
  const chat = document.getElementById('chat');
  const old = document.getElementById('typingRow');
  if (old) old.remove();
  if (!on) return;
  const row = el('div', 'row iv'); row.id = 'typingRow';
  const av = el('div', 'avatar sm', S.iv.initial); av.style.background = S.iv.gradient;
  row.appendChild(av);
  const b = el('div', 'bubble iv typing');
  b.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  row.appendChild(b);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function say(list, done) {
  const my = S.session;
  let i = 0;
  const step = () => {
    if (my !== S.session) return;
    if (i >= list.length) { if (done) done(); return; }
    const msg = list[i];
    showTyping(true);
    const wait = Math.min(420 + (msg.text || '').length * 12, 1200);
    setTimeout(() => {
      if (my !== S.session) return;
      showTyping(false);
      appendMsg(msg);
      i++;
      setTimeout(step, D(240));
    }, D(wait));
  };
  step();
}

/* ===== 出题 / 作答 ===== */
function ask(i) {
  const q = S.questions[i];
  S.index = i;
  S.awaiting = false;
  S.selected = [];
  S.multiMode = q.type === 'multi' || (Array.isArray(q.answer) && q.answer.length > 1);
  renderShellProgress();
  renderAnswerPanel();
  say([{ role: 'iv', kind: 'question', label: '问题 ' + (i + 1) + ' / ' + S.questions.length, text: q.question }], () => {
    if (i !== S.index) return;
    S.awaiting = true;
    renderAnswerPanel();
  });
}

function renderShellProgress() {
  const p = document.querySelector('.iv-progress');
  if (p) p.textContent = '第 ' + (S.index + 1) + ' / ' + S.questions.length + ' 题';
}

function pickOption(i) {
  if (!S.awaiting) return;
  if (S.multiMode) {
    const pos = S.selected.indexOf(i);
    if (pos === -1) S.selected.push(i); else S.selected.splice(pos, 1);
    renderAnswerPanel();
    return;
  }
  send([i]);
}

function sendMulti() {
  if (!S.selected.length) return;
  send(S.selected.slice());
}

function send(sel) {
  const q = S.questions[S.index];
  const right = Array.isArray(q.answer) ? q.answer : [q.answer];
  const ok = right.length === sel.length && right.every(a => sel.indexOf(a) !== -1) && sel.every(a => right.indexOf(a) !== -1);
  S.results[S.index] = ok;
  if (ok) S.correct++;
  S.awaiting = false;
  S.selected = [];
  renderAnswerPanel();

  appendMsg({
    role: 'me', kind: 'answer',
    text: sel.slice().sort((a, b) => a - b).map(i => LETTERS[i] + '. ' + q.options[i]).join('；'),
  });

  const lines = [{ role: 'iv', kind: ok ? 'ok' : 'bad', text: pickRandom(ok ? S.iv.praise : S.iv.push) }];
  if (ok) {
    if (q.explanation) lines.push({ role: 'iv', kind: 'analysis', title: '考点延伸', text: q.explanation });
  } else {
    lines.push({
      role: 'iv', kind: 'analysis', title: '面试官给你的标准答案',
      answerText: right.map(a => LETTERS[a] + '. ' + q.options[a]).join('；'),
      text: q.explanation || '',
    });
  }

  say(lines, () => {
    const i = S.index;
    if (i >= S.questions.length - 1) return finish();
    const done = i + 1;
    if (done % 5 === 0 && done < S.questions.length) {
      const r = S.correct / done;
      const note = r >= 0.8 ? '前面这几个问题答得都不错，我们保持这个节奏。'
        : r >= 0.5 ? '嗯，中间有几处需要留意，我们接着往下。'
        : '前面这部分基础还不太牢，后面的题我讲细一点。';
      say([{ role: 'iv', kind: 'note', text: note }], () => ask(i + 1));
      return;
    }
    ask(i + 1);
  });
}

/* ===== 报告 ===== */
function finish() {
  const total = S.questions.length;
  const correct = S.correct;
  const ratio = total ? correct / total : 0;
  const stars = store.calcStars(correct, total);
  const g = IV.gradeOf(stars);
  const score = correct * 10 + (ratio === 1 ? 20 : 0);
  const secs = Math.max(1, Math.round((Date.now() - S.startTime) / 1000));
  const duration = Math.floor(secs / 60) + ' 分 ' + (secs % 60) + ' 秒';

  const wrongs = S.questions.map((q, i) => {
    if (S.results[i]) return null;
    const right = Array.isArray(q.answer) ? q.answer : [q.answer];
    return { n: i + 1, q: q.question, a: right.map(x => LETTERS[x] + '. ' + q.options[x]).join('；'), e: q.explanation || '' };
  }).filter(Boolean);

  say([
    { role: 'iv', kind: 'plain', text: '好，我这边的问题问完了。' },
    { role: 'iv', kind: 'plain', text: IV.closingByRatio(ratio) },
  ], () => {
    S.finished = true;
    renderReport({ stars, g, correct, total, ratio, score, duration, wrongs,
      sheet: S.questions.map((q, i) => ({ n: i + 1, ok: !!S.results[i] })) });
  });
}

function renderReport(r) {
  app.innerHTML = '';
  const wrap = el('div', 'report');
  const hero = el('div', 'rp-hero');
  hero.appendChild(el('div', 'rp-deco'));
  const av = el('div', 'rp-avatar', S.iv.initial); av.style.background = S.iv.gradient;
  hero.appendChild(av);
  hero.appendChild(el('div', 'rp-from', esc(S.iv.name) + ' 的面试反馈'));
  hero.appendChild(el('div', 'rp-grade g' + r.stars, r.g.grade));
  hero.appendChild(el('div', 'rp-grade-label', r.g.label));
  hero.appendChild(el('div', 'rp-remark', '“' + r.g.remark + '”'));
  wrap.appendChild(hero);

  const stats = el('div', 'rp-stats');
  stats.innerHTML =
    '<div class="rp-stat"><div class="rp-stat-num">' + r.correct + '<small>/' + r.total + '</small></div><div class="rp-stat-label">答对题数</div></div>' +
    '<div class="rp-divider"></div>' +
    '<div class="rp-stat"><div class="rp-stat-num">' + Math.round(r.ratio * 100) + '%</div><div class="rp-stat-label">正确率</div></div>' +
    '<div class="rp-divider"></div>' +
    '<div class="rp-stat"><div class="rp-stat-num">' + r.duration + '</div><div class="rp-stat-label">面试用时</div></div>';
  wrap.appendChild(stats);

  const sheetCard = el('div', 'rp-card');
  sheetCard.appendChild(el('div', 'rp-card-title', '逐题表现'));
  const grid = el('div', 'rp-sheet');
  r.sheet.forEach(c => grid.appendChild(el('div', 'rp-cell ' + (c.ok ? 'right' : 'wrong'), c.n)));
  sheetCard.appendChild(grid);
  wrap.appendChild(sheetCard);

  if (r.wrongs.length) {
    const c = el('div', 'rp-card');
    c.appendChild(el('div', 'rp-card-title', '面试官建议复习的点 <small>（' + r.wrongs.length + ' 题）</small>'));
    r.wrongs.forEach(w => {
      const item = el('div', 'rp-item');
      item.appendChild(el('div', 'rp-q', w.n + '. ' + esc(w.q)));
      item.appendChild(el('div', 'rp-a', '✅ ' + esc(w.a)));
      if (w.e) item.appendChild(el('div', 'rp-e', esc(w.e)));
      c.appendChild(item);
    });
    wrap.appendChild(c);
  } else {
    const c = el('div', 'rp-card rp-perfect');
    c.innerHTML = '<div>🎊</div><div>全部答对，这一章的面试考点你已经完全掌握。</div>';
    wrap.appendChild(c);
  }

  const acts = el('div', 'rp-actions');
  const again = el('div', 'rp-btn ghost', '再面一次');
  again.onclick = () => start(S.idx);
  const next = el('div', 'rp-btn primary', '换一场面试 →');
  next.onclick = () => start((S.idx + 1) % SESSIONS.length);
  acts.appendChild(again); acts.appendChild(next);
  wrap.appendChild(acts);
  wrap.appendChild(el('div', 'rp-foot', '面试评级：S ≥ 90% · A ≥ 70% · B ≥ 60%（通过）'));
  app.appendChild(wrap);
}

/* ===== 启动 ===== */
function start(idx) {
  S.session++;
  S.idx = idx;
  const s = SESSIONS[idx];
  S.iv = s.iv;
  S.questions = s.questions;
  const speedBtn = document.querySelector('[data-speed].active');
  S.speed = speedBtn ? Number(speedBtn.dataset.speed) : 1;
  S.index = 0; S.seq = 0; S.msgs = []; S.selected = []; S.multiMode = false;
  S.awaiting = false; S.correct = 0; S.results = []; S.startTime = Date.now(); S.finished = false;
  document.querySelectorAll('#chCtrl button').forEach((b, i) => b.classList.toggle('active', i === idx));
  renderShell();
  renderAnswerPanel();
  // 与小程序同一套开场白（interview.js 的 open 模板）
  const lines = s.iv.open.map(t => t.replace('{title}', s.title).replace('{n}', s.questions.length));
  say(lines.map(text => ({ role: 'iv', kind: 'plain', text })), () => ask(0));
}

/* 场次按钮 */
const chCtrl = document.getElementById('chCtrl');
SESSIONS.forEach((s, i) => {
  const b = document.createElement('button');
  b.textContent = '第 ' + (i + 1) + ' 场 · ' + s.title.replace(/^第\\d+章\\s*/, '').slice(0, 8);
  b.onclick = () => start(i);
  chCtrl.appendChild(b);
});

/* 语速 */
document.querySelectorAll('[data-speed]').forEach(b => {
  b.onclick = () => {
    S.speed = Number(b.dataset.speed);
    document.querySelectorAll('[data-speed]').forEach(x => x.classList.toggle('active', x === b));
  };
});

/* 一键答完看报告 */
document.getElementById('btnFast').onclick = function () {
  if (S.finished) return;
  const my = S.session;
  const step = () => {
    if (my !== S.session) return;
    if (S.finished || S.index >= S.questions.length) return;
    if (!S.awaiting) { setTimeout(step, 40); return; }
    const q = S.questions[S.index];
    const right = Array.isArray(q.answer) ? q.answer : [q.answer];
    const wrongs = q.options.map((_, i) => i).filter(i => right.indexOf(i) === -1);
    // 随机对错，让报告有内容可看
    const ok = Math.random() > 0.35;
    const sel = ok ? right.slice() : (wrongs.length ? [wrongs[0]] : right.slice());
    S.speed = 64;
    send(sel);
    setTimeout(step, 60);
  };
  step();
};

document.getElementById('btnRestart').onclick = () => { start(S.idx); };

start(0);
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'interview-preview.html'), html, 'utf8');
console.log('已生成 interview-preview.html');
console.log('预览场次:', payload.map(p => `${p.key} ${p.title}(${p.questions.length}题 / ${p.iv.name})`).join('\n           '));
console.log('总题数:', totalQ, '| 文件大小:', (html.length / 1024).toFixed(1) + 'KB');
