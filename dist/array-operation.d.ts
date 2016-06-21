export declare class ArrayOperation {
    static EACH: string;
    static POSITION: string;
    private operation;
    constructor();
    add(value: any, position?: number): ArrayOperation;
    addAll(values: any[], position?: number): ArrayOperation;
    toJSON(): any;
}
