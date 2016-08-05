"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_task_queue_1 = require("aurelia-task-queue");
var sorting_1 = require("./sorting");
var filter_query_1 = require("./filter-query");
var filter_binding_1 = require("./filter-binding");
var EntityCollector = (function () {
    function EntityCollector(bindingEngine, taskQueue, dataAccessObject, sorting, defaultFilter, properties) {
        if (sorting === void 0) { sorting = new sorting_1.Sorting(); }
        if (defaultFilter === void 0) { defaultFilter = new filter_query_1.FilterQuery(); }
        this.limit = 10;
        this.skip = 0;
        this.countTotal = 0;
        this.countFilter = 0;
        this.entities = [];
        this.loadCancelables = [];
        this.countCancelables = [];
        this.disposables = [];
        this.loading = false;
        this.bindings = {};
        this.properties = [];
        this.bindingEngine = bindingEngine;
        this.taskQueue = taskQueue;
        this.sorting = sorting;
        this.defaultFilter = defaultFilter;
        this.currentFilter = new filter_query_1.FilterQuery();
        this.dataAccessObject = dataAccessObject;
        this.properties = properties;
    }
    EntityCollector.prototype.setDefaultFilter = function (filter) {
        this.defaultFilter = filter;
    };
    EntityCollector.prototype.setSorting = function (sorting) {
        this.sorting = sorting;
    };
    EntityCollector.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    EntityCollector.prototype.on = function (property, callback, autoRetrieve) {
        var _this = this;
        if (autoRetrieve === void 0) { autoRetrieve = false; }
        this.disposables.push(this.bindingEngine.propertyObserver(this.bindings, property).subscribe(function (value) {
            _this.applyFilter(callback, value);
            if (autoRetrieve) {
                _this.retrieve();
            }
        }));
        return this;
    };
    EntityCollector.prototype.onCollection = function (property, callback, autoRetrieve) {
        var _this = this;
        if (autoRetrieve === void 0) { autoRetrieve = false; }
        this.disposables.push(this.bindingEngine.collectionObserver(this.bindings[property]).subscribe(function (slices) {
            _this.applyFilter(callback, _this.bindings[property]);
            if (autoRetrieve) {
                _this.retrieve();
            }
        }));
        return this;
    };
    EntityCollector.prototype.count = function (filter) {
        if (filter === void 0) { filter = this.currentFilter; }
        var cancelable = this.dataAccessObject.count(new filter_query_1.FilterQuery().and(this.defaultFilter, filter));
        this.countCancelables.push(cancelable);
        return cancelable;
    };
    EntityCollector.prototype.applyFilter = function (callback, value) {
        if (value !== undefined) {
            callback.call(this, this.currentFilter, value);
        }
    };
    EntityCollector.prototype.activate = function (filter) {
        Object.assign(this.bindings, filter.bindings);
        this.sorting = filter.sorting.copy();
        this.taskQueue.flushMicroTaskQueue();
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        }
        else {
            this.entities = [];
        }
    };
    EntityCollector.prototype.save = function (name) {
        var bindings = {};
        for (var key in this.bindings) {
            if (Array.isArray(this.bindings[key])) {
                bindings[key] = this.bindings[key].slice();
            }
            else {
                bindings[key] = this.bindings[key];
            }
        }
        return new filter_binding_1.FilterBinding(name, this.currentFilter.copy(), this.sorting.copy(), bindings, this.countFilter);
    };
    EntityCollector.prototype.reset = function () {
        for (var field in this.bindings) {
            this.bindings[field] = undefined;
        }
        this.currentFilter = new filter_query_1.FilterQuery();
        this.sorting = new sorting_1.Sorting();
    };
    EntityCollector.prototype.dispose = function () {
        this.disposables.forEach(function (disposable) { return disposable.dispose(); });
        this.loadCancelables.forEach(function (cancelable) { return cancelable.cancel(); });
        this.countCancelables.forEach(function (cancelable) { return cancelable.cancel(); });
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
    EntityCollector.prototype.load = function (limit, skip) {
        var _this = this;
        this.loadCancelables.forEach(function (cancelable) { return cancelable.cancel(); });
        this.loading = true;
        var loadFilter = new filter_query_1.FilterQuery().and(this.defaultFilter, this.currentFilter);
        var countTotalRequest = this.dataAccessObject.count();
        var countFilterRequest = this.dataAccessObject.count(this.currentFilter);
        var retrieveRequest = this.dataAccessObject.findAll(loadFilter, limit, skip, this.sorting, this.properties);
        this.loadCancelables = [countTotalRequest, countFilterRequest, retrieveRequest];
        return Promise.all(this.loadCancelables).then(function (success) {
            var countTotal = success[0], countFilter = success[1], entities = success[2];
            _this.loading = false;
            _this.countTotal = countTotal;
            _this.countFilter = countFilter;
            return entities;
        });
    };
    EntityCollector.SCROLL_RETRIEVE_INCREMENT = 10;
    EntityCollector = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_binding_1.BindingEngine, aurelia_task_queue_1.TaskQueue), 
        __metadata('design:paramtypes', [aurelia_binding_1.BindingEngine, aurelia_task_queue_1.TaskQueue, Object, sorting_1.Sorting, filter_query_1.FilterQuery, Array])
    ], EntityCollector);
    return EntityCollector;
}());
exports.EntityCollector = EntityCollector;
