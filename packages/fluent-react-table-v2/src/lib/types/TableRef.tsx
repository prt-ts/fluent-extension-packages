import { RowData, Table, TableState } from "@tanstack/react-table"; 

export type TableRef<TItem extends RowData> = {
  table: Table<TItem>;
  getTableState: () => TableState;
  applyTableState: (tableState: TableState) => boolean;
  resetToDefaultView: () => boolean;
};
