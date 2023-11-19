import { TableState } from "@fluentui/react-components";

export type TableView = {
    id: number,
    viewName: string,
    tableState: Partial<TableState>,
    isDefault?: boolean,
}