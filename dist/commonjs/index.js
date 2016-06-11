"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilterObserver = exports.SearchTermQuery = exports.SearchBooleanContext = exports.UserFilter = exports.FilterBinding = exports.SearchQuery = exports.FilterQuery = exports.Order = exports.Sorting = exports.EntityCollector = exports.EntityService = exports.EntityManager = undefined;
exports.configure = configure;

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaHttpClient = require("aurelia-http-client");

var _aureliaJson = require("aurelia-json");

var _entityManager = require("./entity-manager");

var _entityService = require("./entity-service");

var _entityCollector = require("./entity-collector");

var _sorting = require("./sorting");

var _order = require("./order");

var _filterQuery = require("./filter-query");

var _searchQuery = require("./search-query");

var _searchBooleanContext = require("./search-boolean-context");

var _searchTermQuery = require("./search-term-query");

var _filterObserver = require("./filter-observer");

var _filterBinding = require("./filter-binding");

var _userFilter = require("./user-filter");

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