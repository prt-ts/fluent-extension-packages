
import {
  Header,
  RowData,
  Table,
  flexRender,
} from "@tanstack/react-table";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup, 
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
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
  PinFilled,
  TextClearFormattingFilled,
  EyeTrackingOffFilled,
  EyeTrackingOffRegular,
  ArrowSortFilled,  
  MoreVerticalFilled,
  MoreVerticalRegular,
  FilterDismissFilled,
  TextCollapseFilled,
  TextExpandFilled,
  TextExpandRegular,
  TextCollapseRegular
} from "@fluentui/react-icons"; 
import { useTableHeaderStyles } from "./useTableHeaderStyles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from "react";
import { getHeaderCellPinningStyles } from "../../helpers/StylesHelper";
import { Show } from "@prt-ts/react-control-flow";
import { ClearFilterIcon } from "../icon-components/GridIcons";

const MoreIcon = bundleIcon(MoreVerticalFilled, MoreVerticalRegular);
const SortAscIcon = bundleIcon(ArrowSortDown20Filled, ArrowSortDown20Regular);
const SortDescIcon = bundleIcon(ArrowSortUp20Filled, ArrowSortUp20Regular);
const PinIcon = bundleIcon(PinFilled, PinRegular);
const HideColumnIcon = bundleIcon(EyeTrackingOffFilled, EyeTrackingOffRegular);
const GroupExpandIcon = bundleIcon(TextExpandFilled, TextExpandRegular);
const GroupCollapseIcon = bundleIcon(TextCollapseFilled, TextCollapseRegular);

type HeaderCellProps<TItem extends RowData> = {
  header: Header<TItem, unknown>;
  table: Table<TItem>;
  hideMenu?: boolean;
  headerDepth: number;
  totalNumberOfHeaderDepth: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabAttributes: any;
};

export function HeaderCell<TItem extends RowData>({
  header,
  table,
  hideMenu,
  headerDepth,
  totalNumberOfHeaderDepth,
  tabAttributes
}: HeaderCellProps<TItem>) {
  const { column } = header;

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: column.id
  });

  const dndStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  const styles = useTableHeaderStyles();
  const isLeafHeaders = headerDepth === totalNumberOfHeaderDepth; 
  const headerCellCombinedStyles = getHeaderCellPinningStyles(column, isDragging, dndStyle)

  if (header.isPlaceholder) {
    return (
      <th colSpan={header.colSpan}
        className={styles.tHeadCell}
        style={headerCellCombinedStyles}
        ref={setNodeRef} 
        >
        <Show when={header.column.getCanResize()}>
          <div
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className={mergeClasses(
              styles.resizer,
              column.getIsResizing() && styles.resizerActive
            )}
          />
        </Show>
      </th>
    );
  }

  const columnName = flexRender(
    header.column.columnDef.header,
    header.getContext()
  );

  return (
    <th
      colSpan={header.colSpan}
      className={mergeClasses(
        styles.tHeadCell,
        isLeafHeaders && styles.tHeadNonLeafCell,
        isDragging && styles.tHeadCellDragging
      )}
      style={headerCellCombinedStyles}
      ref={setNodeRef}
      {...tabAttributes}
      tabIndex={0}
    >
      <div className={styles.tHeadCellDraggable} {...attributes} {...listeners}>
        <div
          className={
            isLeafHeaders
              ? styles.tLeafHeadCellContent
              : styles.tNonLeafHeadCellContent
          }
        >
          <div>
            <Show when={!header.isPlaceholder}>
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
                  {columnName}
                </strong>

                {/* indicator for grouping */}
                <Show when={header.column.getIsGrouped()}>
                  <strong><GroupListRegular /></strong>
                </Show>
                {/* indicator for filtering */}
                <Show when={header.column.getIsFiltered()} >
                  <strong><FilterFilled /></strong>
                </Show>
                {/* indicator for pinning */}
                <Show when={header.column.getIsPinned()}>
                  <strong><PinRegular /></strong>
                </Show>
              </Button>
            </Show>
          </div>
          <HeaderMenu header={header} table={table} hideMenu={hideMenu} />
        </div>
      </div>

      <Show when={header.column.getCanResize()}>
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={mergeClasses(
            styles.resizer,
            column.getIsResizing() && styles.resizerActive
          )}
        />
      </Show>
      <Show when={!isLeafHeaders}>
        <div className={styles.tHeadNonLeafCellFakeBorder}></div>
      </Show>
    </th>
  );
}

type HeaderMenuProps<TItem extends RowData> = {
  header: Header<TItem, unknown>;
  table: Table<TItem>;
  hideMenu?: boolean;
};

