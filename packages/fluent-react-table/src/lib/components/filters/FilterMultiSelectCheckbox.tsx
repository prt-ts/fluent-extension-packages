import { Checkbox, Input, makeStyles } from "@fluentui/react-components"
import { Column, Table } from "@tanstack/react-table"
import * as React from "react"
import { useVirtual } from "react-virtual"

const useCheckboxFilterStyles = makeStyles({
    searchInput: {
        width: "90%",
        marginBottom: "8px",
        marginLeft: "10px",
        marginRight: "10px"
    }
})

export const FilterMultiSelectCheckbox = <TItem extends object>({
    column,
    table
}: {
    column: Column<TItem, unknown>,
    table: Table<TItem>

}) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)
    const columnFilterValue = column.getFilterValue() as string[];
    const [filterOptions, setFilterOptions] = React.useState<string[]>([]);
    React.useEffect(() => {
        const uniqueSortedOptions = typeof firstValue === "number" || !isNaN(firstValue as number) ?
            Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) => Number(a) - Number(b))
            : Array.from(column.getFacetedUniqueValues().keys()).sort()
        setFilterOptions(uniqueSortedOptions)
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [column.getFacetedUniqueValues()])

    const [localColumnFilterValue, setLocalColumnFilterValue] = React.useState<string>("");
    const filterOptionsFiltered = React.useMemo(() => {
        if (!localColumnFilterValue) return filterOptions;
        return filterOptions.filter(option => option.toLowerCase().includes(localColumnFilterValue.toLowerCase()));
    }, [localColumnFilterValue, filterOptions])

    const filterContainer = React.useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtual({
        parentRef: filterContainer,
        size: filterOptionsFiltered.length,
        overscan: 15,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;
 
    const allOptionChecked = columnFilterValue?.length > 0 && columnFilterValue?.length !== filterOptions?.length ? "mixed" : columnFilterValue?.length === filterOptions?.length && filterOptions?.length > 0;

    const styles = useCheckboxFilterStyles();

    return (
        <div>
            <Input 
                value={localColumnFilterValue} 
                onChange={(e, data) => setLocalColumnFilterValue(data.value)} 
                placeholder="Search Options..." 
                size="small"
                className={styles.searchInput}/>
            <div
                key={"filter-multi-select-checkbox"}
                ref={filterContainer}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "300px",
                    width: "100%",
                    overflow: "auto"
                }}>
                {paddingTop > 0 && <span style={{ paddingTop: `${paddingTop}px` }} ></span>}
                <Checkbox
                    key={`toggle-all-${column.id}`}
                    checked={allOptionChecked}
                    onChange={() => {
                        if (columnFilterValue?.length > 0) {
                            column.setFilterValue(undefined)
                            return;
                        }
                        column.setFilterValue([...filterOptions])
                    }}
                    label={"(Toggle All)"}

                />
                {
                    virtualRows.map((row) => {
                        const value = `${filterOptionsFiltered[row.index]}`;
                        return (
                            <Checkbox
                                key={`${column.id}-${row.index}`}
                                checked={columnFilterValue?.includes(value) ?? false}
                                onChange={() => {
                                    if (columnFilterValue?.includes(value)) {
                                        column.setFilterValue((old: string[]) => old?.filter(v => v !== value))
                                        return;
                                    }
                                    column.setFilterValue((old: string[]) => [...(old || []), value])
                                }}
                                label={value}
                            />)
                    })
                }
                {paddingBottom > 0 && <span style={{ paddingBottom: `${paddingBottom}px` }}></span>}
            </div>
        </div>
    )
} 