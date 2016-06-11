"use strict";

System.register(["aurelia-dependency-injection", "./array-operation"], function (_export, _context) {
    "use strict";

    var autoinject, ArrayOperation, _typeof, __decorate, __metadata, Patch_1, Patch;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDependencyInjection) {
            autoinject = _aureliaDependencyInjection.autoinject;
        }, function (_arrayOperation) {
            ArrayOperation = _arrayOperation.ArrayOperation;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            Patch_1 = function () {
                function Patch() {
                    _classCallCheck(this, Patch);

                    this.operations = new Map();
                }

                Patch.prototype.operation = function operation(_operation, fieldName, value) {
                    if (!this.operations.has(_operation)) {
                        this.operations.set(_operation, new Map());
                    }
                    this.operations.get(_operation).set(fieldName, value);
                    return this;
                };

                Patch.prototype.increment = function increment(fieldName, amount) {
                    this.operation(Patch_1.INCREMENT, fieldName, amount);
                    return this;
                };

                Patch.prototype.multiply = function multiply(fieldName, amount) {
                    this.operation(Patch_1.MULTIPLY, fieldName, amount);
                    return this;
                };

                Patch.prototype.replace = function replace(fieldName, value) {
                    this.operation(Patch_1.REPLACE, fieldName, value);
                    return this;
                };

                Patch.prototype.add = function add(fieldName, value, position) {
                    this.operation(Patch_1.ADD, fieldName, new ArrayOperation().add(value, position));
                    return this;
                };

                Patch.prototype.addAll = function addAll(fieldName, values, position) {
                    this.operation(Patch_1.ADD, fieldName, new ArrayOperation().addAll(values, position));
                    return this;
                };

                Patch.prototype.remove = function remove(fieldName, valueOrFileter) {
                    this.operation(Patch_1.REMOVE, fieldName, valueOrFileter);
                    return this;
                };

                Patch.prototype.removeAll = function removeAll(fieldName, values) {
                    this.operation(Patch_1.PURGE, fieldName, values);
                    return this;
                };

                Patch.prototype.toJSON = function toJSON() {
                    var patch = {};
                    for (var _iterator = this.operations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var _ref2 = _ref;
                        var key = _ref2[0];
                        var value = _ref2[1];

                        patch[key] = value;
                    }
                    return patch;
                };

                return Patch;
            }();

            _export("Patch", Patch = Patch_1);

            _export("Patch", Patch);

            Patch.INCREMENT = "$inc";
            Patch.MULTIPLY = "$mul";
            Patch.REPLACE = "$set";
            Patch.ADD = "$push";
            Patch.REMOVE = "$pull";
            Patch.PURGE = "$pullAll";
            _export("Patch", Patch = Patch_1 = __decorate([autoinject, __metadata('design:paramtypes', [])], Patch));
        }
    };
});