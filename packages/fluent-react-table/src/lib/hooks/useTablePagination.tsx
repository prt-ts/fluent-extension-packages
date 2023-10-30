import * as React from "react";
export const range = (from: number, to: number, step = 1) =>
    [...Array(Math.floor((to - from) / step) + 1)]?.map((_, i) => from + i * step);
    

const DEFAULT_NUMBER_OF_PAGE_BTN = 5;
export const MAX_PAGE_OPTION = 100000000;
export function useTablePagination(defaultPageSize: number, defaultPageOptions: number[]) {

    const [totalItemCount, setTotalItemCount] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(defaultPageSize);
    const [pageSizeOptions] = React.useState<number[]>(defaultPageOptions);

    const totalNumberOfPage = React.useMemo(() => { 
        if (totalItemCount % pageSize === 0) return totalItemCount / pageSize; 
        return Math.floor(totalItemCount / pageSize) + 1; 
    }, [totalItemCount, pageSize]);

    const pageSelectionOptions: number[] = React.useMemo(() => {
        let start = currentPage - Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);
        let end = currentPage + Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);

        if (start < 1) {
            start = 1;
            end = totalNumberOfPage > DEFAULT_NUMBER_OF_PAGE_BTN ? DEFAULT_NUMBER_OF_PAGE_BTN
                : totalNumberOfPage;
        } else if (end > totalNumberOfPage) {
            const possibleStart =
                totalNumberOfPage - DEFAULT_NUMBER_OF_PAGE_BTN + 1;
            start = possibleStart < 1 ? 1 : possibleStart;
            end = totalNumberOfPage;
        }
        const currentPageOptions: number[] = end - start >= 0 ? range(start, end) : [];
        return currentPageOptions?.length ? [...currentPageOptions] : [1];
    }, [totalNumberOfPage, pageSize, currentPage]);

    const previous = React.useCallback(() => {
        setCurrentPage(p => {
            if (p === 0) return p;
            return p - 1;
        })
    }, []);

    const next = React.useCallback(() => {
        setCurrentPage(p => (p === totalNumberOfPage - 1) ? p : p + 1)
    }, [totalNumberOfPage]);

    const first = React.useCallback(() => {
        setCurrentPage(0)
    }, []);

    const last = React.useCallback(() => {
        setCurrentPage(p => (p === totalNumberOfPage - 1) ? p : totalNumberOfPage - 1)
    }, [totalNumberOfPage]);

    const setPage = React.useCallback((newPage: number) => {
        setCurrentPage(newPage)
    }, []);

    const updatePageSize = React.useCallback((newPageSize: number) => {
        // reset page back to 0 on page size change
        setCurrentPage(0);
        setPageSize(newPageSize);
    }, []);

    const updateTotalItemCount = React.useCallback((newItemsCount: number) => { 
        // if (newItemsCount === totalItemCount) return; 
        setTotalItemCount(newItemsCount);
    }, []);

    return {
        currentPage,
        pageSize,
        totalNumberOfPage,
        pageSizeOptions,
        pageSelectionOptions,
        setPage,
        previous,
        next,
        first,
        last,
        updatePageSize,
        updateTotalItemCount
    } as const;
}