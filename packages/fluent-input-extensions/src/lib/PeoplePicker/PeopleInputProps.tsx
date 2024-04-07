import {
  TagPickerInputProps,
  TagPickerProps,
} from "@fluentui/react-tag-picker-preview";
import { UserInfo } from "@prt-ts/types";

type ResolvedUserInfo = {
  resolvedUserInfo: UserInfo[];
  error: string; 
}

type LocalPeopleInputProps = {
  /**
   * The selected users
   * @default []
   */
  value?: UserInfo[];

  /**
   * Callback when user selection changes
   * @param user The selected users
   * @default undefined
   */
  onUserSelectionChange?: (user: UserInfo[]) => void;

  /**
   * Callback to search users
   * @param query The search query
   * @returns The list of users
   * @default undefined
   */
  onSearchUsers?: (query: string) => Promise<UserInfo[]>;

  /**
   * Callback to resolve users
   * @param users The list of users
   * @returns The list of users
   * @default undefined
   * @description This callback is used to resolve users before they are displayed in the picker
   * This is useful when you want to show additional information about the user
   * For example, you can use this callback to show the user's email, department, etc.
   */
  onResolveUsers?: (users: UserInfo[]) => Promise<ResolvedUserInfo>;

  /**
   * Callback when an internal error occurs
   * @param errorMessage The error message
   * @default undefined
   * @description This callback is used to handle internal errors
   * For example, you can use this callback to show a toast notification
   * when an internal error occurs
   */
  onInternalError?: (errorMessage: string) => void;

  /**
   * If true, multiple users can be selected
   * @default false
   */
  multiselect?: boolean;

  /**
   * Selected users layout
   * @default "horizontal"
   */
  layout?: "horizontal" | "vertical";

  /**
   * Maximum number of users that can be selected
   * @default 99
   */
  max?: number;

  /**
   * Users to suggest
   * @default []
   */
  suggestions?: UserInfo[];

  /**
   * Users to exclude from suggestions & search
   * @default []
   */
  excludeUsers?: UserInfo[];

  /**
   * The type of picker
   * @default "normal"
   */
  pickerType?: "normal" | "compact" | "list";

  /**
   * It will show the secondary text of the user
   * @default true
   */
  showSecondaryText?: boolean;
};

export type PeopleInputProps = LocalPeopleInputProps &
  Omit<TagPickerProps, "children" | "value"> &
  Omit<TagPickerInputProps, "value">;

export type PeopleInputRef = {
  /**
   * The selected users
   */
  value: UserInfo[];

  /**
   * Resets the selected users
   */
  reset: () => void;

  /**
   * Sets the selected users
   * @param users The users to set
   * @default undefined
   */
  setValue: (users: UserInfo[]) => void;

  /**
   * Focuses the picker
   */
  focus: () => void;

  /**
   * Blurs the picker
   */
  blur: () => void;
};
