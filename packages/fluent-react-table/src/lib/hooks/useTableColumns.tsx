import * as React from "react";
import { ColumnSizeOption, IColumn } from "../types";
import { TableColumnDefinition, TableColumnSizingOptions, createTableColumn } from "@fluentui/react-components";

export function useTableColumns<TItem extends NonNullable<{ id: string | number }>>(gridColumns: IColumn<TItem>[]) {

    const [visibleColumns , setVisibleColumns] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (gridColumns?.length > 0) {
            const hiddenCols = gridColumns?.filter(col => !col.hideInDefaultView)?.map(col => col.columnId as string);
            setVisibleColumns(hiddenCols);
        } else {
            setVisibleColumns([]);
        }
    }, [gridColumns]);

    const columns = React.useMemo<TableColumnDefinition<TItem>[]>(() => {
        return gridColumns?.map(col => createTableColumn<TItem>({
            columnId: col.columnId,
            renderHeaderCell: col.renderHeaderCell
        }))
    }, [gridColumns]); 

    const columnSizingOptions = React.useMemo<TableColumnSizingOptions>(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const sizingOptions: any = {
            "group": {
                defaultWidth: 15
            } as ColumnSizeOption
        };
        for (const col of gridColumns) {
            sizingOptions[col.columnId] = col.sizeOptions
        }
        return sizingOptions;
    }, [gridColumns]);

    const extendedColumns = React.useMemo<IColumn<TItem>[]>(() => {
        return gridColumns?.filter(x => visibleColumns
            ?.includes(x.columnId as string))
            ?.sort(function (a, b) {
                return (visibleColumns?.indexOf(a.columnId as string) === -1 && visibleColumns?.indexOf(b.columnId as string) === -1)
                    ? 0
                    : (visibleColumns?.indexOf(a.columnId as string) - visibleColumns?.indexOf(b.columnId as string));
            })
    }, [gridColumns, visibleColumns]);
   
    return {
        columns,
        columnSizingOptions,
        extendedColumns,

        visibleColumns,
        setVisibleColumns
    } as const;
}