import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import theme from '@main/configs/theme.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createRouter({ routeTree });


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
