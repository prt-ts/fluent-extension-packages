/* eslint-disable */
import { PeopleInputProps } from "../PeoplePicker";
import { FieldProps, InfoLabelProps } from "@fluentui/react-components";

export type PeoplePickerProps = Omit<PeopleInputProps, "value"> &
  InfoLabelProps &
  Omit<FieldProps, "size"> & {
    name: string;
    rules?: any;
  };
