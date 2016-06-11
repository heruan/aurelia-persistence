var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-dependency-injection";
import { QueueMap } from "aurelia-utils";
import { Order } from "./order";
export let Sorting = class Sorting {
    constructor() {
        this.order = {};
        this.position = {};
        this.orderMap = new QueueMap();
    }
    by(property, direction) {
        let order = new Order(property, direction);
        this.order[property] = direction;
        if (direction == Order.NEUTRAL) {
            this.orderMap.delete(property);
            this.position[property] = direction;
        }
        else {
            this.orderMap.set(property, order);
        }
        let position = 1;
        for (let p in this.toJSON()) {
            this.position[p] = position++;
        }
        return this;
    }
    toggle(property) {
        if (this.orderMap.has(property)) {
            let order = this.orderMap.get(property);
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
        }
        else {
            this.by(property, Order.ASC);
        }
        return this;
    }
    toJSON() {
        let sorting = {};
        let toArray = JSON.parse(JSON.stringify(this.orderMap.toJSON()));
        let orderMap = new Map(toArray.reverse());
        orderMap.forEach((order, property) => {
            Object.assign(sorting, order);
        });
        return sorting;
    }
};
Sorting.SORTING_EVENT = "aurelia.persistence.sorting";
Sorting = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [])
], Sorting);
//# sourceMappingURL=sorting.js.map