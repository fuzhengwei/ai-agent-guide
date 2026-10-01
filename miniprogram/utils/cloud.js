/**
 * 云开发调用封装（收藏/笔记/排行榜/时长上报）
 * 所有云端操作都经此模块，未开通云开发时静默降级（不影响本地功能）
 */
const app = getApp();

function ready() {
  return !!(app && app.cloudReady && wx.cloud);
}

function call(name, data) {
  return new Promise((resolve) => {
    if (!ready()) return resolve({ ok: false, offline: true, errMsg: 'cloud not ready' });
    wx.cloud.callFunction({
      name,
      data,
      success: (res) => {
        const r = res.result || { ok: false, errMsg: 'empty result' };
        if (!r.ok) r.errMsg = r.errMsg || r.msg || 'result not ok';
        resolve(r);
      },
      fail: (err) => {
        const msg = (err && err.errMsg) || 'callFunction fail';
        const code = (err && err.errCode !== undefined) ? err.errCode : ((err && err.code) || '');
        console.error('[cloud]', name, msg, code, err);
        resolve({ ok: false, offline: true, errMsg: msg, errCode: code });
      },
    });
  });
}

/* ===== 收藏与笔记 ===== */

function addNote(item) {
  return call('notes', Object.assign({ action: 'add' }, item));
}

function listNotes() {
  return call('notes', { action: 'list' });
}

function updateNoteText(_id, noteText) {
  return call('notes', { action: 'updateNote', _id, noteText });
}

function removeNote(_id) {
  return call('notes', { action: 'remove', _id });
}

/* ===== 排行榜与数据上报 ===== */

// 头像统一上传云存储换 fileID：chooseAvatar 返回的临时路径会过期，绝不能直接存
// 三个入口（首页/我的/排行榜）都必须走这里
function uploadAvatar(filePath) {
  return new Promise((resolve, reject) => {
    if (!wx.cloud || !wx.cloud.uploadFile) return reject(new Error('当前环境不支持云存储'));
    const cloudPath = `avatars/${Date.now()}-${Math.floor(Math.random() * 10000)}.png`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: (r) => {
        if (r && r.fileID) resolve(r.fileID);
        else reject(new Error((r && r.errMsg) || 'upload failed'));
      },
      fail: (err) => reject(new Error((err && err.errMsg) || 'upload failed')),
    });
  });
}

// 头像展示校验：只认 cloud:// fileID 与 https 临时链接；
// 历史脏数据（wx.chooseAvatar 的 wxfile://、http://tmp 临时路径）已失效，视为无头像
function validAvatar(url) {
  const u = String(url || '');
  return u.startsWith('cloud://') || u.startsWith('https://') ? u : '';
}

function reportStats(payload) {
  return call('leaderboard', Object.assign({ action: 'report' }, payload));
}

function getLeaderboard(board) {
  return call('leaderboard', { action: 'list', board: board || 'study' });
}

function setNickname(nickname) {
  return call('login', { action: 'setNickname', nickname });
}

// 保存微信授权的头像/昵称到云端档案
function saveProfile(profile) {
  return call('login', { action: 'saveProfile', nickname: profile.nickname, avatarUrl: profile.avatarUrl });
}

module.exports = {
  ready,
  addNote, listNotes, updateNoteText, removeNote,
  reportStats, getLeaderboard, setNickname, saveProfile,
  uploadAvatar, validAvatar,
};
