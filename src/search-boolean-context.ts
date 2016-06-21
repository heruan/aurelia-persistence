import {SearchBooleanQuery} from "./search-boolean-query";
import {SearchContext} from "./search-context";
import {SearchQuery} from "./search-query";

export class SearchBooleanContext implements SearchContext {

    public static BOOLEAN_CONTEXT: string = "$bool";

    private map: Map<string, any>;

    public constructor() {
        this.map = new Map<string, any>();
    }

    public must(...queries: SearchQuery[]): SearchBooleanContext {
        return this.bool.call(this, SearchBooleanQuery.MUST, ...queries);
    }

    public should(...queries: SearchQuery[]): SearchBooleanContext {
        return this.bool.call(this, SearchBooleanQuery.SHOULD, ...queries);
    }

    public bool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext {
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, new SearchBooleanQuery());
        }
        let booleanSearch: SearchBooleanQuery = this.map.get(booleanAggregator);
        for (let query of queries) {
            booleanSearch.add(query);
        }
        return this;
    }

    public unsetMust(...queries: SearchQuery[]): SearchBooleanContext {
        return this.unsetBool.call(this, SearchBooleanQuery.MUST, ...queries);
    }

    public unsetShould(...queries: SearchQuery[]): SearchBooleanContext {
        return this.unsetBool.call(this, SearchBooleanQuery.SHOULD, ...queries);
    }

    public unsetBool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext {
        if (this.map.has(booleanAggregator)) {
            let booleanSearch: SearchBooleanQuery = this.map.get(booleanAggregator);
            for (let query of queries) {
                booleanSearch.remove(query);
            }
            if (booleanSearch.size == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    }

    public toJSON(): any {
        if (this.map.size === 0) {
            return {};
        } else {
            let filter = {};
            this.map.forEach((value, key) => filter[key] = value);
            return {
                "$bool": filter
            };
        }
    }

}
