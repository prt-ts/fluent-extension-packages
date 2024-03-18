import { FilterFn, RowData } from "@tanstack/react-table";
import { TableProps } from "./types";
import { ActionType, DrawerTableState } from "./components/reducer";

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
    tableHeight: string,

    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    onTableViewSave?: TableProps<TData>["onTableViewSave"];
    onTableViewDelete?: TableProps<TData>["onTableViewDelete"];

    drawerState: DrawerTableState;
    dispatchDrawerAction: React.Dispatch<ActionType<string>>;
  }
}

export { Table, useSkipper } from "./components"; 

export type { TableProps, TableRef, TableView } from "./types";
export type { TableState, ColumnDef } from '@tanstack/react-table';

export { createColumnHelper } from "@tanstack/react-table";
