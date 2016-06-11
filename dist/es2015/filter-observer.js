var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-dependency-injection";
import { transient } from "aurelia-dependency-injection";
import { BindingEngine } from "aurelia-binding";
export let FilterObserver = class FilterObserver {
    constructor(bindingEngine) {
        this.filterBindings = {};
        this.collectors = {};
        this.bindingDisposables = [];
        this.bindingEngine = bindingEngine;
    }
    on(property, callback, entityCollector) {
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.propertyObserver(this.filterBindings, property).subscribe(value => {
            this.collectors[property].filter(callback, value);
        }));
        return entityCollector;
    }
    onCollection(property, callback, entityCollector) {
        this.collectors[property] = entityCollector;
        this.bindingDisposables.push(this.bindingEngine.collectionObserver(this.filterBindings[property]).subscribe(slices => {
            this.collectors[property].filter(callback, this.filterBindings[property]);
        }));
        return entityCollector;
    }
    get activate() {
        let promises = [];
        for (let property in this.collectors) {
            promises.push(this.collectors[property].activate());
        }
        return Promise.all(promises);
    }
    getCollector(property) {
        return this.collectors[property];
    }
    disposeAll() {
        this.bindingDisposables.forEach(disposable => disposable.dispose());
    }
};
FilterObserver = __decorate([
    autoinject,
    transient(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a) || Object])
], FilterObserver);
var _a;
//# sourceMappingURL=filter-observer.js.map