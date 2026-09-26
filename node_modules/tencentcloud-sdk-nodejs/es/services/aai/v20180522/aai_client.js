import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("aai.tencentcloudapi.com", "2018-05-22", clientConfig);
    }
    async SimultaneousInterpreting(req, cb) {
        return this.request("SimultaneousInterpreting", req, cb);
    }
    async SentenceRecognition(req, cb) {
        return this.request("SentenceRecognition", req, cb);
    }
    async Chat(req, cb) {
        return this.request("Chat", req, cb);
    }
    async TextToVoice(req, cb) {
        return this.request("TextToVoice", req, cb);
    }
}
