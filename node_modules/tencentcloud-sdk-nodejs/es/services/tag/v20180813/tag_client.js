import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tag.tencentcloudapi.com", "2018-08-13", clientConfig);
    }
    async DeleteTags(req, cb) {
        return this.request("DeleteTags", req, cb);
    }
    async DescribeResourceTagsByTagKeys(req, cb) {
        return this.request("DescribeResourceTagsByTagKeys", req, cb);
    }
    async GetTagValues(req, cb) {
        return this.request("GetTagValues", req, cb);
    }
    async DescribeResourceTagsByResourceIds(req, cb) {
        return this.request("DescribeResourceTagsByResourceIds", req, cb);
    }
    async UpdateResourceTagValue(req, cb) {
        return this.request("UpdateResourceTagValue", req, cb);
    }
    async DescribeResourceTagsByResourceIdsSeq(req, cb) {
        return this.request("DescribeResourceTagsByResourceIdsSeq", req, cb);
    }
    async GetTags(req, cb) {
        return this.request("GetTags", req, cb);
    }
    async ModifyResourcesTagValue(req, cb) {
        return this.request("ModifyResourcesTagValue", req, cb);
    }
    async DescribeResourcesByTags(req, cb) {
        return this.request("DescribeResourcesByTags", req, cb);
    }
    async DeleteTag(req, cb) {
        return this.request("DeleteTag", req, cb);
    }
    async GetResources(req, cb) {
        return this.request("GetResources", req, cb);
    }
    async DescribeResourceTags(req, cb) {
        return this.request("DescribeResourceTags", req, cb);
    }
    async AddProject(req, cb) {
        return this.request("AddProject", req, cb);
    }
    async DescribeTagsSeq(req, cb) {
        return this.request("DescribeTagsSeq", req, cb);
    }
    async AddResourceTag(req, cb) {
        return this.request("AddResourceTag", req, cb);
    }
    async AttachResourcesTag(req, cb) {
        return this.request("AttachResourcesTag", req, cb);
    }
    async CreateTag(req, cb) {
        return this.request("CreateTag", req, cb);
    }
    async DetachResourcesTag(req, cb) {
        return this.request("DetachResourcesTag", req, cb);
    }
    async DescribeTagValues(req, cb) {
        return this.request("DescribeTagValues", req, cb);
    }
    async TagResources(req, cb) {
        return this.request("TagResources", req, cb);
    }
    async DeleteResourceTag(req, cb) {
        return this.request("DeleteResourceTag", req, cb);
    }
    async DescribeTags(req, cb) {
        return this.request("DescribeTags", req, cb);
    }
    async DescribeProjects(req, cb) {
        return this.request("DescribeProjects", req, cb);
    }
    async DescribeTagKeys(req, cb) {
        return this.request("DescribeTagKeys", req, cb);
    }
    async UnTagResources(req, cb) {
        return this.request("UnTagResources", req, cb);
    }
    async DescribeTagValuesSeq(req, cb) {
        return this.request("DescribeTagValuesSeq", req, cb);
    }
    async CreateTags(req, cb) {
        return this.request("CreateTags", req, cb);
    }
    async DescribeResourcesByTagsUnion(req, cb) {
        return this.request("DescribeResourcesByTagsUnion", req, cb);
    }
    async UpdateProject(req, cb) {
        return this.request("UpdateProject", req, cb);
    }
    async ModifyResourceTags(req, cb) {
        return this.request("ModifyResourceTags", req, cb);
    }
    async GetTagKeys(req, cb) {
        return this.request("GetTagKeys", req, cb);
    }
}
