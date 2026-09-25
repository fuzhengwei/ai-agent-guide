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
  // 上报：累计学习时长 + 阅读数 + 积分/星数（客户端本地统计汇总后上传，全量覆盖）
  if (action === 'report') {
    const patch = {
      totalStudyMs: Math.max(0, Math.min(Number(event.totalStudyMs) || 0, 100 * 365 * 86400000)),
      readCount: Math.max(0, Math.min(Number(event.readCount) || 0, 10000)),
      xp: Math.max(0, Math.min(Number(event.xp) || 0, 1000000)),
      stars: Math.max(0, Math.min(Number(event.stars) || 0, 10000)),
      updatedAt: db.serverDate(),
    };
    const { data } = await profiles.where({ _openid: OPENID }).limit(1).get();
    if (data[0]) {
      await profiles.doc(data[0]._id).update({ data: patch });
    } else {
      await profiles.add({ data: Object.assign({ _openid: OPENID, nickname: '学习者' + OPENID.slice(-4), createdAt: db.serverDate() }, patch) });
    }
    return { ok: true };
  }

  // 排行榜：study=时长榜，score=积分榜
  if (action === 'list') {
    const field = event.board === 'score' ? 'xp' : 'totalStudyMs';
    const { data } = await profiles
      .where({ [field]: db.command.gt(0) })
      .orderBy(field, 'desc')
      .limit(50)
      .field({ nickname: true, avatarUrl: true, totalStudyMs: true, readCount: true, xp: true, stars: true })
      .get();
    // 只返回公开字段（无 openid），并标记是否本人
    const list = data.map(p => ({
      nickname: p.nickname,
      avatarUrl: p.avatarUrl || '',
      totalStudyMs: p.totalStudyMs || 0,
      readCount: p.readCount || 0,
      xp: p.xp || 0,
      stars: p.stars || 0,
    }));
    // 我的名次
    const mine = await profiles.where({ _openid: OPENID }).limit(1)
      .field({ nickname: true, avatarUrl: true, totalStudyMs: true, readCount: true, xp: true, stars: true }).get();
    let myRank = 0;
    if (mine.data[0]) {
      const myVal = mine.data[0][field] || 0;
      const cnt = await profiles.where({ [field]: db.command.gt(myVal) }).count();
      myRank = cnt.total + 1;
    }
    return { ok: true, list, me: mine.data[0] || null, myRank };
  }

  return { ok: false, msg: 'unknown action' };
  } catch (err) {
    return { ok: false, msg: friendlyError(err) };
  }
};
