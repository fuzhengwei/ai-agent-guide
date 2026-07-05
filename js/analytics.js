/* ========================================
   百度统计统一模块
   跟踪页面浏览和用户行为
   ======================================== */

const BaiduAnalytics = {
  /** 百度统计 ID（从配置读取，方便替换） */
  _trackingId: 'b5ff9396a08fa323bde6290fbe248a3b',
  _initialized: false,

  /**
   * 初始化百度统计（注入 HM 脚本）
   */
  init() {
    if (this._initialized) return;
    this._initialized = true;

    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + this._trackingId;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  },

  /**
   * 上报页面浏览
   * @param {string} pageName - 页面名称（如 "首页"、"第1章 大模型与Agent基础概念"）
   */
  trackPageView(pageName) {
    if (typeof _hmt === 'undefined') {
      console.warn('[百度统计] 尚未初始化，跳过页面上报:', pageName);
      return;
    }
    // _hmt.push(['_trackPageview', '/some_page']);
    _hmt.push(['_trackPageview', '/#' + (pageName || window.location.hash)]);
    console.log('[百度统计] 页面浏览:', pageName || window.location.hash);
  },

  /**
   * 上报自定义事件
   * @param {string} eventCategory - 事件分类（如 "考试", "答题", "AI对话"）
   * @param {string} eventAction - 事件动作（如 "submit", "start", "complete"）
   * @param {string} eventLabel - 事件标签（如 "第1章", "单选题"）
   * @param {number} [eventValue] - 事件值（可选，数值型）
   */
  trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
    if (typeof _hmt === 'undefined') {
      console.warn('[百度统计] 尚未初始化，跳过事件上报:', eventCategory, eventAction);
      return;
    }
    var eventData = [eventCategory, eventAction, eventLabel];
    if (eventValue !== undefined) {
      eventData.push(eventValue);
    }
    _hmt.push(['_trackEvent', ...eventData]);
    console.log('[百度统计] 事件:', eventCategory, eventAction, eventLabel, eventValue !== undefined ? '值:' + eventValue : '');
  }
};

// 页面加载时自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    BaiduAnalytics.init();
  });
} else {
  BaiduAnalytics.init();
}

// 导出到全局
window.BaiduAnalytics = BaiduAnalytics;
