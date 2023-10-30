import { TableColumnId } from "@fluentui/react-components"

export type IColumn<TItem extends NonNullable<{ id: string | number }>> = {
  columnId: TableColumnId;
  // renderHeaderCell?: () => React.ReactNode;
  header: React.ReactNode;

  renderCell?: (item: TItem) => React.ReactNode;
  renderMedia?: (item: TItem) => React.ReactNode;
  renderSecondary?: (item: TItem) => React.ReactNode;

  appearance?: 'primary' | undefined;
  renderActions?: (item: TItem) => React.ReactNode;
  sizeOptions?: ColumnSizeOption;

  hideInDefaultView? : boolean;
  disableHideShow? : boolean;
  disableGrouping? : boolean;
  disableSorting? : boolean;

  children? : (item: TItem) => React.ReactNode;
};


export type ColumnSizeOption = {
    minWidth?: number,
    defaultWidth?: number,
    idealWidth?: number,
    padding?: number,
}
