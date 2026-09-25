const cloud = require('../../utils/cloud.js');
const store = require('../../utils/store.js');
const chapters = require('../../data/chapters.js');

// quizKey -> 章节短标题 映射（用于展示「常考章节」）
// 注意：chapters.js 里大厂真题场 num=null，需跳过或直接用标题
const QK2TITLE = {};
const KEY2CHAPTER = {};
chapters.forEach(c => {
  if (c.quizKey) {
    if (c.num !== null && c.num !== undefined) {
      QK2TITLE[c.quizKey] = `第${c.num}章 ${c.title.replace(/^第\d+章\s*/, '')}`;
    } else {
      QK2TITLE[c.quizKey] = c.title;
    }
  }
  KEY2CHAPTER[c.key] = c;
});

Page({
  data: {
    board: 'study',   // study | score
    list: [],
    me: null,
    myRank: 0,
    totalCount: 0,
    loading: true,
    online: true,
    studyText: '',
    errMsg: '',
    showDetail: false,
    detailUser: null,
    detailRank: 0,
    nickname: '',   // 昵称（排行榜页 me 卡片用）
    avatarUrl: '',
  },

  onShow() {
    // 本地统计同步展示
    const st = store.getStudyTime();
    this.setData({ studyText: this._fmtMs(st.total) });
    // 先拉榜（用户感知快），上报放后台异步
    this.load();
    const gs = store.getGameStats();
    if (cloud.ready()) {
      // 异步上报，不阻塞榜单加载
      cloud.reportStats(this._buildReport(gs, st)).catch(() => {});
    }
  },

  // 组装上报数据：基础统计 + 答题明细 + 正确率 + 已读章节
  _buildReport(gs, st) {
    const records = store.getQuizRecords();
    const quizDetail = {};
    let answerTotal = 0, correctTotal = 0;
    // 考试榜分值：只算各章节最好成绩之和（bestScore），不累计重复刷分
    let examScore = 0;
    Object.keys(records).forEach(k => {
      const r = records[k];
      if (r.attempts > 0) quizDetail[k] = r.attempts;
      // answerTotal/correctTotal 按累计：每场最后一次的正确/总数累加
      if (r.total) { answerTotal += (r.attempts || 1) * r.total; correctTotal += r.correct || 0; }
      // bestScore 是单章最好成绩，累加即为考试榜总分
      examScore += r.bestScore || 0;
    });
    return {
      totalStudyMs: st.total,
      readCount: Object.keys(store.getReadMap()).length,
      xp: examScore,   // 考试榜分值 = 各章最好成绩之和
      stars: gs.stars,
      quizDetail,
      answerTotal,
      correctTotal,
      readChapters: Object.keys(store.getReadMap()),
    };
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
        const list = (res.list || []).map((p, i) => this._decorate(p, i + 1, res.me, field));
        const me = res.me
          ? Object.assign({}, res.me, { initial: this._avatarFallback(res.me.nickname), avatarBg: this._avatarBg(res.me.nickname) })
          : null;
        // 如果自己在榜单里，标记出来；如果没在榜单里，追加到列表底部显示
        let displayList = list;
        if (me && res.myRank > 0) {
          const inList = list.some(p => p.isMe);
          if (!inList) {
            displayList = list.concat([this._decorate(me, res.myRank, res.me, field)]);
          }
        }
        this.setData({
          list: displayList,
          me,
          myRank: res.myRank,
          totalCount: res.totalCount || 0,
          loading: false,
          online: true,
          errMsg: '',
        });
      } else {
        this.setData({ loading: false, online: false, errMsg: res.errMsg || '云函数返回失败' });
      }
    });
  },

  // 给一条榜单数据加工出展示字段：排名/头像兜底/徽章/详情
  _decorate(p, rank, me, field) {
    const isScore = this.data.board === 'score';
    const attempts = Object.values(p.quizDetail || {}).reduce((s, n) => s + n, 0);
    const acc = p.answerTotal > 0 ? Math.round((p.correctTotal / p.answerTotal) * 100) : 0;
    // 最常考章节 top5（按答题次数）
    const topQuiz = Object.entries(p.quizDetail || {})
      .sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([k, n]) => ({ title: QK2TITLE[k] || k, count: n }));
    // 最常学章节 top5（用 Map 查找，O(1) 而非 chapters.find 线性扫描）
    const topRead = (p.readChapters || []).slice(0, 5).map(k => {
      const c = KEY2CHAPTER[k];
      if (!c) return k;
      return c.num !== null && c.num !== undefined
        ? `第${c.num}章 ${c.title.replace(/^第\d+章\s*/, '')}`
        : c.title;
    });
    return {
      ...p,
      rank,
      medal: rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank,
      initial: this._avatarFallback(p.nickname),
      avatarBg: this._avatarBg(p.nickname),
      valueText: isScore ? `${p.xp} 分` : this._fmtMs(p.totalStudyMs),
      // 徽章行
      badges: isScore
        ? [`📝 ${attempts} 次答题`, `🎯 正确率 ${acc}%`, `⭐ ${p.stars}`]
        : [`📖 已读 ${p.readCount} 章`, `⭐ ${p.stars}`, `📝 ${attempts} 次答题`],
      // 详情弹层数据
      detail: {
        nickname: p.nickname,
        avatarUrl: p.avatarUrl || '',
        initial: this._avatarFallback(p.nickname),
        avatarBg: this._avatarBg(p.nickname),
        totalStudyText: this._fmtMs(p.totalStudyMs),
        readCount: p.readCount,
        xp: p.xp,
        stars: p.stars,
        attempts,
        acc,
        topQuiz,
        topRead,
      },
      isMe: me && p.nickname === me.nickname && p[field] === me[field],
    };
  },

  // 微信「头像昵称填写」：用户点自己卡片的头像选择新头像
  // 注意：chooseAvatar 返回的是 http 临时链接，直接保存会过期
  // 需要先上传到云存储换成 fileID，再保存到档案
  onChooseAvatar(e) {
    const tempUrl = (e.detail && e.detail.avatarUrl) || '';
    if (!tempUrl) return;
    const nickname = (this.data.me && this.data.me.nickname) || '';
    // 先本地展示，提升体验
    this.setData({ 'me.avatarUrl': tempUrl });

    if (!wx.cloud || !wx.cloud.uploadFile) {
      wx.showToast({ title: '当前环境不支持云存储', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '上传中…', mask: true });
    const cloudPath = `avatars/${Date.now()}-${Math.floor(Math.random() * 10000)}.png`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath: tempUrl,
      success: (uploadRes) => {
        const fileID = uploadRes.fileID;
        cloud.saveProfile({ nickname, avatarUrl: fileID }).then((r) => {
          wx.hideLoading();
          if (r && r.ok) {
            wx.showToast({ title: '头像已更新', icon: 'success' });
            this.load();
          } else {
            wx.showToast({ title: (r && r.msg) || '保存失败', icon: 'none' });
          }
        });
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: '头像上传失败，请重试', icon: 'none' });
      },
    });
  },

  // 按昵称稳定取一个渐变底色（无头像时兜底）
  _avatarBg(name) {
    const palette = [
      ['#5a7cf7', '#4353c9'], ['#f59e0b', '#d97706'], ['#10b981', '#059669'],
      ['#ec4899', '#be185d'], ['#8b5cf6', '#6d28d9'], ['#06b6d4', '#0e7490'],
      ['#f43f5e', '#be123c'], ['#84cc16', '#4d7c0f'],
      ['#f97316', '#c2410c'], ['#14b8a6', '#0f766e'], ['#a855f7', '#7e22ce'],
      ['#64748b', '#475569'], ['#e11d48', '#be123c'], ['#0ea5e9', '#0369a1'],
    ];
    let h = 0;
    const s = String(name || '');
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return palette[h % palette.length];
  },

  // 无头像时的兜底显示内容：默认 emoji 或昵称首字
  _avatarFallback(nickname) {
    // 默认昵称「学习者xxxx」显示 👤，自定义昵称显示首字
    if (!nickname || /^学习者/.test(nickname)) return '👤';
    return nickname.slice(0, 1);
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

  // 点击自己卡片的昵称也可以改（保留旧入口备用）
  onMeNickTap() {
    this.setNick();
  },

  // 昵称输入框（type="nickname"）实时同步输入值
  onNicknameInput(e) {
    this._inputNickname = e.detail.value || '';
  },

  // 失焦或点完成时保存昵称
  onNicknameBlur(e) {
    const name = String((e.detail && e.detail.value) || this._inputNickname || '').trim().slice(0, 12);
    if (!name || (this.data.me && name === this.data.me.nickname)) return;
    cloud.setNickname(name).then((r) => {
      if (r.ok) { wx.showToast({ title: '已更新', icon: 'success' }); this.load(); }
      else wx.showToast({ title: r.msg || '设置失败', icon: 'none' });
    });
  },

  // 生成并保存学习海报
  makePoster() {
    const st = store.getStudyTime();
    const records = store.getQuizRecords();
    const recordKeys = Object.keys(records);
    const gs = store.getGameStats();
    const app = getApp();
    const profile = (app && app.globalData && app.globalData.profile) || {};

    const data = {
      nickname: (this.data.me && this.data.me.nickname) || profile.nickname || '学习者',
      avatarUrl: (this.data.me && this.data.me.avatarUrl) || profile.avatarUrl || '',
      totalStudyMs: st.total,
      readCount: Object.keys(store.getReadMap()).length,
      totalChapters: 30,
      quizAttempts: recordKeys.reduce((s, k) => s + (records[k].attempts || 0), 0),
      xp: gs.xp,
      stars: gs.stars,
      myRank: this.data.myRank || 0,
      totalCount: this.data.totalCount || 0,
    };

    this._drawAndSave(data);
  },

  _drawAndSave(data) {
    const poster = require('../../utils/poster.js');
    const qrcodePath = '/assets/mp-qrcode.png';

    wx.showLoading({ title: '生成海报中…', mask: true });

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

  // 点击榜单行，打开用户学习详情
  openDetail(e) {
    const item = e.currentTarget.dataset.item;
    if (!item || !item.detail) return;
    this.setData({ detailUser: item.detail, detailRank: item.rank, showDetail: true });
  },

  closeDetail() {
    this.setData({ showDetail: false });
  },

  _fmtMs(ms) {
    const mins = Math.floor((ms || 0) / 60000);
    if (mins < 60) return mins + ' 分钟';
    return Math.floor(mins / 60) + ' 小时 ' + (mins % 60) + ' 分';
  },
});
