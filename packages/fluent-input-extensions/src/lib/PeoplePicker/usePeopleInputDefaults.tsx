import * as React from "react";
import { PeopleInputProps } from "./PeopleInputProps";
import {
  TagPickerInputProps,
  TagPickerProps,
} from "@fluentui/react-tag-picker-preview";
import { UserInfo } from "@prt-ts/types";
import { FieldControlProps } from "@fluentui/react-components";

/* eslint-disable  */
export function usePeopleInputDefault(props: PeopleInputProps) {
  const [selectedUsers, setSelectedUsers] = React.useState<UserInfo[]>([]);

  const {
    value = selectedUsers,
    onUserSelectionChange = (users) => setSelectedUsers(users),
    max = props.multiselect ? 99 : 1,
    suggestions = [],
    excludeUsers = [],
    onSearchUsers,
    onOptionSelect,
    onResolveUsers,
    pickerType = "normal",
    layout = "horizontal",
    showSecondaryText = true,
    ...rest
  } = props;

  const tagPickerProps: TagPickerProps = rest as TagPickerProps;
  const tagPickerInputProps: TagPickerInputProps = rest as TagPickerInputProps; 
  const fieldControlProps : FieldControlProps = rest as FieldControlProps;

  return {
    value,
    onUserSelectionChange,
    max,
    suggestions,
    excludeUsers,
    onSearchUsers,
    onOptionSelect,
    onResolveUsers,
    pickerType,
    layout,
    tagPickerProps,
    tagPickerInputProps,
    fieldControlProps,
    showSecondaryText,
  };
}
