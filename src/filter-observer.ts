import {autoinject} from "aurelia-dependency-injection";
import {transient} from "aurelia-dependency-injection";
import {BindingEngine, Disposable} from "aurelia-binding";
import {EntityCollector} from "./entity-collector";
import {Query} from "./query";
import {FilterQuery} from "./filter-query";
import {Sorting} from "./sorting";

@autoinject
@transient()
export class FilterObserver {

    private bindingEngine: BindingEngine;

    private filterBindings: Object = {};

    private collectors: Object = {};

    private bindingDisposables: Disposable[] = [];

    public constructor(bindingEngine: BindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    public on<E extends Object>(property: string, callback: (QueryFilter, any) => void, entityCollector: EntityCollector<E>): EntityCollector<E> {
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.propertyObserver(this.filterBindings, property).subscribe(value => {
            this.collectors[property].filter(callback, value);
        }));
        return entityCollector;
    }

    public onCollection<E extends Object>(property: string, callback: (QueryFilter, Array) => void, entityCollector: EntityCollector<E>): EntityCollector<E> {
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.collectionObserver(this.filterBindings[property]).subscribe(slices => {
            this.collectors[property].filter(callback, this.filterBindings[property]);
        }));
        return entityCollector;
    }

    get activate(): Promise<any> {
        let promises: Promise<any>[] = [];
        for (let property in this.collectors) {
            promises.push(this.collectors[property].activate());
        }
        return Promise.all(promises);
    }

    public getCollector<E extends Object>(property: string): EntityCollector<E> {
        return this.collectors[property];
    }

    public disposeAll(): void {
        this.bindingDisposables.forEach(disposable => disposable.dispose());
    }

}
