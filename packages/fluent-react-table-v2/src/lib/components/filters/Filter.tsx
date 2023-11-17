import { Column, Table } from '@tanstack/react-table';
import { FilterMultiSelectCheckbox } from './FilterMultiSelectCheckbox';
import { Field, Input, makeStyles } from '@fluentui/react-components';
import { FilterMultiSelectRadio } from './FilterMultiSelectRadio';
import { FilterNumberRange } from './FilterNumberRange';

const useFilterStyles = makeStyles({
  searchInput: {
    width: '100%',
  },
  searchInputField: {
    width: '100%',
    flexGrow: 1,
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '8px',
    marginLeft: '10px',
    marginRight: '10px',
  },
});

export const Filter = <TItem extends object>({
  column,
  table,
}: {
  column: Column<TItem, unknown>;
  table: Table<TItem>;
}) => {
  const filterFunctionName = column.columnDef.filterFn;

  console.log('filterFunctionName', filterFunctionName);

  const styles = useFilterStyles();

  switch (filterFunctionName) {
    case 'arrIncludesSome':
      return <FilterMultiSelectCheckbox column={column} table={table} />;
    case 'arrIncludesAll':
      return <FilterMultiSelectRadio column={column} table={table} />;
    case 'arrIncludes':
      return <FilterMultiSelectRadio column={column} table={table} />;
    case 'inNumberRange':
      return <FilterNumberRange column={column} table={table} />;
  }

  return (
    <div className={styles.searchContainer}>
      <Field size='small' className={styles.searchInputField}>
        <Input
          value={(column.getFilterValue() || '') as string}
          onChange={(_, data) => {
            column.setFilterValue(data.value);
          }}
          placeholder="Search Keyword..."
          size="small"
          className={styles.searchInput}
        />
      </Field>
    </div>
  );
};
