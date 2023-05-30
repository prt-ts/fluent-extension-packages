import { Menu, MenuCheckedValueChangeData, Tooltip, MenuTrigger, Button, MenuPopover, MenuList, MenuGroup, MenuGroupHeader, MenuDivider, MenuItemCheckbox, makeStyles } from "@fluentui/react-components";
import * as React from "react";
import { DragIcon, ToggleColumnIcon } from "../Icons";
import { IColumn } from "../../types";
import { useDragDropFeature } from "../../hooks";


export function GroupColumns<TITem extends { id: number | string }>({
    groupedColumns = [],
    columns = [],
    resetGroupColumns,    
}: {
    groupedColumns: string[],
    columns: IColumn<TITem>[],
    resetGroupColumns: (groupColumns: string[]) => void
}) {

    const groupedSelectedColumns = React.useMemo<Record<string, string[]>>(() => ({ groupedColumns: groupedColumns }), [groupedColumns]);

    const handleDragGroupItem = React.useCallback((newColOrders: string[]) => {

        const orderedGroupedCols = groupedColumns?.sort((first, second) => (newColOrders?.indexOf(first) - newColOrders.indexOf(second)))
        resetGroupColumns([...orderedGroupedCols]);

    }, [groupedColumns])

    const {
        dragStart,
        dragEnter,
        drop
    } = useDragDropFeature<string>(columns?.map(x => x.columnId as string), (sortedItems: string[]) => {
        console.log(sortedItems)
        handleDragGroupItem(sortedItems);
    })

    const styles = useGroupStyles()

    return (<Menu
        checkedValues={groupedSelectedColumns}
        onCheckedValueChange={(_, data: MenuCheckedValueChangeData) => resetGroupColumns(data.checkedItems)}>

        <Tooltip content="Show/Hide Grid Columns" relationship="description">
            <MenuTrigger disableButtonEnhancement>
                <Button appearance="outline" icon={<ToggleColumnIcon />} />
            </MenuTrigger>
        </Tooltip>
        <MenuPopover>
            <MenuList>
                <MenuGroup key={"table-group-by-cols"}>
                    <MenuGroupHeader key={"table-group-by-cols-label"}>Group Items</MenuGroupHeader>
                    <MenuDivider key={"table-group-by-cols-divider"} />
                    {
                        columns && columns?.sort(function (a, b) {
                            return (groupedColumns?.indexOf(a.columnId as string) === -1 && groupedColumns?.indexOf(b.columnId as string) === -1) 
                                ? 0 
                                : (groupedColumns?.indexOf(a.columnId as string) - groupedColumns?.indexOf(b.columnId as string));
                        })?.map((col, index) => (
                            <MenuItemCheckbox
                                key={index}
                                name={"groupedColumns"}
                                value={col.columnId as string}

                                secondaryContent={groupedColumns?.includes(col.columnId as string) ? <DragIcon className={styles.draggableIcon} /> : <></>}

                                className={styles.draggableItem}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                draggable
                            >
                                {col.renderHeaderCell()}
                            </MenuItemCheckbox>))
                    }
                </MenuGroup>
            </MenuList>
        </MenuPopover>
    </Menu>)
}

export const useGroupStyles = makeStyles({
    draggableIcon: {
        cursor: "move",
    },

    draggableItem: {

    }
})