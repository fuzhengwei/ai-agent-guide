import {
  IFetchOptions,
  IRequestOptions, IUploadRequestOptions, ResponseObject,
} from '@cloudbase/adapter-interface'

import { ICloudbaseConfig, KV } from '.'

export interface IGetAccessTokenResult {
  accessToken: string;
  accessTokenExpire: number;
}

export type ICloudbaseRequestConfig = Pick<ICloudbaseConfig, 'env' | 'region' | 'timeout' | 'oauthClient' | '_fromApp' | 'i18n' | 'endPointMode' | 'auth'>;

export interface IAppendedRequestInfo {
  data: KV<any>;
  headers: KV<string>;
}
export type IRequestBeforeHook = (...args: any[]) => IAppendedRequestInfo;
export interface ICloudbaseRequest {
  // fetch: (urlOrPath: string, init?: RequestInit) => Promise<Response>;
  post: (options: IRequestOptions) => Promise<ResponseObject>;
  upload: (options: IUploadRequestOptions) => Promise<ResponseObject>;
  download: (options: IRequestOptions) => Promise<ResponseObject>;
  // refreshAccessToken: () => Promise<IGetAccessTokenResult>;
  // getAccessToken: () => Promise<IGetAccessTokenResult>;
  request: (action: string, params: KV<any>, options?: KV<any>) => Promise<ResponseObject>;
  send: (action: string, data: KV<any>) => Promise<any>;
  fetch: (options: IFetchOptions) => Promise<ResponseObject>;
}
