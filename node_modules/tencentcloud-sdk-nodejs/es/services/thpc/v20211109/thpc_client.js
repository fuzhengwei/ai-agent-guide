import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("thpc.tencentcloudapi.com", "2021-11-09", clientConfig);
    }
    async DeleteCluster(req, cb) {
        return this.request("DeleteCluster", req, cb);
    }
    async DescribeClusters(req, cb) {
        return this.request("DescribeClusters", req, cb);
    }
    async BindAutoScalingGroup(req, cb) {
        return this.request("BindAutoScalingGroup", req, cb);
    }
    async CreateCluster(req, cb) {
        return this.request("CreateCluster", req, cb);
    }
}
