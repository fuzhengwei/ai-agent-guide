import http from 'http'
import https from 'https'

import Agent, { HttpsAgent } from 'agentkeepalive'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { HttpProxyAgent } from 'http-proxy-agent'
import FormData from 'form-data'

import { IReqOpts } from '../../types/internal'

const kAgentCache = new Map<string, http.Agent>()

/**
 * selectAgent
 *
 * 注意：当前不支持 keepalive & proxy 同时配置，如果同时配置，proxy 优先级更高
 *
 * @param url
 * @param options
 * @returns
 */
function selectAgent(url: string, options: { timeout: number, keepalive: boolean, proxy: string }): http.Agent | null {
  // 开 keepalive 或 proxy 才需要 agent
  if (!options.keepalive && !options.proxy) {
    return null
  }

  const isHttps = url.startsWith('https')

  const cacheKey = `protocol=${isHttps ? 'https' : 'http'}timeout=${options.timeout}|keepalive${options.keepalive}|proxy=${options.proxy}`

  if (kAgentCache && kAgentCache.has(cacheKey)) {
    return kAgentCache.get(cacheKey)
  }

  let agent = isHttps
    ? https.globalAgent
    : http.globalAgent

  if (options.keepalive) {
    const keepAliveOpts = {
      keepAliveMsecs: 3000,
      maxSockets: 100,
      maxFreeSockets: 10,
      freeSocketTimeout: 4800,
      // timeout: options.timeout,
      socketActiveTTL: null
    }

    agent = isHttps
      ? new HttpsAgent({ ...keepAliveOpts })
      : new Agent({ ...keepAliveOpts })
  }

  // 当前需兼容 node.js 12，http(s) proxy agent 最高版本为5，不支持传入 agent
  // 副作用：有 proxy 时，指定 keepalive 无效。由于 proxy 一般调试使用，可以接受
  if (options.proxy) {
    const { protocol, hostname, port } = new URL(options.proxy)

    agent = isHttps
      ? new HttpsProxyAgent({ protocol, host: hostname, port: Number(port), timeout: options.timeout })
      : new HttpProxyAgent({ protocol, host: hostname, port: Number(port), timeout: options.timeout })
  }

  if (kAgentCache && agent) {
    kAgentCache.set(cacheKey, agent)
  }

  return agent
}

function buildHttpRequestInfo(opts: IReqOpts): { headers?: http.OutgoingHttpHeaders, body?: string | Buffer | undefined } {
  // NOTE: 仅某些 method 携带 body 这里仅简单处理
  if (opts.formData) {
    const formdata = new FormData()
    for (const key in opts.formData) {
      if (Object.prototype.hasOwnProperty.call(opts.formData, key)) {
        formdata.append(key, opts.formData[key])
      }
    }
    return {
      headers: formdata.getHeaders(),
      body: formdata.getBuffer()
    }
  } else {
    if (opts.body === undefined || opts.body === null) {
      return {
        headers: {}
      }
    }
    const body = JSON.stringify(opts.body)
    return {
      headers: { 'content-length': Buffer.byteLength(body, 'utf8') },
      body
    }
  }
}

async function onResponse(
  res: http.IncomingMessage,
  {
    encoding,
    type = 'json'
  }: { encoding?: string, type?: 'stream' | 'raw' | 'json' | 'rawStream' }
): Promise<string | Buffer | http.IncomingMessage | undefined> {
  if (type === 'stream') {
    return await Promise.resolve(undefined)
  }

  // rawStream: 返回原始的 Node.js 流，用于真正的流式处理
  if (type === 'rawStream') {
    return await Promise.resolve(res)
  }

  if (encoding) {
    res.setEncoding(encoding)
  }

  return await new Promise((resolve, reject) => {
    const bufs = []

    res.on('data', (chunk) => {
      bufs.push(chunk)
    })

    res.on('end', () => {
      const buf = Buffer.concat(bufs)
      if (type === 'json') {
        try {
          if (buf.byteLength === 0) {
            resolve(undefined)
            return
          }
          resolve(JSON.parse(buf.toString()))
        } catch (e) {
          reject(e)
        }
      }
      resolve(buf)
    })

    res.on('error', (err) => {
      reject(err)
    })
  })
}

