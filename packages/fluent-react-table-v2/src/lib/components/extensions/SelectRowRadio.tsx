import { Radio } from "@fluentui/react-components";
import { Row, RowData } from "@tanstack/react-table";

type SelectRowRadioProps<TData extends RowData> = {
    row: Row<TData>;
}

export const SelectRowRadio = <TData extends RowData>({ row }: SelectRowRadioProps<TData>) => {
    const canCheck = row.getCanSelect();
    const isChecked = row.getIsSelected();
    return (
        <Radio
            checked={isChecked}
            disabled={!canCheck}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select Row"
        />
    );
}