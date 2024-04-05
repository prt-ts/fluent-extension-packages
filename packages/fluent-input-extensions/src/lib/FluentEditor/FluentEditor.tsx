import React from 'react';
import "./Editor.css";
import { FluentEditorRibbon } from './Ribbon';
import type { IEditor, DOMEventRecord, EditorOptions, EditorPlugin } from 'roosterjs-content-model-types';
import { Editor, createModelFromHtml, exportContent } from 'roosterjs-content-model-core';
import { Show } from '@prt-ts/react-control-flow';
import { FieldControlProps, TextareaProps, makeStaticStyles, makeStyles, mergeClasses, shorthands, tokens, useId } from '@fluentui/react-components';

/* eslint-disable */
export type FluentEditorProps = {
    value?: string | undefined;
    onChange?: (value: string | undefined) => void;
    onBlur?: (e: unknown) => void;
    focusOnInit?: boolean;
    ribbonPosition?: "top" | "bottom";
    showRibbon?: boolean;
    size?: "small" | "medium" | "large";
} & Omit<TextareaProps, "onChange" | "onBlur" | "value"> & FieldControlProps

const useEditorStaticStyles = makeStaticStyles({
    "[contenteditable]:focus": {
        outline: "0px solid transparent"
    },

    ".editor-container": {
        display: "block",
        width: "calc(100% - 20px)",
        position: "relative",
        padding: "10px",
    },
    '.editor-ribbon': {}
});

const useEditorStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        ...shorthands.borderTop(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1Pressed),
        ...shorthands.borderLeft(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1Pressed),
        ...shorthands.borderRight(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1Pressed),
        ...shorthands.borderBottom(tokens.strokeWidthThin, "solid", tokens.colorNeutralStrokeAccessiblePressed),
        ...shorthands.borderRadius(tokens.borderRadiusMedium, tokens.borderRadiusMedium, tokens.borderRadiusMedium, tokens.borderRadiusMedium),

        ":after": {
            content: "''",
            ...shorthands.borderBottom(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1),
            transform: "scaleX(0)",
            transitionProperty: "transform",
            transitionDuration: tokens.durationNormal,
            transitionDelay: tokens.curveDecelerateMid,
        }
    },
    rootFocused: {

        ":after": {
            content: "''",
            ...shorthands.borderBottom(tokens.strokeWidthThin, "solid", tokens.colorCompoundBrandStrokePressed),
            transform: "scaleX(1)",
            transitionProperty: "transform",
            transitionDuration: tokens.durationNormal,
            transitionDelay: tokens.curveDecelerateMid,
        },
    },
    top: {
        ...shorthands.borderBottom(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        boxShadow: tokens.shadow2,
    },
    bottom: {
        // ...shorthands.borderTop(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        boxShadow: tokens.shadow2,
    },

    editor: {
        display: "block",
        width: `calc(100% - ${tokens.spacingHorizontalM} * 2)`,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),


        ...shorthands.border(0)
    },

    small: {
        minHeight: "40px",
        maxHeight: "30vh",
        overflowY: "auto",
    },
    medium: {
        minHeight: "60px",
        maxHeight: "50vh",
        overflowY: "auto",
    },
    large: {
        minHeight: "100px",
        maxHeight: "70vh",
        overflowY: "auto",
    },

    invalid: {
        ...shorthands.border(tokens.strokeWidthThin, "solid", tokens.colorPaletteRedBorder2),
    }

})

function defaultEditorCreator(div: HTMLDivElement, options: EditorOptions): IEditor {
    return new Editor(div, options);
}

