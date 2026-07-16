/**
 * 版本检测 & 缓存清理
 * 
 * 工作原理：
 * 1. 页面加载时，请求 /version.json?t=时间戳（避免缓存）
 * 2. 对比本地 localStorage 中的版本号
 * 3. 如果版本号变化，清除所有缓存并刷新页面
 * 
 * 部署时只需更新 /version.json 中的 version 字段即可触发全站刷新
 */
(function() {
  const VERSION_KEY = 'ai-agent-guide-version';
  const CHECK_INTERVAL = 5 * 60 * 1000; // 5分钟检查一次

  async function checkVersion() {
    try {
      const response = await fetch('/version.json?t=' + Date.now());
      if (!response.ok) return;
      
      const data = await response.json();
      const serverVersion = data.version;
      
      if (!serverVersion) return;
      
      const localVersion = localStorage.getItem(VERSION_KEY);
      
      if (localVersion && localVersion !== serverVersion) {
        // 版本变了，清除缓存并刷新
        console.log('[Version] 检测到新版本:', localVersion, '→', serverVersion);
        
        // 清除 localStorage 中的 API 配置之外的数据
        const apiConfigs = localStorage.getItem('ai-agent-guide-api-configs');
        localStorage.clear();
        if (apiConfigs) {
          localStorage.setItem('ai-agent-guide-api-configs', apiConfigs);
        }
        
        // 保存新版本号
        localStorage.setItem(VERSION_KEY, serverVersion);
        
        // 清除所有 Service Worker 缓存
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        // 刷新页面（强制从服务器获取最新资源）
        window.location.reload(true);
        return;
      }
      
      // 保存当前版本号
      if (!localVersion) {
        localStorage.setItem(VERSION_KEY, serverVersion);
      }
    } catch (e) {
      // 版本检测失败不影响正常使用
      console.warn('[Version] 版本检测失败:', e.message);
    }
  }

  // 页面加载完成后检查
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkVersion);
  } else {
    checkVersion();
  }

  // 定期检查（用户长时间停留在页面时）
  setInterval(checkVersion, CHECK_INTERVAL);

  // 用户切回标签页时立即检查
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      checkVersion();
    }
  });
})();
