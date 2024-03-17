import * as React from 'react';
import { useTableStaticStyles } from './useTableStaticStyles';
import { Table } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { TableHeader } from '../thead'; 
import { Loading } from '../loading';
import { NoItemGrid } from '../no-item';
import { NoSearchResult } from '../no-search-result';
import { TableBody } from '../tbody';
import { Case, Switch } from '@prt-ts/react-control-flow';

type TableContainerProps<TItem extends object> = {
  rowSelectionMode?: 'single' | 'multiple';
  table: Table<TItem>;
  noItemPage?: React.ReactNode;
  noFilterMatchPage?: React.ReactNode;
  isLoading: boolean;
  data: TItem[];
  tableHeight: string;
};

export const TableContainer = <TItem extends object>(
  props: TableContainerProps<TItem>
) => {
  const styles = useTableStaticStyles();
  const { table, rowSelectionMode } = props; 
  const tableContainerRef = React.useRef<HTMLDivElement>(null); 
  const {rows} = table.getRowModel(); 
  const headerGroups = table.getHeaderGroups();

  // utilities
  const isLoading = props.isLoading && rows.length === 0;
  const noItems = !isLoading && props.data?.length === 0;
  const noSearchResult =
    !isLoading && props?.data?.length > 0 && rows.length === 0;

  return (
    <div ref={tableContainerRef}
      className={styles.tableContainer}
      style={{ height: props.tableHeight || "650px" }}
    >
      <table className={styles.table} aria-label="Data Grid" style={{ width: table.getTotalSize(), minWidth: "100%" }}>
        <TableHeader
          table={table}
          rowSelectionMode={rowSelectionMode}
          headerGroups={headerGroups} />

        <TableBody
          table={table}
          tableContainerRef={tableContainerRef}
          rowSelectionMode={rowSelectionMode} />
      </table>
      <Switch when={true}>
        <Case value={isLoading}>
          <Loading />
        </Case>
        <Case value={noItems}>
          <NoItemGrid message={props.noItemPage} />
        </Case>
        <Case value={noSearchResult}>
          <NoSearchResult message={props.noFilterMatchPage} />
        </Case>
      </Switch>
    </div>
  );
};
