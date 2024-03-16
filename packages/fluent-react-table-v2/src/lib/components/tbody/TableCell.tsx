import { Button, mergeClasses } from '@fluentui/react-components';
import { Cell, Row, flexRender } from '@tanstack/react-table'; 
import { GroupCollapsedIcon, GroupExpandedIcon } from '../icon-components/GridIcons';
import { useTableBodyStyles } from './useTableBodyStyles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react';
import { getCommonPinningStyles } from '../../helpers/StylesHelper';

type TableCellProps<TItem extends object> = {
    cell: Cell<TItem, unknown>;
    row: Row<TItem>;
}

export function TableCell<TItem extends object>({ cell, row } : TableCellProps<TItem>){
    const styles = useTableBodyStyles(); 
    const isSelected = row.getIsSelected();  

    const { isDragging, transition, setNodeRef, transform } = useSortable({
        id: cell.column.id,
      })

    const tdStyle : CSSProperties = {
        width: cell.column.getSize(),
        opacity: isDragging ? "0.8" : "1",  
        transform: CSS.Translate.toString(transform),
        // transition: 'width transform 0.2s ease-in-out', 
        zIndex: isDragging ? 1 : 0,
        transition
    };

    if (cell.getIsPlaceholder()) {
        return <td key={cell.id} 
                style={{ ...tdStyle, ...getCommonPinningStyles(cell.column, false, isSelected) }} 
                className={mergeClasses(styles.tBodyCell)}  
                ref={setNodeRef}/>;
    }

    if (cell.getIsGrouped()) {
        return (
            <td
                key={cell.id}
                style={{ ...tdStyle, ...getCommonPinningStyles(cell.column, false, isSelected) }}
                className={mergeClasses(styles.tBodyCell)}  
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
                style={{ ...tdStyle, ...getCommonPinningStyles(cell.column, false, isSelected) }}
                className={mergeClasses(styles.tBodyCell)}  
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
            style={{ ...tdStyle, ...getCommonPinningStyles(cell.column, false) }}
            className={mergeClasses(styles.tBodyCell)}  
            ref={setNodeRef}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    );
}