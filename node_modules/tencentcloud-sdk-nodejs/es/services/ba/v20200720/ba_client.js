import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ba.tencentcloudapi.com", "2020-07-20", clientConfig);
    }
    async SyncIcpOrderWebInfo(req, cb) {
        return this.request("SyncIcpOrderWebInfo", req, cb);
    }
    async CreateWeappQRUrl(req, cb) {
        return this.request("CreateWeappQRUrl", req, cb);
    }
    async DescribeGetAuthInfo(req, cb) {
        return this.request("DescribeGetAuthInfo", req, cb);
    }
}
