/* eslint-disable  */
import { IFileAddResult, IFileInfo } from "@pnp/sp/files";
import { getSP } from "../pnp";

export type ChoiceFieldOption = {
    value: string;
    label: string;
};

export const DocumentLibraryService = () => {
    (async () => { })();

    const getDocuments = async (
        documentRelativePath: string
    ): Promise<IFileInfo[]> => {
        return new Promise<IFileInfo[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();

                const files = await sp.web
                    .getFolderByServerRelativePath(documentRelativePath)
                    .files();

                resolve(files);
            } catch (error) {
                reject(error);
            }
        });
    };

    const uploadDocuments = async (
        documentRelativePath: string,
        documents: File[]
    ): Promise<PromiseSettledResult<IFileAddResult>[]> => {
        return new Promise<PromiseSettledResult<IFileAddResult>[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();

                const promises = documents.map((document) => {
                    return sp.web
                        .getFolderByServerRelativePath(documentRelativePath)
                        .files.addUsingPath(document.name, document, { Overwrite: true });
                });

                const file = await Promise.allSettled(promises);

                resolve(file);
            } catch (error) {
                reject(error);
            }
        });
    };


    const deleteDocuments = async (
        documentRelativePath: string,
        documentName: string
    ): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const sp = await getSP(); 

                // TODO: Add delete logic here

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    return {
        uploadDocuments,
        getDocuments,
        deleteDocuments
    } as const;
};
