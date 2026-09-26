import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("evt.tencentcloudapi.com", "2025-02-17", clientConfig);
    }
    async PutEvent(req, cb) {
        return this.request("PutEvent", req, cb);
    }
    async DeleteRoleUser(req, cb) {
        return this.request("DeleteRoleUser", req, cb);
    }
    async CreateRoleUser(req, cb) {
        return this.request("CreateRoleUser", req, cb);
    }
    async CompleteApproval(req, cb) {
        return this.request("CompleteApproval", req, cb);
    }
    async PutMessage(req, cb) {
        return this.request("PutMessage", req, cb);
    }
}
