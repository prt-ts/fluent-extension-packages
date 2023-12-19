import {
  Column,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
} from "@fluentui/react-components";
import {
  bundleIcon,
  ArrowSortDown20Filled,
  ArrowSortDown20Regular,
  ArrowSortUp20Filled,
  ArrowSortUp20Regular,
  GroupListRegular,
  FilterFilled,
  TextSortAscendingFilled,
  TextSortDescendingFilled,
  GroupFilled,
  GroupDismissFilled,
  ArrowStepInLeftRegular,
  ArrowStepInRightRegular,
  PinOffRegular,
  PinRegular,
} from "@fluentui/react-icons";
import { Filter } from "../filters";
import { useTableHeaderStyles } from "./useTableHeaderStyles";
const SortAscIcon = bundleIcon(ArrowSortDown20Filled, ArrowSortDown20Regular);
const SortDescIcon = bundleIcon(ArrowSortUp20Filled, ArrowSortUp20Regular);

type HeaderCellProps<TItem extends object> = {
  header: Header<TItem, unknown>;
  table: Table<TItem>;
  hideMenu?: boolean;
  headerDepth: number;
  totalNumberOfHeaderDepth: number;
};

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};



export function HeaderCell<TItem extends object>({
  header,
  table,
  hideMenu,
  headerDepth,
  totalNumberOfHeaderDepth,
} : HeaderCellProps<TItem>) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [{ isOver }, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<object>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  const styles = useTableHeaderStyles();

  const canDragDrop = headerDepth === totalNumberOfHeaderDepth && !header.isPlaceholder;
  const isLeafHeaders = headerDepth === totalNumberOfHeaderDepth;

  return (
    <th
      colSpan={header.colSpan}
      className={mergeClasses(
        styles.tHeadCell,
        isLeafHeaders || header.isPlaceholder ? undefined
          : styles.tHeadNonLeafCell,
        isDragging && styles.tHeadCellDragging,
        isOver && isLeafHeaders && styles.tHeadCellOver
      )}
    >
      <div className={styles.tHeadCellDraggable} ref={canDragDrop ? dragRef : undefined}>
        <div
          className={
            isLeafHeaders
              ? styles.tLeafHeadCellContent
              : styles.tNonLeafHeadCellContent
          }
          ref={canDragDrop ? dropRef : undefined}
        >
          <div ref={canDragDrop ? previewRef : undefined}>
            {header.isPlaceholder ? null : (
              <Button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'left',
                  flex: 1,
                }}
                onClick={(e) => {
                  if (!header.column.getCanSort()) return;
                  header.column.toggleSorting(
                    header.column.getIsSorted() === 'asc',
                    e.ctrlKey
                  );
                }}
                onDoubleClick={() => {
                  if (!header.column.getCanGroup()) return;
                  header.column.getToggleGroupingHandler()();
                }}
                appearance="transparent"
                className={styles.tHeadContentBtn}
                icon={
                  {
                    asc: (
                      <strong>
                        <SortAscIcon />
                      </strong>
                    ),
                    desc: (
                      <strong>
                        <SortDescIcon />
                      </strong>
                    ),
                  }[header.column.getIsSorted() as string] ?? undefined
                }
                iconPosition="after"
              >
                <strong>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </strong>

                {/* indicator for grouping */}
                {header.column.getIsGrouped() && <GroupListRegular />}
                {/* indicator for filtering */}
                {header.column.getIsFiltered() && (
                  <strong>
                    <FilterFilled />
                  </strong>
                )}

                {header.column.getIsPinned() && <PinRegular />}

                {/* {header.column.columnDef.id && header.column.getCanResize() && <button ref={dragRef}>🟰</button>} */}
              </Button>
            )}
          </div>
          {!header.isPlaceholder &&
            !hideMenu &&
            (header.column.getCanSort() ||
              header.column.getCanGroup() ||
              header.column.getCanFilter()) && (
              <div>
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuButton
                      appearance="transparent"
                      aria-label="View Column Actions"
                    ></MenuButton>
                  </MenuTrigger>

                  <MenuPopover className={styles.tHeadMenuPopover}>
                    <MenuList>
                      {header.column.getCanSort() && (
                        <MenuGroup key={'sort-group'}>
                          <MenuGroupHeader>
                            Sort by{' '}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </MenuGroupHeader>
                          {
                            <MenuItem
                              onClick={(e) => {
                                const isControlKeySelected = e.ctrlKey;
                                header.column?.toggleSorting(
                                  false,
                                  isControlKeySelected
                                );
                              }}
                              icon={<TextSortAscendingFilled />}
                              disabled={header.column.getIsSorted() === 'asc'}
                            >
                              Sort A to Z
                            </MenuItem>
                          }
                          <MenuItem
                            onClick={(e) => {
                              const isControlKeySelected = e.ctrlKey;
                              header.column?.toggleSorting(
                                true,
                                isControlKeySelected
                              );
                            }}
                            icon={<TextSortDescendingFilled />}
                            disabled={header.column.getIsSorted() === 'desc'}
                          >
                            Sort Z to A
                          </MenuItem>
                          <MenuDivider />
                        </MenuGroup>
                      )}

                      {header.column.getCanGroup() && (
                        <MenuGroup key={'grouping-group'}>
                          <MenuGroupHeader>
                            Group by{' '}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </MenuGroupHeader>
                          {!header.column.getIsGrouped() && (
                            <MenuItem
                              onClick={() =>
                                header.column.getToggleGroupingHandler()()
                              }
                              icon={<GroupFilled />}
                            >
                              Group by{' '}
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </MenuItem>
                          )}
                          {header.column.getIsGrouped() && (
                            <MenuItem
                              onClick={() =>
                                header.column.getToggleGroupingHandler()()
                              }
                              icon={<GroupDismissFilled />}
                            >
                              Remove Grouping on{' '}
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </MenuItem>
                          )}
                          <MenuDivider />
                        </MenuGroup>
                      )}

                      {header.column.getCanSort() && (
                        <MenuGroup key={'pin columns'}>
                          <MenuGroupHeader>
                            Pin Column{' '}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </MenuGroupHeader>
                          {
                            <MenuItem
                              onClick={() => {
                                header.column?.pin('left');
                              }}
                              icon={<ArrowStepInLeftRegular />}
                              disabled={header.column.getIsPinned() === 'left'}
                            >
                              To Left
                            </MenuItem>
                          }
                          <MenuItem
                            onClick={() => {
                              header.column?.pin('right');
                            }}
                            icon={<ArrowStepInRightRegular />}
                            disabled={header.column.getIsPinned() === 'right'}
                          >
                            To Right
                          </MenuItem>
                          {['left', 'right'].includes(
                            header.column.getIsPinned() as string
                          ) && (
                            <MenuItem
                              onClick={() => {
                                header.column?.pin(false);
                              }}
                              icon={<PinOffRegular />}
                            >
                              Unpin Column
                            </MenuItem>
                          )}
                          <MenuDivider />
                        </MenuGroup>
                      )}

                      {header.column.getCanFilter() && (
                        <MenuGroup key={'filter-group'}>
                          <MenuGroupHeader>
                            Filter by{' '}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </MenuGroupHeader>
                          <Filter column={header.column} table={table} />
                        </MenuGroup>
                      )}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
            )}
        </div>
      </div>

      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={mergeClasses(
            styles.resizer,
            column.getIsResizing() && styles.resizerActive
          )}
        />
      )}
    </th>
  );
};
