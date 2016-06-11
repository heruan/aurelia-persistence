import {autoinject} from "aurelia-dependency-injection";
import {QueueMap} from "aurelia-utils";
import {Order} from "./order";

@autoinject
export class Sorting {

    public static SORTING_EVENT: string = "aurelia.persistence.sorting";

    private orderMap: QueueMap<string, Order>;

    private order: Object = {};

    private position: Object = {};

    public constructor() {
        this.orderMap = new QueueMap<string, Order>();
    }

    public by(property: string, direction: number): Sorting {
        let order = new Order(property, direction);
        this.order[property] = direction;
        if (direction == Order.NEUTRAL) {
            this.orderMap.delete(property);
            this.position[property] = direction;
        } else {
            this.orderMap.set(property, order);
        }
        let position = 1;
        for (let p in this.toJSON()) {
            this.position[p] = position++;
        }
        return this;
    }

    public toggle(property: string): Sorting {
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
        } else {
            this.by(property, Order.ASC);
        }
        return this;
    }

    public toJSON(): any {
        let sorting = {};
        let toArray = JSON.parse(JSON.stringify(this.orderMap.toJSON()));
        let orderMap = new Map(toArray.reverse());
        orderMap.forEach((order, property: string) => {
            Object.assign(sorting, order);
        });
        return sorting;
    }

}
