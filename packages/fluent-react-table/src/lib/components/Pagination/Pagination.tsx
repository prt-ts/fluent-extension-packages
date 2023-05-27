import { Button, Dropdown, Option, Caption1Strong, useId } from '@fluentui/react-components'
import { ArrowNextFilled, ArrowPreviousFilled, NextRegular, PreviousRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { MAX_PAGE_OPTION } from '../../hooks/useTablePagination';
import { usePaginationStyle } from "./usePaginationStyle"

export const Pagination: React.FunctionComponent<{
    currentPage: number;
    pageSize: number;
    pageSizeOptions: number[];
    totalNumberOfPage: number;
    pageSelectionOptions: number[];
    setPage: (newPage: number) => void;
    previous: () => void;
    next: () => void;
    first: () => void;
    last: () => void;
    updatePageSize: (newPageSize: number) => void;
}> = (props) => {
    const pageSizeSelectionId = useId("page-size-selector");

    // styles
    const styles = usePaginationStyle();

    // stores 
    const {
        currentPage,
        pageSize,
        pageSizeOptions,
        totalNumberOfPage,
        pageSelectionOptions,
        setPage,
        previous,
        next,
        first,
        last,
        updatePageSize
    } = props

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageSelectionWrapper}>
                <Dropdown
                    id={pageSizeSelectionId}
                    selectedOptions={[`${pageSize}`]}
                    value={pageSize === MAX_PAGE_OPTION ? "All" : `${pageSize}`}
                    placeholder="Select Page Size"
                    onOptionSelect={(_, data) => updatePageSize(+data.selectedOptions?.[0])}
                    className={styles.pageSelectionDropdown}
                >
                    {
                        pageSizeOptions?.map((option) => (
                            <Option key={option} value={`${option}`}>
                                {`${option}`}
                            </Option>
                        ))
                    }

                </Dropdown>
            </div>
            <div>
                <Caption1Strong>Showing Page {currentPage + 1} of {totalNumberOfPage}</Caption1Strong>
            </div>
            <div className={styles.pageBtnContainer}>
                <Button shape="circular" size="small" className={styles.pageBtn} icon={<PreviousRegular />} disabled={currentPage === 0} onClick={() => first && first()} />
                <Button shape="circular" size="small" className={styles.pageBtn} icon={<ArrowPreviousFilled />} disabled={currentPage === 0} onClick={() => previous && previous()} />
                {
                    pageSelectionOptions?.map((option, index) => <Button
                        shape="circular"
                        key={index}
                        appearance={
                            option - 1 === currentPage ? "primary" : undefined
                        }
                        onClick={() => setPage && setPage(option - 1)}
                        aria-label={`Show Page ${option}`}
                        size="small"
                        className={styles.pageBtn}
                    >{option}</Button>)
                }
                <Button shape="circular" size="small" className={styles.pageBtn} icon={<ArrowNextFilled />} disabled={currentPage === (totalNumberOfPage - 1)} onClick={() => next && next()} />
                <Button shape="circular" size="small" className={styles.pageBtn} icon={<NextRegular />} disabled={currentPage === (totalNumberOfPage - 1)} onClick={() => last && last()} />
            </div>
        </div>
    )
} 
