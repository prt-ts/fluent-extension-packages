import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  shorthands,
  MenuList,
  MenuDivider,
  MenuItemRadio,
  MenuProps,
  DrawerFooter,
  MenuItem,
} from '@fluentui/react-components';
import { Dismiss24Regular, ViewDesktop20Filled, ViewDesktop20Regular } from '@fluentui/react-icons';
import { TableView } from '../../types';
import { RowData, Table, TableState } from '@tanstack/react-table';
import { ClearFilterIcon } from '../icon-components/GridIcons';
import { ViewSaveForm } from './ViewSaveForm';

const useFilterDrawerStyles = makeStyles({
  drawerBody: {
    ...shorthands.overflow('hidden', 'auto'),
    /* width */

    ':hover': {
      ...shorthands.overflow('auto', 'auto'),
    },

    '::-webkit-scrollbar': {
      width: '6px',
      height: '4px',
      ...shorthands.borderRadius('50%'),
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      'background-color': '#f1f1f1',
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      'background-color': '#888',
    },

    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      'background-color': '#555',
    },
  },
});

type ViewsDrawerProps<TItem extends RowData> = {
  table: Table<TItem>;
  tableViews: TableView[];
  applyTableState: (tableView: TableState) => boolean;
  resetToGridDefaultView: () => boolean;
};

export const ViewsDrawer = <TItem extends RowData>(props: ViewsDrawerProps<TItem>) => {

  const { table, tableViews, applyTableState, resetToGridDefaultView } = props;
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const { dispatchDrawerAction, drawerState } = table.options.meta!;

  const { onTableViewDelete, onTableViewSave} = table.options.meta || {}
  const [checkedValues, setCheckedValues] = React.useState<
    Record<string, string[]>
  >({ font: ["calibri"] });
  const onChange: MenuProps["onCheckedValueChange"] = (
    e,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => ({ ...s, [name]: checkedItems }));
  };

  const styles = useFilterDrawerStyles();
  return (
    <InlineDrawer position="end" open={drawerState.isViewsDrawerOpen} separator>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => dispatchDrawerAction?.({ type: "CLOSE_VIEW_DRAWER" })}
            />
          }
        >
          Table Views
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        {onTableViewSave && <ViewSaveForm mode='create' getTableState={table.getState} onSave={onTableViewSave} />}
        <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
          <MenuItemRadio
            name='table-views'
            value='Default View'
            icon={<ViewDesktop20Filled />}
            onClick={resetToGridDefaultView}
          >
            Default View
          </MenuItemRadio>
          {
            tableViews.length > 0 && <MenuDivider>Additional Views</MenuDivider>
          }
          {
            tableViews.map((view) => {
              return (
                <div
                  key={view.id + view.viewName}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <MenuItemRadio
                    name="table-views"
                    value={view.viewName}
                    onClick={() => applyTableState(view.tableState as TableState)}
                    icon={<ViewDesktop20Regular />}
                  >
                    {view.viewName}
                  </MenuItemRadio>
                  {onTableViewDelete && view?.isViewOwner && (
                    <Button
                      appearance="subtle"
                      aria-label="Close"
                      icon={<Dismiss24Regular />}
                      onClick={() => onTableViewDelete?.(view)}
                    />
                  )}
                </div>
              );
            })
          }
        </MenuList>
      </DrawerBody>
      <DrawerFooter>
        <MenuList>
          <MenuDivider />
          <MenuItem icon={<ClearFilterIcon />} onClick={resetToGridDefaultView}>
            Reset to Default View
          </MenuItem>
        </MenuList>
      </DrawerFooter>
    </InlineDrawer>
  );
};
