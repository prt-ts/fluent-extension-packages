import { TableState } from "@tanstack/react-table";

export type TableView = {
    id: number,
    viewName: string,
    tableState: TableState,
    isGlobal?: boolean,
    isViewOwner?: boolean
}