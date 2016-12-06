export declare class TextFilter {
    static TEXT: string;
    private fields;
    private search;
    constructor(fields: string[], search: string);
    toJSON(): any;
    static fromJSON(object: Object): TextFilter;
}
