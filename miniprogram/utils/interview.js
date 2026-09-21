/**
 * 模拟面试配置：面试官池（按风格分类）+ 评级映射 + 话术
 *
 * 面试官分四种风格：
 *   sharp  犀利施压型 —— 追问到底，点评直接，还原大厂压力面
 *   gentle 温柔引导型 —— 循循善诱，先肯定再补正，适合初学者
 *   boss   大厂实战型 —— 字节/美团/京东风格，紧盯工程落地与权衡取舍
 *   steady 稳重基础型 —— 老架构师，注重基本功与概念准确性
 *
 * pick(seed)：按场次序号自动轮换（兼容旧逻辑，保证同场次复访面试官一致）
 * pickByStyle(styleId, seed)：用户指定风格，在同风格池内按场次序号轮换
 */

const PANEL = [
  /* ---------- 稳重基础型 ---------- */
  {
    name: '林致远',
    initial: '林',
    title: 'AI 平台架构师 · 12 年经验',
    styleId: 'steady',
    styleName: '稳重基础',
    gradient: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
    open: [
      '你好，我是林致远，平时负责 AI 平台架构这块。',
      '这场面试我们围绕《{title}》展开，一共 {n} 道题。不用紧张，按你自己的理解说就好。',
    ],
    praise: [
      '嗯，这个点抓得准。',
      '对，思路是对的。',
      '回答得挺稳，看得出是真看过。',
      '不错，这块你理解到位了。',
    ],
    push: [
      '嗯……这个点我们得再对一下。',
      '这里容易踩坑，我补充一下。',
      '理解有点偏，我说一下标准答案。',
      '先别急，这道题我拆开讲。',
    ],
  },

  /* ---------- 温柔引导型 ---------- */
  {
    name: '苏晚',
    initial: '苏',
    title: '大模型应用负责人 · 8 年经验',
    styleId: 'gentle',
    styleName: '温柔引导',
    gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    open: [
      '你好呀，我是苏晚，平时带大模型应用落地的团队。',
      '今天这场面试围绕《{title}》，一共 {n} 道题，我们边聊边展开。',
    ],
    praise: [
      '挺好的，这个理解没问题。',
      '嗯嗯，说到点子上了。',
      '答得不错，看得出来有思考。',
      '对，这块你已经掌握了。',
    ],
    push: [
      '嗯，这里我们再捋一捋。',
      '这个细节容易混，我给你对一下。',
      '思路差一点点，正确姿势是这样的。',
      '别急，这道题我展开说说。',
    ],
  },
  {
    name: '温言',
    initial: '温',
    title: 'AI 技术教练 · 带教 100+ 工程师',
    styleId: 'gentle',
    styleName: '温柔引导',
    gradient: 'linear-gradient(135deg, #db2777, #9d174d)',
    open: [
      '你好，我是温言，面试风格偏轻松，就当是一次技术聊天。',
      '《{title}》这一章我们聊 {n} 道题，答错了也没关系，我会帮你把概念补齐。',
    ],
    praise: [
      '很好，这个角度我很喜欢。',
      '哇，这一点很多候选人都答不到。',
      '讲得很清楚，继续保持。',
      '对啦，就是这个意思。',
    ],
    push: [
      '没关系，这里很多人都会理解错，我来帮你理一下。',
      '差一点点就对了，我把正确答案给你讲讲。',
      '别有压力，这道题我们慢慢拆。',
      '这里我换个说法解释，你听听看。',
    ],
  },

  /* ---------- 犀利施压型 ---------- */
  {
    name: '陈默',
    initial: '陈',
    title: '技术总监 · Agent 方向',
    styleId: 'sharp',
    styleName: '犀利施压',
    gradient: 'linear-gradient(135deg, #0f766e, #115e59)',
    open: [
      '我是陈默，直接一点，今天聊《{title}》。',
      '一共 {n} 道题，我会问得比较细，答不上来也没关系，重点是搞清楚。',
    ],
    praise: [
      '可以，这个回答站得住。',
      '对，就是要这个答案。',
      '嗯，基本功在。',
      '答得干净利落。',
    ],
    push: [
      '不对，这里要重新想一下。',
      '这个答案我打个问号。',
      '嗯，差得有点远，我把标准答案说一下。',
      '这道题很多人栽在这里，你听我说。',
    ],
  },
  {
    name: '顾严',
    initial: '顾',
    title: '字节跳动 · 大模型算法专家',
    styleId: 'sharp',
    styleName: '犀利施压',
    gradient: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
    open: [
      '我是顾严，字节这边的算法面试官，风格比较直接。',
      '《{title}》，{n} 道题，我会一路追问到底，你尽量把原理讲透。',
    ],
    praise: [
      '嗯，这层理解可以。',
      '问到点子上了，继续。',
      '这个回答有深度，过。',
      '原理讲清楚了，我很满意。',
    ],
    push: [
      '停，这只是表面。往下再想一层。',
      '这个解释我不满意，听我说标准答案。',
      '不对。这个原理你根本没吃透，我讲一遍。',
      '面试里这么答会被挂掉的，听好。',
    ],
  },

  /* ---------- 大厂实战型 ---------- */
  {
    name: '周航',
    initial: '周',
    title: '美团 · Agent 应用落地负责人',
    styleId: 'boss',
    styleName: '大厂实战',
    gradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    open: [
      '我是周航，在美团做 Agent 业务落地，只聊能落地的方案。',
      '《{title}》这章 {n} 道题，重点看你的工程判断和取舍。',
    ],
    praise: [
      '嗯，这是能上生产的思路。',
      '对，工程上就该这么干。',
      '有落料，说明你真踩过坑。',
      '这个 tradeoff 讲得好。',
    ],
    push: [
      '方案能跑，但上线会出事，听我说生产环境的做法。',
      'Demo 思维了，我给你讲讲业务里怎么处理。',
      '这里光有原理不够，工程上要加防线。',
      '这个细节线上一定踩坑，我展开讲。',
    ],
  },
  {
    name: '韩玥',
    initial: '韩',
    title: '京东 · 电商 AI 架构师',
    styleId: 'boss',
    styleName: '大厂实战',
    gradient: 'linear-gradient(135deg, #e11d48, #881337)',
    open: [
      '你好，我是韩玥，京东电商 AI 方向，场景题会多一些。',
      '今天围绕《{title}》问 {n} 道题，注意结合业务场景来答。',
    ],
    praise: [
      '对，业务里就是这么用的。',
      '这个方案在真实场景里站得住。',
      '回答很完整，兼顾了成本和效果。',
      '不错，这就是我们要的答案。',
    ],
    push: [
      '放在大促的量级下，这个方案要出问题的，我讲一下正确做法。',
      '嗯，思路可以，但成本算过吗？听我说。',
      '这里业务约束你没考虑到，我补一下。',
      '这个做法在实际业务里走不通，正确姿势是这样。',
    ],
  },
];

