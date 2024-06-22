import {
  TagPickerInputProps,
  TagPickerProps,
} from '@fluentui/react-components';

type LocalTagInputProps = {
  /**
   * The selected tags
   * @default []
   */
  value?: string[];

  /**
   * Callback when tag selection changes
   * @param on TagSelect The selected
   * @default undefined
   */
  onTagSelect?: (user: string[]) => void;

  /**
   * If true, the picker will be lazy loaded
   * @default false
   */
  lazyLoad?: boolean;

  /**
   * Callback to search users
   * @param query The search query
   * @returns The list of users
   * @default undefined
   */
  onTagSearch?: (query: string) => Promise<string[]>;

  /**
   * Callback when an internal error occurs
   * @param errorMessage The error message
   * @default undefined
   * @description This callback is used to handle internal errors
   * For example, you can use this callback to show a toast notification
   * when an internal error occurs
   */
  onInternalError?: (errorMessage?: string) => void;

  /**
   * If true, multiple users can be selected
   * @default true
   */
  multiselect?: boolean;

  /**
   * If true, multiple users can be selected
   * @default true
   */
  freeform?: boolean;

  /**
   * Selected users layout
   * @default "horizontal"
   */
  layout?: 'horizontal' | 'vertical';

  /**
   * Maximum number of users that can be selected
   * @default 99
   */
  max?: number;

  /**
   * The suggestions to show in the picker
   * @default []
   */
  suggestions?: string[];
};

export type TagInputProps = LocalTagInputProps &
  Omit<TagPickerProps, 'children' | 'value'> &
  Omit<TagPickerInputProps, 'value'>;

export type TagInputRef = {
  /**
   * The selected users
   */
  value: string[];

  /**
   * Resets the selected users
   */
  reset: () => void;

  /**
   * Sets the selected users
   * @param users The users to set
   * @default undefined
   */
  setValue: (users: string[]) => void;

  /**
   * Focuses the picker
   */
  focus: () => void;

  /**
   * Blurs the picker
   */
  blur: () => void;
};
