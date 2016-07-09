import { SearchQuery } from "./search-query";
import { Query } from "./query";
export declare class SearchBooleanContext implements Query {
    static BOOLEAN_CONTEXT: string;
    static MUST: string;
    static SHOULD: string;
    private map;
    constructor(searchBooleanContext?: SearchBooleanContext);
    and(...queries: SearchQuery[]): SearchBooleanContext;
    or(...queries: SearchQuery[]): SearchBooleanContext;
    bool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext;
    unsetAnd(...queries: SearchQuery[]): SearchBooleanContext;
    unsetOr(...queries: SearchQuery[]): SearchBooleanContext;
    unsetBool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext;
    copy(): SearchBooleanContext;
    toJSON(): any;
}
