import {SearchQuery} from "./search-query";

export class SearchBooleanQuery extends SearchQuery {

    public static MUST: string = "$must";

    public static SHOULD: string = "$should";

    private bool: Set<SearchQuery>;

    public constructor() {
        super();
        this.bool = new Set<SearchQuery>();
    }

    public add(query: SearchQuery): SearchBooleanQuery {
        this.bool.add(query);
        return this;
    }

    public remove(query: SearchQuery): SearchBooleanQuery {
        this.bool.delete(query);
        return this;
    }

    get size() {
        return this.bool.size;
    }

    public toJSON(): any {
        let entries = [];
        this.bool.forEach(query => entries.push(query));
        return entries;
    }

}
