import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ams.tencentcloudapi.com", "2020-12-29", clientConfig);
    }
    async CreateAudioModerationTask(req, cb) {
        return this.request("CreateAudioModerationTask", req, cb);
    }
    async CreateAudioModerationSyncTask(req, cb) {
        return this.request("CreateAudioModerationSyncTask", req, cb);
    }
    async DescribeTaskDetail(req, cb) {
        return this.request("DescribeTaskDetail", req, cb);
    }
    async DescribeTasks(req, cb) {
        return this.request("DescribeTasks", req, cb);
    }
    async CancelTask(req, cb) {
        return this.request("CancelTask", req, cb);
    }
}
