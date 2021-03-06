"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupFilter = (function () {
    function GroupFilter() {
        var filterQuery = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filterQuery[_i] = arguments[_i];
        }
        this.group = new Set(filterQuery);
    }
    GroupFilter.prototype.add = function (filter) {
        this.group.add(filter);
        return this;
    };
    GroupFilter.prototype.remove = function (filter) {
        this.group.delete(filter);
        return this;
    };
    Object.defineProperty(GroupFilter.prototype, "size", {
        get: function () {
            return this.group.size;
        },
        enumerable: true,
        configurable: true
    });
    GroupFilter.prototype.toJSON = function () {
        return Array.from(this.group).filter(function (filter) { return filter && Object.keys(filter).length != 0; });
    };
    return GroupFilter;
}());
GroupFilter.OR = "$or";
GroupFilter.AND = "$and";
GroupFilter.NOT = "$not";
GroupFilter.NOR = "$nor";
exports.GroupFilter = GroupFilter;

//# sourceMappingURL=group-filter.js.map
