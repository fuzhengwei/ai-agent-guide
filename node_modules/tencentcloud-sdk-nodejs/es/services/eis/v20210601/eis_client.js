import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("eis.tencentcloudapi.com", "2021-06-01", clientConfig);
    }
    async GetRuntimeMC(req, cb) {
        return this.request("GetRuntimeMC", req, cb);
    }
    async ListDeployableRuntimesMC(req, cb) {
        return this.request("ListDeployableRuntimesMC", req, cb);
    }
    async GetRuntimeResourceMonitorMetricMC(req, cb) {
        return this.request("GetRuntimeResourceMonitorMetricMC", req, cb);
    }
    async ListRuntimeDeployedInstancesMC(req, cb) {
        return this.request("ListRuntimeDeployedInstancesMC", req, cb);
    }
    async ListRuntimesMC(req, cb) {
        return this.request("ListRuntimesMC", req, cb);
    }
}
