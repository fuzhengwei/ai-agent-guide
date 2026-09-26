import { SDKRequestInterface, IFetchOptions, ResponseObject } from '@cloudbase/adapter-interface'
import { ICloudBaseConfig } from '../../types'
import * as openapicommonrequester from '../utils/tcbopenapicommonrequester'
import { ReadableStream } from 'web-streams-polyfill'
import { E } from '../utils/utils'

export class AIRequestAdapter implements SDKRequestInterface {
  constructor(private readonly config: ICloudBaseConfig, private readonly getAccessToken: () => Promise<string>) {}

  async fetch(options: IFetchOptions): Promise<ResponseObject> {
    const { url, stream = false, timeout, method = 'POST', headers, body } = options

    const headersObj: Record<string, string> = {}
    if (isHeaders(headers)) {
      headers.forEach((value, key) => {
        headersObj[key] = value
      })
    } else if (Array.isArray(headers)) {
      headers.forEach(([k, v]) => (headersObj[k] = v))
    } else {
      Object.assign(headersObj, headers)
    }

    let parsedBody: any
    if (typeof body === 'string') {
      try {
        parsedBody = JSON.parse(body)
      } catch {
        parsedBody = body
      }
    } else {
      parsedBody = body
    }

    const token = await this.getAccessToken()

    const result = await openapicommonrequester.request({
      config: this.config,
      data: parsedBody,
      method: method?.toUpperCase() || 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headersObj
      },
      token,
      opts: {
        timeout: timeout || this.config.timeout,
        stream
      }
    })

    const { body: bodyData, headers: responseHeaders, statusCode } = result

    if (statusCode < 200 || statusCode >= 300) {
      let errorMessage = `Request failed with status code ${statusCode}`
      let errorCode = `${statusCode}`
      let requestId = ''
      let errorBody: string | null = null

      if (typeof bodyData === 'string') {
        errorBody = bodyData
      } else if (Buffer.isBuffer(bodyData)) {
        errorBody = bodyData.toString('utf-8')
      } else if (bodyData && typeof bodyData === 'object' && typeof (bodyData as any).on === 'function') {
        errorBody = await readStreamToString(bodyData as unknown as NodeJS.ReadableStream)
      }

      if (errorBody) {
        try {
          const errorData = JSON.parse(errorBody)
          if (errorData.error?.message) {
            errorMessage = errorData.error.message
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
          if (errorData.error?.code) {
            errorCode = errorData.error.code
          } else if (errorData.code) {
            errorCode = errorData.code
          }
          if (errorData.requestId) {
            requestId = errorData.requestId
          }
        } catch {
          errorMessage = errorBody || errorMessage
        }
      }

      // 从响应头中获取 requestId
      if (!requestId && responseHeaders) {
        const headerRequestId = responseHeaders['x-cloudbase-request-id'] || responseHeaders['x-request-id'] || ''
        requestId = Array.isArray(headerRequestId) ? headerRequestId[0] : headerRequestId
      }

      throw E({
        code: errorCode,
        message: errorMessage,
        requestId
      })
    }

    if (stream) {
      // 对于流式响应,将 Node.js 原生流转换为 Web ReadableStream
      let readableStream: ReadableStream<Uint8Array>

      if (bodyData && typeof bodyData === 'object' && 'on' in bodyData && typeof bodyData.on === 'function') {
        const nodeStream = bodyData
        // Node 12 兼容: 使用标志位追踪 stream 状态,避免重复 close 导致异常
        let streamClosed = false
        readableStream = new ReadableStream({
          start(controller) {
            nodeStream.on('data', (chunk: Buffer) => {
              if (streamClosed) return
              controller.enqueue(new Uint8Array(chunk))
            })
            nodeStream.on('end', () => {
              if (streamClosed) return
              streamClosed = true
              controller.close()
            })
            nodeStream.on('error', (err) => {
              if (streamClosed) return
              streamClosed = true
              controller.error(err)
            })
          },
          cancel() {
            streamClosed = true
            nodeStream.destroy()
          }
        })
      } else if (bodyData instanceof Buffer) {
        readableStream = new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(bodyData))
            controller.close()
          }
        })
      } else if (typeof bodyData === 'string') {
        const encoder = new TextEncoder()
        readableStream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(bodyData))
            controller.close()
          }
        })
      } else {
        readableStream = new ReadableStream({
          start(controller) {
            controller.close()
          }
        })
      }

      return {
        data: readableStream,
        statusCode,
        header: responseHeaders
      }
    }

    let responseData: any
    if (typeof bodyData === 'string') {
      try {
        responseData = JSON.parse(bodyData)
      } catch {
        responseData = bodyData
      }
    } else if (bodyData instanceof Buffer) {
      const bodyString = bodyData.toString('utf-8')
      try {
        responseData = JSON.parse(bodyString)
      } catch {
        responseData = bodyString
      }
    } else {
      responseData = bodyData
    }

    return {
      data: Promise.resolve(responseData),
      statusCode,
      header: responseHeaders
    }
  }

  /**
   * post 方法 - AI 模块可能不使用,但需要实现接口
   */
  async post() {
    throw new Error('post method is not supported in AI module')
  }

  /**
   * upload 方法 - AI 模块可能不使用,但需要实现接口
   */
  async upload() {
    throw new Error('upload method is not supported in AI module')
  }

  /**
   * download 方法 - AI 模块可能不使用,但需要实现接口
   */
  async download() {
    throw new Error('download method is not supported in AI module')
  }
}

function isHeaders(h: HeadersInit): h is Headers {
  try {
    // Node.js 低版本可能没有 Headers
    return h instanceof Headers
  } catch (_) {
    return false
  }
}

/**
 * 从 Node.js 流中读取完整内容为字符串
 */
async function readStreamToString(stream: NodeJS.ReadableStream): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'))
    })
    stream.on('error', (err) => {
      reject(err)
    })
  })
}
