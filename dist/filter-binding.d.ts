import { FilterQuery } from "./filter-query";
import { Sorting } from "./sorting";
export declare class FilterBinding {
    name: string;
    filter: FilterQuery;
    sorting: Sorting;
    bindings: Object;
    count: number;
    icon: string;
    loading: boolean;
    constructor(name?: string, filter?: FilterQuery, sorting?: Sorting, bindings?: Object, startingCount?: number, icon?: string);
    static fromJSON(object: Object): FilterBinding;
}
