import { EventEmitter } from "events";
import { createInterface } from "readline";
class SSEEventEmitter extends EventEmitter {
}
export class SSEResponseModel {
    constructor(stream) {
        this.stream = stream;
        this.readline = createInterface({
            input: stream,
            crlfDelay: Infinity,
        });
        this.eventSource = new SSEEventEmitter();
        this.init();
    }
    init() {
        const { stream, readline, eventSource } = this;
        let lines = [];
        readline.on("line", (line) => {
            if (line) {
                lines.push(line);
                return;
            }
            eventSource.emit("message", this.parseSSEMessage(lines.splice(0)));
        });
        readline.on("close", () => {
            if (lines.length > 0) {
                eventSource.emit("message", this.parseSSEMessage(lines.splice(0)));
            }
        });
        stream.on("close", () => {
            eventSource.emit("close");
        });
        stream.on("error", (err) => {
            eventSource.emit("error", err);
        });
    }
    parseSSEMessage(lines) {
        const message = {
            data: "",
            event: "",
            id: "",
            retry: undefined,
        };
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const colonIndex = line.indexOf(":");
            if (colonIndex <= 0)
                continue;
            const field = line.slice(0, colonIndex);
            const value = line.slice(colonIndex + (line[colonIndex + 1] === " " ? 2 : 1));
            switch (field) {
                case "data":
                    message.data = message.data ? message.data + "\n" + value : value;
                    break;
                case "event":
                    message.event = value;
                    break;
                case "id":
                    message.id = value;
                    break;
                case "retry":
                    const retry = parseInt(value, 10);
                    if (!isNaN(retry)) {
                        message.retry = retry;
                    }
                    break;
            }
        }
        return message;
    }
    on(event, listener) {
        this.eventSource.on(event, listener);
        return this;
    }
    removeListener(event, listener) {
        this.eventSource.removeListener(event, listener);
        return this;
    }
    async *[Symbol.asyncIterator]() {
        let lines = [];
        for await (const line of this.readline) {
            if (line) {
                lines.push(line);
                continue;
            }
            yield this.parseSSEMessage(lines.splice(0));
        }
        if (lines.length > 0) {
            yield this.parseSSEMessage(lines.splice(0));
        }
    }
}
