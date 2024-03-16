import * as React from "react";
import { TableProps, TableRef } from "../types";
import { useStaticStyles } from "./table/useTableStaticStyles";
import { Pagination } from "./pagination";
import { GridHeader } from "./grid-header";
import { useGridContainer } from "./useGridContainer";
import { TableContainer } from "./table";
import { FilterDrawer } from "./filters";
import { ViewsDrawer } from "./views/ViewsDrawer";
import { tableReducer } from "./reducer";
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'


export function AdvancedTable<TItem extends object>(
  props: TableProps<TItem>,
  ref: React.ForwardedRef<TableRef<TItem>>
) {
  useStaticStyles();
  const { table, globalFilter, headerMenu, tableViews, setGlobalFilter, resetToDefaultView, applyTableState } = useGridContainer(props, ref);

  const [drawerState, dispatch] = React.useReducer<typeof tableReducer<string>>(
    tableReducer,
    {
      isFilterDrawerOpen: false,
      isViewsDrawerOpen: false
    }
  );
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active?.id !== over?.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active?.id as string);
        const newIndex = items.indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  )

  return (
    <DndContext collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy} >
        <GridHeader
          table={table}
          gridTitle={props.gridTitle}
          headerMenu={headerMenu}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          applyTableState={applyTableState}
          drawerState={drawerState}
          dispatch={dispatch}
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
            drawerState={drawerState}
            dispatch={dispatch}
            table={table}
          />
          <ViewsDrawer
            table={table}
            drawerState={drawerState}
            dispatch={dispatch}
            tableViews={tableViews}
            applyTableState={applyTableState}
            resetToGridDefaultView={resetToDefaultView}
            onTableViewSave={props.onTableViewSave}
            onTableViewDelete={props.onTableViewDelete}
          />
        </div>

        <Pagination table={table} pageSizeOptions={props.pageSizeOptions} />
      </SortableContext>
    </DndContext>
  );
}

export const ForwardedAdvancedTable = React.forwardRef(AdvancedTable) as <
  TItem extends object
>(
  props: TableProps<TItem> & { ref?: React.ForwardedRef<TableRef<TItem>> }
) => React.ReactElement<
  TableProps<TItem> & { ref?: React.ForwardedRef<TableRef<TItem>> }
>;
