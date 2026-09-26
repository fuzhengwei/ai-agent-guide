import * as fs from 'fs'
import * as path from 'path'

function loadPackage() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString())
  } catch (e) {
    // 某些场景下可能无法成功加载到 package.json 文件
  }
  return {
    version: 'unknow'
  }
}

export const version = loadPackage().version