export const FluentEditor = React.forwardRef<HTMLDivElement, FluentEditorProps>((props, ref) => { 

    useEditorStaticStyles();
    const [internalValue, setInternalValue] = React.useState<string | undefined>(props.value);

    const {
        value,
        focusOnInit,
        onChange,
        onBlur,
        ribbonPosition = "bottom",
        size = "small",
        showRibbon = true,
        ...rest
    } = props;

    const { ...textareaProps } = rest as unknown as TextareaProps;
    const { ...fieldProps } = rest as unknown as FieldControlProps;
     
    const { disabled, readOnly } = textareaProps;

    const id = useId("editorDiv");

    const editor = React.useRef<IEditor | null>(null);
    const editorDiv = React.useRef<HTMLDivElement>(null);
    const [hasFocus, setHasFocus] = React.useState(false);

    React.useImperativeHandle(ref, () => editorDiv.current!);

    const handleChange = () => {
        if (editor?.current) {
            try {
                if (!editor?.current?.isDisposed()) {
                    let newValue = exportContent(editor.current!);
                    if (newValue === "<br>" || newValue === "<div><br></div>") {
                        newValue = "";
                    }
                    onChange && onChange?.(newValue);
                }
            } catch (error) {
                // console.error("Error in handleChange", error);
            }
        }
    };

    const handleFocus = () => {
        setHasFocus(true);
        handleChange();
    };

    const handleBlur = (e: React.FocusEvent) => {
        setHasFocus(false);
        handleChange();
        onBlur && onBlur(e);
    };

    const plugins: EditorPlugin[] = [
        //    new WatermarkPlugin("Type something here...", {
        //     fontFamily: "Arial",
        //     fontSize: "12px",
        //     textColor: "#c0c0c0",
        //    })
    ]

    React.useEffect(() => {
        if (editorDiv.current) {
            const defaultEditor = defaultEditorCreator(editorDiv.current!, {
                initialModel: createModelFromHtml(props.value || ""),
                plugins: plugins,
                
            });

            // attach event to default editor
            const domEvent: Record<string, DOMEventRecord> = {
                input: {
                    pluginEventType: "input",
                    beforeDispatch: () => {
                        if (editor?.current) {
                            try {
                                if (!editor?.current?.isDisposed()) {
                                    setInternalValue(() => exportContent(editor.current!));
                                }
                            } catch (error) {
                                // console.error("Error in handleChange", error);
                            }
                        }
                    }
                },
            }
            defaultEditor.attachDomEvent(domEvent);
            editor.current = defaultEditor;
            if (focusOnInit) {
                defaultEditor?.focus();
            }
        }

        return () => {
            if (!editor?.current?.isDisposed()) {
                editor?.current?.dispose();
                editor.current = null;
            }
        };
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    // if value changes, update the editor
    React.useEffect(() => {
        if (editor.current && value !== undefined && value !== null) {
            const newModel = createModelFromHtml(value);
            editor.current.formatContentModel(model => {
                if (value !== internalValue) {
                    model.blocks = newModel.blocks;
                    setInternalValue(value);
                    return true;
                }
                return false
            });
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, editor]);

    const showPlaceholder = React.useMemo(() => {
        return (!internalValue || internalValue === "<br>" || internalValue === "<div><br></div>");
    }, [internalValue]);

    const showRibbonAll = showRibbon && !disabled && !readOnly; 

    const styles = useEditorStyle();
    return (
        <div className={mergeClasses(styles.root, hasFocus && styles.rootFocused, fieldProps['aria-invalid'] && !hasFocus && styles.invalid)}>
            <Show when={!!editor && showRibbonAll && ribbonPosition === "top"}>
                <div className={mergeClasses(styles[ribbonPosition])} >
                    <FluentEditorRibbon editor={editor.current!} value={internalValue} handleChange={handleChange} />
                </div>
            </Show>
            <div
                {...textareaProps as unknown as React.HTMLAttributes<HTMLDivElement>}
                {...fieldProps}
                id={id}
                ref={editorDiv}
                tabIndex={0}
                className={mergeClasses(styles.editor, styles[size])}
                onBlur={handleBlur}
                onFocus={handleFocus}
                data-placeholder={!showPlaceholder || hasFocus ? "" : textareaProps.placeholder}
                contentEditable={!disabled && !readOnly}
            />
            <Show when={!!editor && showRibbonAll && ribbonPosition === "bottom"}>
                <div className={mergeClasses(styles[ribbonPosition])}>
                    <FluentEditorRibbon editor={editor.current!} value={internalValue} handleChange={handleChange} />
                </div>
            </Show>
        </div>
    );
});