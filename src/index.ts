import {FrameworkConfiguration} from "aurelia-framework";
import {Container} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {HttpClient} from "aurelia-http-client";
import {JsonDecoder} from "aurelia-json";
import {EntityManager} from "./entity-manager";
import {EntityService} from "./entity-service";
import {EntityCollector} from "./entity-collector";
import {Query} from "./query";
import {Sorting} from "./sorting";
import {Order} from "./order";
import {FilterQuery} from "./filter-query";
import {SearchQuery} from "./search-query";
import {SearchContext} from "./search-context";
import {SearchBooleanContext} from "./search-boolean-context";
import {SearchTermQuery} from "./search-term-query";
import {FilterObserver} from "./filter-observer";
import {FilterBinding} from "./filter-binding";
import {UserFilter} from "./user-filter";

export function configure(frameworkConfiguration: FrameworkConfiguration, pluginConfiguration: Function) {
    let container: Container = frameworkConfiguration.container;
    let eventAggregator: EventAggregator = container.get(EventAggregator);
    let httpClient: HttpClient = container.get(HttpClient);
    let jsonDecoder: JsonDecoder = container.get(JsonDecoder);
    let entityManager: EntityManager = new EntityManager(eventAggregator, jsonDecoder, httpClient);
    container.registerInstance(EntityManager, entityManager);
    container.registerTransient(FilterObserver);
    return pluginConfiguration(entityManager);
}

export {EntityManager, EntityService, EntityCollector, Query, Sorting, Order,
    FilterQuery, SearchQuery, FilterBinding, UserFilter,
    SearchContext, SearchBooleanContext, SearchTermQuery, FilterObserver};
