import { SearchQuery } from "./search-query";
export declare class SearchBooleanQuery extends SearchQuery {
    static MUST: string;
    static SHOULD: string;
    private bool;
    constructor();
    add(query: SearchQuery): SearchBooleanQuery;
    remove(query: SearchQuery): SearchBooleanQuery;
    readonly size: number;
    toJSON(): any;
}
