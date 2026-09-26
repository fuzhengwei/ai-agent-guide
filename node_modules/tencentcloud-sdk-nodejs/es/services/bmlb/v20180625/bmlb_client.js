import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bmlb.tencentcloudapi.com", "2018-06-25", clientConfig);
    }
    async DescribeL7Listeners(req, cb) {
        return this.request("DescribeL7Listeners", req, cb);
    }
    async UnbindTrafficMirrorReceivers(req, cb) {
        return this.request("UnbindTrafficMirrorReceivers", req, cb);
    }
    async ModifyL7BackendWeight(req, cb) {
        return this.request("ModifyL7BackendWeight", req, cb);
    }
    async ModifyL4BackendWeight(req, cb) {
        return this.request("ModifyL4BackendWeight", req, cb);
    }
    async CreateL4Listeners(req, cb) {
        return this.request("CreateL4Listeners", req, cb);
    }
    async UnbindL4Backends(req, cb) {
        return this.request("UnbindL4Backends", req, cb);
    }
    async ModifyL7Listener(req, cb) {
        return this.request("ModifyL7Listener", req, cb);
    }
    async DeleteTrafficMirror(req, cb) {
        return this.request("DeleteTrafficMirror", req, cb);
    }
    async CreateL7Rules(req, cb) {
        return this.request("CreateL7Rules", req, cb);
    }
    async DescribeTrafficMirrorReceiverHealthStatus(req, cb) {
        return this.request("DescribeTrafficMirrorReceiverHealthStatus", req, cb);
    }
    async UnbindL7Backends(req, cb) {
        return this.request("UnbindL7Backends", req, cb);
    }
    async DeleteL7Rules(req, cb) {
        return this.request("DeleteL7Rules", req, cb);
    }
    async DescribeL4ListenerInfo(req, cb) {
        return this.request("DescribeL4ListenerInfo", req, cb);
    }
    async DescribeTrafficMirrorListeners(req, cb) {
        return this.request("DescribeTrafficMirrorListeners", req, cb);
    }
    async ModifyL7Locations(req, cb) {
        return this.request("ModifyL7Locations", req, cb);
    }
    async ModifyL4BackendPort(req, cb) {
        return this.request("ModifyL4BackendPort", req, cb);
    }
    async DeleteLoadBalancer(req, cb) {
        return this.request("DeleteLoadBalancer", req, cb);
    }
    async CreateLoadBalancers(req, cb) {
        return this.request("CreateLoadBalancers", req, cb);
    }
    async DescribeL7Rules(req, cb) {
        return this.request("DescribeL7Rules", req, cb);
    }
    async DescribeLoadBalancerTaskResult(req, cb) {
        return this.request("DescribeLoadBalancerTaskResult", req, cb);
    }
    async DescribeL7ListenerInfo(req, cb) {
        return this.request("DescribeL7ListenerInfo", req, cb);
    }
    async DescribeL4Listeners(req, cb) {
        return this.request("DescribeL4Listeners", req, cb);
    }
    async SetTrafficMirrorHealthSwitch(req, cb) {
        return this.request("SetTrafficMirrorHealthSwitch", req, cb);
    }
    async DescribeLoadBalancers(req, cb) {
        return this.request("DescribeLoadBalancers", req, cb);
    }
    async DeleteListeners(req, cb) {
        return this.request("DeleteListeners", req, cb);
    }
    async DescribeCertDetail(req, cb) {
        return this.request("DescribeCertDetail", req, cb);
    }
    async UnbindTrafficMirrorListeners(req, cb) {
        return this.request("UnbindTrafficMirrorListeners", req, cb);
    }
    async ModifyL7BackendPort(req, cb) {
        return this.request("ModifyL7BackendPort", req, cb);
    }
    async DescribeL7Backends(req, cb) {
        return this.request("DescribeL7Backends", req, cb);
    }
    async CreateTrafficMirror(req, cb) {
        return this.request("CreateTrafficMirror", req, cb);
    }
    async ModifyL4BackendProbePort(req, cb) {
        return this.request("ModifyL4BackendProbePort", req, cb);
    }
    async BindL4Backends(req, cb) {
        return this.request("BindL4Backends", req, cb);
    }
    async BindTrafficMirrorReceivers(req, cb) {
        return this.request("BindTrafficMirrorReceivers", req, cb);
    }
    async ReplaceCert(req, cb) {
        return this.request("ReplaceCert", req, cb);
    }
    async DeleteL7Domains(req, cb) {
        return this.request("DeleteL7Domains", req, cb);
    }
    async DescribeTrafficMirrors(req, cb) {
        return this.request("DescribeTrafficMirrors", req, cb);
    }
    async DescribeL7ListenersEx(req, cb) {
        return this.request("DescribeL7ListenersEx", req, cb);
    }
    async UploadCert(req, cb) {
        return this.request("UploadCert", req, cb);
    }
    async BindL7Backends(req, cb) {
        return this.request("BindL7Backends", req, cb);
    }
    async DescribeL4Backends(req, cb) {
        return this.request("DescribeL4Backends", req, cb);
    }
    async BindTrafficMirrorListeners(req, cb) {
        return this.request("BindTrafficMirrorListeners", req, cb);
    }
    async ModifyLoadBalancer(req, cb) {
        return this.request("ModifyLoadBalancer", req, cb);
    }
    async SetTrafficMirrorAlias(req, cb) {
        return this.request("SetTrafficMirrorAlias", req, cb);
    }
    async DescribeLoadBalancerPortInfo(req, cb) {
        return this.request("DescribeLoadBalancerPortInfo", req, cb);
    }
    async ModifyLoadBalancerChargeMode(req, cb) {
        return this.request("ModifyLoadBalancerChargeMode", req, cb);
    }
    async CreateL7Listeners(req, cb) {
        return this.request("CreateL7Listeners", req, cb);
    }
    async DescribeDevicesBindInfo(req, cb) {
        return this.request("DescribeDevicesBindInfo", req, cb);
    }
    async ModifyL4Listener(req, cb) {
        return this.request("ModifyL4Listener", req, cb);
    }
    async DescribeTrafficMirrorReceivers(req, cb) {
        return this.request("DescribeTrafficMirrorReceivers", req, cb);
    }
}
