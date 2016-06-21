import {BindingEngine, Disposable} from "aurelia-binding";
import {CancelablePromise} from "aurelia-utils";
import {DataAccessObject} from "./data-access-object";
import {Sorting} from "./sorting";
import {FilterQuery} from "./filter-query";

export class EntityCollector<E extends Object> {

    public static SCROLL_RETRIEVE_INCREMENT: number = 10;

    private name: string;

    private relation: string;

    private properties: string[];

    private filterBindings: Object = {};

    private dataAccessObject: DataAccessObject<E>;

    private defaultFilter: FilterQuery;

    private defaultSorting: Sorting;

    private currentFilter: FilterQuery;

    private limit: number = 10;

    private skip: number = 0;

    private countTotal: number = 0;

    private countFilter: number = 0;

    private entities: Object[] = [];

    private activationPromise: Promise<any>;

    private retrievePromise: CancelablePromise<E[]>;

    private filterDisposable: Disposable;

    private loading: boolean = false;

    public constructor(name: string, dataAccessObject: DataAccessObject<E>, defaultFilter: FilterQuery = null, relation: string = "list", properties: string[] = []) {
        this.name = name;
        this.defaultFilter = defaultFilter;
        this.currentFilter = this.defaultFilter;
        this.dataAccessObject = dataAccessObject;
        this.relation = relation;
        this.properties = properties;
    }

    public setEntities(promise: Promise<E[]>): void {
        promise.then(this.replaceEntities.bind(this));
    }

    public retrieve(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.load(limit, skip).then(this.replaceEntities.bind(this));
    }

    public retrieveMore(increment: number = EntityCollector.SCROLL_RETRIEVE_INCREMENT): Promise<number> {
        let skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(success => this.limit += increment);
    }

    protected load(limit: number, skip: number): Promise<E[]> {
        if (this.retrievePromise) {
            this.retrievePromise.cancel();
        }
        this.loading = true;
        this.dataAccessObject.count().then(countTotal => this.countTotal = countTotal);
        this.dataAccessObject.count(this.currentFilter).then(countFilter => this.countFilter = countFilter);
        this.retrievePromise = this.dataAccessObject.findAll(this.currentFilter, limit, skip, this.defaultSorting, this.properties);
        return this.retrievePromise.then(entities => {
            this.loading = false;
            return entities;
        }, failure => {
            this.loading = false;
            throw failure;
        });
    }

    protected replaceEntities(entities: Object[]): Object[] {
        return this.entities = entities;
    }

    protected concatEntities(entities: Object[]): Object[] {
        for (let entity of entities) {
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        }
        return this.entities;
    }

    public filter(callback: (FilterQuery, any) => void, value: any): void {
        let callbackFilter = null;
        if (value !== undefined) {
            callbackFilter = new FilterQuery();
            callback.call(callbackFilter, callbackFilter, value);
        } else {
            this.currentFilter = this.defaultFilter;
        }

        if (callbackFilter !== null && this.defaultFilter !== null) {
            this.currentFilter = new FilterQuery().and(callbackFilter, this.defaultFilter);
        } else if (callbackFilter === null && this.defaultFilter !== null) {
            this.currentFilter = this.defaultFilter;
        } else {
            this.currentFilter = callbackFilter;
        }

        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        } else {
            this.entities = [];
        }
    }

    public activate(): Promise<Object[]> {
        return this.retrieve();
    }

}
