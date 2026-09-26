import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("lowcode.tencentcloudapi.com", "2021-01-08", clientConfig);
    }
    async CreateKnowledgeSet(req, cb) {
        return this.request("CreateKnowledgeSet", req, cb);
    }
    async CheckDeployApp(req, cb) {
        return this.request("CheckDeployApp", req, cb);
    }
    async UpdateKnowledgeSet(req, cb) {
        return this.request("UpdateKnowledgeSet", req, cb);
    }
    async DescribeApps(req, cb) {
        return this.request("DescribeApps", req, cb);
    }
    async DescribeRelatedUsers(req, cb) {
        return this.request("DescribeRelatedUsers", req, cb);
    }
    async DescribeKnowledgeSetList(req, cb) {
        return this.request("DescribeKnowledgeSetList", req, cb);
    }
    async SearchDocList(req, cb) {
        return this.request("SearchDocList", req, cb);
    }
    async DescribeDataSourceList(req, cb) {
        return this.request("DescribeDataSourceList", req, cb);
    }
    async PutWxAppIdToWeApp(req, cb) {
        return this.request("PutWxAppIdToWeApp", req, cb);
    }
    async DeleteKnowledgeDocumentSet(req, cb) {
        return this.request("DeleteKnowledgeDocumentSet", req, cb);
    }
    async DescribeKnowledgeDocumentSetDetail(req, cb) {
        return this.request("DescribeKnowledgeDocumentSetDetail", req, cb);
    }
    async UploadKnowledgeDocumentSet(req, cb) {
        return this.request("UploadKnowledgeDocumentSet", req, cb);
    }
    async DeleteAppBindWxApp(req, cb) {
        return this.request("DeleteAppBindWxApp", req, cb);
    }
    async DescribeKnowledgeDocumentSetList(req, cb) {
        return this.request("DescribeKnowledgeDocumentSetList", req, cb);
    }
    async DeployApp(req, cb) {
        return this.request("DeployApp", req, cb);
    }
    async DescribeResourceRoleList(req, cb) {
        return this.request("DescribeResourceRoleList", req, cb);
    }
    async DeleteKnowledgeSet(req, cb) {
        return this.request("DeleteKnowledgeSet", req, cb);
    }
}
