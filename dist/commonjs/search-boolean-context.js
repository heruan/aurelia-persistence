"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBooleanContext = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _searchBooleanQuery = require("./search-boolean-query");

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
var SearchBooleanContext = exports.SearchBooleanContext = function () {
    function SearchBooleanContext() {
        _classCallCheck(this, SearchBooleanContext);

        this.map = new Map();
    }

    SearchBooleanContext.prototype.must = function must() {
        var _bool;

        for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
            queries[_key] = arguments[_key];
        }

        return (_bool = this.bool).call.apply(_bool, [this, _searchBooleanQuery.SearchBooleanQuery.MUST].concat(queries));
    };

    SearchBooleanContext.prototype.should = function should() {
        var _bool2;

        for (var _len2 = arguments.length, queries = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            queries[_key2] = arguments[_key2];
        }

        return (_bool2 = this.bool).call.apply(_bool2, [this, _searchBooleanQuery.SearchBooleanQuery.SHOULD].concat(queries));
    };

    SearchBooleanContext.prototype.bool = function bool(booleanAggregator) {
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, new _searchBooleanQuery.SearchBooleanQuery());
        }
        var booleanSearch = this.map.get(booleanAggregator);

        for (var _len3 = arguments.length, queries = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            queries[_key3 - 1] = arguments[_key3];
        }

        for (var _iterator = queries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var query = _ref;

            booleanSearch.add(query);
        }
        return this;
    };

    SearchBooleanContext.prototype.unsetMust = function unsetMust() {
        var _unsetBool;

        for (var _len4 = arguments.length, queries = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            queries[_key4] = arguments[_key4];
        }

        return (_unsetBool = this.unsetBool).call.apply(_unsetBool, [this, _searchBooleanQuery.SearchBooleanQuery.MUST].concat(queries));
    };

    SearchBooleanContext.prototype.unsetShould = function unsetShould() {
        var _unsetBool2;

        for (var _len5 = arguments.length, queries = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            queries[_key5] = arguments[_key5];
        }

        return (_unsetBool2 = this.unsetBool).call.apply(_unsetBool2, [this, _searchBooleanQuery.SearchBooleanQuery.SHOULD].concat(queries));
    };

    SearchBooleanContext.prototype.unsetBool = function unsetBool(booleanAggregator) {
        if (this.map.has(booleanAggregator)) {
            var booleanSearch = this.map.get(booleanAggregator);

            for (var _len6 = arguments.length, queries = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                queries[_key6 - 1] = arguments[_key6];
            }

            for (var _iterator2 = queries, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var query = _ref2;

                booleanSearch.remove(query);
            }
            if (booleanSearch.size == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    };

    SearchBooleanContext.prototype.toJSON = function toJSON() {
        if (this.map.size === 0) {
            return {};
        } else {
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
            return {
                "$bool": filter
            };
        }
    };

    return SearchBooleanContext;
}();
SearchBooleanContext.BOOLEAN_CONTEXT = "$bool";
exports.SearchBooleanContext = SearchBooleanContext = __decorate([_aureliaDependencyInjection.autoinject, __metadata('design:paramtypes', [])], SearchBooleanContext);