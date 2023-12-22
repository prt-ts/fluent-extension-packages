import { FilterFn } from "@tanstack/react-table";

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

export { Table } from "./components";

export type { TableProps, TableRef, TableView } from "./types";
export type { TableState, ColumnDef } from '@tanstack/react-table';

export { createColumnHelper } from "@tanstack/react-table";
