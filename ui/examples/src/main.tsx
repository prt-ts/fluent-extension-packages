import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';

import App from './app/app';
import { FluentProvider, Spinner } from '@fluentui/react-components';
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
    getTheme('#751d1f', mode === 'dark', 0.8)
      .then(setTheme)
      .catch(console.error);
  }, [mode]);

  if (!theme) return <Spinner title="Please wait" />;

  return (
    <FluentProvider theme={theme}>
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
