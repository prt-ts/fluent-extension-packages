import { Menu, MenuCheckedValueChangeData, Tooltip, MenuTrigger, Button, MenuPopover, MenuList, MenuGroup, MenuGroupHeader, MenuDivider, MenuItemCheckbox, makeStyles, shorthands, tokens, mergeClasses } from "@fluentui/react-components";
import * as React from "react";
import { DragIcon, ToggleSelectColumnIcon } from "../Icons";
import { IColumn } from "../../types";
import { useDragDropFeature } from "../../hooks";

export function SelectColumns<TITem extends { id: number | string }>({
    visibleColumns = [],
    columns = [],
    resetVisibleColumns,
}: {
    visibleColumns: string[],
    columns: IColumn<TITem>[],
    resetVisibleColumns: (visibleColumns: string[]) => void
}) {

    const showHideOptionSelected = React.useMemo<Record<string, string[]>>(() => ({ hiddenCols: visibleColumns }), [visibleColumns]);
    const sortedColumns = React.useMemo<IColumn<TITem>[]>(() => {
        return [...columns]?.sort(function (a, b) {
            return (visibleColumns?.indexOf(a.columnId as string) === -1 && visibleColumns?.indexOf(b.columnId as string) === -1)
                ? 0
                : (visibleColumns?.indexOf(a.columnId as string) - visibleColumns?.indexOf(b.columnId as string));
        })
    }, [visibleColumns, columns]);

    const handleDragColumnItem = React.useCallback((newColOrders: string[]) => {
        const newColumnOrder = visibleColumns?.sort((first, second) => (newColOrders?.indexOf(first) - newColOrders.indexOf(second)))
        resetVisibleColumns([...newColumnOrder]);
    }, [visibleColumns])

    const {
        dragStart,
        dragEnter,
        drop
    } = useDragDropFeature<string>(sortedColumns?.map(sc => sc.columnId as string), (sortedItems: string[]) => {
        handleDragColumnItem(sortedItems);
    })

    const [dragOverElement, setDragOverElement] = React.useState<string>("");
    const styles = useGroupStyles()

    return (
      <Menu
        checkedValues={showHideOptionSelected}
        onCheckedValueChange={(_, data: MenuCheckedValueChangeData) =>
          resetVisibleColumns(data.checkedItems)
        }
      >
        <Tooltip content="Show/Hide Grid Columns" relationship="description">
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="outline" icon={<ToggleSelectColumnIcon />} />
          </MenuTrigger>
        </Tooltip>
        <MenuPopover>
          <MenuList>
            <MenuGroup key={'table-hide-show'}>
              <MenuGroupHeader key={'table-hide-show-label'}>
                Show/Hide Columns
              </MenuGroupHeader>
              <MenuDivider key={'table-hide-show-divider'} />
              {columns &&
                sortedColumns?.map((col, index) => (
                  <MenuItemCheckbox
                    key={index}
                    name={'hiddenCols'}
                    value={col.columnId as string}
                    disabled={col.disableHideShow ? true : false}
                    secondaryContent={
                      visibleColumns?.includes(col.columnId as string) ? (
                        <DragIcon className={styles.draggableIcon} />
                      ) : (
                        <></>
                      )
                    }
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    className={mergeClasses(
                      styles.draggableItem,
                      dragOverElement == col.columnId
                        ? styles.draggingItemOver
                        : undefined
                    )}
                    onDragOver={() => {
                      setDragOverElement(col.columnId as string);
                    }}
                    onDragEnd={(e) => {
                      setDragOverElement('');
                      drop(e);
                    }}
                    draggable
                  >
                    {col.renderHeaderCell
                      ? col.renderHeaderCell?.()
                      : col.header}
                  </MenuItemCheckbox>
                ))}
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
}

export const useGroupStyles = makeStyles({
    draggableIcon: {
        cursor: "move",
    },

    draggableItem: {

    },
    draggingItemOver: {
        ...shorthands.border("1px", "dashed", tokens.colorPaletteNavyBorderActive)
    }

})
