import {FilterQuery} from "./filter-query";

export class FieldFilter {

    public static EQ: string = "$eq";

    public static GT: string = "$gt";

    public static GTE: string = "$gte";

    public static LT: string = "$lt";

    public static LTE: string = "$lte";

    public static NE: string = "$ne";

    public static IN: string = "$in";

    public static NIN: string = "$nin";

    public static MOD: string = "$mod";

    public static REGEX: string = "$regex";

    public static ELEM_MATCH: string = "$elemMatch";

    private map: Map<string, any>;

    public constructor() {
        this.map = new Map<string, any>();
    }

    public equalTo(value: any): FieldFilter {
        this.map.set(FieldFilter.EQ, value);
        return this;
    }

    public greaterThan(value: any): FieldFilter {
        this.map.set(FieldFilter.GT, value);
        return this;
    }

    public greaterThanOrEqualTo(value: any): FieldFilter {
        this.map.set(FieldFilter.GTE, value);
        return this;
    }

    public lessThan(value: any): FieldFilter {
        this.map.set(FieldFilter.LT, value);
        return this;
    }

    public lessThanOrEqualTo(value: any): FieldFilter {
        this.map.set(FieldFilter.LTE, value);
        return this;
    }

    public notEqualTo(value: any): FieldFilter {
        this.map.set(FieldFilter.NE, value);
        return this;
    }

    public in(array: any[]): FieldFilter {
        this.map.set(FieldFilter.IN, array);
        return this;
    }

    public notIn(array: any[]): FieldFilter {
        this.map.set(FieldFilter.NIN, array);
        return this;
    }

    public mod(mod: number): FieldFilter {
        this.map.set(FieldFilter.MOD, mod);
        return this;
    }

    public regex(regex: string): FieldFilter {
        this.map.set(FieldFilter.REGEX, regex);
        return this;
    }

    public elemMatch(filter: FilterQuery): FieldFilter {
        this.map.set(FieldFilter.ELEM_MATCH, filter);
        return this;
    }

    public toJSON(): any {
        let filter = {};
        for (let [key, value] of this.map) {
            filter[key] = value;
        }
        return filter;
    }

    public static fromJSON(json: string): FieldFilter {
        return this.fromObject(JSON.parse(json));
    }

    public static fromObject(object: Object): FieldFilter {
        let filter = new FieldFilter();
        for (let field in object) {
            switch (field) {
                case FieldFilter.ELEM_MATCH: filter.elemMatch(FilterQuery.fromObject(object[field]));
                break;
                default: filter.map.set(field, object[field]);
            }
        }
        return filter;
    }

}
