import { Button } from '@fluentui/react-components';
import { Cell, Row, flexRender } from '@tanstack/react-table'; 
import { GroupCollapsedIcon, GroupExpandedIcon } from '../icon-components/GridIcons';
import { useTableBodyStyles } from './useTableBodyStyles';

type TableCellProps<TItem extends object> = {
    cell: Cell<TItem, unknown>;
    row: Row<TItem>;
}

export function TableCell<TItem extends object>({ cell, row } : TableCellProps<TItem>){
    const styles = useTableBodyStyles();

    const tdStyle = {
        width: cell.column.getSize(),
    };

    if (cell.getIsPlaceholder()) {
        return <td key={cell.id} style={tdStyle} className={styles.tBodyCell} />;
    }

    if (cell.getIsGrouped()) {
        return (
            <td
                key={cell.id}
                style={tdStyle}
                className={styles.tBodyCell}
            >
                <Button
                    onClick={row.getToggleExpandedHandler()}
                    style={{
                        cursor: row.getCanExpand() ? 'pointer' : 'normal',
                        textAlign: 'left',
                    }}
                    appearance="transparent"
                    icon={
                        row.getIsExpanded() ? <GroupExpandedIcon /> : <GroupCollapsedIcon />
                    }
                >
                    <strong>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                        {row.subRows.length})
                    </strong>
                </Button>

            </td>
        );
    }

    if (cell.getIsAggregated()) {
        return (
            <td
                key={cell.id}
                style={tdStyle}
                className={styles.tBodyCell}
            >
                <strong>
                    {flexRender(
                        cell.column.columnDef.aggregatedCell ??
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </strong>
            </td>
        );
    }

    return (
        <td
            key={cell.id}
            style={{
                width: cell.column.getSize(),
            }}
            className={styles.tBodyCell}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    );
};