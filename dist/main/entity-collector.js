"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_task_queue_1 = require("aurelia-task-queue");
var sorting_1 = require("./sorting");
var filter_query_1 = require("./filter-query");
var filter_binding_1 = require("./filter-binding");
var EntityCollector = EntityCollector_1 = (function (_super) {
    __extends(EntityCollector, _super);
    function EntityCollector(bindingEngine, taskQueue, entityService, sorting, defaultFilter, properties) {
        if (sorting === void 0) { sorting = new sorting_1.Sorting(); }
        if (defaultFilter === void 0) { defaultFilter = new filter_query_1.FilterQuery(); }
        var _this = _super.call(this) || this;
        _this.loadCancelables = [];
        _this.countCancelables = [];
        _this.disposables = [];
        _this.limit = 25;
        _this.skip = 0;
        _this.countTotal = 0;
        _this.countFilter = 0;
        _this.entities = [];
        _this.bindings = {};
        _this.properties = [];
        _this.loading = false;
        _this.bindingEngine = bindingEngine;
        _this.taskQueue = taskQueue;
        _this.sorting = sorting;
        _this.defaultFilter = defaultFilter;
        _this.currentFilter = new filter_query_1.FilterQuery();
        _this.entityService = entityService;
        _this.properties = properties;
        return _this;
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
        Array.isArray(this.bindings[property]) || (this.bindings[property] = []);
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
        var cancelable = this.entityService.count(new filter_query_1.FilterQuery().and(this.defaultFilter, filter));
        this.countCancelables.push(cancelable);
        return cancelable;
    };
    EntityCollector.prototype.applyFilter = function (callback, value) {
        callback.call(this, this.currentFilter, value);
    };
    EntityCollector.prototype.activate = function (filter) {
        var _this = this;
        Object.keys(this.bindings).forEach(function (key) {
            if (Array.isArray(_this.bindings[key])) {
                var array = _this.bindings[key];
                var replace = Array.isArray(filter.bindings[key]) ? filter.bindings[key] : [];
                array.splice.apply(array, [0, array.length].concat(replace));
            }
            else if (filter.bindings && filter.bindings.hasOwnProperty(key)) {
                _this.bindings[key] = filter.bindings[key];
            }
            else {
                _this.bindings[key] = undefined;
            }
        });
        this.taskQueue.flushMicroTaskQueue();
        // this.currentFilter = filter.query.copy();
        this.sorting = new sorting_1.Sorting(filter.sorting);
        this.entities.splice(0);
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
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
        return new filter_binding_1.FilterBinding(name, new filter_query_1.FilterQuery(this.currentFilter), new sorting_1.Sorting(this.sorting), bindings, this.countFilter);
    };
    EntityCollector.prototype.reset = function () {
        for (var field in this.bindings) {
            if (Array.isArray(this.bindings[field])) {
                this.bindings[field].splice(0);
            }
            else {
                this.bindings[field] = undefined;
            }
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
        if (increment === void 0) { increment = EntityCollector_1.SCROLL_RETRIEVE_INCREMENT; }
        var skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(function (success) { return _this.limit += increment; });
    };
    EntityCollector.prototype.hasMore = function () {
        return this.entities.length < this.countFilter;
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
        var countTotalRequest = this.entityService.count();
        var countFilterRequest = this.entityService.count(this.currentFilter);
        var retrieveRequest = this.entityService.findAll(loadFilter, limit, skip, this.sorting, this.properties);
        this.loadCancelables = [countTotalRequest, countFilterRequest, retrieveRequest];
        return Promise.all(this.loadCancelables).then(function (success) {
            var countTotal = success[0], countFilter = success[1], entities = success[2];
            _this.loading = false;
            _this.countTotal = countTotal;
            _this.countFilter = countFilter;
            _this.publish(EntityCollector_1.ENTITIES_LOADED, entities);
            return entities;
        });
    };
    return EntityCollector;
}(aurelia_event_aggregator_1.EventAggregator));
EntityCollector.ENTITIES_LOADED = "entities.loaded";
EntityCollector.SCROLL_RETRIEVE_INCREMENT = 25;
EntityCollector = EntityCollector_1 = __decorate([
    aurelia_dependency_injection_1.inject(aurelia_binding_1.BindingEngine, aurelia_task_queue_1.TaskQueue),
    __metadata("design:paramtypes", [aurelia_binding_1.BindingEngine, aurelia_task_queue_1.TaskQueue, Object, sorting_1.Sorting, filter_query_1.FilterQuery, Array])
], EntityCollector);
exports.EntityCollector = EntityCollector;
var EntityCollector_1;

//# sourceMappingURL=entity-collector.js.map
