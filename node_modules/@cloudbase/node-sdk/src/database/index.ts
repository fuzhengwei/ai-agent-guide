import { Db } from '@cloudbase/database'
import { CloudBase } from '../cloudbase'

import { E } from '../utils/utils'
import { ERROR } from '../const/code'
import { TcbDBApiHttpRequester } from '../utils/tcbdbapirequester'

export function newDb(cloudbase: CloudBase, dbConfig: any = {}): Db {
  Db.reqClass = TcbDBApiHttpRequester

  // 兼容方法预处理
  if (Object.prototype.toString.call(dbConfig).slice(8, -1) !== 'Object') {
    throw E({ ...ERROR.INVALID_PARAM, message: 'dbConfig must be an object' })
  }

  if (dbConfig?.env) {
    // env变量名转换
    dbConfig.envName = dbConfig.env
    delete dbConfig.env
  }

  return new Db({ ...cloudbase.config, ...dbConfig })
}
