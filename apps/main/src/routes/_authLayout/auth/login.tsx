import { Box, Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { API_URL } from '@libs/api/axiosClient';
export const Route = createFileRoute('/_authLayout/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          window.location.replace(
            API_URL + '/api/authentication/signin-google'
          );
        }}
      >
        Login
      </Button>
    </Box>
  );
}
