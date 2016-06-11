import { EntityService } from "./entity-service";
import { FilterQuery } from "./filter-query";
export class EntityCollector {
    constructor(name, entityService, defaultFilter = null, relation = "list", properties = []) {
        this.filterBindings = {};
        this.limit = 10;
        this.skip = 0;
        this.countTotal = 0;
        this.countFilter = 0;
        this.entities = [];
        this.loading = false;
        this.name = name;
        this.defaultFilter = defaultFilter;
        this.currentFilter = this.defaultFilter;
        this.entityService = entityService;
        this.relation = relation;
        this.properties = properties;
    }
    setEntities(promise) {
        promise.then(this.replaceEntities.bind(this));
    }
    retrieve(limit = this.limit, skip = this.skip) {
        return this.load(limit, skip).then(this.replaceEntities.bind(this));
    }
    retrieveMore(increment = EntityCollector.SCROLL_RETRIEVE_INCREMENT) {
        let skip = this.limit;
        return this.load(increment, skip).then(this.concatEntities.bind(this)).then(success => this.limit += increment);
    }
    load(limit, skip) {
        this.loading = true;
        let path = this.entityService.link(this.relation);
        return this.entityService.searchMessage(this.name, path, this.currentFilter, limit, skip, this.defaultSorting, this.properties).then(success => {
            this.loading = false;
            this.countTotal = +success.headers.get(EntityService.COUNT_TOTAL_HEADER);
            this.countFilter = +success.headers.get(EntityService.COUNT_FILTER_HEADER);
            return success.content;
        }, failure => {
            this.loading = false;
        });
    }
    replaceEntities(entities) {
        return this.entities = entities;
    }
    concatEntities(entities) {
        for (let entity of entities) {
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        }
        return this.entities;
    }
    filter(callback, value) {
        let callbackFilter = null;
        if (value !== undefined) {
            callbackFilter = new FilterQuery();
            callback.call(callbackFilter, callbackFilter, value);
        }
        else {
            this.currentFilter = this.defaultFilter;
        }
        if (callbackFilter !== null && this.defaultFilter !== null) {
            this.currentFilter = new FilterQuery().and(callbackFilter, this.defaultFilter);
        }
        else if (callbackFilter === null && this.defaultFilter !== null) {
            this.currentFilter = this.defaultFilter;
        }
        else {
            this.currentFilter = callbackFilter;
        }
        if (this.currentFilter !== null) {
            this.retrieve(this.limit, 0);
        }
        else {
            this.entities = [];
        }
    }
    activate() {
        return this.retrieve();
    }
}
EntityCollector.SCROLL_RETRIEVE_INCREMENT = 10;
//# sourceMappingURL=entity-collector.js.map