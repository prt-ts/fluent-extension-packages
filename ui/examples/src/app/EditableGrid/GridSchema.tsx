import * as Yup from "yup";

export const GridFormSchema = Yup.object().shape({
    submitCount: Yup.number(),
    items: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().nullable(),//.required("Id is required"),
            firstName: Yup.string().nullable().min(2, "First Name is required"),
            lastName: Yup.string().nullable(), //.max(10, "Last Name is required"),
            age: Yup.number().nullable()
                    .typeError("Age must be a number")
                    .max(120, "Max value allowed in age is 120")
                    .min(0, "Min value for age is 0"),
            status: Yup.string().when(['age', 'firstName', 'lastName'], ([age, firstName, lastName]) => {
                if (age > 18) {
                    return Yup
                        .string()
                        .required('If age is greater than 18, status is required') 
                        .oneOf(["single", "complicated"], "Selected value is not allowed")
                }
                else {
                    return Yup
                        .string()
                        .nullable()
                        .oneOf(["single", "in relationship", "complicated"], "Selected value is not allowed");
                }
            }),
            createdAt: Yup.date().nullable(), //.required("Created At is required"),
            description: Yup.string().when(['firstName', 'lastName'], ([...values]) => {
                if ((values || []).includes("Other")) {
                    return Yup
                        .string()
                        .required('If you select "Other" in any response, description is required')
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
