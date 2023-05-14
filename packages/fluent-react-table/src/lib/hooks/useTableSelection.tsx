import * as React from "react";
import { SelectionMode } from "../types"

export function useTableSelection<TItem extends NonNullable<{ id: string | number }>>(selectionMode: SelectionMode = "none", onItemSelectChange?: (selectedItems: TItem[]) => void) {

    const [selectedItems, setSelectedItems] = React.useState<TItem[]>([]);

    const toggleRow = React.useCallback((item: TItem): void => {

        switch (selectionMode) {
            case "multiple": {
                const newSelectedItems = selectedItems.some(x => x.id === item.id) ? selectedItems.filter(x => x.id !== item.id) : [...selectedItems, item];
                setSelectedItems(newSelectedItems);
                // trigger on change
                onItemSelectChange && onItemSelectChange(newSelectedItems)
                break;
            }
            case "single": {
                const newSelectedItems = selectedItems.some(x => x.id === item.id) ? selectedItems.filter(x => x.id !== item.id) : [item];
                setSelectedItems(newSelectedItems);
                // trigger on change
                onItemSelectChange && onItemSelectChange(newSelectedItems)
                break;
            }
        }
    }, [selectedItems]);

    const toggleAllRows = React.useCallback((items: TItem[]): void => {

        const newSelectedItems = selectedItems?.length > 0 ? [] : items;
        setSelectedItems(newSelectedItems);

        // trigger on change
        onItemSelectChange && onItemSelectChange(newSelectedItems)

    }, [selectedItems]);

    const isItemSelected = React.useCallback((item: TItem): boolean => selectedItems?.some(x => x.id === item.id), [selectedItems]);

    const isEverySelected = React.useCallback((items: TItem[]): boolean | "mixed" =>
        items?.every(x => selectedItems?.findIndex(s => x.id === s.id) > -1)
            ? true
            : items?.some(x => selectedItems?.findIndex(s => x.id === s.id) > -1) ? "mixed" : false
        , [selectedItems]);

    return {
        toggleRow,
        toggleAllRows,
        isItemSelected,
        isEverySelected
    } as const;
}