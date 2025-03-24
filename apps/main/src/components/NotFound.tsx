import { Home, SentimentVeryDissatisfied } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

const NotFound: React.FC = ({}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGoHome = () => {
    navigate({ to: '/' });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '70vh',
          py: 6,
          px: 2,
        }}
      >
        {/* Icon */}
        <SentimentVeryDissatisfied
          sx={{
            fontSize: { xs: 100, sm: 120, md: 160 },
            color: 'grey.400',
            mb: 4,
          }}
        />

        {/* 404 Number */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '5rem', sm: '7rem', md: '9rem' },
            fontWeight: 800,
            color: 'primary.main',
            letterSpacing: '-0.05em',
            mb: 1,
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          404
        </Typography>

        {/* Title */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          Page Not Found
        </Typography>

        {/* Message */}
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            maxWidth: '600px',
            mb: 5,
            fontWeight: 400,
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Home />}
            onClick={handleGoHome}
            fullWidth={isMobile}
            sx={{
              py: { xs: 1.5, md: 1.75 },
              px: { xs: 3, md: 4 },
              borderRadius: 2,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 600,
            }}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
