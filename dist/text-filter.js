"use strict";
var TextFilter = (function () {
    function TextFilter(fields, search) {
        this.fields = fields;
        this.search = search;
    }
    TextFilter.prototype.toJSON = function () {
        return {
            "$fields": this.fields,
            "$search": this.search
        };
    };
    TextFilter.fromJSON = function (object) {
        return new TextFilter(object["$fields"], object["$search"]);
    };
    TextFilter.TEXT = "$text";
    return TextFilter;
}());
exports.TextFilter = TextFilter;
