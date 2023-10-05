import * as React from 'react';
import { tryGetObjectValue } from '../components';

export function fieldSorter<TItem>(fields: string[]) {
  return function (first: TItem, second: TItem) {
    return fields
      .map(function (field: string) {
        let dir = 1;
        if (field[0] === '-') {
          dir = -1;
          field = field.substring(1);
        }

        const firstValue = tryGetObjectValue(field, first);
        const secondValue = tryGetObjectValue(field, second);

        // if date
        if (isDate(firstValue)) {
          const compResult =
            new Date(firstValue).getTime() - new Date(secondValue).getTime();
          return compResult * dir;
        }
        // if number
        else if (isNumber(firstValue)) {
          const compResult = firstValue - secondValue;
          return compResult * dir;
        }
        // if string
        else if (isString(firstValue)) {
          const compResult = firstValue.localeCompare(secondValue, 'en', {
            sensitivity: 'case',
          });
          return compResult * dir;
        }
        // if else
        else {
          if (firstValue > secondValue) return dir;
          if (secondValue < secondValue) return -dir;
          return 0;
        }
      })
      .reduce(function firstNonZeroValue(p, n) {
        return p ? p : n;
      }, 0);
  };
}

export const isString = (value: unknown) =>
  typeof value === 'string' || value instanceof String;
export const isNumber = (value: unknown) =>
  typeof value === 'number' || value instanceof Number;
export const isDate = (value: unknown) =>
  (Object.prototype.toString.call(value) === '[object Date]') ||
  (value instanceof Number) ||
  (new Date(value as string) as any !== 'Invalid Date' && !isNaN(new Date(value as string).getDate()));

export function useTableSorting<
  TItem extends NonNullable<{ id: string | number }>
>(defaultSortedColumnIds: string[]) {
  const [sortedColumns, setSortedColumns] = React.useState<string[]>(
    defaultSortedColumnIds
  );

  const applySort = React.useCallback(
    (allSortColumns: string[], items: TItem[]): TItem[] => {
      if (allSortColumns?.length === 0) {
        // if no sort column, skip sort
        return items;
      }

      const sortedItems = [...items.sort(fieldSorter(allSortColumns))];

      // return shallow copy of the array
      return sortedItems;
    },
    []
  );

  const resetSortColumns = React.useCallback(
    (): void => setSortedColumns([]),
    []
  );
  const toggleSortColumn = React.useCallback(
    (newColumnId: string, retainExisting = false): void => {
      if (!isColumnSorted(newColumnId)) {
        setSortedColumns((existing) =>
          retainExisting ? [newColumnId, ...existing] : [newColumnId]
        );
        return;
      }

      const direction = isSortedAscending(newColumnId) ? '-' : '';
      setSortedColumns((existing) => {
        const otherColumns = existing?.filter((e) => !e?.includes(newColumnId));

        return retainExisting
          ? [`${direction}${newColumnId}`, ...otherColumns]
          : [`${direction}${newColumnId}`];
      });
    },
    [sortedColumns]
  );

  const isColumnSorted = React.useCallback(
    (columnId: string) => sortedColumns?.some((sc) => sc?.includes(columnId)),
    [sortedColumns]
  );
  const isSortedAscending = React.useCallback(
    (columnId: string) =>
      sortedColumns?.some((sc) => sc?.includes(columnId) && sc?.[0] !== '-'),
    [sortedColumns]
  );

  return {
    sortedColumns,

    applySort,
    toggleSortColumn,
    resetSortColumns,

    isColumnSorted,
    isSortedAscending,
  } as const;
}
