import { CloudbaseAdapter, SDKAdapterInterface, NodeAdapterInterface } from '@cloudbase/adapter-interface';
export declare enum RUNTIME {
    WEB = "web",
    WX_MP = "wx_mp"
}
type ICloudbaseAdapter = CloudbaseAdapter & {
    genAdapter: (options?: any) => SDKAdapterInterface | NodeAdapterInterface;
};
export declare function useAdapters(adapters: ICloudbaseAdapter | ICloudbaseAdapter[], options?: any): {
    adapter: {
        root: any;
        wsClass: import("@cloudbase/adapter-interface").WebSocketContructor;
        reqClass: import("@cloudbase/adapter-interface").SDKRequestConstructor;
        localStorage?: import("@cloudbase/adapter-interface").StorageInterface;
        sessionStorage?: import("@cloudbase/adapter-interface").StorageInterface;
        primaryStorage?: import("@cloudbase/adapter-interface").StorageType;
        captchaOptions?: {
            openURIWithCallback?: (url: string) => Promise<import("@cloudbase/adapter-interface").CaptchaToken>;
        };
        getAppSign?(): string;
        isMatch: () => boolean;
    } | {
        wsClass: import("@cloudbase/adapter-interface").WebSocketContructor;
        reqClass: import("@cloudbase/adapter-interface").NodeRequestConstructor;
        isMatch: () => boolean;
    };
    runtime: string;
};
export declare function useDefaultAdapter(): {
    adapter: {
        root: any;
        wsClass: import("@cloudbase/adapter-interface").WebSocketContructor;
        reqClass: import("@cloudbase/adapter-interface").SDKRequestConstructor;
        localStorage?: import("@cloudbase/adapter-interface").StorageInterface;
        sessionStorage?: import("@cloudbase/adapter-interface").StorageInterface;
        primaryStorage?: import("@cloudbase/adapter-interface").StorageType;
        captchaOptions?: {
            openURIWithCallback?: (url: string) => Promise<import("@cloudbase/adapter-interface").CaptchaToken>;
        };
        getAppSign?(): string;
        type?: "" | "default";
    };
    runtime: RUNTIME;
};
export {};
