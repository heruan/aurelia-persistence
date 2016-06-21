"use strict";
var SearchTermQuery = (function () {
    function SearchTermQuery() {
        this.map = new Map();
    }
    SearchTermQuery.prototype.wildcard = function (wildcard) {
        if (wildcard === void 0) { wildcard = true; }
        this.map.set(SearchTermQuery.WILDCARD, wildcard);
        return this;
    };
    SearchTermQuery.prototype.fields = function (fields) {
        this.map.set(SearchTermQuery.FIELDS, fields);
        return this;
    };
    SearchTermQuery.prototype.matching = function (matching) {
        this.map.set(SearchTermQuery.MATCHING, matching);
        return this;
    };
    SearchTermQuery.prototype.toJSON = function () {
        var filter = {};
        this.map.forEach(function (value, key) { return filter[key] = value; });
        return { "$keyword": filter };
    };
    SearchTermQuery.FIELDS = "$fields";
    SearchTermQuery.MATCHING = "$matching";
    SearchTermQuery.WILDCARD = "$wildcard";
    return SearchTermQuery;
}());
exports.SearchTermQuery = SearchTermQuery;
//# sourceMappingURL=search-term-query.js.map