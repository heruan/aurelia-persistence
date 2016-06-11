"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EntityManager = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaHttpClient = require("aurelia-http-client");

var _httpUtils = require("http-utils");

var _aureliaJson = require("aurelia-json");

var _entityService = require("./entity-service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EntityManager = exports.EntityManager = function () {
    function EntityManager(eventAggregator, jsonDecoder, httpClient) {
        _classCallCheck(this, EntityManager);

        this.links = new Map();
        this.schemas = new Map();
        this.services = new Map();
        this.eventAggregator = eventAggregator;
        this.jsonDecoder = jsonDecoder;
        this.httpClient = httpClient;
        this.httpClient.configure(function (message) {
            message.withHeader("X-Medium-Name", "web");
            message.withHeader(_httpUtils.HttpHeaders.ACCEPT, _httpUtils.MediaType.TEXT_PLAIN + ";q=0.9," + _httpUtils.MediaType.APPLICATION_JSON + ";q=0.8," + _httpUtils.MediaType.WILDCARD + ";q=0.5");
        });
    }

    EntityManager.prototype.getService = function getService(newable) {
        return this.services.get(newable);
    };

    EntityManager.prototype.addService = function addService(newable, location) {
        var _this = this;

        return this.httpClient.options(location).then(function (response) {
            var entries = [];
            for (var key in response.content.links) {
                if (response.content.links.hasOwnProperty(key)) {
                    entries.push([key, response.content.links[key]]);
                }
            }
            _this.links.set(newable, new Map(entries));
            return _this.httpClient.createRequest(_this.links.get(newable).get("describedBy")).asGet().withHeader(_httpUtils.HttpHeaders.ACCEPT, _httpUtils.MediaType.APPLICATION_JSON_SCHEMA).send();
        }).then(function (message) {
            var schema = _aureliaJson.JsonSchema.asMap(message.response);
            _this.schemas.set(newable, schema);
            var service = new _entityService.EntityService(_this, _this.eventAggregator, _this.jsonDecoder, _this.httpClient, schema, _this.links.get(newable));
            _this.services.set(newable, service);
            return service;
        });
    };

    return EntityManager;
}();
exports.EntityManager = EntityManager = __decorate([_aureliaDependencyInjection.autoinject, __metadata('design:paramtypes', [typeof (_a = typeof _aureliaEventAggregator.EventAggregator !== 'undefined' && _aureliaEventAggregator.EventAggregator) === 'function' && _a || Object, _aureliaJson.JsonDecoder, typeof (_b = typeof _aureliaHttpClient.HttpClient !== 'undefined' && _aureliaHttpClient.HttpClient) === 'function' && _b || Object])], EntityManager);
var _a, _b;