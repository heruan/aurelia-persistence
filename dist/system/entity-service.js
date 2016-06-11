"use strict";

System.register(["./filter-query", "./sorting", "aurelia-json", "http-utils", "url-template"], function (_export, _context) {
    "use strict";

    var FilterQuery, Sorting, JsonEncoder, HttpHeaders, MediaType, UrlTemplate, EntityService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_filterQuery) {
            FilterQuery = _filterQuery.FilterQuery;
        }, function (_sorting) {
            Sorting = _sorting.Sorting;
        }, function (_aureliaJson) {
            JsonEncoder = _aureliaJson.JsonEncoder;
        }, function (_httpUtils) {
            HttpHeaders = _httpUtils.HttpHeaders;
            MediaType = _httpUtils.MediaType;
        }, function (_urlTemplate) {
            UrlTemplate = _urlTemplate.default;
        }],
        execute: function () {
            _export("EntityService", EntityService = function () {
                function EntityService(entityManager, eventAggregator, jsonDecoder, httpClient, jsonSchema, links) {
                    _classCallCheck(this, EntityService);

                    this.requestMap = new Map();
                    this.entityManager = entityManager;
                    this.eventAggregator = eventAggregator;
                    this.jsonDecoder = jsonDecoder;
                    this.httpClient = httpClient;
                    this.jsonSchema = jsonSchema;
                    this.links = links;
                }

                EntityService.prototype.getEntityManager = function getEntityManager() {
                    return this.entityManager;
                };

                EntityService.prototype.getSchema = function getSchema() {
                    return this.jsonSchema;
                };

                EntityService.prototype.link = function link(relation) {
                    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                    return UrlTemplate.parse(this.links.get(relation)).expand(params);
                };

                EntityService.prototype.searchMessage = function searchMessage(requestId, path) {
                    var filter = arguments.length <= 2 || arguments[2] === undefined ? new FilterQuery() : arguments[2];
                    var limit = arguments.length <= 3 || arguments[3] === undefined ? 100 : arguments[3];
                    var skip = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
                    var sort = arguments.length <= 5 || arguments[5] === undefined ? new Sorting() : arguments[5];
                    var properties = arguments.length <= 6 || arguments[6] === undefined ? [] : arguments[6];
                    var progressCallback = arguments[7];

                    this.cancel(requestId);
                    var builder = this.httpClient.createRequest(path).asGet();
                    if (properties.length > 0) {
                        builder.withHeader(EntityService.PROPERTY_FILTER_HEADER, properties.join(","));
                    }
                    var request = builder.withHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON).withHeader(EntityService.FILTER_HEADER, JSON.stringify(filter)).withHeader(EntityService.LIMIT_HEADER, "" + limit).withHeader(EntityService.SKIP_HEADER, "" + skip).withHeader(EntityService.SORT_HEADER, JSON.stringify(sort)).withProgressCallback(progressCallback).send();
                    if (requestId) {
                        this.requestMap.set(requestId, request);
                    }
                    return request;
                };

                EntityService.prototype.cancel = function cancel(requestId) {
                    if (this.requestMap.has(requestId)) {
                        this.requestMap.get(requestId).cancel();
                    }
                };

                EntityService.prototype.setRequestId = function setRequestId(requestId, request) {
                    this.requestMap.set(requestId, request);
                };

                EntityService.prototype.count = function count(requestId) {
                    var filter = arguments.length <= 1 || arguments[1] === undefined ? new FilterQuery() : arguments[1];
                    var relation = arguments.length <= 2 || arguments[2] === undefined ? "count" : arguments[2];
                    var params = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
                    var progressCallback = arguments[4];

                    this.cancel(requestId);
                    var path = this.link(relation, params);
                    var requestPromise = this.httpClient.createRequest(path).asGet().withHeader(EntityService.FILTER_HEADER, JSON.stringify(filter)).withProgressCallback(progressCallback).send();
                    if (requestId) {
                        this.requestMap.set(requestId, requestPromise);
                    }
                    return requestPromise.then(function (success) {
                        return success.response;
                    });
                };

                EntityService.prototype.findAll = function findAll(requestId) {
                    var filter = arguments.length <= 1 || arguments[1] === undefined ? new FilterQuery() : arguments[1];
                    var limit = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];
                    var skip = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
                    var sort = arguments.length <= 4 || arguments[4] === undefined ? new Sorting() : arguments[4];
                    var properties = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
                    var relation = arguments.length <= 6 || arguments[6] === undefined ? "list" : arguments[6];
                    var params = arguments.length <= 7 || arguments[7] === undefined ? {} : arguments[7];
                    var progressCallback = arguments[8];

                    return this.searchMessage(requestId, this.link(relation, params), filter, limit, skip, sort, properties, progressCallback).then(function (success) {
                        return success.content;
                    });
                };

                EntityService.prototype.findOne = function findOne(requestId) {
                    var filter = arguments.length <= 1 || arguments[1] === undefined ? new FilterQuery() : arguments[1];
                    var skip = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                    var sort = arguments.length <= 3 || arguments[3] === undefined ? new Sorting() : arguments[3];
                    var properties = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
                    var relation = arguments.length <= 5 || arguments[5] === undefined ? "list" : arguments[5];
                    var params = arguments.length <= 6 || arguments[6] === undefined ? {} : arguments[6];
                    var progressCallback = arguments[7];

                    return this.findAll(requestId, filter, 1, skip, sort, properties, relation, params, progressCallback).then(function (entities) {
                        if (entities.length > 0) {
                            return entities.shift();
                        } else {
                            throw entities;
                        }
                    });
                };

                EntityService.prototype.retrieve = function retrieve(entity) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];
                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var properties = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
                    var progressCallback = arguments[4];

                    var query = {};
                    var request = this.requestBuilder(relation, entity, params).asGet();
                    if (properties.length > 0) {
                        request.withHeader(EntityService.PROPERTY_FILTER_HEADER, properties.join(","));
                    }
                    return request.withParams(query).withProgressCallback(progressCallback).send().then(function (success) {
                        return success.content;
                    });
                };

                EntityService.prototype.persist = function persist(entity) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "list" : arguments[1];

                    var _this = this;

                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var progressCallback = arguments[3];

                    var requestBuilder = this.requestBuilder(relation, entity, params).asPost();
                    var contentType = this.inferContentType(entity);
                    if (contentType) {
                        requestBuilder.withHeader(HttpHeaders.CONTENT_TYPE, contentType);
                    }
                    return requestBuilder.withContent(entity).withProgressCallback(progressCallback).send().then(function (success) {
                        if (success.headers.has(HttpHeaders.LOCATION)) {
                            var location = success.headers.get(HttpHeaders.LOCATION);
                            return _this.httpClient.get(location).then(function (success) {
                                return success.content;
                            });
                        } else {
                            return entity;
                        }
                    });
                };

                EntityService.prototype.update = function update(entity) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];

                    var _this2 = this;

                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var progressCallback = arguments[3];

                    var requestBuilder = this.requestBuilder(relation, entity, params).asPut();
                    var contentType = this.inferContentType(entity);
                    if (contentType) {
                        requestBuilder.withHeader(HttpHeaders.CONTENT_TYPE, contentType);
                    }
                    return requestBuilder.withContent(entity).withProgressCallback(progressCallback).send().then(function (success) {
                        return _this2.retrieve(entity, relation, params);
                    });
                };

                EntityService.prototype.patch = function patch(entity) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];
                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    var _this3 = this;

                    var properties = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
                    var progressCallback = arguments[4];

                    var patch = this.jsonDecoder.diff(entity, properties);
                    if (patch.length > 0) {
                        console.debug("JsonPatch", patch);
                        return this.requestBuilder(relation, entity, params).asPatch().withHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_PATCH).withContent(patch).withProgressCallback(progressCallback).send().then(function (success) {
                            return _this3.retrieve(entity, relation, params, properties);
                        });
                    } else {
                        console.debug("JsonPatch", "no operations");
                        return Promise.resolve(entity);
                    }
                };

                EntityService.prototype.delete = function _delete(entity) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];
                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var progressCallback = arguments[3];

                    return this.requestBuilder(relation, entity, params).asDelete().withProgressCallback(progressCallback).send();
                };

                EntityService.prototype.stringify = function stringify(entity) {
                    return new JsonEncoder().encode(entity);
                };

                EntityService.prototype.requestBuilder = function requestBuilder(relation, entity) {
                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    return this.httpClient.createRequest(this.link(relation, Object.assign({}, entity, params)));
                };

                EntityService.prototype.inferContentType = function inferContentType(entity) {
                    if (entity instanceof FormData) {
                        return null;
                    }
                    if (entity instanceof Blob) {
                        return null;
                    }
                    if (typeof entity === "string") {
                        return MediaType.TEXT_PLAIN;
                    }
                    return MediaType.APPLICATION_JSON;
                };

                return EntityService;
            }());

            _export("EntityService", EntityService);

            EntityService.COUNT_TOTAL_HEADER = "X-Count-Total";
            EntityService.COUNT_FILTER_HEADER = "X-Count-Filter";
            EntityService.FILTER_HEADER = "X-Filter";
            EntityService.LIMIT_HEADER = "X-Limit";
            EntityService.SKIP_HEADER = "X-Skip";
            EntityService.SORT_HEADER = "X-Sort";
            EntityService.PROPERTY_FILTER_HEADER = "X-Property-Filter";
        }
    };
});