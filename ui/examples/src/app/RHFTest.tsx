
import {
  Button,
} from '@fluentui/react-components';
import {
  useForm,
  Form,
  Checkbox,
  DatePicker,
  Input,
  Slider,
  Switch,
  Textarea,
  SpinButton,
  RichInput,
  Dropdown,
  CurrencyInput,
  FileInput,
  TimePicker,
  Rating,
  RatingDisplay,
  CheckboxGroup,
  RadioGroup,
  Radio,
  PeoplePicker,
} from '@prt-ts/fluent-react-hook-form';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { defaultValues, useDefaultValues } from './examples/useDefaultValue';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { DevTool } from '@hookform/devtools';

import { useNavigate, unstable_usePrompt as usePrompt } from 'react-router-dom';
import { debouncedSearchUserInfo } from './data/UserInfo';
import { UserInfo } from '@prt-ts/types';
import { GroupedTagPicker } from './examples/PeoplePicker/PeoplePicker';

const nameSchema = yup
  .string()
  .required('First Name is required')
  .min(10, 'Min 10')
  .max(15, 'Max 15')

const schema = yup.object({
  peoplePicker: yup.array().of(
    yup.object({
      id: yup.string().required('Id is required'),
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required'),
    })
  ).min(1, 'People Picker is required'),
  rating: yup.number().required('Rating is required'),
  firstName: nameSchema,
  firstName1: nameSchema,
  firstName2: nameSchema,
  firstName3: nameSchema,
  firstName4: nameSchema,
  lastName: yup.string().required('Last Name is required'),
  iceCreamType: yup.object().required('Ice Cream Type is required'),
  arrayItem: yup.array().of(
    yup
      .object({
        label: yup.string().required('Array Item Label is required'),
        value: yup.string().required('Array Item Value is required'),
        active: yup.boolean(),
        likePercentage: yup.number(),
      })
      .required('Array Item is required')
  ),
  // datePickerValue: yup.date().notRequired().required('Date Picker is required'),
  // isIceCreamLiked: yup.boolean().required('Is Ice Cream Liked is required'),
  // yesNoQuestionCheckbox: yup
  //   .boolean()
  //   .required('Yes No Question Checkbox is required'),
  // slider: yup.number().required('Slider is required'),
  // textarea: yup.string().required('Textarea is required'),
  // SpinButton: yup.number().required('Spin Button is required'),
  attachments: yup.array().min(1, 'Attachments is required'),
});

const onResolveUsers = async (users: UserInfo[]) => {
  const lastUser = users[users.length - 1];

  return {
    resolvedUserInfo: users,
    error: `Error resolving user: ${lastUser.name}`
  }; 
}

export type IFormInput = yup.InferType<typeof schema>;

