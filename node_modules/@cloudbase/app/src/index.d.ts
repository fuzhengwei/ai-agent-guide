import cloudbase from '@cloudbase/app';
import { ICloudbase } from '@cloudbase/types';
declare global {
    interface Window {
        cloudbase: ICloudbase;
    }
}
export = cloudbase;
export default cloudbase;
