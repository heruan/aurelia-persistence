import { FilterQuery } from "./filter-query";
import { FilterBinding } from "./filter-binding";
export declare class UserFilter {
    query: FilterQuery;
    bindings: FilterBinding;
    icon: string;
    name: string;
    loading: boolean;
    active: boolean;
    count: number;
    visible: boolean;
    savable: boolean;
}
