// import { TDocumentDefinitions } from 'pdfmake/interfaces';

// export function exportToPdfDocument(
//     docDefinition: TDocumentDefinitions,
//     fileName = 'document',
//     printMode: 'print' | 'open' | 'download' = 'print'
// ) {
//     // import pdfMake and download the fonts
//     import('pdfmake/build/pdfmake').then((pdfMake) => {
//         import('pdfmake/build/vfs_fonts').then((vfsFonts) => {
//             pdfMake.vfs = vfsFonts.pdfMake.vfs;
//             if (printMode == 'print') {
//                 pdfMake.createPdf(docDefinition).print();
//             } else if (printMode == 'download') {
//                 pdfMake.createPdf(docDefinition).download(fileName);
//             } else {
//                 pdfMake.createPdf(docDefinition).open();
//             }
//         });
//     });
// }
