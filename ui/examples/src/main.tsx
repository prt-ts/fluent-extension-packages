import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <FluentProvider theme={teamsLightTheme}>
        <App />
      </FluentProvider>
    </BrowserRouter>
  </StrictMode>
);
