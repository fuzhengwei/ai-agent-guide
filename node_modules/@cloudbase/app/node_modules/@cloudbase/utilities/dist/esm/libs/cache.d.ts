import { ICloudbaseCache, ICacheConfig } from '@cloudbase/types/cache';
import { KV, Persistence } from '@cloudbase/types';
export declare class CloudbaseCache implements ICloudbaseCache {
    keys: KV<string>;
    private persistenceTag;
    private platformInfo;
    private storage;
    constructor(config: ICacheConfig);
    get mode(): "async" | "sync";
    get persistence(): Persistence;
    setStore(key: string, value: any, version?: any): void;
    setStoreAsync(key: string, value: any, version?: any): Promise<void>;
    getStore(key: string, version?: string): any;
    getStoreAsync(key: string, version?: string): Promise<any>;
    removeStore(key: string): void;
    removeStoreAsync(key: string): Promise<void>;
}
