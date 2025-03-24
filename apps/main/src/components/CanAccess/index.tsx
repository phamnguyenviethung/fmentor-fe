import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
} from '@mui/material';
import { NoAccounts, LockPerson, ArrowBack, Login } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import useAppStore from '@main/configs/store.config';
import { Role } from '@libs';

interface CanAccessProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

const CanAccess: React.FC<CanAccessProps> = ({ allowedRoles, children }) => {
  const { user } = useAppStore();

  if (!user) {
    return <AccessDenied reason="authentication" />;
  }

  const hasAccess = allowedRoles.includes(user.role);

  if (hasAccess) {
    return children;
  }

  return <AccessDenied reason="authorization" />;
};

type AccessDeniedReason = 'authentication' | 'authorization';

const AccessDenied: React.FC<{ reason: AccessDeniedReason }> = ({ reason }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 450 },
            borderRadius: 2,
            textAlign: 'center',
            p: 4,
          }}
        >
          {/* Simple icon */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: 80, sm: 90 },
                height: { xs: 80, sm: 90 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor:
                  reason === 'authentication'
                    ? 'warning.lighter'
                    : 'error.lighter',
              }}
            >
              {reason === 'authentication' ? (
                <LockPerson
                  sx={{
                    fontSize: { xs: 40, sm: 45 },
                    color: 'warning.main',
                  }}
                />
              ) : (
                <NoAccounts
                  sx={{
                    fontSize: { xs: 40, sm: 45 },
                    color: 'error.main',
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Simplified text */}
          <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
            {reason === 'authentication' ? 'Please sign in' : 'Access denied'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{ mb: 3 }}
          >
            {reason === 'authentication'
              ? 'You need to be signed in to view this page'
              : "You don't have permission to access this page"}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate({ to: '/' })}
              fullWidth={isMobile}
              size={isMobile ? 'large' : 'medium'}
            >
              Home
            </Button>

            {reason === 'authentication' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Login />}
                onClick={() => navigate({ to: '/auth/login' })}
                fullWidth={isMobile}
                size={isMobile ? 'large' : 'medium'}
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default CanAccess;
