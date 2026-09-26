import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("teo.tencentcloudapi.com", "2022-01-06", clientConfig);
    }
    async CreatePurgeTask(req, cb) {
        return this.request("CreatePurgeTask", req, cb);
    }
    async DescribePurgeTasks(req, cb) {
        return this.request("DescribePurgeTasks", req, cb);
    }
    async CreatePrefetchTask(req, cb) {
        return this.request("CreatePrefetchTask", req, cb);
    }
    async DescribePrefetchTasks(req, cb) {
        return this.request("DescribePrefetchTasks", req, cb);
    }
    async DescribeZones(req, cb) {
        return this.request("DescribeZones", req, cb);
    }
}
