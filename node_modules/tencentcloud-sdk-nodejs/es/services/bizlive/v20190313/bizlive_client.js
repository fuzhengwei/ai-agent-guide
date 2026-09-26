import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bizlive.tencentcloudapi.com", "2019-03-13", clientConfig);
    }
    async ForbidLiveStream(req, cb) {
        return this.request("ForbidLiveStream", req, cb);
    }
    async StopGame(req, cb) {
        return this.request("StopGame", req, cb);
    }
    async RegisterIM(req, cb) {
        return this.request("RegisterIM", req, cb);
    }
    async DescribeWorkers(req, cb) {
        return this.request("DescribeWorkers", req, cb);
    }
    async DescribeStreamPlayInfoList(req, cb) {
        return this.request("DescribeStreamPlayInfoList", req, cb);
    }
    async CreateSession(req, cb) {
        return this.request("CreateSession", req, cb);
    }
}
