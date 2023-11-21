import { TableState } from "@tanstack/react-table";

export type TableView = {
    id: number,
    viewName: string,
    tableState: Partial<TableState>,
    isDefault?: boolean,
}