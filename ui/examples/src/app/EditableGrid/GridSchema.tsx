import * as Yup from "yup";

export const GridFormSchema = Yup.object().shape({
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
