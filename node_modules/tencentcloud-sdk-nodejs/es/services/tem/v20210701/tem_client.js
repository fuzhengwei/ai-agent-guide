import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tem.tencentcloudapi.com", "2021-07-01", clientConfig);
    }
    async ModifyConfigData(req, cb) {
        return this.request("ModifyConfigData", req, cb);
    }
    async DescribeApplicationsStatus(req, cb) {
        return this.request("DescribeApplicationsStatus", req, cb);
    }
    async DescribeApplicationServiceList(req, cb) {
        return this.request("DescribeApplicationServiceList", req, cb);
    }
    async DescribePagedLogConfigList(req, cb) {
        return this.request("DescribePagedLogConfigList", req, cb);
    }
    async ModifyIngress(req, cb) {
        return this.request("ModifyIngress", req, cb);
    }
    async EnableApplicationAutoscaler(req, cb) {
        return this.request("EnableApplicationAutoscaler", req, cb);
    }
    async ModifyApplicationReplicas(req, cb) {
        return this.request("ModifyApplicationReplicas", req, cb);
    }
    async CreateApplicationAutoscaler(req, cb) {
        return this.request("CreateApplicationAutoscaler", req, cb);
    }
    async RestartApplicationPod(req, cb) {
        return this.request("RestartApplicationPod", req, cb);
    }
    async ModifyLogConfig(req, cb) {
        return this.request("ModifyLogConfig", req, cb);
    }
    async DeleteApplication(req, cb) {
        return this.request("DeleteApplication", req, cb);
    }
    async DescribeEnvironmentStatus(req, cb) {
        return this.request("DescribeEnvironmentStatus", req, cb);
    }
    async ResumeDeployApplication(req, cb) {
        return this.request("ResumeDeployApplication", req, cb);
    }
    async DeleteIngress(req, cb) {
        return this.request("DeleteIngress", req, cb);
    }
    async DeployApplication(req, cb) {
        return this.request("DeployApplication", req, cb);
    }
    async ModifyApplicationAutoscaler(req, cb) {
        return this.request("ModifyApplicationAutoscaler", req, cb);
    }
    async DescribeDeployApplicationDetail(req, cb) {
        return this.request("DescribeDeployApplicationDetail", req, cb);
    }
    async ModifyApplicationService(req, cb) {
        return this.request("ModifyApplicationService", req, cb);
    }
    async ModifyGatewayIngress(req, cb) {
        return this.request("ModifyGatewayIngress", req, cb);
    }
    async ModifyEnvironment(req, cb) {
        return this.request("ModifyEnvironment", req, cb);
    }
    async DescribeEnvironment(req, cb) {
        return this.request("DescribeEnvironment", req, cb);
    }
    async DescribeLogConfig(req, cb) {
        return this.request("DescribeLogConfig", req, cb);
    }
    async StopApplication(req, cb) {
        return this.request("StopApplication", req, cb);
    }
    async CreateLogConfig(req, cb) {
        return this.request("CreateLogConfig", req, cb);
    }
    async CreateApplicationService(req, cb) {
        return this.request("CreateApplicationService", req, cb);
    }
    async DescribeApplicationInfo(req, cb) {
        return this.request("DescribeApplicationInfo", req, cb);
    }
    async CreateConfigData(req, cb) {
        return this.request("CreateConfigData", req, cb);
    }
    async DescribeApplicationPods(req, cb) {
        return this.request("DescribeApplicationPods", req, cb);
    }
    async DeleteApplicationAutoscaler(req, cb) {
        return this.request("DeleteApplicationAutoscaler", req, cb);
    }
    async ModifyApplicationInfo(req, cb) {
        return this.request("ModifyApplicationInfo", req, cb);
    }
    async DestroyConfigData(req, cb) {
        return this.request("DestroyConfigData", req, cb);
    }
    async DescribeEnvironments(req, cb) {
        return this.request("DescribeEnvironments", req, cb);
    }
    async CreateCosToken(req, cb) {
        return this.request("CreateCosToken", req, cb);
    }
    async DescribeIngress(req, cb) {
        return this.request("DescribeIngress", req, cb);
    }
    async DeleteApplicationService(req, cb) {
        return this.request("DeleteApplicationService", req, cb);
    }
    async GenerateApplicationPackageDownloadUrl(req, cb) {
        return this.request("GenerateApplicationPackageDownloadUrl", req, cb);
    }
    async CreateEnvironment(req, cb) {
        return this.request("CreateEnvironment", req, cb);
    }
    async DisableApplicationAutoscaler(req, cb) {
        return this.request("DisableApplicationAutoscaler", req, cb);
    }
    async DescribeIngresses(req, cb) {
        return this.request("DescribeIngresses", req, cb);
    }
    async CreateApplication(req, cb) {
        return this.request("CreateApplication", req, cb);
    }
    async RestartApplication(req, cb) {
        return this.request("RestartApplication", req, cb);
    }
    async RollingUpdateApplicationByVersion(req, cb) {
        return this.request("RollingUpdateApplicationByVersion", req, cb);
    }
    async DescribeApplications(req, cb) {
        return this.request("DescribeApplications", req, cb);
    }
    async RevertDeployApplication(req, cb) {
        return this.request("RevertDeployApplication", req, cb);
    }
    async DestroyLogConfig(req, cb) {
        return this.request("DestroyLogConfig", req, cb);
    }
    async DescribeRelatedIngresses(req, cb) {
        return this.request("DescribeRelatedIngresses", req, cb);
    }
    async DescribeConfigData(req, cb) {
        return this.request("DescribeConfigData", req, cb);
    }
    async CreateResource(req, cb) {
        return this.request("CreateResource", req, cb);
    }
    async DescribeApplicationAutoscalerList(req, cb) {
        return this.request("DescribeApplicationAutoscalerList", req, cb);
    }
    async DestroyEnvironment(req, cb) {
        return this.request("DestroyEnvironment", req, cb);
    }
    async DescribeConfigDataList(req, cb) {
        return this.request("DescribeConfigDataList", req, cb);
    }
}
