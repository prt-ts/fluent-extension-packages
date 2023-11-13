import * as React from "react";
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
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
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
const SortAscIcon = bundleIcon(ArrowSortDown20Filled, ArrowSortDown20Regular);
const SortDescIcon = bundleIcon(ArrowSortUp20Filled, ArrowSortUp20Regular);

type HeaderCellProps = {
  header: Header<object, unknown>;
  table: Table<object>;
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

const useTableHeaderCellStyles = makeStyles({
  tHeadCell: {
    position: "relative",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightBold,
    minWidth: "1rem",
    ...shorthands.padding("2px", "4px"),
    ...shorthands.borderLeft("1px", "solid", tokens.colorNeutralStroke1),
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke1),
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke1),
  },

  tHeadCellContent: {
    display: "flex",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: "100%",
    minWidth: "1rem",
    ...shorthands.padding("3px", "4px"),
  },

  tHeadContentBtn: {
    ...shorthands.padding("0px", "0px", "0px", "0px"),
    display: "flex",
    ...shorthands.gap("5px"),
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    minWidth: "1rem",
  },

  tHeadMenuPopover: {
    ...shorthands.padding("0px", "0px", "0px", "0px"),
    width: "300px",
  },

  resizer: {
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralBackground5),

    width: "8px",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    cursor: "col-resize",
    resize: "horizontal",

    ":hover": {
      borderRightWidth: "4px",
      borderRightColor: tokens.colorNeutralBackground2Pressed,
    },
  },

  resizerActive: {
    borderRightWidth: "4px",
    borderRightColor: tokens.colorNeutralBackground2Pressed,
  },
});

export const HeaderCell: React.FC<HeaderCellProps> = ({
  header,
  table,
  hideMenu,
  headerDepth,
  totalNumberOfHeaderDepth,
}) => {
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

  const styles = useTableHeaderCellStyles();

  return (
    <th
      colSpan={header.colSpan}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "pointer",
        alignItems:
          headerDepth === totalNumberOfHeaderDepth ? "left" : "center",
        zIndex: 99,
        backgroundColor: isOver ? "#0000000d" : "transparent",
        border: isOver ? "1px dashed #0000000d" : "none",
      }}
      className={styles.tHeadCell}
    >
      <div ref={dragRef}>
        <div className={styles.tHeadCellContent} ref={dropRef}>
          <div ref={previewRef}>
            {header.isPlaceholder ? null : (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  flex: 1,
                }}
                onClick={(e) => {
                  header.column.toggleSorting(
                    header.column.getIsSorted() === "asc",
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
                {/* {header.column.getCanGroup() && (
                <button
                  {...{
                    onClick: header.column.getToggleGroupingHandler(),
                    style: {
                      cursor: "pointer",
                    },
                  }}
                >
                  {header.column.getIsGrouped()
                    ? `🛑(${header.column.getGroupedIndex()}) `
                    : `👊 `}
                </button>
              )} */}

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
          {!header.isPlaceholder && !hideMenu && (
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
                      <MenuGroup key={"sort-group"}>
                        <MenuGroupHeader>
                          Sort by{" "}
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
                            disabled={header.column.getIsSorted() === "asc"}
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
                          disabled={header.column.getIsSorted() === "desc"}
                        >
                          Sort Z to A
                        </MenuItem>
                        <MenuDivider />
                      </MenuGroup>
                    )}

                    {header.column.getCanGroup() && (
                      <MenuGroup key={"grouping-group"}>
                        <MenuGroupHeader>
                          Group by{" "}
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
                            Group by{" "}
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
                            Remove Grouping on{" "}
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
                      <MenuGroup key={"pin columns"}>
                        <MenuGroupHeader>
                          Pin Column{" "}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </MenuGroupHeader>
                        {
                          <MenuItem
                            onClick={() => {
                              header.column?.pin("left");
                            }}
                            icon={<ArrowStepInLeftRegular />}
                            disabled={header.column.getIsPinned() === "left"}
                          >
                            To Left
                          </MenuItem>
                        }
                        <MenuItem
                          onClick={() => {
                            header.column?.pin("right");
                          }}
                          icon={<ArrowStepInRightRegular />}
                          disabled={header.column.getIsPinned() === "right"}
                        >
                          To Right
                        </MenuItem>
                        {["left", "right"].includes(
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
                      <MenuGroup key={"filter-group"}>
                        <MenuGroupHeader>
                          Filter by{" "}
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
