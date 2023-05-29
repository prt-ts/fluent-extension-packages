import * as React from "react";
import { TableProps } from "../props-types";
import { useTableFilter } from "./useTableFilter";
import { useTableSelection } from "./useTableSelection";
import { useTablePagination } from "./useTablePagination";
import { useTableSorting } from "./useTableSorting";
import { useTableGrouping } from "./useTableGrouping";
import {useTableColumns} from "./useTableColumns";
import { IGroup } from "../types";
import {   useTableColumnSizing_unstable, useTableFeatures, } from "@fluentui/react-components";
import { TableFeaturesState } from "@fluentui/react-table"

type TCSizeState<TItem> =  TableFeaturesState<TItem>["columnSizing_unstable"];

export function useCustomTableFeature<TItem extends NonNullable<{ id: string | number }>>(props: TableProps<TItem>) {

    const { items,  
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
        setGroups,
        groupedColumns,
        isAllCollapsed,
        calculateGroups,

        toggleGroupExpand,
        toggleAllGroupExpand
    } = useTableGrouping<TItem>(defaultGroupColumnIds);

    const  {
        columns,
        columnSizingOptions,
        extendedColumns
    } = useTableColumns<TItem>(props.columns)


    /**
     * This is Default fluent ui table feature hooks
     * 
     */
    const { columnSizing_unstable, tableRef } : {columnSizing_unstable: any, tableRef: React.Ref<HTMLDivElement>}  = useTableFeatures<TItem>(
        {
            columns,
            items
        },
        [useTableColumnSizing_unstable({ columnSizingOptions })]
    );
    
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
    }, [items, filter, props.columns]);

    /**
     * Calculate Sort for Grid
     */
    const sortedItems = React.useMemo(() => {

        if (sortedColumns?.length > 0) {
            // set page to first page
            setPage(0);
        }

        // define combined sort columns to fuse grouped and sort columns 
        let combinedSortColumns: string[] = [];

        if (groupedColumns?.length > 0) {
            //todo

            // check if sorted column exist on the grouped columns
            if (groupedColumns.some(gc => sortedColumns?.some(sc => sc.includes(gc)))) {
                console.log("sorted column is in grouped column", groupedColumns, sortedColumns);

                combinedSortColumns = groupedColumns.map((gc => {
                    return sortedColumns.some(sc => sc.includes(gc)) ? sortedColumns?.[0] : gc;
                }))
            }else{
                combinedSortColumns = [...groupedColumns, ...sortedColumns];
            }

        } else {
            combinedSortColumns = sortedColumns;
        }

        console.log("Calculating Sorting", combinedSortColumns)
        const sItems = applySort(combinedSortColumns, filteredItems);
        return sItems;

        // return filteredItems;
    }, [filteredItems, sortedColumns, groupedColumns]);

    /**
     * Calculate pagedItems
     */
    const pagedItems = React.useMemo(() => {

        console.log("Calculating Pagination", sortedItems.length);
        let startIndex = currentPage * pageSize;
        let count = pageSize;

        // calculate page start and end based on group information
        let pGroups: IGroup[] = [];
        let pItems: TItem[] = [];


        // new implementation
        if (isPageOnGroup) {

            // calculate group on sorted items
            const groups = calculateGroups(groupedColumns, sortedItems, columns);

            // update total number of count as te group count -- because page is on the group now
            updateTotalItemCount(groups.length ?? 0);

            // calculate paged group
            pGroups = [...groups]?.splice(startIndex, count);

            // get start and item count based on group information
            startIndex = pGroups?.length > 0 ? pGroups?.[0]?.startIndex : 0;
            count = pGroups?.reduce(function (total: number, item: IGroup) {
                return total + item.count;
            }, 0);

            // calculate paged items based on group item counts
            pItems = [...sortedItems]?.splice(startIndex, count);

        }
        else {
            // first calculate paged items
            pItems = [...sortedItems]?.splice(startIndex, count);

            // calculate group information on the paged items
            // NOTE: here group is calculated based on paged items not a sorted items only
            pGroups = calculateGroups(groupedColumns, pItems, columns);

            // update total number of count as te group count -- because page is on the group now
            updateTotalItemCount(sortedItems.length ?? 0);
        }

        // set groups
        setGroups(pGroups)

        // Pagination Calculation 
        return pItems;
    }, [sortedItems, currentPage, pageSize, isPageOnGroup, groupedColumns]);

    return {
        items,
        filteredItems,
        sortedItems,
        pagedItems,

        defaultFeatures : { columnSizing_unstable, tableRef },

        columnsState : {
            columns,
            columnSizingOptions,
            extendedColumns
        },

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
