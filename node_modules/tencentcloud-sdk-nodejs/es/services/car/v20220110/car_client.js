import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("car.tencentcloudapi.com", "2022-01-10", clientConfig);
    }
    async ApplyConcurrent(req, cb) {
        return this.request("ApplyConcurrent", req, cb);
    }
    async DescribeConcurrentCount(req, cb) {
        return this.request("DescribeConcurrentCount", req, cb);
    }
    async DestroySession(req, cb) {
        return this.request("DestroySession", req, cb);
    }
    async StartPublishStream(req, cb) {
        return this.request("StartPublishStream", req, cb);
    }
    async StopPublishStream(req, cb) {
        return this.request("StopPublishStream", req, cb);
    }
    async StartPublishStreamWithURL(req, cb) {
        return this.request("StartPublishStreamWithURL", req, cb);
    }
    async CreateSession(req, cb) {
        return this.request("CreateSession", req, cb);
    }
}
