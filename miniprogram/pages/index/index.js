const chapters = require('../../data/chapters.js');
const store = require('../../utils/store.js');
const pay = require('../../utils/pay.js');
const share = require('../../utils/share.js');
const cloud = require('../../utils/cloud.js');
const tts = require('../../utils/tts.js');

const app = getApp();

// 阶段划分（按章节显示序号 num 分组）
const STAGES = [
  { name: '入门认知', icon: '🌱', desc: '从零理解 Agent 是什么', color: 'green', nums: [0, 1, 2, 3, 4] },
  { name: '核心机制', icon: '⚙️', desc: 'ReAct · 上下文 · 记忆 · RAG', color: 'blue', nums: [5, 6, 7, 8, 9, 10, 11, 12] },
  { name: '工具与能力', icon: '🛠️', desc: 'FC · MCP · Skills · 多 Agent', color: 'purple', nums: [13, 14, 15, 16, 17, 18, 19] },
  { name: '平台实战', icon: '🚀', desc: 'Dify · CLI Agent · GUI', color: 'orange', nums: [20, 21, 22] },
  { name: '工程化进阶', icon: '🏔️', desc: '评估 · 安全 · 部署 · 展望', color: 'red', nums: [23, 24, 25, 26, 27, 28, 29] },
];

// 正式章节数（排除 num 为 null 的大厂真题场等非章节条目）
const REAL_CHAPTER_COUNT = chapters.filter(c => typeof c.num === 'number').length;

