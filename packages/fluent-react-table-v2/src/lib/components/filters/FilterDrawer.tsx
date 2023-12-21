import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  Caption1Stronger,
  makeStyles,
  shorthands,
  DrawerFooter, 
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { Table, flexRender } from '@tanstack/react-table';
import { Filter } from './Filter';
import { ActionType, DrawerTableState } from '../reducer';
import { ClearFilterIcon } from '../icon-components/GridIcons';


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

type FilterDrawerProps<TItem extends object> = {
  drawerState: DrawerTableState,
  dispatch: React.Dispatch<ActionType<string>>
  table: Table<TItem>;
};

export const FilterDrawer = <TItem extends object>({
  drawerState,
  dispatch,
  table
}: FilterDrawerProps<TItem>) => {

  const headerGroups = table.getHeaderGroups();
  const styles = useFilterDrawerStyles();

  const resetAllFilters = React.useCallback(() => {
    table.setGlobalFilter('');
    table.resetColumnFilters();
  }, [table]);

  return (
    <InlineDrawer position="end" open={drawerState.isFilterDrawerOpen} separator>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => dispatch({ type : "CLOSE_FILTER_DRAWER" })}
            />
          }
        >
          Advanced Filters
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        {headerGroups.map((headerGroup) => {
          const canApplyFilter = headerGroup.depth === headerGroups?.length - 1;

          if (!canApplyFilter) return null;

          return headerGroup.headers.map((header) => {
            const canFilter = header.column.getCanFilter();
            if (!canFilter) return null;

            return (
              <div key={header.column.id}>
                {header.column.getCanFilter() && (
                  <div key={'filter-group'} style={{
                    marginTop: "20px",
                  }}> 
                    <Caption1Stronger>
                      Filter by{' '}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Caption1Stronger>
                    <Filter column={header.column} table={table} />
                  </div>
                )}
              </div>
            );
          });
        })}
      </DrawerBody>
      <DrawerFooter>
        <Button icon={<ClearFilterIcon />} onClick={resetAllFilters} style={{width: "100%"}}>
          Clear All Filters
        </Button>
      </DrawerFooter>
    </InlineDrawer>
  );
};
