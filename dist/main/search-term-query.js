"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var search_query_1 = require("./search-query");
var SearchTermQuery = (function (_super) {
    __extends(SearchTermQuery, _super);
    function SearchTermQuery(searchTermQuery) {
        var _this = _super.call(this) || this;
        _this.map = searchTermQuery ? new Map(searchTermQuery.map) : new Map();
        return _this;
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
    SearchTermQuery.prototype.copy = function () {
        return new SearchTermQuery(this);
    };
    SearchTermQuery.prototype.toJSON = function () {
        var filter = {};
        this.map.forEach(function (value, key) { return filter[key] = value; });
        return { "$keyword": filter };
    };
    return SearchTermQuery;
}(search_query_1.SearchQuery));
SearchTermQuery.FIELDS = "$fields";
SearchTermQuery.MATCHING = "$matching";
SearchTermQuery.WILDCARD = "$wildcard";
exports.SearchTermQuery = SearchTermQuery;

//# sourceMappingURL=search-term-query.js.map
