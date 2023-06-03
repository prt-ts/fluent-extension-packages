

export type TableView = {
    viewName: string;
    filter: string | number | Date;
    groupedColumns: string[];
    sortedColumns: string[];
    visibleColumns: string[];
}

export type SavedTableView = {
    views: TableView[]
}