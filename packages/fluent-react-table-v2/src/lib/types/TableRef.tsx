import { Table, TableState } from "@tanstack/react-table"; 

export type TableRef<TItem extends object> = {
  table: Table<TItem>;
  getTableState: () => TableState;
  applyTableState: (tableState: TableState) => boolean;
  resetToDefaultView: () => boolean;
};
