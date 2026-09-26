import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iai.tencentcloudapi.com", "2020-03-03", clientConfig);
    }
    async DeletePersonFromGroup(req, cb) {
        return this.request("DeletePersonFromGroup", req, cb);
    }
    async SearchFacesReturnsByGroup(req, cb) {
        return this.request("SearchFacesReturnsByGroup", req, cb);
    }
    async CreateGroup(req, cb) {
        return this.request("CreateGroup", req, cb);
    }
    async GetPersonBaseInfo(req, cb) {
        return this.request("GetPersonBaseInfo", req, cb);
    }
    async CreateFace(req, cb) {
        return this.request("CreateFace", req, cb);
    }
    async DeleteGroup(req, cb) {
        return this.request("DeleteGroup", req, cb);
    }
    async GetPersonListNum(req, cb) {
        return this.request("GetPersonListNum", req, cb);
    }
    async GetPersonGroupInfo(req, cb) {
        return this.request("GetPersonGroupInfo", req, cb);
    }
    async AnalyzeFace(req, cb) {
        return this.request("AnalyzeFace", req, cb);
    }
    async ModifyPersonBaseInfo(req, cb) {
        return this.request("ModifyPersonBaseInfo", req, cb);
    }
    async SearchFaces(req, cb) {
        return this.request("SearchFaces", req, cb);
    }
    async CopyPerson(req, cb) {
        return this.request("CopyPerson", req, cb);
    }
    async VerifyFace(req, cb) {
        return this.request("VerifyFace", req, cb);
    }
    async AnalyzeDenseLandmarks(req, cb) {
        return this.request("AnalyzeDenseLandmarks", req, cb);
    }
    async DeletePerson(req, cb) {
        return this.request("DeletePerson", req, cb);
    }
    async ModifyGroup(req, cb) {
        return this.request("ModifyGroup", req, cb);
    }
    async UpgradeGroupFaceModelVersion(req, cb) {
        return this.request("UpgradeGroupFaceModelVersion", req, cb);
    }
    async RevertGroupFaceModelVersion(req, cb) {
        return this.request("RevertGroupFaceModelVersion", req, cb);
    }
    async CreatePerson(req, cb) {
        return this.request("CreatePerson", req, cb);
    }
    async CompareMaskFace(req, cb) {
        return this.request("CompareMaskFace", req, cb);
    }
    async GetUpgradeGroupFaceModelVersionJobList(req, cb) {
        return this.request("GetUpgradeGroupFaceModelVersionJobList", req, cb);
    }
    async DetectFaceSimilarity(req, cb) {
        return this.request("DetectFaceSimilarity", req, cb);
    }
    async GetGroupInfo(req, cb) {
        return this.request("GetGroupInfo", req, cb);
    }
    async DetectFace(req, cb) {
        return this.request("DetectFace", req, cb);
    }
    async GetPersonList(req, cb) {
        return this.request("GetPersonList", req, cb);
    }
    async VerifyPerson(req, cb) {
        return this.request("VerifyPerson", req, cb);
    }
    async DetectFaceAttributes(req, cb) {
        return this.request("DetectFaceAttributes", req, cb);
    }
    async DetectLiveFaceAccurate(req, cb) {
        return this.request("DetectLiveFaceAccurate", req, cb);
    }
    async GetUpgradeGroupFaceModelVersionResult(req, cb) {
        return this.request("GetUpgradeGroupFaceModelVersionResult", req, cb);
    }
    async ModifyPersonGroupInfo(req, cb) {
        return this.request("ModifyPersonGroupInfo", req, cb);
    }
    async SearchPersons(req, cb) {
        return this.request("SearchPersons", req, cb);
    }
    async CompareFace(req, cb) {
        return this.request("CompareFace", req, cb);
    }
    async SearchPersonsReturnsByGroup(req, cb) {
        return this.request("SearchPersonsReturnsByGroup", req, cb);
    }
    async GetGroupList(req, cb) {
        return this.request("GetGroupList", req, cb);
    }
    async DeleteFace(req, cb) {
        return this.request("DeleteFace", req, cb);
    }
}
