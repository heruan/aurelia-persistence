"use strict";
var ArrayOperation = (function () {
    function ArrayOperation() {
        this.operation = new Map();
    }
    ArrayOperation.prototype.add = function (value, position) {
        this.operation.set(ArrayOperation.EACH, [value]);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    };
    ArrayOperation.prototype.addAll = function (values, position) {
        this.operation.set(ArrayOperation.EACH, values);
        if (position !== undefined) {
            this.operation.set(ArrayOperation.POSITION, position);
        }
        return this;
    };
    ArrayOperation.prototype.toJSON = function () {
        var operation = {};
        this.operation.forEach(function (value, key) { return operation[key] = value; });
        return operation;
    };
    ArrayOperation.EACH = "$each";
    ArrayOperation.POSITION = "$position";
    return ArrayOperation;
}());
exports.ArrayOperation = ArrayOperation;
//# sourceMappingURL=array-operation.js.map