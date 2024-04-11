import { Button } from '@fluentui/react-components';
import { Form, Input, useForm, yupResolver } from '@prt-ts/fluent-react-hook-form';
import * as React from 'react';
import * as Yup from 'yup';

const InputSchema = Yup.object().shape({
    field1: Yup.string().required("Field 1 is required"),
    field2: Yup.string().max(10, "Field 2 must be less than 10 characters"),
    field3: Yup.string().min(5, "Field 3 must be at least 5 characters"),
    phoneNumber: Yup.string().required("Phone number is required").min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be at most 15 characters"),
});

type InputFormValues = Yup.InferType<typeof InputSchema>;

export const InputExample: React.FC = () => {

    const form = useForm<InputFormValues>({
        values: {
            field1: "",
            field2: "with initial value",
            field3: ""
        },
        resolver: yupResolver(InputSchema),

    });

    const handleSubmit = (values: InputFormValues) => {
        console.log(values);
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0px auto" }}>
            <Form form={form} onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Input name='field1' label='Small Field' placeholder={"field 1"} hint={<>Hint</>} info={<>Info</>} size={"small"} required />
                    <Input name='field2' label='Medium Field' placeholder={"field 2"} hint={<>Hint</>} info={<>Info</>} />
                    <Input name='field3' label='Large Field' placeholder={"field 3"} hint={<>Hint</>} info={<>Info</>} size={"large"} />
                    <Input name='phoneNumber' fieldMask='phone' label='Phone Number' placeholder={"Phone Number"} hint={<>Enter number, it will automatically format</>} info={<>some phone number info</>} />
                    <Input name='currency' fieldMask='currency' label='Currency Input' placeholder={"Currency Input"} hint={<>Enter number, it will automatically format</>} info={<>some phone number info</>} />
                    <Button type="submit" appearance='primary'>Submit</Button>
                </div>
            </Form >
        </div>)
}   