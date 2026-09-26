import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("smh.tencentcloudapi.com", "2021-07-12", clientConfig);
    }
    async DescribeOfficialInstances(req, cb) {
        return this.request("DescribeOfficialInstances", req, cb);
    }
    async CreateLibrary(req, cb) {
        return this.request("CreateLibrary", req, cb);
    }
    async SendSmsCode(req, cb) {
        return this.request("SendSmsCode", req, cb);
    }
    async VerifySmsCode(req, cb) {
        return this.request("VerifySmsCode", req, cb);
    }
    async DescribeLibraries(req, cb) {
        return this.request("DescribeLibraries", req, cb);
    }
    async ModifyLibrary(req, cb) {
        return this.request("ModifyLibrary", req, cb);
    }
    async DescribeOfficialOverview(req, cb) {
        return this.request("DescribeOfficialOverview", req, cb);
    }
    async DescribeTrafficPackages(req, cb) {
        return this.request("DescribeTrafficPackages", req, cb);
    }
    async DeleteLibrary(req, cb) {
        return this.request("DeleteLibrary", req, cb);
    }
    async DescribeLibrarySecret(req, cb) {
        return this.request("DescribeLibrarySecret", req, cb);
    }
}
