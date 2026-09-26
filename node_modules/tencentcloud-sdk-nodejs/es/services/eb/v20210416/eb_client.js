import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("eb.tencentcloudapi.com", "2021-04-16", clientConfig);
    }
    async DeleteEventBus(req, cb) {
        return this.request("DeleteEventBus", req, cb);
    }
    async GetPlatformEventTemplate(req, cb) {
        return this.request("GetPlatformEventTemplate", req, cb);
    }
    async CreateTransformation(req, cb) {
        return this.request("CreateTransformation", req, cb);
    }
    async CreateEventBus(req, cb) {
        return this.request("CreateEventBus", req, cb);
    }
    async CreateRule(req, cb) {
        return this.request("CreateRule", req, cb);
    }
    async DeleteTarget(req, cb) {
        return this.request("DeleteTarget", req, cb);
    }
    async ListPlatformEventPatterns(req, cb) {
        return this.request("ListPlatformEventPatterns", req, cb);
    }
    async ListTargets(req, cb) {
        return this.request("ListTargets", req, cb);
    }
    async CheckRule(req, cb) {
        return this.request("CheckRule", req, cb);
    }
    async ListPlatformProducts(req, cb) {
        return this.request("ListPlatformProducts", req, cb);
    }
    async PublishEvent(req, cb) {
        return this.request("PublishEvent", req, cb);
    }
    async PutEvents(req, cb) {
        return this.request("PutEvents", req, cb);
    }
    async UpdateTarget(req, cb) {
        return this.request("UpdateTarget", req, cb);
    }
    async GetTransformation(req, cb) {
        return this.request("GetTransformation", req, cb);
    }
    async ListRules(req, cb) {
        return this.request("ListRules", req, cb);
    }
    async DeleteRule(req, cb) {
        return this.request("DeleteRule", req, cb);
    }
    async ListPlatformEventNames(req, cb) {
        return this.request("ListPlatformEventNames", req, cb);
    }
    async UpdateEventBus(req, cb) {
        return this.request("UpdateEventBus", req, cb);
    }
    async CreateTarget(req, cb) {
        return this.request("CreateTarget", req, cb);
    }
    async UpdateRule(req, cb) {
        return this.request("UpdateRule", req, cb);
    }
    async DescribeLogTagValue(req, cb) {
        return this.request("DescribeLogTagValue", req, cb);
    }
    async DeleteTransformation(req, cb) {
        return this.request("DeleteTransformation", req, cb);
    }
    async CreateConnection(req, cb) {
        return this.request("CreateConnection", req, cb);
    }
    async GetRule(req, cb) {
        return this.request("GetRule", req, cb);
    }
    async SearchLog(req, cb) {
        return this.request("SearchLog", req, cb);
    }
    async DeleteConnection(req, cb) {
        return this.request("DeleteConnection", req, cb);
    }
    async ListEventBuses(req, cb) {
        return this.request("ListEventBuses", req, cb);
    }
    async GetEventBus(req, cb) {
        return this.request("GetEventBus", req, cb);
    }
    async UpdateTransformation(req, cb) {
        return this.request("UpdateTransformation", req, cb);
    }
    async CheckTransformation(req, cb) {
        return this.request("CheckTransformation", req, cb);
    }
    async ListConnections(req, cb) {
        return this.request("ListConnections", req, cb);
    }
    async UpdateConnection(req, cb) {
        return this.request("UpdateConnection", req, cb);
    }
}
