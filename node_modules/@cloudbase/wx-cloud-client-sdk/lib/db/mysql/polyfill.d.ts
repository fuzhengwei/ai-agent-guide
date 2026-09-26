/**
 * Headers polyfill for environments without native Headers support
 * 兼容的Headers类实现
 */
declare class _Headers {
    private map;
    constructor(init?: HeadersInit | Record<string, string> | string[][]);
    /**
     * 添加头部信息，如果已存在则追加
     * @param name 头部名称
     * @param value 头部值
     */
    append(name: string, value: string): void;
    /**
     * 删除指定头部
     * @param name 头部名称
     */
    delete(name: string): void;
    /**
     * 迭代所有头部
     * @param callback 回调函数
     * @param thisArg 回调函数的this指向
     */
    forEach(callback: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
    /**
     * 获取指定头部的值
     * @param name 头部名称
     * @returns 头部值，不存在则返回null
     */
    get(name: string): string | null;
    /**
     * 检查指定头部是否存在
     * @param name 头部名称
     * @returns 是否存在
     */
    has(name: string): boolean;
    /**
     * 设置头部信息，如果已存在则覆盖
     * @param name 头部名称
     * @param value 头部值
     */
    set(name: string, value: string): void;
    /**
     * 生成迭代器，用于for...of循环
     * @returns 迭代器
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * 生成键名迭代器
     * @returns 键名迭代器
     */
    keys(): IterableIterator<string>;
    /**
     * 生成值迭代器
     * @returns 值迭代器
     */
    values(): IterableIterator<string>;
    /**
     * 获取所有Set-Cookie头部值
     * @returns Set-Cookie值的数组
     */
    getSetCookie(): string[];
    /**
     * 转换为普通对象
     * @returns 包含所有头部的对象
     */
    toJSON(): Record<string, string>;
    /**
     * 迭代器接口，用于for...of循环
     */
    [Symbol.iterator](): IterableIterator<[string, string]>;
}
