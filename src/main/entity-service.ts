import { CancelablePromise } from "aurelia-utils";
import { Query } from "./query";
import { Sorting } from "./sorting";

export interface EntityService<E extends Object> {

    findAll(filter?: Query, limit?: number, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E[]>;

    findOne(filter?: Query, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E>;

    count(filter?: Query, limit?: number, skip?: number): CancelablePromise<number>;

    get(params: Object, properties?: string[]): CancelablePromise<E>;

    save<E>(entity: E): CancelablePromise<E>;

    delete(entity: E): CancelablePromise<void>;

}
