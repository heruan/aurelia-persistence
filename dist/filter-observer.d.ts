import { BindingEngine } from "aurelia-binding";
import { EntityCollector } from "./entity-collector";
export declare class FilterObserver {
    private bindingEngine;
    private filterBindings;
    private collectors;
    private bindingDisposables;
    constructor(bindingEngine: BindingEngine);
    on<E extends Object>(property: string, callback: (QueryFilter, any) => void, entityCollector: EntityCollector<E>): EntityCollector<E>;
    onCollection<E extends Object>(property: string, callback: (QueryFilter, Array) => void, entityCollector: EntityCollector<E>): EntityCollector<E>;
    readonly activate: Promise<any>;
    getCollector<E extends Object>(property: string): EntityCollector<E>;
    disposeAll(): void;
}
