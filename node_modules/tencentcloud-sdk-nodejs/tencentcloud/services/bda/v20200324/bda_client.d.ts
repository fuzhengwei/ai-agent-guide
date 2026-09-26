import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { CreateSegmentationTaskRequest, CreateSegmentationTaskResponse, DescribeSegmentationTaskResponse, SegmentPortraitPicResponse, TerminateSegmentationTaskResponse, SegmentCustomizedPortraitPicResponse, SegmentPortraitPicRequest, SegmentCustomizedPortraitPicRequest, DescribeSegmentationTaskRequest, TerminateSegmentationTaskRequest } from "./bda_models";
/**
 * bda client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 即二分类人像分割，识别传入图片中人体的完整轮廓，进行抠像。
     */
    SegmentPortraitPic(req: SegmentPortraitPicRequest, cb?: (error: string, rep: SegmentPortraitPicResponse) => void): Promise<SegmentPortraitPicResponse>;
    /**
     * 在前后景分割的基础上优化多分类分割，支持对头发、五官等的分割，既作为换发型、挂件等底层技术，也可用于抠人头、抠人脸等玩法
     */
    SegmentCustomizedPortraitPic(req: SegmentCustomizedPortraitPicRequest, cb?: (error: string, rep: SegmentCustomizedPortraitPicResponse) => void): Promise<SegmentCustomizedPortraitPicResponse>;
    /**
     * 终止指定视频人像分割处理任务
     */
    TerminateSegmentationTask(req: TerminateSegmentationTaskRequest, cb?: (error: string, rep: TerminateSegmentationTaskResponse) => void): Promise<TerminateSegmentationTaskResponse>;
    /**
     * 可以查看单条任务的处理情况，包括处理状态，处理结果。
     */
    DescribeSegmentationTask(req: DescribeSegmentationTaskRequest, cb?: (error: string, rep: DescribeSegmentationTaskResponse) => void): Promise<DescribeSegmentationTaskResponse>;
    /**
     * 本接口为人像分割在线处理接口组中的提交任务接口，可以对提交的资源进行处理视频流/图片流识别视频作品中的人像区域，进行一键抠像、背景替换、人像虚化等后期处理。
     */
    CreateSegmentationTask(req: CreateSegmentationTaskRequest, cb?: (error: string, rep: CreateSegmentationTaskResponse) => void): Promise<CreateSegmentationTaskResponse>;
}
