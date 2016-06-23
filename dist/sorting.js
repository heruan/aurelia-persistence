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
    function Sorting() {
        this.order = {};
        this.position = {};
        this.orderMap = new aurelia_utils_1.QueueMap();
    }
    Sorting.prototype.by = function (property, direction) {
        var order = new order_1.Order(property, direction);
        this.order[property] = direction;
        if (direction == order_1.Order.NEUTRAL) {
            this.orderMap.delete(property);
            this.position[property] = direction;
        }
        else {
            this.orderMap.set(property, order);
        }
        var position = 1;
        for (var p in this.toJSON()) {
            this.position[p] = position++;
        }
        return this;
    };
    Sorting.prototype.toggle = function (property) {
        if (this.orderMap.has(property)) {
            var order = this.orderMap.get(property);
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
    Sorting.prototype.toJSON = function () {
        var sorting = {};
        this.orderMap.forEach(function (order, property) {
            sorting[property] = order.getDirection();
        });
        return sorting;
    };
    Sorting.SORTING_EVENT = "aurelia.persistence.sorting";
    Sorting = __decorate([
        aurelia_dependency_injection_1.autoinject, 
        __metadata('design:paramtypes', [])
    ], Sorting);
    return Sorting;
}());
exports.Sorting = Sorting;
//# sourceMappingURL=sorting.js.map