import {
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
} from '@fluentui/react-components';
import { Case, For, Show, Switch } from '@prt-ts/react-control-flow';
import * as React from 'react';

type User = {
  name: string;
  age: number;
  role: string;
};

const users: User[] = [
  {
    name: 'John',
    age: 42,
    role: 'admin',
  },
  {
    name: 'Jane',
    age: 21,
    role: 'user',
  },
  {
    name: 'Joe',
    age: 32,
    role: 'user',
  },
];

const Controls: React.FC = () => {
  return (
    <div>
      <h1>Controls</h1>
      <ForExample />
      <Divider />
      <ShowExample />
      <Divider />
      <SwitchExample />
    </div>
  );
};

export default Controls;

// create for example
const ForExample: React.FC = () => {
  return (
    <>
      <h2>For</h2>
      <For each={users}>
        {(user, index) => (
          <div key={index}>
            {index + 1} - {user.name} - {user.age} - {user.role}
          </div>
        )}
      </For>

      <h2>For with empty state</h2>
      <For each={[]} emptyState={<div>No users</div>}>
        {(user, index) => (
          <div>
            {index + 1} - {user.name} - {user.age} - {user.role}
          </div>
        )}
      </For>
    </>
  );
};

// create show example
const ShowExample: React.FC = () => {
  const condition = 15 > 10;
  return (
    <>
      <h2>Show</h2>
      <Show when={condition}>
        <div>This is visible because condition is true</div>
      </Show>
      <Show
        when={!condition}
        fallback={<> This is visible because condition is false </>}
      >
        <div>This will not be visible</div>
      </Show>
    </>
  );
};

const useStyles = makeStyles({
  card: {
    width: '100%',
    maxWidth: '200px',
    minHeight: '200px',
  },
});

// create switch example
const SwitchExample: React.FC = () => {
  const [status, setStatus] = React.useState<
    'success' | 'error' | 'ideal' | 'staled' | 'sth-else'
  >('success');
  const [count, setCount] = React.useState(0);
  const styles = useStyles();
  return (
    <div>
      <h2>Switch</h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div>status: {status}</div>
        <Button onClick={() => setStatus('success')}>Success</Button>
        <Button onClick={() => setStatus('error')}>Error</Button>
        <Button onClick={() => setStatus('ideal')}>Ideal</Button>
        <Button onClick={() => setStatus('staled')}>Staled</Button>
        <Button onClick={() => setStatus('sth-else')}>
          Something Else (not matching any case)
        </Button>
      </div>
      <div>
        <Switch when={status}>
          <Case value={'success'}>
            <div>Success Case</div>
          </Case>
          <Case value={['error', 'ideal']}>
            <div>Error Case or Idle</div>
          </Case>
          <Case value={'staled'}>
            <div>Staled Case</div>
          </Case>
        </Switch>
      </div>

      <h3>Switch Case to mimic if, elseif, else</h3>
      <div>
        <div> count: {count}</div>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Switch
          when={true}
          fallback={
            <Card className={styles.card}>
              <CardHeader header={'Count is greater than 15'}></CardHeader>
            </Card>
          }
        >
          <Case value={count <= 0}>
            <Card className={styles.card}>
              <CardHeader
                header={'Count is less than or equal to 0'}
              ></CardHeader>
            </Card>
          </Case>
          <Case value={count > 0 && count <= 10}>
            <Card className={styles.card}>
              <CardHeader header={'Count is in between 1-10'}></CardHeader>
            </Card>
          </Case>
          <Case value={count > 10 && count <= 15}>
            <Card className={styles.card}>
              <CardHeader header={'Count is in between 11-15'}></CardHeader>
            </Card>
          </Case>
        </Switch>
      </div>
    </div>
  );
};
