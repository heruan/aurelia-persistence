define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SearchTermQuery = function () {
        function SearchTermQuery() {
            _classCallCheck(this, SearchTermQuery);

            this.map = new Map();
        }

        SearchTermQuery.prototype.wildcard = function wildcard() {
            var _wildcard = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            this.map.set(SearchTermQuery.WILDCARD, _wildcard);
            return this;
        };

        SearchTermQuery.prototype.fields = function fields(_fields) {
            this.map.set(SearchTermQuery.FIELDS, _fields);
            return this;
        };

        SearchTermQuery.prototype.matching = function matching(_matching) {
            this.map.set(SearchTermQuery.MATCHING, _matching);
            return this;
        };

        SearchTermQuery.prototype.toJSON = function toJSON() {
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
            return { "$keyword": filter };
        };

        return SearchTermQuery;
    }();

    exports.SearchTermQuery = SearchTermQuery;

    SearchTermQuery.FIELDS = "$fields";
    SearchTermQuery.MATCHING = "$matching";
    SearchTermQuery.WILDCARD = "$wildcard";
});