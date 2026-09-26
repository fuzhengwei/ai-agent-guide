import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { RecoverInstanceRequest, ModifyDBInstanceSecurityGroupsResponse, ScaleOutInstanceResponse, IsolateInstanceRequest, DescribeInstanceNodesRequest, DescribePriceResizeInstanceResponse, CreateInstanceResponse, DescribeDBSecurityGroupsRequest, AssociateSecurityGroupsRequest, ModifyInstanceMaintenanceWindowResponse, DescribeInstanceNodesResponse, CreateInstanceRequest, DescribeDBSecurityGroupsResponse, DescribePriceResizeInstanceRequest, DescribePriceRenewInstanceRequest, DescribePriceCreateInstanceRequest, AssociateSecurityGroupsResponse, DescribeInstancesRequest, DisassociateSecurityGroupsRequest, DisassociateSecurityGroupsResponse, IsolateInstanceResponse, DescribeInstanceMaintenanceWindowRequest, DescribeInstanceMaintenanceWindowResponse, ScaleOutInstanceRequest, DescribePriceCreateInstanceResponse, DestroyInstancesResponse, ScaleUpInstanceRequest, DescribeInstancesResponse, RecoverInstanceResponse, ModifyInstanceMaintenanceWindowRequest, DescribePriceRenewInstanceResponse, ModifyDBInstanceSecurityGroupsRequest, ScaleUpInstanceResponse, DestroyInstancesRequest } from "./vdb_models";
/**
 * vdb client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 本接口（DescribeInstanceMaintenanceWindow）用于查看实例维护时间窗。
     */
    DescribeInstanceMaintenanceWindow(req: DescribeInstanceMaintenanceWindowRequest, cb?: (error: string, rep: DescribeInstanceMaintenanceWindowResponse) => void): Promise<DescribeInstanceMaintenanceWindowResponse>;
    /**
     * 本接口 (AssociateSecurityGroups) 用于安全组批量绑定多个指定实例。
     */
    AssociateSecurityGroups(req: AssociateSecurityGroupsRequest, cb?: (error: string, rep: AssociateSecurityGroupsResponse) => void): Promise<AssociateSecurityGroupsResponse>;
    /**
     * 查询实例列表
     */
    DescribeInstances(req: DescribeInstancesRequest, cb?: (error: string, rep: DescribeInstancesResponse) => void): Promise<DescribeInstancesResponse>;
    /**
     * 本接口（ModifyInstanceMaintenanceWindow）用于修改实例维护时间窗范围。
     */
    ModifyInstanceMaintenanceWindow(req: ModifyInstanceMaintenanceWindowRequest, cb?: (error: string, rep: ModifyInstanceMaintenanceWindowResponse) => void): Promise<ModifyInstanceMaintenanceWindowResponse>;
    /**
     * 本接口（CreateInstance）用于创建向量数据库实例。
     */
    CreateInstance(req: CreateInstanceRequest, cb?: (error: string, rep: CreateInstanceResponse) => void): Promise<CreateInstanceResponse>;
    /**
     * 本接口(ModifyDBInstanceSecurityGroups)用于修改实例绑定的安全组。
     */
    ModifyDBInstanceSecurityGroups(req: ModifyDBInstanceSecurityGroupsRequest, cb?: (error: string, rep: ModifyDBInstanceSecurityGroupsResponse) => void): Promise<ModifyDBInstanceSecurityGroupsResponse>;
    /**
     * 本接口(DescribeDBSecurityGroups)用于查询实例的安全组详情。
     */
    DescribeDBSecurityGroups(req: DescribeDBSecurityGroupsRequest, cb?: (error: string, rep: DescribeDBSecurityGroupsResponse) => void): Promise<DescribeDBSecurityGroupsResponse>;
    /**
     * 本接口（RecoverInstance）用于恢复在回收站隔离的实例。
     */
    RecoverInstance(req: RecoverInstanceRequest, cb?: (error: string, rep: RecoverInstanceResponse) => void): Promise<RecoverInstanceResponse>;
    /**
     * 查询实例pod列表
     */
    DescribeInstanceNodes(req: DescribeInstanceNodesRequest, cb?: (error: string, rep: DescribeInstanceNodesResponse) => void): Promise<DescribeInstanceNodesResponse>;
    /**
     * 本接口（IsolateInstance）用于隔离实例于回收站，在回收站保护时长内可恢复实例。
     */
    IsolateInstance(req: IsolateInstanceRequest, cb?: (error: string, rep: IsolateInstanceResponse) => void): Promise<IsolateInstanceResponse>;
    /**
     * 本接口（DestroyInstances）用于销毁实例。
     */
    DestroyInstances(req: DestroyInstancesRequest, cb?: (error: string, rep: DestroyInstancesResponse) => void): Promise<DestroyInstancesResponse>;
    /**
     * 本接口（ScaleUpInstance）用于升级节点配置规格。
     */
    ScaleUpInstance(req: ScaleUpInstanceRequest, cb?: (error: string, rep: ScaleUpInstanceResponse) => void): Promise<ScaleUpInstanceResponse>;
    /**
     * 查询实例变配价格
     */
    DescribePriceResizeInstance(req: DescribePriceResizeInstanceRequest, cb?: (error: string, rep: DescribePriceResizeInstanceResponse) => void): Promise<DescribePriceResizeInstanceResponse>;
    /**
     * 查询实例续费价格（包年包月）
     */
    DescribePriceRenewInstance(req: DescribePriceRenewInstanceRequest, cb?: (error: string, rep: DescribePriceRenewInstanceResponse) => void): Promise<DescribePriceRenewInstanceResponse>;
    /**
     * 本接口（ScaleOutInstance）用于水平扩容节点数量。
     */
    ScaleOutInstance(req: ScaleOutInstanceRequest, cb?: (error: string, rep: ScaleOutInstanceResponse) => void): Promise<ScaleOutInstanceResponse>;
    /**
     * 查询新购实例价格
     */
    DescribePriceCreateInstance(req: DescribePriceCreateInstanceRequest, cb?: (error: string, rep: DescribePriceCreateInstanceResponse) => void): Promise<DescribePriceCreateInstanceResponse>;
    /**
     * 本接口(DisassociateSecurityGroups)用于安全组批量解绑实例。
     */
    DisassociateSecurityGroups(req: DisassociateSecurityGroupsRequest, cb?: (error: string, rep: DisassociateSecurityGroupsResponse) => void): Promise<DisassociateSecurityGroupsResponse>;
}
