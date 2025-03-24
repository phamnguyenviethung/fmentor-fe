/* eslint-disable react-hooks/exhaustive-deps */
import { AccountApi, Term, TermApi, TermStatus } from '@libs';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import PageLoader from '../components/Loader/PageLoader';
import Navbar from '../components/Navbar';
import useAppStore from '../configs/store.config';

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not Found</div>,
});

const NAVBAR_HEIGHT = 80;

function RootComponent() {
  const store = useAppStore();
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: AccountApi.getProfile,
    refetchOnWindowFocus: false,
  });
  const termQuery = useQuery({
    queryKey: ['currentTerm'],
    queryFn: TermApi.getTerms,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (profileQuery.isSuccess) {
      store.setUser(profileQuery.data);
    }
  }, [profileQuery.isSuccess]);

  useEffect(() => {
    if (termQuery.isSuccess) {
      const t = termQuery.data.items.find((term: Term) => {
        return term.status === TermStatus.ACTIVE;
      });
      store.setTerm(t ?? null);
    }
  }, [termQuery.isSuccess]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      store.logout();
    }
  }, []);

  if (profileQuery.isLoading || termQuery.isLoading) {
    return <PageLoader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          height: NAVBAR_HEIGHT,
          flexShrink: 0,
        }}
      >
        <Navbar />
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          py: 4,
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          backgroundColor: '#111',
          color: 'white',
          flexShrink: 0,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
