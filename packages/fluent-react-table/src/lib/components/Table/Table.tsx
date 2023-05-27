import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  TableSelectionCell,
  TableColumnDefinition,
  createTableColumn,
  useTableFeatures,
  useTableColumnSizing_unstable,
  TableColumnSizingOptions,
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
} from "@fluentui/react-components";
import * as React from "react";

import { TableProps } from "../../props-types";
import { PropsWithChildren } from "react";
import { TableProps as FluentTableProps } from "@fluentui/react-components"

import { useCustomTableFeature } from "../../hooks";
import { useTableStyles } from "./useTableStyles"
import { Pagination } from "../Pagination"
import { IColumn } from "../../types";
import {
  SearchRegular, MoreVerticalFilled, bundleIcon,
  CodeTextOff16Filled, CodeTextOff16Regular
} from "@fluentui/react-icons"
import { GridHeader } from "../GridHeader";
import { Loading } from "../Loading";
import { NoFilterMatch } from "../NoFilterMatch";
import { EmptyGrid } from "../EmptyGrid";

const ClearFilterIcon = bundleIcon(CodeTextOff16Filled, CodeTextOff16Regular);

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

export const ExtendedTable = <TItem extends NonNullable<{ id: string | number }>,>(props: PropsWithChildren<TableProps<TItem>>) => {

  const styles = useTableStyles();

  const columns = React.useMemo<TableColumnDefinition<TItem>[]>(() => {
    return props.columns?.map(col => createTableColumn<TItem>({
      columnId: col.columnId,
      renderHeaderCell: col.renderHeaderCell
    }))
  }, [props.columns]);

  const extendedColumns = React.useMemo<IColumn<TItem>[]>(() => props.columns, [props.columns]);

  const columnSizingOptions = React.useMemo<TableColumnSizingOptions>(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const sizingOptions: any = {};
    for (const col of props.columns) {
      sizingOptions[col.columnId] = col.sizeOptions
    }
    return sizingOptions;
  }, [props.columns]);

  const {
    gridTitle,
    selectionMode = "none",
    isLoading = false,
    items,
    onGetGridActionMenu,
    getRowClasses,
    ...rest
  } = props;

  const { ...tableProps }: FluentTableProps = rest;

  const { columnSizing_unstable, tableRef } = useTableFeatures<TItem>(
    {
      columns,
      items
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })]
  );

  const {
    pagedItems,

    filterState: {
      filterValue,
      setFilterValue,
      resetFilterValue
    },

    selectionState: { isEverySelected, isItemSelected, toggleRow, toggleAllRows, selectedItems },

    paginationState

  } = useCustomTableFeature(props);

  const showLoader = React.useMemo(() => isLoading && items?.length === 0, [isLoading, items]);
  const showNoItem = React.useMemo(() => !isLoading && items?.length === 0, [isLoading, items]);
  const showNoItemMatch = React.useMemo(() => pagedItems?.length === 0 && items?.length > 0, [isLoading, pagedItems, items]);

  const actionCallback = React.useCallback(() => onGetGridActionMenu && onGetGridActionMenu(selectedItems), [selectedItems])

  return (
    <>
      <div>
        <GridHeader search={
          <Input
            type="search"
            size={'small'}
            contentBefore={<SearchRegular />}
            className={styles.searchInput}
            contentAfter={
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button appearance="subtle" icon={<MoreVerticalFilled />} />
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem icon={<ClearFilterIcon />} onClick={resetFilterValue}>
                      Clear All Filters
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            }
            value={filterValue as string}
            onChange={(ev, data) => setFilterValue(data.value)}
          />
        }
          actionMenu={actionCallback}
          title={gridTitle}
        />
      </div>
      <Divider />
      <div className={styles.gridTableSection}>
        <Table {...tableProps} ref={tableRef} className={styles.gridTable}>
          <TableHeader>
            <TableRow className={styles.headerRow}>
              {selectionMode === "multiple" && <TableSelectionCell
                checked={isEverySelected(pagedItems)}
                onClick={() => toggleAllRows(pagedItems)}
                onKeyDown={() => toggleAllRows(pagedItems)}
                checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
                className={styles.headerRow}
              />}
              {
                selectionMode === "single" && (<TableHeaderCell className={styles.headerSelectionCell}></TableHeaderCell>)
              }
              {extendedColumns.map((column) => (
                <TableHeaderCell
                  key={column.columnId}
                  aside={<Button size="small">Hello</Button>}
                  {...columnSizing_unstable.getTableHeaderCellProps(
                    column.columnId
                  )}
                >
                  <Body1Stronger>{column.renderHeaderCell()}</Body1Stronger>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
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
          </TableBody>
        </Table>
        {showLoader && (<Loading />)}
        {showNoItem && (<EmptyGrid />)}
        {showNoItemMatch && (<NoFilterMatch />)}
      </div>
      <Divider />
      <div>
        <Pagination {...paginationState} />
      </div>
      <Divider />
    </>
  );
}; 