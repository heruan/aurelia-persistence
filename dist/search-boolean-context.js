"use strict";
var SearchBooleanContext = (function () {
    function SearchBooleanContext(searchBooleanContext) {
        this.map = searchBooleanContext ? new Map(searchBooleanContext.map) : new Map();
    }
    SearchBooleanContext.prototype.and = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.bool).call.apply(_a, [this, SearchBooleanContext.MUST].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.or = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.bool).call.apply(_a, [this, SearchBooleanContext.SHOULD].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.bool = function (booleanAggregator) {
        var queries = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            queries[_i - 1] = arguments[_i];
        }
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, []);
        }
        var booleanSearch = this.map.get(booleanAggregator);
        for (var _a = 0, queries_1 = queries; _a < queries_1.length; _a++) {
            var query = queries_1[_a];
            booleanSearch.push(query);
        }
        return this;
    };
    SearchBooleanContext.prototype.unsetAnd = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.unsetBool).call.apply(_a, [this, SearchBooleanContext.MUST].concat(queries));
        var _a;
    };
    SearchBooleanContext.prototype.unsetOr = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i - 0] = arguments[_i];
        }
        return (_a = this.unsetBool).call.apply(_a, [this, SearchBooleanContext.SHOULD].concat(queries));
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
                booleanSearch.splice(booleanSearch.indexOf(query), 1);
            }
            if (booleanSearch.length == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    };
    SearchBooleanContext.prototype.copy = function () {
        return new SearchBooleanContext(this);
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
    SearchBooleanContext.MUST = "$must";
    SearchBooleanContext.SHOULD = "$should";
    return SearchBooleanContext;
}());
exports.SearchBooleanContext = SearchBooleanContext;
