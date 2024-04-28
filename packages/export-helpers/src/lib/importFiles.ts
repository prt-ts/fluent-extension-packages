/* eslint-disable */
export type ImportConfig = {
  headerRow?: number; 
  sheetIndex?: number;
};

/**
 *  Import an Excel file and return the data as an array of objects
 * @param file File to import
 * @param config  Configuration options
 * @returns  Promise<TItem[]>
 */
export const importExcelDocument = <TItem extends object>(file: File, config?: ImportConfig): Promise<TItem[]> => {
  try {

    const { headerRow, sheetIndex = 0 } = config || {};   

    return new Promise<TItem[]>((resolve, reject) => {
      import('exceljs').then(async (excel) => {
        const workbook = new excel.Workbook();
        const reader = new FileReader();
        reader.onload = async (event) => {
          const buffer = event.target?.result as ArrayBuffer;
          const data = new Uint8Array(buffer);
          await workbook.xlsx.load(data);

          const worksheet = workbook.worksheets[sheetIndex];
          if (!worksheet) {
            reject(new Error(`Sheet ${sheetIndex} not found`));
            return;
          }
          const rawRows = worksheet.getSheetValues();

          let items : TItem[] = [];

          if (headerRow && rawRows.length > 0) {

            // Extract header row
            const header = rawRows[headerRow] || [];
            console.log('header:', header);

            // Remove header row from data
            rawRows.splice(headerRow, 1);

            // Map rows to objects
            rawRows.forEach((row) => { 
              const obj: TItem = Object.create(null);
              ((header || [])as any)?.forEach((key: keyof TItem, index: number) => {
                const value = (row as any)?.[index] || '';
                obj[key] = value;
              });
              items.push(obj);
            });
          }
          else {
            // No header row specified, return raw data
            items = rawRows.map((row) => {
              const obj: TItem = Object.create(null);
              (row as any)?.forEach((value: any, index: number) => {
                // eslint-disable-next-line
                (obj as any)[index] = value;
              });
              return obj;
            });
          }

          // Return the parsed data
          resolve(items);
        };

        reader.onerror = (event) => {
          reject(event.target?.error);
        };

        // Read the file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
      });
    });
  } catch (error) {
    console.error('Error parsing file:', error);
    return Promise.reject(error);
  }
};

/**
 *  Import a CSV file and return the data as an array of objects
 * @param file File to import
 * @returns  Promise<TItem[]>
 */
export const importCsvDocument = <TItem extends object>(file: File, config: ImportConfig): Promise<TItem[]> => {
  try {
    return new Promise<TItem[]>((resolve, reject) => {

      // get config
      const { headerRow = 1 } = config || {};

      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result as string;
        const rows = data.split('\n');
        const header = rows[headerRow - 1].split(',');
        const items = rows.slice(1).map((row) => {
          const obj: TItem = Object.create(null);
          const values = row.split(',');
          header.forEach((key, index) => {
            const value = (values[index] || '').trim();
            // eslint-disable-next-line
            (obj as any)[key] = values[index];
          });
          return obj;
        });
        resolve(items);
      };

      reader.onerror = (event) => {
        reject(event.target?.error);
      };

      // Read the file as text
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error parsing file:', error);
    return Promise.reject(error);
  }
};

