import { RowData, Table } from "@tanstack/react-table";

export type TableExportData = Record<string, unknown>[];

export const getTableData = <TItem extends RowData>(table: Table<TItem>): TableExportData => {

    // format headers 
    const { rows } = table.getCoreRowModel();

    // format rows key as a header and value as a row data
    const data = rows.map((row) => {
        const rowData: Record<string, unknown> = {};

        const cells = row.getVisibleCells();

        cells.forEach((cell) => {
            const columnId = cell.column.id;
            const value = cell.getValue();

            rowData[columnId] = value;
        });

        return rowData;
    });

    return data;
};