import * as React from "react";
import { TableProps, TableRef } from "../types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useStaticStyles } from "./table/useTableStaticStyles";
import { Pagination } from "./pagination";
import { GridHeader } from "./grid-header";
import { useGridContainer } from "./useGridContainer";
import { TableContainer } from "./table";
import { FilterDrawer } from "./filters";

export function AdvancedTable<TItem extends object>(
  props: TableProps<TItem>,
  ref: React.ForwardedRef<TableRef<TItem>>
) {
  const { table, globalFilter, setGlobalFilter } = useGridContainer(props, ref);
  useStaticStyles();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState<boolean>(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <GridHeader
        table={table}
        gridTitle={props.gridTitle}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        setFilterDrawerOpen={setIsFilterDrawerOpen}
        openFilterDrawer={isFilterDrawerOpen}
      />
      <div style={{ display: 'flex' }}>
        <TableContainer
          table={table}
          data={props.data}
          isLoading={props.isLoading || false}
          rowSelectionMode={props.rowSelectionMode}
          noFilterMatchPage={props.noFilterMatchPage}
          noItemPage={props.noItemPage}
        />
        <FilterDrawer
          open={isFilterDrawerOpen}
          setOpen={setIsFilterDrawerOpen}
          table={table}
        />
      </div>

      <Pagination table={table} pageSizeOptions={props.pageSizeOptions} />
    </DndProvider>
  );
}

export const ForwardedAdvancedTable = React.forwardRef(AdvancedTable) as <
  TItem extends object
>(
  props: TableProps<TItem> & { ref?: React.ForwardedRef<TableRef<TItem>> }
) => React.ReactElement<
  TableProps<TItem> & { ref?: React.ForwardedRef<TableRef<TItem>> }
>;
