import * as React from 'react';
import {
  Field,
  FieldProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
  shorthands,
  mergeClasses,
  makeStyles,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import {
  TimePicker,
  TimePickerProps,
  formatDateToTimeString,
} from '@fluentui/react-timepicker-compat-preview';

export type TimePickerFieldProps = FieldProps &
  InfoLabelProps & {
    name: string;
    rules?: ControllerProps['rules'];
    datePickerProps?: DatePickerProps;
    timePickerProps?: TimePickerProps;
  };

const useStyles = makeStyles({
  root: {
    maxWidth: '600px',
    width: '100%',
    marginBottom: '10px',
  },
  datePickerClass: {
    ...shorthands.flex(70),
  },
  timePickerClass: {
    ...shorthands.flex(30),
    minWidth: '130px',
  },
  timePickerInputClass: {
    minWidth: '100px',
  },
});

export const TimePickerField = forwardRef<
  HTMLInputElement,
  TimePickerFieldProps
>(({ name, rules, required, ...rest }, inputRef) => {
  const {
    form: { control },
  } = useFormContext();

  const { ...fieldProps }: FieldProps = rest;
  const { datePickerProps } = rest;
  const { timePickerProps } = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;

  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<
    Date | null | undefined
  >(null);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : ''
  );

  const onSelectDate: DatePickerProps['onSelectDate'] = (date) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      setSelectedTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        )
      );
    }
  };

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? '');
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value, ref } = field;

        return (
          <Field
            {...fieldProps}
            label={
              {
                children: (_: unknown, props: LabelProps) => (
                  <InfoLabel {...props} {...infoLabelProps} />
                ),
              } as unknown as InfoLabelProps
            }
            validationState={fieldState.invalid ? 'error' : undefined}
            validationMessage={fieldState.error?.message}
            required={required}
          >
            {(fieldProps) => (
              <div style={{ display: 'flex' }}>
                <DatePicker
                  placeholder="Select a date..."
                  {...datePickerProps}
                  value={value ?? null}
                  onSelectDate={onSelectDate}
                  className={mergeClasses(
                    styles.datePickerClass,
                    datePickerProps?.className
                  )}
                  {...fieldProps}
                  ref={inputRef || ref}
                />
                <TimePicker
                  placeholder="Select a time..."
                  freeform
                  {...timePickerProps}
                  dateAnchor={selectedDate ?? undefined}
                  selectedTime={selectedTime ?? undefined}
                  onTimeChange={onTimeChange}
                  value={timePickerValue}
                  onInput={onTimePickerInput}
                  className={styles.timePickerClass}
                  hourCycle={'h11'}
                  input={{
                    className: styles.timePickerInputClass,
                  }}
                  {...fieldProps}
                />
              </div>
            )}
          </Field>
        );
      }}
    />
  );
});
