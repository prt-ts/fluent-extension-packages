import styles from './react-control-flow.module.scss';

/* eslint-disable-next-line */
export interface ReactControlFlowProps {}

export function ReactControlFlow(props: ReactControlFlowProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactControlFlow!</h1>
    </div>
  );
}

export default ReactControlFlow;
