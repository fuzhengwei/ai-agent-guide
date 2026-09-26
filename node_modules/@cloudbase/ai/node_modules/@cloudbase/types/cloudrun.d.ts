import { KV } from '.'

export interface ICallContainerOptions {
  name: string
  data?: KV<any>
  method?: string
  path?: string
  header?: KV<any>
}
