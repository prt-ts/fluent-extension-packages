import React from 'react';
import { EditorShortcutDoc } from '../EditorShortcutDoc/EditorShortcutDoc';
import { Button, Popover, PopoverSurface, PopoverTrigger, Tooltip } from '@fluentui/react-components';
import { InfoRegular } from '@fluentui/react-icons';

export const DocPopover: React.FC = () => {
    return (
        <Popover>
            <PopoverTrigger disableButtonEnhancement>
                <Tooltip content="Keyboard Shortcuts" relationship='label'>
                    <Button icon={<InfoRegular />} appearance='subtle' size='small'/>
                </Tooltip>
            </PopoverTrigger>

            <PopoverSurface tabIndex={-1}> <EditorShortcutDoc />
            </PopoverSurface>
        </Popover>
    );
};