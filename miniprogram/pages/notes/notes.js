const cloud = require('../../utils/cloud.js');

Page({
  data: {
    list: [],
    loading: true,
    online: true,
  },

  onShow() {
    this.load();
  },

  load() {
    if (!cloud.ready()) {
      this.setData({ loading: false, online: false });
      return;
    }
    this.setData({ loading: true });
    cloud.listNotes().then((res) => {
      if (res.ok) {
        const list = (res.list || []).map(n => ({
          ...n,
          timeText: this._fmtTime(n.createdAt),
          preview: n.selectedText.length > 60 ? n.selectedText.slice(0, 60) + '…' : n.selectedText,
        }));
        this.setData({ list, loading: false, online: true });
      } else {
        this.setData({ loading: false, online: false });
      }
    });
  },

  editNote(e) {
    const { id, note } = e.currentTarget.dataset;
    wx.showModal({
      title: '编辑笔记',
      editable: true,
      placeholderText: '写下你的想法…',
      content: note || '',
      success: (res) => {
        if (!res.confirm) return;
        cloud.updateNoteText(id, (res.content || '').trim()).then((r) => {
          if (r.ok) { wx.showToast({ title: '已更新', icon: 'success' }); this.load(); }
          else wx.showToast({ title: '更新失败', icon: 'none' });
        });
      },
    });
  },

  removeNote(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '删除收藏',
      content: '确定删除这条收藏/笔记吗？',
      confirmColor: '#dc2626',
      success: (res) => {
        if (!res.confirm) return;
        cloud.removeNote(id).then((r) => {
          if (r.ok) { wx.showToast({ title: '已删除', icon: 'success' }); this.load(); }
          else wx.showToast({ title: '删除失败', icon: 'none' });
        });
      },
    });
  },

  _fmtTime(t) {
    if (!t) return '';
    const d = new Date(t);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  },
});
