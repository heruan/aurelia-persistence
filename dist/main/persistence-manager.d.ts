import { CancelablePromise } from "aurelia-utils";
import { Query } from "./query";
import { Sorting } from "./sorting";
export interface PersistenceManager {
    findAll<E extends Object>(type: new () => E, filter?: Query, limit?: number, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E[]>;
    findOne<E extends Object>(type: new () => E, filter?: Query, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E>;
    count<E extends Object>(type: new () => E, filter?: Query, limit?: number, skip?: number): CancelablePromise<number>;
    get<E extends Object>(type: new () => E, params: Object, properties?: string[]): CancelablePromise<E>;
    save<E extends Object>(type: new () => E, entity: E): CancelablePromise<E>;
    delete<E extends Object>(type: new () => E, entity: E): CancelablePromise<void>;
}
