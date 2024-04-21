import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';

import App from './app/app';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { ThemeService } from '@prt-ts/fluent-theme';
import { AppFeatureProvider } from '@prt-ts/fluent-common-features';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const { getTheme } = ThemeService();

export const AppRoot: React.FC = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light'); // ['light', 'dark'
  const [theme, setTheme] = React.useState(teamsLightTheme);

  React.useEffect(() => {
    getTheme('#751d1f', mode === "dark", 0.8).then(setTheme).catch(console.error);
  }, [mode]);

  return (
    <FluentProvider theme={theme}>
      <AppFeatureProvider>
        <button onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
        }}>{mode}</button>
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
