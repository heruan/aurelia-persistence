"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupFilter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aureliaUtils = require("aurelia-utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupFilter = exports.GroupFilter = function () {
    function GroupFilter() {
        _classCallCheck(this, GroupFilter);

        for (var _len = arguments.length, filterQuery = Array(_len), _key = 0; _key < _len; _key++) {
            filterQuery[_key] = arguments[_key];
        }

        this.group = new _aureliaUtils.ArrayList(filterQuery);
    }

    GroupFilter.prototype.add = function add(filter) {
        this.group.add(filter);
        return this;
    };

    GroupFilter.prototype.remove = function remove(filter) {
        this.group.remove(filter);
        return this;
    };

    GroupFilter.prototype.toJSON = function toJSON() {
        return this.group.toArray().filter(function (filter) {
            return Object.keys(filter).length != 0;
        });
    };

    _createClass(GroupFilter, [{
        key: "size",
        get: function get() {
            return this.group.size();
        }
    }]);

    return GroupFilter;
}();

GroupFilter.OR = "$or";
GroupFilter.AND = "$and";
GroupFilter.NOT = "$not";
GroupFilter.NOR = "$nor";