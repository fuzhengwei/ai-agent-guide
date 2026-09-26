import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

// 注意：改地址已经不是一定可以访问的了
export const kMetadataBaseUrl = 'http://metadata.tencentyun.com'

export const kAppIdPath = 'meta-data/app-id'
export const kSecurityCredentialsPath = 'meta-data/cam/security-credentials'

export enum kMetadataVersions {
  'v20170919' = '2017-09-19',
  'v1.0' = '1.0',
  'latest' = 'latest'
}

export function isAppId(appIdStr: string) {
  return /^[1-9][0-9]{4,64}$/gim.test(appIdStr)
}

export async function lookup(path: string, options: AxiosRequestConfig = {}): Promise<string> {
  const url = `${kMetadataBaseUrl}/${kMetadataVersions.latest}/${path}`
  const resp: AxiosResponse = await axios.get(url, options)
  if (resp.status === 200) {
    return resp.data
  } else {
    throw new Error(`[ERROR] GET ${url} status: ${resp.status}`)
  }
}

const metadataCache = {
  appId: undefined
}
/**
 * lookupAppId - 该方法主要用于判断是否在云上环境
 * @returns
 */
export async function lookupAppId(): Promise<string> {
  if (metadataCache.appId === undefined) {
    try {
      // 只有首次会请求且要求快速返回，超时时间很短，DNS无法解析将会超时返回
      // 在云环境中，这个时间通常在 10ms 内，部分耗时长（30+ms）的情况是 DNS 解析耗时长（27+ms）
      const appId = await lookup(kAppIdPath, { timeout: 30 })
      if (isAppId(appId)) {
        metadataCache.appId = appId
      } else {
        metadataCache.appId = ''
      }
    } catch (e) {
      // ignore
    }
  }
  return metadataCache.appId || ''
}

export async function lookupCredentials(ruleName: string): Promise<string> {
  // `${kMetadataBaseUrl}/meta-data/cam/security-credentials/TCB_QcsRole`
  // 这里设置了一个较短的超时时间，因为这个请求是在云环境中发起的，通常会很快返回
  return await lookup(`${kSecurityCredentialsPath}/${ruleName}`, { timeout: 200 })
}
