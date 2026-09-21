/**
 * 混合面试模式：跨章节随机组题
 *
 * MODES 定义所有混合面试方式；build(mode, bankIndex, records) 负责组题：
 *   - 普通模式：从 keys 指定的题库轮转抽题（保证每章覆盖面），打乱后截取 count 道
 *   - 错题重练：从各场面试的历史错题（store 记录的 wrongIds）中抽取，答对后自动移出错题本
 *
 * bankIndex 为 packages/quiz/data/index.js 的映射（key → 题目数组，另有 index 字段需跳过）
 */
const ALL_CH_KEYS = Array.from({ length: 28 }, (_, i) => 'ch' + String(i).padStart(2, '0'));

const MODES = [
  {
    id: 'mix_all', name: '全真模拟', emoji: '🎯',
    desc: '全课程随机抽题 · 还原真实面试',
    keys: 'ALL', count: 10, hot: true,
  },
  {
    id: 'mix_basic', name: '基础概念', emoji: '🌱',
    desc: 'LLM / Agent / 提示词',
    keys: ['ch00', 'ch01', 'ch02', 'ch03', 'ch04'], count: 8,
  },
  {
    id: 'mix_core', name: '核心机制', emoji: '⚙️',
    desc: 'ReAct · 记忆 · 运行时 · RAG',
    keys: ['ch05', 'ch06', 'ch07', 'ch08', 'ch09', 'ch20'], count: 10,
  },
  {
    id: 'mix_tool', name: '工具实战', emoji: '🛠️',
    desc: 'FC · MCP · Skills · 多 Agent',
    keys: ['ch10', 'ch11', 'ch12', 'ch13', 'ch14'], count: 10,
  },
  {
    id: 'mix_eng', name: '工程进阶', emoji: '🏔️',
    desc: '评估 · 安全 · 部署 · 推理',
    keys: ['ch21', 'ch22', 'ch23', 'ch24', 'ch25'], count: 10,
  },
  {
    id: 'mix_boss', name: '大厂真题混打', emoji: '🏢',
    desc: '字节/美团/京东题混着来',
    keys: ['bytedance', 'meituan', 'jd'], count: 10, hot: true,
  },
  {
    id: 'mix_wrong', name: '错题重练', emoji: '🔁',
    desc: '集中消灭历史错题 · 答对移出',
    wrong: true,
  },
];

function byId(id) {
  return MODES.find(m => m.id === id) || null;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// 错题本：汇总所有场次的 wrongIds
function collectWrongIds(records) {
  const ids = [];
  Object.keys(records || {}).forEach(k => {
    (records[k].wrongIds || []).forEach(id => {
      if (ids.indexOf(id) === -1) ids.push(id);
    });
  });
  return ids;
}

function build(mode, bankIndex, records) {
  if (!mode) return [];

  // 错题重练：从全量题库中按 id 捞回错题
  if (mode.wrong) {
    const ids = collectWrongIds(records);
    if (!ids.length) return [];
    const idSet = {};
    ids.forEach(id => { idSet[id] = true; });
    const pool = [];
    Object.keys(bankIndex || {}).forEach(k => {
      if (k === 'index' || !Array.isArray(bankIndex[k])) return;
      bankIndex[k].forEach(q => { if (q && idSet[q.id]) pool.push(q); });
    });
    return shuffle(pool).slice(0, 15);
  }

  // 普通模式：各章轮转抽题，保证覆盖面，最后整体打乱
  const keys = mode.keys === 'ALL' ? ALL_CH_KEYS : (mode.keys || []);
  const buckets = keys
    .map(k => (Array.isArray(bankIndex[k]) ? shuffle(bankIndex[k]) : []))
    .filter(b => b.length);
  const picked = [];
  let round = 0;
  while (picked.length < mode.count && buckets.some(b => b.length > round)) {
    buckets.forEach(b => {
      if (picked.length < mode.count && b[round]) picked.push(b[round]);
    });
    round++;
  }
  return shuffle(picked);
}

module.exports = { MODES, byId, build, collectWrongIds };
