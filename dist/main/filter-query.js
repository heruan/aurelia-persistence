"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var group_filter_1 = require("./group-filter");
var field_filter_1 = require("./field-filter");
var text_filter_1 = require("./text-filter");
var FilterQuery = FilterQuery_1 = (function () {
    function FilterQuery(filterQuery) {
        this.map = filterQuery ? new Map(filterQuery.map) : new Map();
    }
    FilterQuery.prototype.field = function (fieldName, fieldFilter) {
        this.map.set(fieldName, fieldFilter);
        return this;
    };
    FilterQuery.prototype.unset = function (fieldName) {
        this.map.delete(fieldName);
        return this;
    };
    FilterQuery.prototype.textFields = function (fieldNames, search) {
        return this.text(new text_filter_1.TextFilter(fieldNames, search));
    };
    FilterQuery.prototype.text = function (textFilter) {
        this.map.set(text_filter_1.TextFilter.TEXT, textFilter);
        return this;
    };
    FilterQuery.prototype.unsetText = function () {
        this.map.delete(text_filter_1.TextFilter.TEXT);
        return this;
    };
    FilterQuery.prototype.or = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.OR];
        return this.group.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.and = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.AND];
        return this.group.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.not = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.NOT];
        return this.group.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.nor = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.NOR];
        return this.group.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.group = function (groupAggregator) {
        var filters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            filters[_i - 1] = arguments[_i];
        }
        if (!this.map.has(groupAggregator)) {
            this.map.set(groupAggregator, new group_filter_1.GroupFilter());
        }
        var groupFilter = this.map.get(groupAggregator);
        for (var _a = 0, filters_1 = filters; _a < filters_1.length; _a++) {
            var filter = filters_1[_a];
            groupFilter.add(filter);
        }
        return this;
    };
    FilterQuery.prototype.unsetOr = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.OR];
        return this.unsetGroup.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.unsetAnd = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.AND];
        return this.unsetGroup.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.unsetNot = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.NOT];
        return this.unsetGroup.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.unsetNor = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        var args = [group_filter_1.GroupFilter.NOR];
        return this.unsetGroup.apply(this, args.concat(filters));
    };
    FilterQuery.prototype.unsetGroup = function (groupAggregator) {
        var filters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            filters[_i - 1] = arguments[_i];
        }
        if (this.map.has(groupAggregator)) {
            var groupFilter = this.map.get(groupAggregator);
            for (var _a = 0, filters_2 = filters; _a < filters_2.length; _a++) {
                var filter = filters_2[_a];
                groupFilter.remove(filter);
            }
            if (groupFilter.size == 0) {
                this.map.delete(groupAggregator);
            }
        }
        return this;
    };
    FilterQuery.prototype.equalTo = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().equalTo(value));
    };
    FilterQuery.prototype.notEqualTo = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().notEqualTo(value));
    };
    FilterQuery.prototype.greaterThan = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().greaterThan(value));
    };
    FilterQuery.prototype.greaterThanOrEqualTo = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().greaterThanOrEqualTo(value));
    };
    FilterQuery.prototype.lessThan = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().lessThan(value));
    };
    FilterQuery.prototype.lessThanOrEqualTo = function (fieldName, value) {
        return this.field(fieldName, new field_filter_1.FieldFilter().lessThanOrEqualTo(value));
    };
    FilterQuery.prototype.in = function (fieldName, array) {
        return this.field(fieldName, new field_filter_1.FieldFilter().in(array));
    };
    FilterQuery.prototype.notIn = function (fieldName, array) {
        return this.field(fieldName, new field_filter_1.FieldFilter().notIn(array));
    };
    FilterQuery.prototype.mod = function (fieldName, mod) {
        return this.field(fieldName, new field_filter_1.FieldFilter().mod(mod));
    };
    FilterQuery.prototype.regex = function (fieldName, regex) {
        return this.field(fieldName, new field_filter_1.FieldFilter().regex(regex));
    };
    FilterQuery.prototype.elemMatch = function (fieldName, filter) {
        return this.field(fieldName, new field_filter_1.FieldFilter().elemMatch(filter));
    };
    FilterQuery.prototype.copy = function () {
        return new FilterQuery_1(this);
    };
    FilterQuery.prototype.toJSON = function () {
        var filter = {};
        this.map.forEach(function (value, key) { return filter[key] = value; });
        return filter;
    };
    FilterQuery.fromJSON = function (object) {
        var filter = new FilterQuery_1();
        for (var field in object) {
            switch (field) {
                case group_filter_1.GroupFilter.OR:
                    filter.or.apply(filter, object[field].map(function (f) { return FilterQuery_1.fromJSON(f); }));
                    break;
                case group_filter_1.GroupFilter.AND:
                    filter.and.apply(filter, object[field].map(function (f) { return FilterQuery_1.fromJSON(f); }));
                    break;
                case group_filter_1.GroupFilter.NOT:
                    filter.not.apply(filter, object[field].map(function (f) { return FilterQuery_1.fromJSON(f); }));
                    break;
                case group_filter_1.GroupFilter.NOR:
                    filter.nor.apply(filter, object[field].map(function (f) { return FilterQuery_1.fromJSON(f); }));
                    break;
                case text_filter_1.TextFilter.TEXT:
                    filter.text(text_filter_1.TextFilter.fromJSON(object[field]));
                    break;
                default: filter.field(field, field_filter_1.FieldFilter.fromJSON(object[field]));
            }
        }
        return filter;
    };
    return FilterQuery;
}());
FilterQuery.FILTERING_EVENT = "aurelia.persistence.filtering";
FilterQuery = FilterQuery_1 = __decorate([
    aurelia_dependency_injection_1.autoinject,
    __metadata("design:paramtypes", [FilterQuery])
], FilterQuery);
exports.FilterQuery = FilterQuery;
var FilterQuery_1;

//# sourceMappingURL=filter-query.js.map
