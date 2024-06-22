import { Button } from '@fluentui/react-components';
import {
  Form,
  Checkbox,
  DatePicker,
  Input,
  RadioGroup,
  Dropdown,
  useForm,
} from '@prt-ts/fluent-react-hook-form';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(20, 'First Name must be less than 20 characters'),
  lastName: yup.string().required('Last Name is required'),
  username: yup.string().required('Username is required'),
  subscribeEmail: yup.boolean(),
  subscribePhone: yup.boolean(),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  email: yup.string().when('subscribeEmail', ([subscribeEmail]) => {
    if (subscribeEmail)
      return yup
        .string()
        .email('Must be a valid email address')
        .required('Must enter email address');
  }),
  phoneNumber: yup.string().when('subscribePhone', ([subscribePhone]) => {
    if (subscribePhone)
      return yup
        .string()
        .matches(/^\d{10}$/, 'Must be a valid phone number')
        .required('Must enter phone number');
  }),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must contain a number')
    .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export type SignUpFormType = yup.InferType<typeof schema>;

const defaultValues: SignUpFormType = {
  firstName: '',
  lastName: '',
  username: '',
  dateOfBirth: null,
  subscribeEmail: false,
  subscribePhone: false,
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
};

export const SignUpForm = () => {
  const onSubmit = useCallback((data: SignUpFormType) => {
    console.log(data);

    // TODO: call api
  }, []);

  const signUpForm = useForm<SignUpFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  console.log('rendering');
  const subscribeEmail = signUpForm.watch('subscribeEmail');
  const subscribePhone = signUpForm.watch('subscribePhone');
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <h3>Sign Up Form Example</h3>
      <Form form={signUpForm} onSubmit={onSubmit}>
        <Input
          name={'firstName'}
          label={'First Name'}
          required={true}
          info={'test'}
          hint={'some hint for the field'}
        />

        <Input name={'lastName'} label={'Last Name'} required={true} />

        <Checkbox
          name={'subscribeEmail'}
          label="Subscribe to Email Notification"
          checkedLabel="Yes"
          uncheckedLabel="No"
          orientation="horizontal"
        />
        <Checkbox
          name={'subscribePhone'}
          label={'Subscribe to Text Message'}
          checkedLabel="Yes"
          uncheckedLabel="No"
          orientation="horizontal"
        />
        <Input name={'email'} label={'Email'} required={subscribeEmail} />
        <Input
          name={'phoneNumber'}
          label={'Phone Number'}
          required={subscribePhone}
        />

        <Input name={'username'} label={'Username'} required={true} />
        <Input
          name={'password'}
          type="password"
          label={'Password'}
          required={true}
        />
        <Input
          name={'confirmPassword'}
          type="password"
          label={'Confirm Password'}
          required={true}
        />

        <RadioGroup
          name={'radioGroup'}
          label={'Radio Group'}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
          layout="horizontal"
        />

        <DatePicker
          allowTextInput
          name={'dateOfBirth'}
          label={'Date of Birth'}
        />

        <Dropdown
          name={'hobbies'}
          label={<strong>Hobbies</strong>}
          options={[
            { label: 'Reading', value: 'reading' },
            { label: 'Writing', value: 'writing' },
            {
              label: 'Coding',
              value: 'coding',
              optionProps: {
                disabled: true,
              },
            },
          ]}
          multiselect
        />

        {/* <Calendar
          name={'dateOfBirth'}
          label={'Date of Birth'}
          dateRangeType={DateRangeType.Month}
        /> */}

        <Button type="submit" appearance="primary">
          Sign Up
        </Button>
      </Form>
      {/* <DevTool control={signUpForm.control} />   */}
    </div>
  );
};
