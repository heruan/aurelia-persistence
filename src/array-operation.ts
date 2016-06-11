export class ArrayOperation {

    public static EACH: string = "$each";

    public static POSITION: string = "$position";

    private operation: Map<string, any>;

    public constructor() {
        this.operation = new Map<string, any>();
    }

    public add(value: any, position?: number): ArrayOperation {
        this.operation.set(ArrayOperation.EACH, [ value ]);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    }

    public addAll(values: any[], position?: number): ArrayOperation {
        this.operation.set(ArrayOperation.EACH, values);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    }

    public toJSON(): any {
        let operation = {};
        for (let [key, value] of this.operation) {
            operation[key] = value;
        }
        return operation;
    }

}
