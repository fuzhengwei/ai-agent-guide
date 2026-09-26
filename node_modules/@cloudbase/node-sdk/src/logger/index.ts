import { E } from '../utils/utils'
import { ERROR } from '../const/code'
import { CloudBase } from '../cloudbase'

export class Logger {
  public isSupportClsReport: boolean
  private readonly src: string

  public constructor() {
    const { _SCF_TCB_LOG } = CloudBase.getCloudbaseContext()

    this.src = 'app'
    this.isSupportClsReport = true
    if (`${_SCF_TCB_LOG}` !== '1') {
      this.isSupportClsReport = false
    } else if (!(console as any).__baseLog__) {
      this.isSupportClsReport = false
    }

    if (!this.isSupportClsReport) {
      console.warn(
        '[TCB][WARN] 请检查您是否在本地环境 或者 未开通高级日志功能，当前环境下无法上报cls日志，默认使用 console'
      )
    }
  }

  public transformMsg(logMsg: any) {
    // 目前 logMsg 只支持字符串 value 且不支持多级, 加一层转换处理
    let realMsg = {}

    realMsg = { ...realMsg, ...logMsg }
    return realMsg
  }

  public baseLog(logMsg: any, logLevel: string) {
    if (Object.prototype.toString.call(logMsg).slice(8, -1) !== 'Object') {
      throw E({
        ...ERROR.INVALID_PARAM,
        message: 'log msg must be an object'
      })
    }

    const msgContent = this.transformMsg(logMsg)

    if (this.isSupportClsReport) {
      ;(console as any).__baseLog__(msgContent, logLevel)
    } else {
      if (console[logLevel]) {
        console[logLevel](msgContent)
      }
    }
  }

  public log(logMsg: any) {
    this.baseLog(logMsg, 'log')
  }

  public info(logMsg: any) {
    this.baseLog(logMsg, 'info')
  }

  public warn(logMsg: any) {
    this.baseLog(logMsg, 'warn')
  }

  public error(logMsg: any) {
    this.baseLog(logMsg, 'error')
  }
}

export function logger() {
  return new Logger()
}
