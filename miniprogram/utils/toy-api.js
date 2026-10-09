/**
 * ToyAgent API 请求封装
 *
 * BASE_URL 切换：
 * - 线上（当前使用）：https://ai-agent-guide.xiaofuge.cn/toy-agent/api
 *   nginx 已有 /toy-agent/ 反向代理；正式发布前需在小程序后台把该域名加入 request 合法域名
 * - 本地调试（手机与电脑同一 Wi-Fi）：http://<电脑局域网IP>:8099/api
 *   并在开发者工具「详情 → 本地设置」勾选「不校验合法域名」，手机端打开调试模式
 */
const BASE_URL = 'https://ai-agent-guide.xiaofuge.cn/toy-agent/api';

const SCOPE_KEY = 'toyagent_scope_id';

/** 会话标识：每个用户一份，服务端按 X-Scope-Id 隔离会话状态（记忆/审批挂起等） */
function scopeId() {
  let id = wx.getStorageSync(SCOPE_KEY);
  if (!id) {
    id = 'mp' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { wx.setStorageSync(SCOPE_KEY, id); } catch (e) { /* 存储失败则每次随机，不影响功能 */ }
  }
  return id;
}

/** POST /api/{stepId}/chat */
function chat(stepId, message) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + '/' + stepId + '/chat',
      method: 'POST',
      timeout: 120000,
      header: { 'Content-Type': 'application/json', 'X-Scope-Id': scopeId() },
      data: { message },
      success(res) {
        if (res.statusCode === 200) resolve(res.data);
        else reject(new Error((res.data && res.data.error) || ('HTTP ' + res.statusCode)));
      },
      fail(err) {
        reject(new Error((err && err.errMsg) || '网络请求失败'));
      }
    });
  });
}

/** POST /api/{stepId}/reset —— 清空该会话在该场景的服务端状态 */
function reset(stepId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + '/' + stepId + '/reset',
      method: 'POST',
      timeout: 15000,
      header: { 'X-Scope-Id': scopeId() },
      success(res) { (res.statusCode === 200) ? resolve(res.data) : reject(new Error('HTTP ' + res.statusCode)); },
      fail(err) { reject(new Error((err && err.errMsg) || '网络请求失败')); }
    });
  });
}

/** GET /api/config —— 模型模式（mock/real） */
function config() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + '/config',
      method: 'GET',
      timeout: 10000,
      success(res) { (res.statusCode === 200) ? resolve(res.data) : reject(new Error('HTTP ' + res.statusCode)); },
      fail(err) { reject(new Error((err && err.errMsg) || '网络请求失败')); }
    });
  });
}

module.exports = { BASE_URL, chat, reset, config, scopeId };
