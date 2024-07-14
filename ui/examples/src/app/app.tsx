// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Web from './Web';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TableExample } from './TableExample';
import { AppFeatureProvider } from '@prt-ts/fluent-common-features';
import { ReactHookForm } from './RHFTest';
import { SignUpForm } from './examples/SignUpForm/SignUpForm';
import Features from './examples/FeatureComp/Features';
import DummyEditPage from './DummyEditPage';
import Controls from './examples/Control/Controls';
import { TableExample2 } from './TableExample2';
import { EditableGrid } from './EditableGrid/EditableGrid';
import { InputExample } from './RHFormExamples/Input';

import { useEffect, useState } from 'react';
import { ThemeService } from '@prt-ts/fluent-theme';
import { FluentProvider } from '@fluentui/react-components';
import { Layout } from './layout/Layout';
import { extract } from '@prt-ts/types';

const { getTheme } = ThemeService();
export function useAppTheme() {
  const [theme, setTheme] = useState(null);

  // check if user have selected color scheme
  useEffect(() => {
    // check if user agent hs dark mode enabled
    const userPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    console.log('userPrefersDark', userPrefersDark);
    // if (userPrefersDark) {
    //     setTheme(webDarkTheme);
    //     return;
    // }
    // setTheme(webLightTheme);

    getTheme('#00AFED').then((theme) => {
      setTheme(theme);
    });
  }, []);
  return { theme };
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Web />,
      },
      {
        path: '/table',
        element: <TableExample />,
      },
      {
        path: '/table2',
        element: <TableExample2 />,
      },
      {
        path: '/editableGrid',
        element: <EditableGrid />,
      },
      {
        path: '/react-hook-form',
        element: <ReactHookForm />,
      },
      {
        path: '/signup',
        element: <SignUpForm />,
      },
      {
        path: '/features',
        element: <Features />,
      },
      {
        path: '/controls',
        element: <Controls />,
      },
      {
        path: '/input',
        element: <InputExample />,
      },
      {
        path: '/dummy-edit',
        element: <DummyEditPage />,
      },
    ],
  },
]);

type A = {
  nameA: string;
  descriptionA: string;
};

type B = {
  nameB: string;
  descriptionB: string;
};

type C = A & B;

const extractA = extract<A>({ nameA: true, descriptionA: true });
const extractB = extract<B>({ nameB: true, descriptionB: true });

function App() {
  const { theme } = useAppTheme();

  if (!theme) {
    return null;
  }

  const c: C = {
    nameA: 'A',
    descriptionA: 'A',
    nameB: 'B',
    descriptionB: 'B',
  };

  const a = extractA(c);
  const b = extractB(c);

  console.log(a, b);

  return (
    <FluentProvider theme={theme}>
      <AppFeatureProvider>
        <RouterProvider router={router} />
      </AppFeatureProvider>
    </FluentProvider>
  );
}

export default App;
