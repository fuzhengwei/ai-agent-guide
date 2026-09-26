import { CloudBase } from './cloudbase'

import { ICloudBaseConfig, IContextParam } from '../types'
import { SYMBOL_CURRENT_ENV, SYMBOL_DEFAULT_ENV } from './const/symbol'
import { setThrowOnCode } from './utils/utils'
import { extraRequest } from './utils/request'

import { version } from './utils/version'

export = {
  version,

  SYMBOL_CURRENT_ENV,
  SYMBOL_DEFAULT_ENV,

  init: (config?: ICloudBaseConfig): CloudBase => {
    return new CloudBase(config)
  },

  parseContext: (context: IContextParam) => {
    return CloudBase.parseContext(context)
  },

  getCloudbaseContext: (context?: any) => {
    return CloudBase.getCloudbaseContext(context)
  },

  request: extraRequest,

  setThrowOnCode
}
