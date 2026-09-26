import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeMonitorsResponse, ModifyPackageAutoRenewRequest, DescribeDetectorsResponse, DeleteAddressPoolResponse, CreatePackageAndPayRequest, CreateStrategyResponse, DeleteAddressPoolRequest, ModifyInstanceConfigResponse, DescribeStrategyDetailRequest, DeleteMonitorRequest, DescribeAddressPoolListRequest, ModifyStrategyResponse, DescribeDnsLineListRequest, DescribeInstanceListRequest, CreateAddressPoolRequest, DescribeDetectTaskPackageListResponse, DescribeAddressPoolDetailResponse, ModifyPackageAutoRenewResponse, DescribeQuotasRequest, ModifyMonitorRequest, DescribeInstancePackageListResponse, ModifyStrategyRequest, DescribeDetectorsRequest, DeleteStrategyRequest, CreateInstanceRequest, CreateMonitorRequest, DescribeDetectTaskPackageListRequest, DescribeStrategyListResponse, CreateStrategyRequest, DescribeDnsLineListResponse, DescribeInstanceDetailResponse, DescribeMonitorDetailResponse, DescribeInstanceDetailRequest, DescribeAddressPoolDetailRequest, CreateInstanceResponse, DescribeDetectPackageDetailRequest, CreatePackageAndPayResponse, CreateAddressPoolResponse, DescribeInstancePackageListRequest, DescribeStrategyDetailResponse, DescribeMonitorsRequest, ModifyMonitorResponse, DescribeAddressLocationResponse, DescribeAddressLocationRequest, DescribeStrategyListRequest, DescribeMonitorDetailRequest, DescribeDetectPackageDetailResponse, DescribeAddressPoolListResponse, CreateMonitorResponse, DeleteStrategyResponse, ModifyAddressPoolRequest, ModifyAddressPoolResponse, DescribeQuotasResponse, ModifyInstanceConfigRequest, DescribeInstanceListResponse, DeleteMonitorResponse } from "./igtm_models";
/**
 * igtm client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 地址池列表
     */
    DescribeAddressPoolList(req: DescribeAddressPoolListRequest, cb?: (error: string, rep: DescribeAddressPoolListResponse) => void): Promise<DescribeAddressPoolListResponse>;
    /**
     * 修改地址池
     */
    ModifyAddressPool(req: ModifyAddressPoolRequest, cb?: (error: string, rep: ModifyAddressPoolResponse) => void): Promise<ModifyAddressPoolResponse>;
    /**
     * 修改实例配置
     */
    ModifyInstanceConfig(req: ModifyInstanceConfigRequest, cb?: (error: string, rep: ModifyInstanceConfigResponse) => void): Promise<ModifyInstanceConfigResponse>;
    /**
     * 探测任务包详情
     */
    DescribeDetectPackageDetail(req: DescribeDetectPackageDetailRequest, cb?: (error: string, rep: DescribeDetectPackageDetailResponse) => void): Promise<DescribeDetectPackageDetailResponse>;
    /**
     * 创建地址池
     */
    CreateAddressPool(req: CreateAddressPoolRequest, cb?: (error: string, rep: CreateAddressPoolResponse) => void): Promise<CreateAddressPoolResponse>;
    /**
     * 实例详情
     */
    DescribeInstanceDetail(req: DescribeInstanceDetailRequest, cb?: (error: string, rep: DescribeInstanceDetailResponse) => void): Promise<DescribeInstanceDetailResponse>;
    /**
     * 获取地址所属地域
     */
    DescribeAddressLocation(req: DescribeAddressLocationRequest, cb?: (error: string, rep: DescribeAddressLocationResponse) => void): Promise<DescribeAddressLocationResponse>;
    /**
     * 新建策略接口
     */
    CreateStrategy(req: CreateStrategyRequest, cb?: (error: string, rep: CreateStrategyResponse) => void): Promise<CreateStrategyResponse>;
    /**
     * 获取探测节点列表接口
     */
    DescribeDetectors(req?: DescribeDetectorsRequest, cb?: (error: string, rep: DescribeDetectorsResponse) => void): Promise<DescribeDetectorsResponse>;
    /**
     * 删除策略接口
     */
    DeleteStrategy(req: DeleteStrategyRequest, cb?: (error: string, rep: DeleteStrategyResponse) => void): Promise<DeleteStrategyResponse>;
    /**
     * 删除监控器
     */
    DeleteMonitor(req: DeleteMonitorRequest, cb?: (error: string, rep: DeleteMonitorResponse) => void): Promise<DeleteMonitorResponse>;
    /**
     * 修改监控器
     */
    ModifyMonitor(req: ModifyMonitorRequest, cb?: (error: string, rep: ModifyMonitorResponse) => void): Promise<ModifyMonitorResponse>;
    /**
     * 获取所有监控器
     */
    DescribeMonitors(req: DescribeMonitorsRequest, cb?: (error: string, rep: DescribeMonitorsResponse) => void): Promise<DescribeMonitorsResponse>;
    /**
     * 新增监控器
     */
    CreateMonitor(req: CreateMonitorRequest, cb?: (error: string, rep: CreateMonitorResponse) => void): Promise<CreateMonitorResponse>;
    /**
     * 查询分组线路列表接口
     */
    DescribeDnsLineList(req: DescribeDnsLineListRequest, cb?: (error: string, rep: DescribeDnsLineListResponse) => void): Promise<DescribeDnsLineListResponse>;
    /**
     * 创建实例接口，仅供免费实例使用
     */
    CreateInstance(req: CreateInstanceRequest, cb?: (error: string, rep: CreateInstanceResponse) => void): Promise<CreateInstanceResponse>;
    /**
     * 实例列表
     */
    DescribeInstanceList(req: DescribeInstanceListRequest, cb?: (error: string, rep: DescribeInstanceListResponse) => void): Promise<DescribeInstanceListResponse>;
    /**
     * 设置自动续费接口
     */
    ModifyPackageAutoRenew(req: ModifyPackageAutoRenewRequest, cb?: (error: string, rep: ModifyPackageAutoRenewResponse) => void): Promise<ModifyPackageAutoRenewResponse>;
    /**
     * 查询监控器详情接口
     */
    DescribeMonitorDetail(req: DescribeMonitorDetailRequest, cb?: (error: string, rep: DescribeMonitorDetailResponse) => void): Promise<DescribeMonitorDetailResponse>;
    /**
     * 探测任务套餐列表
     */
    DescribeDetectTaskPackageList(req: DescribeDetectTaskPackageListRequest, cb?: (error: string, rep: DescribeDetectTaskPackageListResponse) => void): Promise<DescribeDetectTaskPackageListResponse>;
    /**
     * 策略列表接口
     */
    DescribeStrategyList(req: DescribeStrategyListRequest, cb?: (error: string, rep: DescribeStrategyListResponse) => void): Promise<DescribeStrategyListResponse>;
    /**
     * 购买套餐并支付，此接口会在余额扣费，谨慎调用
     */
    CreatePackageAndPay(req: CreatePackageAndPayRequest, cb?: (error: string, rep: CreatePackageAndPayResponse) => void): Promise<CreatePackageAndPayResponse>;
    /**
     * 配额查询
     */
    DescribeQuotas(req: DescribeQuotasRequest, cb?: (error: string, rep: DescribeQuotasResponse) => void): Promise<DescribeQuotasResponse>;
    /**
     * 地址池详情
     */
    DescribeAddressPoolDetail(req: DescribeAddressPoolDetailRequest, cb?: (error: string, rep: DescribeAddressPoolDetailResponse) => void): Promise<DescribeAddressPoolDetailResponse>;
    /**
     * 修改策略接口
     */
    ModifyStrategy(req: ModifyStrategyRequest, cb?: (error: string, rep: ModifyStrategyResponse) => void): Promise<ModifyStrategyResponse>;
    /**
     * 删除地址池
     */
    DeleteAddressPool(req: DeleteAddressPoolRequest, cb?: (error: string, rep: DeleteAddressPoolResponse) => void): Promise<DeleteAddressPoolResponse>;
    /**
     * 策略详情
     */
    DescribeStrategyDetail(req: DescribeStrategyDetailRequest, cb?: (error: string, rep: DescribeStrategyDetailResponse) => void): Promise<DescribeStrategyDetailResponse>;
    /**
     * 实例套餐列表
     */
    DescribeInstancePackageList(req: DescribeInstancePackageListRequest, cb?: (error: string, rep: DescribeInstancePackageListResponse) => void): Promise<DescribeInstancePackageListResponse>;
}
