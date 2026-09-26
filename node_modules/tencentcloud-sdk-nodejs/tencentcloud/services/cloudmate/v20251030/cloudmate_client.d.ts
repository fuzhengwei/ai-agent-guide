import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { CloudMateAgentRequest, CloudMateAgentResponse } from "./cloudmate_models";
/**
 * cloudmate client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 发起智能诊断对话
注意：使用该API时，请务必设置请求域名（Endpoint）为 cloudmate.ai.tencentcloudapi.com
     */
    CloudMateAgent(req: CloudMateAgentRequest, cb?: (error: string, rep: CloudMateAgentResponse) => void): Promise<CloudMateAgentResponse>;
}
