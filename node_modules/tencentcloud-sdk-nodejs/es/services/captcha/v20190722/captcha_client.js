import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("captcha.tencentcloudapi.com", "2019-07-22", clientConfig);
    }
    async DescribeCaptchaRceResult(req, cb) {
        return this.request("DescribeCaptchaRceResult", req, cb);
    }
    async DescribeCaptchaMiniRiskResult(req, cb) {
        return this.request("DescribeCaptchaMiniRiskResult", req, cb);
    }
    async DescribeCaptchaTicketData(req, cb) {
        return this.request("DescribeCaptchaTicketData", req, cb);
    }
    async GetTotalRequestStatistics(req, cb) {
        return this.request("GetTotalRequestStatistics", req, cb);
    }
    async DescribeCaptchaDataSum(req, cb) {
        return this.request("DescribeCaptchaDataSum", req, cb);
    }
    async DescribeCaptchaOperData(req, cb) {
        return this.request("DescribeCaptchaOperData", req, cb);
    }
    async DescribeCaptchaMiniData(req, cb) {
        return this.request("DescribeCaptchaMiniData", req, cb);
    }
    async DescribeCaptchaMiniOperData(req, cb) {
        return this.request("DescribeCaptchaMiniOperData", req, cb);
    }
    async DescribeCaptchaData(req, cb) {
        return this.request("DescribeCaptchaData", req, cb);
    }
    async DescribeCaptchaMiniDataSum(req, cb) {
        return this.request("DescribeCaptchaMiniDataSum", req, cb);
    }
    async GetTicketStatistics(req, cb) {
        return this.request("GetTicketStatistics", req, cb);
    }
    async DescribeCaptchaMiniResult(req, cb) {
        return this.request("DescribeCaptchaMiniResult", req, cb);
    }
    async UpdateCaptchaAppIdInfo(req, cb) {
        return this.request("UpdateCaptchaAppIdInfo", req, cb);
    }
    async GetTotalTicketStatistics(req, cb) {
        return this.request("GetTotalTicketStatistics", req, cb);
    }
    async DescribeCaptchaUserAllAppId(req, cb) {
        return this.request("DescribeCaptchaUserAllAppId", req, cb);
    }
    async GetRequestStatistics(req, cb) {
        return this.request("GetRequestStatistics", req, cb);
    }
    async DescribeCaptchaAppIdInfo(req, cb) {
        return this.request("DescribeCaptchaAppIdInfo", req, cb);
    }
    async DescribeCaptchaResult(req, cb) {
        return this.request("DescribeCaptchaResult", req, cb);
    }
}
