import * as React from "react";
import { PeopleInputProps, PeopleInputRef, UserInfo } from "./PeopleInputProps";
import { usePeopleInputDefault } from "./usePeopleInputDefaults";
import { TagGroupProps } from "@fluentui/react-components";
import { TagPickerProps } from "@fluentui/react-tag-picker-preview";
import { useGetChildren } from "./useGetChildrens";
import { usePickerImperativeHandle } from "./usePickerImperativeHandle";

/* eslint-disable */
export function usePeopleInput(
  props: PeopleInputProps,
  ref: React.ForwardedRef<PeopleInputRef>
) {
  const {
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
    showSecondaryText,
  } = usePeopleInputDefault(props);
  const isReadOnly = value.length >= max || props.disabled;

  const [searchedUsers, setSearchedUsers] = React.useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");

  const handleOptionSelect: TagPickerProps["onOptionSelect"] = async (
    e,
    data
  ) => {
    const matchUsers = [...searchedUsers, ...(suggestions || [])].filter(
      (user) => user.loginName === data.optionValue
    );

    const newFilteredUsers = [...value, ...matchUsers]?.filter((user) =>
      data.selectedOptions?.includes(user.loginName)
    );

    // calculate unique users
    let uniqueUsers = newFilteredUsers.filter(
      (user, index, self) =>
        index === self.findIndex((t) => t.loginName === user.loginName)
    );

    // reset query
    setQuery("");

    // resolve users
    if (onResolveUsers) {
      uniqueUsers = await onResolveUsers(uniqueUsers);
    }
    if (onUserSelectionChange) {
      onUserSelectionChange(uniqueUsers);
    }
    setSearchedUsers([]);

    // props.
    if (onOptionSelect) {
      onOptionSelect(e, data);
    }
  };

  const removeSelectedUser: TagGroupProps["onDismiss"] = (_e, data) => {
    const newUses = (value || []).filter(
      (user) => user.loginName !== data.value
    );
    onUserSelectionChange([...newUses]);
  };

  const selectedOptions = React.useMemo(
    () => (value || []).map((user) => user.loginName),
    [value]
  );

  const handleQueryChange = React.useCallback(
    async (query: string = "") => {
      if (!onSearchUsers) {
        console.error("onSearchUsers is not defined");
        return;
      }

      setQuery(query);
      if (query.length === 0) {
        setSearchedUsers([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      await onSearchUsers(query)
        .then((users) => {
          setSearchedUsers(users);
          setIsLoading(false);
        })
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        .catch(() => {});
    },
    [onSearchUsers]
  );

  const availableSearchUsers = React.useMemo(
    () =>
      searchedUsers.filter(
        (user) =>
          !value.some(
            (selectedUser) => selectedUser.loginName === user.loginName
          ) &&
          !excludeUsers.some(
            (excludedUser) => excludedUser.loginName === user.loginName
          ) &&
          !!user.email
      ),
    [searchedUsers, value, excludeUsers]
  );

  const availableSuggestions = React.useMemo(
    () =>
      suggestions.filter(
        (user) =>
          !value.some(
            (selectedUser) => selectedUser.loginName === user.loginName
          ) &&
          !excludeUsers.some(
            (excludedUser) => excludedUser.loginName === user.loginName
          ) &&
          !!user.email
      ),
    [suggestions, value, excludeUsers]
  );

  const children = useGetChildren({
    query,
    isLoading,
    availableSearchUsers,
    availableSuggestions,
    showSecondaryText,
  });

  const inputRef = usePickerImperativeHandle(value, ref, onUserSelectionChange);

  return {
    inputRef,
    value,
    selectedOptions,
    tagPickerInputProps,
    tagPickerProps,
    children,
    isReadOnly,
    pickerType,
    layout,
    handleOptionSelect,
    onUserSelectionChange,
    removeSelectedUser,
    query,
    onSearchUsers,
    handleQueryChange,
    availableSearchUsers,
    availableSuggestions,
    isLoading,
    showSecondaryText,
  } as const;
}
