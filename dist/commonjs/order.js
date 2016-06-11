"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order = exports.Order = function () {
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
}();

Order.ASC = 1;
Order.DESC = -1;
Order.NEUTRAL = 0;