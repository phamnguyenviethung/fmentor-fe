import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
