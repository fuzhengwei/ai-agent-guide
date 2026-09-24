/**
 * 勇者冒险岛 · 闯关地图数据
 *
 * 世界观：玩家扮演一只小狐狸勇者，从营地出发，沿着蜿蜒的山路一路向北，
 * 穿过村庄、竹林、桥梁、瀑布……最终登上雪山顶的城堡，戴上王者之冠。
 *
 * 每关 = 10 道随机题（从该章题库抽取，库不足 10 题时取全部），
 * 全部答对 → 通关解锁下一关；错一题 → 原地休整重新挑战。
 * 通关后该关进入「自由练习」模式，不再影响解锁进度。
 */

// 7 个区域主题：背景渐变 / 草地 / 土地 / 描边
const ZONES = [
  { sky: ['#a8e6ff', '#e3f8ff'], grass: '#8fd96f', dirt: '#e8c97f', line: '#6ab84c' },  // 翠绿山谷
  { sky: ['#ffd9a8', '#ffefd6'], grass: '#ffc96b', dirt: '#f0b46a', line: '#e8a83c' },  // 金黄田野
  { sky: ['#aee8ff', '#e0f5ff'], grass: '#7fd8c9', dirt: '#cfe8b0', line: '#4db8a4' },  // 碧波湖畔
  { sky: ['#c9b8ff', '#ece5ff'], grass: '#b39df0', dirt: '#d9c7f5', line: '#8f6fd6' },  // 紫藤竹林
  { sky: ['#ffc4d6', '#ffe9f0'], grass: '#ff9db8', dirt: '#ffd3c2', line: '#f0708f' },  // 樱花高地
  { sky: ['#9fc8ff', '#dceaff'], grass: '#7faae8', dirt: '#c2d4f0', line: '#5b86c9' },  // 云端栈道
  { sky: ['#cfe2ff', '#f0f6ff'], grass: '#e8f1fb', dirt: '#f5f9ff', line: '#b8cfe8' },  // 冰雪之巅
];

// 28 关（对应 28 个章节题库，顺序即解锁链顺序）
const LEVELS = [
  { quizKey: 'ch00', name: '序章营地', icon: '⛺', monster: '🐤', zone: 0, px: 16, py: 1600 },
  { quizKey: 'ch01', name: '基础村',   icon: '🏡', monster: '🐌', zone: 0, px: 46, py: 1548 },
  { quizKey: 'ch02', name: '觉醒坡',   icon: '🌱', monster: '🐛', zone: 0, px: 78, py: 1498 },
  { quizKey: 'ch03', name: '助手驿站', icon: '📮', monster: '🐰', zone: 0, px: 76, py: 1440 },
  { quizKey: 'ch04', name: '咏唱泉',   icon: '⛲', monster: '🦆', zone: 1, px: 48, py: 1392 },
  { quizKey: 'ch26', name: '麦田磨坊', icon: '🌾', monster: '🐭', zone: 1, px: 20, py: 1346 },
  { quizKey: 'ch05', name: '思考风车', icon: '🎡', monster: '🦊', zone: 1, px: 17, py: 1288 },
  { quizKey: 'ch06', name: '记忆树洞', icon: '🌳', monster: '🐿️', zone: 1, px: 44, py: 1236 },
  { quizKey: 'ch07', name: '风车草原', icon: '🎠', monster: '🐗', zone: 2, px: 74, py: 1188 },
  { quizKey: 'ch08', name: '引擎河湾', icon: '⚙️', monster: '🦦', zone: 2, px: 81, py: 1130 },
  { quizKey: 'ch09', name: '外壳工坊', icon: '🔨', monster: '🦫', zone: 2, px: 57, py: 1076 },
  { quizKey: 'ch20', name: '检索湖心', icon: '🔍', monster: '🐸', zone: 2, px: 28, py: 1028 },
  { quizKey: 'ch27', name: '竹简书院', icon: '📜', monster: '🐼', zone: 3, px: 15, py: 974 },
  { quizKey: 'ch10', name: '工具铁匠铺', icon: '⚒️', monster: '🦔', zone: 3, px: 30, py: 918 },
  { quizKey: 'ch11', name: '接口码头', icon: '⚓', monster: '🦀', zone: 3, px: 58, py: 870 },
  { quizKey: 'ch12', name: '技能竹林', icon: '🎋', monster: '🐍', zone: 3, px: 81, py: 818 },
  { quizKey: 'ch13', name: '指令断崖', icon: '🪨', monster: '🦇', zone: 4, px: 76, py: 762 },
  { quizKey: 'ch14', name: '群英吊桥', icon: '🌉', monster: '🦉', zone: 4, px: 50, py: 712 },
  { quizKey: 'ch15', name: '图谱祭坛', icon: '🗿', monster: '🦎', zone: 4, px: 22, py: 668 },
  { quizKey: 'ch16', name: '框架集市', icon: '🏪', monster: '🐺', zone: 4, px: 15, py: 610 },
  { quizKey: 'ch17', name: '编排瞭望塔', icon: '🗼', monster: '🦅', zone: 5, px: 40, py: 560 },
  { quizKey: 'ch18', name: '终端洞窟', icon: '🕳️', monster: '🕷️', zone: 5, px: 68, py: 512 },
  { quizKey: 'ch19', name: '云端悬桥', icon: '⛓️', monster: '🐉', zone: 5, px: 82, py: 456 },
  { quizKey: 'ch21', name: '观测灯塔', icon: '🔭', monster: '👁️', zone: 5, px: 63, py: 404 },
  { quizKey: 'ch22', name: '守卫要塞', icon: '🛡️', monster: '🧌', zone: 6, px: 38, py: 356 },
  { quizKey: 'ch23', name: '部署船坞', icon: '🚢', monster: '🦑', zone: 6, px: 16, py: 306 },
  { quizKey: 'ch24', name: '加速熔炉', icon: '🔥', monster: '👺', zone: 6, px: 24, py: 250 },
  { quizKey: 'ch25', name: '雪山王城', icon: '🏰', monster: '🦁', zone: 6, px: 52, py: 206 },
];

