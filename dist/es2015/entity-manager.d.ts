import { EventAggregator } from "aurelia-event-aggregator";
import { HttpClient } from "aurelia-http-client";
import { JsonDecoder } from "aurelia-json";
import { EntityService } from "./entity-service";
export declare class EntityManager {
    private links;
    private schemas;
    private services;
    private eventAggregator;
    private jsonDecoder;
    private httpClient;
    constructor(eventAggregator: EventAggregator, jsonDecoder: JsonDecoder, httpClient: HttpClient);
    getService(newable: any): EntityService;
    addService(newable: any, location: string): Promise<EntityService>;
}
