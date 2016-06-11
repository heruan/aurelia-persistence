export declare class Order {
    static ASC: number;
    static DESC: number;
    static NEUTRAL: number;
    private property;
    private direction;
    constructor(property: string, direction: number);
    getProperty(): string;
    getDirection(): number;
    toJSON(): any;
}
