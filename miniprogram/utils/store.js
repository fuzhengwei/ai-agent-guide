/**
 * 学习进度与做题记录存储（基于 wx.setStorageSync）
 */
const KEYS = {
  READ_MAP: 'dsh_read_map',
  QUIZ_RECORDS: 'dsh_quiz_records',
  READ_POS: 'dsh_read_pos',        // 各章节阅读位置 { key: { top, time } }
  LAST_CHAPTER: 'dsh_last_chapter',// 最近打开的章节 { key, slug, pkg, title, time }
  STUDY_TIME: 'dsh_study_time',    // { total: ms, days: { 'YYYY-MM-DD': ms } }
};

// 星级规则：正确率 >=90% 三星 / >=70% 两星 / >=60% 一星（通关）
const PASS_RATIO = 0.6;

function getReadMap() {
  return wx.getStorageSync(KEYS.READ_MAP) || {};
}

/* ===== 阅读位置记忆（微信文章式：离开后再进自动回到上次位置） ===== */

function saveReadPos(chKey, top, pct) {
  if (!chKey || typeof top !== 'number') return;
  try {
    const map = wx.getStorageSync(KEYS.READ_POS) || {};
    map[chKey] = { top: Math.max(0, Math.round(top)), pct: typeof pct === 'number' ? Math.min(100, Math.max(0, pct)) : undefined, time: Date.now() };
    wx.setStorageSync(KEYS.READ_POS, map);
  } catch (e) {}
}

function getReadPos(chKey) {
  try {
    const map = wx.getStorageSync(KEYS.READ_POS) || {};
    const rec = map[chKey];
    return rec && typeof rec.top === 'number' && rec.top > 0 ? rec : null;
  } catch (e) { return null; }
}

// 记录最近打开的章节（首页「继续上次阅读」提示用）
function setLastChapter(info) {
  if (!info || !info.key) return;
  try {
    wx.setStorageSync(KEYS.LAST_CHAPTER, Object.assign({ time: Date.now() }, info));
  } catch (e) {}
}

function getLastChapter() {
  try {
    return wx.getStorageSync(KEYS.LAST_CHAPTER) || null;
  } catch (e) { return null; }
}

function markRead(chKey) {
  const map = getReadMap();
  if (!map[chKey]) {
    map[chKey] = { time: Date.now() };
    wx.setStorageSync(KEYS.READ_MAP, map);
  }
}

function getQuizRecords() {
  return wx.getStorageSync(KEYS.QUIZ_RECORDS) || {};
}

function calcStars(correct, total) {
  if (!total) return 0;
  const r = correct / total;
  if (r >= 0.9) return 3;
  if (r >= 0.7) return 2;
  if (r >= PASS_RATIO) return 1;
  return 0;
}

function isPassed(rec) {
  return !!(rec && rec.total && rec.correct / rec.total >= PASS_RATIO);
}

function saveQuizResult(chKey, result) {
  const records = getQuizRecords();
  const prev = records[chKey] || { best: 0, attempts: 0, bestScore: 0, stars: 0 };
  const stars = Math.max(result.stars || 0, calcStars(result.correct, result.total));
  records[chKey] = {
    best: Math.max(prev.best || 0, result.correct),
    bestScore: Math.max(prev.bestScore || 0, result.score || 0),
    stars,
    attempts: (prev.attempts || 0) + 1,
    correct: result.correct,
    total: result.total,
    wrongIds: result.wrongIds || prev.wrongIds || [],
    time: Date.now(),
  };
  wx.setStorageSync(KEYS.QUIZ_RECORDS, records);
}

// 错题本：把答对的题从该场错题记录中移除（错题重练模式用）
function removeWrongIds(chKey, ids) {
  if (!ids || !ids.length) return;
  const records = getQuizRecords();
  const rec = records[chKey];
  if (!rec || !rec.wrongIds) return;
  rec.wrongIds = rec.wrongIds.filter(id => ids.indexOf(id) === -1);
  wx.setStorageSync(KEYS.QUIZ_RECORDS, records);
}

// 全局学习统计：总积分（各关最佳分之和）、总星数、通关数
function getGameStats() {
  const records = getQuizRecords();
  let xp = 0, stars = 0, passed = 0;
  Object.keys(records).forEach(k => {
    xp += records[k].bestScore || 0;
    stars += records[k].stars || 0;
    if (isPassed(records[k])) passed++;
  });
  return { xp, stars, passed };
}

function clearAll() {
  wx.removeStorageSync(KEYS.READ_MAP);
  wx.removeStorageSync(KEYS.QUIZ_RECORDS);
  wx.removeStorageSync(KEYS.READ_POS);
  wx.removeStorageSync(KEYS.LAST_CHAPTER);
  wx.removeStorageSync(KEYS.STUDY_TIME);
}

/* ===== 学习时长统计 ===== */

function _getStudyTime() {
  try {
    const d = wx.getStorageSync(KEYS.STUDY_TIME) || {};
    return { total: d.total || 0, days: d.days || {} };
  } catch (e) { return { total: 0, days: {} }; }
}

// 累加学习时长（ms），同时记入当日
function addStudyTime(ms) {
  if (!ms || ms <= 0) return;
  const d = _getStudyTime();
  d.total += ms;
  const day = _today();
  d.days[day] = (d.days[day] || 0) + ms;
  try { wx.setStorageSync(KEYS.STUDY_TIME, d); } catch (e) {}
}

function getStudyTime() {
  const d = _getStudyTime();
  return { total: d.total, days: Object.keys(d.days).length, todayMs: d.days[_today()] || 0 };
}

function _today() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

module.exports = {
  getReadMap, markRead,
  saveReadPos, getReadPos, setLastChapter, getLastChapter,
  getQuizRecords, saveQuizResult, calcStars, isPassed, getGameStats,
  removeWrongIds,
  addStudyTime, getStudyTime,
  clearAll,
};
