/* eslint-disable  */
import * as React from "react";
import {
  Field,
  FieldProps,
  LabelProps,
  tokens,
  useId,
} from "@fluentui/react-components";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components";
import { useFormContext } from "@prt-ts/fluent-react-hook-form";
import { Controller } from "react-hook-form";
import { PeoplePickerProps } from "./PeoplePickerTypes";
import { PeopleInput, PeopleInputProps, PeopleInputRef } from "../PeoplePicker";

export const PeoplePickerField = React.forwardRef<
  PeopleInputRef,
  PeoplePickerProps
>(({ name, label, rules, required, ...props }, ref) => {
  const { ...fieldsProps }: FieldProps = props;
  const { ...infoLabelProps }: InfoLabelProps = props;
  const { ...peoplePickerProps }: PeopleInputProps = props;

  const inputId = useId("people-picker");
  const {
    form: { control },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref: fieldRef } = field;
        return (
          <Field
            {...fieldsProps}
            label={
              {
                children: (_: unknown, props: LabelProps) => (
                  <InfoLabel
                    {...infoLabelProps}
                    {...props}
                    htmlFor={inputId}
                    style={{
                      marginBottom: tokens.spacingVerticalXXS,
                      paddingBottom: tokens.spacingVerticalXXS,
                      paddingTop: tokens.spacingVerticalXXS,
                    }}
                  >
                    {label}
                  </InfoLabel>
                ),
              } as LabelProps
            }
            validationState={fieldState.invalid ? "error" : undefined}
            validationMessage={fieldState.error?.message}
            required={required}
            style={{ padding: 0, margin: 0 }}
          >
            <PeopleInput
              {...peoplePickerProps}
              id={inputId}
              value={value}
              onUserSelectionChange={(users) => {
                onChange(users);
                if (peoplePickerProps?.onUserSelectionChange) {
                  peoplePickerProps?.onUserSelectionChange?.(users);
                }
              }}
              onBlur={onBlur}
              ref={ref || fieldRef}
            />
          </Field>
        );
      }}
    />
  );
});
