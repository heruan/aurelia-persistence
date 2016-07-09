import {inject} from "aurelia-dependency-injection";
import {BindingEngine, Disposable} from "aurelia-binding";
import {CancelablePromise} from "aurelia-utils";
import {TaskQueue} from "aurelia-task-queue";
import {DataAccessObject} from "./data-access-object";
import {Sorting} from "./sorting";
import {Query} from "./query";
import {FilterQuery} from "./filter-query";
import {FilterBinding} from "./filter-binding";

@inject(BindingEngine, TaskQueue)
export class EntityCollector<E extends Object> implements Disposable {

    public static SCROLL_RETRIEVE_INCREMENT: number = 10;

    private properties: string[];

    private bindingEngine: BindingEngine;

    private taskQueue: TaskQueue;

    private dataAccessObject: DataAccessObject<E>;

    private currentFilter: Query;

    private defaultFilter: Query;

    private sorting: Sorting;

    private limit: number = 10;

    private skip: number = 0;

    private countTotal: number = 0;

    private countFilter: number = 0;

    private entities: E[] = [];

    private activationPromise: Promise<any>;

    private loadCancelables: CancelablePromise<any>[] = [];

    private disposables: Disposable[] = [];

    public loading: boolean = false;

    public bindings: Object = {};

    public constructor(bindingEngine: BindingEngine, taskQueue: TaskQueue, dataAccessObject: DataAccessObject<E>, sorting: Sorting = new Sorting(), defaultFilter: FilterQuery = new FilterQuery(), properties?: string[]) {
        this.bindingEngine = bindingEngine;
        this.taskQueue = taskQueue;
        this.sorting = sorting;
        this.defaultFilter = defaultFilter;
        this.currentFilter = this.defaultFilter.copy();
        this.dataAccessObject = dataAccessObject;
        this.properties = properties;
    }

    public on<Q extends Query, V>(property: string, callback: (query: Q, value: V) => void): EntityCollector<E> {
        this.disposables.push(this.bindingEngine.propertyObserver(this.bindings, property).subscribe(value => {
            this.applyFilter(callback, value);
        }));
        return this;
    }

    public onCollection<Q extends Query, V>(property: string, callback: (query: Q, value: V[]) => void): EntityCollector<E> {
        this.disposables.push(this.bindingEngine.collectionObserver(this.bindings[property]).subscribe(slices => {
            this.applyFilter(callback, this.bindings[property]);
        }));
        return this;
    }

    public count(filter: Query = this.currentFilter): Promise<number> {
        return this.dataAccessObject.count(filter);
    }

    public applyFilter(callback: (FilterQuery, any) => void, value: any): void {
        if (value !== undefined) {
            callback.call(this, this.currentFilter, value);
        } else {
            this.currentFilter = this.defaultFilter.copy();
        }
    }

    public activate(filter: FilterBinding): void {
        Object.assign(this.bindings, filter.bindings);
        this.sorting = filter.sorting.copy();
        this.taskQueue.flushMicroTaskQueue();
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        } else {
            this.entities = [];
        }
    }

    public save(name: string): FilterBinding {
        let bindings = {};
        for (let key in this.bindings) {
            if (Array.isArray(this.bindings[key])) {
                bindings[key] = this.bindings[key].slice();
            } else {
                bindings[key] = this.bindings[key];
            }
        }
        return new FilterBinding(name, this.currentFilter.copy(), this.sorting.copy(), bindings, this.countFilter);
    }

    public reset(): void {
        for (let field in this.bindings) {
            this.bindings[field] = undefined;
        }
        this.currentFilter = this.defaultFilter;
        this.sorting = new Sorting();
    }

    public dispose(): void {
        this.disposables.forEach(disposable => disposable.dispose());
    }

    public retrieve(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.load(limit, skip).then(this.replaceEntities.bind(this));
    }

    public retrieveMore(increment: number = EntityCollector.SCROLL_RETRIEVE_INCREMENT): Promise<number> {
        let skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(success => this.limit += increment);
    }

    protected replaceEntities(entities: E[]): E[] {
        return this.entities = entities;
    }

    protected concatEntities(entities: E[]): E[] {
        for (let entity of entities) {
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        }
        return this.entities;
    }

    protected load(limit: number, skip: number): Promise<E[]> {
        this.loadCancelables.forEach(cancelable => cancelable.cancel());
        this.loading = true;
        let countTotalRequest = this.dataAccessObject.count();
        let countFilterRequest = this.dataAccessObject.count(this.currentFilter);
        let retrieveRequest = this.dataAccessObject.findAll(this.currentFilter, limit, skip, this.sorting, this.properties);
        this.loadCancelables = [ countTotalRequest, countFilterRequest, retrieveRequest ];
        return Promise.all(this.loadCancelables).then(success => {
            let [ countTotal, countFilter, entities ] = success;
            this.loading = false;
            this.countTotal = countTotal;
            this.countFilter = countFilter;
            return entities;
        });
    }

}
