import { FilterQuery } from "./filter-query";
import { Sorting } from "./sorting";
import { JsonEncoder } from "aurelia-json";
import { HttpHeaders, MediaType } from "http-utils";
import UrlTemplate from "url-template";
export class EntityService {
    constructor(entityManager, eventAggregator, jsonDecoder, httpClient, jsonSchema, links) {
        this.requestMap = new Map();
        this.entityManager = entityManager;
        this.eventAggregator = eventAggregator;
        this.jsonDecoder = jsonDecoder;
        this.httpClient = httpClient;
        this.jsonSchema = jsonSchema;
        this.links = links;
    }
    getEntityManager() {
        return this.entityManager;
    }
    getSchema() {
        return this.jsonSchema;
    }
    link(relation, params = {}) {
        return UrlTemplate.parse(this.links.get(relation)).expand(params);
    }
    searchMessage(requestId, path, filter = new FilterQuery(), limit = 100, skip = 0, sort = new Sorting(), properties = [], progressCallback) {
        this.cancel(requestId);
        let builder = this.httpClient.createRequest(path)
            .asGet();
        if (properties.length > 0) {
            builder.withHeader(EntityService.PROPERTY_FILTER_HEADER, properties.join(","));
        }
        let request = builder
            .withHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .withHeader(EntityService.FILTER_HEADER, JSON.stringify(filter))
            .withHeader(EntityService.LIMIT_HEADER, `${limit}`)
            .withHeader(EntityService.SKIP_HEADER, `${skip}`)
            .withHeader(EntityService.SORT_HEADER, JSON.stringify(sort))
            .withProgressCallback(progressCallback)
            .send();
        if (requestId) {
            this.requestMap.set(requestId, request);
        }
        return request;
    }
    cancel(requestId) {
        if (this.requestMap.has(requestId)) {
            this.requestMap.get(requestId).cancel();
        }
    }
    setRequestId(requestId, request) {
        this.requestMap.set(requestId, request);
    }
    count(requestId, filter = new FilterQuery(), relation = "count", params = {}, progressCallback) {
        this.cancel(requestId);
        let path = this.link(relation, params);
        let requestPromise = this.httpClient.createRequest(path)
            .asGet()
            .withHeader(EntityService.FILTER_HEADER, JSON.stringify(filter))
            .withProgressCallback(progressCallback)
            .send();
        if (requestId) {
            this.requestMap.set(requestId, requestPromise);
        }
        return requestPromise.then(success => success.response);
    }
    findAll(requestId, filter = new FilterQuery(), limit = 100, skip = 0, sort = new Sorting(), properties = [], relation = "list", params = {}, progressCallback) {
        return this.searchMessage(requestId, this.link(relation, params), filter, limit, skip, sort, properties, progressCallback)
            .then(success => success.content);
    }
    findOne(requestId, filter = new FilterQuery(), skip = 0, sort = new Sorting(), properties = [], relation = "list", params = {}, progressCallback) {
        return this.findAll(requestId, filter, 1, skip, sort, properties, relation, params, progressCallback)
            .then(entities => {
            if (entities.length > 0) {
                return entities.shift();
            }
            else {
                throw entities;
            }
        });
    }
    retrieve(entity, relation = "self", params = {}, properties = [], progressCallback) {
        let query = {};
        let request = this.requestBuilder(relation, entity, params)
            .asGet();
        if (properties.length > 0) {
            request.withHeader(EntityService.PROPERTY_FILTER_HEADER, properties.join(","));
        }
        return request
            .withParams(query)
            .withProgressCallback(progressCallback)
            .send()
            .then(success => success.content);
    }
    persist(entity, relation = "list", params = {}, progressCallback) {
        let requestBuilder = this.requestBuilder(relation, entity, params).asPost();
        let contentType = this.inferContentType(entity);
        if (contentType) {
            requestBuilder.withHeader(HttpHeaders.CONTENT_TYPE, contentType);
        }
        return requestBuilder.withContent(entity)
            .withProgressCallback(progressCallback)
            .send()
            .then(success => {
            if (success.headers.has(HttpHeaders.LOCATION)) {
                let location = success.headers.get(HttpHeaders.LOCATION);
                return this.httpClient.get(location).then(success => success.content);
            }
            else {
                return entity;
            }
        });
    }
    update(entity, relation = "self", params = {}, progressCallback) {
        let requestBuilder = this.requestBuilder(relation, entity, params).asPut();
        let contentType = this.inferContentType(entity);
        if (contentType) {
            requestBuilder.withHeader(HttpHeaders.CONTENT_TYPE, contentType);
        }
        return requestBuilder.withContent(entity)
            .withProgressCallback(progressCallback)
            .send()
            .then(success => this.retrieve(entity, relation, params));
    }
    patch(entity, relation = "self", params = {}, properties = [], progressCallback) {
        let patch = this.jsonDecoder.diff(entity, properties);
        if (patch.length > 0) {
            console.debug("JsonPatch", patch);
            return this.requestBuilder(relation, entity, params)
                .asPatch()
                .withHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_PATCH)
                .withContent(patch)
                .withProgressCallback(progressCallback)
                .send()
                .then(success => this.retrieve(entity, relation, params, properties));
        }
        else {
            console.debug("JsonPatch", "no operations");
            return Promise.resolve(entity);
        }
    }
    delete(entity, relation = "self", params = {}, progressCallback) {
        return this.requestBuilder(relation, entity, params)
            .asDelete()
            .withProgressCallback(progressCallback)
            .send();
    }
    stringify(entity) {
        return new JsonEncoder().encode(entity);
    }
    requestBuilder(relation, entity, params = {}) {
        return this.httpClient.createRequest(this.link(relation, Object.assign({}, entity, params)));
    }
    inferContentType(entity) {
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
    }
}
EntityService.COUNT_TOTAL_HEADER = "X-Count-Total";
EntityService.COUNT_FILTER_HEADER = "X-Count-Filter";
EntityService.FILTER_HEADER = "X-Filter";
EntityService.LIMIT_HEADER = "X-Limit";
EntityService.SKIP_HEADER = "X-Skip";
EntityService.SORT_HEADER = "X-Sort";
EntityService.PROPERTY_FILTER_HEADER = "X-Property-Filter";
//# sourceMappingURL=entity-service.js.map