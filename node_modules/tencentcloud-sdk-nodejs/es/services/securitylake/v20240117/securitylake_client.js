import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("securitylake.tencentcloudapi.com", "2024-01-17", clientConfig);
    }
    async DescribeSecurityAlarmTableList(req, cb) {
        return this.request("DescribeSecurityAlarmTableList", req, cb);
    }
}
