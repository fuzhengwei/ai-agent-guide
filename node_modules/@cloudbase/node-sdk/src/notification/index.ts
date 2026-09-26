import { ICustomReqOpts } from '../../types'
import { CloudBase } from '../cloudbase'
import { callFunction } from '../functions'

export interface ITemplateNotifyReq {
  notifyId: string // 通知策略ID
  data?: Record<string, unknown> // 通知模板变量键值对
  // receivers?: string[] // 待通知的用户名,选填。默认从策略配置中获取
  url?: string // 点击消息打开的页面地址
}

/**
   * SDK推送消息接口
   * @param params
   * notifyId: 通知策略Id
   * data: 通知策略下的模板变量对应值
   * receivers: 待通知的用户名
   * url: 点击消息卡片打开的链接
   * @returns
   */
export async function sendNotification(cloudbase: CloudBase, params: ITemplateNotifyReq, opts?: ICustomReqOpts) {
  return await callFunction(cloudbase, {
    name: 'lowcode-datasource',
    data: {
      methodName: 'callWedaApi',
      params: {
        action: 'PushNotifyMsg',
        data: {
          NotifyId: params.notifyId,
          Data: JSON.stringify(params.data),
          NotifyUsers: undefined, // Array.isArray(params.receivers) && params.receivers.length > 0 ? params.receivers : undefined,
          Url: params.url
        }
      },
      mode: 'c'
    }
  }, opts)
}
