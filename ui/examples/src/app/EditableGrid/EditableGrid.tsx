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
import { Button, InfoLabel } from "@fluentui/react-components";
import { useAlert } from "@prt-ts/fluent-common-features";
// define schema for the form
const schema = Yup.object().shape({
    submitCount: Yup.number(),
    items: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().nullable(),//.required("Id is required"),
            firstName: Yup.string().min(10, "First Name is required"),
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
            createdAt: Yup.date().nullable().required("Created At is required"),
            description: Yup.string().nullable(),//.required("Description is required")
        })
    )
});

export type PersonFormValue = Yup.InferType<typeof schema>;

export function EditableGrid() {
    const { error: alertError, progress: alertProgress } = useAlert();
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
                ...disableAllShorthand,
                size: 50
            }),
            columnHelper.accessor('firstName', {
                id: 'firstName',
                header: () => <InfoLabel label="First Name" info={<>this is first name of the user</>} />,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell
                        name={name}
                        defaultValue={value}
                        options={["Pradeep Raj", "Raj Pradeep", "Pradeep", "Raj"]}
                        placeholder="--select first name--" />)
                },
                ...disableAllShorthand,
                size: 200
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                header: () => <InfoLabel label="Last Name (With very long text )" info={<>this is last name of the user</>} />,
                cell: ({ getValue, row: { id: rowId }, column: { id: columnId } }) => {
                    const value = (getValue() || '') as string;
                    const name = `items.${rowId}.${columnId}`;
                    return (<GridDropdownCell
                        name={name}
                        defaultValue={value}
                        options={["Test 1", "Test 2"]}
                        placeholder="--select last name--" />)
                },
                ...disableAllShorthand,
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

    const form = useForm<PersonFormValue>({
        resolver: yupResolver(schema),
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

    const { watch, trigger, setValue } = form;

    const formValue = watch();
    const gridData = React.useMemo(() => {
        return formValue.items as Person[];
    }, [formValue]);

    // console.log("rendering", gridData, formValue);

    const handleSubmit = (data: PersonFormValue) => {
        console.log(data);
    }

    return (
        <div>
            <Form form={form} onSubmit={handleSubmit}>
                <Button type="button" onClick={() => {
                    let toastId = null;
                    console.log("submitting", form.formState.errors, form.formState);
                    if (form.formState.errors && Object.keys(form.formState.errors).length > 0) {
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
                    pageSize={1_000_000}
                    tableHeight="750px"
                    disableTableHeader
                    // disablePagination
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
