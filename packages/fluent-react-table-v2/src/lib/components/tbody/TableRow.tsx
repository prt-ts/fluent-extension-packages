import { Row, RowData, Table } from '@tanstack/react-table';
import { useTableBodyStyles } from './useTableBodyStyles';
import { TableCell } from './TableCell';
import { Case, Show, Switch } from '@prt-ts/react-control-flow'; 
import { SelectRowCheckbox, SelectRowRadio } from '../extensions';
import { getRowPinningStyles } from '../../helpers/StylesHelper';

type TableRowProps<TItem extends RowData> = {
  table: Table<TItem>;
  row: Row<TItem>;
  bottomRowLength?: number;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabAttributes: any;
}

function TableRowRaw<TItem extends RowData>({ row, table, style, tabAttributes }: TableRowProps<TItem>) {
  const styles = useTableBodyStyles();
  const { rowSelectionMode, tableSettings } = table.options.meta ?? {};

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
      <Show when={!tableSettings?.enableManualSelection}>
        <Switch when={rowSelectionMode}>
          <Case value='multiple'>
            <td
              className={styles.tBodyCell}
              aria-label="Select Row"
            >
              <SelectRowCheckbox row={row} />
            </td>
          </Case>
          <Case value={'single'}>
            <td
              className={styles.tBodyCell}
              aria-label="Select Row"
            >
              <SelectRowRadio row={row} />
            </td>
          </Case>
        </Switch>
      </Show>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} row={row} />
      ))}
    </tr>
  );
}

function PinnedRowRaw<TItem extends RowData>({ row, table, style, bottomRowLength, tabAttributes }: TableRowProps<TItem>) {
  const styles = useTableBodyStyles();
  const pinnedRowRawStyle = getRowPinningStyles(row, bottomRowLength || 0, style || {});
  const { rowSelectionMode, tableSettings } = table.options.meta ?? {};

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
      <Show when={!tableSettings?.enableManualSelection}>
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
      </Show>
      {row.getVisibleCells().map(cell => {
        return (
          <TableCell key={cell.id} cell={cell} row={row} />
        )
      })}
    </tr>
  )
}

export const TableRow = TableRowRaw;
export const PinnedRow = PinnedRowRaw;
