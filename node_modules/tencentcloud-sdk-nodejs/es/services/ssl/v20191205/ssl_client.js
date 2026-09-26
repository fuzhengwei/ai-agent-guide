import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ssl.tencentcloudapi.com", "2019-12-05", clientConfig);
    }
    async DescribeHostCosInstanceList(req, cb) {
        return this.request("DescribeHostCosInstanceList", req, cb);
    }
    async DescribeCertificates(req, cb) {
        return this.request("DescribeCertificates", req, cb);
    }
    async DescribeHostCdnInstanceList(req, cb) {
        return this.request("DescribeHostCdnInstanceList", req, cb);
    }
    async CancelAuditCertificate(req, cb) {
        return this.request("CancelAuditCertificate", req, cb);
    }
    async DescribeHostTkeInstanceList(req, cb) {
        return this.request("DescribeHostTkeInstanceList", req, cb);
    }
    async DescribeHostUpdateRecord(req, cb) {
        return this.request("DescribeHostUpdateRecord", req, cb);
    }
    async DescribeHostDeployRecord(req, cb) {
        return this.request("DescribeHostDeployRecord", req, cb);
    }
    async DescribeHostUploadUpdateRecord(req, cb) {
        return this.request("DescribeHostUploadUpdateRecord", req, cb);
    }
    async UploadUpdateCertificateRecordRetry(req, cb) {
        return this.request("UploadUpdateCertificateRecordRetry", req, cb);
    }
    async UploadUpdateCertificateRecordRollback(req, cb) {
        return this.request("UploadUpdateCertificateRecordRollback", req, cb);
    }
    async DeleteManager(req, cb) {
        return this.request("DeleteManager", req, cb);
    }
    async CertificateInfoSubmit(req, cb) {
        return this.request("CertificateInfoSubmit", req, cb);
    }
    async DescribeDownloadCertificateUrl(req, cb) {
        return this.request("DescribeDownloadCertificateUrl", req, cb);
    }
    async DeployCertificateInstance(req, cb) {
        return this.request("DeployCertificateInstance", req, cb);
    }
    async SubmitAuditManager(req, cb) {
        return this.request("SubmitAuditManager", req, cb);
    }
    async DescribePackages(req, cb) {
        return this.request("DescribePackages", req, cb);
    }
    async SubmitCertificateInformation(req, cb) {
        return this.request("SubmitCertificateInformation", req, cb);
    }
    async UpdateCertificateRecordRollback(req, cb) {
        return this.request("UpdateCertificateRecordRollback", req, cb);
    }
    async UpdateCertificateRecordRetry(req, cb) {
        return this.request("UpdateCertificateRecordRetry", req, cb);
    }
    async DescribeHostDdosInstanceList(req, cb) {
        return this.request("DescribeHostDdosInstanceList", req, cb);
    }
    async VerifyManager(req, cb) {
        return this.request("VerifyManager", req, cb);
    }
    async DescribeHostClbInstanceList(req, cb) {
        return this.request("DescribeHostClbInstanceList", req, cb);
    }
    async DescribeHostTeoInstanceList(req, cb) {
        return this.request("DescribeHostTeoInstanceList", req, cb);
    }
    async CancelCertificateOrder(req, cb) {
        return this.request("CancelCertificateOrder", req, cb);
    }
    async CertificateOrderSubmit(req, cb) {
        return this.request("CertificateOrderSubmit", req, cb);
    }
    async DownloadCertificate(req, cb) {
        return this.request("DownloadCertificate", req, cb);
    }
    async DeleteCertificate(req, cb) {
        return this.request("DeleteCertificate", req, cb);
    }
    async CompleteCertificate(req, cb) {
        return this.request("CompleteCertificate", req, cb);
    }
    async UploadUpdateCertificateInstance(req, cb) {
        return this.request("UploadUpdateCertificateInstance", req, cb);
    }
    async UpdateCertificateInstance(req, cb) {
        return this.request("UpdateCertificateInstance", req, cb);
    }
    async UploadCertificate(req, cb) {
        return this.request("UploadCertificate", req, cb);
    }
    async CheckCertificateChain(req, cb) {
        return this.request("CheckCertificateChain", req, cb);
    }
    async ModifyCertificateAlias(req, cb) {
        return this.request("ModifyCertificateAlias", req, cb);
    }
    async DescribeCompanies(req, cb) {
        return this.request("DescribeCompanies", req, cb);
    }
    async DescribeCertificateDetail(req, cb) {
        return this.request("DescribeCertificateDetail", req, cb);
    }
    async DescribeHostVodInstanceList(req, cb) {
        return this.request("DescribeHostVodInstanceList", req, cb);
    }
    async DescribeHostLiveInstanceList(req, cb) {
        return this.request("DescribeHostLiveInstanceList", req, cb);
    }
    async DescribeHostWafInstanceList(req, cb) {
        return this.request("DescribeHostWafInstanceList", req, cb);
    }
    async DescribeManagerDetail(req, cb) {
        return this.request("DescribeManagerDetail", req, cb);
    }
    async UploadRevokeLetter(req, cb) {
        return this.request("UploadRevokeLetter", req, cb);
    }
    async DescribeHostDeployRecordDetail(req, cb) {
        return this.request("DescribeHostDeployRecordDetail", req, cb);
    }
    async DeployCertificateRecordRollback(req, cb) {
        return this.request("DeployCertificateRecordRollback", req, cb);
    }
    async DeployCertificateRecordRetry(req, cb) {
        return this.request("DeployCertificateRecordRetry", req, cb);
    }
    async DescribeCertificateBindResourceTaskResult(req, cb) {
        return this.request("DescribeCertificateBindResourceTaskResult", req, cb);
    }
    async CheckCertificateDomainVerification(req, cb) {
        return this.request("CheckCertificateDomainVerification", req, cb);
    }
    async CheckCertificateExist(req, cb) {
        return this.request("CheckCertificateExist", req, cb);
    }
    async DescribeHostUploadUpdateRecordDetail(req, cb) {
        return this.request("DescribeHostUploadUpdateRecordDetail", req, cb);
    }
    async DeleteCertificates(req, cb) {
        return this.request("DeleteCertificates", req, cb);
    }
    async RevokeCertificate(req, cb) {
        return this.request("RevokeCertificate", req, cb);
    }
    async ModifyCertificateProject(req, cb) {
        return this.request("ModifyCertificateProject", req, cb);
    }
    async DescribeCertificate(req, cb) {
        return this.request("DescribeCertificate", req, cb);
    }
    async DescribeDeployedResources(req, cb) {
        return this.request("DescribeDeployedResources", req, cb);
    }
    async CreateCertificate(req, cb) {
        return this.request("CreateCertificate", req, cb);
    }
    async UploadConfirmLetter(req, cb) {
        return this.request("UploadConfirmLetter", req, cb);
    }
    async DescribeHostLighthouseInstanceList(req, cb) {
        return this.request("DescribeHostLighthouseInstanceList", req, cb);
    }
    async DescribeHostUpdateRecordDetail(req, cb) {
        return this.request("DescribeHostUpdateRecordDetail", req, cb);
    }
    async CommitCertificateInformation(req, cb) {
        return this.request("CommitCertificateInformation", req, cb);
    }
    async DescribeCertificateOperateLogs(req, cb) {
        return this.request("DescribeCertificateOperateLogs", req, cb);
    }
    async DescribeHostApiGatewayInstanceList(req, cb) {
        return this.request("DescribeHostApiGatewayInstanceList", req, cb);
    }
    async CreateCertificateByPackage(req, cb) {
        return this.request("CreateCertificateByPackage", req, cb);
    }
    async CreateCertificateBindResourceSyncTask(req, cb) {
        return this.request("CreateCertificateBindResourceSyncTask", req, cb);
    }
    async ModifyCertificatesExpiringNotificationSwitch(req, cb) {
        return this.request("ModifyCertificatesExpiringNotificationSwitch", req, cb);
    }
    async ReplaceCertificate(req, cb) {
        return this.request("ReplaceCertificate", req, cb);
    }
    async ApplyCertificate(req, cb) {
        return this.request("ApplyCertificate", req, cb);
    }
    async DescribeDeleteCertificatesTaskResult(req, cb) {
        return this.request("DescribeDeleteCertificatesTaskResult", req, cb);
    }
    async DescribeManagers(req, cb) {
        return this.request("DescribeManagers", req, cb);
    }
    async DescribeCertificateBindResourceTaskDetail(req, cb) {
        return this.request("DescribeCertificateBindResourceTaskDetail", req, cb);
    }
    async ModifyCertificateResubmit(req, cb) {
        return this.request("ModifyCertificateResubmit", req, cb);
    }
}
