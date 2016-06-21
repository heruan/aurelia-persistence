"use strict";
var search_boolean_query_1 = require("./search-boolean-query");
var SearchBooleanContext = (function () {
    function SearchBooleanContext() {
        this.map = new Map();
    }
    SearchBooleanContext.prototype.must = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.bool).call.apply(_a, [this, search_boolean_query_1.SearchBooleanQuery.MUST].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.should = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.bool).call.apply(_a, [this, search_boolean_query_1.SearchBooleanQuery.SHOULD].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.bool = function (booleanAggregator) {
        var queries = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            queries[_i - 1] = arguments[_i];
        }
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, new search_boolean_query_1.SearchBooleanQuery());
        }
        var booleanSearch = this.map.get(booleanAggregator);
        for (var _a = 0, queries_1 = queries; _a < queries_1.length; _a++) {
            var query = queries_1[_a];
            booleanSearch.add(query);
        }
        return this;
    };
    SearchBooleanContext.prototype.unsetMust = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.unsetBool).call.apply(_a, [this, search_boolean_query_1.SearchBooleanQuery.MUST].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.unsetShould = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.unsetBool).call.apply(_a, [this, search_boolean_query_1.SearchBooleanQuery.SHOULD].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.unsetBool = function (booleanAggregator) {
        var queries = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            queries[_i - 1] = arguments[_i];
        }
        if (this.map.has(booleanAggregator)) {
            var booleanSearch = this.map.get(booleanAggregator);
            for (var _a = 0, queries_2 = queries; _a < queries_2.length; _a++) {
                var query = queries_2[_a];
                booleanSearch.remove(query);
            }
            if (booleanSearch.size == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    };
    SearchBooleanContext.prototype.toJSON = function () {
        if (this.map.size === 0) {
            return {};
        }
        else {
            var filter_1 = {};
            this.map.forEach(function (value, key) { return filter_1[key] = value; });
            return {
                "$bool": filter_1
            };
        }
    };
    SearchBooleanContext.BOOLEAN_CONTEXT = "$bool";
    return SearchBooleanContext;
}());
exports.SearchBooleanContext = SearchBooleanContext;
//# sourceMappingURL=search-boolean-context.js.map