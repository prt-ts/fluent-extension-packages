# Control Flow React

Control Flow React is a lightweight package that provides minimal control flow components for React with typescript. These components are inspired by [Solid.js](https://www.solidjs.com/tutorial/flow_show) are designed to help developers refactor code in a declarative format that is more cleaner and easier to read or review.

### Contents

- [Difference](#differences)
- [Installation](#installation)
- [Iterative](#iteratives)
  - [For](#for)
- [Conditional](#conditionals)
  - [Show](#show)
  - [Switch](#switch)

### Differences

![Screenshot 2023-03-05 at 1 59 43 PM](https://user-images.githubusercontent.com/34669116/222950168-36be9d0b-6a30-4687-a1c4-5177e0034541.png)

## Installation

```sh
npm install @prt-ts/react-control-flow
```

## Iteratives

### For

Iterates over an array provided in `each` prop and renders the `children` function.
If the array is empty or falsy, then the `fallback` prop is rendered.

> Note: 'children' will be a function that receives in each iteration item and
> index <br> eg: `(item, index) => <div> {index} - {item </div>`

```jsx
import { For } from '@prt-ts/react-control-flow';
let stats = [
  { name: 'Argentina', trophies: 3 },
  { name: 'France', trophies: 2 },
  { name: 'Brazil', trophies: 5 },
];
return (
  <For each={stats}>
    {(country, index) => (
      <div>
        {index + 1} - {country.name} - {country.trophies}
      </div>
    )}
  </For>
);
```

```tsx
type ForProps<TItem extends RowData> = {
  each: TItem[] | undefined | null;
  children: (item: TItem, index: number) => JSX.Element;
  emptyState?: ReactNode | string | null;
};
const For: ({ each, children, emptyState }: iForProps) => ReactNode | null;
```

## Conditionals

### Show

Conditionally renders `children` or `fallback` based on condition provided to
`when` prop.

```jsx
import { Show } from '@prt-ts/react-control-flow';

let loggedIn = true;
return (
  <Show when={loggedIn} fallback={<Button>LogIn</Button>}>
    <Button>Logout</Button>
  </Show>
);
```

```tsx
type ShowProps = {
    when: boolean | number | string | any | undefined;;
    children: ReactNode | string | null;
    fallback?: ReactNode | string | null;
}
const Show: ({ when, children, fallback }: ShowProps) => ReactNode | null;
```

### Switch

Renders first matching `<Case>` if its props _**value** matches
with condition provided in _**when**_ prop to `<Switch>` component and if none of them
matches _**fallback**\_ will be rendered.

> Note: Pass an array to _***value***_ props in `<Case>` to match any one among
> them. <br> > `<Case>` should be direct child for `<Switch>`

```jsx
import { Switch, Case } from '@prt-ts/react-control-flow';

let { status, err } = await fetch(url).catch();
return (
  <Switch when={status} fallback={<div>Default Component</div>}>
    <Case value={'LoggedIn'}>
      <DashboardComponent />
    </Case>
    <Case value={'LoggedOut'}>
      <LoginComponent />
    </Case>
    {/* use value props for multiple match scenarios but it has to be array type */}
    <Case value={['UserNotFound', 'LoginError', 'WrongPass']}>
      <ErrorComponent err={err} />
    </Case>
  </Switch>
);
```

```tsx
type ConditionClause = boolean | number | string | any | undefined;
type SwitchProps = {
  when: ConditionClause;
  children: ReactNode;
  fallback: string | ReactNode | null;
};
const Switch: (props: SwitchProps) => ReactNode | null;
type CaseProps = {
  children: ReactNode;
  value: ConditionClause | ConditionClause[];
};
const Case: ({ children }: CaseProps) => ReactNode | null;
```
