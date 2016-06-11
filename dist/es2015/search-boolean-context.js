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
import { SearchBooleanQuery } from "./search-boolean-query";
export let SearchBooleanContext = class SearchBooleanContext {
    constructor() {
        this.map = new Map();
    }
    must(...queries) {
        return this.bool.call(this, SearchBooleanQuery.MUST, ...queries);
    }
    should(...queries) {
        return this.bool.call(this, SearchBooleanQuery.SHOULD, ...queries);
    }
    bool(booleanAggregator, ...queries) {
        if (!this.map.has(booleanAggregator)) {
            this.map.set(booleanAggregator, new SearchBooleanQuery());
        }
        let booleanSearch = this.map.get(booleanAggregator);
        for (let query of queries) {
            booleanSearch.add(query);
        }
        return this;
    }
    unsetMust(...queries) {
        return this.unsetBool.call(this, SearchBooleanQuery.MUST, ...queries);
    }
    unsetShould(...queries) {
        return this.unsetBool.call(this, SearchBooleanQuery.SHOULD, ...queries);
    }
    unsetBool(booleanAggregator, ...queries) {
        if (this.map.has(booleanAggregator)) {
            let booleanSearch = this.map.get(booleanAggregator);
            for (let query of queries) {
                booleanSearch.remove(query);
            }
            if (booleanSearch.size == 0) {
                this.map.delete(booleanAggregator);
            }
        }
        return this;
    }
    toJSON() {
        if (this.map.size === 0) {
            return {};
        }
        else {
            let filter = {};
            for (let [key, value] of this.map) {
                filter[key] = value;
            }
            return {
                "$bool": filter
            };
        }
    }
};
SearchBooleanContext.BOOLEAN_CONTEXT = "$bool";
SearchBooleanContext = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [])
], SearchBooleanContext);
//# sourceMappingURL=search-boolean-context.js.map