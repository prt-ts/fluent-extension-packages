import { TableColumnId } from "@fluentui/react-components"

export type IColumn<TItem extends NonNullable<{ id: string | number }>> = {
  columnId: TableColumnId;
  renderHeaderCell: () => React.ReactNode;

  renderCell?: (item: TItem) => React.ReactNode;
  renderMedia?: (item: TItem) => React.ReactNode;
  renderSecondary?: (item: TItem) => React.ReactNode;

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