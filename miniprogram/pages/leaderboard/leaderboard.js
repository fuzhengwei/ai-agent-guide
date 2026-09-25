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
    errMsg: '',
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
      this.setData({ loading: false, online: false, errMsg: 'wx.cloud 未初始化' });
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
          initial: (p.nickname || '友').slice(0, 1),
          avatarBg: this._avatarBg(p.nickname),
          valueText: this.data.board === 'score' ? `${p.xp} 分` : this._fmtMs(p.totalStudyMs),
          isMe: res.me && p.nickname === res.me.nickname && p[field] === res.me[field],
        }));
        const me = res.me
          ? Object.assign({}, res.me, { initial: (res.me.nickname || '友').slice(0, 1), avatarBg: this._avatarBg(res.me.nickname) })
          : null;
        this.setData({
          list,
          me,
          myRank: res.myRank,
          loading: false,
          online: true,
          errMsg: '',
        });
      } else {
        this.setData({ loading: false, online: false, errMsg: res.errMsg || '云函数返回失败' });
      }
    });
  },

  // 微信「头像昵称填写」：用户点自己卡片的头像选择新头像
  onChooseAvatar(e) {
    const avatarUrl = (e.detail && e.detail.avatarUrl) || '';
    if (!avatarUrl) return;
    const nickname = (this.data.me && this.data.me.nickname) || '';
    this.setData({ 'me.avatarUrl': avatarUrl });
    cloud.saveProfile({ nickname, avatarUrl }).then((r) => {
      if (r && r.ok) {
        wx.showToast({ title: '头像已更新', icon: 'success' });
        this.load();
      } else {
        wx.showToast({ title: (r && r.msg) || '保存失败', icon: 'none' });
      }
    });
  },

  // 按昵称稳定取一个渐变底色（无头像时兜底）
  _avatarBg(name) {
    const palette = [
      ['#5a7cf7', '#4353c9'], ['#f59e0b', '#d97706'], ['#10b981', '#059669'],
      ['#ec4899', '#be185d'], ['#8b5cf6', '#6d28d9'], ['#06b6d4', '#0e7490'],
      ['#f43f5e', '#be123c'], ['#84cc16', '#4d7c0f'],
    ];
    let h = 0;
    const s = String(name || '');
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return palette[h % palette.length];
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
