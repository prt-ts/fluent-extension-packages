import { Table } from "@tanstack/react-table";

export type TableRef<TItem extends object> = {
  table: Table<TItem>;
  getTableState: () => Record<string, unknown>;
  saveCurrentTableState: (viewName: string) => boolean;
  applySavedView: (viewName: string) => boolean;
};