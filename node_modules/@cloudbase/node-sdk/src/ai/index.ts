import { AI } from '@cloudbase/ai'
import { CloudBase } from '../cloudbase'
import { AIRequestAdapter } from './request-adapter'
import { buildCommonOpenApiUrlWithPath } from '../utils/tcbopenapiendpoint'
import { SYMBOL_CURRENT_ENV } from '../const/symbol'
import * as openapicommonrequester from '../utils/tcbopenapicommonrequester'
import { LANGS } from '@cloudbase/app'

/**
 * 创建 AI 实例
 * @param cloudbase CloudBase 实例
 * @returns AI 实例
 */
export function createAI(cloudbase: CloudBase): AI {
  const config = cloudbase.config

  // 获取环境 ID
  const envId = config.envName === SYMBOL_CURRENT_ENV ? openapicommonrequester.getEnvIdFromContext() : (config.envName as string)

  // 构建 AI 基础 URL
  const baseUrl = buildCommonOpenApiUrlWithPath({
    serviceUrl: config.serviceUrl,
    envId,
    path: '/v1',
    region: config.region
  })

  // 创建请求适配器
  const requestAdapter = new AIRequestAdapter(config, async () => {
    const credential = await cloudbase.auth().getClientCredential()
    return credential.access_token
  })

  // 创建 AI 实例
  const ai = new AI(requestAdapter, baseUrl, { t: (s) => s, lang: LANGS.ZH, LANG_HEADER_KEY: 'Accept-Language' })

  return ai
}