const STYLE_IDS = ['sharp', 'gentle', 'boss', 'steady'];

// 评级（下标 = 星级 0~3）
const GRADES = [
  { grade: 'C', label: '暂不通过', brief: '未通过' },
  { grade: 'B', label: '勉强通过', brief: '通过' },
  { grade: 'A', label: '建议录用', brief: '推荐' },
  { grade: 'S', label: '强烈推荐', brief: '强推' },
];

// 面试官总评（下标 = 星级）
const REMARKS = [
  '坦白说，这一章你还不熟，先回去把内容读完，我们下次再聊。',
  '基本概念是有了，但深度不够，建议把错题涉及的点重新过一遍。',
  '整体是靠谱的，个别细节再抠一下就更稳了。',
  '这一章你基本吃透了，几乎每道题都踩在考点上。',
];

// 结束语（按正确率）
function closingByRatio(ratio) {
  if (ratio >= 0.9) return '好，我这边的问题问完了，这一章你答得很扎实。';
  if (ratio >= 0.7) return '嗯，问题问完了，整体还算扎实。';
  if (ratio >= 0.6) return '行，就先问到这里，有些点还需要再补。';
  return '好，我们今天就聊到这里吧。';
}

function pick(seed) {
  const n = Math.abs(Number(seed) || 0);
  return PANEL[n % PANEL.length];
}

// 按风格选面试官：同风格池内按 seed 轮换；风格无效时回退全池轮换
function pickByStyle(styleId, seed) {
  if (STYLE_IDS.indexOf(styleId) !== -1) {
    const pool = PANEL.filter(p => p.styleId === styleId);
    const n = Math.abs(Number(seed) || 0);
    return pool[n % pool.length];
  }
  return pick(seed);
}

function gradeOf(stars) {
  const s = Math.max(0, Math.min(3, Math.floor(Number(stars) || 0)));
  return { stars: s, grade: GRADES[s].grade, label: GRADES[s].label, brief: GRADES[s].brief, remark: REMARKS[s] };
}

module.exports = { PANEL, STYLE_IDS, pick, pickByStyle, gradeOf, closingByRatio };
