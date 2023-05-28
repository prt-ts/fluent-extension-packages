import * as React from "react";
import { TableProps } from "../props-types";
import { useTableFilter } from "./useTableFilter";
import { useTableSelection } from "./useTableSelection";
import { useTablePagination } from "./useTablePagination";
import { useTableSorting } from "./useTableSorting";
import { useTableGrouping } from "./useTableGrouping";
import { IGroup } from "../types";

export function useCustomTableFeature<TItem extends NonNullable<{ id: string | number }>>(props: TableProps<TItem>) {

    const { items,
        columns,
        selectionMode = "none",
        defaultPageSize = 10,
        pageSizeOption = [10, 20, 50, 100,],
        isPageOnGroup = true,
        defaultSortedColumnIds = [],
        defaultGroupColumnIds = []
    } = props;

    const { filter, setFilterValue, resetFilterValue, applyFilter, } = useTableFilter()
    const { selectedItems, toggleRow, toggleAllRows, isEverySelected, isItemSelected } = useTableSelection(selectionMode, (selectedItems: TItem[]) => {

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
    } = useTablePagination(defaultPageSize, pageSizeOption);

    const {
        sortedColumns,

        applySort,
        toggleSortColumn,
        resetSortColumns,

        isColumnSorted,
        isSortedAscending
    } = useTableSorting<TItem>(defaultSortedColumnIds);

    const {
        groups,
        groupedColumns,
        isAllCollapsed,
        calculateGroups,

        toggleGroupExpand,
        toggleAllGroupExpand
    } = useTableGrouping<TItem>(defaultGroupColumnIds)

    /**
     * Filter grid
     */
    const filteredItems = React.useMemo(() => {
        console.log("Calculating Filter", items.length)

        // filter items
        const columnIds = columns.map(x => x.columnId);
        const fItems = applyFilter(columnIds, items) as TItem[];

        // update total number of items to calculate page
        updateTotalItemCount(fItems?.length ?? 0);

        return fItems;
    }, [items, filter, columns]);

    /**
     * Calculate Sort for Grid
     */
    const sortedItems = React.useMemo(() => {

        console.log("Calculating Sorting", sortedColumns)

        if (sortedColumns?.length > 0) {
            // set page to first page
            setPage(0);
        }

        const sItems = applySort([...groupedColumns, ...sortedColumns], filteredItems);
        return sItems;

        // return filteredItems;
    }, [filteredItems, sortedColumns, groupedColumns]);

    /**
     * Calculate Group
     */
    React.useEffect(() => {

        console.log("Calculating Grouping", groupedColumns);
        const g = calculateGroups(groupedColumns, sortedItems, columns)
        console.log(g)

        if (g.length > 0 && isPageOnGroup) {
            updateTotalItemCount(g.length ?? 0);
        }  
    }, [sortedItems, groupedColumns, isPageOnGroup])

    /**
     * Calculate pagedItems
     */
    const pagedItems = React.useMemo(() => {

        console.log("Calculating Pagination", sortedItems.length);
        let startIndex = currentPage * pageSize;
        let count = pageSize;

        // calculate page start and end based on group information
        if (groups.length > 0 && isPageOnGroup) {
            const pagedGroups = [...groups]?.splice(currentPage * pageSize, pageSize);
            startIndex = pagedGroups?.length > 0 ? pagedGroups?.[0]?.startIndex : 0;
            count = pagedGroups?.reduce(function (total, item: IGroup) {
                return total + item.count;
            }, 0)
        }

        // Pagination Calculation
        console.log(startIndex, count)
        return [...sortedItems]?.splice(startIndex, count);
    }, [sortedItems, currentPage, pageSize, isPageOnGroup, groups]);

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

        sortState: {

            toggleSortColumn,
            resetSortColumns,

            isColumnSorted,
            isSortedAscending
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
        },

        groupedState: {
            groups, 
            groupedColumns,
            isAllCollapsed,
            
            toggleGroupExpand,
            toggleAllGroupExpand
        }

    } as const;
}
