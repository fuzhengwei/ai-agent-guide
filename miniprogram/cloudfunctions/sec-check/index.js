// sec-check：微信内容安全校验（msgSecCheck v2）
// 用户输入与 AI 输出在小程序内展示前，统一经此云函数校验；密钥全程留在云端
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event) => {
  const text = String((event && event.text) || '').trim();
  // scene: 1=资料 2=评论 3=论坛 4=社交日志；对话场景用 2
  const scene = Number((event && event.scene) || 2);
  if (!text) return { ok: true };

  try {
    const res = await cloud.openapi.security.msgSecCheck({
      version: 2,
      scene: scene,
      openid: cloud.getWXContext().OPENID,
      content: text.slice(0, 2500),
    });
    const suggest = res && res.result && res.result.suggest;
    return { ok: suggest === 'pass', suggest: suggest || '' };
  } catch (e) {
    const code = e && (e.errCode !== undefined ? e.errCode : e.errorCode);
    // 87014 = 内容存在风险 → 明确拦截
    if (String(code) === '87014' || /87014/.test((e && e.errMsg) || '')) {
      return { ok: false };
    }
    // 接口异常降级放行（不阻断教学主流程），标记 degraded 便于排查
    return { ok: true, degraded: true, errCode: code || '', errMsg: (e && e.errMsg) || '' };
  }
};
