import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import React from 'react';

const useFooterStyles = makeStyles({
  footerRoot: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(0, tokens.spacingHorizontalXL),
  },

  logo: {
    height: '35px',
    '& img': {
      height: '100%',
      width: '100%',
    },
  },

  copyRight: {
    fontSize: tokens.fontSizeBase300,

    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
});

// read logo from assets

const Footer: React.FC = () => {
  const styles = useFooterStyles();
  return (
    <div className={styles.footerRoot}>
      <div className={styles.logo}>Logo Here</div>
      <div className={styles.copyRight}>© Copyright here.</div>
    </div>
  );
};

export default Footer;
