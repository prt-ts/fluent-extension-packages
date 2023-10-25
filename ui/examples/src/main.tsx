import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';

import App from './app/app';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { ThemeService } from '@prt-ts/fluent-theme';
import { AlertProvider, LoadingProvider } from '@prt-ts/fluent-common-features';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const { getTheme } = ThemeService();

export const AppRoot: React.FC = () => {
  const [theme, setTheme] = React.useState(teamsLightTheme);

  React.useEffect(() => {
    getTheme('#751d1f').then(setTheme).catch(console.error);
  }, []);

  return (
    <FluentProvider theme={theme}>
      <LoadingProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </LoadingProvider>
    </FluentProvider>
  );
};

root.render(
  <StrictMode>
    {/* <BrowserRouter> */}
      <AppRoot />
    {/* </BrowserRouter> */}
  </StrictMode>
);
