import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverSurface,
} from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';
import React from 'react';

export const ChatSetting: React.FC = () => {
  return (
    <Popover withArrow trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<Settings24Regular />}
          aria-label="Send"
        />
      </PopoverTrigger>

      <PopoverSurface tabIndex={-1}>
        <Button appearance="subtle">Settings</Button>
      </PopoverSurface>
    </Popover>
  );
};