Page({
  data: {
    stages: [],
    totalChapters: 0,
    readCount: 0,
    totalQuestions: 508,
    nextChapter: null,   // 继续学习目标
    studyTimeText: '',
    studyDays: 0,
    payEnabled: pay.CONFIG.PAY_ENABLED,
    priceLabel: pay.CONFIG.PRICE_LABEL,
    freeCount: pay.CONFIG.FREE_CHAPTER_COUNT,
    userAvatar: '',
    userName: '',
    nowPlaying: null,   // 正在朗读：{ title, state, chapterId, key, pkg, slug }
  },

  onShow() {
    this._refreshUser();
    const readMap = store.getReadMap();
    // 只统计正式章节（num 为 number），大厂真题场等非章节条目不进首页章节列表
    const enriched = chapters.filter(c => typeof c.num === 'number').map((c, i) => {
      const pos = store.getReadPos(c.key);
      // readPct：有明确 pct 用之；没有但有位置且已读过，按位置粗估；都没则 0
      let readPct = 0;
      if (pos) {
        if (typeof pos.pct === 'number') readPct = pos.pct;
        else if (pos.top >= 300) readPct = Math.min(95, Math.round(pos.top / 200)); // 粗估
      }
      if (readMap[c.key] && readPct < 100 && readPct === 0) readPct = 5; // 打开过但没滚动
      return {
        ...c,
        index: i,
        read: !!readMap[c.key],
        readPct: Math.min(100, readPct),
        locked: pay.isLocked(c),
      };
    });

    const stages = STAGES.map(st => {
      const list = enriched.filter(c => st.nums.includes(c.num));
      return {
        ...st,
        list,
        done: list.filter(c => c.read).length,
      };
    }).filter(st => st.list.length);

    // 继续学习：优先「最近打开且未读完」的章节，其次第一个未读
    const last = store.getLastChapter();
    let nextChapter = enriched.find(c => c.key === (last && last.key) && !c.read);
    if (!nextChapter) nextChapter = enriched.find(c => !c.read);
    if (!nextChapter) nextChapter = enriched[enriched.length - 1];

    // 学习时长展示
    const st = store.getStudyTime();
    const totalMin = Math.floor(st.total / 60000);
    const studyTimeText = totalMin >= 60
      ? `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`
      : (totalMin > 0 ? `${totalMin}m` : '未开始');

    this.setData({
      stages,
      totalChapters: REAL_CHAPTER_COUNT,
      readCount: enriched.filter(c => c.read).length,
      nextChapter,
      studyTimeText,
      studyDays: st.days,
    });

    this._promptResume(enriched);

    // 「正在朗读」迷你播放条：订阅全局朗读状态（离开章节页后朗读继续）
    if (this._unsubTts) this._unsubTts();
    this._unsubTts = tts.onStateChange((info) => this._syncNowPlaying(info));
    this._syncNowPlaying(tts.getPlaying());
  },

  onHide() {
    if (this._unsubTts) { this._unsubTts(); this._unsubTts = null; }
  },

  onUnload() {
    if (this._unsubTts) { this._unsubTts(); this._unsubTts = null; }
  },

  /* ===== 正在朗读迷你播放条 ===== */
  _syncNowPlaying(info) {
    if (!info || !info.state || info.state === 'idle' || info.state === 'finished') {
      if (this.data.nowPlaying) this.setData({ nowPlaying: null });
      return;
    }
    // source=qa 是面试题语音讲解（无对应章节条目），单独标记跳回讲解页
    if (info.source === 'qa') {
      this.setData({
        nowPlaying: {
          title: info.title || '面试题语音讲解',
          state: info.state,
          source: 'qa',
          key: '',
          pkg: '',
          slug: '',
        },
      });
      return;
    }
    const ch = chapters.find(c => c.key === info.chapterId);
    this.setData({
      nowPlaying: {
        title: info.title || '语音朗读',
        state: info.state,
        source: 'reader',
        chapterId: info.chapterId || '',
        key: ch ? ch.key : '',
        pkg: ch ? ch.pkg : '',
        slug: ch ? ch.slug : '',
      },
    });
  },

  // 点播放条：跳回正在朗读的章节 / 面试题讲解页
  npOpen() {
    const np = this.data.nowPlaying;
    if (!np) return;
    if (np.source === 'qa') {
      wx.navigateTo({ url: '/packages/quiz/pages/qa-listen/qa-listen' });
      return;
    }
    if (!np.key) return;
    wx.navigateTo({ url: `/packages/${np.pkg}/pages/reader/reader?key=${np.key}&slug=${np.slug}` });
  },

  // 播放/暂停切换
  npToggle() {
    const g = tts.getPlaying();
    if (!g) { this.setData({ nowPlaying: null }); return; }
    if (g.state === 'paused') tts.resumeActive();
    else tts.pauseActive();
  },

  // 停止朗读
  npStop() {
    tts.stopActive();
    this.setData({ nowPlaying: null });
  },

  // 微信文章式：再次打开时提示是否继续上次读到的章节/位置
  _promptResume(enriched) {
    if (this._resumeAsked) return;
    const last = store.getLastChapter();
    if (!last || !last.key) return;
    const ch = enriched.find(c => c.key === last.key);
    if (!ch) return;
    // 上次阅读位置太靠开头就不打扰
    const pos = store.getReadPos(last.key);
    if (!pos || pos.top < 300) return;
    // 看完的章节（在最后一屏附近）也不再提示
    this._resumeAsked = true;
    if (pay.isLocked(ch)) return;
    wx.showModal({
      title: '继续上次阅读',
      content: '上次读到「' + (ch.title || '') + '」，是否继续？',
      confirmText: '继续阅读',
      cancelText: '不了',
      success: (res) => {
        if (!res.confirm) return;
        wx.navigateTo({
          url: `/packages/${ch.pkg}/pages/reader/reader?key=${ch.key}&slug=${ch.slug}`,
        });
      },
    });
  },

  tapContinue() {
    const c = this.data.nextChapter;
    if (!c) return;
    if (pay.isLocked(c)) return pay.promptUnlock();
    wx.navigateTo({ url: `/packages/${c.pkg}/pages/reader/reader?key=${c.key}&slug=${c.slug}` });
  },

  tapUnlock() {
    pay.requestUnlock();
  },

  openChapter(e) {
    const { key, pkg, slug } = e.currentTarget.dataset;
    const chapter = chapters.find(c => c.key === key);
    if (pay.isLocked(chapter)) {
      pay.promptUnlock();
      return;
    }
    wx.navigateTo({
      url: `/packages/${pkg}/pages/reader/reader?key=${key}&slug=${slug}`,
    });
  },

  // 分享/转发（含朋友圈入口）
  ...share.attach(
    'AI Agent 通识教程：' + REAL_CHAPTER_COUNT + ' 章学会 Agent 开发，配 508 道大厂面试题',
    '/pages/index/index'
  ),

  /* ===== 用户登录/头像 ===== */

  _refreshUser() {
    // 优先读全局缓存（静默登录已写入）
    const p = (app.globalData && app.globalData.profile) || null;
    // 「微信用户」是旧版 wx.getUserProfile 的默认昵称，视为未登录，强制重新授权
    const isLegacyDefault = (n) => !n || n === '微信用户' || n === '微信用户 ';
    // 历史脏数据：wx.chooseAvatar 的临时路径（wxfile://、http://tmp）已失效，视为未设置头像
    if (p && cloud.validAvatar(p.avatarUrl) && !isLegacyDefault(p.nickname)) {
      this.setData({ userAvatar: cloud.validAvatar(p.avatarUrl), userName: p.nickname });
      return;
    }
    // 本地缓存兜底（同样过滤旧版默认昵称与失效临时路径）
    const cached = store.getUserProfile();
    if (cached && cloud.validAvatar(cached.avatarUrl) && !isLegacyDefault(cached.nickname)) {
      this.setData({ userAvatar: cloud.validAvatar(cached.avatarUrl), userName: cached.nickname });
      return;
    }
    // 静默登录完成后回填
    if (app && app.onLoginReady) {
      app.onLoginReady((res) => {
        const prof = res && res.profile;
        if (prof && cloud.validAvatar(prof.avatarUrl) && !isLegacyDefault(prof.nickname)) {
          this.setData({ userAvatar: cloud.validAvatar(prof.avatarUrl), userName: prof.nickname });
        }
      });
    }
  },

  onUserTap() {
    // 已登录：跳转到「我的」页
    if (this.data.userAvatar) {
      wx.switchTab({ url: '/pages/mine/mine' });
      return;
    }
    // 未登录：清掉旧缓存，走 chooseAvatar 授权
    store.setUserProfile(null);
    this.setData({ userAvatar: '', userName: '' });
  },

  // 微信新授权流程：chooseAvatar 返回头像临时路径
  // ⚠️ 临时路径会过期：必须先上传云存储换 fileID 再保存（与「我的」页/排行榜入口一致）
  onChooseAvatar(e) {
    const tempUrl = e.detail.avatarUrl;
    if (!tempUrl) return;
    // 弹出昵称输入框
    wx.showModal({
      title: '设置昵称',
      editable: true,
      placeholderText: '输入你的昵称',
      success: (res) => {
        const nickname = (res.content || '').trim() || '学习者';
        if (!res.confirm) return;
        // 本地先展示临时图提升体验，上传完成后落库 fileID
        this.setData({ userAvatar: tempUrl });
        wx.showLoading({ title: '上传中…', mask: true });
        cloud.uploadAvatar(tempUrl).then((fileID) => {
          wx.hideLoading();
          this._finishLogin({ nickname, avatarUrl: fileID });
        }).catch(() => {
          wx.hideLoading();
          wx.showToast({ title: '头像上传失败，请重试', icon: 'none' });
          this.setData({ userAvatar: '' });
        });
      },
    });
  },

  _finishLogin(profile) {
    store.setUserProfile(profile);
    this.setData({ userAvatar: profile.avatarUrl, userName: profile.nickname });
    // 同步到云端
    if (cloud.ready()) {
      cloud.saveProfile(profile).then((r) => {
        if (r.ok && app.globalData) {
          app.globalData.profile = Object.assign({}, app.globalData.profile, profile);
        }
      });
    }
    wx.showToast({ title: '登录成功', icon: 'success' });
  },
});
