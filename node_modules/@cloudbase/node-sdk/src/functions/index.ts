import * as tcbapicaller from '../utils/tcbapirequester'
import * as tcbopenapicommonrequester from '../utils/tcbopenapicommonrequester'
import { E } from '../utils/utils'
import { ERROR } from '../const/code'
import { ICustomReqOpts, ICallFunctionOptions, CallFunctionResult, ICallApisOptions } from '../../types'
import { CloudBase } from '../cloudbase'

import { callContainer } from '../cloudrun'

export async function callFunction<ParaT, ResultT>(cloudbase: CloudBase, callFunctionOptions: ICallFunctionOptions<ParaT>, opts?: ICustomReqOpts): Promise<CallFunctionResult<ResultT>> {
  // cloudrunfunctions
  if (callFunctionOptions.type === 'cloudrun') {
    const resp = await callContainer(cloudbase, callFunctionOptions, opts)
    return {
      requestId: resp.requestId,
      result: resp.data as ResultT
    }
  }

  // cloudfunctions
  const { name, qualifier, data } = callFunctionOptions
  const { TCB_ROUTE_KEY } = CloudBase.getCloudbaseContext()

  let transformData
  try {
    transformData = data ? JSON.stringify(data) : ''
  } catch (e) {
    throw E({ ...e, code: ERROR.INVALID_PARAM.code, message: '对象出现了循环引用' })
  }
  if (!name) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '函数名不能为空'
    })
  }

  const params = {
    action: 'functions.invokeFunction',
    function_name: name,
    qualifier,
    // async: async,
    request_data: transformData
  }

  return await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json',
      ...(TCB_ROUTE_KEY ? { 'X-TCB-Route-Key': TCB_ROUTE_KEY } : {})
    }
  }).then(res => {
    if (res.code) {
      return res
    }

    let result: any
    try {
      result = JSON.parse(res.data.response_data)
    } catch (e) {
      result = res.data.response_data
    }
    return {
      result,
      requestId: res.requestId
    }
  })
}

/**
 * 直接调用apis接口
 * @param cloudbase
 * @param callApiOptions
 * @param opts
 * @returns
 */
export async function callApis<ParaT>(cloudbase: CloudBase, callApiOptions: ICallApisOptions<ParaT>, opts?: ICustomReqOpts) {
  let { name, body, path = '', method = 'POST', header = {}, token = '' } = callApiOptions

  if (!name) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: 'invalid api name'
    })
  }

  let data = body
  method = method || 'POST'
  const contentType = header?.['Content-Type'] || header?.['content-type'] || 'application/json; charset=utf-8'

  try {
    if (method.toLocaleLowerCase() === 'post' && contentType.toLocaleLowerCase().includes('application/json')) {
      data = JSON.parse(body as any)
    }
  } catch (error) {
    data = body
  }

  return await tcbopenapicommonrequester.request({
    config: cloudbase.config,
    path: `/v1/apis/${name}${path.startsWith('/') ? path : `/${path}`}`,
    method,
    headers: {
      'Content-Type': contentType,
      ...header
    },
    data,
    token,
    opts
  })
}
