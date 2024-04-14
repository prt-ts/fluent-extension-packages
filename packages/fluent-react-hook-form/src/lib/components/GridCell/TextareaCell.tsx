import * as React from "react";
import { useFormContext } from "../Form/useFormContext";
import { useInputStyles } from "./useStyles";
import { Controller } from "react-hook-form";
import { Textarea, Tooltip, mergeClasses } from "@fluentui/react-components";
import { Show } from "@prt-ts/react-control-flow";
import { useGetErrorContent } from "./useGetErrorContent";

interface GridTextareaCellProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
    rows?: number;
}

export const GridTextareaCell: React.FC<GridTextareaCellProps> = ({ name, rows, defaultValue, placeholder }) => {
    const {
        form: { control }
    } = useFormContext();

    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const switchToEditMode = () => {
        setIsEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const {
        errorContent,
        hasError
    } = useGetErrorContent(name);
    const styles = useInputStyles();

    if (!isEditMode) {
        return (<div
            className={mergeClasses(styles.placeholderDiv, hasError && styles.highlightError)}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}
        >
            <Show when={defaultValue}>
                <Tooltip content={defaultValue || ""} relationship="description">
                    <span className={styles.truncatedText}>{defaultValue}</span>
                </Tooltip>
            </Show>
            <Show when={!defaultValue}><span className={styles.placeholder}>{placeholder}</span></Show>
            <Show when={hasError}>
                {errorContent}
            </Show>
        </div>)
    }

    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => {
                const { onChange, onBlur, value } = field;
                return (
                    <Textarea
                        ref={inputRef}
                        name={name}
                        onBlur={() => { 
                            setIsEditMode(false);
                            const value = inputRef.current?.textLength ? inputRef.current.value : null;
                            onChange(value); 
                            onBlur();
                        }}
                        defaultValue={value || ''}
                        required={false}
                        appearance='filled-lighter'
                        className={styles.cell}
                        textarea={{
                            className: styles.cell
                        }}
                        placeholder={placeholder}
                        rows={rows}
                    />
                )
            }}
        />)
};