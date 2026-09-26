import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("essbasic.tencentcloudapi.com", "2020-12-22", clientConfig);
    }
    async CheckMobileVerification(req, cb) {
        return this.request("CheckMobileVerification", req, cb);
    }
    async CreateSubOrganization(req, cb) {
        return this.request("CreateSubOrganization", req, cb);
    }
    async CancelFlow(req, cb) {
        return this.request("CancelFlow", req, cb);
    }
    async DescribeFileUrls(req, cb) {
        return this.request("DescribeFileUrls", req, cb);
    }
    async CreateH5FaceIdUrl(req, cb) {
        return this.request("CreateH5FaceIdUrl", req, cb);
    }
    async DescribeFlowApprovers(req, cb) {
        return this.request("DescribeFlowApprovers", req, cb);
    }
    async CheckBankCard4EVerification(req, cb) {
        return this.request("CheckBankCard4EVerification", req, cb);
    }
    async DeleteSeal(req, cb) {
        return this.request("DeleteSeal", req, cb);
    }
    async CreateSignUrl(req, cb) {
        return this.request("CreateSignUrl", req, cb);
    }
    async DescribeUsers(req, cb) {
        return this.request("DescribeUsers", req, cb);
    }
    async SendFlowUrl(req, cb) {
        return this.request("SendFlowUrl", req, cb);
    }
    async SendSignInnerVerifyCode(req, cb) {
        return this.request("SendSignInnerVerifyCode", req, cb);
    }
    async DescribeFlowFiles(req, cb) {
        return this.request("DescribeFlowFiles", req, cb);
    }
    async CreateSeal(req, cb) {
        return this.request("CreateSeal", req, cb);
    }
    async ModifyUserDefaultSeal(req, cb) {
        return this.request("ModifyUserDefaultSeal", req, cb);
    }
    async CreatePreviewSignUrl(req, cb) {
        return this.request("CreatePreviewSignUrl", req, cb);
    }
    async CheckVerifyCodeMatchFlowId(req, cb) {
        return this.request("CheckVerifyCodeMatchFlowId", req, cb);
    }
    async CheckFaceIdentify(req, cb) {
        return this.request("CheckFaceIdentify", req, cb);
    }
    async GenerateUserSeal(req, cb) {
        return this.request("GenerateUserSeal", req, cb);
    }
    async UploadFiles(req, cb) {
        return this.request("UploadFiles", req, cb);
    }
    async DescribeCustomFlowIds(req, cb) {
        return this.request("DescribeCustomFlowIds", req, cb);
    }
    async CreateSubOrganizationAndSeal(req, cb) {
        return this.request("CreateSubOrganizationAndSeal", req, cb);
    }
    async DescribeFlow(req, cb) {
        return this.request("DescribeFlow", req, cb);
    }
    async CreateFlowByFiles(req, cb) {
        return this.request("CreateFlowByFiles", req, cb);
    }
    async DescribeCatalogApprovers(req, cb) {
        return this.request("DescribeCatalogApprovers", req, cb);
    }
    async DescribeSubOrganizations(req, cb) {
        return this.request("DescribeSubOrganizations", req, cb);
    }
    async CheckBankCard2EVerification(req, cb) {
        return this.request("CheckBankCard2EVerification", req, cb);
    }
    async ArchiveFlow(req, cb) {
        return this.request("ArchiveFlow", req, cb);
    }
    async CheckMobileAndName(req, cb) {
        return this.request("CheckMobileAndName", req, cb);
    }
    async GenerateOrganizationSeal(req, cb) {
        return this.request("GenerateOrganizationSeal", req, cb);
    }
    async ModifySubOrganizationInfo(req, cb) {
        return this.request("ModifySubOrganizationInfo", req, cb);
    }
    async CreateUserAndSeal(req, cb) {
        return this.request("CreateUserAndSeal", req, cb);
    }
    async DestroyFlowFile(req, cb) {
        return this.request("DestroyFlowFile", req, cb);
    }
    async ModifySeal(req, cb) {
        return this.request("ModifySeal", req, cb);
    }
    async DescribeFileIdsByCustomIds(req, cb) {
        return this.request("DescribeFileIdsByCustomIds", req, cb);
    }
    async SignFlow(req, cb) {
        return this.request("SignFlow", req, cb);
    }
    async DescribeFaceIdResults(req, cb) {
        return this.request("DescribeFaceIdResults", req, cb);
    }
    async DescribeCatalogSignComponents(req, cb) {
        return this.request("DescribeCatalogSignComponents", req, cb);
    }
    async RejectFlow(req, cb) {
        return this.request("RejectFlow", req, cb);
    }
    async ModifyUser(req, cb) {
        return this.request("ModifyUser", req, cb);
    }
    async VerifySubOrganization(req, cb) {
        return this.request("VerifySubOrganization", req, cb);
    }
    async VerifyUser(req, cb) {
        return this.request("VerifyUser", req, cb);
    }
    async DescribeCustomFlowIdsByFlowId(req, cb) {
        return this.request("DescribeCustomFlowIdsByFlowId", req, cb);
    }
    async DescribeFaceIdPhotos(req, cb) {
        return this.request("DescribeFaceIdPhotos", req, cb);
    }
    async CreateFaceIdSign(req, cb) {
        return this.request("CreateFaceIdSign", req, cb);
    }
    async CheckIdCardVerification(req, cb) {
        return this.request("CheckIdCardVerification", req, cb);
    }
    async CheckBankCard3EVerification(req, cb) {
        return this.request("CheckBankCard3EVerification", req, cb);
    }
    async SendFlow(req, cb) {
        return this.request("SendFlow", req, cb);
    }
    async CreateUser(req, cb) {
        return this.request("CreateUser", req, cb);
    }
    async ModifyOrganizationDefaultSeal(req, cb) {
        return this.request("ModifyOrganizationDefaultSeal", req, cb);
    }
    async DescribeSeals(req, cb) {
        return this.request("DescribeSeals", req, cb);
    }
    async CheckBankCardVerification(req, cb) {
        return this.request("CheckBankCardVerification", req, cb);
    }
    async CreateServerFlowSign(req, cb) {
        return this.request("CreateServerFlowSign", req, cb);
    }
}
