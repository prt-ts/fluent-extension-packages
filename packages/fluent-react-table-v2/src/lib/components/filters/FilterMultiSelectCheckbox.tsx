import {
  Checkbox,
  Input,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import { Column, RowData, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import * as React from 'react';

const useCheckboxFilterStyles = makeStyles({
  searchInput: {
    width: '90%',
    marginBottom: '8px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  searchContainer: {
    maxHeight: '300px',
    width: '100%',
    ...shorthands.overflow('auto', 'auto'),
    ...shorthands.padding('0px', "0px", "2px", '0px'),

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

export const FilterMultiSelectCheckbox = <TItem extends RowData>({
  column,
  table,
}: {
  column: Column<TItem, unknown>;
  table: Table<TItem>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue() as string[];
  const [filterOptions, setFilterOptions] = React.useState<string[]>([]);
  React.useEffect(
    () => {
      const uniqueSortedOptions =
        typeof firstValue === 'number' || !isNaN(firstValue as number)
          ? Array.from(column.getFacetedUniqueValues().keys()).sort(
            (a, b) => Number(a) - Number(b)
          )
          : Array.from(column.getFacetedUniqueValues().keys()).sort();
      setFilterOptions(uniqueSortedOptions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()]
  );

  const [localColumnFilterValue, setLocalColumnFilterValue] =
    React.useState<string>('');
  const filterOptionsFiltered = React.useMemo(() => {
    if (!localColumnFilterValue) return filterOptions;
    return filterOptions.filter((option) =>
      `${option}`
        ?.toLowerCase()
        ?.includes(`${localColumnFilterValue}`?.toLowerCase())
    );
  }, [localColumnFilterValue, filterOptions]);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: filterOptionsFiltered?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const allOptionChecked =
    columnFilterValue?.length > 0 &&
      columnFilterValue?.length !== filterOptions?.length
      ? 'mixed'
      : columnFilterValue?.length === filterOptions?.length &&
      filterOptions?.length > 0;

  const styles = useCheckboxFilterStyles();

  return (
    <div>
      <Input
        type='search'
        value={localColumnFilterValue}
        onChange={(_, data) => setLocalColumnFilterValue(data.value)}
        placeholder="Search Options..."
        size="small"
        className={styles.searchInput}
      />
      <div ref={parentRef} className={styles.searchContainer}>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>

          <Checkbox
            key={`toggle-all-${column.id}`}
            checked={allOptionChecked}
            onChange={() => {
              if (columnFilterValue?.length > 0) {
                column.setFilterValue(undefined);
                return;
              }
              column.setFilterValue([
                ...(filterOptions?.map((x) => `${x}`) || []),
              ]);
            }}
            label={'(Toggle All)'}
          />
          {(virtualItems || []).map((row, index) => {
            const value = `${filterOptionsFiltered[row.index]}`;
            return (
              <div
                key={`${column.id}-${row.index}`}
                style={{
                  height: `${row.size}px`,
                  transform: `translateY(${row.start - index * row.size}px)`,
                }}>
                <Checkbox

                  checked={columnFilterValue?.includes(value) ?? false}
                  onChange={() => {
                    if (columnFilterValue?.includes(value)) {
                      column.setFilterValue((old: string[]) =>
                        old?.filter((v) => v !== value)
                      );
                      return;
                    }
                    column.setFilterValue((old: string[]) => [
                      ...(old || []),
                      value,
                    ]);
                  }}
                  label={value}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
