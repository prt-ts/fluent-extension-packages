import styles from './fluent-input-extensions.module.scss';

/* eslint-disable-next-line */
export interface FluentInputExtensionsProps {}

export function FluentInputExtensions(props: FluentInputExtensionsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FluentInputExtensions!</h1>
    </div>
  );
}

export default FluentInputExtensions;
