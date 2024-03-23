import { Checkbox } from "@fluentui/react-components";
import { Row, RowData } from "@tanstack/react-table";

type SelectRowCheckboxProps<TData extends RowData> = {
    row: Row<TData>;
}

export const SelectRowCheckbox = <TData extends RowData>({ row }: SelectRowCheckboxProps<TData>) => {
    const canCheck = row.getCanSelect();
    const isChecked = row.getIsSomeSelected() ? 'mixed' : (row.getIsSelected() || row.getIsAllSubRowsSelected());
    return (
        <Checkbox
            checked={isChecked}
            disabled={!canCheck}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select Row"
        />
    );
}