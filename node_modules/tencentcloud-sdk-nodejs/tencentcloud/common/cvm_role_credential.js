"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fetch_1 = tslib_1.__importDefault(require("./http/fetch"));
const META_URL = "http://metadata.tencentyun.com/latest/meta-data/";
const ROLE_URL = META_URL + "cam/security-credentials/";
const EXPIRE_BUFFER = 30 * 1000;
/**
 * Tencent Cloud Credential via CVM role
 *
 * Automatically generates temporary credentials when binding a service role to instance.
 * @see {@link https://cloud.tencent.com/document/product/598/85616} for more information.
 */
class CvmRoleCredential {
    // Method to fetch the role name from the metadata server
    async getRoleName() {
        const response = await (0, fetch_1.default)(ROLE_URL, {});
        if (!response.ok) {
            throw new Error("Get cvm role name failed, Please confirm whether the role is bound");
        }
        return await response.text();
    }
    // Method to fetch credentials for a given role name
    async getRoleCredential(roleName) {
        const response = await (0, fetch_1.default)(ROLE_URL + roleName, {});
        if (!response.ok) {
            throw new Error(`Get credential from metadata server by role name ${roleName} failed, http code: ${response.status}`);
        }
        const json = await response.json();
        if (json.Code !== "Success") {
            throw new Error(`Get credential from metadata server by role name ${roleName} failed, Code: ${json.Code}`);
        }
        return json;
    }
    // Method to get the current credential, refreshing if expired
    async getCredential() {
        if (!this.roleNameTask) {
            this.roleNameTask = this.getRoleName();
        }
        const roleName = await this.roleNameTask;
        if (!this.credentialTask) {
            this.credentialTask = this.getRoleCredential(roleName);
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
exports.default = CvmRoleCredential;
