import { SearchQuery } from "./search-query";
export declare class SearchTermQuery extends SearchQuery {
    static FIELDS: string;
    static MATCHING: string;
    static WILDCARD: string;
    private map;
    constructor(searchTermQuery?: SearchTermQuery);
    wildcard(wildcard?: boolean): SearchTermQuery;
    fields(fields: string[]): SearchTermQuery;
    matching(matching: string): SearchTermQuery;
    copy(): SearchTermQuery;
    toJSON(): any;
}
