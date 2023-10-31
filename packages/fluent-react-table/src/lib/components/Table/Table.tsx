import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  TableSelectionCell,
  Button,
  Body1Stronger,
  Input,
  Divider,
  MenuTrigger,
  Menu,
  MenuPopover,
  MenuList,
  MenuItem,
  TableCellActions,
  mergeClasses,
  MenuDivider,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Field,
  MenuItemRadio, 
} from "@fluentui/react-components";
import { AdvanceConfigSetting } from "./AdvanceOptionDrawer";
import * as React from "react";

import { TableProps } from "../../props-types";
import { PropsWithChildren } from "react";
import { TableProps as FluentTableProps } from "@fluentui/react-components"

import { useCustomTableFeature } from "../../hooks";
import { useTableStyles } from "./useTableStyles"
import { Pagination } from "../Pagination"

import { GridHeader } from "../GridHeader";
import { NoFilterMatch } from "../NoFilterMatch";
import { EmptyGrid } from "../EmptyGrid";
import { Loading } from "../Loading";
import { GroupRenderer } from "./GroupRenderer";
import { GroupColumns } from "./GroupColumns";
import { SelectColumns } from "./SelectColumns";
import { ChangeViewIcon, ClearFilterIcon, GroupCollapsedIcon, GroupExpandedIcon, SaveIcon, SearchIcon, VerticalMoreIcon } from "../Icons"
import { IColumn, TableRefType, TableState } from "../../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function tryGetObjectValue(fieldName: string | undefined, item: any) {
  if (!fieldName)
    return item;

  let prop = "";
  const props = fieldName.split('.');

  let i = 0;
  while (i < props.length - 1) {
    prop = props[i];

    const candidate = item?.[prop];
    if (candidate !== undefined) {
      item = candidate;
    } else {
      break;
    }
    i++;
  }

  return item[props[i]];
}

