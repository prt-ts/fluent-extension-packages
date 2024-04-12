import * as React from "react";
import { useFormContext } from "../Form/useFormContext";
import { useInputStyles } from "./useStyles";
import { For, Show } from "@prt-ts/react-control-flow";
import { Controller } from "react-hook-form";
import { Dropdown, Option, Tooltip, tokens } from "@fluentui/react-components";
import { ChevronDown20Regular, ErrorCircle20Regular } from "@fluentui/react-icons";

type DropdownEditableCellProps ={
    name: string; 
    defaultValue?: string;
    options: string[];
    placeholder?: string;
}

export const GridDropdownCell: React.FC<DropdownEditableCellProps> = ({ name, defaultValue, placeholder, options }) => {
    const {
        form: { control, getFieldState }
    } = useFormContext();

    const [isEditMode, setIsEditMode] = React.useState(false);
    const dropdownRef = React.useRef<HTMLButtonElement>(null);

    const switchToEditMode = React.useCallback(() => {
        setIsEditMode(true);
        setTimeout(() => {
            dropdownRef.current?.focus();
        }, 0);
    }, []);

    const styles = useInputStyles();

    const fieldState = getFieldState(name); 
    const error = fieldState?.error?.message; 
    const errorContent = React.useMemo(() => {
        if (error) {
            return (<Tooltip content={error} relationship="description">
                <ErrorCircle20Regular primaryFill={tokens.colorPaletteRedBackground3} />
            </Tooltip>)
        }
        return null;
    }, [error]);

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>
            <Show when={defaultValue}>{defaultValue}</Show>
            <Show when={!defaultValue}><span className={styles.placeholder}>{placeholder}</span></Show>
            <Show when={error} fallback={<ChevronDown20Regular primaryFill={tokens.colorNeutralForegroundDisabled}/>}>
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
                    <Dropdown 
                        ref={dropdownRef}
                        name={name}
                        onOptionSelect={(_, data) => {
                            onChange(data.optionValue);
                            // trigger(name);
                        }} 
                        onBlur={() => {
                            onBlur();
                            onChange(value);
                            setIsEditMode(false);
                            // trigger(name); 
                        }} 
                        defaultSelectedOptions={[value] || []}
                        defaultValue={value || ''}
                        defaultOpen={true} 
                        appearance='filled-lighter'
                        className={styles.cell}
                        placeholder={placeholder}
                        expandIcon={errorContent ? errorContent: <ChevronDown20Regular />}
                    >
                        <For each={options || []}>
                            {(option, index) => (
                                <Option key={`${name}_${index}`} value={option}>{option}</Option>
                            )}
                        </For>
                    </Dropdown>
                )
            }}
        />)
};