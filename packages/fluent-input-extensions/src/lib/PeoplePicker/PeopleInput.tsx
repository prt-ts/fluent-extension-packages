import * as React from 'react';
import {
  Avatar,
  Button,
  Tooltip,
  TagGroup,
  mergeClasses,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Persona,
  Toolbar,
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Show } from '@prt-ts/react-control-flow';
import { PeopleInputProps, PeopleInputRef } from './PeopleInputProps';
import { ClearIcon } from './Icons';
import { usePeopleInput } from './usePeopleInput';
import { usePeopleInputStyles } from './usePeopleInputStyles';
import { UserInfo } from '@prt-ts/types';
import { MailEditRegular } from '@fluentui/react-icons';

export const PeopleInput = React.forwardRef<PeopleInputRef, PeopleInputProps>(
  (props, ref): JSX.Element => {
    const {
      inputRef,
      value,
      selectedOptions,
      tagPickerInputProps,
      tagPickerProps,
      handleOptionSelect,
      handleQueryChange,
      onUserSelectionChange,
      removeSelectedUser,
      reachMaxSelection,
      pickerType,
      layout,
      query,
      children,
    } = usePeopleInput(props, ref);

    const styles = usePeopleInputStyles();
    return (
      <>
        <TagPicker
          {...tagPickerProps}
          onOptionSelect={handleOptionSelect}
          selectedOptions={selectedOptions}
        >
          <TagPickerControl
            expandIcon={null}
            secondaryAction={
              <Show when={(value || [])?.length > 1}>
                <Tooltip
                  content="Clear all selected users"
                  relationship="label"
                >
                  <Button
                    appearance="subtle"
                    size="small"
                    shape="rounded"
                    onClick={() => {
                      onUserSelectionChange([]);
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    icon={<ClearIcon />}
                  />
                </Tooltip>
              </Show>
            }
          >
            <Show when={pickerType !== 'list'}>
              <TagPickerGroup
                className={mergeClasses(styles[pickerType], styles[layout])}
              >
                {(value || []).map((user, index) => (
                  <InteractionTag
                    key={`${user.loginName}-${index}`}
                    shape="circular"
                    value={user.loginName}
                  >
                    <Popover withArrow trapFocus>
                      <PopoverTrigger>
                        <InteractionTagPrimary
                          media={<Avatar name={user.name} color="colorful" />}
                          type="button"
                          hasSecondaryAction
                        >
                          {user.name}
                        </InteractionTagPrimary>
                      </PopoverTrigger>
                      <PopoverSurface>
                        <UserDetails user={user} />
                      </PopoverSurface>
                    </Popover>
                    <Tooltip content="Remove" relationship="label">
                      <InteractionTagSecondary aria-label="remove" />
                    </Tooltip>
                  </InteractionTag>
                ))}
              </TagPickerGroup>
            </Show>
            <TagPickerInput
              {...tagPickerInputProps}
              ref={inputRef}
              value={query}
              onChange={async (e) => handleQueryChange(e.target.value)}
              readOnly={props.readOnly || reachMaxSelection}
              disabled={props.disabled}
              placeholder={
                reachMaxSelection && selectedOptions?.length > 0
                  ? ''
                  : tagPickerInputProps.placeholder
              }
              required={false} // to avoid browser validation on input -- this will be handled by the validation of the form
            />
          </TagPickerControl>
          <Show when={!reachMaxSelection && !tagPickerInputProps.readOnly}>
            <TagPickerList className={styles.optionList}>
              {children}
            </TagPickerList>
          </Show>
        </TagPicker>
        <Show when={pickerType === 'list'}>
          <TagGroup
            onDismiss={(e, data) => {
              removeSelectedUser(e, data);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className={mergeClasses(styles[pickerType], styles[layout])}
          >
            {(value || []).map((user, index) => (
              <InteractionTag
                key={`${user.loginName}-${index}`}
                shape="circular"
                size="small"
                value={user.loginName}
              >
                <Popover withArrow trapFocus>
                  <PopoverTrigger>
                    <InteractionTagPrimary
                      media={<Avatar name={user.name} color="colorful" />}
                      type="button"
                      hasSecondaryAction
                    >
                      {user.name}
                    </InteractionTagPrimary>
                  </PopoverTrigger>
                  <PopoverSurface>
                    <UserDetails user={user} />
                  </PopoverSurface>
                </Popover>
                <Tooltip content="Remove" relationship="label">
                  <InteractionTagSecondary aria-label="remove" />
                </Tooltip>
              </InteractionTag>
            ))}
          </TagGroup>
        </Show>
      </>
    );
  }
);

export const UserDetails: React.FC<{ user: UserInfo }> = ({ user }) => {
  return (
    <div>
      <Persona
        size="huge"
        name={user.name}
        avatar={{ color: 'colorful' }}
        secondaryText={user.email}
        tertiaryText={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Toolbar>
              <Tooltip content="Send Email" relationship="label">
                <Button
                  appearance="subtle"
                  size="small"
                  shape="rounded"
                  icon={<MailEditRegular />}
                  onClick={() => {
                    window.open(`mailto:${user.email}`);
                  }}
                />
              </Tooltip>
            </Toolbar>
          </div>
        }
      />
    </div>
  );
};