export const ReactHookForm = () => {
  const onSubmit = useCallback((data: IFormInput) => {
    console.log(data);
  }, []);

  const values = useDefaultValues();

  const testForm = useForm<IFormInput>({
    defaultValues: defaultValues,
    values: values,
    resolver: yupResolver(schema),
  });

  const getFormValue = useCallback(() => {
    console.log(testForm?.getValues());
  }, [testForm]);

  const getFromError = useCallback(() => {
    console.log(testForm?.formState.errors);
  }, [testForm]);

  const arrayItem = testForm?.watch('arrayItem');
  const addMore = useCallback(() => {
    testForm?.setValue('arrayItem', [
      ...(arrayItem || []),
      { label: '', value: '' },
    ]);
  }, [arrayItem, testForm]);

  usePrompt({
    when: testForm?.formState.isDirty,
    message: 'You have unsaved changes, are you sure you want to leave?',
  });

  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  console.log('rendering');

  const [isView, setIsView] = useState(false);

  const monthOptions = useMemo(() => {
    return [
      {
        label: 'January',
        value: 1,
        meta: {
          shortName: 'Jan'
        },
        checkboxProps: {
          disabled: false
        },
        radioProps: {
          disabled: true
        }
      },
      { label: 'February', value: 2, meta: { shortName: 'Feb' } },
      { label: 'March', value: 3, meta: { shortName: 'Mar' } },
      { label: 'April', value: 4, meta: { shortName: 'Apr' } },
      { label: 'May', value: 5, meta: { shortName: 'May' } },
      { label: 'June', value: 6, meta: { shortName: 'Jun' } },
      { label: 'July', value: 7, meta: { shortName: 'Jul' } },
      { label: 'August', value: 8, meta: { shortName: 'Aug' } },
      { label: 'September', value: 9, meta: { shortName: 'Sep' } },
      { label: 'October', value: 10, meta: { shortName: 'Oct' } },
      { label: 'November', value: 11, meta: { shortName: 'Nov' } },
      { label: 'December', value: 12, meta: { shortName: 'Dec' } },
    ];
  }, []);

  const truFalseOptions = useMemo(() => {
    return [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ];
  }, []);

  const textInputOptions = useMemo(() => {
    return [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ];
  }, []);

  console.log("formValue", testForm.watch());

  const value = testForm.watch('firstName2');

  return (
    <>
      <Button onClick={getFormValue}>Get Form Value</Button>
      <Button onClick={getFromError}>Get Form Error</Button>
      <Button onClick={addMore}>Add Dynamic Values</Button>
      <Button onClick={() => setIsView((viewOnly) => !viewOnly)}>Toggle View</Button>
      <Form form={testForm} onSubmit={onSubmit}>

        <PeoplePicker name={'peoplePicker'} label={'People Picker'} onSearchUsers={debouncedSearchUserInfo} onResolveUsers={onResolveUsers} multiselect readOnly={isView} placeholder='Search users' />

        <GroupedTagPicker />
        {/* <Input
          name={'firstName1'}
          label={'First Name'}
          placeholder='Enter First Name'
          required={true}
          appearance={isView ? "underline" : undefined}
          disabled={isView}
          readOnly={isView}
          autoCompleteOptions={['one', 'two', 'three']}
          autoComplete='false' /> */}

        <br />
        <RichInput showRibbon={true} label={<>Small Label</>} name={"firstName2"} placeholder='Enter First Name' size='small' style={{ minHeight: "30vh"}}/>

        <br />

        {/* <RichInput showRibbon={true} label={<>Medium Label</>} name={"firstName3"} size="medium" placeholder='Enter First Name'/>

        <br />

        <RichInput showRibbon={true} label={<>Large Label</>} name={"firstName4"} size="large" placeholder='Enter First Name'/> */}

        <div dangerouslySetInnerHTML={{ __html: value }}></div>

        <div>
          <strong>Text Value:</strong>

        </div>

        <Rating name={'rating'} label={'Rating'} step={0.5} max={5} color={"marigold"} />
        <RatingDisplay name={'rating'} label={'Rating Display'} compact color={"marigold"} />

        <Radio name='radio_single_input1' value={true} radioLabel={"Yes"} />
        <Radio name='radio_single_input2' value={false} radioLabel={"No"} />

        <CheckboxGroup
          name={'checkboxGroup'}
          label={'Checkbox Group (Number)'}
          layout='horizontal'
          options={monthOptions} />

        <CheckboxGroup
          name={'checkboxGroupTrueFalse'}
          label={'Checkbox Group (True/False)'}
          layout='horizontal'
          options={truFalseOptions} />

        <CheckboxGroup
          name={'checkboxGroupText'}
          label={'Checkbox Group (Text)'}
          layout='horizontal'
          options={textInputOptions} />

        <RadioGroup
          name={'radioGroup'}
          label={'Radio Group (Number)'}
          layout='horizontal'
          options={monthOptions} />

        <RadioGroup
          name={'radioGroupTrueFalse'}
          label={'Radio Group (True/False)'}
          layout='horizontal'
          options={truFalseOptions} />

        <RadioGroup
          name={'radioGroupText'}
          label={'Radio Group (Text)'}
          layout='horizontal'
          options={textInputOptions} />

        <Dropdown
          name={'dropdownNumber'}
          label={'Checkbox Group (Number)'}
          options={[
            { label: "Months", options: monthOptions },
            { label: "True/False", options: truFalseOptions },
            { label: "Text", options: textInputOptions }
          ]}
          multiselect />

        <Input
          name={'firstName'}
          label={'First Name'}
          required={true}
          appearance={isView ? "underline" : undefined}
          disabled={isView}
          readOnly={isView}
          autoCompleteOptions={['one', 'two', 'three']}
          autoComplete='false' />

        <Input
          name={'phoneNumber'}
          label={'Phone Number'}
          required={true}
          fieldMask='phone'
        />

        <Input
          name={'currencyValue'}
          label={'Currency'}
          required={true}
          fieldMask='currency'
        />

        <CurrencyInput
          name={'currencyValue'}
          label={'Currency'}
          required={true}
        />

        <Input
          name={'creditCard'}
          label={'Credit Card'}
          required={true}
          fieldMask='creditCard'
        />

        <Input
          name={'lastName'}
          label={<>LastName with Info</>}
          required={true}
          info={
            <>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequuntur, qui ut voluptatem repudiandae voluptates accusamus
              eaque quia deleniti laudantium facilis tempore temporibus
              asperiores nemo, quis consequatur praesentium ea, eius pariatur.
            </>
          }
        />

        {/* <Table size="extra-small">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                <strong>Selected</strong>
              </TableHeaderCell>
              <TableHeaderCell>
                <strong>Label</strong>
              </TableHeaderCell>
              <TableHeaderCell>
                <strong>Value</strong>
              </TableHeaderCell>
              <TableHeaderCell>
                <strong>Is Active</strong>
              </TableHeaderCell>
              <TableHeaderCell>
                <strong>Like Percentage</strong>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(arrayItem || [])?.map((item, index: number) => (
              <Fragment key={index + item.value}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      name={`arrayItem.${index}.selected`}
                      shape="circular"
                      
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`arrayItem.${index}.label`}
                      placeholder="Enter Label..."
                      appearance='filled-lighter'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`arrayItem.${index}.value`}
                      placeholder="Enter Value..."
                      appearance='filled-lighter'
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      name={`arrayItem.${index}.isActive`}
                      checkedLabel={'Yes'}
                      uncheckedLabel={'No'}
                      orientation="horizontal"
                    />
                  </TableCell>
                  <TableCell>
                    <Slider
                      name={`arrayItem.${index}.likePercentage`}
                      min={0}
                      max={100}
                      hint={`${item.likePercentage || 0}%`}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        const newArrayItem = [
                          ...(testForm?.getValues()?.arrayItem || []),
                        ];
                        newArrayItem.splice(index, 1);
                        testForm?.setValue(`arrayItem`, newArrayItem);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table> */}
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Label</th>
              <th>Value</th>
              <th>Is Active</th>
              <th>Like Percentage</th>
            </tr>
          </thead>
          <tbody>
            {(arrayItem || [])?.map((item, index: number) => (
              <Fragment key={index + item.value}>
                <tr >
                  <td>
                    <Checkbox
                      name={`arrayItem.${index}.selected`}
                      shape="circular"
                    />
                  </td>
                  <td>
                    <Input
                      name={`arrayItem.${index}.label`}
                      placeholder="Enter Label..."
                    />
                  </td>
                  <td>
                    <Input
                      name={`arrayItem.${index}.value`}
                      placeholder="Enter Value..."
                    />
                  </td>
                  <td>
                    <Switch
                      name={`arrayItem.${index}.isActive`}
                      checkedLabel={'Yes'}
                      uncheckedLabel={'No'}
                      orientation="horizontal"
                    />
                  </td>
                  <td>
                    <Slider
                      name={`arrayItem.${index}.likePercentage`}
                      min={0}
                      max={100}
                      hint={`${item.likePercentage || 0}%`}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        const newArrayItem = [
                          ...(testForm?.getValues()?.arrayItem || []),
                        ];
                        newArrayItem.splice(index, 1);
                        testForm?.setValue(`arrayItem`, newArrayItem);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        <DatePicker
          allowTextInput
          name={'datePickerValue'}
          label={'Date Picker'}
        />
        <Switch
          name={'isIceCreamLiked'}
          label={'Do you like Ice Cream?'}
          checkedLabel={'Yes'}
          uncheckedLabel={'No'}
          orientation="horizontal"
        />
        <Switch
          name={'isOIceCreamLiked'}
          label={'Do you like another Ice Cream?'}
          checkedLabel={'Yes'}
          uncheckedLabel={'No'}
          orientation="horizontal"
        />
        <Switch
          name={'isVIceCreamLiked'}
          label={'Do you like vanilla Ice Cream?'}
          checkedLabel={'Yes'}
          uncheckedLabel={'No'}
          orientation="horizontal"
        />
        <Checkbox
          shape="circular"
          name={'yesNoQuestionCheckbox'}
          label={'Yes/No Checkbox, Please Confirm Following'}
          checkedLabel={'Yes'}
          uncheckedLabel={'No'}
        />

        <Slider name={'slider'} label={'Slider'} min={0} max={100} />
        <RichInput
          name="richHTMLText"
          size="large"
          label={<strong>Rich Input Text</strong>}
        />
        <RichInput
          name="richHTMLText"
          size="large"
          label={<strong>Rich Input Viewer</strong>}
          readOnly
        />

        <Textarea
          name="textarea"
          size="small"
          label={<strong>Textarea</strong>}
          info={<>Info Details</>}
        />
        <Textarea
          name="textarea"
          size="medium"
          label={<strong>Textarea</strong>}
        />
        <Textarea
          name="textarea"
          size="large"
          label={<strong>Textarea</strong>}
        />

        <SpinButton
          name="spinButton"
          size="small"
          label={<strong>Spin Button</strong>}
        />
        <SpinButton
          name="spinButton"
          size="medium"
          label={<strong>Spin Button</strong>}
        />

        <Dropdown
          name={'dropdownValue'}
          label={'Ice Cream Type'}
          options={[
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
          ]}
          readOnly
        />

        <Dropdown
          multiselect
          name={'dropdownValueMultiple'}
          label={'Ice Cream Type'}
          options={[
            {
              label: 'Vanilla',
              value: 'vanilla',
              optionProps: { disabled: true },
            },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
          ]}
        />

        <FileInput
          name={'attachments'}
          label={<strong>Attachments</strong>}
          multiple={true}
          maxFiles={3}
          // maxSize={5}
          savedFiles={[
            {
              name: 'file1',
              size: 100,
              type: 'image/png',
              path: 'https://via.placeholder.com/150',
            },
            {
              name: 'file2',
              size: 100,
              type: 'image/png',
              path: 'https://via.placeholder.com/150',
            },
          ]}
          onRemoveSavedFile={(file) => {
            console.log(file);
          }}
        />

        <TimePicker name={'timePickerValue'} label={'Time Picker'} />

        <Button type="submit" appearance="primary">
          Submit
        </Button>
        <Button onClick={onCancel} appearance="secondary">
          Cancel
        </Button>
      </Form>
      {/* <DevTool control={testForm.control} />   */}
    </>
  );
};
