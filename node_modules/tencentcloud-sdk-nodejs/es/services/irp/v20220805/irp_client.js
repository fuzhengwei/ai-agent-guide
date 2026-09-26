import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("irp.tencentcloudapi.com", "2022-08-05", clientConfig);
    }
    async ReportGoodsInfo(req, cb) {
        return this.request("ReportGoodsInfo", req, cb);
    }
    async ReportGoodsBehavior(req, cb) {
        return this.request("ReportGoodsBehavior", req, cb);
    }
    async ReportFeedBehavior(req, cb) {
        return this.request("ReportFeedBehavior", req, cb);
    }
    async DescribeGoodsRecommend(req, cb) {
        return this.request("DescribeGoodsRecommend", req, cb);
    }
    async ReportFeedUser(req, cb) {
        return this.request("ReportFeedUser", req, cb);
    }
    async ReportFeedItem(req, cb) {
        return this.request("ReportFeedItem", req, cb);
    }
    async FeedRecommend(req, cb) {
        return this.request("FeedRecommend", req, cb);
    }
}
