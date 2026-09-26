import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeBackupCheckJobRequest, StartBackupCheckJobRequest, ConfigureBackupPlanRequest, ConfigureBackupPlanResponse, DescribeBackupPlansResponse, DescribeConnectTestResultRequest, StartBackupPlanResponse, CreateBackupPlanResponse, DescribeBackupPlansRequest, DescribeConnectTestResultResponse, StartBackupPlanRequest, DescribeBackupCheckJobResponse, CreateConnectTestJobRequest, StartBackupCheckJobResponse, CreateBackupPlanRequest, CreateConnectTestJobResponse } from "./dbs_models";
/**
 * dbs client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 该接口用于创建连通性检测任务，请在创建备份计划前，通过该接口来检测你的源端实例是否连通性正常。
     */
    CreateConnectTestJob(req: CreateConnectTestJobRequest, cb?: (error: string, rep: CreateConnectTestJobResponse) => void): Promise<CreateConnectTestJobResponse>;
    /**
     * 本接口（StartBackupCheckJob）用于创建备份计划预校验任务。
     */
    StartBackupCheckJob(req: StartBackupCheckJobRequest, cb?: (error: string, rep: StartBackupCheckJobResponse) => void): Promise<StartBackupCheckJobResponse>;
    /**
     * 本接口（StartBackupPlan）用于启动备份计划。调用此接口前，请务必先使用 StartBackupCheckJob 创建备份计划预校验任务，并通过 DescribeBackupCheckJob 接口查询到任务状态为校验通过时，才能启动备份计划。
     */
    StartBackupPlan(req: StartBackupPlanRequest, cb?: (error: string, rep: StartBackupPlanResponse) => void): Promise<StartBackupPlanResponse>;
    /**
     * 本接口（DescribeBackupPlans）用于查询备份计划列表。
     */
    DescribeBackupPlans(req: DescribeBackupPlansRequest, cb?: (error: string, rep: DescribeBackupPlansResponse) => void): Promise<DescribeBackupPlansResponse>;
    /**
     * 本接口（ConfigureBackupPlan）用于配置备份计划。包括配置备份源实例信息、备份对象以及备份策略等。
     */
    ConfigureBackupPlan(req: ConfigureBackupPlanRequest, cb?: (error: string, rep: ConfigureBackupPlanResponse) => void): Promise<ConfigureBackupPlanResponse>;
    /**
     * 本接口（DescribeBackupCheckJob）用于查询备份计划预校验任务的结果。仅对于预校验通过的任务，才能启动备份计划。
     */
    DescribeBackupCheckJob(req: DescribeBackupCheckJobRequest, cb?: (error: string, rep: DescribeBackupCheckJobResponse) => void): Promise<DescribeBackupCheckJobResponse>;
    /**
     * 该接口用于创建备份计划。
     */
    CreateBackupPlan(req: CreateBackupPlanRequest, cb?: (error: string, rep: CreateBackupPlanResponse) => void): Promise<CreateBackupPlanResponse>;
    /**
     * 该接口用于查询连通性检测任务的结果
     */
    DescribeConnectTestResult(req: DescribeConnectTestResultRequest, cb?: (error: string, rep: DescribeConnectTestResultResponse) => void): Promise<DescribeConnectTestResultResponse>;
}
