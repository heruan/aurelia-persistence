import {autoinject} from "aurelia-dependency-injection";
import {ArrayOperation} from "./array-operation";

@autoinject
export class Patch {

    public static INCREMENT: string = "$inc";

    public static MULTIPLY: string = "$mul";

    public static REPLACE: string = "$set";

    public static ADD: string = "$push";

    public static REMOVE: string = "$pull";

    public static PURGE: string = "$pullAll";

    private operations: Map<string, Map<string, any>>;

    public constructor() {
        this.operations = new Map<string, Map<string, any>>();
    }

    public operation(operation: string, fieldName: string, value: any): Patch {
        if (!this.operations.has(operation)) {
            this.operations.set(operation, new Map<string, any>());
        }
        this.operations.get(operation).set(fieldName, value);
        return this;
    }

    public increment(fieldName: string, amount: number): Patch {
        this.operation(Patch.INCREMENT, fieldName, amount);
        return this;
    }

    public multiply(fieldName: string, amount: number): Patch {
        this.operation(Patch.MULTIPLY, fieldName, amount);
        return this;
    }

    public replace(fieldName: string, value: any): Patch {
        this.operation(Patch.REPLACE, fieldName, value);
        return this;
    }

    public add(fieldName: string, value: any, position?: number): Patch {
        this.operation(Patch.ADD, fieldName, new ArrayOperation().add(value, position));
        return this;
    }

    public addAll(fieldName: string, values: any[], position?: number): Patch {
        this.operation(Patch.ADD, fieldName, new ArrayOperation().addAll(values, position));
        return this;
    }

    public remove(fieldName: string, valueOrFileter: any): Patch {
        this.operation(Patch.REMOVE, fieldName, valueOrFileter);
        return this;
    }

    public removeAll(fieldName: string, values: any[]): Patch {
        this.operation(Patch.PURGE, fieldName, values);
        return this;
    }

    public toJSON(): any {
        let patch = {};
        for (let [key, value] of this.operations) {
            patch[key] = value;
        }
        return patch;
    }

}
