import { Box } from '@mui/material';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export const Route = createRootRoute({
  component: RootComponent,
});

const NAVBAR_HEIGHT = 100;
const FOOTER_HEIGHT = 100;
const CHILDREN_HEIGHT = `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`;

function RootComponent() {
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
