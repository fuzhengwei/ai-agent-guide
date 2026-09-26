const share = require('../../utils/share.js');

Page({
  data: {},

  onLoad() {
    wx.setNavigationBarTitle({ title: '项目实战' });
  },

  // 跳转知识星球小程序（短链；用户点击触发，微信会弹确认框）
  openProject() {
    wx.vibrateShort({ type: 'light' });
    wx.navigateToMiniProgram({
      shortLink: '#小程序://知识星球/MreBZ6E98bytTbs',
      envVersion: 'release',
      fail: () => wx.showToast({ title: '打开失败，请重试', icon: 'none' }),
    });
  },

  // 预览课程详情（官网）；复制链接便于在浏览器打开
  openSite() {
    wx.setClipboardData({
      data: 'https://bugstack.cn/md/zsxq/material/student-learn-ai.html',
      success: () => wx.showToast({ title: '链接已复制，浏览器打开', icon: 'none' }),
    });
  },

  ...share.attach(
    'AI Agent 项目实战 · 大厂架构师小傅哥带你刷 25+ 实战项目，增强简历竞争力',
    '/pages/project/project'
  ),
});
