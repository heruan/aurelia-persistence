"use strict";

System.register(["aurelia-dependency-injection", "aurelia-utils", "./order"], function (_export, _context) {
    "use strict";

    var autoinject, QueueMap, Order, _typeof, __decorate, __metadata, Sorting;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDependencyInjection) {
            autoinject = _aureliaDependencyInjection.autoinject;
        }, function (_aureliaUtils) {
            QueueMap = _aureliaUtils.QueueMap;
        }, function (_order) {
            Order = _order.Order;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export("Sorting", Sorting = function () {
                function Sorting() {
                    _classCallCheck(this, Sorting);

                    this.order = {};
                    this.position = {};
                    this.orderMap = new QueueMap();
                }

                Sorting.prototype.by = function by(property, direction) {
                    var order = new Order(property, direction);
                    this.order[property] = direction;
                    if (direction == Order.NEUTRAL) {
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
                            case Order.DESC:
                                this.by(property, Order.NEUTRAL);
                                break;
                            case Order.ASC:
                                this.by(property, Order.DESC);
                                break;
                            default:
                                this.by(property, Order.ASC);
                        }
                    } else {
                        this.by(property, Order.ASC);
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
            }());

            _export("Sorting", Sorting);

            Sorting.SORTING_EVENT = "aurelia.persistence.sorting";
            _export("Sorting", Sorting = __decorate([autoinject, __metadata('design:paramtypes', [])], Sorting));
        }
    };
});