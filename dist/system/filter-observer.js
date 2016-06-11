"use strict";

System.register(["aurelia-dependency-injection", "aurelia-binding"], function (_export, _context) {
    "use strict";

    var autoinject, transient, BindingEngine, _createClass, _typeof, __decorate, __metadata, FilterObserver, _a;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDependencyInjection) {
            autoinject = _aureliaDependencyInjection.autoinject;
            transient = _aureliaDependencyInjection.transient;
        }, function (_aureliaBinding) {
            BindingEngine = _aureliaBinding.BindingEngine;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

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

            _export("FilterObserver", FilterObserver = function () {
                function FilterObserver(bindingEngine) {
                    _classCallCheck(this, FilterObserver);

                    this.filterBindings = {};
                    this.collectors = {};
                    this.bindingDisposables = [];
                    this.bindingEngine = bindingEngine;
                }

                FilterObserver.prototype.on = function on(property, callback, entityCollector) {
                    var _this = this;

                    this.collectors[property] = entityCollector;
                    this.bindingDisposables.push(this.bindingEngine.propertyObserver(this.filterBindings, property).subscribe(function (value) {
                        _this.collectors[property].filter(callback, value);
                    }));
                    return entityCollector;
                };

                FilterObserver.prototype.onCollection = function onCollection(property, callback, entityCollector) {
                    var _this2 = this;

                    this.collectors[property] = entityCollector;
                    this.bindingDisposables.push(this.bindingEngine.collectionObserver(this.filterBindings[property]).subscribe(function (slices) {
                        _this2.collectors[property].filter(callback, _this2.filterBindings[property]);
                    }));
                    return entityCollector;
                };

                FilterObserver.prototype.getCollector = function getCollector(property) {
                    return this.collectors[property];
                };

                FilterObserver.prototype.disposeAll = function disposeAll() {
                    this.bindingDisposables.forEach(function (disposable) {
                        return disposable.dispose();
                    });
                };

                _createClass(FilterObserver, [{
                    key: "activate",
                    get: function get() {
                        var promises = [];
                        for (var property in this.collectors) {
                            promises.push(this.collectors[property].activate());
                        }
                        return Promise.all(promises);
                    }
                }]);

                return FilterObserver;
            }());

            _export("FilterObserver", FilterObserver);

            _export("FilterObserver", FilterObserver = __decorate([autoinject, transient(), __metadata('design:paramtypes', [typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a || Object])], FilterObserver));
        }
    };
});