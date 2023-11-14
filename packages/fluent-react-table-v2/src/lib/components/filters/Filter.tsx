import { Column, Table } from "@tanstack/react-table"
import { FilterMultiSelectCheckbox } from "./FilterMultiSelectCheckbox"
import { Input, makeStyles, shorthands } from "@fluentui/react-components"
import { FilterMultiSelectRadio } from "./FilterMultiSelectRadio"

const useFilterStyles = makeStyles({
    root: {
        ...shorthands.padding("10px"),
        width: "100%"
    },

    defaultInput : {
        ...shorthands.padding("10px"),
        width: "100%"
    }

});

export const Filter = <TItem extends object>({
    column,
    table
}: {
    column: Column<TItem, unknown>
    table: Table<TItem>
}) => {
    const sortFunctionName = column.getFilterFn()?.name || "arrIncludesSome";
    const styles = useFilterStyles();

    switch (sortFunctionName) {

        case "arrIncludesSome":
            return (
                <FilterMultiSelectCheckbox column={column} table={table}/>
            )
        case "arrIncludesAll":
            return (
                <FilterMultiSelectRadio column={column} table={table}/>
            )
        case "arrIncludes":
            return (
                <FilterMultiSelectRadio column={column} table={table}/>
            )
    }

    return (
        <div className={styles.root}>
            <Input
                type="search"
                value={(column.getFilterValue() || "") as string}
                onChange={(_, data) => {
                    column.setFilterValue(data.value)
                }}
                placeholder="Search..."
                size="small"
                className={styles.defaultInput}
            />
        </div>
    )
} 