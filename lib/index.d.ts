declare function sort(array: unknown[], opts: Options): any[];
export default sort;
export type Options = {
    insensitive?: boolean;
    sign?: boolean;
};
