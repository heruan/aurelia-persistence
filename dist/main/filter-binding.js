"use strict";
var sorting_1 = require("./sorting");
var FilterBinding = (function () {
    function FilterBinding(name, query, sorting, bindings, startingCount, icon) {
        if (sorting === void 0) { sorting = new sorting_1.Sorting(); }
        if (bindings === void 0) { bindings = {}; }
        if (startingCount === void 0) { startingCount = 0; }
        if (icon === void 0) { icon = "filter"; }
        this.count = 0;
        this.loading = false;
        this.name = name;
        this.query = query;
        this.sorting = sorting;
        this.bindings = bindings;
        this.count = startingCount;
        this.icon = icon;
    }
    FilterBinding.fromJSON = function (object) {
        var filterBinding = new FilterBinding();
        if (object.hasOwnProperty("name"))
            filterBinding.name = object["name"];
        if (object.hasOwnProperty("query"))
            filterBinding.query = object["query"];
        if (object.hasOwnProperty("sorting"))
            filterBinding.sorting = sorting_1.Sorting.fromJSON(object["sorting"]);
        if (object.hasOwnProperty("bindings"))
            filterBinding.bindings = object["bindings"];
        if (object.hasOwnProperty("count"))
            filterBinding.count = object["count"];
        if (object.hasOwnProperty("icon"))
            filterBinding.icon = object["icon"];
        if (object.hasOwnProperty("loading"))
            filterBinding.loading = object["loading"];
        return filterBinding;
    };
    return FilterBinding;
}());
exports.FilterBinding = FilterBinding;
