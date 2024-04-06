import * as React from "react";
import { Button, Divider, ToggleButton, Toolbar, ToolbarToggleButton, makeStyles, tokens } from "@fluentui/react-components";
import type { IEditor } from 'roosterjs-content-model-types';
import {
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
    setIndentation,
    toggleSuperscript,
    toggleSubscript,
    changeFontSize,
} from 'roosterjs-content-model-api';

import {
    TextBoldRegular,
    TextItalicRegular,
    TextUnderlineRegular,
    TextStrikethroughRegular,
    CodeFilled,
    ClearFormattingRegular,
    TextNumberListLtrRegular,
    TextBulletListRegular,
    TextQuoteRegular,
    TextGrammarArrowLeftFilled,
    TextGrammarArrowRightFilled,
    TextSubscriptFilled,
    TextSuperscriptFilled,
    TextFontSizeFilled,
    TextFontRegular
} from "@fluentui/react-icons"; 
import { ChooseFontColor, ChooseHighlightColor, HeadingLevel, HeadingLevelProps, InsertImageButton, InsertLinkButton, InsertTableButton, TextAlign, TextAlignProps, TextCapitalization } from "./EditorButtons";

/* eslint-disable */
type FluentEditorRibbonProps = {
    editor?: IEditor;
    value?: string | undefined;
    handleChange: () => void;
};

const useRibbonStyle = makeStyles({
    icon: {
        fontSize: tokens.fontSizeBase300
    },
    divider: {
        width: tokens.spacingHorizontalM,
        height: "100%",
    },
    menuPopover: {
        minWidth: tokens.spacingHorizontalM,
    },
    dropdown: {
        minWidth: tokens.spacingHorizontalM,
    }
})

export const FluentEditorRibbon: React.FC<FluentEditorRibbonProps> = (props) => {
    const { editor, value, handleChange } = props;
    const formats = React.useMemo(() => {
        if (!editor) {
            return {
                textAlign: "left",
                textFormat: "sentence",
                headingLevel: 0,
                isSubscript: false,
                isSuperscript: false,
                isBlockQuote: false,

                isBullet: false,
                isNumbering: false,

                fontColor: "#000000",
                backgroundColor: "#FFFFFF",

                toggleButtonOptions: {
                    basicFormat: [],
                    additionalFormat: []
                }
            };
        }

        const formatState = getFormatState(editor!);
        console.log(formatState)
        return {

            textAlign: formatState?.textAlign ?? "left",
            textFormat: formatState?.textColor ?? "sentence",
            headingLevel: formatState.headingLevel,
            isSubscript: formatState.isSubscript,
            isSuperscript: formatState.isSuperscript,
            isBlockQuote: formatState.isBlockQuote,
            isBullet: formatState.isBullet,
            isNumbering: formatState.isNumbering,

            fontColor: formatState.textColor ?? "#000000",
            backgroundColor: formatState.backgroundColor ?? "#FFFFFF",

            toggleButtonOptions: {
                basicFormat: [
                    formatState?.isBold && "bold",
                    formatState?.isItalic && "italic",
                    formatState?.isUnderline && "underline",
                    formatState?.isStrikeThrough && "strikethrough"
                ]?.filter(x => !!x) as string[],

                additionalFormat: []
            }
        };
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]);

    const styles = useRibbonStyle()
    return (
        <div style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}>
            <Toolbar
                aria-label="with controlled Toggle Button"
                checkedValues={formats?.toggleButtonOptions}
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
                    aria-label="strikeThrough"
                    icon={<TextStrikethroughRegular className={styles.icon} />}
                    name="basicFormat"
                    value="strikethrough"
                    onClick={() => {
                        toggleStrikethrough(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <Button
                    aria-label="increase font size"
                    icon={<TextFontSizeFilled className={styles.icon} />}
                    onClick={() => {
                        changeFontSize(editor!, "increase");
                        // handleChange?.();
                    }}
                    size="small"
                />

                <Button
                    aria-label="decrease font size"
                    icon={<TextFontRegular className={styles.icon} />}
                    onClick={() => {
                        changeFontSize(editor!, "decrease");
                        // handleChange?.();
                    }}
                    size="small"
                />


                <Divider vertical className={styles.divider} />

                {/* text align */}
                <TextAlign editor={editor!} handleChange={handleChange} textAlign={formats.textAlign as TextAlignProps["textAlign"]} />

                <TextCapitalization editor={editor!} handleChange={handleChange} />

                <HeadingLevel editor={editor!} handleChange={handleChange} headingLevel={formats.headingLevel as HeadingLevelProps["headingLevel"]} />
             
                <Divider vertical className={styles.divider} />

                <ToggleButton
                    aria-label="Indent"
                    icon={<TextGrammarArrowLeftFilled className={styles.icon} />}
                    onClick={() => {
                        setIndentation(editor!, "indent");
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToolbarToggleButton
                    aria-label="Outdent"
                    icon={<TextGrammarArrowRightFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"numbering"}
                    onClick={() => {
                        setIndentation(editor!, "outdent");
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Number List"
                    icon={<TextNumberListLtrRegular className={styles.icon} />}
                    checked={formats.isNumbering}
                    onClick={() => {
                        toggleNumbering(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Bullet List"
                    icon={<TextBulletListRegular className={styles.icon} />}
                    checked={formats.isBullet}
                    onClick={() => {
                        toggleBullet(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Superscript"
                    icon={<TextSuperscriptFilled className={styles.icon} />}
                    checked={formats.isSuperscript}
                    onClick={() => {
                        toggleSuperscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToggleButton
                    aria-label="Subscript"
                    icon={<TextSubscriptFilled className={styles.icon} />}
                    checked={formats.isSubscript}
                    onClick={() => {
                        toggleSubscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <Divider vertical className={styles.divider} />

                {/* font color */}
                <ChooseFontColor editor={editor!} handleChange={handleChange} fontColor={formats.fontColor} />

                {/* highlight color */}
                <ChooseHighlightColor editor={editor!} handleChange={handleChange} fontColor={formats.fontColor} backgroundColor={formats.backgroundColor} />

                {/* insert image */}
                <InsertImageButton editor={editor!} handleChange={handleChange} />

                <Divider vertical className={styles.divider} />

                {/* insert link */}
                <InsertLinkButton editor={editor!} handleChange={handleChange} />

                <ToggleButton
                    aria-label="Block Quote"
                    icon={<TextQuoteRegular className={styles.icon} />}
                    checked={formats.isBlockQuote}
                    onClick={() => {
                        toggleBlockQuote(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                {/* insert table */}
                <InsertTableButton editor={editor!} handleChange={handleChange} />

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
            </Toolbar>
        </div>
    );
}