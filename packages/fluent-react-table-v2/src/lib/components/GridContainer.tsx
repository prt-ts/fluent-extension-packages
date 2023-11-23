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
import { ViewsDrawer } from "./views/ViewsDrawer";

export function AdvancedTable<TItem extends object>(
  props: TableProps<TItem>,
  ref: React.ForwardedRef<TableRef<TItem>>
) {
  useStaticStyles();
  const { table, globalFilter, headerMenu, tableViews, setGlobalFilter, resetToDefaultView, applyTableState, getTableState } = useGridContainer(props, ref);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState<boolean>(false);
  const [isViewsDrawerOpen, setIsViewsDrawerOpen] = React.useState<boolean>(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <GridHeader
        table={table}
        gridTitle={props.gridTitle}
        headerMenu={headerMenu}
        globalFilter={globalFilter}
        openFilterDrawer={isFilterDrawerOpen}
        openViewsDrawer={isViewsDrawerOpen}
        setGlobalFilter={setGlobalFilter}
        setFilterDrawerOpen={setIsFilterDrawerOpen}
        setViewsDrawerOpen={setIsViewsDrawerOpen}
        applyTableState={applyTableState}
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
        <ViewsDrawer
          table={table}
          open={isViewsDrawerOpen}
          setOpen={setIsViewsDrawerOpen}
          tableViews={tableViews}
          applyTableState={applyTableState}
          resetToGridDefaultView={resetToDefaultView}
          getTableState={getTableState}
          onTableViewSave={props.onTableViewSave}
          onTableViewDelete={props.onTableViewDelete}
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
