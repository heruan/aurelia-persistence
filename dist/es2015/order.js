export class Order {
    constructor(property, direction) {
        this.property = property;
        this.direction = direction;
    }
    getProperty() {
        return this.property;
    }
    getDirection() {
        return this.direction;
    }
    toJSON() {
        let order = {};
        order[this.property] = this.direction;
        return order;
    }
}
Order.ASC = 1;
Order.DESC = -1;
Order.NEUTRAL = 0;
//# sourceMappingURL=order.js.map