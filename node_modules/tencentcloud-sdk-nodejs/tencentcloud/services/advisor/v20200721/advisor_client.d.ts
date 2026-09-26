import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeStrategiesResponse, DescribeTaskStrategyRisksRequest, CreateAdvisorAuthorizationResponse, DescribeTaskStrategyRisksResponse, CreateAdvisorAuthorizationRequest, DescribeStrategiesRequest } from "./advisor_models";
/**
 * advisor client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 查询评估项风险实例列表
     */
    DescribeTaskStrategyRisks(req: DescribeTaskStrategyRisksRequest, cb?: (error: string, rep: DescribeTaskStrategyRisksResponse) => void): Promise<DescribeTaskStrategyRisksResponse>;
    /**
     * 开启智能顾问授权。会同步开启报告解读和云架构协作权限
     */
    CreateAdvisorAuthorization(req?: CreateAdvisorAuthorizationRequest, cb?: (error: string, rep: CreateAdvisorAuthorizationResponse) => void): Promise<CreateAdvisorAuthorizationResponse>;
    /**
     * 用于查询评估项的信息
     */
    DescribeStrategies(req?: DescribeStrategiesRequest, cb?: (error: string, rep: DescribeStrategiesResponse) => void): Promise<DescribeStrategiesResponse>;
}
