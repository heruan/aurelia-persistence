import { CancelablePromise } from "aurelia-utils";
import { Query } from "./query";
import { Sorting } from "./sorting";
export interface PersistenceManager {
    addEntityType<E extends Object>(type: new () => E, location: string): Promise<void>;
    findAll<E extends Object>(type: new () => E, filter?: Query, limit?: number, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E[]>;
    findOne<E extends Object>(type: new () => E, filter?: Query, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E>;
    count<E extends Object>(type: new () => E, filter?: Query, limit?: number, skip?: number): CancelablePromise<number>;
    save<E extends Object, D>(type: new () => E, entity: E, properties?: string[], data?: D): CancelablePromise<E>;
    delete<E extends Object>(type: new () => E, entity: E): CancelablePromise<void>;
}
