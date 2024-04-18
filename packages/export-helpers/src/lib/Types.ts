import { CellValue, DataValidation, Style } from "exceljs";

export const fileInfo = {
    excel: {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      extension: 'xlsx',
    },
    csv: {
      type: 'data:text/csv;charset=utf-8',
      extension: 'csv',
    },
  } as const;

export type CellStyle = Partial<Style>; 

export type ComplexFormat = {
  value: CellValue,
  cellStyle?: CellStyle,
  dataValidation?: DataValidation
}

export type ExportData = Record<string, CellValue | ComplexFormat>;

export type ExportFileInfo = {
  fileName?: string,
  type?: 'excel' | 'csv',
  sheets: {
    isProtected?: boolean,
    sheetName?: string;
    data?: ExportData[],
    headerCellStyle?: Record<string, CellStyle>
  }[]
}
