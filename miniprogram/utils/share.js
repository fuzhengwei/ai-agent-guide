/**
 * share.js — 统一分享/转发配置
 *
 * 微信页面只有两个分享出口：
 *   onShareAppMessage  —— 转发给好友/群（触发右上角胶囊「发送给朋友」及分享按钮）
 *   onShareTimeline    —— 分享到朋友圈（页面必须定义该方法，「分享到朋友圈」入口才可用）
 *
 * 各页面只需在 Page({...}) 中注入 share.attach(title, path, extra)，
 * 即可同时获得「发送给朋友 + 朋友圈」两个入口。
 */

// 分享卡片小图（500x400，微信建议 5:4；为空则微信自动截取页面截图）
const SHARE_IMAGE = '/assets/share-card.png';

function payload(title, path, extra) {
  const p = Object.assign({ title, path }, extra || {});
  if (SHARE_IMAGE) p.imageUrl = SHARE_IMAGE;
  return p;
}

/**
 * 生成可直接混入 Page 定义的分享方法对象。
 * @param {string|function} title 分享标题（或返回标题的函数，this 指向页面实例）
 * @param {string|function} path  分享路径，须以 / 开头（或返回路径的函数）
 * @param {object} [extra]        额外字段（如 imageUrl、query 等）
 */
function attach(title, path, extra) {
  const resolve = (v, ctx) => (typeof v === 'function' ? v.call(ctx) : v);
  return {
    onShareAppMessage() {
      return payload(resolve(title, this), resolve(path, this), extra);
    },
    onShareTimeline() {
      // 朋友圈分享：title 生效；path 中不允许带 query，query 需拆到 query 字段
      const p = resolve(path, this) || '';
      const idx = p.indexOf('?');
      const opt = { title: resolve(title, this) };
      if (idx !== -1) opt.query = p.slice(idx + 1);
      if (SHARE_IMAGE) opt.imageUrl = SHARE_IMAGE;
      return opt;
    },
  };
}

module.exports = { attach };
