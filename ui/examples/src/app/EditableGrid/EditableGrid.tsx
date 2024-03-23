import * as React from "react";
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    Table,
    createColumnHelper,
    useSkipper,
} from '@prt-ts/fluent-react-table-v2';
import { Person, makeData } from "../data/data";
import {GridDropdownCell, GridInputCell} from "./FormElement";
import { Form, useForm } from "@prt-ts/fluent-react-hook-form";

const defaultColumn: Partial<ColumnDef<Person>> = {
    cell: ({ getValue, row, column, table }) => {
        const value = (getValue() || '') as string;
        const rowId = +row.id;
        const columnId = column.id;
        return <GridDropdownCell name={`${rowId}.${columnId}`} value={value} table={table} rowId={rowId} columnId={columnId} />
    }
};


export function EditableGrid() {

    const [data, setData] = useState<Person[]>([]);

    const columns = React.useMemo(() => {
        const columnHelper = createColumnHelper<Person>();
        return [
            columnHelper.accessor('id', {
                id: 'id',
                header: () => 'ID',
                aggregatedCell: () => null,
                cell: ({ getValue, row, column, table }) => {
                    const value = (getValue() || '') as string;
                    const rowId = +row.id;
                    const columnId = column.id;
                    return <GridInputCell name={`${rowId}.${columnId}`} value={value} table={table} rowId={rowId} columnId={columnId} />
                }
            }),
            columnHelper.accessor('firstName', {
                id: 'firstName',
                header: () => 'First Name',
                filterFnDefinition: () => 'firstName',
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                header: () => <span>Last Name</span>,
                aggregatedCell: () => null,
            }),
            columnHelper.accessor('age', {
                id: 'age',
                header: () => 'Age',
                aggregatedCell: () => null,
                cell: ({ getValue, row, column, table }) => {
                    const value = (getValue() || '') as string;
                    const rowId = +row.id;
                    const columnId = column.id;
                    return <GridInputCell name={`${rowId}.${columnId}`} value={value} table={table} rowId={rowId} columnId={columnId} />
                }
            }), 
            columnHelper.accessor('status', {
                id: 'status',
                header: 'Status',
                aggregatedCell: () => null,
                filterFn: 'arrIncludesSome',
            }),
        ] as ColumnDef<Person>[]
    }, []);

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
    const onUpdateData = React.useCallback((rowIndex, columnId, value) => {
      // Skip page index reset until after next rerender
      console.log(rowIndex, columnId, value)
      skipAutoResetPageIndex()
      setData(old =>
        ([...old]).map((row, index) => {
          if (index === rowIndex) {
            const accessor = columnId
            return {
                /* eslint-disable-next-line */
              ...old[rowIndex]!,
              [accessor]: value,
            }
          }
          return row
        })
      )
    }, [skipAutoResetPageIndex])

    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setData(() => makeData(10000));
            }, 1000);

            return () => clearTimeout(timeout);
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        []
    );

    const form = useForm({
        values: data,
    })

    const { formState : {dirtyFields}} = form; 

    console.log("rendering", dirtyFields);

    return (
        <div>
            <Form form={form}>
                <Table 
                    data={data}
                    defaultColumn={defaultColumn}
                    columns={columns}
                    // tableHeight='100%'
                    pageSize={10_000}
                    onUpdateData={onUpdateData}
                    autoResetPageIndex={autoResetPageIndex}
                />
            </Form>
        </div>
    );
}
