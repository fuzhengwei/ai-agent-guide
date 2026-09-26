import { lookupCredentials } from './metadata'

import { checkIsInCBR } from './cloudplatform'

const kDefaultRole = process.env.ROLE_NAME || 'TCB_QcsRole'
const kCBRRole = process.env.CBR_ROLE

interface Secret {
  id: string
  key: string
  token: string
  expire: number // 过期时间，单位：秒
}

class SecretManager {
  private readonly roleName: string = ''
  private tmpSecret: Secret | null

  public constructor() {
    this.roleName = checkIsInCBR() && kCBRRole ? kCBRRole : kDefaultRole
    this.tmpSecret = null
  }

  /* istanbul ignore next */
  public async getTmpSecret(): Promise<Secret> {
    if (this.tmpSecret) {
      const now = new Date().getTime()
      const expire = this.tmpSecret.expire * 1000
      const oneHour = 3600 * 1000
      if (now < expire - oneHour) {
        // 密钥没过期
        return this.tmpSecret
      } else {
        // 密钥过期
        return await this.fetchTmpSecret()
      }
    } else {
      return await this.fetchTmpSecret()
    }
  }

  /* istanbul ignore next */
  private async fetchTmpSecret(): Promise<Secret> {
    const body: string = await lookupCredentials(this.roleName)
    const payload = JSON.parse(body)
    this.tmpSecret = {
      id: payload.TmpSecretId,
      key: payload.TmpSecretKey,
      expire: payload.ExpiredTime, // 过期时间，单位：秒
      token: payload.Token
    }
    return this.tmpSecret
  }
}

const globalSecretManager = new SecretManager()

export async function getTmpSecret(): Promise<Secret> {
  return await globalSecretManager.getTmpSecret()
}
