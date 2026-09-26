/**
 * 获取全局对象 window
 *  小程序中可用, 但小程序中对象信息残缺, 无法访问 navigator 对象, ua 信息也无意义
 */
export declare function getGlobalObj(): false | typeof globalThis;
/** 获取referrer 信息, 担心小程序中报错, 故catch */
export declare function getReferrer(): any;
/** 获取用户UA, 小程序中使用 getSystemInfo 替代 */
export declare function getUserAgent(): any;
export declare const VERSION: string | undefined;
export declare function getRandomString(): string;
