/**
 * 学习进度与做题记录存储（基于 wx.setStorageSync）
 */
const KEYS = {
  READ_MAP: 'dsh_read_map',
  QUIZ_RECORDS: 'dsh_quiz_records',
};

// 星级规则：正确率 >=90% 三星 / >=70% 两星 / >=60% 一星（通关）
const PASS_RATIO = 0.6;

function getReadMap() {
  return wx.getStorageSync(KEYS.READ_MAP) || {};
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
    time: Date.now(),
  };
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
}

module.exports = {
  getReadMap, markRead,
  getQuizRecords, saveQuizResult, calcStars, isPassed, getGameStats,
  clearAll,
};
