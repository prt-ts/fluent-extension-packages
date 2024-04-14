import { Tooltip } from "@fluentui/react-components";
import { Info20Regular } from "@fluentui/react-icons";
import { GridDatePickerCell, GridDropdownCell, GridInputCell, GridTextareaCell, useForm, yupResolver } from "@prt-ts/fluent-react-hook-form";
import { ColumnDef, createColumnHelper, disableAllShorthand } from "@prt-ts/fluent-react-table-v2";
import { Person, makeData } from "../data/data";
import { useAlert } from "@prt-ts/fluent-common-features";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GridFormSchema, GridItem, PersonFormValue } from "./GridSchema";

export function useEditableGrid() {
    const { error: alertError, success: alertSuccess } = useAlert();
    const [data, setData] = useState<Person[]>([]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setData(() => makeData(500));
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const columns = useMemo(() => {
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
                minSize: 300,
                maxSize: 300
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
                    id: item.id,
                    firstName: "",
                    lastName: "",
                    age: null,
                    status: null,
                    description: "",
                    createdAt: null
                }
            }) as PersonFormValue['items']
        },
        reValidateMode: "onChange"
    })

    const formValue = form.watch();
    const gridData = useMemo(() => {
        return formValue.items as Person[];
    }, [formValue]);

    const handleError = useCallback(() => {
        console.log("error")

        // update submit count to trigger validation message popup
        const submitCount = form.getValues("submitCount");
        form.setValue("submitCount", submitCount + 1, { shouldValidate: true });

        // show error alert
        alertError({
            title: "Validation Error",
            body: "Please fix all the errors before submitting the form",
        });
    }, 
    // eslint-disable-next-line
    [form])

    const handleSubmit = (data: PersonFormValue) => {
        console.log("submitted", data)
        alertSuccess({
            title: "Success",
            body: "Validation successfully completed"
        })
    }

    return {
        form,
        columns,
        gridData,
        handleError,
        handleSubmit
    } as const;
}