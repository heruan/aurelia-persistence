define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ArrayOperation = exports.ArrayOperation = function () {
        function ArrayOperation() {
            _classCallCheck(this, ArrayOperation);

            this.operation = new Map();
        }

        ArrayOperation.prototype.add = function add(value, position) {
            this.operation.set(ArrayOperation.EACH, [value]);
            if (position !== undefined) {
                this.operation.set(ArrayOperation.POSITION, position);
            }
            return this;
        };

        ArrayOperation.prototype.addAll = function addAll(values, position) {
            this.operation.set(ArrayOperation.EACH, values);
            if (position !== undefined) {
                this.operation.set(ArrayOperation.POSITION, position);
            }
            return this;
        };

        ArrayOperation.prototype.toJSON = function toJSON() {
            var operation = {};
            for (var _iterator = this.operation, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

                operation[key] = value;
            }
            return operation;
        };

        return ArrayOperation;
    }();

    ArrayOperation.EACH = "$each";
    ArrayOperation.POSITION = "$position";
});