import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { ChatCompletionsRequest, ChunkDocumentAsyncRequest, ChunkDocumentRequest, GetDocumentChunkResultRequest, GetDocumentParseResultRequest, ParseDocumentResponse, GetTextEmbeddingRequest, ParseDocumentAsyncResponse, ChunkDocumentResponse, GetDocumentParseResultResponse, RunRerankRequest, GetDocumentChunkResultResponse, ChunkDocumentAsyncResponse, GetMultiModalEmbeddingResponse, GetMultiModalEmbeddingRequest, ParseDocumentRequest, GetTextEmbeddingResponse, RunRerankResponse, ParseDocumentAsyncRequest, ChatCompletionsResponse } from "./es_models";
/**
 * es client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 文本切片是将长文本分割为短片段的技术，用于适配模型输入、提升处理效率或信息检索，平衡片段长度与语义连贯性，适用于NLP、数据分析等场景。
本接口为异步接口，有模型维度调用上限控制，单个模型qps限制5，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service) 。
     */
    ChunkDocumentAsync(req: ChunkDocumentAsyncRequest, cb?: (error: string, rep: ChunkDocumentAsyncResponse) => void): Promise<ChunkDocumentAsyncResponse>;
    /**
     * 获取文档切片结果
     */
    GetDocumentChunkResult(req: GetDocumentChunkResultRequest, cb?: (error: string, rep: GetDocumentChunkResultResponse) => void): Promise<GetDocumentChunkResultResponse>;
    /**
     * 本服务可将各类格式文档精准转换为标准格式，满足企业知识库建设、技术文档迁移、内容平台结构化存储等需求。
本接口为异步接口，有模型维度调用上限控制，单个模型qps限制5，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service) 。
     */
    ParseDocumentAsync(req: ParseDocumentAsyncRequest, cb?: (error: string, rep: ParseDocumentAsyncResponse) => void): Promise<ParseDocumentAsyncResponse>;
    /**
     * 本接口用于获取文档解析异步处理结果。
     */
    GetDocumentParseResult(req: GetDocumentParseResultRequest, cb?: (error: string, rep: GetDocumentParseResultResponse) => void): Promise<GetDocumentParseResultResponse>;
    /**
     * Embedding是一种将高维数据映射到低维空间的技术，通常用于将非结构化数据，如文本、图像或音频转化为向量表示，使其更容易输入机器模型进行处理，并且向量之间的距离可以反映对象之间的相似性。
本接口有模型维度调用上限控制，单个模型qps限制20，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service)  。
     */
    GetTextEmbedding(req: GetTextEmbeddingRequest, cb?: (error: string, rep: GetTextEmbeddingResponse) => void): Promise<GetTextEmbeddingResponse>;
    /**
     * 本服务可将各类格式文档精准转换为标准格式，满足企业知识库建设、技术文档迁移、内容平台结构化存储等需求。
本接口有模型维度调用上限控制，单个模型qps限制5，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service) 。
     */
    ParseDocument(req: ParseDocumentRequest, cb?: (error: string, rep: ParseDocumentResponse) => void): Promise<ParseDocumentResponse>;
    /**
     * 本服务支持一系列高性能的大语言模型，包括DeepSeek以及腾讯自主研发的混元大模型，结合混合搜索等先进搜索技术，快速高效实现RAG，有效解决幻觉和知识更新问题。
本接口有模型维度调用上限控制，单个模型qps限制5，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service)  。
     */
    ChatCompletions(req: ChatCompletionsRequest, cb?: (error: string, rep: ChatCompletionsResponse) => void): Promise<ChatCompletionsResponse>;
    /**
     * 文本切片是将长文本分割为短片段的技术，用于适配模型输入、提升处理效率或信息检索，平衡片段长度与语义连贯性，适用于NLP、数据分析等场景。
本接口为分隔符规则切片接口，有单账号调用上限控制，如您有提高并发限制的需求请 [联系我们](https://cloud.tencent.com/act/event/Online_service)  。
     */
    ChunkDocument(req: ChunkDocumentRequest, cb?: (error: string, rep: ChunkDocumentResponse) => void): Promise<ChunkDocumentResponse>;
    /**
     * Embedding是一种将高维数据映射到低维空间的技术，通常用于将非结构化数据，如文本、图像或音频转化为向量表示，使其更容易输入机器模型进行处理，并且向量之间的距离可以反映对象之间的相似性。
本接口有模型维度调用上限控制，单个模型qps限制10，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service)  。
     */
    GetMultiModalEmbedding(req: GetMultiModalEmbeddingRequest, cb?: (error: string, rep: GetMultiModalEmbeddingResponse) => void): Promise<GetMultiModalEmbeddingResponse>;
    /**
     * 重排是指在 RAG 过程中，通过评估文档与查询之间的相关性，将最相关的文档放在前面，确保语言模型在生成回答时优先考虑排名靠前的上下文，提高生成结果的准确性和可信度，也可以通过这种方式进行过滤，减少大模型成本。
本接口有单账号调用上限控制，如您有提高并发限制的需求请[联系我们](https://cloud.tencent.com/act/event/Online_service)  。
     */
    RunRerank(req: RunRerankRequest, cb?: (error: string, rep: RunRerankResponse) => void): Promise<RunRerankResponse>;
}
