import { Checkbox, Radio } from '@fluentui/react-components';
import { Row, RowData } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableProps } from '../../types';
import { TableCell } from './TableCell';
import { Case, Switch } from '@prt-ts/react-control-flow';
import { memo } from 'react';
import { SelectRowCheckbox, SelectRowRadio } from '../extensions';
import { getRowPinningStyles } from '../../helpers/StylesHelper';

type TableRowProps<TItem extends RowData> = {
  row: Row<TItem>;
  rowSelectionMode?: TableProps<TItem>['rowSelectionMode'];
  bottomRowLength?: number;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabAttributes: any;
}

function TableRowRaw<TItem extends RowData>({ row, rowSelectionMode, style, tabAttributes }: TableRowProps<TItem>) {
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
      {...tabAttributes}
      tabIndex={0}
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

function PinnedRowRaw<TItem extends RowData>({ row, rowSelectionMode, style, bottomRowLength, tabAttributes }: TableRowProps<TItem>) {
  const styles = useTableBodyStyles();
  const pinnedRowRawStyle = getRowPinningStyles(row, bottomRowLength || 0, style || {});

  return (
    <tr
      key={row.id}
      className={
        row.getIsSelected() || row.getIsAllSubRowsSelected()
          ? styles.tBodySelectedRow
          : styles.tBodyRow
      }
      style={pinnedRowRawStyle}
      {...tabAttributes}
      tabIndex={0}
    >
      <Switch when={rowSelectionMode}>
        <Case value='multiple'>
          <td
            className={styles.tBodyCell}
            aria-label="Select Row Column"
          >
            <SelectRowCheckbox row={row} />
          </td>
        </Case>
        <Case value={'single'}>
          <td
            className={styles.tBodyCell}
            aria-label="Select Row Column"
          >
            <SelectRowRadio row={row} />
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

export const TableRow = TableRowRaw;
export const PinnedRow = memo(PinnedRowRaw) as typeof PinnedRowRaw;
