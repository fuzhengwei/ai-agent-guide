// notes：收藏与笔记 CRUD（仅本人可见）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const notes = db.collection('user_notes');
  const { action } = event;

  if (action === 'add') {
    const item = {
      _openid: OPENID,
      chapterId: String(event.chapterId || ''),
      chapterTitle: String(event.chapterTitle || '').slice(0, 60),
      selectedText: String(event.selectedText || '').slice(0, 2000),
      noteText: String(event.noteText || '').slice(0, 1000),
      type: event.type === 'note' ? 'note' : 'favorite',
      createdAt: db.serverDate(),
    };
    if (!item.selectedText) return { ok: false, msg: '内容为空' };
    const res = await notes.add({ data: item });
    return { ok: true, _id: res._id };
  }

  if (action === 'list') {
    const { data } = await notes.where({ _openid: OPENID })
      .orderBy('createdAt', 'desc').limit(200).get();
    return { ok: true, list: data };
  }

  if (action === 'updateNote') {
    const noteText = String(event.noteText || '').slice(0, 1000);
    const res = await notes.where({ _openid: OPENID, _id: event._id })
      .update({ data: { noteText, type: 'note' } });
    return { ok: res.stats.updated > 0 };
  }

  if (action === 'remove') {
    const res = await notes.where({ _openid: OPENID, _id: event._id }).remove();
    return { ok: res.stats.removed > 0 };
  }

  return { ok: false, msg: 'unknown action' };
};
