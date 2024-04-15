import { ExportFileInfo } from './Types';
import { saveInFile } from './saveInFile';

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
      const workbook = XLSX.utils.book_new();
  
      const sheets = fileInfo.sheets;
  
      let i = 1;
      for (const sheet of sheets) {
        /* make worksheet */
        const worksheet = XLSX.utils.json_to_sheet(sheet.data || []);
  
        /* Add the worksheet to the workbook */
        const sheetName = sheet.sheetName || 'Sheet ' + i++;
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
  
      const excelBuffer: BlobPart = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      saveInFile(excelBuffer, fileName, type);
    });
  }