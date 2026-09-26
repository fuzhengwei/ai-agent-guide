import { SDKAdapterInterface, AbstractSDKRequest, IRequestOptions, ResponseObject, IUploadRequestOptions, IRequestConfig, IFetchOptions } from '@cloudbase/adapter-interface';
declare class WebRequest extends AbstractSDKRequest {
    private readonly timeout;
    private readonly timeoutMsg;
    private readonly restrictedMethods;
    constructor(config: IRequestConfig);
    get(options: IRequestOptions): Promise<ResponseObject>;
    post(options: IRequestOptions): Promise<ResponseObject>;
    put(options: IRequestOptions): Promise<ResponseObject>;
    upload(options: IUploadRequestOptions): Promise<ResponseObject>;
    download(options: IRequestOptions): Promise<any>;
    fetch(options: IFetchOptions & {
        shouldThrowOnError?: boolean;
    }): Promise<ResponseObject>;
    protected request(options: IRequestOptions, enableAbort?: boolean): Promise<ResponseObject>;
}
declare function genAdapter(): SDKAdapterInterface & {
    type?: 'default' | '';
};
export { genAdapter, WebRequest };
