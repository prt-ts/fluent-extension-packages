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
  const { success, error, info, warning, progress } = useAlert();
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
      <button
        onClick={() =>
          progress({
            title: 'Progress',
            body: 'This is a progress message',
          })
        }
      >
        Progress
      </button>

      {/* confirm */}
      <button
        onClick={() =>
          confirm({
            title: 'Confirm',
            message: <>This is a confirm message</>,
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
      </button>


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
