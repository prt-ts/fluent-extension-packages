import * as React from "react";
import { Persona, Spinner } from "@fluentui/react-components";
import {
  TagPickerOption,
  TagPickerOptionGroup,
} from "@fluentui/react-tag-picker-preview";
import { For, Show } from "@prt-ts/react-control-flow";
import { PeopleInputProps } from "./PeopleInputProps";
import { UserInfo } from "@prt-ts/types";

type GetChildrenProps = {
  query: string;
  availableSearchUsers: UserInfo[];
  availableSuggestions: PeopleInputProps["suggestions"];
  showSecondaryText: PeopleInputProps["showSecondaryText"];
  isLoading: boolean;
};

/* eslint-disable */
export function useGetChildren({
  query,
  availableSearchUsers,
  availableSuggestions,
  isLoading,
  showSecondaryText,
}: GetChildrenProps) {
  const children = React.useMemo(() => {
    return (
      <>
        <Show when={query?.length > 0}>
          <TagPickerOptionGroup label="Search Results">
            {/* show loading */}
            <Show when={isLoading}>
              <TagPickerOption
                key={"loading"}
                value={""}
                text={"LOADING"}
              >
                <Spinner size="tiny" label="Searching, Please Wait..." />
              </TagPickerOption>
            </Show>

            {/* show no result message if no data */}
            <Show
              when={
                availableSearchUsers.length === 0 &&
                !isLoading &&
                query?.length > 0
              }
            >
              <TagPickerOption
                key={"loading"}
                value={""}
                text={"LOADING"}
              >
                {`No results found for '${query}'`}
              </TagPickerOption>
            </Show>

            {/* show search results */}
            <Show when={availableSearchUsers.length > 0 && !isLoading}>
              <For each={availableSearchUsers}>
                {(option) => (
                  <TagPickerOption
                    key={option.loginName}
                    value={option.loginName}
                    text={option.name}
                  >
                    <Persona
                      name={option.name}
                      secondaryText={
                        showSecondaryText ? option.email : undefined
                      }
                      avatar={{ color: "colorful" }}
                      size={"extra-small"}
                    />
                  </TagPickerOption>
                )}
              </For>
            </Show>
          </TagPickerOptionGroup>
        </Show>

        <Show
          when={
            availableSearchUsers.length === 0 &&
            !isLoading &&
            query?.length === 0
          }
        >
          <Show when={availableSuggestions?.length === 0}>
            <TagPickerOptionGroup label="Suggestions">
              <TagPickerOption
                key={"no_suggestions"}
                value={""}
                text={"NO_LOADING"}
              >
                {`No suggestions available.`}
              </TagPickerOption>
            </TagPickerOptionGroup>
          </Show>
          <Show when={availableSuggestions && availableSuggestions?.length > 0}>
            <TagPickerOptionGroup label="Suggestions">
              <For each={availableSuggestions}>
                {(option) => (
                  <TagPickerOption
                    key={option.loginName}
                    value={option.loginName}
                    text={option.name}
                  >
                    <Persona
                      name={option.name}
                      secondaryText={option.email}
                      avatar={{ color: "colorful" }}
                      size={"extra-small"}
                    />
                  </TagPickerOption>
                )}
              </For>
            </TagPickerOptionGroup>
          </Show>
        </Show>
      </>
    );
  }, [availableSearchUsers, availableSuggestions, isLoading, query]);

  return children;
}