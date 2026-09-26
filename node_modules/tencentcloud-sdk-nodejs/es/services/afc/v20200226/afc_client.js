import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("afc.tencentcloudapi.com", "2020-02-26", clientConfig);
    }
    async QueryAntiFraudVip(req, cb) {
        return this.request("QueryAntiFraudVip", req, cb);
    }
    async GetAntiFraudVip(req, cb) {
        return this.request("GetAntiFraudVip", req, cb);
    }
    async TransportGeneralInterface(req, cb) {
        return this.request("TransportGeneralInterface", req, cb);
    }
}
