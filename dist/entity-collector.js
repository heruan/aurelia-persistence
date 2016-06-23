"use strict";
var sorting_1 = require("./sorting");
var filter_query_1 = require("./filter-query");
var EntityCollector = (function () {
    function EntityCollector(dataAccessObject, defaultSorting, defaultFilter, properties) {
        if (defaultSorting === void 0) { defaultSorting = new sorting_1.Sorting(); }
        if (defaultFilter === void 0) { defaultFilter = new filter_query_1.FilterQuery(); }
        this.filterBindings = {};
        this.limit = 10;
        this.skip = 0;
        this.countTotal = 0;
        this.countFilter = 0;
        this.entities = [];
        this.loading = false;
        this.defaultSorting = defaultSorting;
        this.defaultFilter = defaultFilter;
        this.currentFilter = new filter_query_1.FilterQuery().and(this.defaultFilter);
        this.dataAccessObject = dataAccessObject;
        this.properties = properties;
    }
    EntityCollector.prototype.setEntities = function (promise) {
        promise.then(this.replaceEntities.bind(this));
    };
    EntityCollector.prototype.retrieve = function (limit, skip) {
        if (limit === void 0) { limit = this.limit; }
        if (skip === void 0) { skip = this.skip; }
        return this.load(limit, skip).then(this.replaceEntities.bind(this));
    };
    EntityCollector.prototype.retrieveMore = function (increment) {
        var _this = this;
        if (increment === void 0) { increment = EntityCollector.SCROLL_RETRIEVE_INCREMENT; }
        var skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(function (success) { return _this.limit += increment; });
    };
    EntityCollector.prototype.load = function (limit, skip) {
        var _this = this;
        if (this.retrievePromise) {
            this.retrievePromise.cancel();
        }
        this.loading = true;
        this.dataAccessObject.count().then(function (countTotal) { return _this.countTotal = countTotal; });
        this.dataAccessObject.count(this.currentFilter).then(function (countFilter) { return _this.countFilter = countFilter; });
        this.retrievePromise = this.dataAccessObject.findAll(this.currentFilter, limit, skip, this.defaultSorting, this.properties);
        return this.retrievePromise.then(function (entities) {
            _this.loading = false;
            return entities;
        }, function (failure) {
            _this.loading = false;
            throw failure;
        });
    };
    EntityCollector.prototype.replaceEntities = function (entities) {
        return this.entities = entities;
    };
    EntityCollector.prototype.concatEntities = function (entities) {
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        }
        return this.entities;
    };
    EntityCollector.prototype.filter = function (callback, value) {
        if (value !== undefined) {
            callback.call(this, this.currentFilter, value);
        }
        else {
            this.currentFilter = this.defaultFilter;
        }
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        }
        else {
            this.entities = [];
        }
    };
    EntityCollector.SCROLL_RETRIEVE_INCREMENT = 10;
    return EntityCollector;
}());
exports.EntityCollector = EntityCollector;
//# sourceMappingURL=entity-collector.js.map