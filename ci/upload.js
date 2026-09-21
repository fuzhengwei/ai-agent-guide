#!/usr/bin/env node
/**
 * miniprogram-ci 上传流水线
 * 用法：NODE_PATH=<workspace>/node_modules node ci/upload.js <version> [desc]
 * 示例：node ci/upload.js 1.1.0 "修复题库映射；新增付费解锁框架"
 *
 * 前置条件（一次性）：
 * 1. npm install --prefix <workspace目录> miniprogram-ci   （已装可跳过）
 * 2. mp.weixin.qq.com 后台「开发 -> 开发设置 -> 小程序代码上传」
 *    生成代码上传密钥，保存为 ci/private.key（不要提交到 git）
 * 3. 同页 IP 白名单：加入本机出口 IP 或临时关闭
 * 4. 后台「成员管理」确认上传者具备开发者权限
 */
const fs = require('fs');
const path = require('path');
const ci = require('miniprogram-ci');

const ROOT = path.resolve(__dirname, '..');
const MP_DIR = path.join(ROOT, 'miniprogram');
const KEY_PATH = path.join(__dirname, 'private.key');

function main() {
  const [version, descArg] = process.argv.slice(2);
  if (!version) {
    console.error('用法: node ci/upload.js <version> [desc]');
    process.exit(1);
  }
  if (!fs.existsSync(KEY_PATH)) {
    console.error('❌ 未找到 ci/private.key —— 请按脚本头部说明下载代码上传密钥');
    process.exit(1);
  }
  const projectConfig = JSON.parse(fs.readFileSync(path.join(MP_DIR, 'project.config.json'), 'utf8'));
  const versionJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'version.json'), 'utf8'));
  const desc = descArg || `v${version} ${versionJson.changelog || ''}`.slice(0, 90);

  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: MP_DIR,
    privateKeyPath: KEY_PATH,
    ignores: ['node_modules/**/*'],
  });

  ci.upload({
    project,
    version,
    desc,
    setting: {
      es6: true,
      es7: true,
      minified: true,
      autoPrefixWXSS: true,
    },
    robot: 1, // 开发版机器人编号 1-30
  })
    .then((res) => {
      console.log('✅ 上传成功');
      console.log(`   版本: ${version}`);
      console.log(`   包体积: ${(res.subPackageInfo || []).map(p => `${p.name || '主包'} ${(p.size / 1024).toFixed(0)}KB`).join(', ') || '见后台'}`);
      console.log('   下一步: mp.weixin.qq.com「版本管理 -> 开发版本」查看并提交审核（提审需管理员扫码）');
    })
    .catch((err) => {
      console.error('❌ 上传失败:', err.message);
      console.error('   常见原因: private.key 无效 / IP 白名单限制 / AppID 不匹配 / 无上传权限');
      process.exit(1);
    });
}

main();
