import {
  Column,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  PaginationState,
  RowData,
  RowPinningState,
  RowSelectionState,
  SortingState,
  TableState,
  VisibilityState,
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
import { TableProps, TableRef, TableView } from '../types';
import * as React from 'react';
import { arrIncludesSome, date, dateRange } from '../helpers/FilterHelpers';
import { getLeafColumns } from '../helpers/Helpers';
import { tableReducer } from './reducer';

export const useGridContainer = <TItem extends RowData>(
  props: TableProps<TItem>,
  ref: React.ForwardedRef<TableRef<TItem>>
) => {
  const {
    defaultColumn,
    columns,
    data,
    rowSelectionMode,
    autoResetPageIndex,
    onUpdateData,
    isRowSelectable,
  } = props;

  const [drawerState, dispatch] = React.useReducer<typeof tableReducer<string>>(
    tableReducer,
    {
      isFilterDrawerOpen: false,
      isViewsDrawerOpen: false,
    }
  );

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
  const [globalFilter, setGlobalFilter] = React.useState<string>(
    props.defaultGlobalFilter ?? ''
  );
  const [grouping, setGrouping] = React.useState<GroupingState>(
    props.groupingState ?? []
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    props.rowSelectionState ?? {}
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(props.columnVisibility ?? {});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() => {
    if (props.columnOrderState) {
      return props.columnOrderState;
    }

    const leafColumns = getLeafColumns(columns as Column<TItem>[]);
    return leafColumns.map((col: Column<TItem>) => col.id as string);
  });
  const [expanded, setExpanded] = React.useState<ExpandedState>(
    props.expandedState ?? {}
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    props.columnPinningState ?? {}
  );
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});

  const [rowPinning, setRowPinning] = React.useState<RowPinningState>(
    props.rowPinningState ?? {
      top: [],
      bottom: [],
    }
  );

  const table = useReactTable<TItem>({
    defaultColumn,
    columns: columns,
    data,
    filterFns: {
      arrIncludesSome: arrIncludesSome,
      inDateRange: dateRange,
      matchDate: date,
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
      columnSizing,
      rowPinning,
    },
    getRowId(originalRow, index, parent) {
      const keyProps = props.dataPrimaryKye as keyof TItem;
      return (originalRow[keyProps] as string) || `${index}`;
    },
    columnResizeMode: 'onChange',
    enableRowSelection: (row) => {
      if (!isRowSelectable) {
        return rowSelectionMode !== undefined;
      }
      return isRowSelectable(row);
    },
    enableMultiRowSelection: rowSelectionMode === 'multiple',
    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    filterFromLeafRows: true,
    autoResetExpanded: false,
    autoResetPageIndex: autoResetPageIndex,
    keepPinnedRows: true,
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
    onColumnSizingChange: setColumnSizing,
    onRowPinningChange: setRowPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    meta: {
      pageSizeOptions: props.pageSizeOptions || [10, 20, 50, 100, 1000],
      rowSelectionMode: props.rowSelectionMode,
      isAutoExpandOnGroup: props.isAutoExpandOnGroup ?? false,
      tableHeight: props.tableHeight || '650px',

      updateData: onUpdateData,
      onTableViewDelete: props.onTableViewDelete,
      onTableViewSave: props.onTableViewSave,

      drawerState: drawerState,
      dispatchDrawerAction: dispatch,

      // all the table state modifiers
      setPagination,
      setSorting,
      setColumnFilters,
      setGlobalFilter,
      setGrouping,
      setRowSelection,
      setColumnVisibility,
      setColumnOrder,
      setExpanded,
      setColumnPinning,
      setColumnSizing,
      setRowPinning,

      tableSettings: props.tableSettings ?? {},
    },
  });

  const tableViews = React.useMemo<TableView[]>(
    () => props.views ?? [],
    [props.views]
  );

  const resetToDefaultView = () => {
    const defaultTableState: TableState = {
      pagination: {
        pageSize: props.pageSize || 10,
        pageIndex: 0,
      },
      sorting: props.sortingState ?? [],
      columnFilters: props.columnFilterState ?? [],
      globalFilter: props.defaultGlobalFilter ?? '',
      grouping: props.groupingState ?? [],
      expanded: props.expandedState ?? {},
      rowSelection: props.rowSelectionState ?? {},
      columnOrder: (() => {
        if (props.columnOrderState) {
          return props.columnOrderState;
        }

        const leafColumns = getLeafColumns(
          columns as unknown as Column<TItem>[]
        );
        return leafColumns.map((col: Column<TItem>) => col.id as string);
      })(),
      columnVisibility: props.columnVisibility ?? {},
      columnPinning: props.columnPinningState ?? {},
      columnSizing: {},
      rowPinning: props.rowPinningState ?? {},
      columnSizingInfo: {
        startOffset: null,
        startSize: null,
        deltaOffset: null,
        deltaPercentage: null,
        isResizingColumn: false,
        columnSizingStart: [],
      },
    };
    return applyTableState(defaultTableState);
  };

  const applyTableState = (tableState: TableState) => {
    if (tableState) {
      // set table state
      console.log('tableState', tableState);

      setSorting(tableState.sorting ?? []);
      setColumnFilters(tableState.columnFilters ?? []);
      setGlobalFilter(tableState.globalFilter ?? '');
      setGrouping(tableState.grouping ?? []);
      setExpanded(tableState.expanded ?? {});
      setRowSelection(tableState.rowSelection ?? {});
      setColumnOrder(tableState.columnOrder ?? []);
      setColumnVisibility(tableState.columnVisibility ?? {});
      setColumnPinning(tableState.columnPinning ?? {});
      setColumnSizing(tableState.columnSizing ?? {});

      setTimeout(() => {
        setPagination(
          tableState.pagination ?? {
            pageSize: props.pageSize || 10,
            pageIndex: 0,
          }
        );

        setRowPinning(tableState.rowPinning);
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
        getTableState: table.getState,
        applyTableState,
        resetToDefaultView,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table]
  );

  const headerMenu = React.useMemo(
    (): JSX.Element | React.ReactNode => {
      if (props.headerMenu) {
        return props.headerMenu(table);
      }
      return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.headerMenu, rowSelection]
  );

  // add event listeners to listen ctrl + shift + t and log current table state
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 'c') {
        event.preventDefault();
        const tableState = table.getState();
        // log table state to console
        console.log(tableState);
        // save table state to local storage
        localStorage.setItem(
          'hotkey_table_state_temp',
          JSON.stringify(tableState)
        );
        // copy table state to clipboard
        navigator.clipboard.writeText(JSON.stringify(tableState));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [table]);

  return {
    table,
    globalFilter,
    tableViews,
    headerMenu,
    setGlobalFilter,
    resetToDefaultView,
    applyTableState,
  };
};
