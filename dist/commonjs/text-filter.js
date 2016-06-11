"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextFilter = exports.TextFilter = function () {
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
}();

TextFilter.TEXT = "$text";