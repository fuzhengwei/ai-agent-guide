import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("csxg.tencentcloudapi.com", "2023-03-03", clientConfig);
    }
    async Modify5GInstanceAttribute(req, cb) {
        return this.request("Modify5GInstanceAttribute", req, cb);
    }
    async Delete5GInstance(req, cb) {
        return this.request("Delete5GInstance", req, cb);
    }
    async Create5GInstance(req, cb) {
        return this.request("Create5GInstance", req, cb);
    }
    async Describe5GInstances(req, cb) {
        return this.request("Describe5GInstances", req, cb);
    }
    async Describe5GAPNs(req, cb) {
        return this.request("Describe5GAPNs", req, cb);
    }
}
