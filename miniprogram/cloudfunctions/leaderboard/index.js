// leaderboard：时长/成绩上报 + 排行榜（只暴露昵称，不暴露 openid）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const profiles = db.collection('user_profiles');
  const { action } = event;

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
      .field({ nickname: true, totalStudyMs: true, readCount: true, xp: true, stars: true })
      .get();
    // 只返回公开字段（无 openid），并标记是否本人
    const list = data.map(p => ({
      nickname: p.nickname,
      totalStudyMs: p.totalStudyMs || 0,
      readCount: p.readCount || 0,
      xp: p.xp || 0,
      stars: p.stars || 0,
    }));
    // 我的名次
    const mine = await profiles.where({ _openid: OPENID }).limit(1)
      .field({ nickname: true, totalStudyMs: true, readCount: true, xp: true, stars: true }).get();
    let myRank = 0;
    if (mine.data[0]) {
      const myVal = mine.data[0][field] || 0;
      const cnt = await profiles.where({ [field]: db.command.gt(myVal) }).count();
      myRank = cnt.total + 1;
    }
    return { ok: true, list, me: mine.data[0] || null, myRank };
  }

  return { ok: false, msg: 'unknown action' };
};
