import styles from './fluent-react-hook-form.module.scss';

/* eslint-disable-next-line */
export interface FluentReactHookFormProps {}

export function FluentReactHookForm(props: FluentReactHookFormProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FluentReactHookForm!</h1>
    </div>
  );
}

export default FluentReactHookForm;
