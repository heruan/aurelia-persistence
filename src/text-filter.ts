export class TextFilter {

    public static TEXT: string = "$text";

    private fields: string[];

    private search: string;

    public constructor(fields: string[], search: string) {
        this.fields = fields;
        this.search = search;
    }

    public toJSON(): any {
        return {
            "$fields": this.fields,
            "$search": this.search
        };
    }

    public static fromJSON(json: string): TextFilter {
        return this.fromObject(JSON.parse(json));
    }

    public static fromObject(object: Object): TextFilter {
        return new TextFilter(object["$fields"], object["$search"]);
    }

}
