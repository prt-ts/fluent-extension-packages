import { useAlert, useConfirm } from '@prt-ts/fluent-common-features';
import React from 'react';

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
    </div>
  );
};

export default Features;
