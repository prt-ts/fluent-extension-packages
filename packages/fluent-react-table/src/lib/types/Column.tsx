import { TableColumnId } from "@fluentui/react-components"
import { ReactNode } from "react"

export type IColumn<TItem extends NonNullable<{ id: string | number }>> = {
  columnId: TableColumnId;
  renderHeaderCell: () => React.ReactNode;

  renderCell?: (item: TItem) => React.ReactNode;
  renderMedia?: (item: TItem) => JSX.Element;
  renderSecondary?: (item: TItem) => JSX.Element;

  appearance?: 'primary' | undefined;
  renderActions?: (item: TItem) => React.ReactNode;
  sizeOptions?: ColumnSizeOption;
}; 


export type ColumnSizeOption = {
    minWidth?: number,
    defaultWidth?: number,
    idealWidth?: number,
    padding?: number,
}