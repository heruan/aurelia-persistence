"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var TextFilter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("TextFilter", TextFilter = function () {
                function TextFilter(fields, search) {
                    _classCallCheck(this, TextFilter);

                    this.fields = fields;
                    this.search = search;
                }

                TextFilter.prototype.toJSON = function toJSON() {
                    return {
                        "$fields": this.fields,
                        "$search": this.search
                    };
                };

                TextFilter.fromJSON = function fromJSON(json) {
                    return this.fromObject(JSON.parse(json));
                };

                TextFilter.fromObject = function fromObject(object) {
                    return new TextFilter(object["$fields"], object["$search"]);
                };

                return TextFilter;
            }());

            _export("TextFilter", TextFilter);

            TextFilter.TEXT = "$text";
        }
    };
});