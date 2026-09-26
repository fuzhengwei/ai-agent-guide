import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cmq.tencentcloudapi.com", "2019-03-04", clientConfig);
    }
    async DescribeTopicDetail(req, cb) {
        return this.request("DescribeTopicDetail", req, cb);
    }
    async DescribeQueueDetail(req, cb) {
        return this.request("DescribeQueueDetail", req, cb);
    }
}
