import { Table, TableState } from "@tanstack/react-table"; 

export type TableRef<TItem extends object> = {
  table: Table<TItem>;
  getTableState: () => Partial<TableState>;
  applyTableState: (tableState: Partial<TableState>) => boolean;
  resetToDefaultView: () => boolean;
};
