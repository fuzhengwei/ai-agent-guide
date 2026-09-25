const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');
const share = require('../../utils/share.js');
const cloud = require('../../utils/cloud.js');

Page({
  data: {
    total: 0,
    readCount: 0,
    quizAttempts: 0,
    quizDone: 0,
    xp: 0,
    stars: 0,
    totalStars: 0,
    payEnabled: pay.CONFIG.PAY_ENABLED,
    unlocked: true,
    studyTimeText: '尚未开始',
    studyDays: 0,
    nickname: '',
    avatarUrl: '',
    initial: '友',
    _inputNickname: '',   // 输入框实时值（避免被微信昵称覆盖）
  },

  onShow() {
    const readMap = store.getReadMap();
    const records = store.getQuizRecords();
    const recordKeys = Object.keys(records);
    const gameStats = store.getGameStats();
    const quizIndex = require('../../data/quiz-index.js');
    const st = store.getStudyTime();
    this.setData({
      total: chapters.filter(c => typeof c.num === 'number').length,
      readCount: Object.keys(readMap).length,
      quizAttempts: recordKeys.reduce((s, k) => s + (records[k].attempts || 0), 0),
      quizDone: recordKeys.length,
      xp: gameStats.xp,
      stars: gameStats.stars,
      totalStars: quizIndex.length * 3,
      unlocked: pay.isUnlocked(),
      studyTimeText: this._fmtMs(st.total),
      studyDays: st.days,
    });
    // 登录完成后填充头像昵称
    const app = getApp();
    if (app && app.onLoginReady) {
      app.onLoginReady(({ profile }) => {
        if (!profile) return;
        this.setData({
          nickname: profile.nickname || '',
          avatarUrl: profile.avatarUrl || '',
          initial: (profile.nickname || '友').slice(0, 1),
        });
      });
    }
  },

  // 微信「头像昵称填写」：选择头像后上传云端档案
  onChooseAvatar(e) {
    const avatarUrl = (e.detail && e.detail.avatarUrl) || '';
    if (!avatarUrl) return;
    this.setData({ avatarUrl });
    this._saveProfile({ avatarUrl });
  },

  // 昵称输入框（type="nickname"）实时同步输入值
  onNicknameInput(e) {
    this.setData({ _inputNickname: e.detail.value || '' });
  },

  // 失焦或点完成时保存昵称
  onNicknameBlur(e) {
    const nickname = String((e.detail && e.detail.value) || this.data._inputNickname || '').trim().slice(0, 12);
    if (!nickname || nickname === this.data.nickname) return;
    this.setData({ nickname, initial: nickname.slice(0, 1), _inputNickname: nickname });
    this._saveProfile({ nickname });
  },

  _saveProfile(patch) {
    if (!cloud.ready()) return;
    // 只传有值的字段，避免覆盖
    const payload = {};
    if (patch.nickname !== undefined) payload.nickname = patch.nickname;
    if (patch.avatarUrl !== undefined) payload.avatarUrl = patch.avatarUrl;
    cloud.saveProfile(payload).then((r) => {
      if (r && r.ok) {
        const app = getApp();
        if (app && app.globalData) {
          app.globalData.profile = Object.assign({}, app.globalData.profile, patch);
        }
        wx.showToast({ title: '已保存', icon: 'success' });
      } else {
        wx.showToast({ title: (r && r.msg) || '保存失败', icon: 'none' });
      }
    });
  },


  goNotes() {
    wx.navigateTo({ url: '/pages/notes/notes' });
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' });
  },

  // 生成并保存学习海报
  makePoster() {
    const st = store.getStudyTime();
    const records = store.getQuizRecords();
    const recordKeys = Object.keys(records);
    const gs = store.getGameStats();
    const app = getApp();
    const profile = (app && app.globalData && app.globalData.profile) || {};

    // 考试榜分值：各章最好成绩之和（与 leaderboard 页口径一致）
    let examScore = 0;
    recordKeys.forEach(k => { examScore += records[k].bestScore || 0; });
    const data = {
      nickname: this.data.nickname || profile.nickname || '学习者',
      avatarUrl: this.data.avatarUrl || profile.avatarUrl || '',
      totalStudyMs: st.total,
      readCount: this.data.readCount,
      totalChapters: this.data.total,
      quizAttempts: recordKeys.reduce((s, k) => s + (records[k].attempts || 0), 0),
      xp: examScore,
      stars: gs.stars,
      myRank: 0,   // 需要云端数据，先留空
      totalCount: 0,
    };

    // 先拉排行榜拿自己的名次
    if (cloud.ready()) {
      cloud.getLeaderboard('study').then((res) => {
        if (res.ok) {
          data.myRank = res.myRank || 0;
          data.totalCount = res.totalCount || 0;
        }
        this._drawAndSave(data);
      });
    } else {
      this._drawAndSave(data);
    }
  },

  _drawAndSave(data) {
    const poster = require('../../utils/poster.js');
    const qrcodePath = '/assets/mp-qrcode.png';

    wx.showLoading({ title: '生成海报中…', mask: true });

    // 创建离屏 canvas
    const query = wx.createSelectorQuery();
    query.select('#posterCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) {
          wx.hideLoading();
          wx.showToast({ title: 'Canvas 初始化失败', icon: 'none' });
          return;
        }
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = poster.W * dpr;
        canvas.height = poster.H * dpr;
        ctx.scale(dpr, dpr);

        // 加载图片为 Image 对象
        const loadImage = (src) => new Promise((resolve) => {
          if (!src) return resolve(null);
          const img = canvas.createImage();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });

        const drawWithImages = (avatarImg, qrImg) => {
          poster.draw(ctx, canvas, data, { avatar: avatarImg, qrcode: qrImg });
          wx.canvasToTempFilePath({
            canvas,
            success: (r) => {
              wx.hideLoading();
              wx.saveImageToPhotosAlbum({
                filePath: r.tempFilePath,
                success: () => wx.showToast({ title: '海报已保存到相册', icon: 'success' }),
                fail: () => {
                  wx.showModal({
                    title: '保存失败',
                    content: '请授权保存图片到相册',
                    confirmText: '去设置',
                    success: (m) => { if (m.confirm) wx.openSetting(); },
                  });
                },
              });
            },
            fail: () => {
              wx.hideLoading();
              wx.showToast({ title: '海报生成失败', icon: 'none' });
            },
          });
        };

        // 先加载小程序码（本地路径直接可用）
        loadImage(qrcodePath).then((qrImg) => {
          // 再加载头像（支持 http / cloud fileID / 本地路径）
          const avatarUrl = data.avatarUrl || '';
          if (avatarUrl.startsWith('http')) {
            wx.downloadFile({
              url: avatarUrl,
              success: (r) => loadImage(r.tempFilePath).then((av) => drawWithImages(av, qrImg)),
              fail: () => drawWithImages(null, qrImg),
            });
          } else if (avatarUrl.startsWith('cloud://')) {
            wx.cloud.downloadFile({
              fileID: avatarUrl,
              success: (r) => loadImage(r.tempFilePath).then((av) => drawWithImages(av, qrImg)),
              fail: () => drawWithImages(null, qrImg),
            });
          } else if (avatarUrl) {
            loadImage(avatarUrl).then((av) => drawWithImages(av, qrImg));
          } else {
            drawWithImages(null, qrImg);
          }
        });
      });
  },

  _fmtMs(ms) {
    const mins = Math.floor((ms || 0) / 60000);
    if (mins < 1) return '尚未开始';
    if (mins < 60) return `累计学习 ${mins} 分钟`;
    return `累计学习 ${Math.floor(mins / 60)} 小时 ${mins % 60} 分`;
  },

  toggleUnlock() {
    if (pay.isUnlocked()) {
      wx.showToast({ title: '已解锁全部章节', icon: 'none' });
    } else {
      pay.requestUnlock();
    }
  },

  clearData() {
    wx.showModal({
      title: '清除学习记录',
      content: '将清除全部阅读进度与做题记录，且不可恢复。',
      confirmColor: '#dc2626',
      success: (res) => {
        if (res.confirm) {
          store.clearAll();
          this.onShow();
          wx.showToast({ title: '已清除', icon: 'success' });
        }
      },
    });
  },

  about() {
    wx.showModal({
      title: '关于',
      content: 'AI Agent 通识教程 · 30 章渐进式可视化教程，配套 508 道面试题。\n网页版：ai-agent-guide.xiaofuge.cn',
      showCancel: false,
    });
  },

  // 分享/转发：附上当前学习进度（含朋友圈入口）
  ...share.attach(
    function () {
      const n = this.data.readCount;
      return n > 0
        ? `我在学 AI Agent 通识教程，已读完 ${n}/${this.data.total} 章，来和我一起打卡！`
        : 'AI Agent 通识教程：30 章学会 Agent 开发，配 508 道大厂面试题';
    },
    '/pages/index/index'
  ),
});
