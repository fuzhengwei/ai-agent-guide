#!/usr/bin/env node
/**
 * miniprogram-ci 预览流水线：编译并生成体验二维码（手机扫码即测，无需上传/审核）
 * 用法：NODE_PATH=<workspace>/node_modules node ci/preview.js <version>
 * 示例：node ci/preview.js 1.1.8
 *
 * 产物：ci/preview-qrcode-<version>.jpg （微信扫码进入预览版）
 * 前置条件同 ci/upload.js（private.key + IP 白名单 + 开发者权限）
 */
const fs = require('fs');
const path = require('path');
const ci = require('miniprogram-ci');

const ROOT = path.resolve(__dirname, '..');
const MP_DIR = path.join(ROOT, 'miniprogram');
const KEY_PATH = path.join(__dirname, 'private.key');

async function main() {
  const [version] = process.argv.slice(2);
  if (!version) {
    console.error('用法: node ci/preview.js <version>');
    process.exit(1);
  }
  if (!fs.existsSync(KEY_PATH)) {
    console.error('❌ 未找到 ci/private.key —— 请按 ci/upload.js 头部说明下载代码上传密钥');
    process.exit(1);
  }
  const projectConfig = JSON.parse(fs.readFileSync(path.join(MP_DIR, 'project.config.json'), 'utf8'));
  const qrcodePath = path.join(__dirname, `preview-qrcode-${version}.jpg`);

  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: MP_DIR,
    privateKeyPath: KEY_PATH,
    ignores: ['node_modules/**/*'],
  });

  try {
    const res = await ci.preview({
      project,
      version,
      desc: `v${version} 预览`,
      setting: { es6: true, es7: true, minified: true, autoPrefixWXSS: true },
      qrcodeFormat: 'image',
      qrcodeOutputDest: qrcodePath,
      robot: 1,
      // 预览默认进首页
      pagePath: 'pages/index/index',
    });
    console.log('✅ 预览编译成功');
    console.log(`   版本: ${version}`);
    console.log(`   二维码: ${qrcodePath}`);
    console.log('   用微信扫码即可在手机上体验（有效期约 25 分钟，过期重跑即可）');
    if (res && res.subPackageInfo) {
      console.log('   分包: ' + res.subPackageInfo.map(p => `${p.name || '主包'} ${(p.size / 1024).toFixed(0)}KB`).join(', '));
    }
  } catch (err) {
    console.error('❌ 预览失败:', err.message);
    console.error('   常见原因: private.key 无效 / IP 白名单限制 / AppID 不匹配 / 无开发者权限');
    process.exit(1);
  }
}

main();
