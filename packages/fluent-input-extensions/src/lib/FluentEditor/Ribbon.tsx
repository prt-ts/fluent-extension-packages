import * as React from "react";
import { Button, Divider, Toolbar, ToggleButton, makeStyles, tokens } from "@fluentui/react-components";
import type { ContentModelFormatState, IEditor } from 'roosterjs-content-model-types';
import {
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
import { ChooseFontColor, ChooseHighlightColor, HeadingLevel, InsertImageButton, InsertLinkButton, InsertTableButton, SetFontSizeFormatter, TextAlign, TextCapitalization } from "./EditorButtons";
import { useFormatState } from "./useFormatState";

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

    const {
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
        textColor,
        backgroundColor,
        textAlign,
        headingLevel,
    }: ContentModelFormatState = useFormatState(editor!, value!);
    const styles = useRibbonStyle()
    return (
        <div style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}>
            <Toolbar
                aria-label="with controlled Toggle Button"
            >
                <ToggleButton
                    aria-label="Bold"
                    icon={<TextBoldRegular className={styles.icon} />}
                    checked={isBold}
                    onClick={async () => {
                        await toggleBold(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToggleButton
                    aria-label="Italic"
                    icon={<TextItalicRegular className={styles.icon} />}
                    checked={isItalic}
                    onClick={() => {
                        toggleItalic(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToggleButton
                    aria-label="Underline"
                    icon={<TextUnderlineRegular className={styles.icon} />}
                    checked={isUnderline}
                    onClick={() => {
                        toggleUnderline(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToggleButton
                    aria-label="strikeThrough"
                    icon={<TextStrikethroughRegular className={styles.icon} />}
                    checked={isStrikeThrough}
                    onClick={() => {
                        toggleStrikethrough(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <SetFontSizeFormatter editor={editor!} handleChange={handleChange} fontSize={fontSize || "14"} />

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
                <TextAlign editor={editor!} handleChange={handleChange} textAlign={textAlign as any} />

                <TextCapitalization editor={editor!} handleChange={handleChange} />

                <HeadingLevel editor={editor!} handleChange={handleChange} headingLevel={headingLevel as any} />

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

                <ToggleButton
                    aria-label="Outdent"
                    icon={<TextGrammarArrowRightFilled className={styles.icon} />}
                    onClick={() => {
                        setIndentation(editor!, "outdent");
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Number List"
                    icon={<TextNumberListLtrRegular className={styles.icon} />}
                    checked={isNumbering}
                    onClick={() => {
                        toggleNumbering(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Bullet List"
                    icon={<TextBulletListRegular className={styles.icon} />}
                    checked={isBullet}
                    onClick={() => {
                        toggleBullet(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Superscript"
                    icon={<TextSuperscriptFilled className={styles.icon} />}
                    checked={isSuperscript}
                    onClick={() => {
                        toggleSuperscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToggleButton
                    aria-label="Subscript"
                    icon={<TextSubscriptFilled className={styles.icon} />}
                    checked={isSubscript}
                    onClick={() => {
                        toggleSubscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <Divider vertical className={styles.divider} />

                {/* font color */}
                <ChooseFontColor editor={editor!} handleChange={handleChange} fontColor={textColor || "#000000"} />

                {/* highlight color */}
                <ChooseHighlightColor editor={editor!} handleChange={handleChange} fontColor={textColor || "#000000"} backgroundColor={backgroundColor || ""} />

                {/* insert image */}
                <InsertImageButton editor={editor!} handleChange={handleChange} />

                <Divider vertical className={styles.divider} />

                {/* insert link */}
                <InsertLinkButton editor={editor!} handleChange={handleChange} />

                <ToggleButton
                    aria-label="Block Quote"
                    icon={<TextQuoteRegular className={styles.icon} />}
                    checked={isBlockQuote}
                    onClick={() => {
                        toggleBlockQuote(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                {/* insert table */}
                <InsertTableButton editor={editor!} handleChange={handleChange} />

                <ToggleButton
                    aria-label="Code Block"
                    icon={<CodeFilled className={styles.icon} />}
                    checked={isCodeBlock}
                    onClick={() => {
                        toggleCode(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <ToggleButton
                    aria-label="Clear Format"
                    icon={<ClearFormattingRegular className={styles.icon} />}
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