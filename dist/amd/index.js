define(["exports", "aurelia-event-aggregator", "aurelia-http-client", "aurelia-json", "./entity-manager", "./entity-service", "./entity-collector", "./sorting", "./order", "./filter-query", "./search-query", "./search-boolean-context", "./search-term-query", "./filter-observer", "./filter-binding", "./user-filter"], function (exports, _aureliaEventAggregator, _aureliaHttpClient, _aureliaJson, _entityManager, _entityService, _entityCollector, _sorting, _order, _filterQuery, _searchQuery, _searchBooleanContext, _searchTermQuery, _filterObserver, _filterBinding, _userFilter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FilterObserver = exports.SearchTermQuery = exports.SearchBooleanContext = exports.UserFilter = exports.FilterBinding = exports.SearchQuery = exports.FilterQuery = exports.Order = exports.Sorting = exports.EntityCollector = exports.EntityService = exports.EntityManager = undefined;
    exports.configure = configure;
    function configure(frameworkConfiguration, pluginConfiguration) {
        var container = frameworkConfiguration.container;
        var eventAggregator = container.get(_aureliaEventAggregator.EventAggregator);
        var httpClient = container.get(_aureliaHttpClient.HttpClient);
        var jsonDecoder = container.get(_aureliaJson.JsonDecoder);
        var entityManager = new _entityManager.EntityManager(eventAggregator, jsonDecoder, httpClient);
        container.registerInstance(_entityManager.EntityManager, entityManager);
        container.registerTransient(_filterObserver.FilterObserver);
        return pluginConfiguration(entityManager);
    }
    exports.EntityManager = _entityManager.EntityManager;
    exports.EntityService = _entityService.EntityService;
    exports.EntityCollector = _entityCollector.EntityCollector;
    exports.Sorting = _sorting.Sorting;
    exports.Order = _order.Order;
    exports.FilterQuery = _filterQuery.FilterQuery;
    exports.SearchQuery = _searchQuery.SearchQuery;
    exports.FilterBinding = _filterBinding.FilterBinding;
    exports.UserFilter = _userFilter.UserFilter;
    exports.SearchBooleanContext = _searchBooleanContext.SearchBooleanContext;
    exports.SearchTermQuery = _searchTermQuery.SearchTermQuery;
    exports.FilterObserver = _filterObserver.FilterObserver;
});