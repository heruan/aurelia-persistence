define(["exports", "aurelia-dependency-injection", "aurelia-utils", "./order"], function (exports, _aureliaDependencyInjection, _aureliaUtils, _order) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Sorting = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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
    var Sorting = exports.Sorting = function () {
        function Sorting() {
            _classCallCheck(this, Sorting);

            this.order = {};
            this.position = {};
            this.orderMap = new _aureliaUtils.QueueMap();
        }

        Sorting.prototype.by = function by(property, direction) {
            var order = new _order.Order(property, direction);
            this.order[property] = direction;
            if (direction == _order.Order.NEUTRAL) {
                this.orderMap.delete(property);
                this.position[property] = direction;
            } else {
                this.orderMap.set(property, order);
            }
            var position = 1;
            for (var p in this.toJSON()) {
                this.position[p] = position++;
            }
            return this;
        };

        Sorting.prototype.toggle = function toggle(property) {
            if (this.orderMap.has(property)) {
                var order = this.orderMap.get(property);
                switch (order.getDirection()) {
                    case _order.Order.DESC:
                        this.by(property, _order.Order.NEUTRAL);
                        break;
                    case _order.Order.ASC:
                        this.by(property, _order.Order.DESC);
                        break;
                    default:
                        this.by(property, _order.Order.ASC);
                }
            } else {
                this.by(property, _order.Order.ASC);
            }
            return this;
        };

        Sorting.prototype.toJSON = function toJSON() {
            var sorting = {};
            var toArray = JSON.parse(JSON.stringify(this.orderMap.toJSON()));
            var orderMap = new Map(toArray.reverse());
            orderMap.forEach(function (order, property) {
                Object.assign(sorting, order);
            });
            return sorting;
        };

        return Sorting;
    }();
    Sorting.SORTING_EVENT = "aurelia.persistence.sorting";
    exports.Sorting = Sorting = __decorate([_aureliaDependencyInjection.autoinject, __metadata('design:paramtypes', [])], Sorting);
});