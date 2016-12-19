"use strict";
var Order = (function () {
    function Order(property, direction) {
        this.property = property;
        this.direction = direction;
    }
    Order.prototype.getProperty = function () {
        return this.property;
    };
    Order.prototype.getDirection = function () {
        return this.direction;
    };
    Order.prototype.toJSON = function () {
        var order = {};
        order[this.property] = this.direction;
        return order;
    };
    return Order;
}());
Order.ASC = 1;
Order.DESC = -1;
Order.NEUTRAL = 0;
exports.Order = Order;

//# sourceMappingURL=order.js.map
