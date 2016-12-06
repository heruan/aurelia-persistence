import { SearchQuery} from "./search-query";
import { Query} from "./query";

export class SearchBooleanContext implements Query {

    public static BOOLEAN_CONTEXT: string = "$bool";

    public static MUST: string = "$must";

    public static SHOULD: string = "$should";

    private map: Map<string, SearchQuery[]>;

    public constructor(searchBooleanContext?: SearchBooleanContext) {
        this.map = searchBooleanContext ? new Map<string, any>(searchBooleanContext.map) : new Map<string, any>();
    }

    public and(...queries: SearchQuery[]): SearchBooleanContext {
        return this.bool.call(this, SearchBooleanContext.MUST, ...queries);
    }

    public or(...queries: SearchQuery[]): SearchBooleanContext {
        return this.bool.call(this, SearchBooleanContext.SHOULD, ...queries);
    }

    public bool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext {
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, []);
        }
        let booleanSearch = this.map.get(booleanAggregator);
        for (let query of queries) {
            booleanSearch.push(query);
        }
        return this;
    }

    public unsetAnd(...queries: SearchQuery[]): SearchBooleanContext {
        return this.unsetBool.call(this, SearchBooleanContext.MUST, ...queries);
    }

    public unsetOr(...queries: SearchQuery[]): SearchBooleanContext {
        return this.unsetBool.call(this, SearchBooleanContext.SHOULD, ...queries);
    }

    public unsetBool(booleanAggregator: string, ...queries: SearchQuery[]): SearchBooleanContext {
        if (this.map.has(booleanAggregator)) {
            let booleanSearch = this.map.get(booleanAggregator);
            for (let query of queries) {
                booleanSearch.splice(booleanSearch.indexOf(query), 1);
            }
            if (booleanSearch.length == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    }


    public copy(): SearchBooleanContext {
        return new SearchBooleanContext(this);
    }

    public toJSON(): any {
        if (this.map.size === 0) {
            return { };
        } else {
            let filter = { };
            this.map.forEach((value, key) => filter[key] = value);
            return {
                "$bool": filter
            };
        }
    }

}
