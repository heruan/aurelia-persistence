import { ArrayList } from "aurelia-utils";
export class GroupFilter {
    constructor(...filterQuery) {
        this.group = new ArrayList(filterQuery);
    }
    add(filter) {
        this.group.add(filter);
        return this;
    }
    remove(filter) {
        this.group.remove(filter);
        return this;
    }
    get size() {
        return this.group.size();
    }
    toJSON() {
        return this.group.toArray().filter(filter => Object.keys(filter).length != 0);
    }
}
GroupFilter.OR = "$or";
GroupFilter.AND = "$and";
GroupFilter.NOT = "$not";
GroupFilter.NOR = "$nor";
//# sourceMappingURL=group-filter.js.map