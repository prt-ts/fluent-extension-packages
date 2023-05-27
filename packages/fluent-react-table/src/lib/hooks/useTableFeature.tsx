import * as React from "react";
import { TableProps } from "../props-types";
import { useTableFilter } from "./useTableFilter";
import { useTableSelection } from "./useTableSelection";
import { useTablePagination } from "./useTablePagination";

export function useCustomTableFeature<TItem extends NonNullable<{ id: string | number }>>(props: TableProps<TItem>) {

    const { items, 
        columns,
        selectionMode = "none",
        defaultPageSize = 10,
        pageSizeOption = [10, 20, 50, 100, ],
    } = props;

    const { filter, setFilterValue, resetFilterValue, applyFilter, } = useTableFilter()
    const {selectedItems, toggleRow, toggleAllRows, isEverySelected, isItemSelected } = useTableSelection(selectionMode, (selectedItems: TItem[]) => {

        console.log(selectedItems);
        // propagate selection
        props.onSelectionChange && props.onSelectionChange(selectedItems);
    });

    const {
        currentPage,
        pageSize,
        totalNumberOfPage,
        pageSelectionOptions,
        pageSizeOptions,
        setPage,
        previous,
        next,
        first,
        last,
        updatePageSize,
        updateTotalItemCount
    } = useTablePagination(defaultPageSize, pageSizeOption)

    const filteredItems = React.useMemo(() => {
        console.log("Calculating Filter", items.length)

        // filter items
        const columnIds = columns.map(x => x.columnId);
        const fItems = applyFilter(columnIds, items) as TItem[];

        // update total number of items to calculate page
        updateTotalItemCount(fItems?.length ?? 0); 

        // set page size to 0
        setPage(0);

        return fItems;
    }, [items, filter, columns]);

    const sortedItems = React.useMemo(() => {

        console.log("Calculating Sorting", filteredItems.length)

        // TODO Sort 
        return filteredItems;
    }, [filteredItems]);


    const pagedItems = React.useMemo(() => { 

        console.log("Calculating Pagination", sortedItems.length);
        
        // Pagination Calculation 
        return [...sortedItems]?.splice(currentPage * pageSize, pageSize);
    }, [sortedItems, currentPage, pageSize]);

    return {
        items,
        filteredItems,
        sortedItems,
        pagedItems,

        selectionState: {
            selectedItems,
            isEverySelected,
            isItemSelected,
            toggleRow,
            toggleAllRows
        },

        filterState: {
            filterValue: filter,
            resetFilterValue,
            setFilterValue
        },

        paginationState: {
            currentPage,
            pageSize,
            totalNumberOfPage,
            pageSelectionOptions,
            pageSizeOptions,
            setPage,
            previous,
            next,
            first,
            last,
            updatePageSize
        }


    } as const;
}