/* eslint-disable react-hooks/exhaustive-deps */
import NotFound from '@main/components/NotFound';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return <Outlet />;
}
