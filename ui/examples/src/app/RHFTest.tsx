
import { Button, Table, TableBody, TableCell, TableRow } from "@fluentui/react-components";
import { Form, Checkbox, DatePicker, Input, Slider, Switch } from "@prt-ts/fluent-react-hook-form"; 
import { Fragment, useCallback } from "react";
import { defaultValues, useDefaultValues } from "./examples/useDefaultValue";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup
    .object({
        firstName: yup.string().required("First Name is required").min(10, "Min 10").max(15, "Max 15"),
        lastName: yup.string().required("Last Name is required"),
        iceCreamType: yup.object().required("Ice Cream Type is required"),
        arrayItem: yup.array().of(yup.object({
            label: yup.string().required("Array Item Label is required"),
            value: yup.string().required("Array Item Value is required"),
        }).required("Array Item is required")),
        datePickerValue: yup.date().notRequired().required("Date Picker is required"),
        isIceCreamLiked: yup.boolean().required("Is Ice Cream Liked is required"),
        yesNoQuestionCheckbox: yup.boolean().required("Yes No Question Checkbox is required"),
        slider: yup.number().required("Slider is required"),
    });


export type IFormInput = yup.InferType<typeof schema>


export const ReactHookForm = () => {

    const onSubmit = useCallback((data: IFormInput) => {
        console.log(data)
    }, [])

    const values = useDefaultValues()


    const testForm = useForm<IFormInput>({
        defaultValues: defaultValues,
        values: values,
        resolver: yupResolver(schema),
    })

    const getFormValue = useCallback(() => {
        console.log(testForm?.getValues())
    }, [testForm])

    const arrayItem = testForm?.watch("arrayItem");
    const addMore = useCallback(() => {
        testForm?.setValue("arrayItem", [...(arrayItem || []), { label: '', value: '' }])
    }, [arrayItem, testForm])

    console.log("rendering")
    return (
        <>
            <Button onClick={getFormValue}>Get Form Value</Button>
            <Button onClick={addMore}>Add Dynamic Values</Button>
            <Form form={testForm} onSubmit={onSubmit}>
                <Input name={"firstName"} label={"First Name"} required={true} />
                <Input name={"lastName"} label={<>LastName with Info</>} required={true} info={<>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, qui ut voluptatem repudiandae voluptates accusamus eaque quia deleniti laudantium facilis tempore temporibus asperiores nemo, quis consequatur praesentium ea, eius pariatur.</>} />

                <Table size="extra-small">
                    <TableBody>
                        {(arrayItem || [])?.map((_, index: number) => (
                            <Fragment key={index}>
                                <TableRow>
                                    <TableCell>
                                        <Input name={`arrayItem.${index}.label`} placeholder="Label" />
                                    </TableCell>
                                    <TableCell>

                                        <Input name={`arrayItem.${index}.value`} placeholder="Value" />
                                    </TableCell>
                                </TableRow>
                            </Fragment>))
                        }
                    </TableBody>
                </Table>
                <DatePicker allowTextInput name={"datePickerValue"} label={"Ice Cream Type"} />
                <Switch name={"isIceCreamLiked"} label={"Do you like Ice Cream?"} checkedLabel={"Yes"} uncheckedLabel={"No"} orientation="horizontal" />
                <Switch name={"isOIceCreamLiked"} label={"Do you like another Ice Cream?"} checkedLabel={"Yes"} uncheckedLabel={"No"} orientation="horizontal" />
                <Switch name={"isVIceCreamLiked"} label={"Do you like vanilla Ice Cream?"} checkedLabel={"Yes"} uncheckedLabel={"No"} orientation="horizontal" />
                <Checkbox shape="circular" name={"yesNoQuestionCheckbox"} label={"Yes/No Checkbox, Please Confirm Following"} checkedLabel={"Yes"} uncheckedLabel={"No"} />

                <Slider name={"slider"} label={"Slider"} min={0} max={100} />

                <Button type="submit" appearance="primary">Submit</Button>
            </Form >
        </>
    )
}
