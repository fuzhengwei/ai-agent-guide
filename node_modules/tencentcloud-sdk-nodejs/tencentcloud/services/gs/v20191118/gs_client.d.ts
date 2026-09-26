import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeAndroidInstanceTasksStatusResponse, ExecuteCommandOnAndroidInstancesResponse, ResetAndroidInstancesResponse, StartPublishStreamToCSSResponse, CreateAndroidInstanceADBRequest, FetchAndroidInstancesLogsResponse, RestoreAndroidInstanceFromStorageRequest, InstallAndroidInstancesAppWithURLResponse, SyncExecuteCommandOnAndroidInstancesRequest, RebootAndroidInstanceHostsResponse, SetAndroidInstancesBGAppKeepAliveResponse, UninstallAndroidInstancesAppResponse, StopAndroidInstancesAppResponse, ModifyAndroidAppVersionResponse, RestartAndroidInstancesAppRequest, CleanAndroidInstancesAppDataResponse, DeleteAndroidAppResponse, DescribeAndroidInstanceLabelsResponse, DescribeAndroidInstancesAppBlacklistResponse, ModifyAndroidAppRequest, DeleteAndroidInstanceBackupsResponse, DescribeAndroidAppsResponse, StopAndroidInstancesAppRequest, CreateAndroidAppVersionRequest, CreateAndroidInstanceAcceleratorTokenResponse, ModifyAndroidInstancesResourcesRequest, ModifyAndroidInstancesLabelsRequest, BackUpAndroidInstanceToStorageRequest, ModifyAndroidInstancesPropertiesRequest, RestoreAndroidInstanceResponse, DisconnectAndroidInstanceRequest, DeleteAndroidInstanceImagesResponse, CreateAndroidAppRequest, StartPublishStreamRequest, CreateSessionRequest, CreateAndroidInstanceImageResponse, ModifyAndroidInstanceResolutionResponse, DeleteAndroidInstanceImagesRequest, DescribeAndroidInstanceAppsResponse, CreateAndroidInstanceWebShellRequest, ResetAndroidInstancesRequest, UploadFileToAndroidInstancesRequest, DisconnectAndroidInstanceAcceleratorResponse, CleanAndroidInstancesAppDataRequest, DisableAndroidInstancesAppRequest, DisconnectAndroidInstanceResponse, EnableAndroidInstancesAppResponse, ConnectAndroidInstanceRequest, CopyAndroidInstanceRequest, SyncExecuteCommandOnAndroidInstancesResponse, StartAndroidInstancesResponse, DescribeAndroidInstanceBackupsResponse, DistributeFileToAndroidInstancesResponse, SaveGameArchiveResponse, ModifyAndroidAppVersionRequest, ModifyAndroidInstancesResourcesResponse, ModifyAndroidInstancesAppBlacklistResponse, UploadFilesToAndroidInstancesRequest, StartAndroidInstancesAppRequest, ModifyAndroidInstancesResolutionResponse, DeleteAndroidAppVersionResponse, DistributePhotoToAndroidInstancesResponse, ModifyAndroidInstancesUserIdRequest, InstallAndroidInstancesAppWithURLRequest, StartAndroidInstancesRequest, RebootAndroidInstancesResponse, StopPublishStreamResponse, ImportAndroidInstanceImageResponse, DeleteAndroidInstanceLabelRequest, DescribeAndroidInstanceBackupsRequest, ModifyAndroidInstancesUserIdResponse, InstallAndroidInstancesAppRequest, SyncAndroidInstanceImageResponse, DestroyAndroidInstancesRequest, CreateAndroidInstanceWebShellResponse, DescribeAndroidInstanceImagesResponse, ModifyAndroidInstanceInformationRequest, BackUpAndroidInstanceRequest, StopPublishStreamRequest, DistributeAndroidInstanceImageToHostsResponse, ModifyAndroidInstancesAppBlacklistRequest, ModifyAndroidInstancesInformationRequest, RestartAndroidInstancesAppResponse, RestoreAndroidInstanceRequest, DescribeAndroidInstancesByAppsResponse, DescribeAndroidInstanceTasksStatusRequest, DeleteAndroidInstanceBackupsRequest, CreateAndroidInstancesScreenshotResponse, DescribeInstancesCountResponse, ExecuteCommandOnAndroidInstancesRequest, ModifyAndroidInstanceInformationResponse, BackUpAndroidInstanceResponse, DestroyAndroidInstancesResponse, SaveGameArchiveRequest, SwitchGameArchiveResponse, CreateAndroidInstancesScreenshotRequest, CreateCosCredentialRequest, InstallAndroidInstancesAppResponse, DistributeAndroidInstanceImageToHostsRequest, DeleteAndroidInstanceBackupFilesRequest, ConnectAndroidInstanceResponse, RestoreAndroidInstanceFromStorageResponse, DescribeAndroidInstancesRequest, DescribeAndroidInstancesResponse, SyncAndroidInstanceImageRequest, ModifyAndroidInstanceResolutionRequest, DeleteAndroidAppVersionRequest, StartAndroidInstancesAppResponse, SwitchGameArchiveRequest, CreateAndroidInstanceADBResponse, StopAndroidInstancesRequest, StartPublishStreamToCSSRequest, CreateAndroidInstancesAccessTokenRequest, CreateSessionResponse, DistributeFileToAndroidInstancesRequest, EnableAndroidInstancesAppRequest, CreateAndroidInstanceAcceleratorTokenRequest, ModifyAndroidInstancesResolutionRequest, DescribeAndroidAppsRequest, StopGameRequest, DescribeAndroidInstancesByAppsRequest, TrylockWorkerResponse, DescribeAndroidInstancesAppBlacklistRequest, CreateAndroidInstancesAccessTokenResponse, ModifyAndroidInstancesLabelsResponse, RenewAndroidInstancesAccessTokenRequest, DescribeAndroidInstanceLabelsRequest, CopyAndroidInstanceResponse, SetAndroidInstancesFGAppKeepAliveRequest, DeleteAndroidInstanceLabelResponse, ModifyAndroidAppResponse, DistributePhotoToAndroidInstancesRequest, SetAndroidInstancesFGAppKeepAliveResponse, DescribeAndroidInstanceImagesRequest, ImportAndroidInstanceImageRequest, UninstallAndroidInstancesAppRequest, DisableAndroidInstancesAppResponse, CreateAndroidInstancesResponse, SetAndroidInstancesBGAppKeepAliveRequest, StopGameResponse, CreateAndroidInstanceLabelRequest, RebootAndroidInstanceHostsRequest, ModifyAndroidInstancesPropertiesResponse, CreateAndroidInstanceSSHResponse, ModifyAndroidInstancesInformationResponse, RenewAndroidInstancesAccessTokenResponse, CreateCosCredentialResponse, UploadFileToAndroidInstancesResponse, CreateAndroidInstancesRequest, CreateAndroidInstanceLabelResponse, StartPublishStreamResponse, DescribeAndroidInstanceAppsRequest, DescribeInstancesCountRequest, TrylockWorkerRequest, UploadFilesToAndroidInstancesResponse, RebootAndroidInstancesRequest, DeleteAndroidAppRequest, DisconnectAndroidInstanceAcceleratorRequest, CreateAndroidAppVersionResponse, FetchAndroidInstancesLogsRequest, DeleteAndroidInstanceBackupFilesResponse, BackUpAndroidInstanceToStorageResponse, CreateAndroidInstanceSSHRequest, CreateAndroidAppResponse, StopAndroidInstancesResponse, CreateAndroidInstanceImageRequest } from "./gs_models";
/**
 * gs client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 备份云手机数据到指定存储，支持 COS 和兼容 AWS S3 协议的对象存储服务。如果是备份到 COS 时，会使用公网流量，授权 COS bucket 请在控制台中操作。
     */
    BackUpAndroidInstanceToStorage(req: BackUpAndroidInstanceToStorageRequest, cb?: (error: string, rep: BackUpAndroidInstanceToStorageResponse) => void): Promise<BackUpAndroidInstanceToStorageResponse>;
    /**
     * 批量修改安卓实例的用户ID
     */
    ModifyAndroidInstancesUserId(req: ModifyAndroidInstancesUserIdRequest, cb?: (error: string, rep: ModifyAndroidInstancesUserIdResponse) => void): Promise<ModifyAndroidInstancesUserIdResponse>;
    /**
     * 尝试锁定机器
     */
    TrylockWorker(req: TrylockWorkerRequest, cb?: (error: string, rep: TrylockWorkerResponse) => void): Promise<TrylockWorkerResponse>;
    /**
     * 批量修改安卓实例属性
     */
    ModifyAndroidInstancesProperties(req: ModifyAndroidInstancesPropertiesRequest, cb?: (error: string, rep: ModifyAndroidInstancesPropertiesResponse) => void): Promise<ModifyAndroidInstancesPropertiesResponse>;
    /**
     * 关机安卓实例
     */
    StopAndroidInstances(req: StopAndroidInstancesRequest, cb?: (error: string, rep: StopAndroidInstancesResponse) => void): Promise<StopAndroidInstancesResponse>;
    /**
     * 在安卓实例上同步执行命令，仅支持1秒内可以返回结果的命令，例如：ls、cd。同时执行的实例数量不能过多，否则可能云api返回超时。不支持超过1秒无法返回或无法自主结束的命令，例如：top、vim，执行结果最大1KB
     */
    SyncExecuteCommandOnAndroidInstances(req: SyncExecuteCommandOnAndroidInstancesRequest, cb?: (error: string, rep: SyncExecuteCommandOnAndroidInstancesResponse) => void): Promise<SyncExecuteCommandOnAndroidInstancesResponse>;
    /**
     * 批量禁用安卓实例应用
     */
    DisableAndroidInstancesApp(req: DisableAndroidInstancesAppRequest, cb?: (error: string, rep: DisableAndroidInstancesAppResponse) => void): Promise<DisableAndroidInstancesAppResponse>;
    /**
     * 将文件下载到指定实例列表的实例上，每个实例都会从公网下载文件。如果您需要将同一个文件分发到多个实例，建议使用 DistributeFileToAndroidInstances 接口减少公网下载的流量。如果您需要将不同的文件下载到不同的实例，可考虑使用 UploadFilesToAndroidInstances 接口批量将不同文件下载到不同的实例。
     */
    UploadFileToAndroidInstances(req: UploadFileToAndroidInstancesRequest, cb?: (error: string, rep: UploadFileToAndroidInstancesResponse) => void): Promise<UploadFileToAndroidInstancesResponse>;
    /**
     * 使用指定存储数据还原云手机，支持 COS 和兼容 AWS S3 协议的对象存储服务。如果还原数据来自 COS 时，会使用公网流量，授权 COS bucket 请在控制台中操作。
     */
    RestoreAndroidInstanceFromStorage(req: RestoreAndroidInstanceFromStorageRequest, cb?: (error: string, rep: RestoreAndroidInstanceFromStorageResponse) => void): Promise<RestoreAndroidInstanceFromStorageResponse>;
    /**
     * 批量清理安卓实例应用数据
     */
    CleanAndroidInstancesAppData(req: CleanAndroidInstancesAppDataRequest, cb?: (error: string, rep: CleanAndroidInstancesAppDataResponse) => void): Promise<CleanAndroidInstancesAppDataResponse>;
    /**
     * 创建安卓实例 SSH 连接信息，请将返回结果的 PrivateKey 字段保存为 pem 文件，并将 pem 文件权限设置为 600，再参考返回结果的 ConnectCommand 使用 ssh 连接实例。
     */
    CreateAndroidInstanceSSH(req: CreateAndroidInstanceSSHRequest, cb?: (error: string, rep: CreateAndroidInstanceSSHResponse) => void): Promise<CreateAndroidInstanceSSHResponse>;
    /**
     * 安卓实例截图
     */
    CreateAndroidInstancesScreenshot(req: CreateAndroidInstancesScreenshotRequest, cb?: (error: string, rep: CreateAndroidInstancesScreenshotResponse) => void): Promise<CreateAndroidInstancesScreenshotResponse>;
    /**
     * 卸载安卓实例应用
     */
    UninstallAndroidInstancesApp(req: UninstallAndroidInstancesAppRequest, cb?: (error: string, rep: UninstallAndroidInstancesAppResponse) => void): Promise<UninstallAndroidInstancesAppResponse>;
    /**
     * 使用指定的安卓实例创建镜像，创建镜像时指定的实例会关机，镜像创建完成后实例会自动开机。当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像创建完成处于可用状态。
     */
    CreateAndroidInstanceImage(req: CreateAndroidInstanceImageRequest, cb?: (error: string, rep: CreateAndroidInstanceImageResponse) => void): Promise<CreateAndroidInstanceImageResponse>;
    /**
     * 批量启用安卓实例应用
     */
    EnableAndroidInstancesApp(req: EnableAndroidInstancesAppRequest, cb?: (error: string, rep: EnableAndroidInstancesAppResponse) => void): Promise<EnableAndroidInstancesAppResponse>;
    /**
     * 开始云端推流
     */
    StartPublishStreamToCSS(req: StartPublishStreamToCSSRequest, cb?: (error: string, rep: StartPublishStreamToCSSResponse) => void): Promise<StartPublishStreamToCSSResponse>;
    /**
     * 批量删除安卓实例备份
     */
    DeleteAndroidInstanceBackups(req: DeleteAndroidInstanceBackupsRequest, cb?: (error: string, rep: DeleteAndroidInstanceBackupsResponse) => void): Promise<DeleteAndroidInstanceBackupsResponse>;
    /**
     * 修改安卓实例的信息
     */
    ModifyAndroidInstanceInformation(req: ModifyAndroidInstanceInformationRequest, cb?: (error: string, rep: ModifyAndroidInstanceInformationResponse) => void): Promise<ModifyAndroidInstanceInformationResponse>;
    /**
     * 删除安卓实例镜像
     */
    DeleteAndroidInstanceImages(req: DeleteAndroidInstanceImagesRequest, cb?: (error: string, rep: DeleteAndroidInstanceImagesResponse) => void): Promise<DeleteAndroidInstanceImagesResponse>;
    /**
     * 批量修改安卓实例信息
     */
    ModifyAndroidInstancesInformation(req: ModifyAndroidInstancesInformationRequest, cb?: (error: string, rep: ModifyAndroidInstancesInformationResponse) => void): Promise<ModifyAndroidInstancesInformationResponse>;
    /**
     * 修改安卓实例应用黑名单
     */
    ModifyAndroidInstancesAppBlacklist(req: ModifyAndroidInstancesAppBlacklistRequest, cb?: (error: string, rep: ModifyAndroidInstancesAppBlacklistResponse) => void): Promise<ModifyAndroidInstancesAppBlacklistResponse>;
    /**
     * 通过 URL 安装安卓实例应用
     */
    InstallAndroidInstancesAppWithURL(req: InstallAndroidInstancesAppWithURLRequest, cb?: (error: string, rep: InstallAndroidInstancesAppWithURLResponse) => void): Promise<InstallAndroidInstancesAppWithURLResponse>;
    /**
     * 还原安卓实例。该接口需要联系我们开通内网存储才能使用。
     */
    RestoreAndroidInstance(req: RestoreAndroidInstanceRequest, cb?: (error: string, rep: RestoreAndroidInstanceResponse) => void): Promise<RestoreAndroidInstanceResponse>;
    /**
     * 查询安卓实例标签
     */
    DescribeAndroidInstanceLabels(req: DescribeAndroidInstanceLabelsRequest, cb?: (error: string, rep: DescribeAndroidInstanceLabelsResponse) => void): Promise<DescribeAndroidInstanceLabelsResponse>;
    /**
     * 查询安卓实例镜像信息，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像处于可用状态。
     */
    DescribeAndroidInstanceImages(req: DescribeAndroidInstanceImagesRequest, cb?: (error: string, rep: DescribeAndroidInstanceImagesResponse) => void): Promise<DescribeAndroidInstanceImagesResponse>;
    /**
     * 续期安卓实例访问Token
     */
    RenewAndroidInstancesAccessToken(req: RenewAndroidInstancesAccessTokenRequest, cb?: (error: string, rep: RenewAndroidInstancesAccessTokenResponse) => void): Promise<RenewAndroidInstancesAccessTokenResponse>;
    /**
     * 启动安卓实例应用
     */
    StartAndroidInstancesApp(req: StartAndroidInstancesAppRequest, cb?: (error: string, rep: StartAndroidInstancesAppResponse) => void): Promise<StartAndroidInstancesAppResponse>;
    /**
     * 重启安卓实例应用
     */
    RestartAndroidInstancesApp(req: RestartAndroidInstancesAppRequest, cb?: (error: string, rep: RestartAndroidInstancesAppResponse) => void): Promise<RestartAndroidInstancesAppResponse>;
    /**
     * 修改安卓实例分辨率。需要注意的是该接口需要重启才能生效。
     */
    ModifyAndroidInstancesResolution(req: ModifyAndroidInstancesResolutionRequest, cb?: (error: string, rep: ModifyAndroidInstancesResolutionResponse) => void): Promise<ModifyAndroidInstancesResolutionResponse>;
    /**
     * 查询安卓实例备份列表
     */
    DescribeAndroidInstanceBackups(req: DescribeAndroidInstanceBackupsRequest, cb?: (error: string, rep: DescribeAndroidInstanceBackupsResponse) => void): Promise<DescribeAndroidInstanceBackupsResponse>;
    /**
     * 删除安卓实例标签
     */
    DeleteAndroidInstanceLabel(req: DeleteAndroidInstanceLabelRequest, cb?: (error: string, rep: DeleteAndroidInstanceLabelResponse) => void): Promise<DeleteAndroidInstanceLabelResponse>;
    /**
     * 分发安卓实例镜像至宿主机
     */
    DistributeAndroidInstanceImageToHosts(req: DistributeAndroidInstanceImageToHostsRequest, cb?: (error: string, rep: DistributeAndroidInstanceImageToHostsResponse) => void): Promise<DistributeAndroidInstanceImageToHostsResponse>;
    /**
     * 创建安卓实例标签
     */
    CreateAndroidInstanceLabel(req: CreateAndroidInstanceLabelRequest, cb?: (error: string, rep: CreateAndroidInstanceLabelResponse) => void): Promise<CreateAndroidInstanceLabelResponse>;
    /**
     * 创建安卓实例加速Token
     */
    CreateAndroidInstanceAcceleratorToken(req: CreateAndroidInstanceAcceleratorTokenRequest, cb?: (error: string, rep: CreateAndroidInstanceAcceleratorTokenResponse) => void): Promise<CreateAndroidInstanceAcceleratorTokenResponse>;
    /**
     * 创建安卓应用
     */
    CreateAndroidApp(req: CreateAndroidAppRequest, cb?: (error: string, rep: CreateAndroidAppResponse) => void): Promise<CreateAndroidAppResponse>;
    /**
     * 批量修改安卓实例资源限制
     */
    ModifyAndroidInstancesResources(req: ModifyAndroidInstancesResourcesRequest, cb?: (error: string, rep: ModifyAndroidInstancesResourcesResponse) => void): Promise<ModifyAndroidInstancesResourcesResponse>;
    /**
     * 创建安卓实例 WebShell 连接信息，返回的 ConnectUrl 可通过浏览器直接打开访问，链接有效期 1 小时，链接打开后可持续使用。
     */
    CreateAndroidInstanceWebShell(req: CreateAndroidInstanceWebShellRequest, cb?: (error: string, rep: CreateAndroidInstanceWebShellResponse) => void): Promise<CreateAndroidInstanceWebShellResponse>;
    /**
     * 停止安卓实例应用
     */
    StopAndroidInstancesApp(req: StopAndroidInstancesAppRequest, cb?: (error: string, rep: StopAndroidInstancesAppResponse) => void): Promise<StopAndroidInstancesAppResponse>;
    /**
     * 开始云端推流
     */
    StartPublishStream(req: StartPublishStreamRequest, cb?: (error: string, rep: StartPublishStreamResponse) => void): Promise<StartPublishStreamResponse>;
    /**
     * 查询安卓实例
     */
    DescribeAndroidInstances(req: DescribeAndroidInstancesRequest, cb?: (error: string, rep: DescribeAndroidInstancesResponse) => void): Promise<DescribeAndroidInstancesResponse>;
    /**
     * 批量将不同的文件下载到不同的实例，每个实例下载文件都是从公网下载，建议只用在文件下载使用一次的场景。如果您需要将同一个文件分发到不同实例，建议使用 DistributeFileToAndroidInstances 接口。
     */
    UploadFilesToAndroidInstances(req: UploadFilesToAndroidInstancesRequest, cb?: (error: string, rep: UploadFilesToAndroidInstancesResponse) => void): Promise<UploadFilesToAndroidInstancesResponse>;
    /**
     * 同步安卓实例镜像到其他区域，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像已经同步完成处于可用状态。
     */
    SyncAndroidInstanceImage(req: SyncAndroidInstanceImageRequest, cb?: (error: string, rep: SyncAndroidInstanceImageResponse) => void): Promise<SyncAndroidInstanceImageResponse>;
    /**
     * 将一张照片批量分发到多个实例的相册中，一次接口调用触发一次照片分发，一次照片分发只会从公网下载一次，然后照片会走内网分发到实例列表中的实例。
     */
    DistributePhotoToAndroidInstances(req: DistributePhotoToAndroidInstancesRequest, cb?: (error: string, rep: DistributePhotoToAndroidInstancesResponse) => void): Promise<DistributePhotoToAndroidInstancesResponse>;
    /**
     * 查询安卓实例黑名单
     */
    DescribeAndroidInstancesAppBlacklist(req: DescribeAndroidInstancesAppBlacklistRequest, cb?: (error: string, rep: DescribeAndroidInstancesAppBlacklistResponse) => void): Promise<DescribeAndroidInstancesAppBlacklistResponse>;
    /**
     * 断开安卓实例加速节点
     */
    DisconnectAndroidInstanceAccelerator(req: DisconnectAndroidInstanceAcceleratorRequest, cb?: (error: string, rep: DisconnectAndroidInstanceAcceleratorResponse) => void): Promise<DisconnectAndroidInstanceAcceleratorResponse>;
    /**
     * 获取并发总数和运行数
     */
    DescribeInstancesCount(req: DescribeInstancesCountRequest, cb?: (error: string, rep: DescribeInstancesCountResponse) => void): Promise<DescribeInstancesCountResponse>;
    /**
     * 创建安卓实例
     */
    CreateAndroidInstances(req: CreateAndroidInstancesRequest, cb?: (error: string, rep: CreateAndroidInstancesResponse) => void): Promise<CreateAndroidInstancesResponse>;
    /**
     * 用于创建 Cos 临时密钥
     */
    CreateCosCredential(req: CreateCosCredentialRequest, cb?: (error: string, rep: CreateCosCredentialResponse) => void): Promise<CreateCosCredentialResponse>;
    /**
     * 备份安卓实例。该接口需要联系我们开通内网存储才能使用。
     */
    BackUpAndroidInstance(req: BackUpAndroidInstanceRequest, cb?: (error: string, rep: BackUpAndroidInstanceResponse) => void): Promise<BackUpAndroidInstanceResponse>;
    /**
     * 修改安卓应用信息
     */
    ModifyAndroidApp(req: ModifyAndroidAppRequest, cb?: (error: string, rep: ModifyAndroidAppResponse) => void): Promise<ModifyAndroidAppResponse>;
    /**
     * 开机安卓实例
     */
    StartAndroidInstances(req: StartAndroidInstancesRequest, cb?: (error: string, rep: StartAndroidInstancesResponse) => void): Promise<StartAndroidInstancesResponse>;
    /**
     * 修改安卓实例分辨率。需要注意的是该接口可能导致正在运行的应用出现闪退，所以建议在实例维护时期才进行调用。
     */
    ModifyAndroidInstanceResolution(req: ModifyAndroidInstanceResolutionRequest, cb?: (error: string, rep: ModifyAndroidInstanceResolutionResponse) => void): Promise<ModifyAndroidInstanceResolutionResponse>;
    /**
     * 连接安卓实例
     */
    ConnectAndroidInstance(req: ConnectAndroidInstanceRequest, cb?: (error: string, rep: ConnectAndroidInstanceResponse) => void): Promise<ConnectAndroidInstanceResponse>;
    /**
     * 停止云端推流
     */
    StopPublishStream(req: StopPublishStreamRequest, cb?: (error: string, rep: StopPublishStreamResponse) => void): Promise<StopPublishStreamResponse>;
    /**
     * 断开安卓实例
     */
    DisconnectAndroidInstance(req: DisconnectAndroidInstanceRequest, cb?: (error: string, rep: DisconnectAndroidInstanceResponse) => void): Promise<DisconnectAndroidInstanceResponse>;
    /**
     * 查询安卓实例应用
     */
    DescribeAndroidInstanceApps(req: DescribeAndroidInstanceAppsRequest, cb?: (error: string, rep: DescribeAndroidInstanceAppsResponse) => void): Promise<DescribeAndroidInstanceAppsResponse>;
    /**
     * 切换游戏存档
     */
    SwitchGameArchive(req: SwitchGameArchiveRequest, cb?: (error: string, rep: SwitchGameArchiveResponse) => void): Promise<SwitchGameArchiveResponse>;
    /**
     * 将一个文件批量分发到多个实例，一次接口调用触发一次文件分发，一次文件分发只会从公网下载一次，然后文件会走内网分发到实例列表中的实例。
     */
    DistributeFileToAndroidInstances(req: DistributeFileToAndroidInstancesRequest, cb?: (error: string, rep: DistributeFileToAndroidInstancesResponse) => void): Promise<DistributeFileToAndroidInstancesResponse>;
    /**
     * 重启安卓实例宿主机。请注意：

- 当前每 15 分钟只能重启一次
- 一个宿主机可能有多个云手机实例，重启宿主机会影响运行在上面的所有实例，请确保该宿主机上的所有云手机实例未投入业务使用
     */
    RebootAndroidInstanceHosts(req: RebootAndroidInstanceHostsRequest, cb?: (error: string, rep: RebootAndroidInstanceHostsResponse) => void): Promise<RebootAndroidInstanceHostsResponse>;
    /**
     * 创建会话
     */
    CreateSession(req: CreateSessionRequest, cb?: (error: string, rep: CreateSessionResponse) => void): Promise<CreateSessionResponse>;
    /**
     * 删除安卓应用版本
     */
    DeleteAndroidAppVersion(req: DeleteAndroidAppVersionRequest, cb?: (error: string, rep: DeleteAndroidAppVersionResponse) => void): Promise<DeleteAndroidAppVersionResponse>;
    /**
     * 重置安卓实例
     */
    ResetAndroidInstances(req: ResetAndroidInstancesRequest, cb?: (error: string, rep: ResetAndroidInstancesResponse) => void): Promise<ResetAndroidInstancesResponse>;
    /**
     * 安装安卓实例应用
     */
    InstallAndroidInstancesApp(req: InstallAndroidInstancesAppRequest, cb?: (error: string, rep: InstallAndroidInstancesAppResponse) => void): Promise<InstallAndroidInstancesAppResponse>;
    /**
     * 批量设置安卓实例应用前台保活，开启应用保活，只是降低应用被杀死或回收的优先级，并不能保证应用不会被杀死或回收（如出现内存不足等资源限制时，应用也有概率被杀死或回收）
     */
    SetAndroidInstancesFGAppKeepAlive(req: SetAndroidInstancesFGAppKeepAliveRequest, cb?: (error: string, rep: SetAndroidInstancesFGAppKeepAliveResponse) => void): Promise<SetAndroidInstancesFGAppKeepAliveResponse>;
    /**
     * 查询安卓应用信息
     */
    DescribeAndroidApps(req: DescribeAndroidAppsRequest, cb?: (error: string, rep: DescribeAndroidAppsResponse) => void): Promise<DescribeAndroidAppsResponse>;
    /**
     * 创建安卓实例访问Token
     */
    CreateAndroidInstancesAccessToken(req: CreateAndroidInstancesAccessTokenRequest, cb?: (error: string, rep: CreateAndroidInstancesAccessTokenResponse) => void): Promise<CreateAndroidInstancesAccessTokenResponse>;
    /**
     * 复制安卓实例：
1. 排除和包含文件只能指定 /data 下的文件，不指定时复制整个 /data 目录
2. 源实例和目的实例必须在同一区域
3. 复制时，源实例和目的实例都会停机，复制完后实例会自动启动
4. 复制时会产生大量内网流量，请限制并发
     */
    CopyAndroidInstance(req: CopyAndroidInstanceRequest, cb?: (error: string, rep: CopyAndroidInstanceResponse) => void): Promise<CopyAndroidInstanceResponse>;
    /**
     * 创建安卓应用版本
     */
    CreateAndroidAppVersion(req: CreateAndroidAppVersionRequest, cb?: (error: string, rep: CreateAndroidAppVersionResponse) => void): Promise<CreateAndroidAppVersionResponse>;
    /**
     * 销毁安卓实例
     */
    DestroyAndroidInstances(req: DestroyAndroidInstancesRequest, cb?: (error: string, rep: DestroyAndroidInstancesResponse) => void): Promise<DestroyAndroidInstancesResponse>;
    /**
     * 删除安卓应用
     */
    DeleteAndroidApp(req: DeleteAndroidAppRequest, cb?: (error: string, rep: DeleteAndroidAppResponse) => void): Promise<DeleteAndroidAppResponse>;
    /**
     * 创建云手机实例 ADB 连接信息，请将返回结果的 PrivateKey 字段保存为 pem 文件，并将 pem 文件权限设置为 600，再参考返回结果的 ConnectCommand 使用 adb 连接实例。
     */
    CreateAndroidInstanceADB(req: CreateAndroidInstanceADBRequest, cb?: (error: string, rep: CreateAndroidInstanceADBResponse) => void): Promise<CreateAndroidInstanceADBResponse>;
    /**
     * 批量设置安卓实例应用后台保活，开启应用保活，只是降低应用被杀死或回收的优先级，并不能保证应用不会被杀死或回收（如出现内存不足等资源限制时，应用也有概率被杀死或回收）
     */
    SetAndroidInstancesBGAppKeepAlive(req: SetAndroidInstancesBGAppKeepAliveRequest, cb?: (error: string, rep: SetAndroidInstancesBGAppKeepAliveResponse) => void): Promise<SetAndroidInstancesBGAppKeepAliveResponse>;
    /**
     * 强制退出游戏
     */
    StopGame(req: StopGameRequest, cb?: (error: string, rep: StopGameResponse) => void): Promise<StopGameResponse>;
    /**
     * 批量将实例的 logcat 日志文件上传到您已授权的 COS bucket 中，授权 COS bucket 请在控制台中操作。
     */
    FetchAndroidInstancesLogs(req: FetchAndroidInstancesLogsRequest, cb?: (error: string, rep: FetchAndroidInstancesLogsResponse) => void): Promise<FetchAndroidInstancesLogsResponse>;
    /**
     * 在安卓实例上异步执行命令，命令输出结果如果内容过长会被截断
     */
    ExecuteCommandOnAndroidInstances(req: ExecuteCommandOnAndroidInstancesRequest, cb?: (error: string, rep: ExecuteCommandOnAndroidInstancesResponse) => void): Promise<ExecuteCommandOnAndroidInstancesResponse>;
    /**
     * 重启安卓实例
     */
    RebootAndroidInstances(req: RebootAndroidInstancesRequest, cb?: (error: string, rep: RebootAndroidInstancesResponse) => void): Promise<RebootAndroidInstancesResponse>;
    /**
     * 导入安卓实例镜像，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像导入完成处于可用状态。
     */
    ImportAndroidInstanceImage(req: ImportAndroidInstanceImageRequest, cb?: (error: string, rep: ImportAndroidInstanceImageResponse) => void): Promise<ImportAndroidInstanceImageResponse>;
    /**
     * 批量查询安装指定应用的安卓实例
     */
    DescribeAndroidInstancesByApps(req: DescribeAndroidInstancesByAppsRequest, cb?: (error: string, rep: DescribeAndroidInstancesByAppsResponse) => void): Promise<DescribeAndroidInstancesByAppsResponse>;
    /**
     * 删除安卓实例备份文件
     */
    DeleteAndroidInstanceBackupFiles(req: DeleteAndroidInstanceBackupFilesRequest, cb?: (error: string, rep: DeleteAndroidInstanceBackupFilesResponse) => void): Promise<DeleteAndroidInstanceBackupFilesResponse>;
    /**
     * 修改安卓应用版本
     */
    ModifyAndroidAppVersion(req: ModifyAndroidAppVersionRequest, cb?: (error: string, rep: ModifyAndroidAppVersionResponse) => void): Promise<ModifyAndroidAppVersionResponse>;
    /**
     * 批量修改安卓实例的标签
     */
    ModifyAndroidInstancesLabels(req: ModifyAndroidInstancesLabelsRequest, cb?: (error: string, rep: ModifyAndroidInstancesLabelsResponse) => void): Promise<ModifyAndroidInstancesLabelsResponse>;
    /**
     * 保存游戏存档
     */
    SaveGameArchive(req: SaveGameArchiveRequest, cb?: (error: string, rep: SaveGameArchiveResponse) => void): Promise<SaveGameArchiveResponse>;
    /**
     * 查询安卓实例任务状态
     */
    DescribeAndroidInstanceTasksStatus(req: DescribeAndroidInstanceTasksStatusRequest, cb?: (error: string, rep: DescribeAndroidInstanceTasksStatusResponse) => void): Promise<DescribeAndroidInstanceTasksStatusResponse>;
}
