import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bpaas.tencentcloudapi.com", "2018-12-17", clientConfig);
    }
    async GetBpaasApproveDetail(req, cb) {
        return this.request("GetBpaasApproveDetail", req, cb);
    }
    async OutApproveBpaasApplication(req, cb) {
        return this.request("OutApproveBpaasApplication", req, cb);
    }
}
