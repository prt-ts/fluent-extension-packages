import {
    Skeleton,
    SkeletonItem,
} from "@fluentui/react-components"; 
import { Column, RowData, Table } from "@tanstack/react-table";
import { For, Show } from "@prt-ts/react-control-flow";
import { useLoadingStyles } from "./useLoadingStyles";

type LoadingProps<TItem extends RowData> = {
    numberOfItems?: number,
    visibleColumns: Column<TItem, unknown>[],
    table: Table<TItem>
}

export const Loading = <TItem extends RowData>(props: LoadingProps<TItem>) => {
    const { numberOfItems = 16, visibleColumns, table } = props;
    const selectionMode = table.options.meta?.rowSelectionMode || "none";
    const styles = useLoadingStyles();
    return (
        <div style={{ width: "100%" }}>
            <For each={[...Array(numberOfItems)]}>
                {(rowIndex, index) => {
                    return (
                        <Skeleton key={`${rowIndex}_${index}`} className={styles.row} style={{ width: "100%" }}>
                            <Show when={["single", "multiple"].includes(selectionMode)}>
                                <SkeletonItem key={`${index}_select_row`} shape="circle" size={24} style={{ width: "40px" }}/>
                            </Show>
                            <For each={visibleColumns || []}>
                                {(column, i) => (
                                    <SkeletonItem
                                        key={i}
                                        style={{
                                            minWidth: column.getSize(),
                                            width: "100%"
                                        }}
                                    />
                                )}
                            </For>
                        </Skeleton>
                    )
                }}
            </For>
        </div>
    )
}