import * as React from "react";
import { Button, Divider, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Popover, PopoverSurface, PopoverTrigger, Toolbar, ToolbarToggleButton, makeStyles, tokens } from "@fluentui/react-components";
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
    setIndentation,
    changeCapitalization,
    toggleSuperscript,
    toggleSubscript,
    setTextColor,
    insertTable,
    insertLink,
    insertImage,
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
    TextQuoteRegular, 
    TextCaseTitleFilled,
    TextCaseUppercaseFilled,
    TextCaseLowercaseFilled,
    TextEffectsFilled,
    TextEditStyleFilled,
    TextGrammarArrowLeftFilled,
    TextGrammarArrowRightFilled,
    TextSubscriptFilled,
    TextSuperscriptFilled,
    TextColorFilled,    
    TableFilled,
    LinkFilled,
    ImageRegular
} from "@fluentui/react-icons";
import { Case, Switch } from "@prt-ts/react-control-flow";

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
    },
    menuPopover: {
        minWidth: tokens.spacingHorizontalM, 
    }
})

export const FluentEditorRibbon: React.FC<FluentEditorRibbonProps> = (props) => {
    const { editor, value, handleChange } = props;
    const formats = React.useMemo(() => {
        if (!editor) {
            return {
                basicFormat: [],
                textAlign: ["left"],
                textFormat: ["sentence"], 
                additionalFormat: []
            };
        }

        const formatState = getFormatState(editor!);
        console.log(formatState)
        return {
            basicFormat: [
                formatState?.isBold && "bold",
                formatState?.isItalic && "italic",
                formatState?.isUnderline && "underline",
                formatState?.isStrikeThrough && "strikethrough"
            ]?.filter(x => !!x) as string[],

            textAlign: formatState?.textAlign ? [formatState.textAlign] : ["left"],
            textFormat: formatState?.direction ? [formatState.direction] : ["sentence"],

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
                checkedValues={formats}
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

                {/* text align */}
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={{
                            children: ( 
                                    <Switch when={formats.textAlign?.[0] || "left"} >
                                        <Case value={["left", "start"]}>
                                            <TextAlignLeftRegular className={styles.icon} />
                                        </Case> 
                                        <Case value={"center"}>
                                            <TextAlignCenterRegular className={styles.icon} />
                                        </Case>
                                        <Case value={"end"}>
                                            <TextAlignRightRegular className={styles.icon} />
                                        </Case>
                                        <Case value={"justify"}>
                                            <TextAlignJustifyRegular className={styles.icon} />
                                        </Case>
                                    </Switch> 
                            ),
                        }}
                            size="small"
                        />
                    </MenuTrigger> 
                    <MenuPopover className={styles.menuPopover}>
                        <MenuList>
                            <MenuItem
                                aria-label="Justify Content"
                                icon={<TextAlignJustifyRegular className={styles.icon} />}
                                onClick={() => {
                                    setAlignment(editor!, "justify");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                icon={<TextAlignLeftRegular className={styles.icon} />}
                                onClick={() => {
                                    setAlignment(editor!, "left");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                icon={<TextAlignCenterRegular className={styles.icon} />}
                                onClick={() => {
                                    setAlignment(editor!, "center");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                icon={<TextAlignRightRegular className={styles.icon} />}
                                onClick={() => {
                                    setAlignment(editor!, "right");
                                    handleChange?.();
                                }}
                            />
                        </MenuList>
                    </MenuPopover>
                </Menu>

                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button
                            icon={{
                                children: (
                                    <TextEditStyleFilled className={styles.icon} />
                                ),
                            }}
                            size="small"
                        />
                    </MenuTrigger>
                    <MenuPopover className={styles.menuPopover}>
                        <MenuList>
                            <MenuItem
                                aria-label="Text Format Capitalize Sentence"
                                icon={<TextCaseTitleFilled className={styles.icon} />}
                                onClick={() => {
                                    changeCapitalization(editor!, "sentence", "en-US");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                aria-label="Text Format Upper Case"
                                icon={<TextCaseUppercaseFilled className={styles.icon} />}
                                onClick={() => {
                                    changeCapitalization(editor!, "upperCase", "en-US");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                aria-label="Text Format Lower Case"
                                icon={<TextCaseLowercaseFilled className={styles.icon} />}
                                onClick={() => {
                                    changeCapitalization(editor!, "lowerCase", "en-US");
                                    handleChange?.();
                                }}
                            />
                            <MenuItem
                                aria-label="Text Format Capitalize All Words"
                                icon={<TextEffectsFilled className={styles.icon} />}
                                onClick={() => {
                                    changeCapitalization(editor!, "capitalize", "en-US");
                                    handleChange?.();
                                }}
                            />
                        </MenuList>
                    </MenuPopover>
                </Menu>

                <Divider vertical className={styles.divider} />

                <ToolbarToggleButton
                    aria-label="Indent"
                    icon={<TextGrammarArrowLeftFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"numbering"}
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


                <ToolbarToggleButton
                    aria-label="Block Quote"
                    icon={<TextSuperscriptFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"quote"}
                    onClick={() => {
                        toggleSuperscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />
                <ToolbarToggleButton
                    aria-label="Block Quote"
                    icon={<TextSubscriptFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"quote"}
                    onClick={() => {
                        toggleSubscript(editor!);
                        handleChange?.();
                    }}
                    size="small"
                />

                <Divider vertical className={styles.divider} /> 

                <ToolbarToggleButton
                    aria-label="Code Block"
                    icon={<TextColorFilled className={styles.icon} />}
                    name="additionalFormat"
                    value={"code"}
                    onClick={() => {
                        setTextColor(editor!, "red");
                        handleChange?.();
                    }}
                    size="small"
                /> 

                {/* insert table */}
                <Popover>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button
                            aria-label="Code Block"
                            icon={<TableFilled className={styles.icon} />}
                            name="additionalFormat"
                            value={"code"}
                           
                            size="small"
                        />
                    </PopoverTrigger>

                    <PopoverSurface tabIndex={-1}>
                        <Button                            
                            onClick={() => {
                                insertTable(editor!, 5, 5);
                                handleChange?.();
                            }}>Insert</Button>
                    </PopoverSurface>
                </Popover>

                {/* insert link */}
                <Popover>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button
                            aria-label="Insert Link"
                            icon={<LinkFilled className={styles.icon} />}
                            name="additionalFormat"
                            value={"code"}
                           
                            size="small"
                        />
                    </PopoverTrigger>

                    <PopoverSurface tabIndex={-1}>
                        <Button                            
                            onClick={() => {
                                insertLink(editor!, "https://www.google.com", "Google", "Google", "_blank");
                                handleChange?.();
                            }}>Insert</Button>
                    </PopoverSurface>
                </Popover>

                {/* insert image */}
                <Popover>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button
                            aria-label="Insert Link"
                            icon={<ImageRegular className={styles.icon} />} 
                            size="small"
                        />
                    </PopoverTrigger>

                    <PopoverSurface tabIndex={-1}>
                        <Button                            
                            onClick={() => {
                                insertImage(editor!, "https://placehold.co/600x400");
                                handleChange?.();
                            }}>Insert</Button>
                    </PopoverSurface>
                </Popover>


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