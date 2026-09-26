import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { CreateIncrementalMigrationStrategyResponse, DeleteIncrementalMigrationStrategyRequest, CreateStorageCredentialsRequest, DescribeIncrementalMigrationStrategyInfosResponse, DescribeStorageRequest, DescribeIncrementalMigrationStrategyInfosRequest, ModifyIncrementalMigrationStrategyRequest, CreateStorageCredentialsResponse, DeleteIncrementalMigrationStrategyResponse, CreateStorageRequest, DescribeStorageResponse, ModifyIncrementalMigrationStrategyResponse, CreateStorageResponse, CreateIncrementalMigrationStrategyRequest } from "./vod_models";
/**
 * vod client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 创建增量迁移策略。
     */
    ModifyIncrementalMigrationStrategy(req: ModifyIncrementalMigrationStrategyRequest, cb?: (error: string, rep: ModifyIncrementalMigrationStrategyResponse) => void): Promise<ModifyIncrementalMigrationStrategyResponse>;
    /**
     * 查询增量迁移策略信息。
     */
    DescribeIncrementalMigrationStrategyInfos(req: DescribeIncrementalMigrationStrategyInfosRequest, cb?: (error: string, rep: DescribeIncrementalMigrationStrategyInfosResponse) => void): Promise<DescribeIncrementalMigrationStrategyInfosResponse>;
    /**
     * 该接口用于为专业版应用创建存储桶。

注：
- 本接口仅用于专业版应用；
- 客户创建点播专业版应用时，系统默认为客户开通了部分地域的存储，用户如果需要开通其它地域的存储，可以通过该接口进行开通；
- 通过 [DescribeStorageRegions](https://cloud.tencent.com/document/product/266/72480) 接口可以查询到所有存储地域及已经开通存储桶的地域。
     */
    CreateStorage(req: CreateStorageRequest, cb?: (error: string, rep: CreateStorageResponse) => void): Promise<CreateStorageResponse>;
    /**
     * 创建增量迁移策略。
     */
    CreateIncrementalMigrationStrategy(req: CreateIncrementalMigrationStrategyRequest, cb?: (error: string, rep: CreateIncrementalMigrationStrategyResponse) => void): Promise<CreateIncrementalMigrationStrategyResponse>;
    /**
     * 删除增量迁移策略。
     */
    DeleteIncrementalMigrationStrategy(req: DeleteIncrementalMigrationStrategyRequest, cb?: (error: string, rep: DeleteIncrementalMigrationStrategyResponse) => void): Promise<DeleteIncrementalMigrationStrategyResponse>;
    /**
     * 该接口用于查询专业版应用中的存储桶信息，同时支持分页查询。

注：
- 本接口仅用于专业版应用。
     */
    DescribeStorage(req: DescribeStorageRequest, cb?: (error: string, rep: DescribeStorageResponse) => void): Promise<DescribeStorageResponse>;
    /**
     * 用于按指定策略，生成专业版应用的临时访问凭证，比如生成用于客户端上传的临时凭证。
     */
    CreateStorageCredentials(req: CreateStorageCredentialsRequest, cb?: (error: string, rep: CreateStorageCredentialsResponse) => void): Promise<CreateStorageCredentialsResponse>;
}
