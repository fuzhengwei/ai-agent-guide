import * as tcbopenapirequester from '../utils/tcbopenapirequester'
import { E } from '../utils/utils'
import { ERROR } from '../const/code'
import { ICustomReqOpts, ICallContainerOptions, CallContainerResult } from '../../types'
import { CloudBase } from '../cloudbase'

export async function callContainer<ParaT, ResultT>(cloudbase: CloudBase, callContainerOptions: ICallContainerOptions<ParaT>, opts?: ICustomReqOpts): Promise<CallContainerResult<ResultT>> {
  // 这里先不对齐了，代码先保留
  // if (callContainerOptions.header && callContainerOptions.header['X-WX-SERVICE'] !== '') {
  //   if (!callContainerOptions.name) {
  //     callContainerOptions.name = callContainerOptions.header['X-WX-SERVICE']
  //   }

  //   if (callContainerOptions.header['X-WX-SERVICE'] !== callContainerOptions.name) {
  //     throw E({
  //       ...ERROR.INVALID_PARAM,
  //       message: '服务名冲突'
  //     })
  //   }
  // }

  const { name, data } = callContainerOptions

  if (!name) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '服务名不能为空'
    })
  }

  return await tcbopenapirequester.request({
    cloudrun: { name },

    config: cloudbase.config,
    method: callContainerOptions.method || 'POST',
    path: callContainerOptions.path || '',
    headers: Object.assign(
      {},
      {
        'Content-Type': 'application/json; charset=utf-8'
      },
      callContainerOptions.header
    ),
    data,
    opts
  }).then(resp => {
    try {
      resp.data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
    } catch (e) {
      // ignore
    }

    return {
      requestId: resp.headers['x-request-id'] || resp.headers['x-cloudbase-request-id'],
      statusCode: resp.statusCode,
      header: resp.headers,
      data: resp.data
    }
  })
}
