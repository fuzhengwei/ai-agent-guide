import { ICloudbasePlatformInfo, KV, ICloudbaseConfig } from '.'

export type ICacheConfig = Pick < ICloudbaseConfig, 'debug' | 'persistence' > & {
  platformInfo?: ICloudbasePlatformInfo;
  keys?: KV<string>;
  alwaysLocalKeys?: string[];
};

export interface ICloudbaseCache {
  keys: KV<string>;
  mode: 'async' | 'sync';

  setStore: (key: string, value: any, version?: string) => void;
  setStoreAsync: (key: string, value: any, version?: string) => Promise<void>;

  getStore: (key: string, version?: string) => any;
  getStoreAsync: (key: string, version?: string) => Promise<any>;

  removeStore: (key: string) => void;
  removeStoreAsync: (key: string) => Promise<void>;

  updatePersistence?: (persistence: string) => void;
  updatePersistenceAsync?: (persistence: string) => Promise<void>;

  clear?: () => void;
}
