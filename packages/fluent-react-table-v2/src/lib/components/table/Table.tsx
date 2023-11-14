import * as React from "react";
import { useTableStaticStyles } from "./useTableStaticStyles";
import { Header, Table, flexRender } from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { HeaderCell } from "../thead";
import { Button, Checkbox, Radio } from "@fluentui/react-components";
import { Loading } from "../loading";
import { NoItemGrid } from "../no-item";
import { NoSearchResult } from "../no-search-result";
import {
  GroupCollapsedIcon,
  GroupExpandedIcon,
} from "../icon-components/GridIcons";

type TableContainerProps<TItem extends object> = {
  rowSelectionMode?: "single" | "multiple";
  table: Table<TItem>;
  noItemPage?: React.ReactNode;
  noFilterMatchPage?: React.ReactNode;
  isLoading: boolean;
  data: TItem[];
};

export const TableContainer = <TItem extends object>(
  props: TableContainerProps<TItem>
) => {
  const styles = useTableStaticStyles();
  const { table, rowSelectionMode } = props;

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  const headerGroups = table.getHeaderGroups();

  // utilities
  const isLoading = props.isLoading && virtualRows.length == 0;
  const noItems = !isLoading && props.data?.length == 0;
  const noSearchResult =
    !isLoading && props?.data?.length > 0 && virtualRows.length == 0;

  return (
    <>
      <div ref={tableContainerRef} className={styles.tableContainer}>
        <table className={styles.table} aria-label="Data Grid">
          <thead className={styles.tHead}>
            {headerGroups?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {rowSelectionMode === "multiple" && (
                  <th style={{ width: "1rem" }}>
                    {headerGroup.depth === headerGroups?.length - 1 && (
                      <Checkbox
                        checked={
                          table.getIsSomeRowsSelected()
                            ? "mixed"
                            : table.getIsAllRowsSelected()
                        }
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        aria-label="Select All Rows"
                        title={"Select All Rows"}
                      />
                    )}
                  </th>
                )}
                {rowSelectionMode === "single" && (
                  <th style={{ width: "1rem" }}> </th>
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header as unknown as Header<object, unknown>}
                      table={table as unknown as Table<object>}
                      hideMenu={headerGroup.depth !== headerGroups?.length - 1}
                      headerDepth={headerGroup.depth}
                      totalNumberOfHeaderDepth={headerGroups?.length - 1}
                    />
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tBody}>
            {/* placeholder for virtualization */}
            {paddingTop > 0 && (
              <tr className={styles.tBodyRow} aria-hidden={true}>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className={
                    row.getIsSelected() || row.getIsAllSubRowsSelected()
                      ? styles.tBodySelectedRow
                      : styles.tBodyRow
                  }
                >
                  {rowSelectionMode == "multiple" && (
                    <td className={styles.tBodyCell}>
                      <Checkbox
                        checked={
                          row.getIsSomeSelected()
                            ? "mixed"
                            : row.getIsSelected() ||
                              row.getIsAllSubRowsSelected()
                        }
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        aria-label="Select Row"
                      />
                    </td>
                  )}
                  {rowSelectionMode == "single" && (
                    <td className={styles.tBodyCell}>
                      <Radio
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        aria-label="Select Row"
                      />
                    </td>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          // background: cell.getIsGrouped()
                          //   ? "#0aff0082"
                          //   : cell.getIsAggregated()
                          //   ? "#ffa50078"
                          //   : cell.getIsPlaceholder()
                          //   ? "#ff000042"
                          //   : "white",

                          width: cell.column.getSize(),
                        },
                      }}
                      className={styles.tBodyCell}
                      // rowSpan={cell.getIsGrouped() ? row.subRows.length : undefined}
                    >
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <Button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? "pointer"
                                  : "normal",
                              },
                            }}
                            appearance="transparent"
                            icon={
                              row.getIsExpanded() ? (
                                <GroupExpandedIcon />
                              ) : (
                                <GroupCollapsedIcon />
                              )
                            }
                          >
                            <strong>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{" "}
                              ({row.subRows.length})
                            </strong>
                          </Button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        <strong>
                          {flexRender(
                            cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </strong>
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* placeholder for virtualization */}
            {paddingBottom > 0 && (
              <tr className={styles.tBodyRow} aria-hidden={true}>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
          {rowSelectionMode === "multiple" &&
            !isLoading &&
            !noItems &&
            !noSearchResult && (
              <tfoot className={styles.tFoot}>
                <tr>
                  <td className="p-1">
                    <Checkbox
                      checked={
                        table.getIsSomePageRowsSelected()
                          ? "mixed"
                          : table.getIsAllPageRowsSelected()
                      }
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      aria-label="Select All Current Page Rows"
                      title={"Select All Current Page Rows"}
                    />
                  </td>
                  <td colSpan={20}>
                    {table.getIsAllPageRowsSelected() ? "Unselect" : "Select"}{" "}
                    All Current Page Rows ({table.getRowModel().rows.length})
                  </td>
                </tr>
              </tfoot>
            )}
        </table>
        {isLoading && <Loading />}
        {noItems && <NoItemGrid message={props.noItemPage} />}
        {noSearchResult && <NoSearchResult message={props.noFilterMatchPage} />}
      </div>
    </>
  );
};
