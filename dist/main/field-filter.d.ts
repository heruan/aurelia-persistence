import { FilterQuery } from "./filter-query";
export declare class FieldFilter {
    static EQ: string;
    static GT: string;
    static GTE: string;
    static LT: string;
    static LTE: string;
    static NE: string;
    static IN: string;
    static NIN: string;
    static MOD: string;
    static REGEX: string;
    static ELEM_MATCH: string;
    private map;
    constructor();
    equalTo(value: any): FieldFilter;
    greaterThan(value: any): FieldFilter;
    greaterThanOrEqualTo(value: any): FieldFilter;
    lessThan(value: any): FieldFilter;
    lessThanOrEqualTo(value: any): FieldFilter;
    notEqualTo(value: any): FieldFilter;
    in(array: any[]): FieldFilter;
    notIn(array: any[]): FieldFilter;
    mod(mod: number): FieldFilter;
    regex(regex: string): FieldFilter;
    elemMatch(filter: FilterQuery): FieldFilter;
    toJSON(): any;
    static fromJSON(object: Object): FieldFilter;
}
