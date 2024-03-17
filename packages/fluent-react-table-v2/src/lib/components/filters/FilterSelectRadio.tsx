import { Input, Radio, RadioGroup, makeStyles, shorthands } from "@fluentui/react-components";
import { Column, RowData, Table } from "@tanstack/react-table";
import { useVirtualizer } from '@tanstack/react-virtual';
import * as React from "react"

const useRadioFilterStyles = makeStyles({
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

export const FilterSelectRadio = <TItem extends RowData>({
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

  const styles = useRadioFilterStyles();
  return (
    <div>
      <Input
        value={localColumnFilterValue}
        onChange={(_, data) => setLocalColumnFilterValue(data.value)}
        placeholder="Search Options..."
        size="small"
        className={styles.searchInput}
      />
      <div ref={parentRef} className={styles.searchContainer}>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <RadioGroup
            layout="vertical"
            value={columnFilterValue?.[0] || ''}
            onChange={(_, data) => {
              if (data.value === '') {
                column.setFilterValue([]);
                return;
              }
              column.setFilterValue([data.value]);
            }}
          >
            <Radio value={''} label={'None'} />
            {(virtualItems || []).map((row, index) => {
              const value = filterOptionsFiltered[row.index];
              return (
                <div
                  key={`${column.id}-${row.index}`}
                  style={{
                    height: `${row.size}px`,
                    transform: `translateY(${row.start - index * row.size}px)`,
                  }}>
                  <Radio key={value} value={value} label={value} />
                </div>);
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
