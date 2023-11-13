import {
  ColumnFiltersState,
  ColumnOrderState,
  ExpandedState,
  FilterFn,
  GroupingState,
  PaginationState,
  RowSelectionState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableProps } from "../..";
import { TableRef } from "../../types";
import * as React from "react";

const arrIncludesSome: FilterFn<unknown> = (row, columnId, value) => {
  // Rank the item
  const rowValue = row.getValue(columnId);
  const passed =
    Array.isArray(value) &&
    (value?.length === 0 || value.includes(`${rowValue}`));

  // console.log("rowValue", rowValue, "value", value, "passed", passed, "columnId", columnId)

  // Return if the item should be filtered in/out
  return passed;
};

export const useGridContainer = <TItem extends object>(
  props: TableProps<TItem>,
  ref: React.ForwardedRef<TableRef<TItem>>
) => {
  const { columns, data, rowSelectionMode } = props;

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: props.pageSize || 10,
    pageIndex: 0,
  });

  const [sorting, setSorting] = React.useState<SortingState>(
    props.sortingState ?? []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    props.columnFilterState ?? []
  );
  const [globalFilter, setGlobalFilter] = React.useState(
    props.defaultGlobalFilter ?? ""
  );
  const [grouping, setGrouping] = React.useState<GroupingState>(
    props.groupingState ?? []
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    props.rowSelectionState ?? {}
  );
  const [columnVisibility, setColumnVisibility] = React.useState(
    props.columnVisibility ?? {}
  );
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    () => props.columnOrderState ?? columns.map((column) => column.id as string)
  );
  const [expanded, setExpanded] = React.useState<ExpandedState>(
    props.expandedState ?? {}
  );
  const [columnPinning, setColumnPinning] = React.useState(
    props.columnPinningState ?? {}
  );

  const table = useReactTable<TItem>({
    columns: columns,
    data,
    filterFns: {
      arrIncludesSome,
    },
    initialState: {
      expanded: true
    },
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      grouping,
      expanded,
      rowSelection,
      columnOrder,
      columnVisibility,
      columnPinning,
    },
    columnResizeMode: "onChange",
    enableRowSelection: rowSelectionMode !== undefined,
    enableMultiRowSelection: rowSelectionMode === "multiple",
    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    filterFromLeafRows: true,
    autoResetExpanded: false,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onGroupingChange: setGrouping,
    onColumnOrderChange: setColumnOrder,
    onExpandedChange: setExpanded,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  const getTableState = React.useCallback(() => {
    return {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      grouping,
      expanded,
      rowSelection,
      columnOrder,
      columnVisibility,
      columnPinning,
    };
  }, [
    pagination,
    sorting,
    columnFilters,
    globalFilter,
    grouping,
    expanded,
    rowSelection,
    columnOrder,
    columnVisibility,
    columnPinning,
  ]);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        table,
        getTableState: getTableState,
        saveCurrentTableState: (viewName: string) => {
          const tableState = getTableState();
          const tableStateString = JSON.stringify(tableState);
          localStorage.setItem(viewName, tableStateString);
          return true;
        },
        applySavedView: (viewName: string) => {
          const tableStateString = localStorage.getItem(viewName);
          if (tableStateString) {
            const tableState = JSON.parse(tableStateString);
            setSorting(tableState.sorting);
            setColumnFilters(tableState.columnFilters);
            setGlobalFilter(tableState.globalFilter);
            setGrouping(tableState.grouping);
            setExpanded(tableState.expanded);
            setRowSelection(tableState.rowSelection);
            setColumnOrder(tableState.columnOrder);
            setColumnVisibility(tableState.columnVisibility);
            setColumnPinning(tableState.columnPinning);
            setTimeout(() => {
              setPagination(tableState.pagination);
            }, 10);
            return true;
          }
          return false;
        },
      };
    },
    [table, getTableState]
  );

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
};
