import * as React from 'react';
import { useTableStaticStyles } from './useTableStaticStyles';
import { Header, Table } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { HeaderCell } from '../thead';
import { Checkbox } from '@fluentui/react-components';
import { Loading } from '../loading';
import { NoItemGrid } from '../no-item';
import { NoSearchResult } from '../no-search-result';
import { TableBody } from '../tbody';

type TableContainerProps<TItem extends object> = {
  rowSelectionMode?: 'single' | 'multiple';
  table: Table<TItem>;
  noItemPage?: React.ReactNode;
  noFilterMatchPage?: React.ReactNode;
  isLoading: boolean;
  data: TItem[];
};

export const TableContainer = <TItem extends object>(
  props: TableContainerProps<TItem>
) => {
  const styles = useTableStaticStyles();
  const { table, rowSelectionMode } = props;

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;  
  const headerGroups = table.getHeaderGroups();

  // utilities
  const isLoading = props.isLoading && virtualRows.length === 0;
  const noItems = !isLoading && props.data?.length === 0;
  const noSearchResult =
    !isLoading && props?.data?.length > 0 && virtualRows.length === 0;

  return (
    <div ref={tableContainerRef} className={styles.tableContainer}>
      <table className={styles.table} aria-label="Data Grid">
        <thead className={styles.tHead}>
          {headerGroups?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {rowSelectionMode === 'multiple' && (
                <th
                  style={{ width: '1rem' }}
                  aria-label="Select All Row Column"
                >
                  {headerGroup.depth === headerGroups?.length - 1 && (
                    <Checkbox
                      checked={
                        table.getIsSomeRowsSelected()
                          ? 'mixed'
                          : table.getIsAllRowsSelected()
                      }
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      aria-label="Select All Rows"
                      title={'Select All Rows'}
                    />
                  )}
                </th>
              )}
              {rowSelectionMode === 'single' && (
                <th
                  style={{ width: '1rem' }}
                  aria-label="Select All Row Column"
                >
                  {' '}
                </th>
              )}
              {headerGroup.headers.map((header) => {
                return (
                  <HeaderCell
                    key={header.id}
                    header={header as unknown as Header<object, unknown>}
                    table={table as unknown as Table<object>}
                    hideMenu={headerGroup.depth !== headerGroups?.length - 1}
                    headerDepth={headerGroup.depth}
                    totalNumberOfHeaderDepth={headerGroups?.length - 1}
                  />
                );
              })}
            </tr>
          ))}
        </thead>
        
        <TableBody 
          rows={rows} 
          virtualRows={virtualRows} 
          rowSelectionMode={rowSelectionMode} 
          totalSize={totalSize} />

        {rowSelectionMode === 'multiple' &&
          !isLoading &&
          !noItems &&
          !noSearchResult && (
            <tfoot className={styles.tFoot}>
              <tr>
                <td className="p-1">
                  <Checkbox
                    checked={
                      table.getIsSomePageRowsSelected()
                        ? 'mixed'
                        : table.getIsAllPageRowsSelected()
                    }
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    aria-label="Select All Current Page Rows"
                    title={'Select All Current Page Rows'}
                  />
                </td>
                <td colSpan={20}>
                  {table.getIsAllPageRowsSelected() ? 'Unselect' : 'Select'} All
                  Current Page Rows ({table.getRowModel().rows.length})
                </td>
              </tr>
            </tfoot>
          )}
      </table>
      {isLoading && <Loading />}
      {noItems && <NoItemGrid message={props.noItemPage} />}
      {noSearchResult && <NoSearchResult message={props.noFilterMatchPage} />}
    </div>
  );
};
