/* eslint-disable */
import { saveAs } from 'file-saver';

const fileInfo = {
  excel: {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    extension: 'xlsx',
  },
  csv: {
    type: 'data:text/csv;charset=utf-8',
    extension: 'csv',
  },
};

export type ExportFileInfo = {
  sheets: {
    sheetName: string;
    data: any[];
  }[]
}

export function exportToFile(
  fileInfo: ExportFileInfo,
  fileName = 'downloads',
  type: 'excel' | 'csv' = 'excel'
) {
  import('xlsx').then((XLSX) => {
    /* create a new blank workbook */
    var workbook = XLSX.utils.book_new();

    const sheets = fileInfo.sheets;

    let i = 1;
    for (const sheet of sheets) {
      /* make worksheet */
      var worksheet = XLSX.utils.json_to_sheet(sheet.data);

      /* Add the worksheet to the workbook */
      const sheetName = sheet.sheetName || 'Sheet ' + i++;
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const excelBuffer: any = XLSX.write(workbook, {
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
