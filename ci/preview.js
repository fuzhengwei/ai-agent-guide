#!/usr/bin/env node
/**
 * miniprogram-ci 生成体验版二维码
 * 用法：NODE_PATH=<workspace>/node_modules node ci/preview.js <version>
 * 生成 ci/preview-qrcode.jpg，微信扫码即可进入体验版
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
    console.error('❌ 未找到 ci/private.key');
    process.exit(1);
  }
  const projectConfig = JSON.parse(fs.readFileSync(path.join(MP_DIR, 'project.config.json'), 'utf8'));

  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: MP_DIR,
    privateKeyPath: KEY_PATH,
    ignores: ['node_modules/**/*'],
  });

  const result = await ci.preview({
    project,
    version,
    desc: `v${version} 体验版`,
    setting: { es6: true, es7: true, minified: true, autoPrefixWXSS: true },
    robot: 1,
    qrcodeFormat: 'image',
    qrcodeOutputDest: path.join(__dirname, 'preview-qrcode.jpg'),
  });
  console.log('✅ 体验版二维码已生成：ci/preview-qrcode.jpg');
}

main().catch(err => {
  console.error('❌ 生成失败:', err.message);
  process.exit(1);
});
