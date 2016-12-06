export declare class Sorting {
    static SORTING_EVENT: string;
    private map;
    constructor(sorting?: Sorting);
    order: Object;
    by(property: string, direction: number): Sorting;
    toggle(property: string): Sorting;
    copy(): Sorting;
    toJSON(): Object;
    static fromJSON(object: Object): Sorting;
}
