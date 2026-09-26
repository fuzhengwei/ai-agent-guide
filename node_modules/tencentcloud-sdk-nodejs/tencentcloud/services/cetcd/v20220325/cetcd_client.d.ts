import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeRPCMethodListRequest, ResizeEtcdInstanceRequest, DescribeEtcdRegionsRequest, DescribeEtcdInstancesResponse, DisableEtcdInstanceDeletionProtectionResponse, ResizeEtcdInstanceResponse, ModifyEtcdSnapshotPolicyRequest, ModifyEtcdConfigurationResponse, DescribeEtcdSnapshotsRequest, CreateEtcdSnapshotPolicyResponse, DescribeEtcdSnapshotPoliciesResponse, DescribeEtcdAvailableVersionsRequest, DescribeEtcdInstancesRequest, DescribeRPCMethodListResponse, CreateEtcdSnapshotResponse, EnableEtcdInstanceDeletionProtectionRequest, DescribeEtcdSnapshotPoliciesRequest, ModifyEtcdAttributeResponse, ModifyEtcdConfigurationRequest, DescribeEtcdAvailableVersionsResponse, DescribeEtcdCreatingProgressRequest, DescribeEtcdTasksRequest, EnableEtcdInstanceDeletionProtectionResponse, DescribeEtcdTasksResponse, ModifyEtcdSnapshotPolicyResponse, CreateEtcdInstanceResponse, UpgradeEtcdInstanceResponse, CreateEtcdSnapshotPolicyRequest, DescribeEtcdCredentialsRequest, DisableEtcdInstanceDeletionProtectionRequest, DescribeEtcdRegionsResponse, DescribeEtcdCreatingProgressResponse, UpgradeEtcdInstanceRequest, DescribeEtcdQuotaRequest, CreateEtcdInstanceRequest, DescribeEtcdSnapshotsResponse, DescribeEtcdCredentialsResponse, ModifyEtcdAttributeRequest, CreateEtcdSnapshotRequest, DescribeEtcdQuotaResponse } from "./cetcd_models";
/**
 * cetcd client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 修改etcd实例配置
     */
    ModifyEtcdConfiguration(req: ModifyEtcdConfigurationRequest, cb?: (error: string, rep: ModifyEtcdConfigurationResponse) => void): Promise<ModifyEtcdConfigurationResponse>;
    /**
     * 查看etcd快照策略
     */
    DescribeEtcdSnapshotPolicies(req: DescribeEtcdSnapshotPoliciesRequest, cb?: (error: string, rep: DescribeEtcdSnapshotPoliciesResponse) => void): Promise<DescribeEtcdSnapshotPoliciesResponse>;
    /**
     * 升级etcd实例
     */
    UpgradeEtcdInstance(req: UpgradeEtcdInstanceRequest, cb?: (error: string, rep: UpgradeEtcdInstanceResponse) => void): Promise<UpgradeEtcdInstanceResponse>;
    /**
     * 扩容etcd实例
     */
    ResizeEtcdInstance(req: ResizeEtcdInstanceRequest, cb?: (error: string, rep: ResizeEtcdInstanceResponse) => void): Promise<ResizeEtcdInstanceResponse>;
    /**
     * 创建etcd快照
     */
    CreateEtcdSnapshot(req: CreateEtcdSnapshotRequest, cb?: (error: string, rep: CreateEtcdSnapshotResponse) => void): Promise<CreateEtcdSnapshotResponse>;
    /**
     * 查看etcd快照列表
     */
    DescribeEtcdSnapshots(req: DescribeEtcdSnapshotsRequest, cb?: (error: string, rep: DescribeEtcdSnapshotsResponse) => void): Promise<DescribeEtcdSnapshotsResponse>;
    /**
     * 查询etcd访问凭证
     */
    DescribeEtcdCredentials(req: DescribeEtcdCredentialsRequest, cb?: (error: string, rep: DescribeEtcdCredentialsResponse) => void): Promise<DescribeEtcdCredentialsResponse>;
    /**
     * 修改etcd快照策略
     */
    ModifyEtcdSnapshotPolicy(req: ModifyEtcdSnapshotPolicyRequest, cb?: (error: string, rep: ModifyEtcdSnapshotPolicyResponse) => void): Promise<ModifyEtcdSnapshotPolicyResponse>;
    /**
     * 启用etcd实例删除保护
     */
    EnableEtcdInstanceDeletionProtection(req: EnableEtcdInstanceDeletionProtectionRequest, cb?: (error: string, rep: EnableEtcdInstanceDeletionProtectionResponse) => void): Promise<EnableEtcdInstanceDeletionProtectionResponse>;
    /**
     * 查询etcd实例列表
     */
    DescribeEtcdInstances(req: DescribeEtcdInstancesRequest, cb?: (error: string, rep: DescribeEtcdInstancesResponse) => void): Promise<DescribeEtcdInstancesResponse>;
    /**
     * 修改etcd实例属性
     */
    ModifyEtcdAttribute(req: ModifyEtcdAttributeRequest, cb?: (error: string, rep: ModifyEtcdAttributeResponse) => void): Promise<ModifyEtcdAttributeResponse>;
    /**
     * 查看etcd可用版本
     */
    DescribeEtcdAvailableVersions(req?: DescribeEtcdAvailableVersionsRequest, cb?: (error: string, rep: DescribeEtcdAvailableVersionsResponse) => void): Promise<DescribeEtcdAvailableVersionsResponse>;
    /**
     * 查看etcd集群创建进度
     */
    DescribeEtcdCreatingProgress(req: DescribeEtcdCreatingProgressRequest, cb?: (error: string, rep: DescribeEtcdCreatingProgressResponse) => void): Promise<DescribeEtcdCreatingProgressResponse>;
    /**
     * 创建etcd快照策略
     */
    CreateEtcdSnapshotPolicy(req: CreateEtcdSnapshotPolicyRequest, cb?: (error: string, rep: CreateEtcdSnapshotPolicyResponse) => void): Promise<CreateEtcdSnapshotPolicyResponse>;
    /**
     * 关闭etcd实例删除保护
     */
    DisableEtcdInstanceDeletionProtection(req: DisableEtcdInstanceDeletionProtectionRequest, cb?: (error: string, rep: DisableEtcdInstanceDeletionProtectionResponse) => void): Promise<DisableEtcdInstanceDeletionProtectionResponse>;
    /**
     * 获取etcd集群的gRPC方法列表
     */
    DescribeRPCMethodList(req: DescribeRPCMethodListRequest, cb?: (error: string, rep: DescribeRPCMethodListResponse) => void): Promise<DescribeRPCMethodListResponse>;
    /**
     * 查看etcd相关tasks
     */
    DescribeEtcdTasks(req: DescribeEtcdTasksRequest, cb?: (error: string, rep: DescribeEtcdTasksResponse) => void): Promise<DescribeEtcdTasksResponse>;
    /**
     * 创建etcd实例
     */
    CreateEtcdInstance(req: CreateEtcdInstanceRequest, cb?: (error: string, rep: CreateEtcdInstanceResponse) => void): Promise<CreateEtcdInstanceResponse>;
    /**
     * 查看etcd集群配额
     */
    DescribeEtcdQuota(req?: DescribeEtcdQuotaRequest, cb?: (error: string, rep: DescribeEtcdQuotaResponse) => void): Promise<DescribeEtcdQuotaResponse>;
    /**
     * 查看etcd支持地域
     */
    DescribeEtcdRegions(req?: DescribeEtcdRegionsRequest, cb?: (error: string, rep: DescribeEtcdRegionsResponse) => void): Promise<DescribeEtcdRegionsResponse>;
}
