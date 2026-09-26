import { ICloudbaseEventEmitter } from '@cloudbase/types/events';
interface IEvent {
    name: string;
    target: any;
    data: any;
}
export declare class CloudbaseEvent implements IEvent {
    readonly name: string;
    target: any;
    data: any;
    constructor(name: string, data: any);
}
export declare class IErrorEvent extends CloudbaseEvent {
    readonly error: Error;
    constructor(error: Error, data?: any);
}
export declare class CloudbaseEventEmitter implements ICloudbaseEventEmitter {
    private readonly listeners;
    on(name: string, listener: Function): this;
    off(name: string, listener: Function): this;
    fire(event: string | CloudbaseEvent, data?: any): this;
    private listens;
}
export declare function addEventListener(event: string, callback: Function): void;
export declare function activateEvent(event: string, data?: any): void;
export declare function removeEventListener(event: string, callback: Function): void;
export {};
