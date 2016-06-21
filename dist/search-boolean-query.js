"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var search_query_1 = require("./search-query");
var SearchBooleanQuery = (function (_super) {
    __extends(SearchBooleanQuery, _super);
    function SearchBooleanQuery() {
        _super.call(this);
        this.bool = new Set();
    }
    SearchBooleanQuery.prototype.add = function (query) {
        this.bool.add(query);
        return this;
    };
    SearchBooleanQuery.prototype.remove = function (query) {
        this.bool.delete(query);
        return this;
    };
    Object.defineProperty(SearchBooleanQuery.prototype, "size", {
        get: function () {
            return this.bool.size;
        },
        enumerable: true,
        configurable: true
    });
    SearchBooleanQuery.prototype.toJSON = function () {
        var entries = [];
        this.bool.forEach(function (query) { return entries.push(query); });
        return entries;
    };
    SearchBooleanQuery.MUST = "$must";
    SearchBooleanQuery.SHOULD = "$should";
    return SearchBooleanQuery;
}(search_query_1.SearchQuery));
exports.SearchBooleanQuery = SearchBooleanQuery;
//# sourceMappingURL=search-boolean-query.js.map