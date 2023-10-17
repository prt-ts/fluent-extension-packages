/* eslint-disable */
import { saveAs } from 'file-saver';

const fileInfo = {
  excel: {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    extension: '.xlsx',
  },
  csv: {
    type: 'data:text/csv;charset=utf-8',
    extension: '.csv',
  },
};

export function exportToFile(data: any[], fileName = "downloads", type: 'excel' | 'csv'= "excel") {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    saveAsExcelFile(excelBuffer, fileName, type);
  });
}

function saveAsExcelFile(
  buffer: any,
  fileName: string,
  type: 'excel' | 'csv'
): void {
  const TYPE = fileInfo[type].type;
  const EXTENSION = fileInfo[type].extension;
  const data: Blob = new Blob([buffer], {
    type: TYPE,
  });
  saveAs(data, [fileName, EXTENSION].join('.'));
}
