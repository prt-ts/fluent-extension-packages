
import {
  Header,
  Table,
  flexRender,
} from "@tanstack/react-table";
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from "react";
import { getCommonPinningStyles } from "../../helpers/StylesHelper";

const SortAscIcon = bundleIcon(ArrowSortDown20Filled, ArrowSortDown20Regular);
const SortDescIcon = bundleIcon(ArrowSortUp20Filled, ArrowSortUp20Regular);

type HeaderCellProps<TItem extends object> = {
  header: Header<TItem, unknown>;
  table: Table<TItem>;
  hideMenu?: boolean;
  headerDepth: number;
  totalNumberOfHeaderDepth: number;
};

export function HeaderCell<TItem extends object>({
  header,
  table,
  hideMenu,
  headerDepth,
  totalNumberOfHeaderDepth,
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
    id: column.id,
    resizeObserverConfig: {}
  });

  const dndStyle: CSSProperties = {
    width: header.column.getSize(),
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    // transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'wrap',
    zIndex: isDragging ? 1 : 0,
    transition
  };

  const styles = useTableHeaderStyles();
  const isLeafHeaders = headerDepth === totalNumberOfHeaderDepth;

  if (header.isPlaceholder) {
    return (
      <th colSpan={header.colSpan} className={styles.tHeadCell} style={{ ...getCommonPinningStyles(column, true) }}>
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
  }

  return (
    <th
      colSpan={header.colSpan}
      className={mergeClasses(
        styles.tHeadCell,
        isLeafHeaders || header.isPlaceholder ? undefined
          : styles.tHeadNonLeafCell,
        isDragging && styles.tHeadCellDragging
      )} 
      style={{ ...dndStyle, ...getCommonPinningStyles(column, true) }}
    >
      <div className={styles.tHeadCellDraggable} ref={setNodeRef} {...attributes} {...listeners}>
        <div
          className={
            isLeafHeaders
              ? styles.tLeafHeadCellContent
              : styles.tNonLeafHeadCellContent
          }
        >
          <div>
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

                {/* {header.column.columnDef.id && header.column.getCanResize() && <Button ref={dragRef}>🟰</Button>} */}
              </Button>
            )}
          </div>
          <HeaderMenu header={header} table={table} hideMenu={hideMenu} />
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
}

type HeaderMenuProps<TItem extends object> = {
  header: Header<TItem, unknown>;
  table: Table<TItem>;
  hideMenu?: boolean;
};

function HeaderMenu<TItem extends object>(props: HeaderMenuProps<TItem>): JSX.Element {

  const { header, table, hideMenu } = props;
  const styles = useTableHeaderStyles();

  if (hideMenu || header.isPlaceholder) return (<> </>);

  const canHavePopOver = header.column.getCanSort() ||
    header.column.getCanGroup() ||
    header.column.getCanFilter();

  if (!canHavePopOver) return (<> </>);

  return (
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
    </Menu>);
}
