import { Button } from '@fluentui/react-components';
import { useLoading } from '@prt-ts/fluent-common-features';

import * as React from 'react';
import { ExportFileInfo, exportToFile } from '@prt-ts/export-helpers';

export const ErrorPage: React.FC = () => {

  const [error, setError] = React.useState<Error | null>(null);

  const { showLoader, hideLoader } = useLoading();

  const triggerLoaderFor3Seconds = () => {
    showLoader();

    setTimeout(() => {
      hideLoader();
    }, 10000);
  }

  const triggerDownloadExcel = async () => {
    const data = [
      {
        name: 'test',
        age: 10,
        email: "test@test.com"
      },
      {
        name: 'test',
        age: 10,
        email: "test@test.com"
      }
    ];

    const fileInfo: ExportFileInfo = {
      sheets: [
        {
          sheetName: 'Test 1',
          data: data,
        },
        {
          sheetName: 'Test 2',
          data: data,
        },
      ],
    };

    exportToFile(fileInfo, 'download file name');
  }

  if (error) {
    throw error;
  }

  return (
    <div role="alert">
      I am normal happy page,
      <br />
      <Button
        onClick={() => {
          setError(new Error('Oh noes! I am an error! I ma not happy anymore!'));
        }}
      >
        {' '}
        Click me to generate Error
      </Button>

      <Button onClick={triggerLoaderFor3Seconds}>Trigger Loader for 3 seconds</Button>
      <Button onClick={triggerDownloadExcel}>Download Excel</Button>

    </div>
  );
};
