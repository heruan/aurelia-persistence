export class Order {

    public static ASC: number = 1;

    public static DESC: number = -1;

    public static NEUTRAL: number = 0;

    private property: string;

    private direction: number;

    public constructor(property: string, direction: number) {
        this.property = property;
        this.direction = direction;
    }

    public getProperty(): string {
        return this.property;
    }

    public getDirection(): number {
        return this.direction;
    }

    public toJSON(): any {
        let order = { };
        order[this.property] = this.direction;
        return order;
    }

}
