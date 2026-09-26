import {
  ICloudBaseConfig,
  IHeaderOpts,
  ICustomParam
} from './index'

interface IInnerCloudBaseConfig extends ICloudBaseConfig {
  envName?: string | symbol
}

interface IRequestInfo {
  // 初始化配置
  config: ICloudBaseConfig
  // 请求方法 get post
  method: string
  // 业务逻辑自定义请求头
  headers: IHeaderOpts
  // 业务逻辑自定义参数
  params: ICustomParam
  // 不参与签名项
  unSignedParams?: any
  // 是否为formData (wx.openApi formData:true)
  isFormData?: boolean
  // 是否通过内网访问
  isInternal?: boolean
  // 用户自定义配置项
  opts?: any
}

export interface IReqOpts {
  proxy?: string
  qs?: any
  body?: any
  formData?: any
  encoding?: 'binary' | 'utf8'
  keepalive?: boolean
  url: string
  method?: string
  timeout?: number
  headers?: IHeaderOpts
  json?: boolean
  type?: 'stream' | 'raw' | 'json' | 'rawStream'
  debug?: boolean
  times?: number
  noBody?: boolean
}

interface IReqHooks {
  handleData?: (res: any, err: any, response: any, body: any) => any
}
