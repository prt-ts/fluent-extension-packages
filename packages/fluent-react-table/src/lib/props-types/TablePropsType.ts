import { TableProps as FluentTableProps } from "@fluentui/react-components";
import { IColumn, SelectionMode } from "../types";

export type TableProps<TItem extends NonNullable<{ id: string | number; }>,> = FluentTableProps & {

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
     */
    columns: IColumn<TItem>[]

    /**
     * show loading 
     * @default false
     */
    isLoading?: boolean, 

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
    pageSizeOption?: number[],


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
}
