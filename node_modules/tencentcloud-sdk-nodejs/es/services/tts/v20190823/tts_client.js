import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tts.tencentcloudapi.com", "2019-08-23", clientConfig);
    }
    async CreateTtsTask(req, cb) {
        return this.request("CreateTtsTask", req, cb);
    }
    async DescribeTtsTaskStatus(req, cb) {
        return this.request("DescribeTtsTaskStatus", req, cb);
    }
    async TextToVoice(req, cb) {
        return this.request("TextToVoice", req, cb);
    }
}
