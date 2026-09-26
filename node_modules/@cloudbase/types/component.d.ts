import { ICloudbaseEventEmitter } from './events'

export interface ICloudbaseComponent {
  name: string;
  entity: any;
  namespace?: string;
  injectEvents?: {
    bus: ICloudbaseEventEmitter,
    events: string[];
  };
  IIFE?: boolean
}

export interface ICloudbaseHook {
  entity: any;
  target: string;
}
