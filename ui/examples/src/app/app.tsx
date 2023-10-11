// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Web from './Web';

import { Route, Routes, Link } from 'react-router-dom';
import { TableExample } from "./TableExample";
import { ErrorPage } from "./ErrorComponent";
import { AccessDenied, ErrorBoundary, PageNotFound } from "@prt-ts/fluent-common-features";
import { Divider } from '@fluentui/react-components';
import { ReactHookForm } from './RHFTest';
import { SignUpForm } from './examples/SignUpForm/SignUpForm';


export function App() {
  return (
    <div>
      <div style={{
        marginBottom: '1rem',
      }}>
        <ul
          role="navigation"
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
        </ul>
        <Divider />
      </div>
      <Routes>
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
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>


      {/* END: routes */}
    </div>
  );
}

export default App;
