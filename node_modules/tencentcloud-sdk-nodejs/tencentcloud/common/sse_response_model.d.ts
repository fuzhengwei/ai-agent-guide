interface EventSourceMessage {
    /** The event ID to set the EventSource object's last event ID value. */
    id: string;
    /** A string identifying the type of event described. */
    event: string;
    /** The event data */
    data: string;
    /** The reconnection interval (in milliseconds) to wait before retrying the connection */
    retry?: number;
}
/**
 * Class to handle Server-Sent Events (SSE) responses.
 * Parses SSE data from a readable stream and emits events for messages, errors, and stream closure.
 */
export declare class SSEResponseModel {
    private stream;
    private readline;
    private eventSource;
    /**
     * Constructs an SSEResponseModel instance.
     * @param stream - The readable stream containing SSE data.
     */
    constructor(stream: NodeJS.ReadableStream);
    /**
     * Initializes the SSE parser by setting up event listeners for the stream and readline.
     */
    private init;
    /**
     * Parses raw SSE lines into an EventSourceMessage object.
     * @param lines - An array of raw SSE lines.
     * @returns The parsed EventSourceMessage.
     */
    private parseSSEMessage;
    /**
     * Registers an event listener for SSE messages.
     * @param event - The event type ("message", "close", or "error").
     * @param listener - The callback function.
     */
    on(event: "message", listener: (message: EventSourceMessage) => void): this;
    on(event: "close", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    /**
     * Removes an event listener for SSE messages.
     * @param event - The event type ("message", "close", or "error").
     * @param listener - The callback function.
     */
    removeListener(event: "message", listener: (message: EventSourceMessage) => void): this;
    removeListener(event: "close", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
    /**
     * Provides an async iterator for consuming SSE messages.
     * @returns An async iterator yielding parsed EventSourceMessage objects.
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<EventSourceMessage>;
}
export {};
