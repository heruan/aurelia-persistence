import { autoinject} from "aurelia-dependency-injection";
import { GroupFilter} from "./group-filter";
import { FieldFilter} from "./field-filter";
import { TextFilter} from "./text-filter";
import { Query} from "./query";

@autoinject
export class FilterQuery implements Query {

    public static FILTERING_EVENT: string = "aurelia.persistence.filtering";

    private map: Map<string, any>;

    public constructor(filterQuery?: FilterQuery) {
        this.map = filterQuery ? new Map<string, any>(filterQuery.map) : new Map<string, any>();
    }

    public field(fieldName: string, fieldFilter: FieldFilter): FilterQuery {
        this.map.set(fieldName, fieldFilter);
        return this;
    }

    public unset(fieldName: string): FilterQuery {
        this.map.delete(fieldName);
        return this;
    }

    public textFields(fieldNames: string[], search: string): FilterQuery {
        return this.text(new TextFilter(fieldNames, search));
    }

    public text(textFilter: TextFilter): FilterQuery {
        this.map.set(TextFilter.TEXT, textFilter);
        return this;
    }

    public unsetText(): FilterQuery {
        this.map.delete(TextFilter.TEXT);
        return this;
    }

    public or(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.OR ];
        return this.group.apply(this, args.concat(filters));
    }

    public and(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.AND ];
        return this.group.apply(this, args.concat(filters));
    }

    public not(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.NOT ];
        return this.group.apply(this, args.concat(filters));
    }

    public nor(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.NOR ];
        return this.group.apply(this, args.concat(filters));
    }

    public group(groupAggregator: string, ...filters: FilterQuery[]): FilterQuery {
        if (!this.map.has(groupAggregator)) {
            this.map.set(groupAggregator, new GroupFilter());
        }
        let groupFilter: GroupFilter = this.map.get(groupAggregator);
        for (let filter of filters) {
            groupFilter.add(filter);
        }
        return this;
    }

    public unsetOr(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.OR ];
        return this.unsetGroup.apply(this, args.concat(filters));
    }

    public unsetAnd(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.AND ];
        return this.unsetGroup.apply(this, args.concat(filters));
    }

    public unsetNot(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.NOT ];
        return this.unsetGroup.apply(this, args.concat(filters));
    }

    public unsetNor(...filters: FilterQuery[]): FilterQuery {
        let args: any[] = [ GroupFilter.NOR ];
        return this.unsetGroup.apply(this, args.concat(filters));
    }

    public unsetGroup(groupAggregator: string, ...filters: FilterQuery[]): FilterQuery {
        if (this.map.has(groupAggregator)) {
            let groupFilter: GroupFilter = this.map.get(groupAggregator);
            for (let filter of filters) {
                groupFilter.remove(filter);
            }
            if (groupFilter.size == 0) {
                this.map.delete(groupAggregator);
            }
        }
        return this;
    }

    public equalTo(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().equalTo(value));
    }

    public notEqualTo(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().notEqualTo(value));
    }

    public greaterThan(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().greaterThan(value));
    }

    public greaterThanOrEqualTo(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().greaterThanOrEqualTo(value));
    }

    public lessThan(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().lessThan(value));
    }

    public lessThanOrEqualTo(fieldName: string, value: any): FilterQuery {
        return this.field(fieldName, new FieldFilter().lessThanOrEqualTo(value));
    }

    public in(fieldName: string, array: any[]): FilterQuery {
        return this.field(fieldName, new FieldFilter().in(array));
    }

    public notIn(fieldName: string, array: any[]): FilterQuery {
        return this.field(fieldName, new FieldFilter().notIn(array));
    }

    public mod(fieldName: string, mod: number): FilterQuery {
        return this.field(fieldName, new FieldFilter().mod(mod));
    }

    public regex(fieldName: string, regex: string): FilterQuery {
        return this.field(fieldName, new FieldFilter().regex(regex));
    }

    public elemMatch(fieldName: string, filter: FilterQuery): FilterQuery {
        return this.field(fieldName, new FieldFilter().elemMatch(filter));
    }

    public copy(): FilterQuery {
        return new FilterQuery(this);
    }

    public toJSON(): Object {
        let filter = { };
        this.map.forEach((value, key) => filter[key] = value);
        return filter;
    }

    public static fromJSON(object: Object): FilterQuery {
        let filter = new FilterQuery();
        for (let field in object) {
            switch (field) {
                case GroupFilter.OR: filter.or(...object[field].map(f => FilterQuery.fromJSON(f)));
                break;
                case GroupFilter.AND: filter.and(...object[field].map(f => FilterQuery.fromJSON(f)));
                break;
                case GroupFilter.NOT: filter.not(...object[field].map(f => FilterQuery.fromJSON(f)));
                break;
                case GroupFilter.NOR: filter.nor(...object[field].map(f => FilterQuery.fromJSON(f)));
                break;
                case TextFilter.TEXT: filter.text(TextFilter.fromJSON(object[field]));
                break;
                default: filter.field(field, FieldFilter.fromJSON(object[field]));
            }
        }
        return filter;
    }

}
