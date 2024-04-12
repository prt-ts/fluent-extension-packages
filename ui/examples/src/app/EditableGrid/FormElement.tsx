import { Dropdown, Option, Input, makeStyles, shorthands, useRestoreFocusSource, useRestoreFocusTarget, tokens } from '@fluentui/react-components';
import { useFormContext } from '@prt-ts/fluent-react-hook-form'; 
import React from 'react';
import { Controller } from 'react-hook-form';  
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import { For, Show } from '@prt-ts/react-control-flow';

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
        boxShadow: tokens.shadow2,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),

        ":hover": {
            backgroundColor: tokens.colorNeutralBackground1,
        }
        
    },
    placeholder: {
        color: tokens.colorNeutralForeground4,
    }
    
});


export const GridInputCell: React.FC<FormElementProps> = ({ name, defaultValue }) => {
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

    const styles = useInputStyles();

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>
                {defaultValue}
        </div>)
    }

    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value } = field;
                console.log(name, value)
                return (
                    <Input
                        ref={inputRef}
                        name={name} 
                        onFocus={e=>e.target.select()}
                        onBlur={() => {
                            onBlur();
                            setIsEditMode(false);
                            const value = inputRef.current?.value;
                            onChange(value); 
                        }}
                        defaultValue={value || ''}
                        required={false}
                        appearance='filled-lighter'
                        className={styles.cell}
                        input={{
                            className: styles.cell                        
                        }}
                    />
                )
            }}
        />)
};

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

type DropdownEditableCellProps ={
    name: string; 
    defaultValue?: string;
    options: string[];
    placeholder?: string;
}

export const GridDropdownCell: React.FC<DropdownEditableCellProps> = ({ name, defaultValue, placeholder, options }) => {
    const {
        form: { control }
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

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>
            <Show when={defaultValue}>{defaultValue}</Show>
            <Show when={!defaultValue}><span className={styles.placeholder}>{placeholder}</span></Show>
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
                        }} 
                        onBlur={() => {
                            onBlur();
                            setIsEditMode(false); 
                        }} 
                        defaultSelectedOptions={[value] || []}
                        defaultValue={value || ''}
                        defaultOpen={true} 
                        appearance='filled-lighter'
                        className={styles.cell}
                        placeholder={placeholder}
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
