import { FilterQuery } from "./filter-query";
export declare class GroupFilter {
    static OR: string;
    static AND: string;
    static NOT: string;
    static NOR: string;
    private group;
    constructor(...filterQuery: FilterQuery[]);
    add(filter: FilterQuery): GroupFilter;
    remove(filter: FilterQuery): GroupFilter;
    readonly size: number;
    toJSON(): any;
}
