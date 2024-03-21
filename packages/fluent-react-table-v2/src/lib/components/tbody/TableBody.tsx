import { Row, RowData, Table } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { PinnedRow, TableRow } from './TableRow';
import { useVirtual } from 'react-virtual';
import { Checkbox, useFocusableGroup } from '@fluentui/react-components';
import { For, Show } from "@prt-ts/react-control-flow";

type TableBodyProps<TItem extends RowData> = {
    table: Table<TItem>;
    tableContainerRef: React.RefObject<HTMLDivElement>
}

export function TableBody<TItem extends RowData>(props: TableBodyProps<TItem>) {
    const styles = useTableBodyStyles();

    const { table, tableContainerRef } = props;
    const rowSelectionMode = table.options.meta?.rowSelectionMode;

    let rows: Row<TItem>[] = [];
    let topRows: Row<TItem>[] = [];
    let bottomRows: Row<TItem>[] = [];

    try {
        rows = table.getCenterRows();
        topRows = table.getTopRows();
        bottomRows = table.getBottomRows();

    } catch (error) {
        rows = [];
        topRows = [];
        bottomRows = [];
    }

    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
            : 0;
    const tabAttributes = useFocusableGroup({ tabBehavior: "limited" });

    return (
        <>
            <Show when={topRows?.length > 0}>
                <thead
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 9
                    }}>
                    <For each={topRows}>
                        {(row, index) => (
                            <PinnedRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} bottomRowLength={bottomRows?.length} tabAttributes={tabAttributes} />
                        )}
                    </For>
                </thead>
            </Show>
            <tbody className={styles.tBody}>
                {/* placeholder for virtualization */}
                {paddingTop > 0 && (
                    <tr className={styles.tBodyRow} aria-hidden={true}>
                        <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                )}

                <For each={virtualRows || []}>
                    {(virtualRow) => {
                        const row = rows[virtualRow.index];
                        return (
                            <TableRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} tabAttributes={tabAttributes} />
                        );
                    }}
                </For>

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
                    zIndex: 9
                }}>
                    <tr style={{ backgroundColor: "white" }}>
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
                <tfoot style={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 9
                }}>
                    <For each={bottomRows}>
                        {(row) => (
                            <PinnedRow key={row.id} row={row} rowSelectionMode={rowSelectionMode} bottomRowLength={bottomRows?.length} tabAttributes={tabAttributes} />
                        )}
                    </For>
                </tfoot>
            </Show>
        </>
    );
}
