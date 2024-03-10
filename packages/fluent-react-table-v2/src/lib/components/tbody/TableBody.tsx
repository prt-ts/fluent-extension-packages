import { Row } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableProps } from '../../types';
import { TableRow } from './TableRow';
import { VirtualItem } from 'react-virtual';

type TableBodyProps<TItem extends object> = {
    rows: Row<TItem>[];
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
    virtualRows: VirtualItem[],
    totalSize: number
}

export function TableBody<TItem extends object>(props: TableBodyProps<TItem>) {
    const styles = useTableBodyStyles();

    const { rows, rowSelectionMode, virtualRows, totalSize } = props;
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
            : 0;

    return (
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
    );
}