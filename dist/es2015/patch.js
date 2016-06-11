var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-dependency-injection";
import { ArrayOperation } from "./array-operation";
let Patch_1 = class Patch {
    constructor() {
        this.operations = new Map();
    }
    operation(operation, fieldName, value) {
        if (!this.operations.has(operation)) {
            this.operations.set(operation, new Map());
        }
        this.operations.get(operation).set(fieldName, value);
        return this;
    }
    increment(fieldName, amount) {
        this.operation(Patch_1.INCREMENT, fieldName, amount);
        return this;
    }
    multiply(fieldName, amount) {
        this.operation(Patch_1.MULTIPLY, fieldName, amount);
        return this;
    }
    replace(fieldName, value) {
        this.operation(Patch_1.REPLACE, fieldName, value);
        return this;
    }
    add(fieldName, value, position) {
        this.operation(Patch_1.ADD, fieldName, new ArrayOperation().add(value, position));
        return this;
    }
    addAll(fieldName, values, position) {
        this.operation(Patch_1.ADD, fieldName, new ArrayOperation().addAll(values, position));
        return this;
    }
    remove(fieldName, valueOrFileter) {
        this.operation(Patch_1.REMOVE, fieldName, valueOrFileter);
        return this;
    }
    removeAll(fieldName, values) {
        this.operation(Patch_1.PURGE, fieldName, values);
        return this;
    }
    toJSON() {
        let patch = {};
        for (let [key, value] of this.operations) {
            patch[key] = value;
        }
        return patch;
    }
};
export let Patch = Patch_1;
Patch.INCREMENT = "$inc";
Patch.MULTIPLY = "$mul";
Patch.REPLACE = "$set";
Patch.ADD = "$push";
Patch.REMOVE = "$pull";
Patch.PURGE = "$pullAll";
Patch = Patch_1 = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [])
], Patch);
//# sourceMappingURL=patch.js.map