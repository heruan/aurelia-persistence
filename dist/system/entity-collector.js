"use strict";

System.register(["./entity-service", "./filter-query"], function (_export, _context) {
    "use strict";

    var EntityService, FilterQuery, EntityCollector;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_entityService) {
            EntityService = _entityService.EntityService;
        }, function (_filterQuery) {
            FilterQuery = _filterQuery.FilterQuery;
        }],
        execute: function () {
            _export("EntityCollector", EntityCollector = function () {
                function EntityCollector(name, entityService) {
                    var defaultFilter = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                    var relation = arguments.length <= 3 || arguments[3] === undefined ? "list" : arguments[3];
                    var properties = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

                    _classCallCheck(this, EntityCollector);

                    this.filterBindings = {};
                    this.limit = 10;
                    this.skip = 0;
                    this.countTotal = 0;
                    this.countFilter = 0;
                    this.entities = [];
                    this.loading = false;
                    this.name = name;
                    this.defaultFilter = defaultFilter;
                    this.currentFilter = this.defaultFilter;
                    this.entityService = entityService;
                    this.relation = relation;
                    this.properties = properties;
                }

                EntityCollector.prototype.setEntities = function setEntities(promise) {
                    promise.then(this.replaceEntities.bind(this));
                };

                EntityCollector.prototype.retrieve = function retrieve() {
                    var limit = arguments.length <= 0 || arguments[0] === undefined ? this.limit : arguments[0];
                    var skip = arguments.length <= 1 || arguments[1] === undefined ? this.skip : arguments[1];

                    return this.load(limit, skip).then(this.replaceEntities.bind(this));
                };

                EntityCollector.prototype.retrieveMore = function retrieveMore() {
                    var _this = this;

                    var increment = arguments.length <= 0 || arguments[0] === undefined ? EntityCollector.SCROLL_RETRIEVE_INCREMENT : arguments[0];

                    var skip = this.limit;
                    return this.load(increment, skip).then(this.concatEntities.bind(this)).then(function (success) {
                        return _this.limit += increment;
                    });
                };

                EntityCollector.prototype.load = function load(limit, skip) {
                    var _this2 = this;

                    this.loading = true;
                    var path = this.entityService.link(this.relation);
                    return this.entityService.searchMessage(this.name, path, this.currentFilter, limit, skip, this.defaultSorting, this.properties).then(function (success) {
                        _this2.loading = false;
                        _this2.countTotal = +success.headers.get(EntityService.COUNT_TOTAL_HEADER);
                        _this2.countFilter = +success.headers.get(EntityService.COUNT_FILTER_HEADER);
                        return success.content;
                    }, function (failure) {
                        _this2.loading = false;
                    });
                };

                EntityCollector.prototype.replaceEntities = function replaceEntities(entities) {
                    return this.entities = entities;
                };

                EntityCollector.prototype.concatEntities = function concatEntities(entities) {
                    for (var _iterator = entities, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var entity = _ref;

                        if (this.entities.indexOf(entity) < 0) {
                            this.entities.push(entity);
                        }
                    }
                    return this.entities;
                };

                EntityCollector.prototype.filter = function filter(callback, value) {
                    var callbackFilter = null;
                    if (value !== undefined) {
                        callbackFilter = new FilterQuery();
                        callback.call(callbackFilter, callbackFilter, value);
                    } else {
                        this.currentFilter = this.defaultFilter;
                    }
                    if (callbackFilter !== null && this.defaultFilter !== null) {
                        this.currentFilter = new FilterQuery().and(callbackFilter, this.defaultFilter);
                    } else if (callbackFilter === null && this.defaultFilter !== null) {
                        this.currentFilter = this.defaultFilter;
                    } else {
                        this.currentFilter = callbackFilter;
                    }
                    if (this.currentFilter !== null) {
                        this.retrieve(this.limit, 0);
                    } else {
                        this.entities = [];
                    }
                };

                EntityCollector.prototype.activate = function activate() {
                    return this.retrieve();
                };

                return EntityCollector;
            }());

            _export("EntityCollector", EntityCollector);

            EntityCollector.SCROLL_RETRIEVE_INCREMENT = 10;
        }
    };
});