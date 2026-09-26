export declare class WxCloudSDKError extends Error {
    code: string | undefined;
    requestId: string | undefined;
    originError: Error | undefined;
    constructor(message: string, extra?: {
        requestId?: string;
        code?: string;
        originError?: Error;
    });
}
