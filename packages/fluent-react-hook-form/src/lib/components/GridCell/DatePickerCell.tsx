import * as React from "react";
import { Show } from "@prt-ts/react-control-flow";
import { useGetErrorContent } from "./useGetErrorContent";
import { useInputStyles } from "./useStyles";
import { Calendar20Regular } from "@fluentui/react-icons";
import { tokens } from "@fluentui/react-components";
import { useFormContext } from "../Form/useFormContext";
import { Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "@fluentui/react-datepicker-compat";

type DatePickerCellProps = {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

export const GridDatePickerCell: React.FC<DatePickerCellProps> = ({ name, defaultValue, placeholder }) => {
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
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>
            <Show when={defaultValue}>{defaultValue}</Show>
            <Show when={!defaultValue}><span className={styles.placeholder}>{placeholder}</span></Show>
            <Show when={hasError} fallback={<Calendar20Regular primaryFill={tokens.colorNeutralForegroundDisabled} />}>
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
                const { onChange, value } = field;

                const handleOnChange: DatePickerProps["onSelectDate"] = (date: Date | null | undefined) => {
                    onChange(date || "");
                    // table.options.meta?.updateData(+rowId, columnId, value);
                    setIsEditMode(false);
                }

                return (
                    <DatePicker
                        ref={inputRef}
                        name={name}
                        onSelectDate={handleOnChange}
                        onOpenChange={(open) => setIsEditMode(open)} 
                        value={value || ""}
                        defaultOpen={true}
                        required={false}
                        className={styles.cell} 
                        showMonthPickerAsOverlay
                        input={{
                           className: styles.cell 
                         }} 
                        placeholder={placeholder}
                        contentAfter={hasError ? errorContent : undefined}
                    />
                )
            }}
        />)
};