import { FieldFilter } from "./field-filter";
import { TextFilter } from "./text-filter";
import { Query } from "./query";
export declare class FilterQuery implements Query {
    static FILTERING_EVENT: string;
    private map;
    constructor(filterQuery?: FilterQuery);
    field(fieldName: string, fieldFilter: FieldFilter): FilterQuery;
    unset(fieldName: string): FilterQuery;
    textFields(fieldNames: string[], search: string): FilterQuery;
    text(textFilter: TextFilter): FilterQuery;
    unsetText(): FilterQuery;
    or(...filters: FilterQuery[]): FilterQuery;
    and(...filters: FilterQuery[]): FilterQuery;
    not(...filters: FilterQuery[]): FilterQuery;
    nor(...filters: FilterQuery[]): FilterQuery;
    group(groupAggregator: string, ...filters: FilterQuery[]): FilterQuery;
    unsetOr(...filters: FilterQuery[]): FilterQuery;
    unsetAnd(...filters: FilterQuery[]): FilterQuery;
    unsetNot(...filters: FilterQuery[]): FilterQuery;
    unsetNor(...filters: FilterQuery[]): FilterQuery;
    unsetGroup(groupAggregator: string, ...filters: FilterQuery[]): FilterQuery;
    equalTo(fieldName: string, value: any): FilterQuery;
    greaterThan(fieldName: string, value: any): FilterQuery;
    greaterThanOrEqualTo(fieldName: string, value: any): FilterQuery;
    lessThan(fieldName: string, value: any): FilterQuery;
    lessThanOrEqualTo(fieldName: string, value: any): FilterQuery;
    notEqualTo(fieldName: string, value: any): FilterQuery;
    in(fieldName: string, array: any[]): FilterQuery;
    notIn(fieldName: string, array: any[]): FilterQuery;
    mod(fieldName: string, mod: number): FilterQuery;
    regex(fieldName: string, regex: string): FilterQuery;
    elemMatch(fieldName: string, filter: FilterQuery): FilterQuery;
    copy(): FilterQuery;
    toJSON(): Object;
    static fromJSON(object: Object): FilterQuery;
}
