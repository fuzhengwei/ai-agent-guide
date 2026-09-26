import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdc.tencentcloudapi.com", "2020-12-14", clientConfig);
    }
    async ModifySiteDeviceInfo(req, cb) {
        return this.request("ModifySiteDeviceInfo", req, cb);
    }
    async ModifySiteInfo(req, cb) {
        return this.request("ModifySiteInfo", req, cb);
    }
    async DescribeDedicatedClusterHosts(req, cb) {
        return this.request("DescribeDedicatedClusterHosts", req, cb);
    }
    async DeleteSites(req, cb) {
        return this.request("DeleteSites", req, cb);
    }
    async DeleteDedicatedClusterImageCache(req, cb) {
        return this.request("DeleteDedicatedClusterImageCache", req, cb);
    }
    async DescribeDedicatedClusterTypes(req, cb) {
        return this.request("DescribeDedicatedClusterTypes", req, cb);
    }
    async DeleteDedicatedClusters(req, cb) {
        return this.request("DeleteDedicatedClusters", req, cb);
    }
    async DescribeDedicatedClusterHostStatistics(req, cb) {
        return this.request("DescribeDedicatedClusterHostStatistics", req, cb);
    }
    async DescribeDedicatedClusterOrders(req, cb) {
        return this.request("DescribeDedicatedClusterOrders", req, cb);
    }
    async DescribeDedicatedClusters(req, cb) {
        return this.request("DescribeDedicatedClusters", req, cb);
    }
    async DescribeSitesDetail(req, cb) {
        return this.request("DescribeSitesDetail", req, cb);
    }
    async DescribeDedicatedClusterCbsStatistics(req, cb) {
        return this.request("DescribeDedicatedClusterCbsStatistics", req, cb);
    }
    async DescribeDedicatedClusterInstanceTypes(req, cb) {
        return this.request("DescribeDedicatedClusterInstanceTypes", req, cb);
    }
    async CreateDedicatedClusterOrder(req, cb) {
        return this.request("CreateDedicatedClusterOrder", req, cb);
    }
    async DescribeDedicatedClusterCosCapacity(req, cb) {
        return this.request("DescribeDedicatedClusterCosCapacity", req, cb);
    }
    async ModifyDedicatedClusterInfo(req, cb) {
        return this.request("ModifyDedicatedClusterInfo", req, cb);
    }
    async DescribeDedicatedSupportedZones(req, cb) {
        return this.request("DescribeDedicatedSupportedZones", req, cb);
    }
    async CreateSite(req, cb) {
        return this.request("CreateSite", req, cb);
    }
    async CreateDedicatedClusterImageCache(req, cb) {
        return this.request("CreateDedicatedClusterImageCache", req, cb);
    }
    async DescribeDedicatedClusterOverview(req, cb) {
        return this.request("DescribeDedicatedClusterOverview", req, cb);
    }
    async DescribeSites(req, cb) {
        return this.request("DescribeSites", req, cb);
    }
    async CreateDedicatedCluster(req, cb) {
        return this.request("CreateDedicatedCluster", req, cb);
    }
    async ModifyOrderStatus(req, cb) {
        return this.request("ModifyOrderStatus", req, cb);
    }
}
