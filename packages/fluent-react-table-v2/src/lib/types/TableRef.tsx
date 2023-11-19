import { Table, TableState } from "@tanstack/react-table";
import { TableView } from "./TableView";

export type TableRef<TItem extends object> = {
  table: Table<TItem>;
  getTableState: () => Partial<TableState>;
  applyTableState: (tableState: Partial<TableState>) => boolean;
  resetToDefaultView: () => boolean;
  setTableAvailableViews: (views: TableView[]) => void;
};
