import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("sts.tencentcloudapi.com", "2018-08-13", clientConfig);
    }
    async GetFederationToken(req, cb) {
        return this.request("GetFederationToken", req, cb);
    }
    async QueryApiKey(req, cb) {
        return this.request("QueryApiKey", req, cb);
    }
    async AssumeRole(req, cb) {
        return this.request("AssumeRole", req, cb);
    }
    async AssumeRoleWithWebIdentity(req, cb) {
        return this.request("AssumeRoleWithWebIdentity", req, cb);
    }
    async GetSessionToken(req, cb) {
        return this.request("GetSessionToken", req, cb);
    }
    async GetCallerIdentity(req, cb) {
        return this.request("GetCallerIdentity", req, cb);
    }
    async AssumeRoleWithSAML(req, cb) {
        return this.request("AssumeRoleWithSAML", req, cb);
    }
}
