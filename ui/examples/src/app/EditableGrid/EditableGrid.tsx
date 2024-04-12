import * as React from "react";
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    Table,
    createColumnHelper,
    disableAllShorthand,
} from '@prt-ts/fluent-react-table-v2';
import { Person, makeData } from "../data/data";
import { GridDatePickerCell } from "./FormElement";
import { Form, GridDropdownCell, GridInputCell, GridTextareaCell, useForm, yupResolver } from "@prt-ts/fluent-react-hook-form";

import * as Yup from 'yup';
import { Button } from "@fluentui/react-components";
import { useAlert } from "@prt-ts/fluent-common-features";
// define schema for the form
const schema = Yup.object().shape({
    submitCount : Yup.number(),
    items: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().nullable(),//.required("Id is required"),
            firstName: Yup.string().max(10, "First Name is required"),
            lastName: Yup.string().max(10, "Last Name is required"),
            age: Yup.number().nullable(),//.typeError("Age must be a number").required("Age is required"),
            status: Yup.string().when('age', ([age]) => {
                if (age > 18) {
                    return Yup
                        .string()
                        .required('If age is greater than 18, status is required') 
                }
                else {
                    return Yup
                        .string()
                        .nullable();
                }
            }),
            createdAt: Yup.date().nullable(),//.required(),
            description: Yup.string().nullable(),//.required("Description is required")
        })
    )
});

export type PersonFormValue = Yup.InferType<typeof schema>;

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

    const { error : alertError, progress : alertProgress } = useAlert();
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
                    return <GridInputCell name={name} defaultValue={value} />
                },
                ...disableAllShorthand
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
                        options={["Test 1", "Test 2"]} 
                        placeholder="--select--"/>)
                },
                ...disableAllShorthand
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
                        options={["Test 1", "Test 2"]} 
                        placeholder="--select--"/>)
                },
                ...disableAllShorthand
            }),
            columnHelper.accessor('age', {
                id: 'age',
                header: () => 'Age',
                aggregatedCell: () => null,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridInputCell name={name} defaultValue={value}  placeholder="Enter Age"/>
                },
                ...disableAllShorthand
            }),
            columnHelper.accessor('status', {
                id: 'status',
                header: 'Status',
                aggregatedCell: () => null,
                filterFn: 'arrIncludesSome',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell 
                        name={name}
                        defaultValue={value}
                        options={["single", "in relationship", "complicated"]} />)
                },
                ...disableAllShorthand
            }),
            columnHelper.accessor('description', {
                id: 'description',
                header: 'Description',
                aggregatedCell: () => null,
                filterFn: 'arrIncludesSome',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridTextareaCell 
                        name={name}
                        defaultValue={value}
                        />)
                },
                ...disableAllShorthand
            }),
            columnHelper.accessor(({ createdAt }) => createdAt ? new Date(createdAt)?.toLocaleDateString() : "", {
                id: 'createdAt',
                header: 'Created At',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridDatePickerCell name={name} defaultValue={value} />
                },
                ...disableAllShorthand
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
                setData(() => makeData(10_000));
            }, 1000);

            return () => clearTimeout(timeout);
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        []
    );

    const form = useForm<PersonFormValue>({
        resolver: yupResolver(schema),
        values: {
            submitCount: 0,
            items : (data || [])?.map((item) => {
                return {
                    ...item,
                    firstName: "",
                    lastName: "",
                    age: null,
                    status: null,
                    description: "",
                } 
            })  as PersonFormValue['items']
        },
    })

    const { watch, trigger, setValue } = form;

    const formValue = watch();
    const gridData = React.useMemo(() => { 
        return formValue.items as Person[];
    }, [formValue]); 

    console.log("rendering", gridData, formValue);

    const handleSubmit = (data: PersonFormValue) => {
        console.log(data);
    }

    return (
        <div>
            <Form form={form} onSubmit={handleSubmit}>
                <Button type="button" onClick={() => {
                    let toastId = null;
                    console.log("submitting", form.formState.errors, form.formState);
                    if (form.formState.errors && Object.keys(form.formState.errors).length > 0){
                        toastId = alertProgress({
                            title: "Validating",
                            body: "Please wait while we validate the form",
                        });
                        setTimeout(() => {
                            trigger();
                            const submitCount = form.getValues("submitCount");
                            setValue("submitCount", submitCount + 1, { shouldValidate: true });

                            alertError({
                                title: "Validation Error",
                                body: "Please fix all the errors before submitting the form",
                            }, {
                                toastId: toastId
                            });
                        }, 1000);
                        return;
                    }
                   
                    form.handleSubmit(handleSubmit)();
                }}>
                    Submit
                </Button>
                <Table
                    data={[...gridData]}
                    // defaultColumn={defaultColumn}
                    columns={columns}
                    // tableHeight='100%'
                    pageSize={10_000}
                // onUpdateData={onUpdateData}
                // autoResetPageIndex={autoResetPageIndex}
                disableTableHeader={true}
                columnPinningState={{
                    left: ["id"],
                    right: ["createdAt"]
                }}
                isLoading={!gridData?.length}
                />
            </Form>
        </div>
    );
}
