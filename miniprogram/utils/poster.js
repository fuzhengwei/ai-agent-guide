/**
 * 学习成就海报生成器
 * 用 Canvas 绘制个人学习数据海报，含小程序码
 * 注意：Canvas 2d 的 drawImage 需要传 Image 对象，不能传路径字符串
 */

// 海报尺寸（iPhone 6 逻辑像素基准）
const W = 375;
const H = 700;

// 配色
const C = {
  bgStart: '#5a7cf7',
  bgEnd: '#4353c9',
  card: '#ffffff',
  primary: '#2563eb',
  text: '#1f2937',
  sub: '#6b7280',
  gold: '#f59e0b',
  silver: '#9ca3af',
  bronze: '#d97706',
};

// 激励文案池（按学习阶段）
const SLOGANS = {
  new: [
    '每一行代码，都是未来的基石',
    '开始，就是最好的时机',
    '学习之路，始于足下',
  ],
  learning: [
    '坚持就是胜利，你比想象中更强大',
    '每天进步一点点，一年后脱胎换骨',
    '知识的复利，正在悄悄积累',
  ],
  advanced: [
    '你已经超越了大多数人，继续加油',
    '高手之路，贵在持之以恒',
    '距离专家，只差一个坚持',
  ],
  master: [
    '学如逆水行舟，不进则退',
    '你已经是别人眼中的大神了',
    '保持热爱，奔赴山海',
  ],
};

function pickSlogan(readCount, total) {
  const r = total > 0 ? readCount / total : 0;
  const pool = r >= 0.8 ? SLOGANS.master : r >= 0.5 ? SLOGANS.advanced : r >= 0.2 ? SLOGANS.learning : SLOGANS.new;
  return pool[Math.floor(Math.random() * pool.length)];
}

function fmtMs(ms) {
  const mins = Math.floor((ms || 0) / 60000);
  if (mins < 60) return mins + ' 分钟';
  return Math.floor(mins / 60) + ' 小时 ' + (mins % 60) + ' 分';
}

/**
 * 绘制海报到 canvas
 * @param {object} ctx  Canvas 2d context
 * @param {object} canvas  Canvas 节点（用于 createImage）
 * @param {object} data 海报数据
 * @param {object} images { avatar?: Image, qrcode?: Image } 已加载的图片对象
 */
