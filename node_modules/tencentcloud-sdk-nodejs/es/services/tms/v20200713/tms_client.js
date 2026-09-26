import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tms.tencentcloudapi.com", "2020-07-13", clientConfig);
    }
    async DescribeTextStat(req, cb) {
        return this.request("DescribeTextStat", req, cb);
    }
    async AccountTipoffAccess(req, cb) {
        return this.request("AccountTipoffAccess", req, cb);
    }
    async TextModeration(req, cb) {
        return this.request("TextModeration", req, cb);
    }
    async DescribeTextLib(req, cb) {
        return this.request("DescribeTextLib", req, cb);
    }
}
