import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';

const Footer = () => {
  return (
    <Container
      sx={{
        color: 'white',
        py: 3,
        px: 2,
        mt: 4,
        width: '100%',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* Logo */}
        <Typography variant="h6" fontWeight={600}>
          LOGO
        </Typography>

        {/* Contact Information */}
        <Box>
          <Typography variant="body2">Contact: support@example.com</Typography>
          <Typography variant="body2">Phone: +1 234 567 890</Typography>
        </Box>

        {/* System Status */}
        <Box>
          <Typography variant="body2">
            System Status: <span style={{ color: 'green' }}>Online</span>
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Footer;
