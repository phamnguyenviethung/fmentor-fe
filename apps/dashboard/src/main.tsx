import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app';
import { Refine } from '@refinedev/core';
import { dataProvider } from './providers/dataProvider';
import { RefineThemes, ThemedLayoutV2 } from '@refinedev/mui';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import routerProvider from '@refinedev/react-router';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { authProvider } from './providers/authProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThemeProvider theme={RefineThemes.OrangeDark}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <BrowserRouter>
          <Refine
            dataProvider={dataProvider}
            routerProvider={routerProvider}
            authProvider={authProvider}
            resources={[
              {
                name: 'accounts',
                list: '/accounts',
                create: '/accounts/create',
                show: '/accounts/:id',
              },
              {
                name: 'projects',
                list: '/projects',
                show: '/projects/:id',
              },
              {
                name: 'transactions',
                list: '/transactions',
              },
            ]}
          >
            <ReactQueryDevtools initialIsOpen={false} />

            <App />
          </Refine>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
