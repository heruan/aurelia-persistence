"use strict";
var aurelia_utils_1 = require("aurelia-utils");
var GroupFilter = (function () {
    function GroupFilter() {
        var filterQuery = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filterQuery[_i - 0] = arguments[_i];
        }
        this.group = new aurelia_utils_1.ArrayList(filterQuery);
    }
    GroupFilter.prototype.add = function (filter) {
        this.group.add(filter);
        return this;
    };
    GroupFilter.prototype.remove = function (filter) {
        this.group.remove(filter);
        return this;
    };
    Object.defineProperty(GroupFilter.prototype, "size", {
        get: function () {
            return this.group.size();
        },
        enumerable: true,
        configurable: true
    });
    GroupFilter.prototype.toJSON = function () {
        return this.group.toArray().filter(function (filter) { return filter && Object.keys(filter).length != 0; });
    };
    GroupFilter.OR = "$or";
    GroupFilter.AND = "$and";
    GroupFilter.NOT = "$not";
    GroupFilter.NOR = "$nor";
    return GroupFilter;
}());
exports.GroupFilter = GroupFilter;
