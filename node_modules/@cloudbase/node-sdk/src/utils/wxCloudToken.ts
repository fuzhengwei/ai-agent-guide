// 由定时触发器触发时（TRIGGER_SRC=timer）：优先使用 WX_TRIGGER_API_TOKEN_V0，不存在的话，为了兼容兼容旧的开发者工具，也是使用 WX_API_TOKEN
// 非定时触发器触发时（TRIGGER_SRC!=timer）: 使用 WX_API_TOKEN
import * as fs from 'fs'

import { CloudBase } from '../cloudbase'
import { checkIsInCBR } from './cloudplatform'

export const CLOUDBASE_ACCESS_TOKEN_PATH = '/.tencentcloudbase/wx/cloudbase_access_token'

export function getWxCloudToken(): {
  wxCloudApiToken: string
  wxCloudbaseAccesstoken?: string
} {
  const { TRIGGER_SRC, WX_TRIGGER_API_TOKEN_V0, WX_API_TOKEN, WX_CLOUDBASE_ACCESSTOKEN = '' } = CloudBase.getCloudbaseContext()

  const wxCloudToken: any = {}

  if (TRIGGER_SRC === 'timer') {
    wxCloudToken.wxCloudApiToken = WX_TRIGGER_API_TOKEN_V0 || WX_API_TOKEN || ''
  } else {
    wxCloudToken.wxCloudApiToken = WX_API_TOKEN || ''
  }

  // 只在不存在 wxCloudApiToken 时，才尝试读取 wxCloudbaseAccesstoken
  if (!wxCloudToken.wxCloudApiToken) {
    wxCloudToken.wxCloudbaseAccesstoken = WX_CLOUDBASE_ACCESSTOKEN || loadWxCloudbaseAccesstoken()
  }

  return wxCloudToken
}

const maxCacheAge = 10 * 60 * 1000
const cloudbaseAccessTokenInfo = { token: '', timestamp: 0 }
export function loadWxCloudbaseAccesstoken(): string {
  if (cloudbaseAccessTokenInfo.token && Date.now() - cloudbaseAccessTokenInfo.timestamp < maxCacheAge) {
    return cloudbaseAccessTokenInfo.token
  }

  try {
    if (checkIsInCBR() && fs.existsSync(CLOUDBASE_ACCESS_TOKEN_PATH)) {
      cloudbaseAccessTokenInfo.token = fs.readFileSync(CLOUDBASE_ACCESS_TOKEN_PATH).toString()
      cloudbaseAccessTokenInfo.timestamp = Date.now()

      return cloudbaseAccessTokenInfo.token
    }
  } catch (e) {
    console.warn('[TCB][ERROR]: loadWxCloudbaseAccesstoken error: ', e.message)
  }

  return ''
}
