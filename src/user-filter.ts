import {FilterQuery} from "./filter-query";
import {FilterBinding} from "./filter-binding";

export class UserFilter {

    public query: FilterQuery;

    public bindings: FilterBinding;

    public icon: string;

    public name: string;

    public loading: boolean = false;

    public active: boolean = false;

    public count: number;

    public visible: boolean = true;

    public savable: boolean = true;

}
