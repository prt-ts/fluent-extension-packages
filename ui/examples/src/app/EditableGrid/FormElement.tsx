import { Dropdown, Option, Input, makeStyles, shorthands } from '@fluentui/react-components';
import { useFormContext } from '@prt-ts/fluent-react-hook-form';
import { TableType } from '@prt-ts/fluent-react-table-v2';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Person } from '../data/data';

interface FormElementProps {
    name: string;
    value?: string;
    table: TableType<Person>;
    rowId: number;
    columnId: string;
}

const useInputStyles = makeStyles({
    cell: {
        minWidth: "30px",
        width: "100%",
    },
    placeholderDiv: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        ...shorthands.padding("5px", "10px")
    }
});


export const GridInputCell: React.FC<FormElementProps> = ({ name, value, rowId, columnId, table }) => {
    const {
        form: { control }
    } = useFormContext();

    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const switchToEditMode = () => {
        setIsEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }

    const styles = useInputStyles();

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>{value}
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
                        onChange={(_, data) => {
                            onChange(data.value);
                        }}
                        onFocus={e=>e.target.select()}
                        onBlur={() => {
                            onBlur();
                            setIsEditMode(false);
                            table.options.meta?.updateData(+rowId, columnId, value)
                        }}
                        value={value || ''}
                        required={false}
                        appearance='filled-lighter'
                        className={styles.cell}
                    />
                )
            }}
        />)
};

export const GridDropdownCell: React.FC<FormElementProps> = ({ name, value, rowId, columnId, table }) => {
    const {
        form: { control }
    } = useFormContext();

    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef<HTMLButtonElement>(null);

    const switchToEditMode = React.useCallback(() => {
        setIsEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }, []);

    const styles = useInputStyles();

    if (!isEditMode) {
        return (<div
            className={styles.placeholderDiv}
            tabIndex={0}
            onFocus={switchToEditMode}
            onSelect={switchToEditMode}
            onClick={switchToEditMode}>{value}
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
                    <Dropdown 
                        ref={inputRef}
                        name={name}
                        onOptionSelect={(_, data) => {
                            onChange(data.optionValue);
                        }} 
                        onBlur={() => {
                            onBlur();
                            setIsEditMode(false);
                            table.options.meta?.updateData(+rowId, columnId, value || '')
                        }}
                        selectedOptions={[value] || []}
                        value={value || ''} 
                        appearance='filled-lighter'
                        className={styles.cell}
                    >
                        <Option key='1' value={value}>{value}</Option>
                        <Option key='2' value='2'>2</Option>
                        <Option key='3' value='3'>3</Option>
                    </Dropdown>
                )
            }}
        />)
};
