import {autoinject} from "aurelia-dependency-injection";
import {transient} from "aurelia-dependency-injection";
import {BindingEngine, Disposable} from "aurelia-binding";
import {EntityService} from "./entity-service";
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

    public on(property: string, callback: (QueryFilter, any) => void, entityCollector: EntityCollector): EntityCollector {
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.propertyObserver(this.filterBindings, property).subscribe(value => {
            this.collectors[property].filter(callback, value);
        }));
        return entityCollector;
    }

    public onCollection(property: string, callback: (QueryFilter, Array) => void, entityCollector: EntityCollector): EntityCollector {
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

    public getCollector(property: string): EntityCollector {
        return this.collectors[property];
    }

    public disposeAll(): void {
        this.bindingDisposables.forEach(disposable => disposable.dispose());
    }

}
