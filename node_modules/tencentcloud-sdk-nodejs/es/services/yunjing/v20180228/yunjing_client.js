import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("yunjing.tencentcloudapi.com", "2018-02-28", clientConfig);
    }
    async DeleteTags(req, cb) {
        return this.request("DeleteTags", req, cb);
    }
    async TrustMalwares(req, cb) {
        return this.request("TrustMalwares", req, cb);
    }
    async DescribeComponentStatistics(req, cb) {
        return this.request("DescribeComponentStatistics", req, cb);
    }
    async DeleteMachineTag(req, cb) {
        return this.request("DeleteMachineTag", req, cb);
    }
    async DescribeAttackLogs(req, cb) {
        return this.request("DescribeAttackLogs", req, cb);
    }
    async OpenProVersion(req, cb) {
        return this.request("OpenProVersion", req, cb);
    }
    async DescribeWeeklyReportMalwares(req, cb) {
        return this.request("DescribeWeeklyReportMalwares", req, cb);
    }
    async DescribeVulInfo(req, cb) {
        return this.request("DescribeVulInfo", req, cb);
    }
    async EditBashRule(req, cb) {
        return this.request("EditBashRule", req, cb);
    }
    async DeleteUsualLoginPlaces(req, cb) {
        return this.request("DeleteUsualLoginPlaces", req, cb);
    }
    async DescribeVuls(req, cb) {
        return this.request("DescribeVuls", req, cb);
    }
    async MisAlarmNonlocalLoginPlaces(req, cb) {
        return this.request("MisAlarmNonlocalLoginPlaces", req, cb);
    }
    async CreateBaselineStrategy(req, cb) {
        return this.request("CreateBaselineStrategy", req, cb);
    }
    async DescribeBashRules(req, cb) {
        return this.request("DescribeBashRules", req, cb);
    }
    async DeletePrivilegeEvents(req, cb) {
        return this.request("DeletePrivilegeEvents", req, cb);
    }
    async RenewProVersion(req, cb) {
        return this.request("RenewProVersion", req, cb);
    }
    async ExportAttackLogs(req, cb) {
        return this.request("ExportAttackLogs", req, cb);
    }
    async DescribeUsualLoginPlaces(req, cb) {
        return this.request("DescribeUsualLoginPlaces", req, cb);
    }
    async DeleteBashEvents(req, cb) {
        return this.request("DeleteBashEvents", req, cb);
    }
    async DeleteMaliciousRequests(req, cb) {
        return this.request("DeleteMaliciousRequests", req, cb);
    }
    async DescribeReverseShellRules(req, cb) {
        return this.request("DescribeReverseShellRules", req, cb);
    }
    async RecoverMalwares(req, cb) {
        return this.request("RecoverMalwares", req, cb);
    }
    async DeleteReverseShellRules(req, cb) {
        return this.request("DeleteReverseShellRules", req, cb);
    }
    async DeleteBruteAttacks(req, cb) {
        return this.request("DeleteBruteAttacks", req, cb);
    }
    async ExportBashEvents(req, cb) {
        return this.request("ExportBashEvents", req, cb);
    }
    async CreateProcessTask(req, cb) {
        return this.request("CreateProcessTask", req, cb);
    }
    async EditReverseShellRule(req, cb) {
        return this.request("EditReverseShellRule", req, cb);
    }
    async DescribeProcesses(req, cb) {
        return this.request("DescribeProcesses", req, cb);
    }
    async DescribeMalwares(req, cb) {
        return this.request("DescribeMalwares", req, cb);
    }
    async ModifyLoginWhiteList(req, cb) {
        return this.request("ModifyLoginWhiteList", req, cb);
    }
    async DescribePrivilegeRules(req, cb) {
        return this.request("DescribePrivilegeRules", req, cb);
    }
    async UntrustMaliciousRequest(req, cb) {
        return this.request("UntrustMaliciousRequest", req, cb);
    }
    async DescribeImpactedHosts(req, cb) {
        return this.request("DescribeImpactedHosts", req, cb);
    }
    async DeleteNonlocalLoginPlaces(req, cb) {
        return this.request("DeleteNonlocalLoginPlaces", req, cb);
    }
    async DescribeOpenPorts(req, cb) {
        return this.request("DescribeOpenPorts", req, cb);
    }
    async ExportMaliciousRequests(req, cb) {
        return this.request("ExportMaliciousRequests", req, cb);
    }
    async DescribeTagMachines(req, cb) {
        return this.request("DescribeTagMachines", req, cb);
    }
    async DescribeNonlocalLoginPlaces(req, cb) {
        return this.request("DescribeNonlocalLoginPlaces", req, cb);
    }
    async ExportPrivilegeEvents(req, cb) {
        return this.request("ExportPrivilegeEvents", req, cb);
    }
    async DescribeOverviewStatistics(req, cb) {
        return this.request("DescribeOverviewStatistics", req, cb);
    }
    async DescribeOpenPortTaskStatus(req, cb) {
        return this.request("DescribeOpenPortTaskStatus", req, cb);
    }
    async DescribeSecurityDynamics(req, cb) {
        return this.request("DescribeSecurityDynamics", req, cb);
    }
    async DeleteReverseShellEvents(req, cb) {
        return this.request("DeleteReverseShellEvents", req, cb);
    }
    async DeletePrivilegeRules(req, cb) {
        return this.request("DeletePrivilegeRules", req, cb);
    }
    async DeleteMalwares(req, cb) {
        return this.request("DeleteMalwares", req, cb);
    }
    async DescribeWeeklyReportNonlocalLoginPlaces(req, cb) {
        return this.request("DescribeWeeklyReportNonlocalLoginPlaces", req, cb);
    }
    async DeleteLoginWhiteList(req, cb) {
        return this.request("DeleteLoginWhiteList", req, cb);
    }
    async CreateOpenPortTask(req, cb) {
        return this.request("CreateOpenPortTask", req, cb);
    }
    async CloseProVersion(req, cb) {
        return this.request("CloseProVersion", req, cb);
    }
    async DescribeAccountStatistics(req, cb) {
        return this.request("DescribeAccountStatistics", req, cb);
    }
    async ModifyAlarmAttribute(req, cb) {
        return this.request("ModifyAlarmAttribute", req, cb);
    }
    async DescribeOpenPortStatistics(req, cb) {
        return this.request("DescribeOpenPortStatistics", req, cb);
    }
    async ExportBruteAttacks(req, cb) {
        return this.request("ExportBruteAttacks", req, cb);
    }
    async TrustMaliciousRequest(req, cb) {
        return this.request("TrustMaliciousRequest", req, cb);
    }
    async SwitchBashRules(req, cb) {
        return this.request("SwitchBashRules", req, cb);
    }
    async EditPrivilegeRule(req, cb) {
        return this.request("EditPrivilegeRule", req, cb);
    }
    async ExportMalwares(req, cb) {
        return this.request("ExportMalwares", req, cb);
    }
    async DescribeBruteAttacks(req, cb) {
        return this.request("DescribeBruteAttacks", req, cb);
    }
    async OpenProVersionPrepaid(req, cb) {
        return this.request("OpenProVersionPrepaid", req, cb);
    }
    async AddMachineTag(req, cb) {
        return this.request("AddMachineTag", req, cb);
    }
    async EditTags(req, cb) {
        return this.request("EditTags", req, cb);
    }
    async SeparateMalwares(req, cb) {
        return this.request("SeparateMalwares", req, cb);
    }
    async AddLoginWhiteList(req, cb) {
        return this.request("AddLoginWhiteList", req, cb);
    }
    async ExportNonlocalLoginPlaces(req, cb) {
        return this.request("ExportNonlocalLoginPlaces", req, cb);
    }
    async DescribeMaliciousRequests(req, cb) {
        return this.request("DescribeMaliciousRequests", req, cb);
    }
    async DeleteBashRules(req, cb) {
        return this.request("DeleteBashRules", req, cb);
    }
    async DescribeReverseShellEvents(req, cb) {
        return this.request("DescribeReverseShellEvents", req, cb);
    }
    async ModifyAutoOpenProVersionConfig(req, cb) {
        return this.request("ModifyAutoOpenProVersionConfig", req, cb);
    }
    async DescribeAgentVuls(req, cb) {
        return this.request("DescribeAgentVuls", req, cb);
    }
    async DescribeAccounts(req, cb) {
        return this.request("DescribeAccounts", req, cb);
    }
    async DescribeWeeklyReports(req, cb) {
        return this.request("DescribeWeeklyReports", req, cb);
    }
    async DescribeProVersionInfo(req, cb) {
        return this.request("DescribeProVersionInfo", req, cb);
    }
    async DescribePrivilegeEvents(req, cb) {
        return this.request("DescribePrivilegeEvents", req, cb);
    }
    async DescribeMachineInfo(req, cb) {
        return this.request("DescribeMachineInfo", req, cb);
    }
    async DescribeAlarmAttribute(req, cb) {
        return this.request("DescribeAlarmAttribute", req, cb);
    }
    async DescribeComponents(req, cb) {
        return this.request("DescribeComponents", req, cb);
    }
    async DescribeLoginWhiteList(req, cb) {
        return this.request("DescribeLoginWhiteList", req, cb);
    }
    async DescribeVulScanResult(req, cb) {
        return this.request("DescribeVulScanResult", req, cb);
    }
    async DescribeHistoryAccounts(req, cb) {
        return this.request("DescribeHistoryAccounts", req, cb);
    }
    async DescribeProcessStatistics(req, cb) {
        return this.request("DescribeProcessStatistics", req, cb);
    }
    async DescribeWeeklyReportBruteAttacks(req, cb) {
        return this.request("DescribeWeeklyReportBruteAttacks", req, cb);
    }
    async UntrustMalwares(req, cb) {
        return this.request("UntrustMalwares", req, cb);
    }
    async DescribeWeeklyReportVuls(req, cb) {
        return this.request("DescribeWeeklyReportVuls", req, cb);
    }
    async DescribeWeeklyReportInfo(req, cb) {
        return this.request("DescribeWeeklyReportInfo", req, cb);
    }
    async DescribeComponentInfo(req, cb) {
        return this.request("DescribeComponentInfo", req, cb);
    }
    async ModifyProVersionRenewFlag(req, cb) {
        return this.request("ModifyProVersionRenewFlag", req, cb);
    }
    async SetBashEventsStatus(req, cb) {
        return this.request("SetBashEventsStatus", req, cb);
    }
    async ExportReverseShellEvents(req, cb) {
        return this.request("ExportReverseShellEvents", req, cb);
    }
    async DeleteAttackLogs(req, cb) {
        return this.request("DeleteAttackLogs", req, cb);
    }
    async DeleteMachine(req, cb) {
        return this.request("DeleteMachine", req, cb);
    }
    async DescribeProcessTaskStatus(req, cb) {
        return this.request("DescribeProcessTaskStatus", req, cb);
    }
    async RescanImpactedHost(req, cb) {
        return this.request("RescanImpactedHost", req, cb);
    }
    async DescribeTags(req, cb) {
        return this.request("DescribeTags", req, cb);
    }
    async DescribeSecurityTrends(req, cb) {
        return this.request("DescribeSecurityTrends", req, cb);
    }
    async DescribeAttackLogInfo(req, cb) {
        return this.request("DescribeAttackLogInfo", req, cb);
    }
    async IgnoreImpactedHosts(req, cb) {
        return this.request("IgnoreImpactedHosts", req, cb);
    }
    async DescribeBashEvents(req, cb) {
        return this.request("DescribeBashEvents", req, cb);
    }
    async DescribeMachines(req, cb) {
        return this.request("DescribeMachines", req, cb);
    }
    async CreateUsualLoginPlaces(req, cb) {
        return this.request("CreateUsualLoginPlaces", req, cb);
    }
    async InquiryPriceOpenProVersionPrepaid(req, cb) {
        return this.request("InquiryPriceOpenProVersionPrepaid", req, cb);
    }
}
