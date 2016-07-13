import {CancelablePromise} from "aurelia-utils";
import {Query} from "./query";
import {Sorting} from "./sorting";

export interface DataAccessObject<E extends Object> {

    findAll(filter?: Query, limit?: number, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E[]>;

    findOne(filter?: Query, skip?: number, sorting?: Sorting, properties?: string[]): CancelablePromise<E>;

    count(filter?: Query, limit?: number, skip?: number): CancelablePromise<number>;

    get(params: Object, properties?: string[]): CancelablePromise<E>;

    save<D>(entity: E, data?: D): CancelablePromise<E>;

    delete(entity: E): CancelablePromise<void>;

}
