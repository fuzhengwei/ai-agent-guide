import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dbbrain.tencentcloudapi.com", "2019-10-16", clientConfig);
    }
    async DescribeSecurityAuditLogDownloadUrls(req, cb) {
        return this.request("DescribeSecurityAuditLogDownloadUrls", req, cb);
    }
    async DescribeMailProfile(req, cb) {
        return this.request("DescribeMailProfile", req, cb);
    }
    async CreateSchedulerMailProfile(req, cb) {
        return this.request("CreateSchedulerMailProfile", req, cb);
    }
    async DescribeTopSpaceSchemas(req, cb) {
        return this.request("DescribeTopSpaceSchemas", req, cb);
    }
    async DescribeMySqlProcessList(req, cb) {
        return this.request("DescribeMySqlProcessList", req, cb);
    }
    async DescribeDBDiagReportTasks(req, cb) {
        return this.request("DescribeDBDiagReportTasks", req, cb);
    }
    async DescribeAllUserGroup(req, cb) {
        return this.request("DescribeAllUserGroup", req, cb);
    }
    async DescribeSlowLogTimeSeriesStats(req, cb) {
        return this.request("DescribeSlowLogTimeSeriesStats", req, cb);
    }
    async DescribeSlowLogUserHostStats(req, cb) {
        return this.request("DescribeSlowLogUserHostStats", req, cb);
    }
    async DescribeTopSpaceTables(req, cb) {
        return this.request("DescribeTopSpaceTables", req, cb);
    }
    async DescribeDBSpaceStatus(req, cb) {
        return this.request("DescribeDBSpaceStatus", req, cb);
    }
    async CreateMailProfile(req, cb) {
        return this.request("CreateMailProfile", req, cb);
    }
    async DescribeHealthScore(req, cb) {
        return this.request("DescribeHealthScore", req, cb);
    }
    async CreateSecurityAuditLogExportTask(req, cb) {
        return this.request("CreateSecurityAuditLogExportTask", req, cb);
    }
    async DeleteSecurityAuditLogExportTasks(req, cb) {
        return this.request("DeleteSecurityAuditLogExportTasks", req, cb);
    }
    async DescribeSlowLogTopSqls(req, cb) {
        return this.request("DescribeSlowLogTopSqls", req, cb);
    }
    async DescribeSecurityAuditLogExportTasks(req, cb) {
        return this.request("DescribeSecurityAuditLogExportTasks", req, cb);
    }
    async DescribeAllUserContact(req, cb) {
        return this.request("DescribeAllUserContact", req, cb);
    }
    async DescribeDBDiagEvent(req, cb) {
        return this.request("DescribeDBDiagEvent", req, cb);
    }
    async DescribeDBDiagHistory(req, cb) {
        return this.request("DescribeDBDiagHistory", req, cb);
    }
    async CreateDBDiagReportTask(req, cb) {
        return this.request("CreateDBDiagReportTask", req, cb);
    }
    async DescribeDiagDBInstances(req, cb) {
        return this.request("DescribeDiagDBInstances", req, cb);
    }
    async AddUserContact(req, cb) {
        return this.request("AddUserContact", req, cb);
    }
    async DescribeTopSpaceSchemaTimeSeries(req, cb) {
        return this.request("DescribeTopSpaceSchemaTimeSeries", req, cb);
    }
    async DescribeUserSqlAdvice(req, cb) {
        return this.request("DescribeUserSqlAdvice", req, cb);
    }
    async DescribeTopSpaceTableTimeSeries(req, cb) {
        return this.request("DescribeTopSpaceTableTimeSeries", req, cb);
    }
    async ModifyDiagDBInstanceConf(req, cb) {
        return this.request("ModifyDiagDBInstanceConf", req, cb);
    }
    async CreateDBDiagReportUrl(req, cb) {
        return this.request("CreateDBDiagReportUrl", req, cb);
    }
}
