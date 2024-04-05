import * as React from "react";
import { Divider, Toolbar, ToolbarToggleButton, makeStyles, tokens } from "@fluentui/react-components";
import type { IEditor } from 'roosterjs-content-model-types'; 
import { 
    setAlignment,
    getFormatState, 
    toggleBold, 
    toggleItalic, 
    toggleUnderline, 
    toggleStrikethrough, 
    toggleCode,
    toggleNumbering,
    toggleBullet,
    toggleBlockQuote, 
    clearFormat,
} from 'roosterjs-content-model-api';

import {
    TextBoldRegular,
    TextItalicRegular,
    TextUnderlineRegular,
    TextAlignLeftRegular,
    TextAlignCenterRegular,
    TextAlignRightRegular,
    TextStrikethroughRegular,
    TextAlignJustifyRegular,
    CodeFilled,
    ClearFormattingRegular,
    TextNumberListLtrRegular,
    TextBulletListRegular,
    TextQuoteRegular
} from "@fluentui/react-icons";  

/* eslint-disable */
type FluentEditorRibbonProps = {
    editor?: IEditor;
    value?: string | undefined;
    handleChange?: () => void;
};

const useRibbonStyle = makeStyles({
    icon: {
        fontSize: tokens.fontSizeBase300
    },
    divider: {
        width: tokens.spacingHorizontalM,
        height: "100%",
    }
})

export const FluentEditorRibbon: React.FC<FluentEditorRibbonProps> = (props) => {
    const { editor, value, handleChange } = props; 
    const formatSelected = React.useMemo(() => {
        if (!editor) {
            return {
                basicFormat: [],
                textFormat: [],
                additionalFormat: []
            };
        }

        const formatState = getFormatState(editor!);
        return {
            basicFormat: [
                formatState?.isBold && "bold",
                formatState?.isItalic && "italic",
                formatState?.isUnderline && "underline",
                formatState?.isStrikeThrough && "strikethrough"
            ]?.filter(x => !!x) as string[],

            textFormat: [
                formatState?.textAlign
            ]?.filter(x => !!x) as string[],

            additionalFormat: [
                formatState?.isCodeBlock && "code",
                formatState?.isBullet && "bullet",
                formatState?.isNumbering && "numbering",
                formatState?.isBlockQuote && "quote", 
            ]?.filter(x => !!x) as string[]            
        };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]); 
    
    const styles = useRibbonStyle()
    return (
        <div style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}>
            <Toolbar
                aria-label="with controlled Toggle Button"
                checkedValues={formatSelected}
            >
                <ToolbarToggleButton
                    aria-label="Bold"
                    icon={<TextBoldRegular className={styles.icon} />}
                    name="basicFormat"
                    value="bold"
                    onClick={async () => {
                        await toggleBold(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Italic"
                    icon={<TextItalicRegular className={styles.icon} />}
                    name="basicFormat"
                    value="italic"
                    onClick={() => {
                        toggleItalic(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Underline"
                    icon={<TextUnderlineRegular className={styles.icon} />}
                    name="basicFormat"
                    value="underline"
                    onClick={() => {
                        toggleUnderline(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Underline"
                    icon={<TextStrikethroughRegular className={styles.icon} />}
                    name="basicFormat"
                    value="strikethrough"
                    onClick={() => {
                        toggleStrikethrough(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <Divider vertical className={styles.divider} />

                <ToolbarToggleButton
                    aria-label="Justify Content"
                    value={"justify"}
                    name="textFormat"
                    icon={<TextAlignJustifyRegular className={styles.icon} />}
                    onClick={() => {
                        setAlignment(editor!, "justify");
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Align Left"
                    value={"start"}
                    name="textFormat"
                    icon={<TextAlignLeftRegular className={styles.icon} />}
                    onClick={() => {
                        setAlignment(editor!, "left");
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Align Center"
                    icon={<TextAlignCenterRegular className={styles.icon} />}
                    name="textFormat"
                    value={"center"}
                    onClick={() => {
                        setAlignment(editor!, "center");
                        handleChange?.();
                    }}
                    size="small"

                />
                <ToolbarToggleButton
                    aria-label="Align Right"
                    icon={<TextAlignRightRegular className={styles.icon} />}
                    name="textFormat"
                    value={"end"}
                    onClick={() => {
                        setAlignment(editor!, "right");
                        handleChange?.();
                    }}
                    size="small"
                />

                <Divider vertical className={styles.divider} />

                <ToolbarToggleButton
                    aria-label="Code Block"
                    icon={<CodeFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"code"}
                    onClick={() => {
                        toggleCode(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Clear Format"
                    icon={<ClearFormattingRegular className={styles.icon} />}
                    name="additionalFormat"
                    value={"cleared"}
                    onClick={() => {
                        clearFormat(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <Divider vertical className={styles.divider} />

                <ToolbarToggleButton
                    aria-label="Number List"
                    icon={<TextNumberListLtrRegular className={styles.icon} />}
                    name="additionalFormat"
                    value={"numbering"}
                    onClick={() => {
                        toggleNumbering(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToolbarToggleButton
                    aria-label="Bullet List"
                    icon={<TextBulletListRegular className={styles.icon} />}
                    name="additionalFormat"
                    value={"bullet"}
                    onClick={() => {
                        toggleBullet(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToolbarToggleButton
                    aria-label="Block Quote"
                    icon={<TextQuoteRegular className={styles.icon} />}
                    name="additionalFormat"
                    value={"quote"}
                    onClick={() => {
                        toggleBlockQuote(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

            </Toolbar>
        </div>
    );
}