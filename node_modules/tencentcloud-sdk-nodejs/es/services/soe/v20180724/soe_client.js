import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("soe.tencentcloudapi.com", "2018-07-24", clientConfig);
    }
    async InitOralProcess(req, cb) {
        return this.request("InitOralProcess", req, cb);
    }
    async KeywordEvaluate(req, cb) {
        return this.request("KeywordEvaluate", req, cb);
    }
    async TransmitOralProcess(req, cb) {
        return this.request("TransmitOralProcess", req, cb);
    }
    async TransmitOralProcessWithInit(req, cb) {
        return this.request("TransmitOralProcessWithInit", req, cb);
    }
}
