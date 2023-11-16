import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  Caption1Stronger,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { Table, flexRender } from '@tanstack/react-table';
import { Filter } from './Filter';

type FilterDrawerProps<TItem extends object> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Table<TItem>;
};

export const FilterDrawer = <TItem extends object>({
  open,
  setOpen,
  table
}: FilterDrawerProps<TItem>) => {

  const headerGroups = table.getHeaderGroups();

  return (
    <InlineDrawer position="end" open={open}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setOpen(false)}
            />
          }
        >
          Advance Filters
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        {headerGroups.map((headerGroup) => {
          const canApplyFilter = headerGroup.depth === headerGroups?.length - 1;

          if(!canApplyFilter) return null;

          return headerGroup.headers.map((header) => {
            const canFilter = header.column.getCanFilter();
            if (!canFilter) return null;

            return (
              <div key={header.column.id}>
                {header.column.getCanFilter() && (
                  <div key={'filter-group'}>
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
    </InlineDrawer>
  );
};
