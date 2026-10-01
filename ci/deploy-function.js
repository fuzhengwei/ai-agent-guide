#!/usr/bin/env node
/**
 * miniprogram-ci 部署云函数（免开微信开发者工具）
 * 用法：NODE_PATH=<workspace>/node_modules node ci/deploy-function.js <函数名> [函数名2 ...]
 * 示例：node ci/deploy-function.js leaderboard
 *       node ci/deploy-function.js leaderboard tts
 *
 * 前置条件与 ci/upload.js 相同：ci/private.key + IP 白名单。
 * 环境变量 WX_CLOUD_ENV 可覆盖默认云环境 ID。
 */
const fs = require('fs');
const path = require('path');
const ci = require('miniprogram-ci');

const ROOT = path.resolve(__dirname, '..');
const MP_DIR = path.join(ROOT, 'miniprogram');
const KEY_PATH = path.join(__dirname, 'private.key');
const CLOUD_ROOT = path.join(MP_DIR, 'cloudfunctions');
const ENV = process.env.WX_CLOUD_ENV || 'cloudbase-d6gmq1a9v43f0c2a3';

async function deployOne(project, name) {
  const fnDir = path.join(CLOUD_ROOT, name);
  if (!fs.existsSync(path.join(fnDir, 'index.js'))) {
    throw new Error(`找不到云函数目录: ${fnDir}`);
  }
  console.log(`⏳ 部署云函数 ${name} → ${ENV} (remoteNpmInstall: true)`);
  const result = await ci.cloud.uploadFunction({
    project,
    env: ENV,
    name,
    path: fnDir,
    remoteNpmInstall: true, // 远端安装 package.json 依赖（如 wx-server-sdk）
  });
  console.log(`✅ ${name} 部署完成`, result || '');
}

async function main() {
  const names = process.argv.slice(2);
  if (!names.length) {
    console.error('用法: node ci/deploy-function.js <函数名> [函数名2 ...]');
    process.exit(1);
  }
  if (!fs.existsSync(KEY_PATH)) {
    console.error('❌ 未找到 ci/private.key —— 请按 ci/upload.js 头部说明下载代码上传密钥');
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
  const failed = [];
  for (const name of names) {
    try {
      await deployOne(project, name);
    } catch (err) {
      failed.push(name);
      console.error(`❌ ${name} 部署失败:`, err.message);
    }
  }
  if (failed.length) {
    console.error(`❗ 以下函数部署失败: ${failed.join(', ')}`);
    process.exit(1);
  }
  console.log('🎉 全部部署完成');
}

main().catch((err) => {
  console.error('❌ 部署失败:', err.message);
  process.exit(1);
});
