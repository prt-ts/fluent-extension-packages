import { makeStyles } from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import { Column, Table } from '@tanstack/react-table';

type FilterNumberRangeProps<TItem extends object> = {
  column: Column<TItem, unknown>;
  table: Table<TItem>;
};

const useNumberRangeFilterStyles = makeStyles({
  searchInput: {
    width: '100%',
  },
  searchInputField: {
    width: '100%',
    flexGrow: 1,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
    marginLeft: '10px',
    marginRight: '10px',
  },
});

export const FilterDate = <TItem extends object>(
  props: FilterNumberRangeProps<TItem>
) => {
  const { column } = props;

  const columnFilterValue = column.getFilterValue();

  const min = column.getFacetedMinMaxValues()?.[0] ?? undefined;
  const max = column.getFacetedMinMaxValues()?.[1] ?? undefined;

  const onDateSelect: DatePickerProps['onSelectDate'] = (date) => {
    if(!date) {
      column.setFilterValue(undefined);
      return;
    };
    
    column.setFilterValue(date);
  };

  const styles = useNumberRangeFilterStyles();

  return (
    <div className={styles.searchContainer}>
      <DatePicker
        value={(columnFilterValue as Date) || null}
        min={min}
        max={max}
        onSelectDate={onDateSelect}
        className={styles.searchInput}
        placeholder={`Select a date`}
        size='small'
        allowTextInput
      />
    </div>
  );
};
