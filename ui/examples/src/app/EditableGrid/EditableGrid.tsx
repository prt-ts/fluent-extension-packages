import * as React from "react";
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    Table,
    createColumnHelper,
    disableAllShorthand,
} from '@prt-ts/fluent-react-table-v2';
import { Person, makeData } from "../data/data";
import { Form, GridDatePickerCell, GridDropdownCell, GridInputCell, GridTextareaCell, useForm, yupResolver } from "@prt-ts/fluent-react-hook-form";

import * as Yup from 'yup';
import { Button, Tooltip } from "@fluentui/react-components";
import { useAlert } from "@prt-ts/fluent-common-features";
import { Info20Regular } from "@fluentui/react-icons";
// define schema for the form
const GridFormSchema = Yup.object().shape({
    submitCount: Yup.number(),
    items: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().nullable(),//.required("Id is required"),
            firstName: Yup.string().min(2, "First Name is required"),
            lastName: Yup.string(), //.max(10, "Last Name is required"),
            age: Yup.number().nullable(),//.typeError("Age must be a number").required("Age is required"),
            status: Yup.string().when(['age', 'firstName', 'lastName'], ([age, firstName, lastName]) => {
                if (age > 18 && firstName && lastName) {
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
            createdAt: Yup.date().nullable(), //.required("Created At is required"),
            description: Yup.string().when(['age', 'firstName', 'lastName'], ([...values]) => {
                if ((values || []).includes("Other")) {
                    return Yup
                        .string()
                        .required('If first name is "Other", description is required')
                }
                else {
                    return Yup
                        .string()
                        .nullable();
                }
            })
        })
    )
});

export type PersonFormValue = Yup.InferType<typeof GridFormSchema>;
export type GridItem = PersonFormValue["items"][0]

export function EditableGrid() {
    const { error: alertError, success: alertSuccess } = useAlert();
    const [data, setData] = useState<Person[]>([]);
    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setData(() => makeData(500));
            }, 1000);

            return () => clearTimeout(timeout);
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        []
    );

    const columns = React.useMemo(() => {
        const columnHelper = createColumnHelper<GridItem>();
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
                ...disableAllShorthand,
                enableResizing: true,
                enableSorting: true,
                size: 50
            }),
            columnHelper.accessor('firstName', {
                id: 'firstName',
                header: () => (<span style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    justifyContent: "end",
                    textAlign: "left"
                }}>
                    <span>
                        First Name (With very long text )
                    </span>
                    <span>
                        <Tooltip withArrow content={<>this is some help description for header</>} relationship="description">
                            <Info20Regular />
                        </Tooltip>
                    </span>
                </span>),
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell
                        name={name}
                        defaultValue={value}
                        options={["Pradeep Raj", "Raj Pradeep", "Pradeep", "Raj", "Other"]}
                        placeholder="--select first name--" />)
                },
                ...disableAllShorthand,
                enableResizing: true,
                size: 200
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                header: () => (<span style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    justifyContent: "end",
                    textAlign: "left"
                }}>
                    <span>
                        Last Name (With very long text and info button)
                    </span>
                    <span>
                        <Tooltip withArrow content={<>this is some help description for header</>} relationship="description">
                            <Info20Regular />
                        </Tooltip>
                    </span>
                </span>),
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell
                        name={name}
                        defaultValue={value}
                        options={["Test 1", "Test 2", "Other"]}
                        placeholder="--select last name--" />)
                },
                ...disableAllShorthand,
                enableResizing: true,
                size: 200
            }),
            columnHelper.accessor('age', {
                id: 'age',
                header: () => 'Age',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridInputCell name={name} defaultValue={value} placeholder="--enter age--" />
                },
                ...disableAllShorthand,
                enableResizing: true,
                size: 100
            }),
            columnHelper.accessor('status', {
                id: 'status',
                header: 'Status',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell
                        name={name}
                        defaultValue={value}
                        options={["single", "in relationship", "complicated"]}
                        placeholder="--select status--" />)
                },
                ...disableAllShorthand,
                enableResizing: true,
                size: 200
            }),
            columnHelper.accessor('description', {
                id: 'description',
                header: 'Description',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridTextareaCell
                        name={name}
                        defaultValue={value}
                        placeholder="--enter description--"
                        rows={6}
                    />)
                },
                ...disableAllShorthand,
                enableResizing: true,
                minSize: 300
            }),
            columnHelper.accessor(({ createdAt }) => createdAt ? new Date(createdAt)?.toLocaleDateString() : "", {
                id: 'createdAt',
                header: 'Created At',
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return <GridDatePickerCell name={name} defaultValue={value} placeholder="--select date--" />
                },
                ...disableAllShorthand
            })
        ] as ColumnDef<Person>[]
    }, []);

    const form = useForm<PersonFormValue>({
        resolver: yupResolver(GridFormSchema),
        values: {
            submitCount: 0,
            items: (data || [])?.map((item) => {
                return {
                    ...item,
                    firstName: "",
                    lastName: "",
                    age: null,
                    status: null,
                    description: "",
                    createdAt: null
                }
            }) as PersonFormValue['items']
        },
    })

    const formValue = form.watch();
    const gridData = React.useMemo(() => {
        return formValue.items as Person[];
    }, [formValue]);

    // console.log("rendering", gridData, formValue);

    const handleError = () => {
        console.log("error")

        // update submit count to trigger validation message popup
        const submitCount = form.getValues("submitCount");
        form.setValue("submitCount", submitCount + 1, { shouldValidate: true }); 

        // show error alert
        alertError({
            title: "Validation Error",
            body: "Please fix all the errors before submitting the form",
        });
    }

    const handleSubmit = (data: PersonFormValue) => { 
        console.log("submitted", data)
        alertSuccess({
            title: "Success",
            body: "Validation successfully completed"
        })
    }

    return (
        <div>
            <Form form={form} onSubmit={handleSubmit} onError={handleError}>
                <Button type="submit">
                    Submit
                </Button>
                <Table
                    data={[...gridData]} 
                    columns={columns}
                    pageSize={1_000_000}
                    tableHeight="750px"
                    disableTableHeader 
                    columnPinningState={{
                        left: ["id"],
                        right: [] 
                    }}
                    isLoading={!gridData?.length}
                />
            </Form>
        </div>
    );
}
