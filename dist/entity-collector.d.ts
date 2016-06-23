import { DataAccessObject } from "./data-access-object";
import { Sorting } from "./sorting";
import { FilterQuery } from "./filter-query";
export declare class EntityCollector<E extends Object> {
    static SCROLL_RETRIEVE_INCREMENT: number;
    private properties;
    private filterBindings;
    private dataAccessObject;
    private defaultFilter;
    private defaultSorting;
    private currentFilter;
    private limit;
    private skip;
    private countTotal;
    private countFilter;
    private entities;
    private activationPromise;
    private retrievePromise;
    private filterDisposable;
    private loading;
    constructor(dataAccessObject: DataAccessObject<E>, defaultSorting?: Sorting, defaultFilter?: FilterQuery, properties?: string[]);
    setEntities(promise: Promise<E[]>): void;
    retrieve(limit?: number, skip?: number): Promise<E[]>;
    retrieveMore(increment?: number): Promise<number>;
    protected load(limit: number, skip: number): Promise<E[]>;
    protected replaceEntities(entities: E[]): E[];
    protected concatEntities(entities: E[]): E[];
    filter(callback: (FilterQuery, any) => void, value: any): void;
}
