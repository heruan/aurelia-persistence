import { inject } from "aurelia-dependency-injection";
import { BindingEngine, Disposable } from "aurelia-binding";
import { EventAggregator } from "aurelia-event-aggregator";
import { CancelablePromise } from "aurelia-utils";
import { TaskQueue } from "aurelia-task-queue";
import { EntityService } from "./entity-service";
import { Sorting } from "./sorting";
import { FilterQuery } from "./filter-query";
import { FilterBinding } from "./filter-binding";

@inject(BindingEngine, TaskQueue)
export class EntityCollector<E extends Object> extends EventAggregator implements Disposable {

    public static ENTITIES_LOADED: string = "entities.loaded";

    public static SCROLL_RETRIEVE_INCREMENT: number = 25;

    private bindingEngine: BindingEngine;

    private taskQueue: TaskQueue;

    private entityService: EntityService<E>;

    private currentFilter: FilterQuery;

    private defaultFilter: FilterQuery;

    private activationPromise: Promise<any>;

    private loadCancelables: CancelablePromise<any>[] = [];

    private countCancelables: CancelablePromise<any>[] = [];

    private disposables: Disposable[] = [];

    public sorting: Sorting;

    public limit: number = 25;

    public skip: number = 0;

    public countTotal: number = 0;

    public countFilter: number = 0;

    public entities: E[] = [];

    public bindings: Object = { };

    public properties: string[] = [];

    public loading: boolean = false;

    public constructor(bindingEngine: BindingEngine, taskQueue: TaskQueue, entityService: EntityService<E>, sorting: Sorting = new Sorting(), defaultFilter: FilterQuery = new FilterQuery(), properties?: string[]) {
        super();
        this.bindingEngine = bindingEngine;
        this.taskQueue = taskQueue;
        this.sorting = sorting;
        this.defaultFilter = defaultFilter;
        this.currentFilter = new FilterQuery();
        this.entityService = entityService;
        this.properties = properties;
    }

    public setDefaultFilter(filter: FilterQuery): void {
        this.defaultFilter = filter;
    }

    public setSorting(sorting: Sorting): void {
        this.sorting = sorting;
    }

    public setProperties(properties: string[]): void {
        this.properties = properties;
    }

    public on<V>(property: string, callback: (filter: FilterQuery, value: V) => void, autoRetrieve: boolean = false): EntityCollector<E> {
        this.disposables.push(this.bindingEngine.propertyObserver(this.bindings, property).subscribe(value => {
            this.applyFilter(callback, value);
            if (autoRetrieve) {
                this.retrieve();
            }
        }));
        return this;
    }

    public onCollection<V>(property: string, callback: (filter: FilterQuery, value: V[]) => void, autoRetrieve: boolean = false): EntityCollector<E> {
        Array.isArray(this.bindings[property]) || (this.bindings[property] = []);
        this.disposables.push(this.bindingEngine.collectionObserver(this.bindings[property]).subscribe(slices => {
            this.applyFilter(callback, this.bindings[property]);
            if (autoRetrieve) {
                this.retrieve();
            }
        }));
        return this;
    }

    public count(filter: FilterQuery = this.currentFilter): CancelablePromise<number> {
        let cancelable = this.entityService.count(new FilterQuery().and(this.defaultFilter, filter));
        this.countCancelables.push(cancelable);
        return cancelable;
    }

    public applyFilter(callback: (FilterQuery, any) => void, value: any): void {
        callback.call(this, this.currentFilter, value);
    }

    public activate(filter: FilterBinding, filterMapper: Function = f => new FilterQuery(f)): void {
        Object.keys(this.bindings).forEach(key => {
            if (Array.isArray(this.bindings[key])) {
                let array: any[] = this.bindings[key];
                let replace: any[] = Array.isArray(filter.bindings[key]) ? filter.bindings[key] : [];
                array.splice(0, array.length, ...replace);
            } else if (filter.bindings && filter.bindings.hasOwnProperty(key)) {
                this.bindings[key] = filter.bindings[key];
            } else {
                this.bindings[key] = undefined;
            }
        });
        this.taskQueue.flushMicroTaskQueue();
        this.currentFilter = filterMapper(filter.query);
        this.sorting = new Sorting(filter.sorting);
        this.entities.splice(0);
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        }
    }

    public save(name: string): FilterBinding {
        let bindings = { };
        for (let key in this.bindings) {
            if (Array.isArray(this.bindings[key])) {
                bindings[key] = this.bindings[key].slice();
            } else {
                bindings[key] = this.bindings[key];
            }
        }
        return new FilterBinding(name, new FilterQuery(this.currentFilter), new Sorting(this.sorting), bindings, this.countFilter);
    }

    public reset(): void {
        for (let field in this.bindings) {
            if (Array.isArray(this.bindings[field])) {
                this.bindings[field].splice(0);
            } else {
                this.bindings[field] = undefined;
            }
        }
        this.currentFilter = new FilterQuery();
        this.sorting = new Sorting();
    }

    public dispose(): void {
        this.disposables.forEach(disposable => disposable.dispose());
        this.loadCancelables.forEach(cancelable => cancelable.cancel());
        this.countCancelables.forEach(cancelable => cancelable.cancel());
    }

    public retrieve(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.load(limit, skip).then(this.replaceEntities.bind(this));
    }

    public retrieveMore(increment: number = EntityCollector.SCROLL_RETRIEVE_INCREMENT): Promise<number> {
        let skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(success => this.limit += increment);
    }

    public hasMore(): boolean {
        return this.entities.length < this.countFilter;
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
        let loadFilter = new FilterQuery().and(this.defaultFilter, this.currentFilter);
        let countTotalRequest = this.entityService.count();
        let countFilterRequest = this.entityService.count(this.currentFilter);
        let retrieveRequest = this.entityService.findAll(loadFilter, limit, skip, this.sorting, this.properties);
        this.loadCancelables = [ countTotalRequest, countFilterRequest, retrieveRequest ];
        return Promise.all(this.loadCancelables).then(success => {
            let [ countTotal, countFilter, entities ] = success;
            this.loading = false;
            this.countTotal = countTotal;
            this.countFilter = countFilter;
            this.publish(EntityCollector.ENTITIES_LOADED, entities);
            return entities;
        });
    }

}
