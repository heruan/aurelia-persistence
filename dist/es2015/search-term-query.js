export class SearchTermQuery {
    constructor() {
        this.map = new Map();
    }
    wildcard(wildcard = true) {
        this.map.set(SearchTermQuery.WILDCARD, wildcard);
        return this;
    }
    fields(fields) {
        this.map.set(SearchTermQuery.FIELDS, fields);
        return this;
    }
    matching(matching) {
        this.map.set(SearchTermQuery.MATCHING, matching);
        return this;
    }
    toJSON() {
        let filter = {};
        for (let [key, value] of this.map) {
            filter[key] = value;
        }
        return { "$keyword": filter };
    }
}
SearchTermQuery.FIELDS = "$fields";
SearchTermQuery.MATCHING = "$matching";
SearchTermQuery.WILDCARD = "$wildcard";
//# sourceMappingURL=search-term-query.js.map