import * as React from 'react';
import { TableProps, TableView } from "../../types";
import { Button, Caption1Stronger, Checkbox, Divider, Field, Input, MenuItemRadio, MenuList } from '@fluentui/react-components';
import { TableState } from '@tanstack/react-table';
import { Save20Filled } from '@fluentui/react-icons';

type ViewSaveFormProps<TItem extends object> = {
    mode: 'create' | 'edit';
    onSave: TableProps<TItem>['onTableViewSave']
    getTableState: () => Partial<TableState>;
};
export const ViewSaveForm = <TItem extends object>(props: ViewSaveFormProps<TItem>) => {

    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    if (!isFormOpen) {
        return (<>
            <MenuList>
                <MenuItemRadio name='view-manager' value='View Manager' onClick={() => setIsFormOpen(true)} icon={<Save20Filled />}>Save Current View</MenuItemRadio>
            </MenuList>
            <Divider />
        </>);
    }

    return (
        <div style={{
            boxSizing: 'border-box',
            padding: '0.4rem',
            border: '1px solid #ccc',
            marginBottom: '0.5rem'
        }}>
            <Caption1Stronger>Enter View Details</Caption1Stronger>
            <Field
                label="View Name"
                validationMessage={errorMessage}
                validationState={errorMessage ? "error" : undefined}
                hint={<>Give your view a name and save it.</>}>
                <Input ref={inputRef} placeholder="View Name" />
            </Field>
            <Field hint={<>Global view is accessible to everybody in the system.</>}>
                <Checkbox ref={checkboxRef} label="Set as global view" />
            </Field>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap', 
                gap: '0.5rem'
            }}>
            <Button onClick={() => {
                setIsFormOpen(false);
                setErrorMessage('');
            }}>Cancel</Button>
            <Button
                appearance='primary'
                onClick={() => {
                    if (!inputRef.current?.value) {
                        setErrorMessage('View name is required');
                        return;
                    }

                    const viewName = inputRef.current.value;
                    const isGlobal = checkboxRef.current?.checked;

                    const tableView: TableView = {
                        id: Math.random() * 100,
                        viewName: viewName,
                        tableState: props.getTableState(),
                        isGlobal: isGlobal,
                        isViewOwner: true
                    };

                    props?.onSave?.(tableView);

                    setErrorMessage('');
                    setIsFormOpen(false);
                }}>Save</Button>
                </div>
        </div>
    );

}