import * as React from "react";
import { getFormatState } from "roosterjs-content-model-api";
import { ContentModelFormatState, IEditor } from "roosterjs-content-model-types";

export function useFormatState(editor: IEditor, value: string): ContentModelFormatState {

    const {
        isBold = false,
        isItalic = false,
        isUnderline = false,
        isStrikeThrough = false,
        isSubscript = false,
        isSuperscript = false,
        isNumbering = false,
        isBullet = false,
        isBlockQuote = false,
        isCodeBlock = false,
        fontSize = "12pt",
        fontName = "",
        textColor = "#000000",
        backgroundColor = "rgba(255, 255, 255, 0.5)",
        textAlign = "left",
        headingLevel = 0,
        imageFormat = {},
        canUndo = false,
        canRedo = false,
        canUnlink = false,
    }: ContentModelFormatState = React.useMemo(() => {
        if (!editor) {
            return {};
        }
        const formats = getFormatState(editor);   
        // console.log(formats);
        
        return formats;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]);

    return {
        isBold,
        isItalic,
        isUnderline,
        isStrikeThrough,
        isSubscript,
        isSuperscript,
        isNumbering,
        isBullet,
        isBlockQuote,
        isCodeBlock,
        fontSize,
        fontName,
        textColor,
        backgroundColor,
        textAlign,
        headingLevel,
        imageFormat,
        canRedo,
        canUndo,
        canUnlink,
    };

}