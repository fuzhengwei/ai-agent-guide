const { grouped, SCENARIOS } = require('../../data/toy-scenarios.js');
const api = require('../../utils/toy-api.js');

Page({
  data: {
    groups: [],
    total: SCENARIOS.length,
    mode: '',
    model: '',
    connected: false,
    offlineHint: '',
    expanded: '',
  },

  onLoad() {
    const groups = grouped().map(g => ({ ...g, open: true }));
    this.setData({ groups });
    this._loadMode();
  },

  onShow() {
    // 每次切回都重试连接（用户开了调试模式后无需重新编译）
    this._loadMode();
  },

  _loadMode() {
    api.config().then((c) => {
      this.setData({
        mode: c.mode === 'real' ? '真实模型' : 'Mock 演示',
        model: c.model || '',
        connected: true,
      });
    }).catch(() => {
      this.setData({
        mode: '未连接',
        model: '',
        connected: false,
        offlineHint: '服务在线但小程序暂时连不上：请在手机上点右上角「…」→ 开发调试，开启调试模式后重试（正式版无需此操作）。',
      });
    });
  },

  toggleGroup(e) {
    const name = e.currentTarget.dataset.name;
    const groups = this.data.groups.map(g => g.name === name ? { ...g, open: !g.open } : g);
    this.setData({ groups });
  },

  openChat(e) {
    const { id, title, sub } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/packages/toy/pages/chat/chat?id=' + id + '&title=' + encodeURIComponent(title) + '&sub=' + encodeURIComponent(sub),
    });
  },

  goReader() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onShareAppMessage() {
    return {
      title: 'ToyAgent：26 个接口类边玩边学智能体',
      path: '/pages/toy/toy',
    };
  },
});
