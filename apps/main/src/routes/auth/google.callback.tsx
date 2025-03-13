import { createFileRoute } from '@tanstack/react-router';
import AuthApi from '@libs/api/authApi';
import { useQuery } from '@tanstack/react-query';
export const Route = createFileRoute('/auth/google/callback')({
  component: RouteComponent,
});

const KEY = 'content-hash';

function RouteComponent() {
  const search: {
    [KEY]?: string;
  } = Route.useSearch();

  const query = useQuery({
    queryKey: ['google-callback', search[KEY]],
    queryFn: () => {
      return AuthApi.login(search[KEY]);
    },
    enabled: !!search[KEY],

    retry: 1,
  });
  if (query.isLoading) {
    return <p>asd</p>;
  }
  console.log(query.data);

  return <div>Hello "/auth/google/callback"!</div>;
}
