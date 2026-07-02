/**
 * 轻量 CORS Proxy — 代理 /chat/completions 请求，绕过浏览器 CORS 限制
 * 用法: node cors-proxy.js [port]
 * 默认端口: 8091
 * 
 * 浏览器请求: http://localhost:8091/proxy/chat/completions
 * 代理转发到: {baseUrl}/chat/completions
 * 
 * baseUrl 从请求头 X-Base-URL 获取（chat.js 传入）
 */

const http = require('http');
const https = require('https');

const PORT = parseInt(process.argv[2] || '8091', 10);

const server = http.createServer((req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Base-URL');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // 从请求头获取 baseUrl
  const baseUrl = req.headers['x-base-url'] || 'https://api.openai.com/v1';
  if (!baseUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing X-Base-URL header');
    return;
  }

  // 目标 URL
  const targetUrl = baseUrl.replace(/\/$/, '') + '/chat/completions';
  const parsedUrl = new URL(targetUrl);
  const isHttps = parsedUrl.protocol === 'https:';
  const transport = isHttps ? https : http;

  // 收集请求体
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const proxyHeaders = {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization'] || '',
    };

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: proxyHeaders,
    };

    const proxyReq = transport.request(options, (proxyRes) => {
      // 判断是否为 SSE 流式响应
      const isStream = proxyRes.headers['content-type']?.includes('text/event-stream') || 
                        proxyRes.headers['content-type']?.includes('text/plain');
      
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': proxyRes.headers['content-type'] || 'application/json',
        'X-Proxied-By': 'cors-proxy',
      });

      // 直接管道转发（支持 SSE 流式）
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('[CORS Proxy] Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end(`Proxy Error: ${err.message}`);
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`✅ CORS Proxy running on http://localhost:${PORT}`);
  console.log(`   Proxy endpoint: http://localhost:${PORT}/proxy/chat/completions`);
  console.log(`   Pass baseUrl via X-Base-URL header`);
});
