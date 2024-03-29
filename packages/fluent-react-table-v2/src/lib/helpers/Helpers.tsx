import { Column, RowData } from "@tanstack/react-table";


export const getLeafColumns = <TItem extends RowData>(
    columns: Column<TItem>[]
  ): Column<TItem>[] => {
    if (!columns || !columns.length) {
      return [];
    }
    return columns.reduce((totalItems: Column<TItem>[], col: Column<TItem>) => {
      if (!col.columns) {
        totalItems.push(col);
      }
      return totalItems.concat(getLeafColumns(col.columns));
    }, []);
  };