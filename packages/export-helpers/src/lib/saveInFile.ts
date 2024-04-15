import { saveAs } from 'file-saver';
import { createBlob } from "./createBlob";
import { fileInfo } from './Types';

export async function saveInFile(
  buffer: BlobPart,
  fileName: string,
  type: 'excel' | 'csv'
): Promise<void> {
  /* eslint-disable-next-line */
  return new Promise<void>(async (resolve, reject) => {
    try {
      const EXTENSION = fileInfo[type].extension;
      const data = createBlob(buffer, type);
      await saveAs(data, [fileName, EXTENSION].join('.'));
      resolve()
    } catch (error) {
      reject(error);
    }
  })
}