import { FilterFn } from "@tanstack/react-table";

export const arrIncludesSome: FilterFn<unknown> = (row, columnId, value) => {
    // Rank the item
    const rowValue = row.getValue(columnId);
    const passed =
      Array.isArray(value) &&
      (value?.length === 0 || value.includes(`${rowValue}`));
  
    return passed;
  };