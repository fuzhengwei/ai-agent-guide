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

// 头像 cloud:// fileID 批量换 https 临时链接：
// 客户端 image 组件解析 fileID 受云存储权限规则限制（默认仅创建者可读 → 别人看不到），
// 服务端 getTempFileURL 走管理员权限不受限，换出的 https 链接任何人可见。
// 临时链接约 2h 有效，每次拉榜重新换（批量最多 50 个/次）。
async function resolveAvatarUrls(items) {
  const ids = [...new Set(items.map(p => p.avatarUrl).filter(u => u && u.indexOf('cloud://') === 0))];
  if (!ids.length) return;
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    try {
      const res = await cloud.getTempFileURL({ fileList: batch });
      const map = {};
      (res.fileList || []).forEach(f => {
        if (f.fileID && f.tempFileURL && f.status === 0) map[f.fileID] = f.tempFileURL;
      });
      items.forEach(p => { if (map[p.avatarUrl]) p.avatarUrl = map[p.avatarUrl]; });
    } catch (e) { /* 换链接失败退回原值，不影响榜单主体 */ }
  }
}

// 当前月份 key：YYYY-MM（按服务器时间）
function curMonthKey() {
  const n = new Date();
  return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0');
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const profiles = db.collection('user_profiles');
  const { action } = event;
  await ensureCollection('user_profiles');

  try {
  // 上报：累计学习时长 + 阅读数 + 积分/星数 + 明细数据（客户端本地统计汇总后上传，全量覆盖）
  if (action === 'report') {
    const clamp = (v, max) => Math.max(0, Math.min(Number(v) || 0, max));
    const curStudy = clamp(event.totalStudyMs, 100 * 365 * 86400000);
    const curXp = clamp(event.xp, 1000000);
    const patch = {
      totalStudyMs: curStudy,
      readCount: clamp(event.readCount, 10000),
      xp: curXp,
      stars: clamp(event.stars, 10000),
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
    // 月榜数据：客户端上报的是累计值，服务端用「上次累计值」算增量，按月累加
    const monthKey = curMonthKey();
    const doc = data[0];
    let monthPatch;
    if (!doc) {
      monthPatch = { month: monthKey, mStudyMs: curStudy, mXp: curXp, prevStudyMs: curStudy, prevXp: curXp };
    } else {
      const dStudy = Math.max(0, curStudy - (doc.prevStudyMs || 0));
      const dXp = Math.max(0, curXp - (doc.prevXp || 0));
      let mStudyMs, mXp;
      if (doc.month === monthKey) {
        // 同一个月：在月累计上叠加本次增量
        mStudyMs = (doc.mStudyMs || 0) + dStudy;
        mXp = (doc.mXp || 0) + dXp;
      } else if (!doc.month) {
        // 老档案首次迁移：历史时长/积分不计入本月，从现在起算
        mStudyMs = 0;
        mXp = 0;
      } else {
        // 跨月：月榜清零，只算本月新增量
        mStudyMs = dStudy;
        mXp = dXp;
      }
      monthPatch = { month: monthKey, mStudyMs, mXp, prevStudyMs: curStudy, prevXp: curXp };
    }
    if (data[0]) {
      await profiles.doc(data[0]._id).update({ data: Object.assign(patch, monthPatch) });
    } else {
      await profiles.add({ data: Object.assign({ _openid: OPENID, nickname: '学习者' + OPENID.slice(-4), createdAt: db.serverDate() }, patch, monthPatch) });
    }
    return { ok: true };
  }

  // 排行榜：month=本月时长榜（默认），study=时长总榜，score=考试榜
  if (action === 'list') {
    const isMonth = event.board === 'month';
    const field = event.board === 'score' ? 'xp' : isMonth ? 'mStudyMs' : 'totalStudyMs';
    const PUBLIC_FIELDS = { nickname: true, avatarUrl: true, totalStudyMs: true, readCount: true, xp: true, stars: true, quizDetail: true, correctTotal: true, answerTotal: true, readChapters: true, mStudyMs: true, month: true };
    // 月榜只统计本月上报过的档案，且按月累计值排序
    const baseWhere = isMonth ? { month: curMonthKey() } : {};
    // 并行查询：总学习人数 + 前99名 + 我的档案（减少串行等待）
    const [totalCountRes, dataRes, mineRes] = await Promise.all([
      profiles.count(),
      profiles
        .where(Object.assign({ [field]: db.command.gt(0) }, baseWhere))
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
      // 月榜展示需要：本月学习时长（前端 valueText/detail 都用它）
      mStudyMs: p.mStudyMs || 0,
      month: p.month || '',
    });
    const list = data.map(pub);
    // 我的名次（只在有数据时才 count，避免空跑）
    let myRank = 0;
    if (mine[0]) {
      const myVal = mine[0][field] || 0;
      if (myVal > 0) {
        const cnt = await profiles.where(Object.assign({ [field]: db.command.gt(myVal) }, baseWhere)).count();
        myRank = cnt.total + 1;
      } else {
        myRank = 0; // 没成绩不排名
      }
    }
    // 头像 fileID → https 临时链接（所有人可见，约 2h 有效，每次拉榜重换）
    const mePub = mine[0] ? pub(mine[0]) : null;
    await resolveAvatarUrls(list);
    if (mePub) await resolveAvatarUrls([mePub]);
    return { ok: true, list, me: mePub, myRank, totalCount };
  }

  return { ok: false, msg: 'unknown action' };
  } catch (err) {
    return { ok: false, msg: friendlyError(err) };
  }
};
