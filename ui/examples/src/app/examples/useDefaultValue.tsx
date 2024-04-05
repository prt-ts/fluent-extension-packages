/* eslint-disable */
import { useEffect, useState } from "react"
import { IFormInput } from "../RHFTest"

// ts-ignore-next-line
export const defaultValues: IFormInput = {
    peoplePicker: [],
  firstName: '',
  firstName1: '',
  firstName2: 'Hello <b>World</b>',
  lastName: '',
  iceCreamType: { label: '', value: '' },
  arrayItem: [],
  attachments: [],
//   datePickerValue: new Date(),
//   isIceCreamLiked: false,
//   yesNoQuestionCheckbox: false,
//   slider: 0,
//   currencyValue: "1234,2132,4.44",
};

export const useDefaultValues = () => {
    const [item, setItem] = useState<IFormInput | undefined>(defaultValues)
    useEffect(() => {
        getDefaultValue().then((data) => {
            setItem(data)
        })
    }, [])

    return item
}

const getDefaultValue = () => {
    return new Promise<IFormInput>((resolve) => {
        setTimeout(() => {
            resolve({
                rating: 3,
                firstName: 'Pradeep',
                lastName: 'Thapaliya',
                iceCreamType: { label: 'Chocolate', value: 'chocolate' },
                arrayItem: [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }],
            //     datePickerValue: new Date(),
            //     isIceCreamLiked: true,
            //     yesNoQuestionCheckbox: true,
            //   slider: 50,
            //     timePickerValue: new Date(),
            })
        }, 2000)
    })
}
