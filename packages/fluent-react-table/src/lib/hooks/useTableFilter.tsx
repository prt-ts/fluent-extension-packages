import * as React from "react";
import { filterItemsByTerm } from "../../../../utilities/src";

export function useTableFilter<TItem extends NonNullable<{id : string | number}>>() {

    const [filter, setFilter] = React.useState<string | Date | number>("");

    const applyFilter = React.useCallback((columnIds: (string | number)[],items: TItem[]): TItem[] => {

        if (filter) { 
            const globallyFilteredItems = filterItemsByTerm<TItem>(columnIds, items, filter);
            return globallyFilteredItems;
        }

        return items;

    }, [filter]);

    const resetFilterValue = React.useCallback((): void => setFilter(""), []);
    const setFilterValue = React.useCallback((newFilterTerm: string | Date | number): void => setFilter(newFilterTerm), []);


    return {
        filter,

        applyFilter,
        setFilterValue,
        resetFilterValue
    } as const;
}