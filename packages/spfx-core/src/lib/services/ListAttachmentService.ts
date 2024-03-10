import { IItem } from "@pnp/sp/items";
import { getSP } from "../pnp";
import { IAttachmentInfo } from "@pnp/sp/attachments";

/* eslint-disable */
export const ListAttachmentService = () => {
  (async () => {})();

  const getDocumentsFromListItem = async (
    listName: string,
    itemId: number 
  ): Promise<IAttachmentInfo[]> => {
     
    return new Promise<IAttachmentInfo[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const listItem: IItem = sp.web.lists
          .getByTitle(listName)
          .items.getById(itemId);
        
        const attachments = await listItem.attachmentFiles(); 
        resolve(attachments);
      } catch (error) {
        reject(error);
      }
    });
  };


  const uploadDocumentsToListItem = async (
    listName: string,
    itemId: number,
    documents: File[]
  ): Promise<boolean> => {

    if (!documents || documents.length === 0) {
      return true;
    }

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const listItem: IItem = sp.web.lists
          .getByTitle(listName)
          .items.getById(itemId);

        if (listItem) {
          for (const document of documents) {
            const newFileName = `${document.name}`;
            await listItem.attachmentFiles.add(newFileName, document);
          }
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteAttachmentsOnListItem = (
    listName: string,
    itemId: number,
    fileNames: string[]
  ): Promise<number> => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        let item = sp.web.lists.getByTitle(listName).items.getById(itemId);
        if (item) {
          const deletePromises = fileNames.map((fileName) =>
            item.attachmentFiles.getByName(fileName).delete(fileName)
          );
          await Promise.all(deletePromises);
        }
        resolve(itemId);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getDocumentsFromListItem,
    uploadDocumentsToListItem,
    deleteAttachmentsOnListItem,
  };
};
