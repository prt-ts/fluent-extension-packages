import { checkedRadioButtonIcon, uncheckedRadioButtonIcon } from "../../icons";
import { IRadioOptionType } from "../../types/radio.types";

/// radio button input
function getRadioInput(
    label: string,
    options: IRadioOptionType[],
    optionLayout: "vertical" | "horizontal" = "horizontal"
) {
    //create basic layout
    let labelOptions: any = {
        columnGap: 5,
        style: "richTextEditorStyle",
    };

    if (optionLayout === "horizontal") {
        const layout2D = options?.map((option) => {
            return [
                {
                    width: 15,
                    image: option.selected
                        ? checkedRadioButtonIcon
                        : uncheckedRadioButtonIcon,
                },
                {
                    width: option.width ?? "auto",
                    text: option.itemLabel,
                    fontSize: 10,
                    italics: true,
                },
            ];
        });

        // flattened column
        const columns = [];
        for (let option of layout2D)
            for (let labelOrIcon of option) columns.push(labelOrIcon);

        //set radio options to labelOption
        labelOptions["columns"] = columns;
    } else {
        labelOptions["stack"] = options?.map((option) => {
            return {
                columnGap: 5,
                columns: [
                    {
                        width: 15,
                        image: option.selected
                            ? checkedRadioButtonIcon
                            : uncheckedRadioButtonIcon,
                    },
                    {
                        width: option.width ?? "auto",
                        text: option.itemLabel,
                        fontSize: 10,
                        italics: true,
                    },
                ],
            };
        });
    }

    return {
        stack: [
            {
                text: label,
                style: "labelStyle",
            },
            labelOptions,
        ],
    };
}

export { getRadioInput }