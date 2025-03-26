import { Container } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/(public)/fake-login/$token')({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useParams();
  useEffect(() => {
    localStorage.setItem(
      'token',
      JSON.stringify({
        accessToken: token,
        refreshToken: 'fake-login-refresh-token',
      })
    );
    window.location.href = '/';
  }, [token]);

  if (!token) {
    return <div>Token is required</div>;
  }

  return <Container>Đã set {token}</Container>;
}
