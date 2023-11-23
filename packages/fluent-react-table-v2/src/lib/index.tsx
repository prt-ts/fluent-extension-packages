import { FilterFn } from "@tanstack/react-table";

declare module '@tanstack/table-core' {
    interface FilterFns { 
        arrIncludesSome: FilterFn<unknown>
        matchDate: FilterFn<unknown>
        inDateRange: FilterFn<unknown>
    }
}

export { Table } from "./components";

export type { TableProps, TableRef, TableView } from "./types";
export type { ColumnDef, TableState } from "@tanstack/react-table";

export { createColumnHelper } from "@tanstack/react-table";
