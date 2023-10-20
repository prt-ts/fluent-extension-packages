export type TableState = {
    currentPage: number;
    pageSize: number;
    globalFilter: string| number | Date;
    groupedColumnsIds: string[]; 
    visibleColumnsIds: string[];
}

export type TableRefType = {
    setCurrentPage: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
    setGlobalFilter: (filter: string) => void;

    getTableState: () => TableState;
}
