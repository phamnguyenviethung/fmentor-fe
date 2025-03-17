import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import useAppStore from '../../../configs/store.config';
import { TokenPayload, AuthApi, Account } from '@libs';
export const Route = createFileRoute('/_authLayout/auth/google/callback')({
  component: RouteComponent,
});

const KEY = 'content-hash';

function RouteComponent() {
  const store = useAppStore();
  const search: {
    [KEY]?: string;
  } = Route.useSearch();

  const mutation = useMutation({
    mutationFn: () => {
      return AuthApi.login(search[KEY]);
    },
    onSuccess: (data: TokenPayload) => {
      const { accessToken, refreshToken } = data;
      store.setToken({ accessToken, refreshToken });
      window.location.href = '/';
    },
  });

  useEffect(() => {
    if (search[KEY]) {
      mutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Hello "/auth/google/callback"!</div>;
}
