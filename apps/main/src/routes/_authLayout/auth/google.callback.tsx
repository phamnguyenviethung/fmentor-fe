import authApi from '@libs/api/authApi';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import useAppStore from '../../../configs/store.config';
import { TokenPayload } from '@libs/api/interfaces';
import { Account } from '@libs/api/interfaces/account.interface';
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
      return authApi.login(search[KEY]);
    },
    onSuccess: (data: TokenPayload & Account) => {
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
