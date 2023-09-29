import { TableProps as FluentTableProps } from "@fluentui/react-components";
import { IColumn, SelectionMode } from "../types";

export type TableProps<TItem extends NonNullable<{ id: string | number }>> =
  FluentTableProps & {
    /**
     * This is the unique name of the table - this name is used for the views and other stuff....
     * It must be uniques across your application
     * @required true
     * @default null
     */
    tableName: string;

    /**
     * Items to be displayed in the grid
     * @required true
     * @default []
     */
    items: TItem[];

    /**
     * Column Definition for the grid
     * @requires true
     * @default []
     * @deprecated use <Column {...withProps}> component instead
     */
    columns?: IColumn<TItem>[];

    children?: Array<React.ReactElement<IColumn<TItem>>>;

    /**
     * calculates pagination based on group
     * @default true
     */
    isPageOnGroup: boolean;

    /**
     * show loading
     * @default false
     */
    isLoading?: boolean;

    /**
     * Table Selection Mode
     * @optional true
     * @type "none" | "single" | "multiple"
     * @default "none"
     */
    selectionMode?: SelectionMode;
    onSelectionChange?: (selectedItems: TItem[]) => void;

    /**
     * Default Page Size
     * @optional true
     * @type number
     * @default 10
     */
    defaultPageSize?: number;

    /**
     * Default Page Size
     * @optional true
     * @type number[]
     * @default "[10, 20, 50, 100, MAX]"
     */
    pageSizeOption?: number[];

    onGetGridActionMenu?: (selectedItems?: TItem[]) => React.ReactNode;
    gridTitle?: React.ReactNode;

    /**
     * Component visible if the no item match the filter condition
     * @default defaultNoItemComponent
     */
    noFilterMatch?: React.ReactNode;

    /**
     * Component visible in the grid body if there is no items in the list
     * @default defaultNoItemComponent
     */
    noItem?: React.ReactNode;

    /**
     * class to customize table row
     * @default undefined
     */
    getRowClasses?: (item: TItem, index: number) => string;

    /**
     * apply sort on these column by default
     * @default []
     */
    defaultSortedColumnIds?: string[];

    /**
     * apply group on these column by default
     * @default []
     */
    defaultGroupColumnIds?: string[];

    /**
     * This allow to set group expand or collapse on default case
     * @default true
     */
    isGroupDefaultExpanded?: boolean;
  };
