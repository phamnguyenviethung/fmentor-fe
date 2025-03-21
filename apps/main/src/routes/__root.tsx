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

const NAVBAR_HEIGHT = 100;
const FOOTER_HEIGHT = 100;
const CHILDREN_HEIGHT = `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          height: NAVBAR_HEIGHT,
        }}
      >
        <Navbar />
      </Box>
      <Box sx={{ height: CHILDREN_HEIGHT }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          height: FOOTER_HEIGHT,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
