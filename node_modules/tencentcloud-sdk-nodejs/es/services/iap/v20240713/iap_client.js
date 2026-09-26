import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iap.tencentcloudapi.com", "2024-07-13", clientConfig);
    }
    async UpdateIAPUserOIDCConfig(req, cb) {
        return this.request("UpdateIAPUserOIDCConfig", req, cb);
    }
    async DescribeIAPLoginSessionDuration(req, cb) {
        return this.request("DescribeIAPLoginSessionDuration", req, cb);
    }
    async DescribeIAPUserOIDCConfig(req, cb) {
        return this.request("DescribeIAPUserOIDCConfig", req, cb);
    }
    async DisableIAPUserSSO(req, cb) {
        return this.request("DisableIAPUserSSO", req, cb);
    }
    async CreateIAPUserOIDCConfig(req, cb) {
        return this.request("CreateIAPUserOIDCConfig", req, cb);
    }
    async ModifyIAPLoginSessionDuration(req, cb) {
        return this.request("ModifyIAPLoginSessionDuration", req, cb);
    }
}
