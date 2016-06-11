import { EventAggregator } from "aurelia-event-aggregator";
import { HttpClient } from "aurelia-http-client";
import { JsonDecoder } from "aurelia-json";
import { EntityManager } from "./entity-manager";
import { EntityService } from "./entity-service";
import { EntityCollector } from "./entity-collector";
import { Sorting } from "./sorting";
import { Order } from "./order";
import { FilterQuery } from "./filter-query";
import { SearchQuery } from "./search-query";
import { SearchBooleanContext } from "./search-boolean-context";
import { SearchTermQuery } from "./search-term-query";
import { FilterObserver } from "./filter-observer";
import { FilterBinding } from "./filter-binding";
import { UserFilter } from "./user-filter";
export function configure(frameworkConfiguration, pluginConfiguration) {
    let container = frameworkConfiguration.container;
    let eventAggregator = container.get(EventAggregator);
    let httpClient = container.get(HttpClient);
    let jsonDecoder = container.get(JsonDecoder);
    let entityManager = new EntityManager(eventAggregator, jsonDecoder, httpClient);
    container.registerInstance(EntityManager, entityManager);
    container.registerTransient(FilterObserver);
    return pluginConfiguration(entityManager);
}
export { EntityManager, EntityService, EntityCollector, Sorting, Order, FilterQuery, SearchQuery, FilterBinding, UserFilter, SearchBooleanContext, SearchTermQuery, FilterObserver };
//# sourceMappingURL=index.js.map