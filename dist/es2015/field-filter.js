import { FilterQuery } from "./filter-query";
export class FieldFilter {
    constructor() {
        this.map = new Map();
    }
    equalTo(value) {
        this.map.set(FieldFilter.EQ, value);
        return this;
    }
    greaterThan(value) {
        this.map.set(FieldFilter.GT, value);
        return this;
    }
    greaterThanOrEqualTo(value) {
        this.map.set(FieldFilter.GTE, value);
        return this;
    }
    lessThan(value) {
        this.map.set(FieldFilter.LT, value);
        return this;
    }
    lessThanOrEqualTo(value) {
        this.map.set(FieldFilter.LTE, value);
        return this;
    }
    notEqualTo(value) {
        this.map.set(FieldFilter.NE, value);
        return this;
    }
    in(array) {
        this.map.set(FieldFilter.IN, array);
        return this;
    }
    notIn(array) {
        this.map.set(FieldFilter.NIN, array);
        return this;
    }
    mod(mod) {
        this.map.set(FieldFilter.MOD, mod);
        return this;
    }
    regex(regex) {
        this.map.set(FieldFilter.REGEX, regex);
        return this;
    }
    elemMatch(filter) {
        this.map.set(FieldFilter.ELEM_MATCH, filter);
        return this;
    }
    toJSON() {
        let filter = {};
        for (let [key, value] of this.map) {
            filter[key] = value;
        }
        return filter;
    }
    static fromJSON(json) {
        return this.fromObject(JSON.parse(json));
    }
    static fromObject(object) {
        let filter = new FieldFilter();
        for (let field in object) {
            switch (field) {
                case FieldFilter.ELEM_MATCH:
                    filter.elemMatch(FilterQuery.fromObject(object[field]));
                    break;
                default: filter.map.set(field, object[field]);
            }
        }
        return filter;
    }
}
FieldFilter.EQ = "$eq";
FieldFilter.GT = "$gt";
FieldFilter.GTE = "$gte";
FieldFilter.LT = "$lt";
FieldFilter.LTE = "$lte";
FieldFilter.NE = "$ne";
FieldFilter.IN = "$in";
FieldFilter.NIN = "$nin";
FieldFilter.MOD = "$mod";
FieldFilter.REGEX = "$regex";
FieldFilter.ELEM_MATCH = "$elemMatch";
//# sourceMappingURL=field-filter.js.map