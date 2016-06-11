import { SearchQuery } from "./search-query";
export declare class SearchTermQuery implements SearchQuery {
    static FIELDS: string;
    static MATCHING: string;
    static WILDCARD: string;
    private map;
    constructor();
    wildcard(wildcard?: boolean): SearchTermQuery;
    fields(fields: string[]): SearchTermQuery;
    matching(matching: string): SearchTermQuery;
    toJSON(): any;
}
