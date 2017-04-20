"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_query_1 = require("./filter-query");
var FieldFilter = (function () {
    function FieldFilter() {
        this.map = new Map();
    }
    FieldFilter.prototype.equalTo = function (value) {
        this.map.set(FieldFilter.EQ, value);
        return this;
    };
    FieldFilter.prototype.greaterThan = function (value) {
        this.map.set(FieldFilter.GT, value);
        return this;
    };
    FieldFilter.prototype.greaterThanOrEqualTo = function (value) {
        this.map.set(FieldFilter.GTE, value);
        return this;
    };
    FieldFilter.prototype.lessThan = function (value) {
        this.map.set(FieldFilter.LT, value);
        return this;
    };
    FieldFilter.prototype.lessThanOrEqualTo = function (value) {
        this.map.set(FieldFilter.LTE, value);
        return this;
    };
    FieldFilter.prototype.notEqualTo = function (value) {
        this.map.set(FieldFilter.NE, value);
        return this;
    };
    FieldFilter.prototype.in = function (array) {
        this.map.set(FieldFilter.IN, array);
        return this;
    };
    FieldFilter.prototype.notIn = function (array) {
        this.map.set(FieldFilter.NIN, array);
        return this;
    };
    FieldFilter.prototype.mod = function (mod) {
        this.map.set(FieldFilter.MOD, mod);
        return this;
    };
    FieldFilter.prototype.regex = function (regex) {
        this.map.set(FieldFilter.REGEX, regex);
        return this;
    };
    FieldFilter.prototype.elemMatch = function (filter) {
        this.map.set(FieldFilter.ELEM_MATCH, filter);
        return this;
    };
    FieldFilter.prototype.toJSON = function () {
        var filter = {};
        this.map.forEach(function (value, key) { return filter[key] = value; });
        return filter;
    };
    FieldFilter.fromJSON = function (object) {
        var filter = new FieldFilter();
        for (var field in object) {
            switch (field) {
                case FieldFilter.ELEM_MATCH:
                    filter.elemMatch(filter_query_1.FilterQuery.fromJSON(object[field]));
                    break;
                default: filter.map.set(field, object[field]);
            }
        }
        return filter;
    };
    return FieldFilter;
}());
FieldFilter.EQ = "$eq";
FieldFilter.GT = "$gt";
FieldFilter.GTE = "$gte";
FieldFilter.LT = "$lt";
FieldFilter.LTE = "$lte";
FieldFilter.NE = "$ne";
FieldFilter.IN = "$in";
FieldFilter.NIN = "$nin";
FieldFilter.MOD = "$mod";
FieldFilter.REGEX = "$regex";
FieldFilter.ELEM_MATCH = "$elemMatch";
exports.FieldFilter = FieldFilter;

//# sourceMappingURL=field-filter.js.map
