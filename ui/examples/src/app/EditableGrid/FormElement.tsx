import { makeStyles, shorthands, useRestoreFocusSource, useRestoreFocusTarget, tokens } from '@fluentui/react-components';
import { useFormContext } from '@prt-ts/fluent-react-hook-form'; 
import React from 'react';
import { Controller } from 'react-hook-form';  
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';

interface FormElementProps {
    name: string; 
    defaultValue?: string;
}

const useInputStyles = makeStyles({
    cell: {
        minWidth: "30px",
        width: "100%",
        maxWidth: "400px",
    },
    placeholderDiv: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        ...shorthands.padding("5px", "10px"),
        // boxShadow: tokens.shadow2,
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),

        ":hover": {
            backgroundColor: tokens.colorNeutralBackground2,
        }
        
    },
    placeholder: {
        color: tokens.colorNeutralForeground4,
    }
    
});

export const GridDatePickerCell: React.FC<FormElementProps> = ({ name, defaultValue }) => {
    const {
        form: { control }
    } = useFormContext();
 
    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const focusSourceAttribute = useRestoreFocusSource();
    const focusTargetAttribute = useRestoreFocusTarget();

    const switchToEditMode = () => {
        setIsEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const styles = useInputStyles();

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}
            {...focusTargetAttribute}
            >
                {defaultValue}            
        </div>)
    }

    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value, ref } = field;

                const handleOnChange: DatePickerProps["onSelectDate"] = (date: Date | null | undefined) => {
                    onChange(date || "");
                    // table.options.meta?.updateData(+rowId, columnId, value);
                    setIsEditMode(false);
                }

                const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
                    onBlur();
                    // table.options.meta?.updateData(+rowId, columnId, value);
                    setIsEditMode(false);
                }

                return (
                    <DatePicker
                        ref={ref}
                        name={name}
                        onSelectDate={handleOnChange}
                        onOpenChange={(open) => setIsEditMode(open)}
                        onBlur={handleOnBlur}
                        value={value || ""}
                        defaultOpen={true}
                        required={false}
                        className={styles.cell}
                        allowTextInput
                        showMonthPickerAsOverlay
                        input={{
                           className: styles.cell 
                        }}
                        {...focusSourceAttribute}
                        placeholder='Select a date'
                    />
                )
            }}
        />)
};