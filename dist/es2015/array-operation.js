export class ArrayOperation {
    constructor() {
        this.operation = new Map();
    }
    add(value, position) {
        this.operation.set(ArrayOperation.EACH, [value]);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    }
    addAll(values, position) {
        this.operation.set(ArrayOperation.EACH, values);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    }
    toJSON() {
        let operation = {};
        for (let [key, value] of this.operation) {
            operation[key] = value;
        }
        return operation;
    }
}
ArrayOperation.EACH = "$each";
ArrayOperation.POSITION = "$position";
//# sourceMappingURL=array-operation.js.map