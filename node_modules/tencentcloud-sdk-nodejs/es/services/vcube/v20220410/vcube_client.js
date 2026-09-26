import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vcube.tencentcloudapi.com", "2022-04-10", clientConfig);
    }
    async ModifyTrialLicense(req, cb) {
        return this.request("ModifyTrialLicense", req, cb);
    }
    async DeleteApplicationAndWebPlayerLicense(req, cb) {
        return this.request("DeleteApplicationAndWebPlayerLicense", req, cb);
    }
    async RenewTestXMagic(req, cb) {
        return this.request("RenewTestXMagic", req, cb);
    }
    async DescribeVcubeResources(req, cb) {
        return this.request("DescribeVcubeResources", req, cb);
    }
    async DescribeNews(req, cb) {
        return this.request("DescribeNews", req, cb);
    }
    async CreateApplicationAndWebPlayerLicense(req, cb) {
        return this.request("CreateApplicationAndWebPlayerLicense", req, cb);
    }
    async DescribeXMagicResource(req, cb) {
        return this.request("DescribeXMagicResource", req, cb);
    }
    async ModifyApplication(req, cb) {
        return this.request("ModifyApplication", req, cb);
    }
    async ModifyFormalApplication(req, cb) {
        return this.request("ModifyFormalApplication", req, cb);
    }
    async DescribeUserConfig(req, cb) {
        return this.request("DescribeUserConfig", req, cb);
    }
    async DescribeSTS(req, cb) {
        return this.request("DescribeSTS", req, cb);
    }
    async ModifyPresetApplication(req, cb) {
        return this.request("ModifyPresetApplication", req, cb);
    }
    async DescribeVcubeResourcesList(req, cb) {
        return this.request("DescribeVcubeResourcesList", req, cb);
    }
    async CreateTrialLicense(req, cb) {
        return this.request("CreateTrialLicense", req, cb);
    }
    async ModifyLicense(req, cb) {
        return this.request("ModifyLicense", req, cb);
    }
    async DeleteApplicationAndVideoLicense(req, cb) {
        return this.request("DeleteApplicationAndVideoLicense", req, cb);
    }
    async DescribeVcubeApplicationAndLicense(req, cb) {
        return this.request("DescribeVcubeApplicationAndLicense", req, cb);
    }
    async UpdateTestXMagic(req, cb) {
        return this.request("UpdateTestXMagic", req, cb);
    }
    async UpdateXMagic(req, cb) {
        return this.request("UpdateXMagic", req, cb);
    }
    async UpdateTrialLicense(req, cb) {
        return this.request("UpdateTrialLicense", req, cb);
    }
    async DescribeVcubeApplicationAndXMagicList(req, cb) {
        return this.request("DescribeVcubeApplicationAndXMagicList", req, cb);
    }
    async DescribeVcubeApplicationAndPlayList(req, cb) {
        return this.request("DescribeVcubeApplicationAndPlayList", req, cb);
    }
    async DescribeLicenseList(req, cb) {
        return this.request("DescribeLicenseList", req, cb);
    }
    async CreateActivityLicense(req, cb) {
        return this.request("CreateActivityLicense", req, cb);
    }
    async CreateLicense(req, cb) {
        return this.request("CreateLicense", req, cb);
    }
    async CreateTestXMagic(req, cb) {
        return this.request("CreateTestXMagic", req, cb);
    }
    async RenewVideo(req, cb) {
        return this.request("RenewVideo", req, cb);
    }
    async RenewLicense(req, cb) {
        return this.request("RenewLicense", req, cb);
    }
    async CreateTrialApplicationAndLicense(req, cb) {
        return this.request("CreateTrialApplicationAndLicense", req, cb);
    }
    async DescribeXMagicResourceList(req, cb) {
        return this.request("DescribeXMagicResourceList", req, cb);
    }
    async DescribeTrialFeature(req, cb) {
        return this.request("DescribeTrialFeature", req, cb);
    }
    async CreateXMagic(req, cb) {
        return this.request("CreateXMagic", req, cb);
    }
    async CreateApplicationAndVideo(req, cb) {
        return this.request("CreateApplicationAndVideo", req, cb);
    }
    async DescribeFeatureList(req, cb) {
        return this.request("DescribeFeatureList", req, cb);
    }
    async CreateApplicationAndBindLicense(req, cb) {
        return this.request("CreateApplicationAndBindLicense", req, cb);
    }
    async ModifyXMagic(req, cb) {
        return this.request("ModifyXMagic", req, cb);
    }
}
