// leaderboard：时长/成绩上报 + 排行榜（只暴露昵称，不暴露 openid）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 把云数据库常见错误翻译成用户能看懂的提示
function friendlyError(err) {
  const msg = (err && err.message) || String(err);
  if (/collection not exists|COLLECTION_NOT_EXIST/i.test(msg)) {
    return '排行榜暂未开放（数据库初始化中），稍后再试';
  }
  if (/permission denied|PERMISSION_DENIED/i.test(msg)) {
    return '数据库权限不足：请到云开发控制台「数据库 → 集合权限」放开读权限';
  }
  return msg;
}

// 集合不存在时自动创建（建一次后续就不再触发）
async function ensureCollection(name) {
  try {
    await db.collection(name).limit(1).get();
  } catch (e) {
    if (/collection not exists|COLLECTION_NOT_EXIST/i.test((e && e.message) || String(e))) {
      try { await db.createCollection(name); } catch (_) { /* 并发/已存在则忽略 */ }
    }
  }
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const profiles = db.collection('user_profiles');
  const { action } = event;
  await ensureCollection('user_profiles');

  try {
  // 上报：累计学习时长 + 阅读数 + 积分/星数 + 明细数据（客户端本地统计汇总后上传，全量覆盖）
  if (action === 'report') {
    const patch = {
      totalStudyMs: Math.max(0, Math.min(Number(event.totalStudyMs) || 0, 100 * 365 * 86400000)),
      readCount: Math.max(0, Math.min(Number(event.readCount) || 0, 10000)),
      xp: Math.max(0, Math.min(Number(event.xp) || 0, 1000000)),
      stars: Math.max(0, Math.min(Number(event.stars) || 0, 10000)),
      updatedAt: db.serverDate(),
    };
    // 明细字段（可选）：答题明细、正确率、已读章节
    if (event.quizDetail && typeof event.quizDetail === 'object') {
      // { quizKey: attempts }，只保留数值
      const qd = {};
      Object.keys(event.quizDetail).slice(0, 100).forEach(k => {
        qd[k] = Math.max(0, Math.min(Number(event.quizDetail[k]) || 0, 100000));
      });
      patch.quizDetail = qd;
    }
    if (event.answerTotal !== undefined) {
      patch.answerTotal = Math.max(0, Math.min(Number(event.answerTotal) || 0, 10000000));
      patch.correctTotal = Math.max(0, Math.min(Number(event.correctTotal) || 0, 10000000));
    }
    if (Array.isArray(event.readChapters)) {
      patch.readChapters = event.readChapters.slice(0, 100).map(String);
    }
    const { data } = await profiles.where({ _openid: OPENID }).limit(1).get();
    if (data[0]) {
      await profiles.doc(data[0]._id).update({ data: patch });
    } else {
      await profiles.add({ data: Object.assign({ _openid: OPENID, nickname: '学习者' + OPENID.slice(-4), createdAt: db.serverDate() }, patch) });
    }
    return { ok: true };
  }

  // 排行榜：study=时长榜，score=考试榜
  if (action === 'list') {
    const field = event.board === 'score' ? 'xp' : 'totalStudyMs';
    const PUBLIC_FIELDS = { nickname: true, avatarUrl: true, totalStudyMs: true, readCount: true, xp: true, stars: true, quizDetail: true, correctTotal: true, answerTotal: true, readChapters: true };
    // 并行查询：总学习人数 + 前99名 + 我的档案（减少串行等待）
    const [totalCountRes, dataRes, mineRes] = await Promise.all([
      profiles.count(),
      profiles
        .where({ [field]: db.command.gt(0) })
        .orderBy(field, 'desc')
        .limit(99)
        .field(PUBLIC_FIELDS)
        .get(),
      profiles.where({ _openid: OPENID }).limit(1).field(PUBLIC_FIELDS).get(),
    ]);
    const totalCount = totalCountRes.total || 0;
    const data = dataRes.data || [];
    const mine = mineRes.data || [];
    // 只返回公开字段（无 openid），并标记是否本人
    const pub = p => ({
      nickname: p.nickname,
      avatarUrl: p.avatarUrl || '',
      totalStudyMs: p.totalStudyMs || 0,
      readCount: p.readCount || 0,
      xp: p.xp || 0,
      stars: p.stars || 0,
      quizDetail: p.quizDetail || {},
      correctTotal: p.correctTotal || 0,
      answerTotal: p.answerTotal || 0,
      readChapters: p.readChapters || [],
    });
    const list = data.map(pub);
    // 我的名次（只在有数据时才 count，避免空跑）
    let myRank = 0;
    if (mine[0]) {
      const myVal = mine[0][field] || 0;
      if (myVal > 0) {
        const cnt = await profiles.where({ [field]: db.command.gt(myVal) }).count();
        myRank = cnt.total + 1;
      } else {
        myRank = 0; // 没成绩不排名
      }
    }
    return { ok: true, list, me: mine[0] ? pub(mine[0]) : null, myRank, totalCount };
  }

  return { ok: false, msg: 'unknown action' };
  } catch (err) {
    return { ok: false, msg: friendlyError(err) };
  }
};
