import * as React from "react";
import { useFormContext } from "../Form/useFormContext";
import { useInputStyles } from "./useStyles";
import { Controller } from "react-hook-form";
import { Button, Input, Tooltip, tokens } from "@fluentui/react-components";
import { Show } from "@prt-ts/react-control-flow";
import { ErrorCircleRegular } from "@fluentui/react-icons";

interface GridInputCellProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

export const GridInputCell: React.FC<GridInputCellProps> = ({ name, defaultValue, placeholder }) => {
    const {
        form: { control, getFieldState }
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

    const fieldState = getFieldState(name); 
    const error = fieldState?.error?.message;

    const errorContent = React.useMemo(() => {
        if (error) {
            return (<Tooltip content={error} relationship="description">
                <Button tabIndex={-1} icon={<ErrorCircleRegular primaryFill={tokens.colorPaletteRedBackground3} />} appearance="transparent" />
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
            onClick={switchToEditMode}
        >
            <Show when={defaultValue}>{defaultValue}</Show>
            <Show when={!defaultValue}><span className={styles.placeholder}>{placeholder}</span></Show>
            <Show when={error}>
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
                            const value = inputRef.current?.value;
                            onChange(value, { shouldValidate: true });
                            // trigger(name);
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