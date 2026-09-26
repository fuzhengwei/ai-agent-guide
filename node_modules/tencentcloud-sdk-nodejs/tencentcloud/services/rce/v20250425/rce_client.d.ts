import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { ManageIPPortraitRiskResponse, ManageIPPortraitRiskRequest } from "./rce_models";
/**
 * rce client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * IP画像接口
     */
    ManageIPPortraitRisk(req: ManageIPPortraitRiskRequest, cb?: (error: string, rep: ManageIPPortraitRiskResponse) => void): Promise<ManageIPPortraitRiskResponse>;
}
