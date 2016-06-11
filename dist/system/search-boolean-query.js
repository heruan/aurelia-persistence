"use strict";

System.register(["./search-query"], function (_export, _context) {
    "use strict";

    var SearchQuery, _createClass, SearchBooleanQuery;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_searchQuery) {
            SearchQuery = _searchQuery.SearchQuery;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("SearchBooleanQuery", SearchBooleanQuery = function (_SearchQuery) {
                _inherits(SearchBooleanQuery, _SearchQuery);

                function SearchBooleanQuery() {
                    _classCallCheck(this, SearchBooleanQuery);

                    var _this = _possibleConstructorReturn(this, _SearchQuery.call(this));

                    _this.bool = new Set();
                    return _this;
                }

                SearchBooleanQuery.prototype.add = function add(query) {
                    this.bool.add(query);
                    return this;
                };

                SearchBooleanQuery.prototype.remove = function remove(query) {
                    this.bool.delete(query);
                    return this;
                };

                SearchBooleanQuery.prototype.toJSON = function toJSON() {
                    var entries = [];
                    this.bool.forEach(function (query) {
                        return entries.push(query);
                    });
                    return entries;
                };

                _createClass(SearchBooleanQuery, [{
                    key: "size",
                    get: function get() {
                        return this.bool.size;
                    }
                }]);

                return SearchBooleanQuery;
            }(SearchQuery));

            _export("SearchBooleanQuery", SearchBooleanQuery);

            SearchBooleanQuery.MUST = "$must";
            SearchBooleanQuery.SHOULD = "$should";
        }
    };
});