function HeaderMenu<TItem extends RowData>(props: HeaderMenuProps<TItem>): JSX.Element {

  const { header, table, hideMenu } = props; 
   /* eslint-disable @typescript-eslint/no-non-null-assertion */
   const { dispatchDrawerAction, drawerState } = table.options.meta!;
  const styles = useTableHeaderStyles();

  if (hideMenu || header.isPlaceholder) return (<> </>);

  const canHavePopOver = header.column.getCanSort() ||
    header.column.getCanGroup() ||
    header.column.getCanFilter();

  if (!canHavePopOver) return (<> </>);

  const columnName = flexRender(
    header.column.columnDef.header,
    header.getContext()
  );

  return (
    <Menu positioning={{align : "end"}}>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip relationship="label" content={<>More actions for {columnName}</>}>
          <MenuButton
            appearance="subtle"
            aria-label="View Column Actions"
            icon={<MoreIcon />}
          ></MenuButton>
        </Tooltip>
      </MenuTrigger>

      <MenuPopover className={styles.tHeadMenuPopover}>
        <MenuList>
          <Show when={header.column.getCanSort()}>
            <MenuGroup key={'sort-group'}>
            <MenuItem
                onClick={(e) => { 
                  header.column?.clearSorting();
                }}
                icon={<ArrowSortFilled />}
                disabled={!header.column.getIsSorted()}
              >
                Clear Sorting
              </MenuItem>
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
          </Show>

          <Show when={header.column.getCanGroup()}>
            <MenuGroup key={'grouping-group'}>
              {!header.column.getIsGrouped() && (
                <MenuItem
                  onClick={() => {
                    header.column.getToggleGroupingHandler()();

                    const { isAutoExpandOnGroup } = table.options.meta!;
                    if (isAutoExpandOnGroup) {
                      table.toggleAllRowsExpanded(true);
                    }
                  }}
                  icon={<GroupFilled />}
                >
                  Group Column (by {columnName})
                </MenuItem>
              )}
              <Show when={header.column.getIsGrouped()}>
                <MenuItem
                  onClick={() => {
                    header.column.getToggleGroupingHandler()(); 
                  }}
                  icon={<GroupDismissFilled />}
                >
                  Remove Grouping (on {columnName})
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    table.toggleAllRowsExpanded()
                  }
                  icon={table.getIsAllRowsExpanded() ? <GroupCollapseIcon /> : <GroupExpandIcon />}
                >
                  <Show 
                    when={table.getIsAllRowsExpanded()} 
                    fallback={<>Expand All Groups</>}>
                    Collapse All Groups
                  </Show>
                </MenuItem>
              </Show>
              <MenuDivider />
            </MenuGroup>
          </Show>

          <Show when={header.column.getCanPin()}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem icon={<PinIcon />}>Pin Column ({columnName})</MenuItem>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      header.column?.pin(false);
                    }}
                    icon={<PinOffRegular />}
                    disabled={!(['left', 'right'].includes(
                      header.column.getIsPinned() as string
                    ))}
                  >
                    No Pin
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      header.column?.pin('left');
                    }}
                    icon={<ArrowStepInLeftRegular />}
                    disabled={header.column.getIsPinned() === 'left'}
                  >
                    Pin Left
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      header.column?.pin('right');
                    }}
                    icon={<ArrowStepInRightRegular />}
                    disabled={header.column.getIsPinned() === 'right'}
                  >
                    Pin Right
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu> 
          </Show>

          <Show when={header.column.getCanHide()}>
            <Menu>
              <MenuList>
                <MenuItem
                  onClick={header.column.getToggleVisibilityHandler()}
                  disabled={!header.column.getCanHide()}
                  icon={<HideColumnIcon />}
                >
                  Hide Column ({columnName})
                </MenuItem>
              </MenuList>
              <MenuDivider />
            </Menu>
          </Show>
          

          <Show when={header.column.getCanFilter()}>
            <MenuDivider />
            <MenuGroup key={'filter-group'}>
              <MenuList>

                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem
                      icon={<ClearFilterIcon />}
                    >
                      Clear Filters
                    </MenuItem>
                  </MenuTrigger> 
                  <MenuPopover>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          header.column.setFilterValue(undefined);
                        }}
                        icon={<TextClearFormattingFilled />}
                        disabled={!header.column.getIsFiltered()}
                      >
                        Clear for {columnName}
                      </MenuItem>
                      <MenuItem
                        onClick={() => { 
                          table.resetColumnFilters();
                        }}
                        icon={<ClearFilterIcon />}
                      >
                        Clear for All Columns
                      </MenuItem> 
                    </MenuList>
                  </MenuPopover>
                </Menu>
                <MenuItem 
                  icon={drawerState?.isFilterDrawerOpen ? <FilterDismissFilled /> : <FilterFilled />}
                  onClick={() => {
                 
                  if (drawerState.isFilterDrawerOpen) {
                    dispatchDrawerAction?.({ type: "CLOSE_FILTER_DRAWER" });
                  } else {
                    dispatchDrawerAction?.({ type: "OPEN_FILTER_DRAWER" });
                  }
                }}>
                  <Show when={drawerState?.isFilterDrawerOpen}
                    fallback={<>Open Column Filter</>}>
                    Close Column Filter
                  </Show>
                </MenuItem>
                {/* <MenuDivider /> */}
                {/* <MenuGroupHeader>Filter by {columnName}</MenuGroupHeader> */}
                {/* <Filter column={header.column} table={table} /> */}
              </MenuList>
            </MenuGroup>
          </Show>
        </MenuList>
      </MenuPopover>
    </Menu>);
}
