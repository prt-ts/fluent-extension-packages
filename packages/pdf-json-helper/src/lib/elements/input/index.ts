import htmlToPdfmake from "html-to-pdfmake";
import { calendarButtonIcon, dropdownButtonIcon } from "../../icons";

function getTextInputNoLabel(value: string | undefined) {
    return {
        stack: [
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: value ?? " ",
                            },
                        ],
                    ],
                },
                style: "textInputStyle",
            },
        ],
    };
}

function getTextInput(label: string, value: string | undefined) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: value ?? " ",
                            },
                        ],
                    ],
                },
                style: "textInputStyle",
            },
        ],
    };
}

function getDateInput(label: string, value: Date | undefined) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*", 10],
                    body: [
                        [
                            {
                                text: value ? value.toLocaleDateString() : " ",
                            },
                            {
                                image: calendarButtonIcon,
                                width: 10,
                            },
                        ],
                    ],
                },
                style: "textInputStyle",
            },
        ],
    };
}

function getSelectInput(label: string, value: String | undefined) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*", 10],
                    body: [
                        [
                            {
                                text: value ?? " ",
                            },
                            {
                                image: dropdownButtonIcon,
                                width: 10,
                            },
                        ],
                    ],
                },
                style: "textInputStyle",
            },
        ],
    };
}

function getCurrencyInput(
    label: string,
    value: number | string | undefined,
    currencySymbol: string = "$",
    setCurrencSymbolyAsPrefix: boolean = true
) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: setCurrencSymbolyAsPrefix
                                    ? `${currencySymbol}${value ?? " "}`
                                    : `${value} ${currencySymbol}`,
                            },
                        ],
                    ],
                },
                style: "textInputStyle",
            },
        ],
    };
}

/// For Larger Text
function getTextareaInput(label: string, value: string | undefined) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: value ?? " ",
                            },
                        ],
                    ],
                },
                style: "textareaStyle",
            },
        ],
    };
}

/// For Larger Text with html tags
function getRichTextareaInput(label: string, value: string | undefined) {
    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                stack: htmlToPdfmake(value as string),
                            },
                        ],
                    ],
                },
                style: "richTextEditorStyle",
            },
        ],
    };
}

export {
    getTextInputNoLabel,
    getTextInput,
    getDateInput,
    getSelectInput,
    getCurrencyInput,
    getTextareaInput,
    getRichTextareaInput
}