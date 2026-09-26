import { ClientServerOptions, PostgrestQueryBuilder } from "../postgrest";
import { GenericSchema, GenericTable, GenericView } from "../postgrest/types";
declare class MySqlQueryBuilder<ClientOptions extends ClientServerOptions, Schema extends GenericSchema, Relation extends GenericTable | GenericView, RelationName = unknown, Relationships = Relation extends {
    Relationships: infer R;
} ? R : unknown> extends PostgrestQueryBuilder<ClientOptions, Schema, Relation, RelationName, Relationships> {
    constructor(url: URL, { headers, fetch, }: {
        headers?: HeadersInit;
        fetch?: any;
    });
}
export default MySqlQueryBuilder;
