declare function sort<T>(array: T[], opts?: sort.Options): T[];

declare namespace sort {
    interface Options {
        insensitive?: boolean;
        sign?: boolean;
    }
}

export = sort;
