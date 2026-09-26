const ZONE_CHINA = ['ap-shanghai', 'ap-guangzhou', 'ap-shenzhen-fsi', 'ap-shanghai-fsi', 'ap-nanjing', 'ap-beijing', 'ap-chengdu', 'ap-chongqing', 'ap-hongkong']

/* eslint-disable complexity */
export function buildUrl(options: {
  envId: string
  region?: string
  protocol?: 'http' | 'https'
  serviceUrl?: string
  seqId?: string
  isInternal?: boolean
  name: string
  path: string
}): string {
  const endpoint = `https://${getGatewayUrl(options)}/v1/cloudrun/${options.name}`
  const path = options.path.startsWith('/') ? options.path : `/${options.path}`
  return `${endpoint}${path}`
}

export function buildCommonOpenApiUrlWithPath(options: {
  envId: string
  protocol?: 'http' | 'https'
  path: string
  serviceUrl?: string
  region?: string
}): string {
  return `${options.protocol || 'https'}://${options.serviceUrl || getGatewayUrl(options)}${options.path}`
}

function getGatewayUrl(options: {
  envId: string
  region?: string
}): string {
  const region = options.region || 'ap-shanghai'
  let baseUrl = `${options.envId}.api.tcloudbasegateway.com`

  if (!ZONE_CHINA.includes(region)) {
    baseUrl = `${options.envId}.api.intl.tcloudbasegateway.com`
  }
  return baseUrl
}
