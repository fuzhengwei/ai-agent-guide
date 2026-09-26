import "./polyfill";
import MySqlQueryBuilder from "./MySqlQueryBuilder";
import { ClientServerOptions, GetGenericDatabaseWithOptions } from "../postgrest";
import { Fetch, GenericSchema } from "../postgrest/types";
/**
 * MySQL client.
 */
export default class MySqlClient<Database = any, ClientOptions extends ClientServerOptions = GetGenericDatabaseWithOptions<Database, {}>["options"]> {
    protected url: string;
    protected headers: Headers;
    protected fetch?: Fetch;
    /**
     * Creates a MySQL client.
     *
     * @param url - URL of the MySQL endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.fetch - Custom fetch
     */
    constructor(url: string, { headers, fetch, }?: {
        headers?: HeadersInit;
        fetch?: Fetch;
    });
    from<Schema extends GenericSchema, TableName extends string & keyof Schema["Tables"], Table extends Schema["Tables"][TableName]>(relation: TableName): MySqlQueryBuilder<ClientOptions, Schema, Table, TableName>;
    from<Schema extends GenericSchema, ViewName extends string & keyof Schema["Views"], View extends Schema["Views"][ViewName]>(relation: ViewName): MySqlQueryBuilder<ClientOptions, Schema, View, ViewName>;
}
