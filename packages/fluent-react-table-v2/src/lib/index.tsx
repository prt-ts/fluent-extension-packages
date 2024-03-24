import { ColumnFiltersState, ColumnOrderState, ColumnPinningState, ColumnSizingState, ExpandedState, FilterFn, GroupingState, PaginationState, RowData, RowPinningState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { TableProps, TableSettings } from "./types";
import { ActionType, DrawerTableState } from "./components/reducer";

export { disableAllShorthand } from "./helpers/Shorthands";
export { Table, useSkipper } from "./components"; 

export * from "./components/extensions";

declare module '@tanstack/table-core' {
    interface FilterFns {
        arrIncludesSome: FilterFn<unknown>
        matchDate: FilterFn<unknown>
        inDateRange: FilterFn<unknown>
    }
}

declare module '@tanstack/react-table' {
  interface ColumnDefBase<TData, TValue> {
    filterFnDefinition?: (data: TData) => TValue;
  }
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    rowSelectionMode: TableProps<TData>["rowSelectionMode"],
    pageSizeOptions:  TableProps<TData>["pageSizeOptions"],
    isAutoExpandOnGroup: TableProps<TData>["isAutoExpandOnGroup"],
    tableHeight: string,

    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    onTableViewSave?: TableProps<TData>["onTableViewSave"];
    onTableViewDelete?: TableProps<TData>["onTableViewDelete"];

    drawerState: DrawerTableState;
    dispatchDrawerAction: React.Dispatch<ActionType<string>>;

    // all the table state modifiers
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    setGrouping: React.Dispatch<React.SetStateAction<GroupingState>>;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
    setColumnOrder: React.Dispatch<React.SetStateAction<ColumnOrderState>>;
    setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>>;
    setColumnPinning: React.Dispatch<React.SetStateAction<ColumnPinningState>>;
    setColumnSizing: React.Dispatch<React.SetStateAction<ColumnSizingState>>;
    setRowPinning: React.Dispatch<React.SetStateAction<RowPinningState>>

    tableSettings: TableSettings;
  }
}

export type { TableProps, TableRef, TableView } from "./types";
export type { 
  TableState, 
  ColumnDef, 
  Column as ColumnType,
  Row as RowType, 
  RowData as RowDataType,
  Table as TableType 
} from '@tanstack/react-table';

export { createColumnHelper } from "@tanstack/react-table";

