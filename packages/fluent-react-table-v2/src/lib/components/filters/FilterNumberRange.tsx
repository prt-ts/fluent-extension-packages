import { Field, Input, InputProps, makeStyles } from '@fluentui/react-components';
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
    marginBottom: '8px',
    marginLeft: '10px',
    marginRight: '10px',
  }
});

export const FilterNumberRange = <TItem extends object>(
  props: FilterNumberRangeProps<TItem>
) => {
  const { column } = props;

  const columnFilterValue = column.getFilterValue();

  const min = Number(column.getFacetedMinMaxValues()?.[0] ?? '');
  const max = Number(column.getFacetedMinMaxValues()?.[1] ?? '');

  const handleMinChange : InputProps["onChange"] = (e, data) => {
    const value = Number(data.value);
    column.setFilterValue((old: [number, number]) => [value, old?.[1]]);
  };

  const handleMaxChange : InputProps["onChange"] = (e, data) => {
    const value = Number(data.value);
    column.setFilterValue((old: [number, number]) => [old?.[0], value]);
  };

  const styles = useNumberRangeFilterStyles();

  return (
    <div className={styles.searchContainer}>
      <Field label={'Min:'} size="small" className={styles.searchInputField}>
        <Input
          type="number"
          value={`${(columnFilterValue as [number, number])?.[0] || ''}`}
          min={min}
          max={max}
          onChange={handleMinChange}
          className={styles.searchInput}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
        />
      </Field>
      <Field label={'Max:'} size="small" className={styles.searchInputField}>
        <Input
          type="number"
          value={`${(columnFilterValue as [number, number])?.[1] || ''}`}
          min={min}
          max={max}
          onChange={handleMaxChange}
          className={styles.searchInput}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
        />
      </Field>
    </div>
  );
};
