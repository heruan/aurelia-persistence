import {Query} from "./query";

export abstract class SearchQuery implements Query {

    public static SEARCH_EVENT: string = "aurelia.persistence.search.event";

}
