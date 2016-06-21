import { SearchContext } from "./search-context";
import { SearchQuery } from "./search-query";
export declare class SearchBooleanContext implements SearchContext {
    static BOOLEAN_CONTEXT: string;
    private map;
    constructor();
    must(...queries: SearchQuery[]): SearchBooleanContext;
    should(...queries: SearchQuery[]): SearchBooleanContext;
    bool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext;
    unsetMust(...queries: SearchQuery[]): SearchBooleanContext;
    unsetShould(...queries: SearchQuery[]): SearchBooleanContext;
    unsetBool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext;
    toJSON(): any;
}
