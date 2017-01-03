import { FilterQuery } from "./filter-query";
import { Sorting } from "./sorting";

export class FilterBinding {

    public name: string;

    public query: FilterQuery;

    public sorting: Sorting;

    public bindings: Object;

    public count: number = 0;

    public icon: string;

    public loading: boolean = false;

    public constructor(name?: string,
            query?: FilterQuery,
            sorting: Sorting = new Sorting(),
            bindings: Object = Object.create(null),
            startingCount: number = 0,
            icon: string = "filter") {
        this.name = name;
        this.query = query;
        this.sorting = sorting;
        this.bindings = bindings;
        this.count = startingCount;
        this.icon = icon;
    }

    public static fromJSON(object: Object): FilterBinding {
        let filterBinding = new FilterBinding();
        if (object.hasOwnProperty("name"))      filterBinding.name      = object["name"];
        if (object.hasOwnProperty("query"))     filterBinding.query     = object["query"];
        if (object.hasOwnProperty("sorting"))   filterBinding.sorting   = Sorting.fromJSON(object["sorting"]);
        if (object.hasOwnProperty("bindings"))  filterBinding.bindings  = object["bindings"];
        if (object.hasOwnProperty("count"))     filterBinding.count     = object["count"];
        if (object.hasOwnProperty("icon"))      filterBinding.icon      = object["icon"];
        if (object.hasOwnProperty("loading"))   filterBinding.loading   = object["loading"];
        return filterBinding;
    }

}
