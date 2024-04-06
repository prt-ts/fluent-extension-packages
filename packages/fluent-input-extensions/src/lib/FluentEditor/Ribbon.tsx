import * as React from "react";
import { Divider, Toolbar, ToggleButton, makeStyles, tokens, Tooltip } from "@fluentui/react-components";
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
    TextSuperscriptFilled
} from "@fluentui/react-icons";
import { ChooseFontColor, ChooseHighlightColor, HeadingLevel, InsertImageButton, InsertLinkButton, InsertTableButton, TextAlign, TextCapitalization } from "./EditorButtons";
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
                <Tooltip content={<>Toggle Bold</>} relationship='label'>
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
                </Tooltip>
                <Tooltip content={<>Toggle Italic</>} relationship='label'>
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
                </Tooltip>
                <Tooltip content={<>Toggle Underline</>} relationship='label'>
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
                </Tooltip>
                <Tooltip content={<>Toggle Strike Through</>} relationship='label'>
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
                </Tooltip>

                {/* <SetFontSizeFormatter editor={editor!} handleChange={handleChange} fontSize={fontSize || "14"} /> */}

                <Divider vertical className={styles.divider} />

                {/* font color */}
                <ChooseFontColor editor={editor!} handleChange={handleChange} fontColor={textColor || "#000000"} />

                {/* highlight color */}
                <ChooseHighlightColor editor={editor!} handleChange={handleChange} fontColor={textColor || "#000000"} backgroundColor={backgroundColor || ""} />


                {/* text align */}
                <TextAlign editor={editor!} handleChange={handleChange} textAlign={textAlign as any} />

                <TextCapitalization editor={editor!} handleChange={handleChange} />

                <HeadingLevel editor={editor!} handleChange={handleChange} headingLevel={headingLevel as any} />

                <Divider vertical className={styles.divider} />

                <Tooltip content={<>Increase Indent</>} relationship='label'>
                    <ToggleButton
                        aria-label="Indent"
                        icon={<TextGrammarArrowLeftFilled className={styles.icon} />}
                        onClick={() => {
                            setIndentation(editor!, "indent");
                            handleChange?.();
                        }}
                        size="small"
                    />
                </Tooltip>
                <Tooltip content={<>Decrease Indent</>} relationship='label'>
                    <ToggleButton
                        aria-label="Outdent"
                        icon={<TextGrammarArrowRightFilled className={styles.icon} />}
                        onClick={() => {
                            setIndentation(editor!, "outdent");
                            handleChange?.();
                        }}
                        size="small"
                    />
                </Tooltip>

                <Tooltip content={<>Number List</>} relationship='label'>
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
                </Tooltip>

                <Tooltip content={<>Bullet List</>} relationship='label'>
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
                </Tooltip>

                <Tooltip content={<>Superscript</>} relationship='label'>
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
                </Tooltip>

                <Tooltip content={<>Subscript</>} relationship='label'>
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
                </Tooltip>

                <Divider vertical className={styles.divider} />

                {/* insert image */}
                <InsertImageButton editor={editor!} handleChange={handleChange} />

                <Divider vertical className={styles.divider} />

                {/* insert link */}
                <InsertLinkButton editor={editor!} handleChange={handleChange} />

                <Tooltip content={<>Block Quote</>} relationship='label'>
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
                </Tooltip>

                {/* insert table */}
                <InsertTableButton editor={editor!} handleChange={handleChange} />

                <Tooltip content={<>Code Block</>} relationship='label'>
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
                </Tooltip>

                <Tooltip content={<>Clear Format</>} relationship='label'>
                    <ToggleButton
                        aria-label="Clear Format"
                        icon={<ClearFormattingRegular className={styles.icon} />}
                        onClick={() => {
                            clearFormat(editor!);
                            handleChange?.();
                        }}
                        size="small"
                    />
                </Tooltip>
            </Toolbar>

        </div>
    );
}