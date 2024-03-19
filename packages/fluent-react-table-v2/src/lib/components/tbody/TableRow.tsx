import { Checkbox, Radio, tokens } from '@fluentui/react-components';
import { Row, RowData } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableProps } from '../../types';
import { TableCell } from './TableCell';
import { Case, Switch } from '@prt-ts/react-control-flow';
import { CSSProperties } from 'react';

type TableRowProps<TItem extends RowData> = {
  row: Row<TItem>;
  rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
  bottomRowLength?: number;
  style?: React.CSSProperties;
}

export function TableRow<TItem extends RowData>({ row, rowSelectionMode, style }: TableRowProps<TItem>) {
  const styles = useTableBodyStyles();

  return (
    <tr
      key={row.id}
      className={
        row.getIsSelected() || row.getIsAllSubRowsSelected()
          ? styles.tBodySelectedRow
          : styles.tBodyRow
      }
      style={style}
    >
      <Switch when={rowSelectionMode}>
        <Case value='multiple'>
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
        </Case>
        <Case value={'single'}>
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
        </Case>
      </Switch>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} row={row} />
      ))}
    </tr>
  );
}

export function PinnedRow<TItem extends RowData>({ row, rowSelectionMode, style, bottomRowLength }: TableRowProps<TItem>) {
  const styles = useTableBodyStyles();

  const pinnedRowRawStyle : CSSProperties = {
    backgroundColor: tokens.colorPaletteYellowBackground2,
    position: 'sticky',
    top: row.getIsPinned() === 'top' ? `${row.getPinnedIndex() * 35 + 48}px` : undefined,
    bottom: row.getIsPinned() === 'bottom' ? `${((bottomRowLength || 0) - 1 - row.getPinnedIndex()) * 35}px` : undefined,
    ...style,
  }

  return (
    <tr
      key={row.id}
      className={
        row.getIsSelected() || row.getIsAllSubRowsSelected()
          ? styles.tBodySelectedRow
          : styles.tBodyRow
      }
      style={pinnedRowRawStyle}
    >
      <Switch when={rowSelectionMode}>
        <Case value='multiple'>
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
        </Case>
        <Case value={'single'}>
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
        </Case>
      </Switch>
      {row.getVisibleCells().map(cell => {
        return (
          <TableCell key={cell.id} cell={cell} row={row} />
        )
      })}
    </tr>
  )
}