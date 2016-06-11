"use strict";

System.register(["aurelia-event-aggregator", "aurelia-http-client", "aurelia-json", "./entity-manager", "./entity-service", "./entity-collector", "./sorting", "./order", "./filter-query", "./search-query", "./search-boolean-context", "./search-term-query", "./filter-observer", "./filter-binding", "./user-filter"], function (_export, _context) {
    "use strict";

    var EventAggregator, HttpClient, JsonDecoder, EntityManager, EntityService, EntityCollector, Sorting, Order, FilterQuery, SearchQuery, SearchBooleanContext, SearchTermQuery, FilterObserver, FilterBinding, UserFilter;
    return {
        setters: [function (_aureliaEventAggregator) {
            EventAggregator = _aureliaEventAggregator.EventAggregator;
        }, function (_aureliaHttpClient) {
            HttpClient = _aureliaHttpClient.HttpClient;
        }, function (_aureliaJson) {
            JsonDecoder = _aureliaJson.JsonDecoder;
        }, function (_entityManager) {
            EntityManager = _entityManager.EntityManager;
        }, function (_entityService) {
            EntityService = _entityService.EntityService;
        }, function (_entityCollector) {
            EntityCollector = _entityCollector.EntityCollector;
        }, function (_sorting) {
            Sorting = _sorting.Sorting;
        }, function (_order) {
            Order = _order.Order;
        }, function (_filterQuery) {
            FilterQuery = _filterQuery.FilterQuery;
        }, function (_searchQuery) {
            SearchQuery = _searchQuery.SearchQuery;
        }, function (_searchBooleanContext) {
            SearchBooleanContext = _searchBooleanContext.SearchBooleanContext;
        }, function (_searchTermQuery) {
            SearchTermQuery = _searchTermQuery.SearchTermQuery;
        }, function (_filterObserver) {
            FilterObserver = _filterObserver.FilterObserver;
        }, function (_filterBinding) {
            FilterBinding = _filterBinding.FilterBinding;
        }, function (_userFilter) {
            UserFilter = _userFilter.UserFilter;
        }],
        execute: function () {
            function configure(frameworkConfiguration, pluginConfiguration) {
                var container = frameworkConfiguration.container;
                var eventAggregator = container.get(EventAggregator);
                var httpClient = container.get(HttpClient);
                var jsonDecoder = container.get(JsonDecoder);
                var entityManager = new EntityManager(eventAggregator, jsonDecoder, httpClient);
                container.registerInstance(EntityManager, entityManager);
                container.registerTransient(FilterObserver);
                return pluginConfiguration(entityManager);
            }

            _export("configure", configure);

            _export("EntityManager", EntityManager);

            _export("EntityService", EntityService);

            _export("EntityCollector", EntityCollector);

            _export("Sorting", Sorting);

            _export("Order", Order);

            _export("FilterQuery", FilterQuery);

            _export("SearchQuery", SearchQuery);

            _export("FilterBinding", FilterBinding);

            _export("UserFilter", UserFilter);

            _export("SearchBooleanContext", SearchBooleanContext);

            _export("SearchTermQuery", SearchTermQuery);

            _export("FilterObserver", FilterObserver);
        }
    };
});