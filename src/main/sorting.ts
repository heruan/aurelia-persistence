import { autoinject} from "aurelia-dependency-injection";
import { QueueMap} from "aurelia-utils";
import { Order} from "./order";

@autoinject
export class Sorting {

    public static SORTING_EVENT: string = "aurelia.persistence.sorting";

    private map: QueueMap<string, Order>;

    public constructor(sorting?: Sorting) {
        this.map = sorting ? new QueueMap<string, Order>(sorting.map) : new QueueMap<string, Order>();
    }

    get order(): Object {
        let sorting = { };
        this.map.forEach((order, property: string) => {
            sorting[property] = order.getDirection();
        });
        return sorting;
    }

    set order(order: Object) {
        this.map.clear();
        for (let property in order) {
            this.by(property, order[property]);
        }
    }

    public by(property: string, direction: number): Sorting {
        let order = new Order(property, direction);
        if (direction == Order.NEUTRAL) {
            this.map.delete(property);
        } else {
            this.map.set(property, order);
        }
        Object.assign(this.order, this.toJSON());
        return this;
    }

    public toggle(property: string): Sorting {
        if (this.map.has(property)) {
            let order = this.map.get(property);
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

    public copy(): Sorting {
        return new Sorting(this);
    }

    public toJSON(): Object {
        return this.order;
    }

    public static fromJSON(object: Object): Sorting {
        let filter = new Sorting();
        filter.order = object;
        return filter;
    }

}
