import * as React from "react";
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    Table,
    createColumnHelper,
} from '@prt-ts/fluent-react-table-v2';
import { Person, makeData } from "../data/data";
import { GridDatePickerCell, GridDropdownCell, GridInputCell } from "./FormElement";
import { Form, useForm } from "@prt-ts/fluent-react-hook-form";

// const defaultColumn: Partial<ColumnDef<Person>> = {
//     cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
//         const value = (getValue() || '') as string;
//         const name = `${rowId}.${columnId}`;
//         return (<GridDropdownCell 
//             name={name}
//             defaultValue={value}
//             options={["Test 1", "Test 2"]} />)
//     }
// };


export function EditableGrid() {

    const [data, setData] = useState<Person[]>([]);

    const columns = React.useMemo(() => {
        const columnHelper = createColumnHelper<Person>();
        return [
            columnHelper.accessor('id', {
                id: 'id',
                header: () => 'ID',
                aggregatedCell: () => null,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridInputCell name={name} defaultValue={value}  />
                }
            }),
            columnHelper.accessor('firstName', {
                id: 'firstName',
                header: () => 'First Name', 
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell 
                        name={name}
                        defaultValue={value}
                        options={["Test 1", "Test 2"]} />)
                }
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                header: () => <span>Last Name</span>,
                aggregatedCell: () => null,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell 
                        name={name}
                        defaultValue={value}
                        options={["Test 1", "Test 2"]} />)
                }
            }),
            columnHelper.accessor('age', {
                id: 'age',
                header: () => 'Age',
                aggregatedCell: () => null,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridInputCell name={name} defaultValue={value}  />
                }
            }),
            columnHelper.accessor('status', {
                id: 'status',
                header: 'Status',
                aggregatedCell: () => null,
                filterFn: 'arrIncludesSome',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `${rowId}.${columnId}`;
                    return (<GridDropdownCell 
                        name={name}
                        defaultValue={value}
                        options={["Test 1", "Test 2"]} />)
                }
            }),
            columnHelper.accessor(({ createdAt }) => createdAt ? new Date(createdAt)?.toLocaleDateString() : "", {
                id: 'createdAt',
                header: 'Created At',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridDatePickerCell name={name} defaultValue={value} />
                },
                aggregatedCell: () => null,
                filterFn: 'inDateRange',
            })
        ] as ColumnDef<Person>[]
    }, []);

    // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
    // const onUpdateData = React.useCallback((rowIndex, columnId, value) => {
    //   // Skip page index reset until after next rerender
    //   console.log(rowIndex, columnId, value)
    //   skipAutoResetPageIndex()
    //   setData(old =>
    //     ([...old]).map((row, index) => {
    //       if (index === rowIndex) {
    //         const accessor = columnId
    //         return {
    //             /* eslint-disable-next-line */
    //           ...old[rowIndex]!,
    //           [accessor]: value,
    //         }
    //       }
    //       return row
    //     })
    //   )
    // }, [skipAutoResetPageIndex])

    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setData(() => makeData(10));
            }, 1000);

            return () => clearTimeout(timeout);
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        []
    );

    const form = useForm({
        values: {
            items : data || []
        },
    })

    const { watch } = form;

    const formValue = watch();
    const gridData = React.useMemo(() => { 
        // return Object.keys(formValue).map((key) => {
        //     return formValue[key];
        // })
        return formValue.items;
    }, [formValue]); 

    console.log("rendering", gridData, formValue);

    return (
        <div>
            <Form form={form}>
                <Table
                    data={[...gridData]}
                    // defaultColumn={defaultColumn}
                    columns={columns}
                    // tableHeight='100%'
                    pageSize={10_000}
                // onUpdateData={onUpdateData}
                // autoResetPageIndex={autoResetPageIndex}
                />
            </Form>
        </div>
    );
}
