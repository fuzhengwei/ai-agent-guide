import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { SearchProRequest, SearchProResponse } from "./wsa_models";
/**
 * wsa client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 联网搜索API，以JSON形式向客户提供搜索结果数据，包含标题、摘要、内容来源url等信息
     */
    SearchPro(req: SearchProRequest, cb?: (error: string, rep: SearchProResponse) => void): Promise<SearchProResponse>;
}