// 终点王冠（第 28 关通关后点亮）
const CROWN = { px: 74, py: 168 };

// 每关需答对题数（全对通关）
const ROUND = 10;

// 固定的弯弯绕绕山路（basis 三次贝塞尔，画布坐标系 100 x 1700，y 从上到下递减推进）
const PATH_D =
  'M16,1600 C4,1588 24,1576 46,1548 ' +
  'C66,1524 94,1522 78,1498 C64,1476 62,1458 76,1440 ' +
  'C88,1422 72,1408 48,1392 C28,1378 8,1364 20,1346 ' +
  'C30,1330 4,1310 17,1288 C30,1264 28,1252 44,1236 ' +
  'C62,1218 58,1204 74,1188 C90,1170 94,1148 81,1130 ' +
  'C68,1112 72,1092 57,1076 C42,1058 44,1044 28,1028 ' +
  'C14,1012 6,992 15,974 C26,954 18,938 30,918 ' +
  'C44,898 44,888 58,870 C74,850 94,838 81,818 ' +
  'C68,798 90,782 76,762 C62,742 64,728 50,712 ' +
  'C36,696 34,684 22,668 C10,650 4,630 15,610 ' +
  'C28,590 24,578 40,560 C56,542 54,530 68,512 ' +
  'C82,494 94,476 82,456 C72,438 78,422 63,404 ' +
  'C50,388 52,372 38,356 C24,340 8,324 16,306 ' +
  'C24,290 14,270 24,250 C36,230 38,222 52,206 ' +
  'C64,192 66,180 74,168';

