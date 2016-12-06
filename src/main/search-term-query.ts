import { SearchQuery} from "./search-query";

export class SearchTermQuery extends SearchQuery {

    public static FIELDS = "$fields";

    public static MATCHING = "$matching";

    public static WILDCARD = "$wildcard";

    private map: Map<string, any>;

    public constructor(searchTermQuery?: SearchTermQuery) {
        super();
        this.map = searchTermQuery ? new Map<string, any>(searchTermQuery.map) : new Map<string, any>();
    }

    public wildcard(wildcard: boolean = true): SearchTermQuery {
        this.map.set(SearchTermQuery.WILDCARD, wildcard);
        return this;
    }

    public fields(fields: string[]): SearchTermQuery {
        this.map.set(SearchTermQuery.FIELDS, fields);
        return this;
    }

    public matching(matching: string): SearchTermQuery {
        this.map.set(SearchTermQuery.MATCHING, matching);
        return this;
    }

    public copy(): SearchTermQuery {
        return new SearchTermQuery(this);
    }

    public toJSON(): any {
        let filter = { };
        this.map.forEach((value, key) => filter[key] = value);
        return { "$keyword": filter };
    }

}
