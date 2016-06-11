import {List, ArrayList} from "aurelia-utils";
import {FilterQuery} from "./filter-query";

export class GroupFilter {

    public static OR: string = "$or";

    public static AND: string = "$and";

    public static NOT: string = "$not";

    public static NOR: string = "$nor";

    private group: List<FilterQuery>;

    public constructor(...filterQuery: FilterQuery[]) {
        this.group = new ArrayList<FilterQuery>(filterQuery);
    }

    public add(filter: FilterQuery): GroupFilter {
        this.group.add(filter);
        return this;
    }

    public remove(filter: FilterQuery): GroupFilter {
        this.group.remove(filter);
        return this;
    }

    get size() {
        return this.group.size();
    }

    public toJSON(): any {
        return this.group.toArray().filter(filter => Object.keys(filter).length != 0);
    }

}
