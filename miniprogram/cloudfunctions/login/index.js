// login：微信一键登录，返回 openid 与档案；支持设置昵称/头像
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

function friendlyError(err) {
  const msg = (err && err.message) || String(err);
  if (/collection not exists|COLLECTION_NOT_EXIST/i.test(msg)) {
    return '数据库集合未创建：请到云开发控制台「数据库」新建 user_profiles 集合';
  }
  if (/permission denied|PERMISSION_DENIED/i.test(msg)) {
    return '数据库权限不足：请到云开发控制台「数据库 → 集合权限」放开读权限';
  }
  return msg;
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const profiles = db.collection('user_profiles');

  try {
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

  // 保存微信授权的头像/昵称（用户主动点击头像授权后调用）
  if (event.action === 'saveProfile') {
    const nickname = String(event.nickname || '').trim().slice(0, 20);
    const avatarUrl = String(event.avatarUrl || '').trim().slice(0, 500);
    const patch = { updatedAt: db.serverDate() };
    if (nickname) patch.nickname = nickname;
    if (avatarUrl) patch.avatarUrl = avatarUrl;
    if (profile) {
      await profiles.doc(profile._id).update({ data: patch });
      profile = Object.assign({}, profile, patch);
    } else {
      const init = Object.assign({
        _openid: OPENID,
        nickname: nickname || ('学习者' + OPENID.slice(-4)),
        avatarUrl: avatarUrl || '',
        totalStudyMs: 0, readCount: 0, xp: 0, stars: 0,
        createdAt: db.serverDate(),
      }, patch);
      const res = await profiles.add({ data: init });
      profile = Object.assign({ _id: res._id }, init);
    }
    return { ok: true, profile: { nickname: profile.nickname, avatarUrl: profile.avatarUrl || '' } };
  }

  if (!profile) {
    const res = await profiles.add({
      data: {
        _openid: OPENID,
        nickname: '学习者' + OPENID.slice(-4),
        avatarUrl: '',
        totalStudyMs: 0,
        readCount: 0,
        xp: 0,
        stars: 0,
        createdAt: db.serverDate(),
        updatedAt: db.serverDate(),
      },
    });
    profile = { _id: res._id, nickname: '学习者' + OPENID.slice(-4), avatarUrl: '', totalStudyMs: 0, readCount: 0, xp: 0, stars: 0 };
  }

  return { ok: true, openid: OPENID, profile };
  } catch (err) {
    return { ok: false, msg: friendlyError(err) };
  }
};
