/**
 * 付费解锁框架（买断制：免费章节 + 一次性解锁全部章节）
 *
 * 使用说明：
 * - 支付后端未就绪 / 审核期：保持 PAY_ENABLED = false，所有章节免费可读（便于过审和冷启动）
 * - 微信支付商户配置好后：
 *   1. 把 PAY_ENABLED 改为 true
 *   2. 在服务端实现 ORDER_API / VERIFY_API（协议见下方注释）
 *   3. 重新上传代码即可生效
 *
 * 服务端接口协议（需要后端实现，返回均为 JSON）：
 * POST ORDER_API  body: { code, productId }        // code 为 wx.login 的临时凭证
 *   -> { ok: true, payParams: { timeStamp, nonceStr, package, signType, paySign } }
 *      失败 -> { ok: false, msg: '...' }
 *   （服务端流程：code 换 openid -> 统一下单（APIv3）-> 二次签名返回 payParams）
 * POST VERIFY_API body: { code, orderId }          // 支付回调后由服务端查单确认
 *   -> { ok: true }  或 { ok: false, msg: '...' }
 */
const KEYS = {
  UNLOCKED: 'dsh_unlocked_v1',
};

const CONFIG = {
  PAY_ENABLED: false,
  FREE_CHAPTER_COUNT: 8,
  PRODUCT_ID: 'course_full',
  PRICE_LABEL: '¥29.9',
  ORDER_API: 'https://ai-agent-guide.xiaofuge.cn/api/mp/pay/order',
  VERIFY_API: 'https://ai-agent-guide.xiaofuge.cn/api/mp/pay/verify',
};

function isUnlocked() {
  if (!CONFIG.PAY_ENABLED) return true;
  return !!wx.getStorageSync(KEYS.UNLOCKED);
}

/** 章节（chapters.json 中的一项）是否可读 */
function canRead(chapter) {
  if (!CONFIG.PAY_ENABLED) return true;
  if (isUnlocked()) return true;
  return (chapter.num || 0) < CONFIG.FREE_CHAPTER_COUNT;
}

/** 展示用：该章是否显示锁标（避免免费章闪锁标） */
function isLocked(chapter) {
  return CONFIG.PAY_ENABLED && !canRead(chapter);
}

function markUnlocked() {
  wx.setStorageSync(KEYS.UNLOCKED, { time: Date.now(), productId: CONFIG.PRODUCT_ID });
}

/** 弹出解锁引导（供列表页 / 阅读页复用） */
function promptUnlock() {
  if (!CONFIG.PAY_ENABLED) return;
  wx.showModal({
    title: '付费章节',
    content: `前 ${CONFIG.FREE_CHAPTER_COUNT} 章免费，解锁全部 ${28} 章仅需 ${CONFIG.PRICE_LABEL}（一次买断，永久有效）。`,
    confirmText: '立即解锁',
    confirmColor: '#2563eb',
    success: (res) => {
      if (res.confirm) requestUnlock();
    },
  });
}

/** 发起解锁支付（真实支付需服务端支持） */
function requestUnlock() {
  if (!CONFIG.PAY_ENABLED) {
    wx.showToast({ title: '支付即将开放', icon: 'none' });
    return;
  }
  if (isUnlocked()) {
    wx.showToast({ title: '已解锁全部章节', icon: 'none' });
    return;
  }
  wx.showLoading({ title: '创建订单...', mask: true });
  wx.login({
    success: (loginRes) => {
      if (!loginRes.code) {
        wx.hideLoading();
        return wx.showToast({ title: '登录失败，请重试', icon: 'none' });
      }
      wx.request({
        url: CONFIG.ORDER_API,
        method: 'POST',
        data: { code: loginRes.code, productId: CONFIG.PRODUCT_ID },
        success: (res) => {
          const data = res.data || {};
          wx.hideLoading();
          if (!data.ok || !data.payParams) {
            return wx.showToast({ title: data.msg || '下单失败，请稍后重试', icon: 'none' });
          }
          wx.requestPayment({
            ...data.payParams,
            success: () => verifyPayment(loginRes.code, data.orderId),
            fail: () => wx.showToast({ title: '支付未完成', icon: 'none' }),
          });
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: '网络异常，请重试', icon: 'none' });
        },
      });
    },
    fail: () => {
      wx.hideLoading();
      wx.showToast({ title: '登录失败，请重试', icon: 'none' });
    },
  });
}

function verifyPayment(code, orderId) {
  wx.showLoading({ title: '确认支付...', mask: true });
  wx.request({
    url: CONFIG.VERIFY_API,
    method: 'POST',
    data: { code, orderId },
    success: (res) => {
      wx.hideLoading();
      if (res.data && res.data.ok) {
        markUnlocked();
        wx.showToast({ title: '解锁成功', icon: 'success' });
        if (typeof getCurrentPages === 'function') {
          const pages = getCurrentPages();
          const top = pages[pages.length - 1];
          if (top && typeof top.onShow === 'function') top.onShow();
        }
      } else {
        wx.showModal({
          title: '支付结果确认中',
          content: (res.data && res.data.msg) || '如已扣款，稍后重新进入本页即可自动恢复解锁。',
          showCancel: false,
        });
      }
    },
    fail: () => {
      wx.hideLoading();
      wx.showModal({
        title: '支付结果确认中',
        content: '网络异常，如已扣款，稍后重新进入小程序即可恢复解锁。',
        showCancel: false,
      });
    },
  });
}

/** 开发调试用：清除解锁标记 */
function resetUnlock() {
  wx.removeStorageSync(KEYS.UNLOCKED);
}

module.exports = {
  CONFIG,
  isUnlocked,
  canRead,
  isLocked,
  promptUnlock,
  requestUnlock,
  markUnlocked,
  resetUnlock,
};
