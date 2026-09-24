const cloud = require('../../utils/cloud.js');
const store = require('../../utils/store.js');

Page({
  data: {
    board: 'study',   // study | score
    list: [],
    me: null,
    myRank: 0,
    loading: true,
    online: true,
    studyText: '',
  },

  onShow() {
    // 本地统计同步展示
    const st = store.getStudyTime();
    this.setData({ studyText: this._fmtMs(st.total) });
    // 先上报一次本地数据再拉榜
    const gs = store.getGameStats();
    if (cloud.ready()) {
      cloud.reportStats({
        totalStudyMs: st.total,
        readCount: Object.keys(store.getReadMap()).length,
        xp: gs.xp,
        stars: gs.stars,
      });
    }
    this.load();
  },

  switchBoard(e) {
    const board = e.currentTarget.dataset.board;
    if (board === this.data.board) return;
    this.setData({ board });
    this.load();
  },

  load() {
    if (!cloud.ready()) {
      this.setData({ loading: false, online: false });
      return;
    }
    this.setData({ loading: true });
    cloud.getLeaderboard(this.data.board).then((res) => {
      if (res.ok) {
        const field = this.data.board === 'score' ? 'xp' : 'totalStudyMs';
        const list = (res.list || []).map((p, i) => ({
          ...p,
          rank: i + 1,
          medal: i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1),
          valueText: this.data.board === 'score' ? `${p.xp} 分` : this._fmtMs(p.totalStudyMs),
          isMe: res.me && p.nickname === res.me.nickname && p[field] === res.me[field],
        }));
        this.setData({
          list,
          me: res.me,
          myRank: res.myRank,
          loading: false,
          online: true,
        });
      } else {
        this.setData({ loading: false, online: false });
      }
    });
  },

  setNick() {
    wx.showModal({
      title: '设置昵称',
      editable: true,
      placeholderText: '最多 12 个字，公开可见',
      content: (this.data.me && this.data.me.nickname) || '',
      success: (res) => {
        if (!res.confirm) return;
        const name = (res.content || '').trim();
        if (!name) return;
        cloud.setNickname(name).then((r) => {
          if (r.ok) { wx.showToast({ title: '已更新', icon: 'success' }); this.load(); }
          else wx.showToast({ title: r.msg || '设置失败', icon: 'none' });
        });
      },
    });
  },

  _fmtMs(ms) {
    const mins = Math.floor((ms || 0) / 60000);
    if (mins < 60) return mins + ' 分钟';
    return Math.floor(mins / 60) + ' 小时 ' + (mins % 60) + ' 分';
  },
});
