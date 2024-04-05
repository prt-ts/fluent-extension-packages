import * as React from "react";
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerGroup,
} from "@fluentui/react-tag-picker-preview";
import {
  Tag,
  Avatar,
  Button,
  Tooltip,
  TagGroup,
  mergeClasses,
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
      isReadOnly,
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
                  <Tag
                    key={user.loginName}
                    shape="circular"
                    media={<Avatar name={user.name} color="colorful" />}
                    value={user.loginName}
                    type="button"
                  >
                    {user.name}
                  </Tag>
                ))}
              </TagPickerGroup>
            </Show>
            <TagPickerInput
              {...tagPickerInputProps}
              ref={inputRef}
              value={query}
              onChange={async (e) => handleQueryChange(e.target.value)}
              readOnly={isReadOnly}
              placeholder={tagPickerInputProps.placeholder}
            />
          </TagPickerControl>
          <Show when={!isReadOnly && !tagPickerInputProps.readOnly}>
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
              <Tag
                key={user.loginName}
                shape="circular"
                media={<Avatar name={user.name} color="colorful" />}
                value={user.loginName}
                type="button"
                size="small"
                dismissible
                disabled={props.disabled}
              >
                {user.name}
              </Tag>
            ))}
          </TagGroup>
        </Show>
      </>
    );
  }
);
