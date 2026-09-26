import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("trabbit.tencentcloudapi.com", "2023-04-18", clientConfig);
    }
    async DeleteRabbitMQServerlessBinding(req, cb) {
        return this.request("DeleteRabbitMQServerlessBinding", req, cb);
    }
    async ModifyRabbitMQServerlessInstance(req, cb) {
        return this.request("ModifyRabbitMQServerlessInstance", req, cb);
    }
    async CreateRabbitMQServerlessVirtualHost(req, cb) {
        return this.request("CreateRabbitMQServerlessVirtualHost", req, cb);
    }
    async DescribeRabbitMQServerlessInstance(req, cb) {
        return this.request("DescribeRabbitMQServerlessInstance", req, cb);
    }
    async DescribeRabbitMQServerlessConsumers(req, cb) {
        return this.request("DescribeRabbitMQServerlessConsumers", req, cb);
    }
    async DeleteRabbitMQServerlessQueue(req, cb) {
        return this.request("DeleteRabbitMQServerlessQueue", req, cb);
    }
    async DeleteRabbitMQServerlessUser(req, cb) {
        return this.request("DeleteRabbitMQServerlessUser", req, cb);
    }
    async DeleteRabbitMQServerlessVirtualHost(req, cb) {
        return this.request("DeleteRabbitMQServerlessVirtualHost", req, cb);
    }
    async ModifyRabbitMQServerlessUser(req, cb) {
        return this.request("ModifyRabbitMQServerlessUser", req, cb);
    }
    async DescribeRabbitMQServerlessUser(req, cb) {
        return this.request("DescribeRabbitMQServerlessUser", req, cb);
    }
    async DescribeRabbitMQServerlessExchangeDetail(req, cb) {
        return this.request("DescribeRabbitMQServerlessExchangeDetail", req, cb);
    }
    async DescribeRabbitMQServerlessVirtualHost(req, cb) {
        return this.request("DescribeRabbitMQServerlessVirtualHost", req, cb);
    }
    async DescribeRabbitMQServerlessExchanges(req, cb) {
        return this.request("DescribeRabbitMQServerlessExchanges", req, cb);
    }
    async DescribeRabbitMQServerlessBindings(req, cb) {
        return this.request("DescribeRabbitMQServerlessBindings", req, cb);
    }
    async CreateRabbitMQServerlessUser(req, cb) {
        return this.request("CreateRabbitMQServerlessUser", req, cb);
    }
    async DescribeRabbitMQServerlessQueues(req, cb) {
        return this.request("DescribeRabbitMQServerlessQueues", req, cb);
    }
    async ModifyRabbitMQServerlessVirtualHost(req, cb) {
        return this.request("ModifyRabbitMQServerlessVirtualHost", req, cb);
    }
    async CreateRabbitMQServerlessQueue(req, cb) {
        return this.request("CreateRabbitMQServerlessQueue", req, cb);
    }
    async DeleteRabbitMQServerlessExchange(req, cb) {
        return this.request("DeleteRabbitMQServerlessExchange", req, cb);
    }
    async DescribeRabbitMQServerlessPermission(req, cb) {
        return this.request("DescribeRabbitMQServerlessPermission", req, cb);
    }
    async DescribeRabbitMQServerlessQueueDetail(req, cb) {
        return this.request("DescribeRabbitMQServerlessQueueDetail", req, cb);
    }
    async DescribeRabbitMQServerlessConnection(req, cb) {
        return this.request("DescribeRabbitMQServerlessConnection", req, cb);
    }
    async ModifyRabbitMQServerlessQueue(req, cb) {
        return this.request("ModifyRabbitMQServerlessQueue", req, cb);
    }
    async ModifyRabbitMQServerlessExchange(req, cb) {
        return this.request("ModifyRabbitMQServerlessExchange", req, cb);
    }
    async CreateRabbitMQServerlessBinding(req, cb) {
        return this.request("CreateRabbitMQServerlessBinding", req, cb);
    }
    async DeleteRabbitMQServerlessPermission(req, cb) {
        return this.request("DeleteRabbitMQServerlessPermission", req, cb);
    }
    async ListRabbitMQServerlessInstances(req, cb) {
        return this.request("ListRabbitMQServerlessInstances", req, cb);
    }
    async CreateRabbitMQServerlessExchange(req, cb) {
        return this.request("CreateRabbitMQServerlessExchange", req, cb);
    }
    async ModifyRabbitMQServerlessPermission(req, cb) {
        return this.request("ModifyRabbitMQServerlessPermission", req, cb);
    }
}
