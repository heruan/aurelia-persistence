"use strict";

System.register(["./filter-query"], function (_export, _context) {
    "use strict";

    var FilterQuery, FieldFilter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_filterQuery) {
            FilterQuery = _filterQuery.FilterQuery;
        }],
        execute: function () {
            _export("FieldFilter", FieldFilter = function () {
                function FieldFilter() {
                    _classCallCheck(this, FieldFilter);

                    this.map = new Map();
                }

                FieldFilter.prototype.equalTo = function equalTo(value) {
                    this.map.set(FieldFilter.EQ, value);
                    return this;
                };

                FieldFilter.prototype.greaterThan = function greaterThan(value) {
                    this.map.set(FieldFilter.GT, value);
                    return this;
                };

                FieldFilter.prototype.greaterThanOrEqualTo = function greaterThanOrEqualTo(value) {
                    this.map.set(FieldFilter.GTE, value);
                    return this;
                };

                FieldFilter.prototype.lessThan = function lessThan(value) {
                    this.map.set(FieldFilter.LT, value);
                    return this;
                };

                FieldFilter.prototype.lessThanOrEqualTo = function lessThanOrEqualTo(value) {
                    this.map.set(FieldFilter.LTE, value);
                    return this;
                };

                FieldFilter.prototype.notEqualTo = function notEqualTo(value) {
                    this.map.set(FieldFilter.NE, value);
                    return this;
                };

                FieldFilter.prototype.in = function _in(array) {
                    this.map.set(FieldFilter.IN, array);
                    return this;
                };

                FieldFilter.prototype.notIn = function notIn(array) {
                    this.map.set(FieldFilter.NIN, array);
                    return this;
                };

                FieldFilter.prototype.mod = function mod(_mod) {
                    this.map.set(FieldFilter.MOD, _mod);
                    return this;
                };

                FieldFilter.prototype.regex = function regex(_regex) {
                    this.map.set(FieldFilter.REGEX, _regex);
                    return this;
                };

                FieldFilter.prototype.elemMatch = function elemMatch(filter) {
                    this.map.set(FieldFilter.ELEM_MATCH, filter);
                    return this;
                };

                FieldFilter.prototype.toJSON = function toJSON() {
                    var filter = {};
                    for (var _iterator = this.map, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var _ref2 = _ref;
                        var key = _ref2[0];
                        var value = _ref2[1];

                        filter[key] = value;
                    }
                    return filter;
                };

                FieldFilter.fromJSON = function fromJSON(json) {
                    return this.fromObject(JSON.parse(json));
                };

                FieldFilter.fromObject = function fromObject(object) {
                    var filter = new FieldFilter();
                    for (var field in object) {
                        switch (field) {
                            case FieldFilter.ELEM_MATCH:
                                filter.elemMatch(FilterQuery.fromObject(object[field]));
                                break;
                            default:
                                filter.map.set(field, object[field]);
                        }
                    }
                    return filter;
                };

                return FieldFilter;
            }());

            _export("FieldFilter", FieldFilter);

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
        }
    };
});