export const ExtendedTable = React.forwardRef(<TItem extends NonNullable<{ id: string | number }>,>(props: PropsWithChildren<TableProps<TItem>>, ref: React.ForwardedRef<TableRefType>) => {

  const styles = useTableStyles();

  const {
    children,
    gridTitle,
    selectionMode = "none",
    getRowClasses,
    ...rest
  } = props;

  const columns = React.useMemo(() => {
    const childColumns = ((Array.isArray(children) ? children : [children])
      ?.map(
        (child, index) =>
        ({
          ...child?.props,
          key: `${child?.props?.columnId}-column-${index}`,
        } as IColumn<TItem>)
      ) ?? []
    );

    console.log("childColumns", childColumns);

    return childColumns?.length > 0 ? childColumns : props.columns ?? [];
  }, []);

  const { ...tableProps }: FluentTableProps = rest;

  const {
    pagedItems,

    showLoader,
    showNoItem,
    showNoItemMatch,

    gridActionMenu,

    viewsState: {
      views,
      saveTableView,
      applyTableView,
    },

    defaultFeatures: {
      tableRef,
      columnSizing_unstable
    },

    columnsState: {
      extendedColumns,

      visibleColumns,
      setVisibleColumns
    },

    filterState: {
      filterValue,
      setFilterValue,
      resetFilterValue
    },

    sortState: {

      toggleSortColumn,
      // resetSortColumns,

      isColumnSorted,
      isSortedAscending
    },

    selectionState: { isEverySelected, isItemSelected, toggleRow, toggleAllRows },

    paginationState,

    groupedState: {
      groups,
      groupedColumns,
      toggleColumnGroup,
      resetGroupColumns,
      isAllCollapsed,
      toggleGroupExpand,
      toggleAllGroupExpand
    }

  } = useCustomTableFeature(props, columns);

  React.useImperativeHandle(ref, () => ({
    setCurrentPage: (pageNumber: number) => {
      const maxAllowedPageNumber = Math.min(pageNumber - 1, paginationState.totalNumberOfPage - 1);
      paginationState.setPage(maxAllowedPageNumber);
    },
    setPageSize: (pageSize: number) => {
      paginationState.updatePageSize(pageSize);
    },
    setGlobalFilter: (filter: string) => {
      setFilterValue(filter);
    },
    applyTableView: (viewName: string) => {
      applyTableView(viewName);
    },
    getTableState: (): TableState => {
      return {
        currentPage: paginationState.currentPage,
        pageSize: paginationState.pageSize,
        globalFilter: filterValue,
        groupedColumnsIds: groupedColumns,
        visibleColumnsIds: visibleColumns,
      }
    }



  }));

  const viewNameRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);


  return (
    <>
      <div>
        <GridHeader search={
          <>
            <GroupColumns
              groupedColumns={groupedColumns}
              columns={columns}
              resetGroupColumns={resetGroupColumns} />
            <SelectColumns
              visibleColumns={visibleColumns}
              columns={columns}
              resetVisibleColumns={(newVisibleColumns: string[]) => setVisibleColumns([...newVisibleColumns])} />
            {/* <Button appearance="outline" icon={<LayerRegular />} onClick={() => setIsDrawerOpen(current => !current)} aria-label={"Advance Grid Configuration"} /> */}
            {/* <Menu
              checkedValues={showHideOptionSelected}
              onCheckedValueChange={((_, data: MenuCheckedValueChangeData) => setVisibleColumns(data.checkedItems))}>

              <Tooltip content="Show/Hide Grid Columns" relationship="description">
                <MenuTrigger disableButtonEnhancement>
                  <Button appearance="outline" icon={<ToggleColumnIcon />} />
                </MenuTrigger>
              </Tooltip>
              <MenuPopover>
                <MenuList>
                  <MenuGroup key={"table-hide-show"}>
                    <MenuGroupHeader key={"table-hide-show-label"}>Show/Hide Columns</MenuGroupHeader>
                    <MenuDivider key={"table-hide-show-divider"} />
                    {
                      columns && columns.map((col, index) => (
                        <MenuItemRadio
                          key={index}
                          name={"hiddenCols"}
                          value={col.columnId as string}
                        >
                          {col.renderHeaderCell()}
                        </MenuItemRadio>))
                    }
                  </MenuGroup>
                </MenuList>
              </MenuPopover>
            </Menu> */}
            <Dialog
              open={open}
              onOpenChange={(event, data) => setOpen(data.open)}
              modalType="non-modal">
              <DialogSurface aria-describedby={undefined}>
                <form onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  const viewName = viewNameRef?.current?.value as string;
                  if (viewName.length > 0) {
                    saveTableView(viewName);
                    setOpen(false);
                  }
                }}>
                  <DialogBody>
                    <DialogTitle>Save New View</DialogTitle>
                    <DialogContent>
                      <Field
                        label={"Enter View Name"}
                        hint="If you enter the name that already exists, It will replace existing View."
                        required>
                        <Input
                          ref={viewNameRef}
                          required
                          type="text"
                          placeholder="Enter View Name"
                          id={"view-name-input"}
                          style={{ width: "100%" }} />
                      </Field>
                    </DialogContent>
                    <DialogActions>
                      <DialogTrigger disableButtonEnhancement>
                        <Button appearance="secondary">Close</Button>
                      </DialogTrigger>
                      <Button type="submit" appearance="primary" icon={<SaveIcon />}>
                        Save View
                      </Button>
                    </DialogActions>
                  </DialogBody>
                </form>
              </DialogSurface>
            </Dialog>
            <Input
              type="search"
              size={'small'}
              contentBefore={<SearchIcon />}
              className={styles.searchInput}
              placeholder="Search Keyword"
              aria-label="Enter Your Search Keyword"
              contentAfter={
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button appearance="subtle" icon={<VerticalMoreIcon />} aria-label="View Menu"/>
                  </MenuTrigger>

                  <MenuPopover>
                    <MenuList>
                      <MenuItem icon={<ClearFilterIcon />} onClick={resetFilterValue}>
                        Clear All Filters
                      </MenuItem>
                      <MenuItem icon={<SaveIcon />} onClick={() => setOpen(true)}>
                        Save Current View
                      </MenuItem>
                      <MenuDivider />
                      {
                        views && views.map((view, index) =>
                        (<MenuItemRadio name={"view-selector"} value={view.viewName} key={view.viewName + index} icon={<ChangeViewIcon />} onClick={() => applyTableView(view.viewName)}>
                          {view.viewName}
                        </MenuItemRadio>))
                      }
                    </MenuList>
                  </MenuPopover>
                </Menu>
              }
              value={filterValue as string}
              onChange={(ev, data) => setFilterValue(data.value)}
            />
          </>
        }
          actionMenu={gridActionMenu}
          title={gridTitle}
        />
      </div>
      <Divider />
      <div className={styles.gridTableSection} style={{ maxHeight: `${(props.maxTableHeight || 300)}px` }}>
        <Table {...tableProps} ref={tableRef} className={styles.gridTable}>
          <TableHeader>
            <TableRow className={styles.headerRow} key="table-header">

              {selectionMode === "multiple" && (
                <TableSelectionCell
                  key={"multi-select"}
                  checked={isEverySelected(pagedItems)}
                  onClick={() => toggleAllRows(pagedItems)}
                  onKeyDown={() => toggleAllRows(pagedItems)}
                  checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
                  className={styles.headerRow}
                />)}
              {
                selectionMode === "single" &&
                (<TableHeaderCell key={"single-select"} className={styles.headerSelectionCell}></TableHeaderCell>)
              }
              {
                groups?.length > 0 &&
                (<TableHeaderCell
                  key={"group-toggle"}
                  className={styles.headerToggleCell}
                  onClick={() => toggleAllGroupExpand(isAllCollapsed)}
                >
                  <Body1Stronger>
                    {isAllCollapsed
                      ? <GroupCollapsedIcon />
                      : <GroupExpandedIcon />}
                  </Body1Stronger>
                </TableHeaderCell>)
              }

              {extendedColumns.map((column, colIndex) => (
                <TableHeaderCell
                  key={`${column.columnId}_${colIndex}`}
                  {...(columnSizing_unstable as any).getTableHeaderCellProps(
                    column.columnId
                  )}
                  onClick={(e: any) => (e.detail == 1 && !column.disableSorting) ? toggleSortColumn(column.columnId as string, false) : null}
                  onDoubleClick={(e: any) => {
                    e.preventDefault();
                    if (column.disableGrouping) return;
                    toggleColumnGroup(column.columnId as string, true)
                  }}
                  sortDirection={
                    !column.disableSorting && isColumnSorted(column.columnId as string)
                      ? (isSortedAscending(column.columnId as string) ? "ascending" : "descending")
                      : undefined}
                  sortable={!column.disableSorting}
                  className={styles.headerCell}
                >
                  <Body1Stronger>
                    {column.header}
                  </Body1Stronger>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Def Without Group */}
          {
            groups.length === 0 && <TableBody>
              {pagedItems.map((item, index) => (
                <TableRow
                  key={index}
                  className={
                    mergeClasses(isItemSelected(item) ? styles.selectedRow : undefined, getRowClasses ? getRowClasses(item, index) : undefined)
                  }
                >
                  {selectionMode !== 'none' && <TableSelectionCell
                    checked={isItemSelected(item)}
                    onChange={() => toggleRow(item)}
                    checkboxIndicator={{ 'aria-label': 'Select row' }}
                    type={selectionMode == 'single' ? 'radio' : 'checkbox'}
                  />}
                  {extendedColumns.map((column, colIndex) => (
                    <TableCell key={`${column.columnId}_${colIndex}`}>
                      <TableCellLayout
                        media={
                          column.renderMedia &&
                          (column.renderMedia(item) as JSX.Element)
                        }
                        appearance={column.appearance}
                        description={column.renderSecondary && column.renderSecondary(item) as JSX.Element}
                        className={styles.tableDataCell}
                      >
                        {column.renderCell
                          ? column.renderCell(item)
                          : (tryGetObjectValue(
                            column.columnId as string,
                            item
                          ) as string)}
                      </TableCellLayout>
                      {column.renderActions ? (
                        <TableCellActions>
                          {column.renderActions(item)}
                        </TableCellActions>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>}

          {/* Table Def with Group */}
          {
            groups.length > 0 &&
            <TableBody>
              {groups.map((group, index) => (
                <React.Fragment key={index + group.key}>
                  <GroupRenderer
                    items={[...pagedItems]}
                    group={group}
                    colSpan={extendedColumns.length}
                    headerRowClassName={styles.groupHeaderRow}
                    onItemRender={(items: TItem[]) => {
                      return <>{[...items].map((item, index) => (
                        <TableRow
                          key={group.key + index}
                          className={
                            mergeClasses(isItemSelected(item) ? styles.selectedRow : undefined, getRowClasses ? getRowClasses(item, index) : undefined)
                          }
                        >
                          {selectionMode !== 'none' && <TableSelectionCell
                            checked={isItemSelected(item)}
                            onChange={() => toggleRow(item)}
                            checkboxIndicator={{ 'aria-label': 'Select row' }}
                            type={selectionMode == 'single' ? 'radio' : 'checkbox'}
                          />}
                          <TableCell className={styles.headerToggleCell}></TableCell>
                          {extendedColumns.map((column, colIndex) => (
                            <TableCell key={`${column.columnId}_${colIndex}`}>
                              <TableCellLayout
                                media={
                                  column.renderMedia &&
                                  (column.renderMedia(item) as JSX.Element)
                                }
                                appearance={column.appearance}
                                description={column.renderSecondary && column.renderSecondary(item) as JSX.Element}
                              >
                                {column.renderCell
                                  ? column.renderCell(item)
                                  : (tryGetObjectValue(
                                    column.columnId as string,
                                    item
                                  ) as string)}
                              </TableCellLayout>
                              {column.renderActions ? (
                                <TableCellActions>
                                  {column.renderActions(item)}
                                </TableCellActions>
                              ) : (
                                <></>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}</>
                    }}
                    onSelectionRender={(groupedItems: TItem[]) => {
                      return (<>
                        {selectionMode === "multiple" && <TableSelectionCell
                          checked={isEverySelected(groupedItems)}
                          onClick={() => toggleAllRows(groupedItems)}
                          onKeyDown={() => toggleAllRows(groupedItems)}
                          checkboxIndicator={{ 'aria-label': 'Select all rows ' }}

                        />}
                        {
                          selectionMode === "single" && (<TableHeaderCell></TableHeaderCell>)
                        }
                      </>)
                    }}
                    toggleGroupExpand={toggleGroupExpand}
                  />
                </React.Fragment>
              ))}
            </TableBody>
          }
        </Table>
        {showLoader && (<Loading />)}
        {showNoItem && (<EmptyGrid message={props.noItemPage} />)}
        {showNoItemMatch && (<NoFilterMatch />)}
      </div>
      <Divider />
      <div>
        <Pagination {...paginationState} />
      </div>
      <Divider />
      <AdvanceConfigSetting open={isDrawerOpen} setOpen={setIsDrawerOpen} />
    </>
  );
});

export const Column = (props: IColumn<any>) => <>{props.children}</>;
