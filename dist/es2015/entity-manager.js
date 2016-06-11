var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { HttpClient } from "aurelia-http-client";
import { HttpHeaders, MediaType } from "http-utils";
import { JsonSchema, JsonDecoder } from "aurelia-json";
import { EntityService } from "./entity-service";
export let EntityManager = class EntityManager {
    constructor(eventAggregator, jsonDecoder, httpClient) {
        this.links = new Map();
        this.schemas = new Map();
        this.services = new Map();
        this.eventAggregator = eventAggregator;
        this.jsonDecoder = jsonDecoder;
        this.httpClient = httpClient;
        this.httpClient.configure((message) => {
            message.withHeader("X-Medium-Name", "web");
            message.withHeader(HttpHeaders.ACCEPT, `${MediaType.TEXT_PLAIN};q=0.9,${MediaType.APPLICATION_JSON};q=0.8,${MediaType.WILDCARD};q=0.5`);
        });
    }
    getService(newable) {
        return this.services.get(newable);
    }
    addService(newable, location) {
        return this.httpClient.options(location).then((response) => {
            let entries = [];
            for (let key in response.content.links) {
                if (response.content.links.hasOwnProperty(key)) {
                    entries.push([key, response.content.links[key]]);
                }
            }
            this.links.set(newable, new Map(entries));
            return this.httpClient.createRequest(this.links.get(newable).get("describedBy")).asGet()
                .withHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_SCHEMA).send();
        }).then((message) => {
            let schema = JsonSchema.asMap(message.response);
            this.schemas.set(newable, schema);
            let service = new EntityService(this, this.eventAggregator, this.jsonDecoder, this.httpClient, schema, this.links.get(newable));
            this.services.set(newable, service);
            return service;
        });
    }
};
EntityManager = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [(typeof (_a = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _a) || Object, JsonDecoder, (typeof (_b = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _b) || Object])
], EntityManager);
var _a, _b;
//# sourceMappingURL=entity-manager.js.map