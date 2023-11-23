import {
  Field,
  makeStyles,
} from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import { Column, Table } from '@tanstack/react-table';
import React from 'react';

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

export const FilterDateRange = <TItem extends object>(
  props: FilterNumberRangeProps<TItem>
) => {
  const { column } = props;

  const columnFilterValue = column.getFilterValue();

  const min = column.getFacetedMinMaxValues()?.[0] ?? undefined;
  const max = column.getFacetedMinMaxValues()?.[1] ?? undefined;

  const handleMinChange: DatePickerProps['onSelectDate'] = (date) => {
    if(!date) {
      column.setFilterValue((old: [Date, Date]) => [undefined, old?.[1]]);
      return;
    };
    column.setFilterValue((old: [Date, Date]) => [date, old?.[1]]);
  };

  const handleMaxChange: DatePickerProps['onSelectDate'] = (date) => {
    if(!date) {
      column.setFilterValue((old: [Date, Date]) => [old?.[0], undefined]);
      return;
    };
    column.setFilterValue((old: [Date, Date]) => [old?.[0], date]);
  };

  const styles = useNumberRangeFilterStyles();

  return (
    <div className={styles.searchContainer}>
      <Field
        label={'From Date:'}
        size="small"
        className={styles.searchInputField}
      >
        <DatePicker
          value={(columnFilterValue as [Date, Date])?.[0] || null}
          min={min}
          max={max}
          onSelectDate={handleMinChange}
          className={styles.searchInput}
          placeholder={`From Date`}
          size='small'
          allowTextInput
        />
      </Field>
      <Field
        label={'To Date:'}
        size="small"
        className={styles.searchInputField}
      >
        <DatePicker
          value={(columnFilterValue as [Date, Date])?.[1] || null}
          min={min}
          max={max}
          onSelectDate={handleMaxChange}
          className={styles.searchInput}
          placeholder={`To Date`}
          size='small'
          allowTextInput 
        />
      </Field>
    </div>
  );
};
