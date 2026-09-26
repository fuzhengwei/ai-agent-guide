import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tccatalog.tencentcloudapi.com", "2024-10-24", clientConfig);
    }
    async DescribeTccCatalogs(req, cb) {
        return this.request("DescribeTccCatalogs", req, cb);
    }
    async DescribeTccCatalog(req, cb) {
        return this.request("DescribeTccCatalog", req, cb);
    }
    async BindTccVpcEndPointServiceWhiteList(req, cb) {
        return this.request("BindTccVpcEndPointServiceWhiteList", req, cb);
    }
    async AcceptTccVpcEndPointConnect(req, cb) {
        return this.request("AcceptTccVpcEndPointConnect", req, cb);
    }
}
