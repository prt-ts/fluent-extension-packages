import {
  Checkbox,
  Input,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import { Column, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { useVirtual } from 'react-virtual';

const useCheckboxFilterStyles = makeStyles({
  searchInput: {
    width: '90%',
    marginBottom: '8px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
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

  const filterContainer = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    parentRef: filterContainer,
    size: filterOptionsFiltered.length,
    overscan: 15,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

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
      <div
        key={'filter-multi-select-checkbox'}
        ref={filterContainer}
        className={styles.searchContainer}
      >
        {paddingTop > 0 && (
          <span style={{ paddingTop: `${paddingTop}px` }}></span>
        )}
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
        {virtualRows.map((row) => {
          const value = `${filterOptionsFiltered[row.index]}`;
          return (
            <Checkbox
              key={`${column.id}-${row.index}`}
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
          );
        })}
        {paddingBottom > 0 && (
          <span style={{ paddingBottom: `${paddingBottom}px` }}></span>
        )}
      </div>
    </div>
  );
};