function onTimeout(req: http.ClientRequest, cb: RequestCB) {
  let hasConnected = false
  req.once('socket', (socket) => {
    // NOTE: reusedSocket 为 true 时，不会触发 connect 事件
    if (req.reusedSocket) {
      hasConnected = true
    } else {
      socket.once('connect', () => {
        hasConnected = true
      })
    }
  })
  req.on('timeout', () => {
    // request.reusedSocket
    // https://nodejs.org/api/net.html#socketconnecting
    // code 遵循 request 库定义：
    // ·ETIMEDOUT：connection timeouts，建立连接时发生超时
    // ·ESOCKETTIMEDOUT：read timeouts，已经成功连接到服务器，等待响应超时
    // https://github.com/request/request#timeouts
    const err = new Error(hasConnected ? 'request timeout' : 'connect timeout')
      ; (err as any).code = hasConnected ? 'ESOCKETTIMEDOUT' : 'ETIMEDOUT'
    ; (err as any).reusedSocket = req.reusedSocket
    ; (err as any).hasConnected = hasConnected
    ; (err as any).connecting = req.socket.connecting
    ; (err as any).url = `${req.protocol}://${req.host}${req.path}`
    cb(err)
  })
}

export type RequestCB = (err: Error, res?: http.IncomingMessage, body?: string | Buffer) => void

// 用于 rawStream 类型的回调，body 参数实际上是 IncomingMessage
export type RequestCBWithStream = (err: Error, res?: http.IncomingMessage, body?: string | Buffer | http.IncomingMessage) => void

// 函数重载：支持普通回调和流式回调
export function request(opts: IReqOpts, cb: RequestCB): http.ClientRequest
export function request(opts: IReqOpts & { type: 'rawStream' }, cb: RequestCBWithStream): http.ClientRequest
export function request(opts: IReqOpts, cb: RequestCB | RequestCBWithStream): http.ClientRequest {
  const times = opts.times || 1

  const options: http.ClientRequestArgs = {
    method: opts.method,
    headers: opts.headers,
    timeout: opts.timeout || 1
  }

  const { headers, body } = buildHttpRequestInfo(opts)

  options.headers = { ...options.headers, ...headers }

  options.agent = options.agent
    ? options.agent
    : selectAgent(opts.url, {
      timeout: opts.timeout,
      keepalive: opts.keepalive,
      proxy: opts.proxy
    })

  const isHttps = opts.url?.startsWith('https')

  const req = (isHttps ? https : http).request(opts.url, options, (res: http.IncomingMessage) => {
    onResponse(res, {
      encoding: opts.encoding,
      type: opts.json ? 'json' : opts.type
    })
      .then((body) => {
        (cb as RequestCBWithStream)(null, res, body)
      })
      .catch((err) => {
        cb(err)
      })
  })

  req.on('abort', () => {
    cb(new Error('request aborted by client'))
  })

  req.on('error', (err: Error & { code: string }) => {
    if (err && opts.debug) {
      console.warn(
        `[TCB][RequestTimgings][keepalive:${opts.keepalive}][reusedSocket:${req?.reusedSocket}][code:${err.code}][message:${err.message}]${opts.url}`
      )
    }
    if (err?.code === 'ECONNRESET' && req?.reusedSocket && opts.keepalive && opts.times >= 0) {
      return request(
        {
          ...opts,
          times: times - 1
        },
        cb
      )
    }
    cb(err)
  })

  if (typeof opts.timeout === 'number' && opts.timeout >= 0) {
    onTimeout(req, cb)
    req.setTimeout(opts.timeout)
  }

  // NOTE: 未传 body 时，不调用 write&end 方法，由外部调用，通常是 pipe 调用
  if (body) {
    req.write(body)
    req.end()
  } else {
    // 如果显式指明 noBody 则直接调用 end
    if (opts.noBody) {
      req.end()
    }
  }

  // NOTE: http(s).request 需手动调用 end 方法
  if (options.method.toLowerCase() === 'get') {
    req.end()
  }

  return req
}
