import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("irp.tencentcloudapi.com", "2022-03-24", clientConfig);
    }
    async RecommendContent(req, cb) {
        return this.request("RecommendContent", req, cb);
    }
    async ReportMaterial(req, cb) {
        return this.request("ReportMaterial", req, cb);
    }
    async ReportAction(req, cb) {
        return this.request("ReportAction", req, cb);
    }
    async ReportPortrait(req, cb) {
        return this.request("ReportPortrait", req, cb);
    }
}
