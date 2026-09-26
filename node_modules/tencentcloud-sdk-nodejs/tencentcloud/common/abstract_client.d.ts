import { ClientProfile, Credential, ClientConfig, HttpProfile, DynamicCredential } from "./interface";
/**
 * Callback function type for API responses
 * @template TReuslt Type of the response data
 */
export type ResponseCallback<TReuslt = any> = (error: string, rep: TReuslt) => void;
/**
 * Options for HTTP requests
 */
export interface RequestOptions extends Partial<Pick<HttpProfile, "headers">> {
    /**
     * Whether the request is multipart
     */
    multipart?: boolean;
    /**
     * Abort request signal
     */
    signal?: AbortSignal;
    /**
     * Set Authorization with SKIP
     * @default false
     */
    skipSign?: boolean;
}
type ResponseData = any;
/**
 * Abstract base client for Tencent Cloud SDK
 *
 * This class provides common functionality for making API requests to Tencent Cloud services,
 * including request signing, error handling, and response parsing.
 */
export declare class AbstractClient {
    /**
     * SDK version string
     */
    sdkVersion: string;
    /**
     * API request path (usually "/")
     */
    path: string;
    /**
     * User's security credentials (SecretId, SecretKey, Token)
     */
    credential: Credential | DynamicCredential;
    /**
     * The region of the service (e.g. "ap-shanghai")
     */
    region: string;
    /**
     * The API version of the service (e.g. "2017-03-12")
     */
    apiVersion: string;
    /**
     * The service endpoint URL (e.g. "cvm.tencentcloudapi.com")
     */
    endpoint: string;
    /**
     * Optional configuration instance
     */
    profile: ClientProfile;
    /**
     * Constructs a new AbstractClient instance
     *
     * @param {string} endpoint - The service endpoint URL (e.g. "cvm.tencentcloudapi.com")
     * @param {string} version - The API version of the service (e.g. "2017-03-12")
     * @param {ClientConfig} config - Configuration object containing:
     * @param {Credential|DynamicCredential} config.credential - Credentials for authentication
     * @param {string} [config.region] - The region of the service (e.g. "ap-shanghai")
     * @param {ClientProfile} [config.profile={}] - Optional client configuration profile
     *
     * @throws {TencentCloudSDKHttpException} If invalid language is specified in profile
     *
     * @example
     * const client = new AbstractClient(
     *   "cvm.tencentcloudapi.com",
     *   "2017-03-12",
     *   {
     *     credential: {
     *       secretId: process.env.secretId,
     *       secretKey: process.env.secretKey,
     *     },
     *     region: "ap-shanghai",
     *     profile: {}
     *   }
     * );
     */
    constructor(endpoint: string, version: string, { credential, region, profile }: ClientConfig);
    /**
     * Get credential information
     * @returns {Promise<Credential>} Promise that resolves with credential information
     */
    getCredential(): Promise<Credential>;
    /**
     * Make an API request to Tencent Cloud service
     *
     * @param {string} action - The API action name to call
     * @param {any} req - The request payload/parameters
     * @param {ResponseCallback|RequestOptions} [options] - Either request options or callback function
     * @param {ResponseCallback} [cb] - Optional callback function for async operation
     * @returns {Promise<ResponseData>} Promise that resolves with the API response data
     *
     * @example
     * // Using promise
     * client.request('DescribeInstances', {Limit: 10})
     *   .then(data => console.log(data))
     *   .catch(err => console.error(err));
     *
     * // Using callback
     * client.request('DescribeInstances', {Limit: 10}, (err, data) => {
     *   if (err) console.error(err);
     *   else console.log(data);
     * });
     *
     * // With options
     * client.request('DescribeInstances', {Limit: 10}, {signal: abortController.signal})
     *   .then(data => console.log(data))
     *   .catch(err => console.error(err));
     */
    request(action: string, req: any, options?: ResponseCallback | RequestOptions, cb?: ResponseCallback): Promise<ResponseData>;
    /**
     * Make a request with octet-stream content type
     * @param {string} action API action name
     * @param {any} req Request data
     * @param {ResponseCallback|RequestOptions} [options] Request options or callback
     * @param {ResponseCallback} [cb] Callback function
     * @returns {Promise<any>} Promise that resolves with response data
     */
    requestOctetStream(action: string, req: any, options?: ResponseCallback | RequestOptions, cb?: ResponseCallback): Promise<any>;
    /**
     * @inner
     */
    private doRequest;
    /**
     * @inner
     */
    private doRequestWithSign3;
    /**
     * Parse HTTP response
     * @param {Response} res HTTP response object
     * @returns {Promise<ResponseData>} Promise that resolves with parsed response data
     * @throws {TencentCloudSDKHttpException} If response contains error
     */
    private parseResponse;
    /**
     * Merge nested data into flat structure
     * @param {any} data Input data
     * @param {string} [prefix=""] Key prefix
     * @returns {any} Flattened data object
     */
    private mergeData;
    /**
     * Format request data with required fields and signature
     * @param {string} action API action name
     * @param {RequestData} params Request parameters
     * @returns {Promise<RequestData>} Promise that resolves with formatted request data
     */
    private formatRequestData;
    /**
     * Format string for signature calculation
     * @param {RequestData} params Request parameters
     * @returns {string} String to be signed
     */
    private formatSignString;
}
export {};
