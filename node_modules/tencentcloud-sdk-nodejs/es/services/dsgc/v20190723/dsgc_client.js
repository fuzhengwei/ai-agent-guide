import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dsgc.tencentcloudapi.com", "2019-07-23", clientConfig);
    }
    async CreateDSPALevelGroup(req, cb) {
        return this.request("CreateDSPALevelGroup", req, cb);
    }
    async DescribeDSPAAssessmentRiskDealedOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskDealedOverview", req, cb);
    }
    async CopyDSPATemplate(req, cb) {
        return this.request("CopyDSPATemplate", req, cb);
    }
    async DescribeDSPAAssessmentRiskLevelDetail(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskLevelDetail", req, cb);
    }
    async DescribeDSPAAssessmentRiskTemplateDetail(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskTemplateDetail", req, cb);
    }
    async ModifyDSPAAssessmentRisk(req, cb) {
        return this.request("ModifyDSPAAssessmentRisk", req, cb);
    }
    async ModifyDSPACategoryRelation(req, cb) {
        return this.request("ModifyDSPACategoryRelation", req, cb);
    }
    async DisableDSPAMetaResourceAuth(req, cb) {
        return this.request("DisableDSPAMetaResourceAuth", req, cb);
    }
    async StartDSPADiscoveryTask(req, cb) {
        return this.request("StartDSPADiscoveryTask", req, cb);
    }
    async DescribeDSPAAssessmentLatestRiskList(req, cb) {
        return this.request("DescribeDSPAAssessmentLatestRiskList", req, cb);
    }
    async DescribeDSPADiscoveryRules(req, cb) {
        return this.request("DescribeDSPADiscoveryRules", req, cb);
    }
    async CreateDSPAComplianceRules(req, cb) {
        return this.request("CreateDSPAComplianceRules", req, cb);
    }
    async CreateAssetSortingReportRetryTask(req, cb) {
        return this.request("CreateAssetSortingReportRetryTask", req, cb);
    }
    async DescribeDSPACOSDataAssetByComplianceId(req, cb) {
        return this.request("DescribeDSPACOSDataAssetByComplianceId", req, cb);
    }
    async DescribeDSPAAssessmentRiskLevelList(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskLevelList", req, cb);
    }
    async ModifyDSPAAssessmentRiskLatest(req, cb) {
        return this.request("ModifyDSPAAssessmentRiskLatest", req, cb);
    }
    async DescribeDSPACategoryRuleStatistic(req, cb) {
        return this.request("DescribeDSPACategoryRuleStatistic", req, cb);
    }
    async DeleteDSPACOSDiscoveryTaskResult(req, cb) {
        return this.request("DeleteDSPACOSDiscoveryTaskResult", req, cb);
    }
    async DescribeDSPADiscoveryTasks(req, cb) {
        return this.request("DescribeDSPADiscoveryTasks", req, cb);
    }
    async DescribeRDBAssetSensitiveDistribution(req, cb) {
        return this.request("DescribeRDBAssetSensitiveDistribution", req, cb);
    }
    async ModifyDSPACOSDiscoveryTask(req, cb) {
        return this.request("ModifyDSPACOSDiscoveryTask", req, cb);
    }
    async DeleteDSPAMetaResource(req, cb) {
        return this.request("DeleteDSPAMetaResource", req, cb);
    }
    async DeleteCosMetaResource(req, cb) {
        return this.request("DeleteCosMetaResource", req, cb);
    }
    async DescribeReportTaskDownloadUrl(req, cb) {
        return this.request("DescribeReportTaskDownloadUrl", req, cb);
    }
    async DescribeDSPACOSDiscoveryTaskResult(req, cb) {
        return this.request("DescribeDSPACOSDiscoveryTaskResult", req, cb);
    }
    async BindDSPAResourceCosBuckets(req, cb) {
        return this.request("BindDSPAResourceCosBuckets", req, cb);
    }
    async ModifyDSPAComplianceGroup(req, cb) {
        return this.request("ModifyDSPAComplianceGroup", req, cb);
    }
    async DescribeAssetDetailDataExportResult(req, cb) {
        return this.request("DescribeAssetDetailDataExportResult", req, cb);
    }
    async DescribeDSPAAssessmentRiskSideDistributed(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskSideDistributed", req, cb);
    }
    async DescribeDSPADiscoveryTaskResultDetail(req, cb) {
        return this.request("DescribeDSPADiscoveryTaskResultDetail", req, cb);
    }
    async DescribeDSPAAssessmentRiskLevelTrend(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskLevelTrend", req, cb);
    }
    async DescribeDSPAAssessmentRisks(req, cb) {
        return this.request("DescribeDSPAAssessmentRisks", req, cb);
    }
    async DescribeDSPAComplianceGroupDetail(req, cb) {
        return this.request("DescribeDSPAComplianceGroupDetail", req, cb);
    }
    async CreateDSPAAssessmentRiskLevel(req, cb) {
        return this.request("CreateDSPAAssessmentRiskLevel", req, cb);
    }
    async DescribeDSPACOSTaskResultDetail(req, cb) {
        return this.request("DescribeDSPACOSTaskResultDetail", req, cb);
    }
    async DescribeDSPARDBDataAssetByComplianceId(req, cb) {
        return this.request("DescribeDSPARDBDataAssetByComplianceId", req, cb);
    }
    async DescribeBindDBList(req, cb) {
        return this.request("DescribeBindDBList", req, cb);
    }
    async DescribeExportTaskResult(req, cb) {
        return this.request("DescribeExportTaskResult", req, cb);
    }
    async ListDSPACosMetaResources(req, cb) {
        return this.request("ListDSPACosMetaResources", req, cb);
    }
    async ListDSPAMetaResources(req, cb) {
        return this.request("ListDSPAMetaResources", req, cb);
    }
    async DescribeDSPACategories(req, cb) {
        return this.request("DescribeDSPACategories", req, cb);
    }
    async ModifyDSPAAssessmentRiskTemplate(req, cb) {
        return this.request("ModifyDSPAAssessmentRiskTemplate", req, cb);
    }
    async DescribeDSPADiscoveryTaskDetail(req, cb) {
        return this.request("DescribeDSPADiscoveryTaskDetail", req, cb);
    }
    async ModifyDSPADiscoveryTask(req, cb) {
        return this.request("ModifyDSPADiscoveryTask", req, cb);
    }
    async DescribeDSPAAssessmentRiskAmountOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskAmountOverview", req, cb);
    }
    async DescribeDSPAESDataAssetByComplianceId(req, cb) {
        return this.request("DescribeDSPAESDataAssetByComplianceId", req, cb);
    }
    async DescribeDSPAComplianceGroups(req, cb) {
        return this.request("DescribeDSPAComplianceGroups", req, cb);
    }
    async DescribeDSPACOSDiscoveryTaskDetail(req, cb) {
        return this.request("DescribeDSPACOSDiscoveryTaskDetail", req, cb);
    }
    async DescribeDSPATaskResultDataSample(req, cb) {
        return this.request("DescribeDSPATaskResultDataSample", req, cb);
    }
    async DeleteDSPACOSDiscoveryTask(req, cb) {
        return this.request("DeleteDSPACOSDiscoveryTask", req, cb);
    }
    async DescribeMongoAssetSensitiveDistribution(req, cb) {
        return this.request("DescribeMongoAssetSensitiveDistribution", req, cb);
    }
    async CreateDSPACategoryRelation(req, cb) {
        return this.request("CreateDSPACategoryRelation", req, cb);
    }
    async DescribeSensitiveCOSDataDistribution(req, cb) {
        return this.request("DescribeSensitiveCOSDataDistribution", req, cb);
    }
    async DescribeDSPAAssessmentRiskDatasourceTop5(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskDatasourceTop5", req, cb);
    }
    async DescribeReportTasks(req, cb) {
        return this.request("DescribeReportTasks", req, cb);
    }
    async DescribeDSPACOSDiscoveryTaskFiles(req, cb) {
        return this.request("DescribeDSPACOSDiscoveryTaskFiles", req, cb);
    }
    async DescribeDSPAAssessmentTemplates(req, cb) {
        return this.request("DescribeDSPAAssessmentTemplates", req, cb);
    }
    async EnableDSPADiscoveryRule(req, cb) {
        return this.request("EnableDSPADiscoveryRule", req, cb);
    }
    async CreateIdentifyRuleAnotherName(req, cb) {
        return this.request("CreateIdentifyRuleAnotherName", req, cb);
    }
    async DecribeSuggestRiskLevelMatrix(req, cb) {
        return this.request("DecribeSuggestRiskLevelMatrix", req, cb);
    }
    async DescribeDSPAAssessmentPendingRiskOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentPendingRiskOverview", req, cb);
    }
    async ModifyDSPAESTaskResult(req, cb) {
        return this.request("ModifyDSPAESTaskResult", req, cb);
    }
    async DescribeDSPARDBDataAssetDetail(req, cb) {
        return this.request("DescribeDSPARDBDataAssetDetail", req, cb);
    }
    async DescribeDSPAAssessmentRiskItemTop5(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskItemTop5", req, cb);
    }
    async QueryResourceDbBindStatus(req, cb) {
        return this.request("QueryResourceDbBindStatus", req, cb);
    }
    async DescribeDSPADiscoveryServiceStatus(req, cb) {
        return this.request("DescribeDSPADiscoveryServiceStatus", req, cb);
    }
    async EnableTrialVersion(req, cb) {
        return this.request("EnableTrialVersion", req, cb);
    }
    async ModifyDSPATaskResult(req, cb) {
        return this.request("ModifyDSPATaskResult", req, cb);
    }
    async CreateDSPACategory(req, cb) {
        return this.request("CreateDSPACategory", req, cb);
    }
    async CreateDSPACOSDiscoveryTask(req, cb) {
        return this.request("CreateDSPACOSDiscoveryTask", req, cb);
    }
    async DescribeDSPACategoryRules(req, cb) {
        return this.request("DescribeDSPACategoryRules", req, cb);
    }
    async DescribeDSPAAssessmentRiskTemplateVulnerableList(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskTemplateVulnerableList", req, cb);
    }
    async DescribeDSPACOSDataAssetDetail(req, cb) {
        return this.request("DescribeDSPACOSDataAssetDetail", req, cb);
    }
    async DeleteDSPAAssessmentTask(req, cb) {
        return this.request("DeleteDSPAAssessmentTask", req, cb);
    }
    async VerifyDSPADiscoveryRule(req, cb) {
        return this.request("VerifyDSPADiscoveryRule", req, cb);
    }
    async DescribeDSPACOSDiscoveryTasks(req, cb) {
        return this.request("DescribeDSPACOSDiscoveryTasks", req, cb);
    }
    async DescribeDSPALevelDetail(req, cb) {
        return this.request("DescribeDSPALevelDetail", req, cb);
    }
    async DescribeAssetOverview(req, cb) {
        return this.request("DescribeAssetOverview", req, cb);
    }
    async CreateDSPAAssessmentTask(req, cb) {
        return this.request("CreateDSPAAssessmentTask", req, cb);
    }
    async VerifyDSPACOSRule(req, cb) {
        return this.request("VerifyDSPACOSRule", req, cb);
    }
    async CreateDSPAAssessmentRiskTemplate(req, cb) {
        return this.request("CreateDSPAAssessmentRiskTemplate", req, cb);
    }
    async DescribeDSPAAssessmentRiskOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskOverview", req, cb);
    }
    async DescribeDSPAESDataAssetDetail(req, cb) {
        return this.request("DescribeDSPAESDataAssetDetail", req, cb);
    }
    async CreateDSPAComplianceGroup(req, cb) {
        return this.request("CreateDSPAComplianceGroup", req, cb);
    }
    async DescribeDSPADataSourceDbInfo(req, cb) {
        return this.request("DescribeDSPADataSourceDbInfo", req, cb);
    }
    async CreateDSPAMetaResources(req, cb) {
        return this.request("CreateDSPAMetaResources", req, cb);
    }
    async ModifyDSPAClusterInfo(req, cb) {
        return this.request("ModifyDSPAClusterInfo", req, cb);
    }
    async DescribeDSPAAssessmentHighRiskTop10Overview(req, cb) {
        return this.request("DescribeDSPAAssessmentHighRiskTop10Overview", req, cb);
    }
    async DescribeDSPAAssessmentLatestRiskDetailInfo(req, cb) {
        return this.request("DescribeDSPAAssessmentLatestRiskDetailInfo", req, cb);
    }
    async DescribeDSPAAssessmentTasks(req, cb) {
        return this.request("DescribeDSPAAssessmentTasks", req, cb);
    }
    async DescribeDSPADiscoveryTaskTables(req, cb) {
        return this.request("DescribeDSPADiscoveryTaskTables", req, cb);
    }
    async GetUserQuotaInfo(req, cb) {
        return this.request("GetUserQuotaInfo", req, cb);
    }
    async DescribeDSPAComplianceUpdateNotification(req, cb) {
        return this.request("DescribeDSPAComplianceUpdateNotification", req, cb);
    }
    async CreateDSPADbMetaResources(req, cb) {
        return this.request("CreateDSPADbMetaResources", req, cb);
    }
    async ModifyDSPACOSTaskResult(req, cb) {
        return this.request("ModifyDSPACOSTaskResult", req, cb);
    }
    async BindDSPAResourceDatabases(req, cb) {
        return this.request("BindDSPAResourceDatabases", req, cb);
    }
    async DescribeESAssetSensitiveDistribution(req, cb) {
        return this.request("DescribeESAssetSensitiveDistribution", req, cb);
    }
    async AuthorizeDSPAMetaResources(req, cb) {
        return this.request("AuthorizeDSPAMetaResources", req, cb);
    }
    async DescribeDSPASupportedMetas(req, cb) {
        return this.request("DescribeDSPASupportedMetas", req, cb);
    }
    async DescribeDSPAAssessmentRiskDealedTrend(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskDealedTrend", req, cb);
    }
    async DescribeSensitiveRDBDataDistribution(req, cb) {
        return this.request("DescribeSensitiveRDBDataDistribution", req, cb);
    }
    async RestartDSPAAssessmentTask(req, cb) {
        return this.request("RestartDSPAAssessmentTask", req, cb);
    }
    async DescribeDSPAESDiscoveryTaskResultDetail(req, cb) {
        return this.request("DescribeDSPAESDiscoveryTaskResultDetail", req, cb);
    }
    async DeleteDSPADiscoveryTask(req, cb) {
        return this.request("DeleteDSPADiscoveryTask", req, cb);
    }
    async UpdateDSPASelfBuildResource(req, cb) {
        return this.request("UpdateDSPASelfBuildResource", req, cb);
    }
    async DescribeDSPADiscoveryTaskResult(req, cb) {
        return this.request("DescribeDSPADiscoveryTaskResult", req, cb);
    }
    async ModifyDSPAAssessmentRiskLevel(req, cb) {
        return this.request("ModifyDSPAAssessmentRiskLevel", req, cb);
    }
    async CreateDSPADiscoveryRule(req, cb) {
        return this.request("CreateDSPADiscoveryRule", req, cb);
    }
    async DescribeCOSAssetSensitiveDistribution(req, cb) {
        return this.request("DescribeCOSAssetSensitiveDistribution", req, cb);
    }
    async CreateDSPADiscoveryTask(req, cb) {
        return this.request("CreateDSPADiscoveryTask", req, cb);
    }
    async DescribeDSPAAssessmentNewDiscoveredRiskOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentNewDiscoveredRiskOverview", req, cb);
    }
    async DescribeDSPAAssessmentRiskProcessHistory(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskProcessHistory", req, cb);
    }
    async QueryDSPAMetaResourceDbList(req, cb) {
        return this.request("QueryDSPAMetaResourceDbList", req, cb);
    }
    async GetTrialVersion(req, cb) {
        return this.request("GetTrialVersion", req, cb);
    }
    async DescribeDSPAAssessmentRiskDistributionOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskDistributionOverview", req, cb);
    }
    async DescribeDSPACategoryTreeWithRules(req, cb) {
        return this.request("DescribeDSPACategoryTreeWithRules", req, cb);
    }
    async GetResourceConnectionStatus(req, cb) {
        return this.request("GetResourceConnectionStatus", req, cb);
    }
    async DescribeDSPAESDataSample(req, cb) {
        return this.request("DescribeDSPAESDataSample", req, cb);
    }
    async DescribeDSPAAssessmentTemplateControlItems(req, cb) {
        return this.request("DescribeDSPAAssessmentTemplateControlItems", req, cb);
    }
    async DescribeDSPALevelGroups(req, cb) {
        return this.request("DescribeDSPALevelGroups", req, cb);
    }
    async ListDSPAClusters(req, cb) {
        return this.request("ListDSPAClusters", req, cb);
    }
    async ExportAssetDetailData(req, cb) {
        return this.request("ExportAssetDetailData", req, cb);
    }
    async DescribeDSPACategoryTree(req, cb) {
        return this.request("DescribeDSPACategoryTree", req, cb);
    }
    async CreateDSPASelfBuildMetaResource(req, cb) {
        return this.request("CreateDSPASelfBuildMetaResource", req, cb);
    }
    async StopDSPADiscoveryTask(req, cb) {
        return this.request("StopDSPADiscoveryTask", req, cb);
    }
    async CreateDSPACosMetaResources(req, cb) {
        return this.request("CreateDSPACosMetaResources", req, cb);
    }
    async ModifyDSPACategory(req, cb) {
        return this.request("ModifyDSPACategory", req, cb);
    }
    async ModifyDSPADiscoveryRule(req, cb) {
        return this.request("ModifyDSPADiscoveryRule", req, cb);
    }
    async DeleteDSPADiscoveryTaskResult(req, cb) {
        return this.request("DeleteDSPADiscoveryTaskResult", req, cb);
    }
    async DescribeDSPAAssessmentRiskSideList(req, cb) {
        return this.request("DescribeDSPAAssessmentRiskSideList", req, cb);
    }
    async DescribeDSPACOSDataAssetBuckets(req, cb) {
        return this.request("DescribeDSPACOSDataAssetBuckets", req, cb);
    }
    async DescribeDSPAAssessmentProcessingRiskOverview(req, cb) {
        return this.request("DescribeDSPAAssessmentProcessingRiskOverview", req, cb);
    }
    async CreateAssetSortingReportTask(req, cb) {
        return this.request("CreateAssetSortingReportTask", req, cb);
    }
}
