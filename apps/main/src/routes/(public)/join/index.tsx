import { ProjectApi } from '@libs';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/join/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useSearch();
  const token = params.token as string;
  const query = useQuery({
    queryFn: () => ProjectApi.acceptInvitation(token),
    queryKey: ['acp', token],
    enabled: !!token,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error</div>;
  }

  return <div>Ok</div>;
}
