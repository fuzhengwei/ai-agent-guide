"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCredentialProvider = exports.OIDCRoleArnCredential = exports.CvmRoleCredential = exports.STSCredential = exports.ProfileCredential = exports.EnvironmentVariableCredential = exports.BasicCredential = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = require("util");
const path_1 = tslib_1.__importDefault(require("path"));
const os_1 = require("os");
const ini_1 = require("ini");
const common_client_1 = require("./common_client");
const cvm_role_credential_1 = tslib_1.__importDefault(require("./cvm_role_credential"));
const EXPIRE_BUFFER = 30 * 1000;
/**
 * Basic credential with secret id and secret key
 */
class BasicCredential {
    constructor(secretId, secretKey, token) {
        this.secretId = secretId;
        this.secretKey = secretKey;
        this.token = token;
    }
}
exports.BasicCredential = BasicCredential;
/**
 * Environment variable credential
 * Get credential from environment variables:
 * - TENCENTCLOUD_SECRET_ID
 * - TENCENTCLOUD_SECRET_KEY
 * - TENCENTCLOUD_SESSION_TOKEN (optional)
 */
class EnvironmentVariableCredential {
    async getCredential() {
        const secretId = process.env.TENCENTCLOUD_SECRET_ID;
        const secretKey = process.env.TENCENTCLOUD_SECRET_KEY;
        const token = process.env.TENCENTCLOUD_SESSION_TOKEN;
        return new BasicCredential(secretId, secretKey, token);
    }
}
exports.EnvironmentVariableCredential = EnvironmentVariableCredential;
/**
 * Profile credential
 * Get credential from profile file ~/.tencentcloud/credentials or /etc/tencentcloud/credentials
 * example credentials file:
 * [default]
 * secret_id = your-secret-id
 * secret_key = your-secret-key
 */
class ProfileCredential {
    async getCredential() {
        let filePath = "";
        // Try user home directory first
        const userHome = (0, os_1.homedir)();
        const userCredentialsPath = path_1.default.join(userHome, ".tencentcloud", "credentials");
        if (fs_1.default.existsSync(userCredentialsPath)) {
            filePath = userCredentialsPath;
        }
        else {
            // Try system directory as fallback
            filePath = "/etc/tencentcloud/credentials";
        }
        if (filePath) {
            try {
                const content = fs_1.default.readFileSync(filePath, "utf8");
                const { default: { secret_id, secret_key, token }, } = (0, ini_1.parse)(content);
                if (secret_id && secret_key) {
                    return new BasicCredential(secret_id, secret_key, token);
                }
            }
            catch (error) {
                // Ignore errors when reading user credentials
            }
        }
        return new BasicCredential("", "");
    }
}
exports.ProfileCredential = ProfileCredential;
/**
 * Tencent Cloud Credential via STS service
 * @see {@link https://cloud.tencent.com/document/api/1312/48197} for more information.
 */
class STSCredential {
    /**
     * Constructs a new STSCredential instance
     *
     * @param {ClientConfig} clientConfig Request client Configuration object
     * @param {AssumeRoleParams} assumeRoleParams Request parameters of the AssumeRole interface
     * @see {@link https://cloud.tencent.com/document/api/1312/48197} for more AssumeRoleParams information.
     */
    constructor(clientConfig, assumeRoleParams) {
        this.clientConfig = clientConfig;
        this.assumeRoleParams = assumeRoleParams;
        this.endpoint = "sts.tencentcloudapi.com";
        this.version = "2018-08-13";
        this.action = "AssumeRole";
        this.region = "ap-guangzhou";
    }
    async getCredentialWithStsAssumeRole() {
        const { endpoint, version, action, region, clientConfig, assumeRoleParams } = this;
        try {
            const client = new common_client_1.CommonClient(endpoint, version, {
                region,
                ...clientConfig,
            });
            const result = await client.request(action, assumeRoleParams);
            return {
                TmpSecretId: result.Credentials.TmpSecretId,
                TmpSecretKey: result.Credentials.TmpSecretKey,
                Token: result.Credentials.Token,
                ExpiredTime: result.ExpiredTime,
                Expiration: result.Expiration,
            };
        }
        catch (error) {
            throw new Error(`Get STS AssumeRole failed: ${error.message}`);
        }
    }
    async getCredential() {
        if (!this.credentialTask) {
            this.credentialTask = this.getCredentialWithStsAssumeRole();
        }
        const credential = await this.credentialTask;
        // Check if the credential is expired
        if (credential.ExpiredTime * 1000 - EXPIRE_BUFFER <= Date.now()) {
            this.credentialTask = null;
            return this.getCredential();
        }
        return {
            secretId: credential.TmpSecretId,
            secretKey: credential.TmpSecretKey,
            token: credential.Token,
        };
    }
}
exports.STSCredential = STSCredential;
/**
 * CVM Role credential using existing implementation
 * Re-export the existing CvmRoleCredential for consistency
 */
