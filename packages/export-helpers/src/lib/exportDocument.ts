import { ExportFileInfo } from "./Types";
import { createDocumentBuffer } from "./createDocumentBuffer";
import { saveInFile } from "./saveInFile";

export async function exportDocument(fileInfo: ExportFileInfo): Promise<void> {
    /* eslint-disable-next-line */
    return new Promise<void>(async (resolve, reject) => {
        try {
            const documentBuffer = await createDocumentBuffer(fileInfo);
    
            const { type = "excel", fileName = "Downloads" } = fileInfo;
            await saveInFile(documentBuffer, fileName, type);

            resolve();
    
        } catch (error) {
            console.error(error);
            reject(error)
        }
    })
}