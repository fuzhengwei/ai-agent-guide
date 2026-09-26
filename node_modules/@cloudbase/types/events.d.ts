export interface Listeners {
  [key: string]: Function[];
}
export interface ICloudbaseEvent {
  name: string;
  target: any;
  data: any;
}
export interface ICloudbaseEventEmitter {
  on(name: string, listener: Function): this;
  off(name: string, listener: Function): this;
  fire(event: string | ICloudbaseEvent, data?: any): this;
}
