export default class AbortController {
    listeners: Array<CallableFunction>;
    signal: {
        aborted: boolean;
        addEventListener: (e: string, f: CallableFunction) => void;
    };
    constructor();
    abort(): void;
}
