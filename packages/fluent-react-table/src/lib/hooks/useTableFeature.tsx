import * as React from "react";
import { TableProps } from "../props-types";
import { useTableFilter } from "./useTableFilter";
import { useTableSelection } from "./useTableSelection";
import { useTablePagination } from "./useTablePagination";
import { useTableSorting } from "./useTableSorting";
import { useTableGrouping } from "./useTableGrouping";
import { useTableColumns } from "./useTableColumns";
import { IGroup } from "../types";
import { useTableColumnSizing_unstable, useTableFeatures, } from "@fluentui/react-components"; 

export function useCustomTableFeature<TItem extends NonNullable<{ id: string | number }>>(props: TableProps<TItem>) {

    const { 
        items,
        isLoading,
        selectionMode = "none",
        defaultPageSize = 10,
        pageSizeOption = [10, 20, 50, 100,],
        isPageOnGroup = true,
        isGroupDefaultExpanded = true,
        defaultSortedColumnIds = [],
        defaultGroupColumnIds = [],
        onGetGridActionMenu
    } = props;

    const { filter, setFilterValue, resetFilterValue, applyFilter, } = useTableFilter()
    
    const {
         selectedItems, 
         toggleRow, 
         toggleAllRows, 
         isEverySelected, 
         isItemSelected 
    } = useTableSelection(selectionMode, (selectedItems: TItem[]) => {
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
        toggleColumnGroup,
        resetGroupColumns,

        isAllCollapsed,
        calculateGroups,

        toggleGroupExpand,
        toggleAllGroupExpand
    } = useTableGrouping<TItem>(defaultGroupColumnIds, isGroupDefaultExpanded);

    const {
        columns,
        columnSizingOptions,
        extendedColumns,

        visibleColumns,
        setVisibleColumns
    } = useTableColumns<TItem>(props.columns)

    /**
     * This is Default fluent ui table feature hooks
     * 
     */
    const { columnSizing_unstable, tableRef }: { columnSizing_unstable: any, tableRef: React.Ref<HTMLDivElement> } = useTableFeatures<TItem>(
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
                combinedSortColumns = groupedColumns.map((gc => {
                    return sortedColumns.some(sc => sc.includes(gc)) ? sortedColumns?.[0] : gc;
                }))
            } else {
                combinedSortColumns = [...groupedColumns, ...sortedColumns];
            }

        } else {
            combinedSortColumns = sortedColumns;
        }
 
        const sItems = applySort(combinedSortColumns, filteredItems);
        return sItems;

        // return filteredItems;
    }, [filteredItems, sortedColumns, groupedColumns]);

    /**
     * Calculate pagedItems
     */
    const pagedItems = React.useMemo(() => {

        let startIndex = currentPage * pageSize;
        let count = pageSize;

        // calculate page start and end based on group information
        let pGroups: IGroup[] = [];
        let pItems: TItem[] = [];


        // new implementation
        if (isPageOnGroup && groupedColumns.length > 0) {

            // calculate group on sorted items
            const groups = calculateGroups(groupedColumns, sortedItems, columns);

            // update total number of count as te group count -- because page is on the group now
            updateTotalItemCount(groups.length ?? 0);

            // calculate paged group
            pGroups = [...groups]?.splice(startIndex, count);

            // get start and item count based on group information
            startIndex = pGroups?.length > 0 ? pGroups?.[currentPage*pageSize]?.startIndex : 0;
            count = pGroups?.reduce(function (total: number, item: IGroup) {
                return total + item.count;
            }, 0);

            // now paged items will be all the items because page will be based on the group
            pItems = [...sortedItems];

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

    const saveTableState = React.useCallback(() => {

        //todo
        const tableState = {
            filter: filter,
            groupedColumns: groupedColumns,
            sortedColumns: sortedColumns,
            visibleColumns: visibleColumns
        }

        localStorage.setItem("table1", JSON.stringify(tableState));

    }, [groupedColumns, sortedColumns, filter, visibleColumns])

    const applyTableState = React.useCallback((key: string) => {

        const tableState = JSON.parse(localStorage.getItem(key) as string); 
        toggleSortColumn(tableState?.sortedColumns?.[0]);
        setFilterValue(tableState.filter);
        setVisibleColumns(tableState.visibleColumns);

    }, [])

    const showLoader = React.useMemo(() => isLoading && items?.length === 0, [isLoading, items]);
    const showNoItem = React.useMemo(() => !isLoading && items?.length === 0, [isLoading, items]);
    const showNoItemMatch = React.useMemo(() => pagedItems?.length === 0 && items?.length > 0, [isLoading, pagedItems, items]);
  

    const gridActionMenu = React.useMemo(() => {
        return onGetGridActionMenu && onGetGridActionMenu(selectedItems)
    }, [selectedItems])

    const showHideOptionSelected = React.useMemo<Record<string, string[]>>(() => ({ hiddenCols: visibleColumns }), [visibleColumns]);
  

    return {
        items,
        filteredItems,
        sortedItems,
        pagedItems,

        showLoader,
        showNoItem,
        showNoItemMatch,

        gridActionMenu,
        showHideOptionSelected,

        saveTableState,
        applyTableState,

        defaultFeatures: { columnSizing_unstable, tableRef },

        columnsState: {
            columns,
            columnSizingOptions,
            extendedColumns,

            visibleColumns,
            setVisibleColumns
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
            toggleColumnGroup,
            resetGroupColumns,
            isAllCollapsed,

            toggleGroupExpand,
            toggleAllGroupExpand
        }

    } as const;
}
