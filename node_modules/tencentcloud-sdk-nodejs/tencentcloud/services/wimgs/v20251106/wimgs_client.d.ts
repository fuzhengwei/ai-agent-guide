import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { SearchByTextResponse, SearchByTextRequest } from "./wimgs_models";
/**
 * wimgs client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 文搜图接口，本服务将针对您输入的搜索关键词，检索并以JSON形式返回相关图片的标题、宽高、缩略图、内容来源url等信息。
     */
    SearchByText(req: SearchByTextRequest, cb?: (error: string, rep: SearchByTextResponse) => void): Promise<SearchByTextResponse>;
}
