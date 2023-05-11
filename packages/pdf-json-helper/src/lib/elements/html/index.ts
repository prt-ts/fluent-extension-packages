import htmlToPdfmake from "html-to-pdfmake";

function getHTML(htmlContent: string) {
    return {
        stack: [
            {
                stack: htmlToPdfmake(htmlContent),
            },
        ],
    };
}

export { getHTML };