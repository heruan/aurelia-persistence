"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var Order;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("Order", Order = function () {
                function Order(property, direction) {
                    _classCallCheck(this, Order);

                    this.property = property;
                    this.direction = direction;
                }

                Order.prototype.getProperty = function getProperty() {
                    return this.property;
                };

                Order.prototype.getDirection = function getDirection() {
                    return this.direction;
                };

                Order.prototype.toJSON = function toJSON() {
                    var order = {};
                    order[this.property] = this.direction;
                    return order;
                };

                return Order;
            }());

            _export("Order", Order);

            Order.ASC = 1;
            Order.DESC = -1;
            Order.NEUTRAL = 0;
        }
    };
});