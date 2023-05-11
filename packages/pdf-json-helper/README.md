# PDF JSON Helpers
> This library provides the form like element layout for the pdfmake (pdf make libray) without writing very complex json document defination.

Pdfmake is library for creating pdf file using javascript. This is a repository project to create html form style layout for PdfMake, that is 
generate object defination for each specified element in the from Json object Format.

You can find example code in folder example using react. We provide number of javascript helper functions, default styles, and layout grid to generating pdf file.
We have publish this plugin in npmjs.com, you can download for your project at command prompt


Install Packages
=======
> `npm i pdfmake`

> `npm i @prt-ts/pdf-json-helpers`


Dependencies
============

* [pdfmake package](https://www.npmjs.com/package/pdfmake)

* [html-to-pdfmake package](https://www.npmjs.com/package/html-to-pdf)


Examples

### Import Helpers
    import {
    //import default style
      formStyles,

      //import layout helpers
      Section,
      Row,
      
      //import element helpers
      TextInput,
      TextInputNoLabel,
      SectionHeader,
      CurrencyInput,
      DateInput,
      SelectInput,
      TextareaInput,
      RichTextareaInput,
      CheckboxInput,
      RadioInput,

      } from "@prt-ts/pdf-json-helpers";


### Declare Custom Styles
    const pdfStyle = {
      // use the default form element style
      ...formStyles,

      // add your own style or override the existing one here
      sectionHeaderStyle: {
        ...formStyles.sectionHeaderStyle,
        fillColor: "red"
      }
    };

## Define Document Defination using Helper Methods
    var exampleDocumentDefination: any = {
      content: [
        {
          text: "pdfMake : HTML FORM EXAMPLE",
          style: "header",
        },
        Section([
          SectionHeader("Mix Column Layout, multiple rows"),
          Row([
            TextInput("Input type text", "This is the value of the text input"),
            CurrencyInput("Currency type example", "1,000,000"),
            CurrencyInput("Currency", "1,000,000.00"),
          ]),
          Row([
            TextInput("Input type text", "This is the value of the text input"),
            CurrencyInput("Currency type example", "1,000,000"),
          ]),
        ]),

        // new section
        Section([
          SectionHeader("Three Column Layout"),
          Row([
            DateInput("Input type date example", new Date()),
            SelectInput(
              "Select input type style",
              "This is the value of the input"
            ),
            TextInputNoLabel("This is example of input with no Label"),
          ]),
        ]),

        //more section
        Section([
          SectionHeader("Single Column Layout/ Textarea Example"),
          Row([
            TextareaInput(
              "Some Label (Textarea Example)",
              "This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
            ),
          ]),
        ]),

        //more section
        Section([
          SectionHeader("Rich Text Editor Example (Support HTML Tags)"),
          Row([RichTextareaInput("Rich Text Editor Label", testHTML)]),
        ]),

        //Checkbox and Radio buttons section
        Section([
          SectionHeader("Checkbox and Radio Styles"),
          Row([CheckboxInput("Checkbox labe with checked checbox", true)]),
          Row([CheckboxInput("Unchecked Checkbox with plain text label", false)]),
          Row([
            CheckboxInput(
              "Checkbox with html content <br/>" + testHTML,
              true,
              "html"
            ),
          ]),
          Row([
            CheckboxInput(
              "Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
            ),
          ]),
          Row([
            RadioInput("Radio Example, Horizontal Layout (Default)", [
              {
                itemLabel: "Option 1",
                selected: false,
                width: "auto",
              },
              {
                itemLabel: "Option 2",
                selected: true,
                width: "auto",
              },
              {
                itemLabel: "Option 3",
                selected: false,
                width: "auto",
              },
            ]), 
          ]),
          Row([
            RadioInput(
              "Radio Example, Vertical Layout",
              [
                {
                  itemLabel: "Option 1",
                  selected: true,
                  width: "auto",
                },
                {
                  itemLabel: "Option 2",
                  selected: false,
                  width: "auto",
                },
                {
                  itemLabel:
                    "Option 3,  Very long text, Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)",
                  selected: false,
                  width: "auto",
                },
              ],
              "vertical"
            ),
          ]),
        ]),
      ],
      styles: pdfStyle,
    };

### Handle Download Method
    import pdfMake from "pdfmake/build/pdfmake";
    import pdfFonts from "pdfmake/build/vfs_fonts";

    const handlePdfMake = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        let docDef: any = { ...exampleDocumentDefination };
        docDef.pageOrientation = true ? "landscape" : "portrait";
        
        docDef.info = {
        title: "makePdf Example",
        author: "Pradeep Raj Thapaliya",
        subject: "Form type stype",
        keywords: "makepdf, export pdf",
        };
        pdfMake.createPdf(docDef).open();
    };

### Button Action 
    return (
        <div className="App">
        <button onClick={handlePdfMake}>Download</button>
        </div>
    );

This example is written is `react` but can be use in any web framework or in javascript framework.

## API

### Styles
This package already contains the styles for all the element, followings are the default styles.

| Style Layout Classes | Defination  |
| ------- | --- |
| header | Header Style for the document. |
| subheader | Subheader Style for the document. |
| sectionHeaderStyle | Default styles applies when using 'Section' helper method. |
| labelStyle | Default styles applies to the label of the form element. |
| textInputStyle | Default styles applies when using 'TextInput', 'DateInput', 'CurrencyInput', 'TextInputNoLabel' helper methods. |
| textareaStyle | Default styles applies when using 'TextareaInput' helper method. |
| richTextEditorStyle | Default styles applies when using 'RichTextareaInput' helper method. |

### Helper Methods
This package have the following helper methods to create the form element and layout element

| Helper Method | Defination  | Uses     |
| ------------- | ----------- | -------  |
| HTML | Converts Html document to pdf nodes. | `HTML(htmlString : string)` |
| Section | Layout - Creates layout area and defines the section. | `Section(arrayOfRowsOrSection : any[], gap: number)` |
| Row | Layout - Creates layout for row and accept multiple columns. | `Row(arrayOfColumnElement : any[])` |
| TextInput | Helper Element - Creates node for HTML like Input Element. | `TextInput(label: string, value : string)` |


# Developer of package
 - npx tsc
 - npm publish