import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cms.tencentcloudapi.com", "2019-03-21", clientConfig);
    }
    async TextModeration(req, cb) {
        return this.request("TextModeration", req, cb);
    }
    async ImageModeration(req, cb) {
        return this.request("ImageModeration", req, cb);
    }
    async DescribeLibSamples(req, cb) {
        return this.request("DescribeLibSamples", req, cb);
    }
    async DescribeKeywordsLibs(req, cb) {
        return this.request("DescribeKeywordsLibs", req, cb);
    }
    async CreateKeywordsSamples(req, cb) {
        return this.request("CreateKeywordsSamples", req, cb);
    }
    async DeleteLibSamples(req, cb) {
        return this.request("DeleteLibSamples", req, cb);
    }
}
