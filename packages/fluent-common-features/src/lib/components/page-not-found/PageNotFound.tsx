
/* eslint-disable */
import {
  Card,
  CardPreview,
  CardHeader,
  Caption1,
  Button,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  GlobeSearchRegular,
  PresenceBlocked24Regular,
} from '@fluentui/react-icons';
import * as React from 'react';

export const PageNotFound: React.FC<{
  additionalInfo?: React.ReactNode;
}> = ({ additionalInfo }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        image={<GlobeSearchRegular className={styles.headerImage} />}
        header={
          <Text weight="semibold" className={styles.text}>
            404!!!
          </Text>
        }
        description={
          <Caption1 className={styles.caption}>
            The page you are looking for does not exist.
          </Caption1>
        }
      />
      <CardPreview>
        <pre className={styles.cardPreview}>{additionalInfo}</pre>
      </CardPreview>
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content',
  },

  headerImage: {
    ...shorthands.borderRadius('4px'),
    maxWidth: '44px',
    maxHeight: '44px',
    width: '44px',
    height: '44px',
    color: tokens.colorPaletteRedForeground1,
  },

  cardPreview: {
    ...shorthands.margin('10px'),
    color: tokens.colorPaletteRedForeground1,
  },

  caption: {
    color: tokens.colorPaletteRedForeground3,
  },

  text: {
    ...shorthands.margin(0),
    color: tokens.colorPaletteRedForeground1,
  },
});
