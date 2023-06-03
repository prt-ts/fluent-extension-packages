import * as React from "react";
import { TableProps } from "../props-types";
import { useTableFilter } from "./useTableFilter";
import { useTableSelection } from "./useTableSelection";
import { useTablePagination } from "./useTablePagination";
import { useTableSorting } from "./useTableSorting";
import { useTableGrouping } from "./useTableGrouping";
import { useTableColumns } from "./useTableColumns";
import { IGroup, SavedTableView, TableView } from "../types";
import { useTableColumnSizing_unstable, useTableFeatures, } from "@fluentui/react-components";

export function useCustomTableFeature<TItem extends NonNullable<{ id: string | number }>>(props: TableProps<TItem>) {

    const {
        tableName,
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
        setGroupedColumns,
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
            startIndex = pGroups?.length > 0 ? pGroups?.[currentPage * pageSize]?.startIndex : 0;
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


    // ----------- Table View Management Section ---------------//
    const [views, setViews] = React.useState<TableView[]>([]);
    React.useEffect(() => {
        if (tableName) {
            const allViews = JSON.parse(localStorage.getItem(tableName) as string) as SavedTableView;
            setViews(allViews?.views ?? [])
        }
    }, [tableName])

    const saveTableView = React.useCallback((viewName: string) => {

        //todo
        const newTableView: TableView = {
            viewName: viewName,
            filter: filter ?? "",
            groupedColumns: groupedColumns ?? [],
            sortedColumns: sortedColumns ?? [],
            visibleColumns: visibleColumns ?? []
        }

        const newSetOfViews: SavedTableView = { views: [...(views?.filter(v => v.viewName !== viewName) ?? []), newTableView] }

        setViews(newSetOfViews.views);
        localStorage.setItem(tableName, JSON.stringify(newSetOfViews));

    }, [groupedColumns, sortedColumns, filter, visibleColumns, views, tableName])

    const applyTableView = React.useCallback((viewName: string) => {
        const viewDetail = views?.find(vn => vn.viewName === viewName);
        if (viewDetail) {
            toggleSortColumn(viewDetail?.sortedColumns?.[0]);
            setFilterValue(viewDetail.filter);
            setVisibleColumns(viewDetail.visibleColumns);
            setGroupedColumns(viewDetail.groupedColumns);
        }
    }, [views])

    //--------------Table View Management End-------------------- //

    const showLoader = React.useMemo(() => isLoading && items?.length === 0, [isLoading, items]);
    const showNoItem = React.useMemo(() => !isLoading && items?.length === 0, [isLoading, items]);
    const showNoItemMatch = React.useMemo(() => pagedItems?.length === 0 && items?.length > 0, [isLoading, pagedItems, items]);


    const gridActionMenu = React.useMemo(() => {
        return onGetGridActionMenu && onGetGridActionMenu(selectedItems)
    }, [selectedItems])


    return {
        items,
        filteredItems,
        sortedItems,
        pagedItems,

        showLoader,
        showNoItem,
        showNoItemMatch,

        gridActionMenu,

        defaultFeatures: { columnSizing_unstable, tableRef },

        viewsState: {
            views,
            saveTableView,
            applyTableView,
        },

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
