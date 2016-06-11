import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {HttpClient, RequestBuilder, HttpResponseMessage} from "aurelia-http-client";
import {HttpHeaders, MediaType, LinkHeaderParser} from "http-utils";
import {JsonSchema, JsonDecoder} from "aurelia-json";
import {EntityService} from "./entity-service";

@autoinject
export class EntityManager {

    private links: Map<any, Map<string, string>> = new Map<any, Map<string, string>>();

    private schemas: Map<any, Map<string, any>> = new Map<any, Map<string, any>>();

    private services: Map<any, EntityService> = new Map<any, EntityService>();

    private eventAggregator: EventAggregator;

    private jsonDecoder: JsonDecoder;

    private httpClient: HttpClient;

    public constructor(eventAggregator: EventAggregator, jsonDecoder: JsonDecoder, httpClient: HttpClient) {
        this.eventAggregator = eventAggregator;
        this.jsonDecoder = jsonDecoder;
        this.httpClient = httpClient;
        this.httpClient.configure((message: RequestBuilder) => {
            message.withHeader("X-Medium-Name", "web");
            message.withHeader(HttpHeaders.ACCEPT, `${MediaType.TEXT_PLAIN};q=0.9,${MediaType.APPLICATION_JSON};q=0.8,${MediaType.WILDCARD};q=0.5`);
        });
    }

    public getService(newable: any): EntityService {
        return this.services.get(newable);
    }

    public addService(newable: any, location: string): Promise<EntityService> {
        return this.httpClient.options(location).then((response: HttpResponseMessage) => {
            let entries = [];
            for (let key in response.content.links) {
                if (response.content.links.hasOwnProperty(key)) {
                    entries.push([key, response.content.links[key]]);
                }
            }
            this.links.set(newable, new Map<string, string>(entries));
            return this.httpClient.createRequest(this.links.get(newable).get("describedBy")).asGet()
            .withHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_SCHEMA).send();
        }).then((message: HttpResponseMessage) => {
            let schema = JsonSchema.asMap(message.response);
            this.schemas.set(newable, schema);
            let service = new EntityService(this, this.eventAggregator, this.jsonDecoder, this.httpClient, schema, this.links.get(newable));
            this.services.set(newable, service);
            return service;
        });
    }

}
