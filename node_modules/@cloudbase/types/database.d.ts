export type DataType = 'init' | 'update' | 'add' | 'remove' | 'replace' | 'limit'
export type QueueType = 'init' | 'enqueue' | 'dequeue' | 'update'

export interface ISingleDBEvent {
  id: number
  dataType: DataType
  queueType: QueueType
  docId: string
  doc: Record<string, any>
  updatedFields?: any
  removedFields?: any
}

export interface IDatabaseServiceContext extends IServiceContext {
  appConfig: IAppConfig
  ws?: any
}

export interface IAppConfig {
  docSizeLimit: number
  realtimePingInterval: number
  realtimePongWaitTimeout: number
  request: any
}

export interface IServiceContext {
  // name: string
  // identifiers: IRuntimeIdentifiers
  // debug: boolean
  env?: string
}
