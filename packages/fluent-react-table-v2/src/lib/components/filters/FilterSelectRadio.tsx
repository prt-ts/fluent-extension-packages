import { Input, Radio, RadioGroup, makeStyles, shorthands } from "@fluentui/react-components"
import { Column, RowData, Table } from "@tanstack/react-table"
import * as React from "react"
import { useVirtual } from "react-virtual"

const useRadioFilterStyles = makeStyles({
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
      <div ref={filterContainer} className={styles.searchContainer}>
        {paddingTop > 0 && <div style={{ paddingTop: `${paddingTop}px` }} />}
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
          {virtualRows.map((row) => {
            const value = filterOptionsFiltered[row.index];
            return <Radio key={value} value={value} label={value} />;
          })}
        </RadioGroup>
        {paddingBottom > 0 && (
          <div style={{ paddingBottom: `${paddingBottom}px` }}></div>
        )}
      </div>
    </div>
  );
};