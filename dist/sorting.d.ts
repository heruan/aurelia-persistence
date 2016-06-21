export declare class Sorting {
    static SORTING_EVENT: string;
    private orderMap;
    private order;
    private position;
    constructor();
    by(property: string, direction: number): Sorting;
    toggle(property: string): Sorting;
    toJSON(): any;
}
