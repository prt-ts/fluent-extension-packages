/* eslint-disable */
import { Card, CardPreview, CardHeader, Caption1, Button, Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { CloudError48Filled, MoreHorizontal20Regular } from '@fluentui/react-icons';
import * as React from 'react';

export const ErrorFallback: React.FC<{
  error: Error;
}> = ({ error }) => {

  const styles = useStyles();

  return (
    <div role="alert">
      <Card className={styles.card} appearance='subtle'>
        <CardHeader
          image={<CloudError48Filled className={styles.headerImage}  />}
          header={<Text weight="semibold" className={styles.text}>Runtime Error!!!</Text>}
          description={
            <Caption1 className={styles.caption}>
              This Part of the Application Not Working
            </Caption1>
          }
        />
        <CardPreview>
          <pre className={styles.cardPreview}>{error.message}</pre>
        </CardPreview>
      </Card>
    </div>
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
    maxWidth: '80px',
    maxHeight: '80px',
    width: '80px',
    height: '80px',
    color: tokens.colorPaletteRedForeground1,
  },

  cardPreview: {
    ...shorthands.margin('10px'),
    color: tokens.colorPaletteRedForeground1,
  },

  caption: {
    color: tokens.colorPaletteRedForeground3,
    fontSize: tokens.fontSizeBase500,
  },

  text: {
    ...shorthands.margin(0),
    fontSize: tokens.fontSizeHero700,
    color: tokens.colorPaletteRedForeground1,
  },
});

