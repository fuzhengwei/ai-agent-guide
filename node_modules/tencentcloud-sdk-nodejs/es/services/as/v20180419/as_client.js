import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("as.tencentcloudapi.com", "2018-04-19", clientConfig);
    }
    async StopInstanceRefresh(req, cb) {
        return this.request("StopInstanceRefresh", req, cb);
    }
    async ExecuteScalingPolicy(req, cb) {
        return this.request("ExecuteScalingPolicy", req, cb);
    }
    async CreateAutoScalingGroup(req, cb) {
        return this.request("CreateAutoScalingGroup", req, cb);
    }
    async ClearLaunchConfigurationAttributes(req, cb) {
        return this.request("ClearLaunchConfigurationAttributes", req, cb);
    }
    async StartInstanceRefresh(req, cb) {
        return this.request("StartInstanceRefresh", req, cb);
    }
    async ModifyScalingPolicy(req, cb) {
        return this.request("ModifyScalingPolicy", req, cb);
    }
    async ModifyLoadBalancerTargetAttributes(req, cb) {
        return this.request("ModifyLoadBalancerTargetAttributes", req, cb);
    }
    async DescribeNotificationConfigurations(req, cb) {
        return this.request("DescribeNotificationConfigurations", req, cb);
    }
    async DeleteAutoScalingGroup(req, cb) {
        return this.request("DeleteAutoScalingGroup", req, cb);
    }
    async ScaleOutInstances(req, cb) {
        return this.request("ScaleOutInstances", req, cb);
    }
    async ExitStandby(req, cb) {
        return this.request("ExitStandby", req, cb);
    }
    async StartAutoScalingInstances(req, cb) {
        return this.request("StartAutoScalingInstances", req, cb);
    }
    async UpgradeLaunchConfiguration(req, cb) {
        return this.request("UpgradeLaunchConfiguration", req, cb);
    }
    async DescribeRefreshActivities(req, cb) {
        return this.request("DescribeRefreshActivities", req, cb);
    }
    async ModifyLifecycleHook(req, cb) {
        return this.request("ModifyLifecycleHook", req, cb);
    }
    async DetachLoadBalancers(req, cb) {
        return this.request("DetachLoadBalancers", req, cb);
    }
    async AttachInstances(req, cb) {
        return this.request("AttachInstances", req, cb);
    }
    async DescribeScalingPolicies(req, cb) {
        return this.request("DescribeScalingPolicies", req, cb);
    }
    async DeleteScheduledAction(req, cb) {
        return this.request("DeleteScheduledAction", req, cb);
    }
    async AttachLoadBalancers(req, cb) {
        return this.request("AttachLoadBalancers", req, cb);
    }
    async DetachInstances(req, cb) {
        return this.request("DetachInstances", req, cb);
    }
    async ScaleInInstances(req, cb) {
        return this.request("ScaleInInstances", req, cb);
    }
    async CreateScheduledAction(req, cb) {
        return this.request("CreateScheduledAction", req, cb);
    }
    async SetInstancesProtection(req, cb) {
        return this.request("SetInstancesProtection", req, cb);
    }
    async DescribeAutoScalingAdvices(req, cb) {
        return this.request("DescribeAutoScalingAdvices", req, cb);
    }
    async RemoveInstances(req, cb) {
        return this.request("RemoveInstances", req, cb);
    }
    async DeleteScalingPolicy(req, cb) {
        return this.request("DeleteScalingPolicy", req, cb);
    }
    async CompleteLifecycleAction(req, cb) {
        return this.request("CompleteLifecycleAction", req, cb);
    }
    async ModifyLoadBalancers(req, cb) {
        return this.request("ModifyLoadBalancers", req, cb);
    }
    async ModifyDesiredCapacity(req, cb) {
        return this.request("ModifyDesiredCapacity", req, cb);
    }
    async RollbackInstanceRefresh(req, cb) {
        return this.request("RollbackInstanceRefresh", req, cb);
    }
    async ModifyNotificationConfiguration(req, cb) {
        return this.request("ModifyNotificationConfiguration", req, cb);
    }
    async StopAutoScalingInstances(req, cb) {
        return this.request("StopAutoScalingInstances", req, cb);
    }
    async CreateLaunchConfiguration(req, cb) {
        return this.request("CreateLaunchConfiguration", req, cb);
    }
    async ModifyAutoScalingGroup(req, cb) {
        return this.request("ModifyAutoScalingGroup", req, cb);
    }
    async CreateNotificationConfiguration(req, cb) {
        return this.request("CreateNotificationConfiguration", req, cb);
    }
    async DescribeAutoScalingInstances(req, cb) {
        return this.request("DescribeAutoScalingInstances", req, cb);
    }
    async CreateAutoScalingGroupFromInstance(req, cb) {
        return this.request("CreateAutoScalingGroupFromInstance", req, cb);
    }
    async CreateLifecycleHook(req, cb) {
        return this.request("CreateLifecycleHook", req, cb);
    }
    async UpgradeLifecycleHook(req, cb) {
        return this.request("UpgradeLifecycleHook", req, cb);
    }
    async DisableAutoScalingGroup(req, cb) {
        return this.request("DisableAutoScalingGroup", req, cb);
    }
    async DescribeLaunchConfigurations(req, cb) {
        return this.request("DescribeLaunchConfigurations", req, cb);
    }
    async EnterStandby(req, cb) {
        return this.request("EnterStandby", req, cb);
    }
    async CreateScalingPolicy(req, cb) {
        return this.request("CreateScalingPolicy", req, cb);
    }
    async DeleteLaunchConfiguration(req, cb) {
        return this.request("DeleteLaunchConfiguration", req, cb);
    }
    async DeleteLifecycleHook(req, cb) {
        return this.request("DeleteLifecycleHook", req, cb);
    }
    async DescribeAutoScalingGroupLastActivities(req, cb) {
        return this.request("DescribeAutoScalingGroupLastActivities", req, cb);
    }
    async DescribeLifecycleHooks(req, cb) {
        return this.request("DescribeLifecycleHooks", req, cb);
    }
    async EnableAutoScalingGroup(req, cb) {
        return this.request("EnableAutoScalingGroup", req, cb);
    }
    async DescribeScheduledActions(req, cb) {
        return this.request("DescribeScheduledActions", req, cb);
    }
    async DescribeAutoScalingGroups(req, cb) {
        return this.request("DescribeAutoScalingGroups", req, cb);
    }
    async ModifyScheduledAction(req, cb) {
        return this.request("ModifyScheduledAction", req, cb);
    }
    async DescribeAutoScalingActivities(req, cb) {
        return this.request("DescribeAutoScalingActivities", req, cb);
    }
    async DeleteNotificationConfiguration(req, cb) {
        return this.request("DeleteNotificationConfiguration", req, cb);
    }
    async ResumeInstanceRefresh(req, cb) {
        return this.request("ResumeInstanceRefresh", req, cb);
    }
    async CancelInstanceRefresh(req, cb) {
        return this.request("CancelInstanceRefresh", req, cb);
    }
    async DescribeAccountLimits(req, cb) {
        return this.request("DescribeAccountLimits", req, cb);
    }
    async ModifyLaunchConfigurationAttributes(req, cb) {
        return this.request("ModifyLaunchConfigurationAttributes", req, cb);
    }
}
