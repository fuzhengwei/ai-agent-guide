import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("mall.tencentcloudapi.com", "2023-05-18", clientConfig);
    }
    async DescribeDrawResourceList(req, cb) {
        return this.request("DescribeDrawResourceList", req, cb);
    }
}
