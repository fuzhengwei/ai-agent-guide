import { CloudBase } from '../cloudbase'

import { isValidEnvFormat } from './utils'

import { getServerInjectUrl } from './tcbcontext'

/* eslint-disable complexity */
export function buildUrl(options: {
  envId?: string
  region?: string
  protocol?: 'http' | 'https'
  serviceUrl?: string
  seqId?: string
  isInternal?: boolean
} = { isInternal: false }): string {
  // 优先级：用户配置 > 环境变量
  const region = options.region || process.env.TENCENTCLOUD_REGION || ''

  // 有地域信息则访问地域级别域名，无地域信息则访问默认域名，默认域名固定解析到上海地域保持兼容
  const internetRegionEndpoint = region
    ? `${region}.tcb-api.tencentcloudapi.com`
    : 'tcb-api.tencentcloudapi.com'
  const internalRegionEndpoint = region
    ? `internal.${region}.tcb-api.tencentcloudapi.com`
    : 'internal.tcb-api.tencentcloudapi.com'

  // 同地域走内网，跨地域走公网
  const isSameRegionVisit = region
    ? region === process.env.TENCENTCLOUD_REGION
    : true
  const endpoint = isSameRegionVisit && (options.isInternal)
    ? internalRegionEndpoint
    : internetRegionEndpoint

  const envId = options.envId || ''
  // 注意：特殊环境ID不能拼在请求地址的域名中，所以这里需要特殊处理
  const envEndpoint = isValidEnvFormat(envId) ? `${envId}.${endpoint}` : endpoint

  const protocol = options.isInternal ? 'http' : options.protocol

  // 注意：云函数环境下有地域信息，云应用环境下不确定是否有，如果没有，用户必须显式的传入
  const path = '/admin'
  const defaultUrl = `${protocol}://${envEndpoint}${path}`

  const serverInjectUrl = getServerInjectUrl()

  const url = options.serviceUrl || serverInjectUrl || defaultUrl
  const seqId = options.seqId
  const qs = CloudBase.scfContext
    ? `env=${envId}&seqId=${seqId}&scfRequestId=${CloudBase.scfContext.requestId}`
    : `env=${envId}&seqId=${seqId}`

  return url.includes('?') ? `${url}${qs}` : `${url}?${qs}`
}
