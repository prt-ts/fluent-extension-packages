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
    ClipboardPasteRegular,
    ClipboardPasteFilled,
    CutRegular,
    CutFilled,
    CopyRegular,
    CopyFilled,
} from "@fluentui/react-icons"

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);

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
        selectionMode = "none",
        items,
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

        selectionState: { isEverySelected, isItemSelected, toggleRow, toggleAllRows },

        paginationState

    } = useCustomTableFeature(props);

    return (
      <>
        <Input
          type="search"
          size={'small'}
          contentBefore={<SearchRegular />}
          contentAfter={
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="subtle" icon={<MoreVerticalFilled />} />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<CutIcon />} onClick={resetFilterValue}>
                    Clear Filter
                  </MenuItem>
                  <MenuItem
                    icon={<CopyIcon />}
                    onClick={() => alert('Copied to clipboard')}
                  >
                    Copy
                  </MenuItem>
                  <MenuItem
                    icon={<PasteIcon />}
                    onClick={() => alert('Pasted from clipboard')}
                  >
                    Paste
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          }
          value={filterValue as string}
          onChange={(ev, data) => setFilterValue(data.value)}
        />
        <Divider />
        <Table {...tableProps} ref={tableRef}>
          <TableHeader>
            <TableRow className={styles.headerRow}>
              <TableSelectionCell
                checked={isEverySelected(pagedItems)}
                onClick={() => toggleAllRows(pagedItems)}
                onKeyDown={() => toggleAllRows(pagedItems)}
                checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
                type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                hidden={selectionMode === 'none' || selectionMode === 'single'}
                className={styles.headerRow}
              />
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
                  isItemSelected(item) ? styles.selectedRow : undefined
                }
              >
                <TableSelectionCell
                  checked={isItemSelected(item)}
                  onChange={() => toggleRow(item)}
                  checkboxIndicator={{ 'aria-label': 'Select row' }}
                  type={selectionMode == 'single' ? 'radio' : 'checkbox'}
                  hidden={selectionMode === 'none'}
                />
                {extendedColumns.map((column, colIndex) => (
                  <TableCell key={`${column.columnId}_${colIndex}`}>
                    <TableCellLayout
                      media={
                        column.renderMedia &&
                        (column.renderMedia(item) as JSX.Element)
                      }
                      appearance={column.appearance}
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
        <Divider />
        <Pagination {...paginationState} />
        <Divider />
      </>
    );
}; 