import * as React from "react";
import { tryGetObjectValue } from "../components";

export function filterItemsByTerm<TITem>(filedKeys: (string | number)[], items: TITem[], searchTerm: string | number | Date) {
    if (searchTerm) { 
        const filteredItems = items?.filter(function (item: TITem) {
            return filedKeys?.some(function (k: string | number) {
                const fieldValue = tryGetObjectValue(k as string, item)
                return (
                    fieldValue
                        ?.toString()
                        ?.toLowerCase()
                        ?.indexOf(`${searchTerm}`?.toLocaleLowerCase()) > -1
                );
            });
        });

        // return shallow copy of array
        return filteredItems?.splice(0);
    }

    return items;
}

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