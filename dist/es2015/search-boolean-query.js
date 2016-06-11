import { SearchQuery } from "./search-query";
export class SearchBooleanQuery extends SearchQuery {
    constructor() {
        super();
        this.bool = new Set();
    }
    add(query) {
        this.bool.add(query);
        return this;
    }
    remove(query) {
        this.bool.delete(query);
        return this;
    }
    get size() {
        return this.bool.size;
    }
    toJSON() {
        let entries = [];
        this.bool.forEach(query => entries.push(query));
        return entries;
    }
}
SearchBooleanQuery.MUST = "$must";
SearchBooleanQuery.SHOULD = "$should";
//# sourceMappingURL=search-boolean-query.js.map