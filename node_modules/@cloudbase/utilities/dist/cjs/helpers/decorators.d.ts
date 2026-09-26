interface ICatchErrorsDecoratorOptions {
    mode?: 'sync' | 'async';
    customInfo?: {
        className?: string;
        methodName?: string;
    };
    title?: string;
    messages?: string[];
}
export declare function catchErrorsDecorator(options: ICatchErrorsDecoratorOptions): (target: any, methodName: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export {};
