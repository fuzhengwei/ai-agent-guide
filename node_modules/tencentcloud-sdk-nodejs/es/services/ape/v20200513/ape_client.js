import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ape.tencentcloudapi.com", "2020-05-13", clientConfig);
    }
    async DescribeAuthUsers(req, cb) {
        return this.request("DescribeAuthUsers", req, cb);
    }
    async DescribeDownloadInfos(req, cb) {
        return this.request("DescribeDownloadInfos", req, cb);
    }
    async BatchDescribeOrderCertificate(req, cb) {
        return this.request("BatchDescribeOrderCertificate", req, cb);
    }
    async DescribeImages(req, cb) {
        return this.request("DescribeImages", req, cb);
    }
    async CreateOrderAndDownloads(req, cb) {
        return this.request("CreateOrderAndDownloads", req, cb);
    }
    async DescribeImage(req, cb) {
        return this.request("DescribeImage", req, cb);
    }
    async CreateOrderAndPay(req, cb) {
        return this.request("CreateOrderAndPay", req, cb);
    }
    async BatchDescribeOrderImage(req, cb) {
        return this.request("BatchDescribeOrderImage", req, cb);
    }
}
