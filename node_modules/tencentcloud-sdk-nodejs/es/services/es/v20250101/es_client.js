import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("es.tencentcloudapi.com", "2025-01-01", clientConfig);
    }
    async ChunkDocumentAsync(req, cb) {
        return this.request("ChunkDocumentAsync", req, cb);
    }
    async GetDocumentChunkResult(req, cb) {
        return this.request("GetDocumentChunkResult", req, cb);
    }
    async ParseDocumentAsync(req, cb) {
        return this.request("ParseDocumentAsync", req, cb);
    }
    async GetDocumentParseResult(req, cb) {
        return this.request("GetDocumentParseResult", req, cb);
    }
    async GetTextEmbedding(req, cb) {
        return this.request("GetTextEmbedding", req, cb);
    }
    async ParseDocument(req, cb) {
        return this.request("ParseDocument", req, cb);
    }
    async ChatCompletions(req, cb) {
        return this.request("ChatCompletions", req, cb);
    }
    async ChunkDocument(req, cb) {
        return this.request("ChunkDocument", req, cb);
    }
    async GetMultiModalEmbedding(req, cb) {
        return this.request("GetMultiModalEmbedding", req, cb);
    }
    async RunRerank(req, cb) {
        return this.request("RunRerank", req, cb);
    }
}
