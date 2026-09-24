App({
  globalData: {
    openid: '',
    profile: null,   // { nickname, totalStudyMs, readCount, xp, stars }
  },

  onLaunch() {
    // 初始化微信云开发（必须指定环境 ID，否则体验版/正式版连不上）
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloudbase-d6gmq1a9v43f0c2a3',
        traceUser: true,
      });
      this.cloudReady = true;
      this.silentLogin();
    } else {
      this.cloudReady = false;
    }

    // 版本更新检测
    if (wx.canIUse('getUpdateManager')) {
      const um = wx.getUpdateManager();
      um.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已就绪，是否重启应用？',
          success: (res) => { if (res.confirm) um.applyUpdate(); },
        });
      });
    }
  },

  // 静默登录：换取 openid 与档案（无感，不需要用户点授权）
  silentLogin() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        if (res.result && res.result.ok) {
          this.globalData.openid = res.result.openid;
          this.globalData.profile = res.result.profile;
          if (this._loginCbs) { this._loginCbs.forEach(cb => cb(res.result)); this._loginCbs = []; }
        }
      },
      fail: () => {},
    });
  },

  // 页面等待登录完成
  onLoginReady(cb) {
    if (this.globalData.openid) return cb({ openid: this.globalData.openid, profile: this.globalData.profile });
    this._loginCbs = this._loginCbs || [];
    this._loginCbs.push(cb);
  },
});
