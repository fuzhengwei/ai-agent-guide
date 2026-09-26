import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tkgdq.tencentcloudapi.com", "2019-04-11", clientConfig);
    }
    async DescribeEntity(req, cb) {
        return this.request("DescribeEntity", req, cb);
    }
    async DescribeTriple(req, cb) {
        return this.request("DescribeTriple", req, cb);
    }
    async DescribeRelation(req, cb) {
        return this.request("DescribeRelation", req, cb);
    }
}
