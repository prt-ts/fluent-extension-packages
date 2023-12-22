import { useAlert, useConfirm, useLoading } from '@prt-ts/fluent-common-features';
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
} from '@fluentui/react-components';

const Features = () => {
  const { success, error, info, warning, progress, update } = useAlert();
  const { confirm } = useConfirm();

  return (
    <div>
      <h1>Features</h1>
      <button
        onClick={() =>
          success({
            title: 'Success',
            body: 'This is a success message',
          })
        }
      >
        Success
      </button>
      <button
        onClick={() =>
          error({
            title: 'Error',
            body: 'This is a error message',
          })
        }
      >
        Error
      </button>
      <button
        onClick={() =>
          info({
            title: 'Info',
            body: 'This is a info message',
          })
        }
      >
        Info
      </button>
      <button
        onClick={() =>
          warning({
            title: 'Warning',
            body: 'This is a warning message',
          })
        }
      >
        Warning
      </button>

      {/* warning with very long message */}
      <button
        onClick={() =>
          warning({
            title: 'Warning',
            body: 'This is a warning message with a very long message to test the wrapping of the text and the height of the alert',
          })
        }
      >
        Warning with very long message
      </button>

      {/* progress */}
      <Button
        onClick={() =>
          {
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
        onClick={() =>
          {
            const toastId = progress({
            title: 'Progress',
            body: 'This is a progress message',
            intent: "error"
          })

          setTimeout(() => {
            update({
              title: 'Error',
              body: 'Something went wrong',  
              intent: "error"            
            }, {
              toastId: toastId,
              intent: "error"
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
      >
        Confirm
      </Button>

      <Button
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
              style: {
                backgroundColor: 'red',
                color: 'white'
              }
            },
            cancelButtonProps: {
              children: 'Cancel',
              icon: null,
            },
          })
        }
      >
        Second Confirm
      </Button>



        <DialogExampleWithLoading />

    </div>
  );
};

export default Features;


export const DialogExampleWithLoading = () => {

  const {showLoader, hideLoader} = useLoading()

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            exercitationem cumque repellendus eaque est dolor eius expedita
            nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
            in natus iure cumque eaque?

            <button onClick={() => {
              showLoader('Loading...')
              setTimeout(() => {
                hideLoader()
              }, 3000)
            }}>Show loader</button>

          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
