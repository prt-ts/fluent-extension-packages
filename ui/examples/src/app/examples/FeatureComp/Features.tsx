import { useAlert, useButtonStyles, useConfirm, useLoading } from '@prt-ts/fluent-common-features';
import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Divider,
} from '@fluentui/react-components'; 
import { makeData } from '../../data/UserInfo';
import { ExportData, ExportFileInfo, exportDocument } from '@prt-ts/export-helpers';

const FeatureComponent = () => {
  return (
    <div>
      <Features />
      <DialogExampleWithLoading />
    </div>
  );
}

const Features = () => {
  const { success, error, info, warning, progress } = useAlert();
  const { confirm } = useConfirm();
  const { showLoader, hideLoader } = useLoading();

  const buttonStyles = useButtonStyles();

  return (
    <>
    <h1>Features</h1>
    <Divider />
      <div style={{ display: 'flex', gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
        <Button
          onClick={() =>
            success({
              title: 'Success',
              body: 'This is a success message',
            })
          }
          className={buttonStyles.success}
        >
          Success
        </Button>
        <Button
          onClick={() =>
            error({
              title: 'Error',
              body: 'This is a error message',
            })
          }
          className={buttonStyles.danger}
        >
          Error
        </Button>
        <Button
          onClick={() =>
            info({
              title: 'Info',
              body: 'This is a info message',
            })
          }
          className={buttonStyles.info}
        >
          Info
        </Button>
        <Button
          onClick={() =>
            warning({
              title: 'Warning',
              body: 'This is a warning message',
            })
          }
          className={buttonStyles.warning}
        >
          Warning
        </Button>

        {/* warning with very long message */}
        <Button
          onClick={() =>
            warning({
              title: 'Warning',
              body: 'This is a warning message with a very long message to test the wrapping of the text and the height of the alert',
            })
          }
          className={buttonStyles.warning}
        >
          Warning with very long message
        </Button>

        {/* progress */}
        <Button
          onClick={() => {
            const toastId = progress({
              title: 'Progress',
              body: 'This is a progress message',
            })

            setTimeout(() => {
              success({
                title: 'Progress',
                body: 'This is a progress message',
              }, {
                toastId: toastId
              })
            }, 3000)
          }}
          appearance='primary'
        >
          Lazy Progress (With Success)
        </Button>

        <Button
          onClick={() => {
            const toastId = progress({
              title: 'Progress',
              body: 'This is a progress message',
              intent: "error"
            })

            setTimeout(() => {
              error({
                title: 'Error',
                body: 'Something went wrong',
                intent: "error"
              }, {
                toastId: toastId
              })
            }, 3000)
          }}
          appearance='secondary'
        >
          Lazy Progress (With Error)
        </Button>


        {/* confirm */}
        <Button
          onClick={() =>
            confirm({
              title: 'Default Confirm',
              message: <>Default Confirm with default button props</>,
              onConfirm: () => {
                console.log('confirmed');
              },
              onCancel: () => {
                console.log('canceled');
              },

            })
          }
          appearance='primary'
        >
          Confirm
        </Button>

        <Button
          className={buttonStyles.danger}
          onClick={() =>
            confirm({
              title: 'Are you sure you want to delete this item?',
              message: <>Once you delete, you will not be able to revert this action.</>,
              onConfirm: () => {
                console.log('confirmed');
              },
              onCancel: () => {
                console.log('canceled');
              },
              confirmButtonProps: {
                children: 'Delete',
                icon: null,
                className: buttonStyles.danger
              },
              cancelButtonProps: {
                children: 'Cancel',
                icon: null,
              },
            })
          }
        >
          Confirm Delete
        </Button>

         <Button
          className={buttonStyles.danger}
          onClick={() =>
            confirm({
              title: 'Are you sure you want to delete this item?',
              message: <>Once you delete, you will not be able to revert this action.</>,
              onConfirm: () => {
                console.log('Confirm Delete with long action');
              },
              onCancel: () => {
                console.log('canceled');
              },
              confirmButtonProps: {
                children: 'Confirm Delete',
                icon: null,
                className: buttonStyles.danger
              },
              cancelButtonProps: {
                children: 'Cancel',
                icon: null,
              },
            })
          }
        >
          Long Action Btn
        </Button>

          {/* loading example */}
        <Button
          onClick={() => {
            showLoader();
            setTimeout(() => {
              hideLoader();
            }, 3000);
          }}
          appearance='primary'
        >
          Loading
        </Button>

      </div>

      <div>

        <Button onClick={
          async () => {

            const userData = makeData(10) 
            
            const exportData : ExportData[] = userData.map((d) => ({
              NullValue : null,
              UndefinedValue : undefined,
              emptyString: {
                value : '',
                cellStyle: {
                  border : {
                    left : {
                      style : "hair",
                      color : {
                        argb: "FF00FF00"
                      }
                    },
                    diagonal : {
                      style : "double",
                      color : {
                        argb: "rgba(255, 99, 71, 0.5)"
                      }
                    }
                  },
                }
              },
              /* eslint-disable-next-line */
              ["Display Name"] : {
                value: {
                  text : d.name,
                  isHyperlink : true,
                  hyperlink: "https://www.google.com"
                }
              },
              /* eslint-disable-next-line */
              ["User Name"] : {
                value : d.loginName,
                dataValidation : {
                  type : "list",
                  allowBlank: true,
                  formulae: [`"Pradeep, Durga, Fana"`]
                },
                cellStyle: {
                  protection: {
                    locked: false
                  }
                }
              },
              /* eslint-disable-next-line */
              ["Email Address"]: {
                value: d.email,
                cellStyle: {
                  font: { 
                    italic: true
                  },
                  border : {
                    left : {
                      style : "hair",
                      color : {
                        argb: "rgba(255, 99, 71, 0.5)"
                      }
                    },
                    diagonal : {
                      style : "hair",
                      color : {
                        argb: "rgba(255, 99, 71, 0.5)"
                      }
                    }
                  },
                  // fill : {
                  //   type : "pattern",
                  //   pattern : "darkDown"
                  // }
                  
                }
              }

            }))

            const fileInfo : ExportFileInfo = {
              fileName : "Pradeep Raj - User List",
              type: "excel",

              sheets : [{
                sheetName : "User Info - Formatted",
                data: exportData
              }]

            }

            await exportDocument(fileInfo)
          }
         }>
          Export template
        </Button>

      </div>

    </>

  );
};

export default FeatureComponent;


export const DialogExampleWithLoading = () => {

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>In Dialog</DialogTitle>
          <DialogContent>
            <Features />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
