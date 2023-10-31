export type TableState<TItem> = {
    selectedItems: TItem[];
    currentPage: number;
    pageSize: number;
    globalFilter: string| number | Date;
    groupedColumnsIds: string[]; 
    visibleColumnsIds: string[];

}

export type TableRefType<TItem> = {
    setCurrentPage: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
    setGlobalFilter: (filter: string) => void;

    applyTableView: (viewName: string) => void;

    getTableState: () => TableState<TItem>;
}
