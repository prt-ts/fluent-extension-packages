import {
  Column,
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
} from '@tanstack/react-table';
import { TableProps } from '..';
import { TableRef } from '../types';
import * as React from 'react';

const arrIncludesSome: FilterFn<unknown> = (row, columnId, value) => {
  // Rank the item
  const rowValue = row.getValue(columnId);
  const passed =
    Array.isArray(value) &&
    (value?.length === 0 || value.includes(`${rowValue}`));

  return passed;
};

const getLeafColumns = <TItem extends object>(
  columns: Column<TItem>[]
): Column<TItem>[] => {
  if (!columns || !columns.length) {
    return [];
  }
  return columns.reduce((totalItems: Column<TItem>[], col: Column<TItem>) => {
    if (!col.columns) {
      totalItems.push(col);
    }
    return totalItems.concat(getLeafColumns(col.columns));
  }, []);
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
    props.defaultGlobalFilter ?? ''
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
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() => {
    if (props.columnOrderState) {
      return props.columnOrderState;
    }

    const leafColumns = getLeafColumns(columns as unknown as Column<TItem>[]);
    return leafColumns.map((col: Column<TItem>) => col.id as string);
  });
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
      arrIncludesSome: arrIncludesSome,
    },
    initialState: {
      expanded: true,
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
    columnResizeMode: 'onChange',
    enableRowSelection: rowSelectionMode !== undefined,
    enableMultiRowSelection: rowSelectionMode === 'multiple',
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

  const resetToDefaultView = () => {
    setSorting(props.sortingState ?? []);
    setColumnFilters(props.columnFilterState ?? []);
    setGlobalFilter(props.defaultGlobalFilter ?? '');
    setGrouping(props.groupingState ?? []);
    setExpanded(props.expandedState ?? {});
    setRowSelection(props.rowSelectionState ?? {});
    setColumnOrder(() => {
      if (props.columnOrderState) {
        return props.columnOrderState;
      }

      const leafColumns = getLeafColumns(columns as unknown as Column<TItem>[]);
      return leafColumns.map((col: Column<TItem>) => col.id as string);
    });
    setColumnVisibility(props.columnVisibility ?? {});
    setColumnPinning(props.columnPinningState ?? {});
    setTimeout(() => {
      setPagination({
        pageSize: props.pageSize || 10,
        pageIndex: 0,
      });
    }, 10);
    return true;
  };

  const applySavedView = (viewName: string) => {
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
  };

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
        applySavedView: applySavedView,
        resetToDefaultView: resetToDefaultView,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, getTableState]
  );

  return {
    table,
    globalFilter,
    setGlobalFilter,
    resetToDefaultView
  };
};
