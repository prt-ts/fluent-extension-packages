/* eslint-disable */
import { useEffect, useState } from "react"
import { IFormInput } from "../RHFTest"

// ts-ignore-next-line
export const defaultValues: IFormInput = {
    firstName: '',
    lastName: '',
    iceCreamType: { label: '', value: '' },
    arrayItem: [], 
    datePickerValue: new Date(),
    isIceCreamLiked: false,
    yesNoQuestionCheckbox: false,
    slider: 0
}

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
                firstName: 'Pradeep',
                lastName: 'Thapaliya',
                iceCreamType: { label: 'Chocolate', value: 'chocolate' },
                arrayItem: [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }],
                datePickerValue: new Date(),
                isIceCreamLiked: true,
                yesNoQuestionCheckbox: true,
                slider: 50
            })
        }, 2000)
    })
}
