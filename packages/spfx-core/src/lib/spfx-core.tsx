import styles from './spfx-core.module.scss';

/* eslint-disable-next-line */
export interface SpfxCoreProps {}

export function SpfxCore(props: SpfxCoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SpfxCore!</h1>
    </div>
  );
}

export default SpfxCore;
