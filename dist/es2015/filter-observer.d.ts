import { BindingEngine } from "aurelia-binding";
import { EntityCollector } from "./entity-collector";
export declare class FilterObserver {
    private bindingEngine;
    private filterBindings;
    private collectors;
    private bindingDisposables;
    constructor(bindingEngine: BindingEngine);
    on(property: string, callback: (QueryFilter, any) => void, entityCollector: EntityCollector): EntityCollector;
    onCollection(property: string, callback: (QueryFilter, Array) => void, entityCollector: EntityCollector): EntityCollector;
    readonly activate: Promise<any>;
    getCollector(property: string): EntityCollector;
    disposeAll(): void;
}
