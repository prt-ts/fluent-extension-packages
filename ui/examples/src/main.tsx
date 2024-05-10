import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';

import App from './app/app';
import { FluentProvider } from '@fluentui/react-components';
import { ThemeService } from '@prt-ts/fluent-theme';
import { AppFeatureProvider } from '@prt-ts/fluent-common-features';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const { getTheme } = ThemeService();

export const AppRoot: React.FC = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    return isDarkMode.matches ? 'dark' : 'light';
  });
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    getTheme('#022347').then(setTheme).catch(console.error);
  }, [mode]);

  if (!theme) return <div>Loading...</div>;

  return (
    <FluentProvider theme={theme}>
      <div
        style={{
          minHeight: '100vh',
          margin: '0 auto',
          padding: '0',
        }}
      >
        <AppFeatureProvider>
          <button
            onClick={() => {
              setMode(mode === 'light' ? 'dark' : 'light');
            }}
          >
            {mode}
          </button>
          <App />
        </AppFeatureProvider>
      </div>
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
