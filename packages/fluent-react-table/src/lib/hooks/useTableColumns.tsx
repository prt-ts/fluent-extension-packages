import * as React from "react";
import { ColumnSizeOption, IColumn } from "../types";
import { TableColumnDefinition, TableColumnSizingOptions, createTableColumn } from "@fluentui/react-components";

export function useTableColumns<TItem extends NonNullable<{ id: string | number }>>(gridColumns: IColumn<TItem>[]) {

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

    //&& !groupedColumns.includes(x.columnId as string)
    const extendedColumns = React.useMemo<IColumn<TItem>[]>(
        () => gridColumns?.filter(x => !x.hideInDefaultView)
        , [gridColumns]);


    return {
        columns,
        columnSizingOptions,
        extendedColumns
    } as const;
}