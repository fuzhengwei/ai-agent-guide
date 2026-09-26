import http from 'http'

import { IReqOpts } from '../../types/internal'
import { withRetry, IRetryOptions } from './retry'
import { RequestTimgingsMeasurer } from './request-timings-measurer'

import { request } from './request-core'

const SAFE_RETRY_CODE_SET = new Set([
  'ENOTFOUND',
  'ENETDOWN',
  'EHOSTDOWN',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'ECONNREFUSED'
])

// const RETRY_CODE_SET = new Set(['ECONNRESET', 'ESOCKETTIMEDOUT'])

const RETRY_STATUS_CODE_SET = new Set([])

/* istanbul ignore next */
function shouldRetry(e: any, result: any, operation: any) {
  // 重试的错误码
  if (e && SAFE_RETRY_CODE_SET.has(e.code)) {
    return {
      retryAble: true,
      message: e.message
    }
  }
  // 连接超时
  if (e && e.code === 'ETIMEDOUT' && e.connecting === true) {
    return {
      retryAble: true,
      message: e.message
    }
  }
  // 重试的状态码
  if (result && RETRY_STATUS_CODE_SET.has(result.statusCode)) {
    return {
      retryAble: true,
      message: `${result.request.method} ${result.request.href} ${result.statusCode} ${http.STATUS_CODES[result.statusCode]
                }`
    }
  }
  return {
    retryAble: false,
    message: ''
  }
}

interface ITimingsMeasurerOptions {
  waitingTime?: number
  interval?: number
  enable?: boolean
}

interface IExtraRequestOptions {
  debug?: boolean
  op?: string
  seqId?: string
  attempts?: number
  timingsMeasurerOptions?: ITimingsMeasurerOptions
  retryOptions?: IRetryOptions
}

interface IResponse {
  statusCode: number
  headers: http.IncomingHttpHeaders
  body: string | Buffer | http.IncomingMessage
}

/* istanbul ignore next */
export async function requestWithTimingsMeasure(opts: IReqOpts, extraOptions?: IExtraRequestOptions): Promise<IResponse> {
  return await new Promise((resolve, reject) => {
    const timingsMeasurerOptions: ITimingsMeasurerOptions
            = extraOptions.timingsMeasurerOptions || {}
    const {
      waitingTime = 1000,
      interval = 200,
      enable = !!extraOptions.debug
    } = timingsMeasurerOptions

    const timingsMeasurer = RequestTimgingsMeasurer.new({
      waitingTime,
      interval,
      enable
    })

    timingsMeasurer.on('progress', (timings: any, reason = '') => {
      const timingsLine = `s:${timings.socket || '-'}|l:${timings.lookup
                || '-'}|c:${timings.connect || '-'}|r:${timings.ready || '-'}|w:${timings.waiting
                || '-'}|d:${timings.download || '-'}|e:${timings.end || '-'}|E:${timings.error || '-'}`
      console.warn(
                `[TCB][RequestTimgings][${extraOptions.op || ''}] spent ${Date.now()
                - timings.start}ms(${timingsLine}) [${extraOptions.seqId
                }][${extraOptions.attempts || 1}][${reason}]`
      )
    })

    ; (function r() {
      const cRequest = request(opts, (err: Error, res: http.IncomingMessage, body) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body
          })
        }
      })

      if (cRequest instanceof http.ClientRequest) {
        timingsMeasurer.measure(cRequest)
      }
    }())
  })
}

export async function extraRequest(opts: IReqOpts, extraOptions?: IExtraRequestOptions) {
  if (extraOptions && extraOptions.retryOptions) {
    return await withRetry(
      async attempts => {
        return await requestWithTimingsMeasure(opts, { ...extraOptions, attempts })
      },
      { shouldRetry, ...extraOptions.retryOptions }
    )
  } else {
    return await requestWithTimingsMeasure(opts, { ...extraOptions, attempts: 1 })
  }
}
