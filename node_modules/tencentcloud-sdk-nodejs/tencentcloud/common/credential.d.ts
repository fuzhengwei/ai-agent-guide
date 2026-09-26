import { ClientConfig, Credential, CredentialResult, DynamicCredential } from "./interface";
/**
 * Basic credential with secret id and secret key
 */
export declare class BasicCredential implements Credential {
    readonly secretId: string;
    readonly secretKey: string;
    readonly token?: string;
    constructor(secretId: string, secretKey: string, token?: string);
}
/**
 * Environment variable credential
 * Get credential from environment variables:
 * - TENCENTCLOUD_SECRET_ID
 * - TENCENTCLOUD_SECRET_KEY
 * - TENCENTCLOUD_SESSION_TOKEN (optional)
 */
export declare class EnvironmentVariableCredential implements DynamicCredential {
    getCredential(): Promise<Credential>;
}
/**
 * Profile credential
 * Get credential from profile file ~/.tencentcloud/credentials or /etc/tencentcloud/credentials
 * example credentials file:
 * [default]
 * secret_id = your-secret-id
 * secret_key = your-secret-key
 */
export declare class ProfileCredential implements DynamicCredential {
    getCredential(): Promise<Credential>;
}
interface AssumeRoleParams {
    RoleArn: string;
    RoleSessionName: string;
    [key: string]: any;
}
/**
 * Tencent Cloud Credential via STS service
 * @see {@link https://cloud.tencent.com/document/api/1312/48197} for more information.
 */
export declare class STSCredential implements DynamicCredential {
    private clientConfig;
    private assumeRoleParams;
    private endpoint;
    private version;
    private action;
    private region;
    credentialTask: Promise<CredentialResult> | null;
    /**
     * Constructs a new STSCredential instance
     *
     * @param {ClientConfig} clientConfig Request client Configuration object
     * @param {AssumeRoleParams} assumeRoleParams Request parameters of the AssumeRole interface
     * @see {@link https://cloud.tencent.com/document/api/1312/48197} for more AssumeRoleParams information.
     */
    constructor(clientConfig: ClientConfig, assumeRoleParams: AssumeRoleParams);
    protected getCredentialWithStsAssumeRole(): Promise<CredentialResult>;
    getCredential(): Promise<Credential>;
}
/**
 * CVM Role credential using existing implementation
 * Re-export the existing CvmRoleCredential for consistency
 */
export { default as CvmRoleCredential } from "./cvm_role_credential";
/**
 * TencentCloud OIDC Credential
 * OIDC is an authentication protocol built on OAuth 2.0. Tencent Cloud CAM supports OIDC role-based SSO.
 * @see {@link https://cloud.tencent.com/document/product/598/96013} for more information.
 */
export declare class OIDCRoleArnCredential implements DynamicCredential {
    private endpoint;
    private version;
    private action;
    private clientConfig;
    private assumeRoleWithWebIdentityParams;
    private defaultSessionName;
    private isTke;
    protected region: string;
    protected expirationReservationTime: number;
    protected credentialTask: Promise<CredentialResult> | null;
    /**
     * Constructs a new OIDCRoleArnCredential instance
     *
     * @param {ClientConfig} [clientConfig] Optional request client Configuration object
     * @param {AssumeRoleParams} [assumeRoleParams] Optional request parameters of the AssumeRole interface
     * @see {@link https://cloud.tencent.com/document/api/1312/48197} for more AssumeRoleWithWebIdentity information.
     */
    constructor();
    constructor(clientConfig: ClientConfig, assumeRoleWithWebIdentityParams: AssumeRoleParams);
    private initFromTke;
    protected getCredentialWithStsAssumeRoleWithWebIdentity(): Promise<CredentialResult>;
    getCredential(): Promise<Credential>;
}
/**
 * Tencent Cloud DefaultCredentialProvider
 */
export declare class DefaultCredentialProvider implements DynamicCredential {
    private readonly providers;
    constructor();
    getCredential(): Promise<Credential>;
}
