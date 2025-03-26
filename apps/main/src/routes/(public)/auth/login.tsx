import { API_URL } from '@libs';
import { Google } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import logo from '@main/assets/logo-dark.svg';

export const Route = createFileRoute('/(public)/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.replace(API_URL + '/api/authentication/signin-google');
  };

  const handleBackToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.03
        )} 0%, ${alpha(theme.palette.primary.light, 0.07)} 100%)`,
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.06
          )} 0%, rgba(255,255,255,0) 70%)`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.secondary.main,
            0.05
          )} 0%, rgba(255,255,255,0) 70%)`,
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            position: 'relative',
            boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.08)}`,
          }}
        >
          <Box
            sx={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              py: 5,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at top right, ${alpha(
                  '#fff',
                  0.15
                )}, transparent 70%)`,
              },
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={logo}
              alt="FMentorLink Logo"
              sx={{
                height: 60,
                width: 'auto',
                position: 'relative',
                zIndex: 2,
                filter: 'brightness(0) invert(1)', // Make logo white
              }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ p: 5, width: '100%', textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
              Welcome to FMentorLink
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 320, mx: 'auto' }}
            >
              Connect with mentors, collaborate on projects, and enhance your
              skills
            </Typography>

            {/* Login Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleGoogleLogin}
              startIcon={
                <Google
                  sx={{
                    bgcolor: '#fff',
                    color: '#DB4437',
                    borderRadius: '50%',
                    p: 0.3,
                    fontSize: 20,
                  }}
                />
              }
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 4,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                transition: 'all 0.2s ease',
                width: '100%',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                },
              }}
            >
              Sign in with Google
            </Button>

            <Box sx={{ mt: 2.5 }}>
              <Button
                variant="text"
                color="primary"
                onClick={handleBackToHome}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.925rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Return to Homepage
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 5, opacity: 0.7 }}
            >
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, opacity: 0.7, display: 'block' }}
            >
              &copy; {new Date().getFullYear()} FMentorLink. All rights
              reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
