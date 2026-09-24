// login：微信一键登录，返回 openid 与档案；支持设置昵称
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const profiles = db.collection('user_profiles');

  // 查档案，没有则创建（默认昵称脱敏）
  const { data } = await profiles.where({ _openid: OPENID }).limit(1).get();
  let profile = data[0];

  if (event.action === 'setNickname') {
    const nickname = String(event.nickname || '').trim().slice(0, 12);
    if (!nickname) return { ok: false, msg: '昵称不能为空' };
    if (profile) {
      await profiles.doc(profile._id).update({ data: { nickname, updatedAt: db.serverDate() } });
    } else {
      await profiles.add({ data: { _openid: OPENID, nickname, totalStudyMs: 0, readCount: 0, xp: 0, stars: 0, createdAt: db.serverDate(), updatedAt: db.serverDate() } });
    }
    return { ok: true, nickname };
  }

  if (!profile) {
    const res = await profiles.add({
      data: {
        _openid: OPENID,
        nickname: '学习者' + OPENID.slice(-4),
        totalStudyMs: 0,
        readCount: 0,
        xp: 0,
        stars: 0,
        createdAt: db.serverDate(),
        updatedAt: db.serverDate(),
      },
    });
    profile = { _id: res._id, nickname: '学习者' + OPENID.slice(-4), totalStudyMs: 0, readCount: 0, xp: 0, stars: 0 };
  }

  return { ok: true, openid: OPENID, profile };
};
