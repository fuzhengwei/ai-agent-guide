import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tsw.tencentcloudapi.com", "2020-09-24", clientConfig);
    }
    async DescribeAgentShell(req, cb) {
        return this.request("DescribeAgentShell", req, cb);
    }
}
