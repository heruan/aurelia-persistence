export interface Query {
    and(...queries: Query[]): Query;
    or(...queries: Query[]): Query;
    unsetAnd(...queries: Query[]): Query;
    unsetOr(...queries: Query[]): Query;
    copy(): Query;
}
