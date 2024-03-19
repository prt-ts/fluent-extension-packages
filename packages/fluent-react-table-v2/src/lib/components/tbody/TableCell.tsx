import { Button, mergeClasses } from '@fluentui/react-components';
import { Cell, Row, RowData, flexRender } from '@tanstack/react-table';
import { GroupCollapsedIcon, GroupExpandedIcon } from '../icon-components/GridIcons';
import { useTableBodyStyles } from './useTableBodyStyles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react';
import { getBodyCellPinningStyles } from '../../helpers/StylesHelper';

type TableCellProps<TItem extends RowData> = {
    cell: Cell<TItem, unknown>;
    row: Row<TItem>;
}

export function TableCell<TItem extends RowData>({ cell, row }: TableCellProps<TItem>) {
    const styles = useTableBodyStyles();

    const isSelected = row.getIsSelected();
    const isRowPinned = row.getIsPinned();
    const isCellPinned = cell.column.getIsPinned();
    const cellClassNames = mergeClasses(
        styles.tBodyCell,
        isCellPinned && styles.tBodyPinnedCell,
        isSelected && styles.tBodySelectedCell,
        isRowPinned && styles.tBodyRowPinnedCell,
    );

    const { isDragging, transition, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    const tdStyle: CSSProperties = { 
        transform: CSS.Translate.toString(transform), 
        transition
    };
    const styleStyles = getBodyCellPinningStyles(cell.column, isDragging, tdStyle);

    if (cell.getIsPlaceholder()) {
        return <td key={cell.id}
            style={styleStyles}
            className={cellClassNames}
            ref={setNodeRef} />;
    }

    if (cell.getIsGrouped()) {
        return (
            <td
                key={cell.id}
                style={styleStyles}
                className={cellClassNames}
                ref={setNodeRef}
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
                style={styleStyles}
                className={cellClassNames}
                ref={setNodeRef}
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
            style={styleStyles}
            className={cellClassNames}
            ref={setNodeRef}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    );
}