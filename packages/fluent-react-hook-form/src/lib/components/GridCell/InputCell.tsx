import * as React from "react";
import { useFormContext } from "../Form/useFormContext";
import { useInputStyles } from "./useStyles";
import { Controller } from "react-hook-form";
import { Input, mergeClasses } from "@fluentui/react-components";
import { Show } from "@prt-ts/react-control-flow";
import { useGetErrorContent } from "./useGetErrorContent";

interface GridInputCellProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

export const GridInputCell: React.FC<GridInputCellProps> = ({ name, defaultValue, placeholder }) => {
    const {
        form: { control }
    } = useFormContext();

    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

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
            <Show when={defaultValue}>{defaultValue}</Show>
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
                    <Input
                        ref={inputRef}
                        name={name}
                        onFocus={e => e.target.select()}
                        onBlur={() => {
                            onBlur();
                            setIsEditMode(false);
                            const value = inputRef.current?.value?.length ? inputRef.current?.value : null;
                            onChange(value, { shouldValidate: true }); 
                        }}
                        defaultValue={value || ''}
                        required={false}
                        appearance='filled-lighter'
                        className={styles.cell}
                        input={{
                            className: styles.cell
                        }}
                        placeholder={placeholder}
                        contentAfter={errorContent}
                    />
                )
            }}
        />)
};