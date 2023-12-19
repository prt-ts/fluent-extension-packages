import { Checkbox, Radio } from '@fluentui/react-components';
import { Row } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableProps } from '../../types';
import { TableCell } from './TableCell';

type TableRowProps<TItem extends object> = {
    row: Row<TItem>;
    rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
}

export function TableRow<TItem extends object>({ row, rowSelectionMode }: TableRowProps<TItem>) {
    const styles = useTableBodyStyles();

    return (
        <tr
        key={row.id}
        className={
          row.getIsSelected() || row.getIsAllSubRowsSelected()
            ? styles.tBodySelectedRow
            : styles.tBodyRow
        }
      >
        {rowSelectionMode === 'multiple' && (
          <td
            className={styles.tBodyCell}
            aria-label="Select Row Column"
          >
            <Checkbox
              checked={
                row.getIsSomeSelected()
                  ? 'mixed'
                  : row.getIsSelected() || row.getIsAllSubRowsSelected()
              }
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select Row"
            />
          </td>
        )}
        {rowSelectionMode === 'single' && (
          <td
            className={styles.tBodyCell}
            aria-label="Select Row Column"
          >
            <Radio
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select Row"
            />
          </td>
        )}
        {row.getVisibleCells().map((cell) => (
           <TableCell key={cell.id} cell={cell} row={row} />
        ))}
      </tr>
    );
};