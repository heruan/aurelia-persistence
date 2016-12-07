import { FilterQuery } from "./filter-query";

export class GroupFilter {

    public static OR: string = "$or";

    public static AND: string = "$and";

    public static NOT: string = "$not";

    public static NOR: string = "$nor";

    private group: Set<FilterQuery>;

    public constructor(...filterQuery: FilterQuery[]) {
        this.group = new Set<FilterQuery>(filterQuery);
    }

    public add(filter: FilterQuery): GroupFilter {
        this.group.add(filter);
        return this;
    }

    public remove(filter: FilterQuery): GroupFilter {
        this.group.delete(filter);
        return this;
    }

    get size() {
        return this.group.size;
    }

    public toJSON(): any {
        return Array.from(this.group).filter(filter => filter && Object.keys(filter).length != 0);
    }

}
