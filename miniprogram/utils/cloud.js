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
};