// 主题装饰（按区域渲染在路边，view 坐标同 PATH_D）
const DECORS = [
  { icon: '🏕️', x: 34, y: 1618, zone: 0, s: 1.15 },
  { icon: '🌲', x: 88, y: 1582, zone: 0 },
  { icon: '🌲', x: 6,  y: 1555, zone: 0 },
  { icon: '🌷', x: 60, y: 1570, zone: 0, s: 0.85 },
  { icon: '🍄', x: 26, y: 1516, zone: 0, s: 0.9 },
  { icon: '🌲', x: 90, y: 1468, zone: 0 },
  { icon: '🪨', x: 34, y: 1464, zone: 0, s: 0.8 },
  { icon: '🌻', x: 62, y: 1420, zone: 1, s: 0.95 },
  { icon: '🌾', x: 8,  y: 1416, zone: 1 },
  { icon: '🌻', x: 36, y: 1366, zone: 1, s: 0.9 },
  { icon: '🍞', x: 64, y: 1330, zone: 1, s: 0.8 },
  { icon: '🌾', x: 32, y: 1300, zone: 1 },
  { icon: '🐝', x: 60, y: 1258, zone: 1, s: 0.8 },
  { icon: '⛵', x: 88, y: 1212, zone: 2 },
  { icon: '💧', x: 50, y: 1214, zone: 2, s: 0.85 },
  { icon: '⛲', x: 40, y: 1152, zone: 2, s: 0.95 },
  { icon: '🌊', x: 92, y: 1104, zone: 2, s: 0.9 },
  { icon: '🐟', x: 30, y: 1102, zone: 2, s: 0.8 },
  { icon: '💧', x: 66, y: 1050, zone: 2, s: 0.85 },
  { icon: '🌸', x: 12, y: 1050, zone: 2, s: 0.9 },
  { icon: '🎋', x: 8,  y: 998,  zone: 3 },
  { icon: '🎋', x: 44, y: 952,  zone: 3 },
  { icon: '🍵', x: 68, y: 940,  zone: 3, s: 0.8 },
  { icon: '🏮', x: 10, y: 894,  zone: 3, s: 0.95 },
  { icon: '🎋', x: 44, y: 848,  zone: 3 },
  { icon: '⛩️', x: 88, y: 846,  zone: 3, s: 1 },
  { icon: '🌸', x: 92, y: 790,  zone: 4 },
  { icon: '🪨', x: 30, y: 786,  zone: 4, s: 0.9 },
  { icon: '🌸', x: 12, y: 740,  zone: 4 },
  { icon: '🌸', x: 64, y: 738,  zone: 4, s: 0.85 },
  { icon: '🌸', x: 38, y: 690,  zone: 4 },
  { icon: '⛩️', x: 6,  y: 646,  zone: 4, s: 0.9 },
  { icon: '🪨', x: 52, y: 640,  zone: 4, s: 0.85 },
  { icon: '☁️', x: 20, y: 588,  zone: 5 },
  { icon: '☁️', x: 66, y: 584,  zone: 5, s: 0.9 },
  { icon: '🎈', x: 88, y: 540,  zone: 5, s: 0.95 },
  { icon: '☁️', x: 24, y: 534,  zone: 5 },
  { icon: '🌈', x: 88, y: 486,  zone: 5, s: 1.05 },
  { icon: '☁️', x: 36, y: 478,  zone: 5, s: 0.85 },
  { icon: '❄️', x: 74, y: 380,  zone: 6, s: 0.9 },
  { icon: '🏔️', x: 12, y: 380,  zone: 6 },
  { icon: '❄️', x: 54, y: 330,  zone: 6, s: 0.85 },
  { icon: '🏔️', x: 78, y: 282,  zone: 6 },
  { icon: '❄️', x: 8,  y: 276,  zone: 6, s: 0.9 },
  { icon: '⭐', x: 90, y: 240,  zone: 6, s: 0.85 },
];

// 奖励宝箱（通关该关后点亮，再点有彩蛋文案）
const CHESTS = [
  { after: 3,  x: 90, y: 1410 },
  { after: 7,  x: 18, y: 1210 },
  { after: 12, x: 88, y: 1004 },
  { after: 16, x: 60,  y: 844  },
  { after: 20, x: 10, y: 668  },
  { after: 24, x: 88, y: 432  },
];

// 漂浮云朵（按区域配色深浅两组，做 CSS 位移动画）
const CLOUDS = [
  { x: 8,  y: 120,  s: 1.2, d: 0 },
  { x: 58, y: 90,   s: 0.9, d: 1 },
  { x: 22, y: 420,  s: 0.8, d: 2 },
  { x: 66, y: 620,  s: 1.0, d: 0 },
  { x: 10, y: 860,  s: 0.9, d: 1 },
  { x: 60, y: 1080, s: 1.1, d: 2 },
  { x: 14, y: 1300, s: 0.8, d: 0 },
  { x: 62, y: 1500, s: 1.0, d: 1 },
];

module.exports = { ZONES, LEVELS, CROWN, ROUND, PATH_D, DECORS, CHESTS, CLOUDS };
