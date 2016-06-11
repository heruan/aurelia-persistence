import {RequestBuilder, HttpResponseMessage} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";
import {HttpClient} from "aurelia-http-client";
import {EntityManager} from "./entity-manager";
import {Query} from "./query";
import {FilterQuery} from "./filter-query";
import {FilterObserver} from "./filter-observer";
import {Sorting} from "./sorting";
import {JsonSchema, JsonPatch, JsonEncoder, JsonDecoder} from "aurelia-json";
import {HttpHeaders, MediaType} from "http-utils";
import {CancelablePromise} from "aurelia-utils";
import UrlTemplate from "url-template";

export class EntityService {

    public static COUNT_TOTAL_HEADER: string = "X-Count-Total";

    public static COUNT_FILTER_HEADER: string = "X-Count-Filter";

    public static FILTER_HEADER: string = "X-Filter";

    public static LIMIT_HEADER: string = "X-Limit";

    public static SKIP_HEADER: string = "X-Skip";

    public static SORT_HEADER: string = "X-Sort";

    public static PROPERTY_FILTER_HEADER: string = "X-Property-Filter";

    private eventAggregator: EventAggregator;

    private jsonDecoder: JsonDecoder;

    private httpClient: HttpClient;

    private entityManager: EntityManager;

    private jsonSchema: Map<string, any>;

    private links: Map<string, string>;

    private requestMap: Map<string, any> = new Map<string, any>();

    public constructor(entityManager: EntityManager, eventAggregator: EventAggregator, jsonDecoder: JsonDecoder, httpClient: HttpClient, jsonSchema: Map<string, any>, links: Map<string, string>) {
        this.entityManager = entityManager;
        this.eventAggregator = eventAggregator;
        this.jsonDecoder = jsonDecoder;
        this.httpClient = httpClient;
        this.jsonSchema = jsonSchema;
        this.links = links;
    }

    public getEntityManager(): EntityManager {
        return this.entityManager;
    }

    public getSchema(): Map<string, any> {
        return this.jsonSchema;
    }

    public link(relation: string, params: Object = {}): string {
        return UrlTemplate.parse(this.links.get(relation)).expand(params);
    }

    public searchMessage(requestId: string, path: string,
        filter: Query = new FilterQuery(),
        limit: number = 100,
        skip: number = 0,
        sort: Sorting = new Sorting(),
        properties: string[] = [],
        progressCallback?: Function
    ): CancelablePromise<HttpResponseMessage> {
        this.cancel(requestId);
        let builder = this.httpClient.createRequest(path)
        .asGet();
        if (properties.length > 0) {
            builder.withHeader(EntityService.PROPERTY_FILTER_HEADER, properties.join(","));
        }
        let request: CancelablePromise<HttpResponseMessage> =
        <CancelablePromise<HttpResponseMessage>> builder
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

    public cancel(requestId: string) {
        if (this.requestMap.has(requestId)) {
            this.requestMap.get(requestId).cancel();
        }
    }

    public setRequestId(requestId: string, request: any) {
        this.requestMap.set(requestId, request);
    }

    public count(requestId: string,
        filter: Query = new FilterQuery(),
        relation: string = "count",
        params: Object = {},
        progressCallback?: Function
    ): Promise<number> {
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

    public findAll(requestId: string, filter: Query = new FilterQuery(),
        limit   : number = 100,
        skip: number = 0,
        sort: Sorting = new Sorting(),
        properties: string[] = [],
        relation: string = "list",
        params: Object = {},
        progressCallback?: Function
    ): Promise<any[]> {
        return this.searchMessage(requestId, this.link(relation, params), filter, limit, skip, sort, properties, progressCallback)
        .then(success => success.content);
    }

    public findOne(requestId: string, filter: Query = new FilterQuery(),
        skip: number = 0,
        sort: Sorting = new Sorting(),
        properties: string[] = [],
        relation: string = "list",
        params: Object = {},
        progressCallback?: Function
    ): Promise<any> {
        return this.findAll(requestId, filter, 1, skip, sort, properties, relation, params, progressCallback)
        .then(entities => {
            if (entities.length > 0) {
                return entities.shift();
            } else {
                throw entities;
            }
        });
    }

    public retrieve(entity: any, relation: string = "self", params: Object = {}, properties: string[] = [], progressCallback?: Function): Promise<any> {
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

    public persist(entity: any, relation: string = "list", params: Object = {}, progressCallback?: Function): Promise<any> {
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
            } else {
                return entity;
            }
        });
    }

    public update(entity: any, relation: string = "self", params: Object = {}, progressCallback?: Function): Promise<any> {
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

    public patch(entity: any, relation: string = "self", params: Object = {}, properties: string[] = [], progressCallback?: Function): Promise<any> {
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
        } else {
            console.debug("JsonPatch", "no operations");
            return Promise.resolve(entity);
        }
    }

    public delete(entity: any, relation: string = "self", params: Object = {}, progressCallback?: Function): Promise<HttpResponseMessage> {
        return this.requestBuilder(relation, entity, params)
        .asDelete()
        .withProgressCallback(progressCallback)
        .send();
    }

    public stringify(entity: any): string {
        return new JsonEncoder().encode(entity);
    }

    private requestBuilder(relation: string, entity: any, params: Object = {}): RequestBuilder {
        return this.httpClient.createRequest(this.link(relation, Object.assign({}, entity, params)));
    }

    private inferContentType(entity: any): string {
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
