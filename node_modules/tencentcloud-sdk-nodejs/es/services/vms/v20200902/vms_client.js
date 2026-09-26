import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vms.tencentcloudapi.com", "2020-09-02", clientConfig);
    }
    async SendCodeVoice(req, cb) {
        return this.request("SendCodeVoice", req, cb);
    }
    async SendTtsVoice(req, cb) {
        return this.request("SendTtsVoice", req, cb);
    }
}
