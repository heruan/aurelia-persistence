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
import { GroupFilter } from "./group-filter";
import { FieldFilter } from "./field-filter";
import { TextFilter } from "./text-filter";
let FilterQuery_1 = class FilterQuery {
    constructor(filterQuery) {
        this.map = filterQuery ? new Map(filterQuery.map) : new Map();
    }
    field(fieldName, fieldFilter) {
        this.map.set(fieldName, fieldFilter);
        return this;
    }
    unset(fieldName) {
        this.map.delete(fieldName);
        return this;
    }
    textFields(fieldNames, search) {
        return this.text(new TextFilter(fieldNames, search));
    }
    text(textFilter) {
        this.map.set(TextFilter.TEXT, textFilter);
        return this;
    }
    unsetText() {
        this.map.delete(TextFilter.TEXT);
        return this;
    }
    or(...filters) {
        let args = [GroupFilter.OR];
        return this.group.apply(this, args.concat(filters));
    }
    and(...filters) {
        let args = [GroupFilter.AND];
        return this.group.apply(this, args.concat(filters));
    }
    not(...filters) {
        let args = [GroupFilter.NOT];
        return this.group.apply(this, args.concat(filters));
    }
    nor(...filters) {
        let args = [GroupFilter.NOR];
        return this.group.apply(this, args.concat(filters));
    }
    group(groupAggregator, ...filters) {
        if (!this.map.has(groupAggregator)) {
            this.map.set(groupAggregator, new GroupFilter());
        }
        let groupFilter = this.map.get(groupAggregator);
        for (let filter of filters) {
            groupFilter.add(filter);
        }
        return this;
    }
    unsetOr(...filters) {
        let args = [GroupFilter.OR];
        return this.unsetGroup.apply(this, args.concat(filters));
    }
    unsetAnd(...filters) {
        let args = [GroupFilter.AND];
        return this.unsetGroup.apply(this, args.concat(filters));
    }
    unsetNot(...filters) {
        let args = [GroupFilter.NOT];
        return this.unsetGroup.apply(this, args.concat(filters));
    }
    unsetNor(...filters) {
        let args = [GroupFilter.NOR];
        return this.unsetGroup.apply(this, args.concat(filters));
    }
    unsetGroup(groupAggregator, ...filters) {
        if (this.map.has(groupAggregator)) {
            let groupFilter = this.map.get(groupAggregator);
            for (let filter of filters) {
                groupFilter.remove(filter);
            }
            if (groupFilter.size == 0) {
                this.map.delete(groupAggregator);
            }
        }
        return this;
    }
    equalTo(fieldName, value) {
        return this.field(fieldName, new FieldFilter().equalTo(value));
    }
    greaterThan(fieldName, value) {
        return this.field(fieldName, new FieldFilter().greaterThan(value));
    }
    greaterThanOrEqualTo(fieldName, value) {
        return this.field(fieldName, new FieldFilter().greaterThanOrEqualTo(value));
    }
    lessThan(fieldName, value) {
        return this.field(fieldName, new FieldFilter().lessThan(value));
    }
    lessThanOrEqualTo(fieldName, value) {
        return this.field(fieldName, new FieldFilter().lessThanOrEqualTo(value));
    }
    notEqualTo(fieldName, value) {
        return this.field(fieldName, new FieldFilter().notEqualTo(value));
    }
    in(fieldName, array) {
        return this.field(fieldName, new FieldFilter().in(array));
    }
    notIn(fieldName, array) {
        return this.field(fieldName, new FieldFilter().notIn(array));
    }
    mod(fieldName, mod) {
        return this.field(fieldName, new FieldFilter().mod(mod));
    }
    regex(fieldName, regex) {
        return this.field(fieldName, new FieldFilter().regex(regex));
    }
    elemMatch(fieldName, filter) {
        return this.field(fieldName, new FieldFilter().elemMatch(filter));
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
        let filter = new FilterQuery_1();
        for (let field in object) {
            switch (field) {
                case GroupFilter.OR:
                    filter.or(...object[field].map(f => FilterQuery_1.fromObject(f)));
                    break;
                case GroupFilter.AND:
                    filter.and(...object[field].map(f => FilterQuery_1.fromObject(f)));
                    break;
                case GroupFilter.NOT:
                    filter.not(...object[field].map(f => FilterQuery_1.fromObject(f)));
                    break;
                case GroupFilter.NOR:
                    filter.nor(...object[field].map(f => FilterQuery_1.fromObject(f)));
                    break;
                case TextFilter.TEXT:
                    filter.text(TextFilter.fromObject(object[field]));
                    break;
                default: filter.field(field, FieldFilter.fromObject(object[field]));
            }
        }
        return filter;
    }
};
export let FilterQuery = FilterQuery_1;
FilterQuery.FILTERING_EVENT = "aurelia.persistence.filtering";
FilterQuery = FilterQuery_1 = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [FilterQuery])
], FilterQuery);
//# sourceMappingURL=filter-query.js.map