var cvm_role_credential_2 = require("./cvm_role_credential");
Object.defineProperty(exports, "CvmRoleCredential", { enumerable: true, get: function () { return tslib_1.__importDefault(cvm_role_credential_2).default; } });
/**
 * TencentCloud OIDC Credential
 * OIDC is an authentication protocol built on OAuth 2.0. Tencent Cloud CAM supports OIDC role-based SSO.
 * @see {@link https://cloud.tencent.com/document/product/598/96013} for more information.
 */
class OIDCRoleArnCredential {
    constructor(clientConfig, assumeRoleWithWebIdentityParams) {
        this.endpoint = "sts.tencentcloudapi.com";
        this.version = "2018-08-13";
        this.action = "AssumeRoleWithWebIdentity";
        this.defaultSessionName = "tencentcloud-node-sdk-";
        this.isTke = false;
        this.expirationReservationTime = 600;
        if (clientConfig && assumeRoleWithWebIdentityParams) {
            this.clientConfig = clientConfig;
            this.assumeRoleWithWebIdentityParams = assumeRoleWithWebIdentityParams;
        }
        else {
            this.isTke = true;
            this.clientConfig = {
                credential: new BasicCredential("", ""),
                ...clientConfig,
            };
        }
    }
    async initFromTke() {
        const region = process.env.TKE_REGION;
        if (!region) {
            throw new Error("env TKE_REGION not exist");
        }
        const providerId = process.env.TKE_PROVIDER_ID;
        if (!providerId) {
            throw new Error("env TKE_PROVIDER_ID not exist");
        }
        const tokenFile = process.env.TKE_WEB_IDENTITY_TOKEN_FILE;
        if (!tokenFile) {
            throw new Error("env TKE_WEB_IDENTITY_TOKEN_FILE not exist");
        }
        let wbIdentityToken;
        try {
            wbIdentityToken = (await (0, util_1.promisify)(fs_1.default.readFile)(tokenFile)).toString();
        }
        catch (error) {
            throw new Error(`failed to read token file: ${error.message}`);
        }
        const roleArn = process.env.TKE_ROLE_ARN;
        if (!roleArn) {
            throw new Error("env TKE_ROLE_ARN not exist");
        }
        this.clientConfig.region = region;
        this.assumeRoleWithWebIdentityParams = {
            RoleArn: roleArn,
            RoleSessionName: `${this.defaultSessionName}${Date.now() * 1000}`,
            WebIdentityToken: wbIdentityToken,
            ProviderId: providerId,
        };
    }
    async getCredentialWithStsAssumeRoleWithWebIdentity() {
        try {
            if (this.isTke) {
                await this.initFromTke();
            }
            const { endpoint, version, action, region, clientConfig, assumeRoleWithWebIdentityParams } = this;
            const client = new common_client_1.CommonClient(endpoint, version, {
                region: region,
                ...clientConfig,
            });
            const result = await client.request(action, assumeRoleWithWebIdentityParams, {
                skipSign: true,
            });
            return {
                TmpSecretId: result.Credentials.TmpSecretId,
                TmpSecretKey: result.Credentials.TmpSecretKey,
                Token: result.Credentials.Token,
                ExpiredTime: result.ExpiredTime,
                Expiration: result.Expiration,
            };
        }
        catch (error) {
            throw new Error(`Get STS AssumeRoleWithWebIdentity failed: ${error.message}`);
        }
    }
    async getCredential() {
        if (!this.credentialTask) {
            this.credentialTask = this.getCredentialWithStsAssumeRoleWithWebIdentity();
        }
        const credential = await this.credentialTask;
        // Check if the credential is expired
        if (credential.ExpiredTime * 1000 - this.expirationReservationTime <= Date.now()) {
            this.credentialTask = null;
            return this.getCredential();
        }
        return {
            secretId: credential.TmpSecretId,
            secretKey: credential.TmpSecretKey,
            token: credential.Token,
        };
    }
}
exports.OIDCRoleArnCredential = OIDCRoleArnCredential;
/**
 * Tencent Cloud DefaultCredentialProvider
 */
class DefaultCredentialProvider {
    constructor() {
        this.providers = [
            new EnvironmentVariableCredential(),
            new ProfileCredential(),
            new cvm_role_credential_1.default(),
            new OIDCRoleArnCredential(),
        ];
    }
    async getCredential() {
        for (const provider of this.providers) {
            try {
                const credential = await provider.getCredential();
                if (credential.secretId && credential.secretKey) {
                    return credential;
                }
            }
            catch (error) {
                // Continue to next provider if current one fails
                console.error(error);
                continue;
            }
        }
        return new BasicCredential("", "");
    }
}
exports.DefaultCredentialProvider = DefaultCredentialProvider;
