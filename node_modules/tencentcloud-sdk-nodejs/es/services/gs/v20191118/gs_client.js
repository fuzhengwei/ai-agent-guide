import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("gs.tencentcloudapi.com", "2019-11-18", clientConfig);
    }
    async BackUpAndroidInstanceToStorage(req, cb) {
        return this.request("BackUpAndroidInstanceToStorage", req, cb);
    }
    async ModifyAndroidInstancesUserId(req, cb) {
        return this.request("ModifyAndroidInstancesUserId", req, cb);
    }
    async TrylockWorker(req, cb) {
        return this.request("TrylockWorker", req, cb);
    }
    async ModifyAndroidInstancesProperties(req, cb) {
        return this.request("ModifyAndroidInstancesProperties", req, cb);
    }
    async StopAndroidInstances(req, cb) {
        return this.request("StopAndroidInstances", req, cb);
    }
    async SyncExecuteCommandOnAndroidInstances(req, cb) {
        return this.request("SyncExecuteCommandOnAndroidInstances", req, cb);
    }
    async DisableAndroidInstancesApp(req, cb) {
        return this.request("DisableAndroidInstancesApp", req, cb);
    }
    async UploadFileToAndroidInstances(req, cb) {
        return this.request("UploadFileToAndroidInstances", req, cb);
    }
    async RestoreAndroidInstanceFromStorage(req, cb) {
        return this.request("RestoreAndroidInstanceFromStorage", req, cb);
    }
    async CleanAndroidInstancesAppData(req, cb) {
        return this.request("CleanAndroidInstancesAppData", req, cb);
    }
    async CreateAndroidInstanceSSH(req, cb) {
        return this.request("CreateAndroidInstanceSSH", req, cb);
    }
    async CreateAndroidInstancesScreenshot(req, cb) {
        return this.request("CreateAndroidInstancesScreenshot", req, cb);
    }
    async UninstallAndroidInstancesApp(req, cb) {
        return this.request("UninstallAndroidInstancesApp", req, cb);
    }
    async CreateAndroidInstanceImage(req, cb) {
        return this.request("CreateAndroidInstanceImage", req, cb);
    }
    async EnableAndroidInstancesApp(req, cb) {
        return this.request("EnableAndroidInstancesApp", req, cb);
    }
    async StartPublishStreamToCSS(req, cb) {
        return this.request("StartPublishStreamToCSS", req, cb);
    }
    async DeleteAndroidInstanceBackups(req, cb) {
        return this.request("DeleteAndroidInstanceBackups", req, cb);
    }
    async ModifyAndroidInstanceInformation(req, cb) {
        return this.request("ModifyAndroidInstanceInformation", req, cb);
    }
    async DeleteAndroidInstanceImages(req, cb) {
        return this.request("DeleteAndroidInstanceImages", req, cb);
    }
    async ModifyAndroidInstancesInformation(req, cb) {
        return this.request("ModifyAndroidInstancesInformation", req, cb);
    }
    async ModifyAndroidInstancesAppBlacklist(req, cb) {
        return this.request("ModifyAndroidInstancesAppBlacklist", req, cb);
    }
    async InstallAndroidInstancesAppWithURL(req, cb) {
        return this.request("InstallAndroidInstancesAppWithURL", req, cb);
    }
    async RestoreAndroidInstance(req, cb) {
        return this.request("RestoreAndroidInstance", req, cb);
    }
    async DescribeAndroidInstanceLabels(req, cb) {
        return this.request("DescribeAndroidInstanceLabels", req, cb);
    }
    async DescribeAndroidInstanceImages(req, cb) {
        return this.request("DescribeAndroidInstanceImages", req, cb);
    }
    async RenewAndroidInstancesAccessToken(req, cb) {
        return this.request("RenewAndroidInstancesAccessToken", req, cb);
    }
    async StartAndroidInstancesApp(req, cb) {
        return this.request("StartAndroidInstancesApp", req, cb);
    }
    async RestartAndroidInstancesApp(req, cb) {
        return this.request("RestartAndroidInstancesApp", req, cb);
    }
    async ModifyAndroidInstancesResolution(req, cb) {
        return this.request("ModifyAndroidInstancesResolution", req, cb);
    }
    async DescribeAndroidInstanceBackups(req, cb) {
        return this.request("DescribeAndroidInstanceBackups", req, cb);
    }
    async DeleteAndroidInstanceLabel(req, cb) {
        return this.request("DeleteAndroidInstanceLabel", req, cb);
    }
    async DistributeAndroidInstanceImageToHosts(req, cb) {
        return this.request("DistributeAndroidInstanceImageToHosts", req, cb);
    }
    async CreateAndroidInstanceLabel(req, cb) {
        return this.request("CreateAndroidInstanceLabel", req, cb);
    }
    async CreateAndroidInstanceAcceleratorToken(req, cb) {
        return this.request("CreateAndroidInstanceAcceleratorToken", req, cb);
    }
    async CreateAndroidApp(req, cb) {
        return this.request("CreateAndroidApp", req, cb);
    }
    async ModifyAndroidInstancesResources(req, cb) {
        return this.request("ModifyAndroidInstancesResources", req, cb);
    }
    async CreateAndroidInstanceWebShell(req, cb) {
        return this.request("CreateAndroidInstanceWebShell", req, cb);
    }
    async StopAndroidInstancesApp(req, cb) {
        return this.request("StopAndroidInstancesApp", req, cb);
    }
    async StartPublishStream(req, cb) {
        return this.request("StartPublishStream", req, cb);
    }
    async DescribeAndroidInstances(req, cb) {
        return this.request("DescribeAndroidInstances", req, cb);
    }
    async UploadFilesToAndroidInstances(req, cb) {
        return this.request("UploadFilesToAndroidInstances", req, cb);
    }
    async SyncAndroidInstanceImage(req, cb) {
        return this.request("SyncAndroidInstanceImage", req, cb);
    }
    async DistributePhotoToAndroidInstances(req, cb) {
        return this.request("DistributePhotoToAndroidInstances", req, cb);
    }
    async DescribeAndroidInstancesAppBlacklist(req, cb) {
        return this.request("DescribeAndroidInstancesAppBlacklist", req, cb);
    }
    async DisconnectAndroidInstanceAccelerator(req, cb) {
        return this.request("DisconnectAndroidInstanceAccelerator", req, cb);
    }
    async DescribeInstancesCount(req, cb) {
        return this.request("DescribeInstancesCount", req, cb);
    }
    async CreateAndroidInstances(req, cb) {
        return this.request("CreateAndroidInstances", req, cb);
    }
    async CreateCosCredential(req, cb) {
        return this.request("CreateCosCredential", req, cb);
    }
    async BackUpAndroidInstance(req, cb) {
        return this.request("BackUpAndroidInstance", req, cb);
    }
    async ModifyAndroidApp(req, cb) {
        return this.request("ModifyAndroidApp", req, cb);
    }
    async StartAndroidInstances(req, cb) {
        return this.request("StartAndroidInstances", req, cb);
    }
    async ModifyAndroidInstanceResolution(req, cb) {
        return this.request("ModifyAndroidInstanceResolution", req, cb);
    }
    async ConnectAndroidInstance(req, cb) {
        return this.request("ConnectAndroidInstance", req, cb);
    }
    async StopPublishStream(req, cb) {
        return this.request("StopPublishStream", req, cb);
    }
    async DisconnectAndroidInstance(req, cb) {
        return this.request("DisconnectAndroidInstance", req, cb);
    }
    async DescribeAndroidInstanceApps(req, cb) {
        return this.request("DescribeAndroidInstanceApps", req, cb);
    }
    async SwitchGameArchive(req, cb) {
        return this.request("SwitchGameArchive", req, cb);
    }
    async DistributeFileToAndroidInstances(req, cb) {
        return this.request("DistributeFileToAndroidInstances", req, cb);
    }
    async RebootAndroidInstanceHosts(req, cb) {
        return this.request("RebootAndroidInstanceHosts", req, cb);
    }
    async CreateSession(req, cb) {
        return this.request("CreateSession", req, cb);
    }
    async DeleteAndroidAppVersion(req, cb) {
        return this.request("DeleteAndroidAppVersion", req, cb);
    }
    async ResetAndroidInstances(req, cb) {
        return this.request("ResetAndroidInstances", req, cb);
    }
    async InstallAndroidInstancesApp(req, cb) {
        return this.request("InstallAndroidInstancesApp", req, cb);
    }
    async SetAndroidInstancesFGAppKeepAlive(req, cb) {
        return this.request("SetAndroidInstancesFGAppKeepAlive", req, cb);
    }
    async DescribeAndroidApps(req, cb) {
        return this.request("DescribeAndroidApps", req, cb);
    }
    async CreateAndroidInstancesAccessToken(req, cb) {
        return this.request("CreateAndroidInstancesAccessToken", req, cb);
    }
    async CopyAndroidInstance(req, cb) {
        return this.request("CopyAndroidInstance", req, cb);
    }
    async CreateAndroidAppVersion(req, cb) {
        return this.request("CreateAndroidAppVersion", req, cb);
    }
    async DestroyAndroidInstances(req, cb) {
        return this.request("DestroyAndroidInstances", req, cb);
    }
    async DeleteAndroidApp(req, cb) {
        return this.request("DeleteAndroidApp", req, cb);
    }
    async CreateAndroidInstanceADB(req, cb) {
        return this.request("CreateAndroidInstanceADB", req, cb);
    }
    async SetAndroidInstancesBGAppKeepAlive(req, cb) {
        return this.request("SetAndroidInstancesBGAppKeepAlive", req, cb);
    }
    async StopGame(req, cb) {
        return this.request("StopGame", req, cb);
    }
    async FetchAndroidInstancesLogs(req, cb) {
        return this.request("FetchAndroidInstancesLogs", req, cb);
    }
    async ExecuteCommandOnAndroidInstances(req, cb) {
        return this.request("ExecuteCommandOnAndroidInstances", req, cb);
    }
    async RebootAndroidInstances(req, cb) {
        return this.request("RebootAndroidInstances", req, cb);
    }
    async ImportAndroidInstanceImage(req, cb) {
        return this.request("ImportAndroidInstanceImage", req, cb);
    }
    async DescribeAndroidInstancesByApps(req, cb) {
        return this.request("DescribeAndroidInstancesByApps", req, cb);
    }
    async DeleteAndroidInstanceBackupFiles(req, cb) {
        return this.request("DeleteAndroidInstanceBackupFiles", req, cb);
    }
    async ModifyAndroidAppVersion(req, cb) {
        return this.request("ModifyAndroidAppVersion", req, cb);
    }
    async ModifyAndroidInstancesLabels(req, cb) {
        return this.request("ModifyAndroidInstancesLabels", req, cb);
    }
    async SaveGameArchive(req, cb) {
        return this.request("SaveGameArchive", req, cb);
    }
    async DescribeAndroidInstanceTasksStatus(req, cb) {
        return this.request("DescribeAndroidInstanceTasksStatus", req, cb);
    }
}
