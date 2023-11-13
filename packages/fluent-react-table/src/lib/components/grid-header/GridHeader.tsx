import { Popover, PopoverTrigger, Button, PopoverSurface, MenuGroupHeader, Checkbox, Divider, Input, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';
import * as React from 'react';
import { ClearFilterIcon, ToggleGroupColumnIcon, ToggleSelectColumnIcon } from '../icon-components/GridIcons';
import { useGridHeaderStyles } from './useGridHeaderStyles';
import { Table } from '@tanstack/react-table';
import { FilterFilled } from '@fluentui/react-icons';
import {
    Search24Regular,
  } from "@fluentui/react-icons";

type GridHeaderProps<TItem extends object> = {
    table: Table<TItem>,
    gridTitle: JSX.Element | React.ReactNode,
    globalFilter: string,
    setGlobalFilter: (value: string) => void,
}

export const GridHeader = <TItem extends object>(props: GridHeaderProps<TItem>) => {
    const { table, gridTitle, globalFilter, setGlobalFilter } = props; 
    const styles = useGridHeaderStyles(); 

    const allLeafColumns = table.getAllLeafColumns() || [];
    
    const resetAllFilters = React.useCallback(() => {
        table.setGlobalFilter("");
        table.resetColumnFilters();
    }, [table]);

    const resetAllGrouping = React.useCallback(() => {
        table.resetGrouping();
    }, [table]);

    const clearAllSelection = React.useCallback(() => {
        table.toggleAllRowsSelected(false);
    }, [table]);

    return (
        <div className={styles.tableTopHeaderContainer}>
            <div className={styles.tableTopHeaderLeft}>{gridTitle}</div>
            <div className={styles.tableTopHeaderRight}>
                <Popover withArrow>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button icon={<ToggleGroupColumnIcon />} aria-label='Toggle Group Column' />
                    </PopoverTrigger>

                    <PopoverSurface>
                        <div className={styles.tableTopHeaderColumnTogglePopover}>
                            <MenuGroupHeader>Group Columns</MenuGroupHeader>
                            {allLeafColumns.map((column) => {
                                if (column.id === "select") return null;
                                if (column.id === "id") return null;
                                return (
                                    <Checkbox
                                        key={column.id}
                                        checked={column.getIsGrouped()}
                                        onChange={column.getToggleGroupingHandler()}
                                        disabled={!column.getCanGroup()}
                                        label={column.id}
                                    />
                                );
                            })}
                        </div>
                    </PopoverSurface>
                </Popover>
                <Popover withArrow>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button icon={<ToggleSelectColumnIcon />} aria-label='Toggle Column Visibility'/>
                    </PopoverTrigger>

                    <PopoverSurface>
                        <div className={styles.tableTopHeaderColumnTogglePopover}>
                            <MenuGroupHeader>Toggle Columns</MenuGroupHeader>
                            <Checkbox
                                checked={table.getIsAllColumnsVisible()}
                                onChange={table.getToggleAllColumnsVisibilityHandler()}
                                label={"Toggle All"}
                            />
                            <Divider />
                            {table.getAllLeafColumns().map((column) => {
                                if (column.id === "select") return null;
                                if (column.id === "id") return null;

                                return (
                                    <Checkbox
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}
                                        label={column.id}
                                        disabled={!column.getCanHide()}
                                    />
                                );
                            })}
                        </div>
                    </PopoverSurface>
                </Popover>
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="p-2 font-lg shadow border border-block"
                    placeholder="Search all columns..."
                    resetAllFilters={resetAllFilters}
                    resetAllGrouping={resetAllGrouping} 
                    clearAllSelection={clearAllSelection}
                />
            </div>
        </div>
    );
}

// A debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    resetAllFilters,
    resetAllGrouping,
    clearAllSelection,
}: { 
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
    resetAllFilters: () => void;
    resetAllGrouping: () => void;
    clearAllSelection: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = React.useState<string | number>("");

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, onChange, debounce]);

    return (
        <Input
            placeholder="Search Keyword"
            value={value as string}
            onChange={(_, data) => setValue(data.value)}
            type="search"
            autoComplete="off"
            contentBefore={<Search24Regular />}
            style={{ width: "300px" }}
            contentAfter={<>
            <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button appearance="subtle" icon={<FilterFilled />} aria-label="View Menu"/>
                  </MenuTrigger>

                  <MenuPopover>
                    <MenuList>
                      <MenuItem icon={<ClearFilterIcon />} onClick={resetAllFilters}>
                        Clear All Filters
                      </MenuItem> 
                      <MenuItem icon={<ClearFilterIcon />} onClick={resetAllGrouping}>
                        Clear All Grouping
                      </MenuItem> 
                      <MenuItem icon={<ClearFilterIcon />} onClick={clearAllSelection}>
                        Clear All Selection
                      </MenuItem> 
                    </MenuList>
                  </MenuPopover>
                </Menu>
            </>}
        />
    );
}
