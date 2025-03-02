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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={RefineThemes.Orange}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: 'posts',
              list: '/posts',
              create: '/posts/create',
            },
            {
              name: 'categories',
              list: '/categories',
              show: '/categories/show/:id',
            },
          ]}
        >
          <ThemedLayoutV2>
            <App />
          </ThemedLayoutV2>
        </Refine>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
