import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tourism.tencentcloudapi.com", "2023-02-15", clientConfig);
    }
    async DescribeDrawResourceList(req, cb) {
        return this.request("DescribeDrawResourceList", req, cb);
    }
}
