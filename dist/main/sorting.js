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
var aurelia_utils_1 = require("aurelia-utils");
var order_1 = require("./order");
var Sorting = (function () {
    function Sorting(sorting) {
        this.map = sorting ? new aurelia_utils_1.QueueMap(sorting.map) : new aurelia_utils_1.QueueMap();
    }
    Object.defineProperty(Sorting.prototype, "order", {
        get: function () {
            var sorting = {};
            this.map.forEach(function (order, property) {
                sorting[property] = order.getDirection();
            });
            return sorting;
        },
        set: function (order) {
            this.map.clear();
            for (var property in order) {
                this.by(property, order[property]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Sorting.prototype.by = function (property, direction) {
        var order = new order_1.Order(property, direction);
        if (direction == order_1.Order.NEUTRAL) {
            this.map.delete(property);
        }
        else {
            this.map.set(property, order);
        }
        Object.assign(this.order, this.toJSON());
        return this;
    };
    Sorting.prototype.toggle = function (property) {
        if (this.map.has(property)) {
            var order = this.map.get(property);
            switch (order.getDirection()) {
                case order_1.Order.DESC:
                    this.by(property, order_1.Order.NEUTRAL);
                    break;
                case order_1.Order.ASC:
                    this.by(property, order_1.Order.DESC);
                    break;
                default:
                    this.by(property, order_1.Order.ASC);
            }
        }
        else {
            this.by(property, order_1.Order.ASC);
        }
        return this;
    };
    Sorting.prototype.copy = function () {
        return new Sorting(this);
    };
    Sorting.prototype.toJSON = function () {
        return this.order;
    };
    Sorting.fromJSON = function (object) {
        var filter = new Sorting();
        filter.order = object;
        return filter;
    };
    return Sorting;
}());
Sorting.SORTING_EVENT = "aurelia.persistence.sorting";
Sorting = __decorate([
    aurelia_dependency_injection_1.autoinject,
    __metadata("design:paramtypes", [Sorting])
], Sorting);
exports.Sorting = Sorting;
