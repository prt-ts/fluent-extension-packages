import * as React from 'react';
import { useNoItemGridStyles } from './useNoItemGridStyles';
import { Subtitle2Stronger } from '@fluentui/react-components';
import { Show } from '@prt-ts/react-control-flow';

export const NoItemGrid: React.FC<{ message?: React.ReactNode }> = ({
  message,
}) => {
  const styles = useNoItemGridStyles();
  return (
    <div className={styles.wrapper}>
      <Show
        when={!!message}
        fallback={<Subtitle2Stronger>No data to show.</Subtitle2Stronger>}
      >
        {message}
      </Show>
    </div>
  );
};
