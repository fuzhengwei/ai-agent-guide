import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bda.tencentcloudapi.com", "2020-03-24", clientConfig);
    }
    async SegmentPortraitPic(req, cb) {
        return this.request("SegmentPortraitPic", req, cb);
    }
    async SegmentCustomizedPortraitPic(req, cb) {
        return this.request("SegmentCustomizedPortraitPic", req, cb);
    }
    async TerminateSegmentationTask(req, cb) {
        return this.request("TerminateSegmentationTask", req, cb);
    }
    async DescribeSegmentationTask(req, cb) {
        return this.request("DescribeSegmentationTask", req, cb);
    }
    async CreateSegmentationTask(req, cb) {
        return this.request("CreateSegmentationTask", req, cb);
    }
}
