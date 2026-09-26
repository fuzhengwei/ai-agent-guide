import { ClientServerOptions, PostgrestFilterBuilder } from "../postgrest";
import { GenericSchema } from "../postgrest/types";
declare class MySqlFilterBuilder<ClientOptions extends ClientServerOptions, Schema extends GenericSchema, Row extends Record<string, unknown>, Result, RelationName = unknown, Relationships = unknown, Method extends "GET" | "POST" | "HEAD" | "PATCH" | "DELETE" = "GET"> extends PostgrestFilterBuilder<ClientOptions, Schema, Row, Result, RelationName, Relationships, Method> {
    constructor({ method, url, headers, fetch, }: {
        method: Method;
        url: URL;
        headers?: HeadersInit;
        fetch?: any;
    });
}
export default MySqlFilterBuilder;
