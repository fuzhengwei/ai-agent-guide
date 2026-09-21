/**
 * 模拟面试配置：面试官池 + 评级映射 + 话术
 * 场次（章节）序号决定面试官人选，保证同一场次复访时面试官一致。
 */

const PANEL = [
  {
    name: '林致远',
    initial: '林',
    title: 'AI 平台架构师 · 12 年经验',
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
  {
    name: '苏晚',
    initial: '苏',
    title: '大模型应用负责人 · 8 年经验',
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
    name: '陈默',
    initial: '陈',
    title: '技术总监 · Agent 方向',
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
];

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

function gradeOf(stars) {
  const s = Math.max(0, Math.min(3, Math.floor(Number(stars) || 0)));
  return { stars: s, grade: GRADES[s].grade, label: GRADES[s].label, brief: GRADES[s].brief, remark: REMARKS[s] };
}

module.exports = { PANEL, pick, gradeOf, closingByRatio };
