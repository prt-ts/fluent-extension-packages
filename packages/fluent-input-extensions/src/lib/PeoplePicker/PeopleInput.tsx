import * as React from "react";
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerGroup,
} from "@fluentui/react-tag-picker-preview";
import {
  Avatar,
  Button,
  Tooltip,
  TagGroup,
  mergeClasses,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from "@fluentui/react-components";
import { Show } from "@prt-ts/react-control-flow";
import { PeopleInputProps, PeopleInputRef } from "./PeopleInputProps";
import { ClearIcon } from "./Icons";
import { usePeopleInput } from "./usePeopleInput";
import { usePeopleInputStyles } from "./usePeopleInputStyles";

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
          freeform
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
            <Show when={pickerType !== "list"}>
              <TagPickerGroup
                className={mergeClasses(styles[pickerType], styles[layout])}
              >
                {(value || []).map((user) => (
                  <InteractionTag
                    key={user.loginName}
                    shape="circular"

                    value={user.loginName}
                  >
                    <InteractionTagPrimary
                      media={<Avatar name={user.name} color="colorful" />}
                      hasSecondaryAction
                    >
                      {user.name}
                    </InteractionTagPrimary>
                    <InteractionTagSecondary aria-label="remove" />
                  </InteractionTag >
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
              placeholder={reachMaxSelection && selectedOptions?.length > 0 ? "" : tagPickerInputProps.placeholder}
            />
          </TagPickerControl>
          <Show when={!reachMaxSelection && !tagPickerInputProps.readOnly}>
            <TagPickerList className={styles.optionList}>
              {children}
            </TagPickerList>
          </Show>
        </TagPicker>
        <Show when={pickerType === "list"}>
          <TagGroup
            onDismiss={(e, data) => {
              removeSelectedUser(e, data);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className={mergeClasses(styles[pickerType], styles[layout])}
          >
            {(value || []).map((user) => (
              <InteractionTag
                key={user.loginName}
                shape="circular"
                size="small"
                value={user.loginName}
              >
                <InteractionTagPrimary
                  media={<Avatar name={user.name} color="colorful" />}
                  hasSecondaryAction
                >
                  {user.name}
                </InteractionTagPrimary>
                <InteractionTagSecondary aria-label="remove" />
              </InteractionTag >
            ))}
          </TagGroup>
        </Show>
      </>
    );
  }
);
