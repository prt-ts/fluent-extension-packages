import * as React from "react";
import { Button, Divider, Dropdown, Menu, MenuItem, MenuItemRadio, MenuList, MenuPopover, MenuTrigger, Option, Popover, PopoverSurface, PopoverTrigger, ToggleButton, Toolbar, ToolbarToggleButton, makeStyles, tokens } from "@fluentui/react-components";
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
    setHeadingLevel,
    setBackgroundColor,
} from 'roosterjs-content-model-api';

import {
    SwatchPicker,
    renderSwatchPickerGrid
} from "@fluentui/react-swatch-picker-preview";


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
    ColorBackgroundFilled
} from "@fluentui/react-icons";
import { Case, For, Switch } from "@prt-ts/react-control-flow";
import { InsertImageButton, InsertLinkButton, InsertTableButton } from "./EditorButtons";

const headingLevelOptions = {
    "0": "Paragraph",
    "1": "Heading 1",
    "2": "Heading 2",
    "3": "Heading 3",
    "4": "Heading 4",
    "5": "Heading 5",
};

const colors = [
    { color: "#000000", value: "#000000", "aria-label": "black" },
    { color: "#FF1921", value: "#FF1921", "aria-label": "red" },
    { color: "#FFC12E", value: "#FFC12E", "aria-label": "orange" },
    { color: "#FEFF37", value: "#FEFF37", "aria-label": "yellow" },
    { color: "#90D057", value: "#90D057", "aria-label": "light green" },
    { color: "#00B053", value: "#00B053", "aria-label": "green" },
    { color: "#00AFED", value: "#00AFED", "aria-label": "light blue" },
    { color: "#006EBD", value: "#006EBD", "aria-label": "blue" },
    { color: "#712F9E", value: "#712F9E", "aria-label": "purple" },
    { color: "#FFFFFF", value: "#FFFFFF", "aria-label": "white" },
];

const highlightColors = [
    { color: "rgba(255, 255, 255)", value: "rgba(255, 255, 255, 0.5)", "aria-label": "white" },
    { color: "rgba(255, 25, 33)", value: "rgba(255, 25, 33, 0.5)", "aria-label": "red" },
    { color: "rgba(255, 193, 46)", value: "rgba(255, 193, 46, 0.5)", "aria-label": "orange" },
    { color: "rgba(254, 255, 55)", value: "rgba(254, 255, 55, 0.5)", "aria-label": "yellow" },
    { color: "rgba(144, 208, 87)", value: "rgba(144, 208, 87, 0.5)", "aria-label": "light green" },
    { color: "rgba(0, 176, 83)", value: "rgba(0, 176, 83, 0.5)", "aria-label": "green" },
    { color: "rgba(0, 175, 237)", value: "rgba(0, 175, 237, 0.5)", "aria-label": "light blue" },
    { color: "rgba(0, 110, 189)", value: "rgba(0, 110, 189, 0.5)", "aria-label": "blue" },
    { color: "rgba(113, 47, 158)", value: "rgba(113, 47, 158, 0.5)", "aria-label": "purple" },
    { color: "rgba(0, 0, 0)", value: "rgba(0, 0, 0, 0.5)", "aria-label": "black" },
];

type HeadingOptionKey = keyof typeof headingLevelOptions;

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
                <Menu
                    checkedValues={{
                        alignment: [formats.textAlign || "left"]
                    }}
                    onCheckedValueChange={(_, data) => {
                        const alignmentText = data.checkedItems?.[0] as "left" | "center" | "right" | "justify";
                        setAlignment(editor!, alignmentText);
                    }}>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={{
                            children: (
                                <Switch when={formats.textAlign || "left"} >
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
                            <MenuItemRadio
                                aria-label="Justify Content"
                                icon={<TextAlignJustifyRegular className={styles.icon} />}
                                name={"alignment"}
                                value={"justify"}
                            />
                            <MenuItemRadio
                                icon={<TextAlignLeftRegular className={styles.icon} />}
                                name={"alignment"}
                                value={"left"}
                            />
                            <MenuItemRadio
                                icon={<TextAlignCenterRegular className={styles.icon} />}
                                name={"alignment"}
                                value={"center"}
                            />
                            <MenuItemRadio
                                icon={<TextAlignRightRegular className={styles.icon} />}
                                name={"alignment"}
                                value={"right"}
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

                <Dropdown
                    size="small"
                    className={styles.dropdown}
                    value={headingLevelOptions[(formats.headingLevel ?? "0") as HeadingOptionKey] ?? "N"}
                    selectedOptions={[formats.headingLevel?.toString() ?? "0"]}
                    onOptionSelect={(_, data) => {
                        setHeadingLevel(editor!, parseInt(data.optionValue ?? "0") as 0 | 1 | 2 | 3 | 4 | 5);
                        handleChange?.();
                    }}
                >
                    <For each={Object.keys(headingLevelOptions) as HeadingOptionKey[]}>
                        {
                            (key: HeadingOptionKey) => (<Option key={key} value={key}>{headingLevelOptions?.[key] ?? ""}</Option>)
                        }
                    </For>
                </Dropdown>

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

                <Popover trapFocus>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button
                            aria-label="Font Color"
                            icon={<TextColorFilled className={styles.icon} primaryFill={formats.fontColor} />}
                            size="small"
                        />
                    </PopoverTrigger>

                    <PopoverSurface>
                        <SwatchPicker
                            layout="grid"
                            aria-label="Select Font Color"
                            selectedValue={formats.fontColor ?? "#000000"}
                            onSelectionChange={(_, data) => {
                                console.log(data)
                                setTextColor(editor!, data.selectedValue);
                                handleChange?.();
                            }}
                            size="small"
                        >
                            {renderSwatchPickerGrid({
                                items: colors,
                                columnCount: 5,
                            })}
                        </SwatchPicker>
                    </PopoverSurface>
                </Popover>

                <Popover trapFocus>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button
                            aria-label="Highlight Color"
                            icon={<ColorBackgroundFilled className={styles.icon}/>}                           
                            size="small"
                            style={{ backgroundColor: formats.backgroundColor, color: formats.fontColor}}
                        />
                    </PopoverTrigger>

                    <PopoverSurface>
                        <SwatchPicker
                            layout="grid"
                            aria-label="Select Font Color" 
                            defaultSelectedValue={formats.backgroundColor ?? "#FFFFFF"}
                            onSelectionChange={(_, data) => {
                                console.log(data)
                                setBackgroundColor(editor!, data.selectedValue);
                                handleChange?.();
                            }}
                            size="small"
                        >
                            {renderSwatchPickerGrid({
                                items: highlightColors,
                                columnCount: 5,
                            })}
                        </SwatchPicker>
                    </PopoverSurface>
                </Popover>

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