async function draw(ctx, canvas, data, images) {
  const {
    nickname = '学习者',
    totalStudyMs = 0,
    readCount = 0,
    totalChapters = 30,
    quizAttempts = 0,
    xp = 0,
    stars = 0,
    myRank = 0,
    totalCount = 0,
  } = data;
  const { avatar, qrcode } = images || {};

  // ===== 背景渐变 =====
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, C.bgStart);
  bg.addColorStop(1, C.bgEnd);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ===== 装饰圆 =====
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(W * 0.85, H * 0.12, 80, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W * 0.15, H * 0.25, 50, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W * 0.75, H * 0.55, 100, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;

  // ===== 顶部标题 =====
  ctx.fillStyle = 'rgba(255,255,255,.9)';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI Agent 通识教程', W / 2, 50);

  ctx.fillStyle = 'rgba(255,255,255,.65)';
  ctx.font = '12px sans-serif';
  ctx.fillText('30 章学会 Agent 开发 · 508 道大厂面试题', W / 2, 72);

  // ===== 主卡片 =====
  const cardX = 24;
  const cardY = 95;
  const cardW = W - cardX * 2;
  const cardH = 400;
  roundRect(ctx, cardX, cardY, cardW, cardH, 16, C.card);

  // 头像
  const avSize = 64;
  const avX = W / 2;
  const avY = cardY + 50;
  ctx.save();
  ctx.beginPath();
  ctx.arc(avX, avY, avSize / 2, 0, Math.PI * 2);
  ctx.clip();
  if (avatar) {
    ctx.drawImage(avatar, avX - avSize / 2, avY - avSize / 2, avSize, avSize);
  } else {
    // 默认渐变底 + 首字
    const avBg = ctx.createLinearGradient(avX - avSize / 2, avY - avSize / 2, avX + avSize / 2, avY + avSize / 2);
    avBg.addColorStop(0, C.bgStart);
    avBg.addColorStop(1, C.bgEnd);
    ctx.fillStyle = avBg;
    ctx.fillRect(avX - avSize / 2, avY - avSize / 2, avSize, avSize);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((nickname || '友').slice(0, 1), avX, avY);
  }
  ctx.restore();

  // 昵称
  ctx.fillStyle = C.text;
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(nickname, W / 2, avY + avSize / 2 + 28);

  // 排名徽章
  if (myRank > 0 && totalCount > 0) {
    const badgeText = `学习榜第 ${myRank} 名`;
    ctx.font = '12px sans-serif';
    const tw = ctx.measureText(badgeText).width + 20;
    roundRect(ctx, W / 2 - tw / 2, avY + avSize / 2 + 38, tw, 22, 11, '#fef3c7');
    ctx.fillStyle = C.gold;
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(badgeText, W / 2, avY + avSize / 2 + 53);
  }

  // 数据区
  const statsY = cardY + 160;
  const colW = cardW / 3;
  const stats = [
    { num: fmtMs(totalStudyMs), label: '累计学习' },
    { num: readCount + '/' + totalChapters, label: '已读章节' },
    { num: quizAttempts + ' 次', label: '答题次数' },
  ];
  stats.forEach((s, i) => {
    const cx = cardX + colW * i + colW / 2;
    ctx.fillStyle = C.primary;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(s.num, cx, statsY);
    ctx.fillStyle = C.sub;
    ctx.font = '11px sans-serif';
    ctx.fillText(s.label, cx, statsY + 20);
  });

  // 第二行数据
  const stats2Y = statsY + 55;
  const stats2 = [
    { num: xp + ' 分', label: '总积分' },
    { num: '⭐' + stars, label: '累计星数' },
    { num: totalCount + ' 人', label: '同学在学习' },
  ];
  stats2.forEach((s, i) => {
    const cx = cardX + colW * i + colW / 2;
    ctx.fillStyle = C.primary;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(s.num, cx, stats2Y);
    ctx.fillStyle = C.sub;
    ctx.font = '11px sans-serif';
    ctx.fillText(s.label, cx, stats2Y + 20);
  });

  // 分割线
  ctx.strokeStyle = '#f3f4f6';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 24, stats2Y + 40);
  ctx.lineTo(cardX + cardW - 24, stats2Y + 40);
  ctx.stroke();

  // 激励文案
  const slogan = pickSlogan(readCount, totalChapters);
  ctx.fillStyle = C.text;
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('「' + slogan + '」', W / 2, stats2Y + 70);

  // 课程卖点
  ctx.fillStyle = C.sub;
  ctx.font = '11px sans-serif';
  ctx.fillText('ReAct · RAG · 多Agent · MCP · 项目实战 · 面试八股', W / 2, stats2Y + 95);
  ctx.fillText('从零到一，系统掌握 AI Agent 开发', W / 2, stats2Y + 112);

  // ===== 底部小程序码 =====
  const qrSize = 110;
  const qrX = W / 2 - qrSize / 2;
  const qrY = cardY + cardH + 20;

  // 码背景白圆
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(W / 2, qrY + qrSize / 2, qrSize / 2 + 10, 0, Math.PI * 2);
  ctx.fill();

  if (qrcode) {
    ctx.drawImage(qrcode, qrX, qrY, qrSize, qrSize);
  }

  // 扫码提示
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  ctx.font = '12px sans-serif';
  ctx.fillText('长按识别小程序码，一起学 AI Agent', W / 2, qrY + qrSize + 28);

  // 底部品牌
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.font = '10px sans-serif';
  ctx.fillText('@小傅哥 · bugstack.cn · 工作10年+大厂架构师', W / 2, qrY + qrSize + 58);
}

function roundRect(ctx, x, y, w, h, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

module.exports = { draw, W, H };
