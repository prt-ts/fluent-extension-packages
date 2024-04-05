import { Popover, PopoverTrigger, Button, PopoverSurface, Input, tokens } from '@fluentui/react-components';
import { TableRegular } from '@fluentui/react-icons';
import React from 'react';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { insertTable } from 'roosterjs-content-model-api';

export interface InsertTableButtonProps {
    editor: IEditor;
    handleChange: () => void;
}

export const InsertTableButton: React.FC<InsertTableButtonProps> = ({ editor, handleChange }) => {

    const [rows, setRows] = React.useState(5);
    const [cols, setCols] = React.useState(5);

    const styles = useIconStyles();
    return (
        <Popover>
            <PopoverTrigger disableButtonEnhancement>
                <Button
                    aria-label="Code Block"
                    icon={<TableRegular className={styles.icon} />}
                    name="additionalFormat"
                    value={"code"}

                    size="small"
                />
            </PopoverTrigger>

            <PopoverSurface tabIndex={-1}>
                <div style={{ display: "flex", gap: tokens.spacingHorizontalS }}>
                    <Input value={`${rows}`} onChange={(e) => setRows(+e.target.value ?? 0)} />
                    <Input value={`${cols}`} onChange={(e) => setCols(+e.target.value ?? 0)} />
                    <Button
                        onClick={() => {
                            insertTable(editor, cols, rows);
                            handleChange?.();
                        }}
                        size='small'
                    >
                        Insert ({cols}x{rows}) Table
                    </Button>
                </div>
            </PopoverSurface>
        </Popover>

    );
};