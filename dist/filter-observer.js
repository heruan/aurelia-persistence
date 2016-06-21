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
var aurelia_dependency_injection_2 = require("aurelia-dependency-injection");
var aurelia_binding_1 = require("aurelia-binding");
var FilterObserver = (function () {
    function FilterObserver(bindingEngine) {
        this.filterBindings = {};
        this.collectors = {};
        this.bindingDisposables = [];
        this.bindingEngine = bindingEngine;
    }
    FilterObserver.prototype.on = function (property, callback, entityCollector) {
        var _this = this;
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.propertyObserver(this.filterBindings, property).subscribe(function (value) {
            _this.collectors[property].filter(callback, value);
        }));
        return entityCollector;
    };
    FilterObserver.prototype.onCollection = function (property, callback, entityCollector) {
        var _this = this;
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.collectionObserver(this.filterBindings[property]).subscribe(function (slices) {
            _this.collectors[property].filter(callback, _this.filterBindings[property]);
        }));
        return entityCollector;
    };
    Object.defineProperty(FilterObserver.prototype, "activate", {
        get: function () {
            var promises = [];
            for (var property in this.collectors) {
                promises.push(this.collectors[property].activate());
            }
            return Promise.all(promises);
        },
        enumerable: true,
        configurable: true
    });
    FilterObserver.prototype.getCollector = function (property) {
        return this.collectors[property];
    };
    FilterObserver.prototype.disposeAll = function () {
        this.bindingDisposables.forEach(function (disposable) { return disposable.dispose(); });
    };
    FilterObserver = __decorate([
        aurelia_dependency_injection_1.autoinject,
        aurelia_dependency_injection_2.transient(), 
        __metadata('design:paramtypes', [aurelia_binding_1.BindingEngine])
    ], FilterObserver);
    return FilterObserver;
}());
exports.FilterObserver = FilterObserver;
//# sourceMappingURL=filter-observer.js.map