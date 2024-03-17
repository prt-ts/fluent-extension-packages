import { Table } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableProps } from '../../types';
import { PinnedRow, TableRow } from './TableRow';
import { useVirtual } from 'react-virtual';
import { Checkbox } from '@fluentui/react-components';
import { Show } from "@prt-ts/react-control-flow";

type TableBodyProps<TItem extends object> = {
    table: Table<TItem>;
    tableContainerRef: React.RefObject<HTMLDivElement>
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
}

export function TableBody<TItem extends object>(props: TableBodyProps<TItem>) {
    const styles = useTableBodyStyles();

    const { table, tableContainerRef } = props;

    const { rowSelectionMode } = props;
    const rows = table.getCenterRows();
    const topRows = table.getTopRows();
    const bottomRows = table.getBottomRows();

    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 5,
      });
      const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
            : 0;

    return (
        <>
            <Show when={topRows?.length > 0}>
                <thead
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 99
                    }}>
                    {(topRows || []).map((row) => {
                        return (
                            <PinnedRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} bottomRowLength={bottomRows?.length} />
                        );
                    })}
                </thead>
            </Show>
            <tbody className={styles.tBody}>
                {/* placeholder for virtualization */}
                {paddingTop > 0 && (
                    <tr className={styles.tBodyRow} aria-hidden={true}>
                        <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                )}
                {virtualRows.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    return (
                        <TableRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} />
                    );
                })}

                {/* placeholder for virtualization */}
                {paddingBottom > 0 && (
                    <tr className={styles.tBodyRow} aria-hidden={true}>
                        <td style={{ height: `${paddingBottom}px` }} />
                    </tr>
                )}
            </tbody>

            <Show when={rowSelectionMode === 'multiple' && rows?.length > 0}>
                <tfoot style={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 99
                }}>

                    <tr style={{backgroundColor : "white"}}>
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
            </Show>

            <Show when={bottomRows?.length > 0}>
                <tfoot
                    style={{
                        position: "sticky",
                        bottom: 0,
                        zIndex: 99
                    }}>
                    {(bottomRows || []).map((row) => {
                        return (
                            <PinnedRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} bottomRowLength={bottomRows?.length} />
                        );
                    })}
                </tfoot>
            </Show>
        </>
    );
}
