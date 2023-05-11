import htmlToPdfmake from "html-to-pdfmake";
import { checkedCheckboxButtonIcon, uncheckedCheckboxButtonIcon } from "../../icons";

// checkbox input
function getCheckboxInput(
    label: string | undefined,
    ischecked: false,
    labelContentType: "plaintext" | "html" = "plaintext"
) {
    return {
        columnGap: 5,
        columns: [
            {
                width: 15,
                image: ischecked
                    ? checkedCheckboxButtonIcon
                    : uncheckedCheckboxButtonIcon,
            },
            {
                width: "auto",
                stack:
                    labelContentType === "html"
                        ? htmlToPdfmake(label as string)
                        : [label],
                fontSize: 10,
                italics: true,
            },
        ],
    };
}

export { getCheckboxInput }