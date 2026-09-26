import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeSecurityAlarmTableListResponse, DescribeSecurityAlarmTableListRequest } from "./securitylake_models";
/**
 * securitylake client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 查询告警列表
     */
    DescribeSecurityAlarmTableList(req: DescribeSecurityAlarmTableListRequest, cb?: (error: string, rep: DescribeSecurityAlarmTableListResponse) => void): Promise<DescribeSecurityAlarmTableListResponse>;
}
