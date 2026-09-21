App({
  onLaunch() {
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
});
