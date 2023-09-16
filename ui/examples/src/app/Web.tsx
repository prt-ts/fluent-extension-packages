import {
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Dropdown,
  FileInput,
  FocusConnectedError,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
} from '@prt-ts/fluent-formik';
import {
  Button
} from '@fluentui/react-components';
import { DismissSquareRegular } from '@fluentui/react-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  date: Yup.date().required('Required'),
  fileInput1: Yup.array().min(1, 'Required'),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',

  radio: {
    value: '2',
    label: 'Option 2',
  },
  checkboxGroup: [
    {
      value: '2',
      label: 'Option 2',
    },
  ],
  date: null,
  fileInput1: [],
};

export default function Web() {
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            actions.resetForm();
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <FocusConnectedError />
            <Input
              name="email"
              label="Email"
              size="small"
              type="email"
              placeholder="test placeholder"
            />
            <Input
              name="firstName"
              label="First Name"
              type="text"
              weight="semibold"
              required
              info={
                <>
                  <Button /> Some test example Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sit labore harum saepe
                  nesciunt, cumque soluta esse nulla, minima quam iure
                  beatae suscipit provident accusantium officia dolore? Eius
                  nostrum suscipit totam? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Possimus, explicabo quasi,
                  officia dignissimos reiciendis cupiditate optio sapiente
                  asperiores accusamus veritatis tenetur natus, voluptatum
                  dolor quisquam. Necessitatibus delectus temporibus
                  voluptatem tempora? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Laudantium, facere ut. Magnam, totam
                  fugiat animi dolores eligendi eos illo ipsa quaerat quas
                  pariatur laudantium ex rem reprehenderit inventore officia
                  minima. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Porro, aspernatur eos excepturi corrupti
                  quidem sint error in sit perspiciatis ab rerum assumenda
                  eum, eveniet, unde labore? Maxime ratione aspernatur
                  a!Loremlore Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat nostrum fuga architecto, nihil
                  sed id illum eos sequi tempora earum vero maxime
                  consequuntur enim accusantium laboriosam accusamus alias
                  adipisci inventore? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Autem laboriosam consequuntur officia
                  dolorem? Dolorem, consequatur illum reiciendis odit est
                  laboriosam sit? Sequi facere odio nisi at dolorem totam
                  vero quod? Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Illo voluptatem ipsum dolorem, esse quo
                  laudantium aperiam odit vel, ab placeat iure molestiae
                  perspiciatis fuga sequi dolorum harum optio ipsa. Aperiam.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate voluptates alias eligendi laborum ab cum ducimus
                  repellendus porro? Atque quaerat unde reprehenderit
                  aspernatur recusandae, dolor dicta praesentium iure
                  aliquam aliquid? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Adipisci impedit tenetur qui quo, id
                  odit, animi cupiditate aliquid exercitationem voluptas
                  saepe, sed quae velit quisquam nulla dolores fugit
                  perspiciatis veniam?
                </>
              }
            />
            <Input
              name="lastName"
              label="Last Name"
              size="large"
              type="text"
              weight="semibold"
              required
              info={
                <>
                  some info
                </>
              }
            />

            <Input
              type="datetime-local"
              name="datetime"
              label="Date Time Local"
            />
            <Input type="date" name="datetime1" label="Date" />

            <Input
              type="search"
              name="searchVal"
              label="Date"
              size='small'
              contentAfter={<DismissSquareRegular />}
            />

            <CheckboxGroup
              size='small'
              name="checkboxGroup"
              label="Checkbox Group Component"
              info={'Some info'}
              layout="vertical"
              enableSelectAll={true}
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2', meta: 'Some meta' },
                { value: '3', label: 'Option 3' },
                { value: '4', label: 'Option 4', disabled: true },
              ]}

              required
            />

            <RadioGroup
              size='small'
              name="radioGroup"
              label="Radio Group Component"
              info={'Some info'}
              layout="vertical"
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
                { value: '4', label: 'Option 4', disabled: true },
              ]}

              required
            />

            <Dropdown
              name="dropdownMultiple"
              label="Dropdown Component"
              info={'Some info'}
              size='small'
              options={[
                { value: '1', label: 'Option 1', text: 'Some text' },
                { value: '2', label: 'Option 2', text: 'Some text' },
                { value: '3', label: 'Option 3', text: 'Some text' },
                { value: '4', label: 'Option 4', text: 'Some text', disabled: true },
              ]}

              required={true}
              multiselect={true}
            />

            <Checkbox
              size='medium'
              name="checkbox1"
              label="Standalone Checkbox"
            />

            <FileInput
              name='fileInput1'
              label='File Input'
              info={'Some info'}
              size='small'
              required={true}
              hint={'Some hint for file input'}
            />

            <SpinButton
              size='small'
              name="spinButton1"
              label="Standalone Checkbox"
            />

            <Radio
              name="radioOption1"
              value={'1'}
              label="Value 1"
            />
            <Radio
              name="radioOption1"
              value={'2'}
              label="Value 2"
            />
            <Radio
              name="radioOption1"
              value={'3'}
              label="Value 3"

              info={'Some info'}
            />

            <Switch 
              name="checkbox1"
              label="Standalone Checkbox"
              labelPosition='before'
            />

            <Slider size='small' name={"slider1"} label={"Slider Example"} min={0} max={1000} step={10} />

            <DatePicker
              name="date"
              label={"Date"}
              size='small'
            />

            <button type="submit">Submit</button>

            <pre> {JSON.stringify(props.values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
