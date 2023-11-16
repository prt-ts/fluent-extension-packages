// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Web from './Web';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { TableExample } from "./TableExample";
import { ErrorPage } from "./ErrorComponent";
import { AccessDenied, ErrorBoundary, PageNotFound } from "@prt-ts/fluent-common-features";
import { Button, Divider, Link } from '@fluentui/react-components';
import { ReactHookForm } from './RHFTest';
import { SignUpForm } from './examples/SignUpForm/SignUpForm';
import Features from './examples/FeatureComp/Features';
import DummyEditPage from './DummyEditPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <div>
            <Web />
          </div>
        }
      />
      <Route path="/page-2" element={<TableExample />} />
      <Route
        path="/dummy-edit/:id/:mode"
        element={<DummyEditPage />}
      />
      <Route
        path="/page-3"
        element={
          <>
            <ErrorBoundary>
              <ErrorPage />
            </ErrorBoundary>
            <AccessDenied />
            <PageNotFound />
            <Web />
          </>
        }
      />
      <Route path="/page-4" element={<ReactHookForm />} />
      <Route path="/page-5" element={<Features />} />
      <Route path="/sign-up" element={<SignUpForm />} />
    </>
  )
);


export function App() {
  return (
    <div>
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'start',
            gap: '1rem',
            listStyle: 'none',
            padding: '0',
            margin: '0',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          <li>
            <Link href="/">Fluent Formik</Link>
          </li>
          <li>
            <Link href="/page-2">Table</Link>
          </li>
          <li>
            <Link href="/page-3">Error Boundary</Link>
          </li>
          <li>
            <Link href="/page-4">React Hook Form</Link>
          </li>
          <li>
            <Link href="/page-5">Common Features</Link>
          </li>
          <li>
            <Link href="/Sign-Up">SignUp Form</Link>
          </li>
        </ul>
        <Divider />
      </div>
      <RouterProvider router={router} />

      {/* END: routes */}
    </div>
  );
}

export default App;
