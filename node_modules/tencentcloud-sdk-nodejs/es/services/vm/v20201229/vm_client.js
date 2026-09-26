import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vm.tencentcloudapi.com", "2020-12-29", clientConfig);
    }
    async DescribeTaskDetail(req, cb) {
        return this.request("DescribeTaskDetail", req, cb);
    }
    async CreateVideoModerationTask(req, cb) {
        return this.request("CreateVideoModerationTask", req, cb);
    }
    async DescribeTasks(req, cb) {
        return this.request("DescribeTasks", req, cb);
    }
    async CancelTask(req, cb) {
        return this.request("CancelTask", req, cb);
    }
}
