export class TextFilter {
    constructor(fields, search) {
        this.fields = fields;
        this.search = search;
    }
    toJSON() {
        return {
            "$fields": this.fields,
            "$search": this.search
        };
    }
    static fromJSON(json) {
        return this.fromObject(JSON.parse(json));
    }
    static fromObject(object) {
        return new TextFilter(object["$fields"], object["$search"]);
    }
}
TextFilter.TEXT = "$text";
//# sourceMappingURL=text-filter.js.map