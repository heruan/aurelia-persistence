export declare class Patch {
    static INCREMENT: string;
    static MULTIPLY: string;
    static REPLACE: string;
    static ADD: string;
    static REMOVE: string;
    static PURGE: string;
    private operations;
    constructor();
    operation(operation: string, fieldName: string, value: any): Patch;
    increment(fieldName: string, amount: number): Patch;
    multiply(fieldName: string, amount: number): Patch;
    replace(fieldName: string, value: any): Patch;
    add(fieldName: string, value: any, position?: number): Patch;
    addAll(fieldName: string, values: any[], position?: number): Patch;
    remove(fieldName: string, valueOrFileter: any): Patch;
    removeAll(fieldName: string, values: any[]): Patch;
    toJSON(): any;
}
