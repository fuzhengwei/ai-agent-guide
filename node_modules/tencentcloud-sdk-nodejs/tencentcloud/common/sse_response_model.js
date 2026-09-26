"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEResponseModel = void 0;
const events_1 = require("events");
const readline_1 = require("readline");
// Custom EventEmitter for handling SSE events
class SSEEventEmitter extends events_1.EventEmitter {
}
/**
 * Class to handle Server-Sent Events (SSE) responses.
 * Parses SSE data from a readable stream and emits events for messages, errors, and stream closure.
 */
class SSEResponseModel {
    /**
     * Constructs an SSEResponseModel instance.
     * @param stream - The readable stream containing SSE data.
     */
    constructor(stream) {
        this.stream = stream;
        this.readline = (0, readline_1.createInterface)({
            input: stream,
            crlfDelay: Infinity,
        });
        this.eventSource = new SSEEventEmitter();
        this.init();
    }
    /**
     * Initializes the SSE parser by setting up event listeners for the stream and readline.
     */
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
    /**
     * Parses raw SSE lines into an EventSourceMessage object.
     * @param lines - An array of raw SSE lines.
     * @returns The parsed EventSourceMessage.
     */
    parseSSEMessage(lines) {
        const message = {
            data: "",
            event: "",
            id: "",
            retry: undefined,
        };
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // line is of format "<field>:<value>" or "<field>: <value>"
            const colonIndex = line.indexOf(":");
            if (colonIndex <= 0)
                continue; // exclude comments and lines with no values
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
                        // per spec, ignore non-integers
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
    /**
     * Provides an async iterator for consuming SSE messages.
     * @returns An async iterator yielding parsed EventSourceMessage objects.
     */
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
exports.SSEResponseModel = SSEResponseModel;
