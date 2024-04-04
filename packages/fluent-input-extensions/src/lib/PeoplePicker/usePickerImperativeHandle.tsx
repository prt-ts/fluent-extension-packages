import * as React from "react";
import { PeopleInputProps, PeopleInputRef } from "./PeopleInputProps";
import { UserInfo } from "@prt-ts/types";

/* eslint-disable */
export function usePickerImperativeHandle(
  value: UserInfo[],
  ref: React.ForwardedRef<PeopleInputRef>,
  onUserSelectionChange: PeopleInputProps["onUserSelectionChange"]
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(
    ref,
    () => ({
      value: value || [],
      reset: () => onUserSelectionChange?.([]),
      setValue: (users) => onUserSelectionChange?.(users),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }),
    [value, inputRef]
  );

  return inputRef;
}
