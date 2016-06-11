"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilterQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _groupFilter = require("./group-filter");

var _fieldFilter = require("./field-filter");

var _textFilter = require("./text-filter");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterQuery_1 = function () {
    function FilterQuery(filterQuery) {
        _classCallCheck(this, FilterQuery);

        this.map = filterQuery ? new Map(filterQuery.map) : new Map();
    }

    FilterQuery.prototype.field = function field(fieldName, fieldFilter) {
        this.map.set(fieldName, fieldFilter);
        return this;
    };

    FilterQuery.prototype.unset = function unset(fieldName) {
        this.map.delete(fieldName);
        return this;
    };

    FilterQuery.prototype.textFields = function textFields(fieldNames, search) {
        return this.text(new _textFilter.TextFilter(fieldNames, search));
    };

    FilterQuery.prototype.text = function text(textFilter) {
        this.map.set(_textFilter.TextFilter.TEXT, textFilter);
        return this;
    };

    FilterQuery.prototype.unsetText = function unsetText() {
        this.map.delete(_textFilter.TextFilter.TEXT);
        return this;
    };

    FilterQuery.prototype.or = function or() {
        var args = [_groupFilter.GroupFilter.OR];

        for (var _len = arguments.length, filters = Array(_len), _key = 0; _key < _len; _key++) {
            filters[_key] = arguments[_key];
        }

        return this.group.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.and = function and() {
        var args = [_groupFilter.GroupFilter.AND];

        for (var _len2 = arguments.length, filters = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            filters[_key2] = arguments[_key2];
        }

        return this.group.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.not = function not() {
        var args = [_groupFilter.GroupFilter.NOT];

        for (var _len3 = arguments.length, filters = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            filters[_key3] = arguments[_key3];
        }

        return this.group.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.nor = function nor() {
        var args = [_groupFilter.GroupFilter.NOR];

        for (var _len4 = arguments.length, filters = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            filters[_key4] = arguments[_key4];
        }

        return this.group.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.group = function group(groupAggregator) {
        if (!this.map.has(groupAggregator)) {
            this.map.set(groupAggregator, new _groupFilter.GroupFilter());
        }
        var groupFilter = this.map.get(groupAggregator);

        for (var _len5 = arguments.length, filters = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            filters[_key5 - 1] = arguments[_key5];
        }

        for (var _iterator = filters, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var filter = _ref;

            groupFilter.add(filter);
        }
        return this;
    };

    FilterQuery.prototype.unsetOr = function unsetOr() {
        var args = [_groupFilter.GroupFilter.OR];

        for (var _len6 = arguments.length, filters = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            filters[_key6] = arguments[_key6];
        }

        return this.unsetGroup.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.unsetAnd = function unsetAnd() {
        var args = [_groupFilter.GroupFilter.AND];

        for (var _len7 = arguments.length, filters = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            filters[_key7] = arguments[_key7];
        }

        return this.unsetGroup.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.unsetNot = function unsetNot() {
        var args = [_groupFilter.GroupFilter.NOT];

        for (var _len8 = arguments.length, filters = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            filters[_key8] = arguments[_key8];
        }

        return this.unsetGroup.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.unsetNor = function unsetNor() {
        var args = [_groupFilter.GroupFilter.NOR];

        for (var _len9 = arguments.length, filters = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            filters[_key9] = arguments[_key9];
        }

        return this.unsetGroup.apply(this, args.concat(filters));
    };

    FilterQuery.prototype.unsetGroup = function unsetGroup(groupAggregator) {
        if (this.map.has(groupAggregator)) {
            var groupFilter = this.map.get(groupAggregator);

            for (var _len10 = arguments.length, filters = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                filters[_key10 - 1] = arguments[_key10];
            }

            for (var _iterator2 = filters, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var filter = _ref2;

                groupFilter.remove(filter);
            }
            if (groupFilter.size == 0) {
                this.map.delete(groupAggregator);
            }
        }
        return this;
    };

    FilterQuery.prototype.equalTo = function equalTo(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().equalTo(value));
    };

    FilterQuery.prototype.greaterThan = function greaterThan(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().greaterThan(value));
    };

    FilterQuery.prototype.greaterThanOrEqualTo = function greaterThanOrEqualTo(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().greaterThanOrEqualTo(value));
    };

    FilterQuery.prototype.lessThan = function lessThan(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().lessThan(value));
    };

    FilterQuery.prototype.lessThanOrEqualTo = function lessThanOrEqualTo(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().lessThanOrEqualTo(value));
    };

    FilterQuery.prototype.notEqualTo = function notEqualTo(fieldName, value) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().notEqualTo(value));
    };

    FilterQuery.prototype.in = function _in(fieldName, array) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().in(array));
    };

    FilterQuery.prototype.notIn = function notIn(fieldName, array) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().notIn(array));
    };

    FilterQuery.prototype.mod = function mod(fieldName, _mod) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().mod(_mod));
    };

    FilterQuery.prototype.regex = function regex(fieldName, _regex) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().regex(_regex));
    };

    FilterQuery.prototype.elemMatch = function elemMatch(fieldName, filter) {
        return this.field(fieldName, new _fieldFilter.FieldFilter().elemMatch(filter));
    };

    FilterQuery.prototype.toJSON = function toJSON() {
        var filter = {};
        for (var _iterator3 = this.map, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var _ref4 = _ref3;
            var key = _ref4[0];
            var value = _ref4[1];

            filter[key] = value;
        }
        return filter;
    };

    FilterQuery.fromJSON = function fromJSON(json) {
        return this.fromObject(JSON.parse(json));
    };

    FilterQuery.fromObject = function fromObject(object) {
        var filter = new FilterQuery_1();
        for (var field in object) {
            switch (field) {
                case _groupFilter.GroupFilter.OR:
                    filter.or.apply(filter, object[field].map(function (f) {
                        return FilterQuery_1.fromObject(f);
                    }));
                    break;
                case _groupFilter.GroupFilter.AND:
                    filter.and.apply(filter, object[field].map(function (f) {
                        return FilterQuery_1.fromObject(f);
                    }));
                    break;
                case _groupFilter.GroupFilter.NOT:
                    filter.not.apply(filter, object[field].map(function (f) {
                        return FilterQuery_1.fromObject(f);
                    }));
                    break;
                case _groupFilter.GroupFilter.NOR:
                    filter.nor.apply(filter, object[field].map(function (f) {
                        return FilterQuery_1.fromObject(f);
                    }));
                    break;
                case _textFilter.TextFilter.TEXT:
                    filter.text(_textFilter.TextFilter.fromObject(object[field]));
                    break;
                default:
                    filter.field(field, _fieldFilter.FieldFilter.fromObject(object[field]));
            }
        }
        return filter;
    };

    return FilterQuery;
}();
var FilterQuery = exports.FilterQuery = FilterQuery_1;
FilterQuery.FILTERING_EVENT = "aurelia.persistence.filtering";
exports.FilterQuery = FilterQuery = FilterQuery_1 = __decorate([_aureliaDependencyInjection.autoinject, __metadata('design:paramtypes', [FilterQuery])], FilterQuery);