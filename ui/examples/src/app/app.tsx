// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Web from './Web';

import { Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { TableExample } from "./TableExample";
import { ErrorPage } from "./ErrorComponent";
import { AccessDenied, ErrorBoundary, PageNotFound } from "@prt-ts/fluent-common-features";
import { Divider } from '@fluentui/react-components';
import { ReactHookForm } from './RHFTest';
import { SignUpForm } from './examples/SignUpForm/SignUpForm';
import Features from './examples/FeatureComp/Features';

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
        {/* <ul
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
            <Link to="/">Fluent Formik</Link>
          </li>
          <li>
            <Link to="/page-2">Table</Link>
          </li>
          <li>
            <Link to="/page-3">Error Boundary</Link>
          </li>
          <li>
            <Link to="/page-4">React Hook Form</Link>
          </li>
          <li>
            <Link to="/page-5">Common Features</Link>
          </li>
        </ul> */}
        <Divider />
      </div>
      <RouterProvider router={router} />

      {/* END: routes */}
    </div>
  );
}

export default App;
