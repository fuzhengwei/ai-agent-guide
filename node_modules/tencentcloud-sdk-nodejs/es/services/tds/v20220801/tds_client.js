import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tds.tencentcloudapi.com", "2022-08-01", clientConfig);
    }
    async DescribeFraudBase(req, cb) {
        return this.request("DescribeFraudBase", req, cb);
    }
    async DescribeTrustedID(req, cb) {
        return this.request("DescribeTrustedID", req, cb);
    }
    async DescribeFraudPremium(req, cb) {
        return this.request("DescribeFraudPremium", req, cb);
    }
    async DescribeFinanceFraudUltimate(req, cb) {
        return this.request("DescribeFinanceFraudUltimate", req, cb);
    }
    async DescribeFraudUltimate(req, cb) {
        return this.request("DescribeFraudUltimate", req, cb);
    }
}
