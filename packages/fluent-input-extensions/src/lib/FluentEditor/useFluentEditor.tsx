import * as React from "react";
import { FluentEditorProps } from "./FluentEditorTypes";
import { FieldControlProps, TextareaProps, useId } from "@fluentui/react-components";
import { DOMEventRecord, EditorOptions, EditorPlugin, IEditor } from "roosterjs-content-model-types";
import { Editor, createModelFromHtml, exportContent } from "roosterjs-content-model-core";


function defaultEditorCreator(div: HTMLDivElement, options: EditorOptions): IEditor {
    return new Editor(div, options);
}

export function useFluentEditor(props: FluentEditorProps, ref: React.ForwardedRef<HTMLDivElement>) {

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

    /* eslint-disable-next-line */
    React.useImperativeHandle(ref, () => editorDiv.current!);

    const handleChange = () => {
        if (editor?.current) {
            try {
                if (!editor?.current?.isDisposed()) {
                    let newValue = exportContent(editor.current);
                    if (newValue === "<br>" || newValue === "<div><br></div>") {
                        newValue = "";
                    }
                    onChange && onChange?.(newValue);
                    setInternalValue(newValue);
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
            const defaultEditor = defaultEditorCreator(editorDiv.current, {
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
                                    setInternalValue(() => exportContent(editor.current as IEditor));
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

    return { 
        id,
        editorDiv,
        textareaProps,
        fieldProps,
        showPlaceholder,
        hasFocus,
        handleChange,
        handleFocus,
        handleBlur,
        showRibbonAll,
        ribbonPosition,
        size,
        editor,
        internalValue,
        setInternalValue,
        defaultEditorCreator,
        plugins,
        focusOnInit,
        disabled,
        readOnly,
        ...rest
    } as const;
}