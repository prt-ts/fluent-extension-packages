/* eslint-disable */
import { CellValue, DataValidation, Style } from 'exceljs';
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
} as const;

export type CellStyle = Partial<Style>;

type SimpleFormat = string | number | boolean;
type ComplexFormat = {
  value: CellValue,
  cellStyle?: CellStyle,
  dataValidation?: DataValidation
}

export type ExportData = Record<string, SimpleFormat | ComplexFormat>[];

export type ExportFileInfo = {
  fileName?: string,
  type: 'excel' | 'csv',
  sheets: {
    isProtected?: boolean,
    sheetName?: string;
    data?: ExportData,
    headerCellStyle?: Record<string, CellStyle>
  }[]
}


/**
 * please use exportDocument instead
 * @param fileInfo 
 * @param fileName 
 * @param type 
 * @deprecated
 */
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
      var worksheet = XLSX.utils.json_to_sheet(sheet.data || []);

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

export function exportDocument(fileInfo: ExportFileInfo) {

  import('exceljs').then(async (excel) => {
    /* create a new blank workbook */
    const workbook = new excel.Workbook();

    // for each sheet create sheet in workbook
    let index = 1;
    for (const sheet of (fileInfo.sheets || [])) {

      // prepare sheet name and create new sheet
      const { sheetName = `Sheet ${index}` } = sheet;
      const ws = workbook.addWorksheet(sheetName);

      // prepare header
      // -- get header form data keys
      const { data } = sheet;
      if (!data?.length) {
        // if data does not exists, return
        return;
      }

      // create headers column
      const headers = Object.keys(data?.[0]);
      ws.columns = headers.map(header => ({
        header: header,
        key: header,
        width: header?.length + 15
      }));

      // format header
      const { headerCellStyle = {} } = sheet;

      headers.forEach((header, i) => {
        const headerCell = ws.getRow(1).getCell(i + 1);

        const {
          fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFADD8E6' },
          },
          font = {
            size: 13,
            bold: true
          },
          alignment = null,
          border = null,
          protection = null
        } = headerCellStyle[header] || {};

        headerCell.fill = fill;
        headerCell.font = font;

        if (alignment) {
          headerCell.alignment = alignment
        }

        if (border) {
          headerCell.border = border
        }

        if (protection) {
          headerCell.protection = protection
        }
      })
      // format columns 
      // ws.columns.map((col, index) => (col.width = (headers[index]?.length + 5)));

      // insert rows for each data and format
      data.forEach((item, rowIndex) => {
        const dataRow = ws.getRow(rowIndex + 2);
        headers.forEach((key, colIndex) => {

          const rowCell = dataRow.getCell(colIndex + 1);
          const dataPoint = item[key];
          const isComplexFormat = typeof dataPoint === "object";

          rowCell.value = isComplexFormat ? (dataPoint.value ?? "") as CellValue : dataPoint;

          // if it is not complex type return
          if (!isComplexFormat) return;

          // check if any formats exists
          const { cellStyle } = dataPoint;
          if (cellStyle) {
            // check for further format and apply
            if ("numFmt" in cellStyle && cellStyle["numFmt"] !== undefined) {
              rowCell.numFmt = cellStyle.numFmt
            }
            if ("font" in cellStyle && cellStyle["font"] !== undefined) {
              rowCell.font = cellStyle.font
            }
            if ("alignment" in cellStyle && cellStyle["alignment"] !== undefined) {
              rowCell.alignment = cellStyle.alignment
            }
            if ("protection" in cellStyle && cellStyle["protection"] !== undefined) {
              rowCell.protection = cellStyle.protection
            }
            if ("border" in cellStyle && cellStyle["border"] !== undefined) {
              rowCell.border = cellStyle.border
            }
            if ("fill" in cellStyle && cellStyle["fill"] !== undefined) {
              rowCell.fill = cellStyle.fill
            }
          }

          const { dataValidation } = dataPoint;
          if (dataValidation) {
            rowCell.dataValidation = dataValidation
          } 
        })
      });

       // enable auto-filter
       ws.autoFilter = {
        from: {
          row: 1,
          column: 1
        },
        to: {
          row: 1,
          column: headers.length
        }
      }

      // set sheet protections
      if(sheet.isProtected){
        ws.protect('Pa$$w0Rd', {
          formatCells: true,
          formatColumns: true,
          formatRows: true,
          insertRows: false,
          insertColumns: false,
          insertHyperlinks: true,
          deleteRows: true,
          deleteColumns: false,
          sort: true,
          autoFilter: true
        });
      }      
    }

    // create blob
    const dataBlob = await workbook.xlsx.writeBuffer();

    // save to file
    const { fileName = "download", type = "excel" } = fileInfo;
    saveAsExcelFile(dataBlob, fileName, type);
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

export function exportToPdfDocument(
  docDefinition: any,
  fileName: string = 'document',
  printMode: 'print' | 'open' | 'download' = 'print'
) {
  // import pdfMake and download the fonts
  import('pdfmake/build/pdfmake').then((pdfMake) => {
    import('pdfmake/build/vfs_fonts').then((vfsFonts) => {
      pdfMake.vfs = vfsFonts.pdfMake.vfs;
      if (printMode == 'print') {
        pdfMake.createPdf(docDefinition).print();
      } else if (printMode == 'download') {
        pdfMake.createPdf(docDefinition).download(fileName);
      } else {
        pdfMake.createPdf(docDefinition).open();
      }
    });
  });
};
