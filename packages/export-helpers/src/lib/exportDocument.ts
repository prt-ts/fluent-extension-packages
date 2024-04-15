import { ExportFileInfo } from "./Types";
import { createDocumentBuffer } from "./createDocumentBuffer";
import { saveInFile } from "./saveInFile";

export async function exportDocument(fileInfo: ExportFileInfo) {
    try {
        const documentBuffer = await createDocumentBuffer(fileInfo);

        const { type = "excel", fileName = "Downloads" } = fileInfo;
        saveInFile(documentBuffer, fileName, type)

    } catch (error) {
        console.error(error)
    }
}