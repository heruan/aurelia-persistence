"use strict";

System.register(["aurelia-dependency-injection", "aurelia-event-aggregator", "aurelia-http-client", "http-utils", "aurelia-json", "./entity-service"], function (_export, _context) {
    "use strict";

    var autoinject, EventAggregator, HttpClient, HttpHeaders, MediaType, JsonSchema, JsonDecoder, EntityService, _typeof, __decorate, __metadata, EntityManager, _a, _b;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDependencyInjection) {
            autoinject = _aureliaDependencyInjection.autoinject;
        }, function (_aureliaEventAggregator) {
            EventAggregator = _aureliaEventAggregator.EventAggregator;
        }, function (_aureliaHttpClient) {
            HttpClient = _aureliaHttpClient.HttpClient;
        }, function (_httpUtils) {
            HttpHeaders = _httpUtils.HttpHeaders;
            MediaType = _httpUtils.MediaType;
        }, function (_aureliaJson) {
            JsonSchema = _aureliaJson.JsonSchema;
            JsonDecoder = _aureliaJson.JsonDecoder;
        }, function (_entityService) {
            EntityService = _entityService.EntityService;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export("EntityManager", EntityManager = function () {
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
                        message.withHeader(HttpHeaders.ACCEPT, MediaType.TEXT_PLAIN + ";q=0.9," + MediaType.APPLICATION_JSON + ";q=0.8," + MediaType.WILDCARD + ";q=0.5");
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
                        return _this.httpClient.createRequest(_this.links.get(newable).get("describedBy")).asGet().withHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_SCHEMA).send();
                    }).then(function (message) {
                        var schema = JsonSchema.asMap(message.response);
                        _this.schemas.set(newable, schema);
                        var service = new EntityService(_this, _this.eventAggregator, _this.jsonDecoder, _this.httpClient, schema, _this.links.get(newable));
                        _this.services.set(newable, service);
                        return service;
                    });
                };

                return EntityManager;
            }());

            _export("EntityManager", EntityManager);

            _export("EntityManager", EntityManager = __decorate([autoinject, __metadata('design:paramtypes', [typeof (_a = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _a || Object, JsonDecoder, typeof (_b = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _b || Object])], EntityManager));
        }
    };
});