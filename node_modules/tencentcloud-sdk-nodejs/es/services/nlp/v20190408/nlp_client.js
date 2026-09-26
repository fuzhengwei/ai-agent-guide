import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("nlp.tencentcloudapi.com", "2019-04-08", clientConfig);
    }
    async SentenceCorrection(req, cb) {
        return this.request("SentenceCorrection", req, cb);
    }
    async ParseWords(req, cb) {
        return this.request("ParseWords", req, cb);
    }
    async AnalyzeSentiment(req, cb) {
        return this.request("AnalyzeSentiment", req, cb);
    }
}
