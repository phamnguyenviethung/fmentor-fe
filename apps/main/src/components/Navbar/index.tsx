import { Box, Button, Container, Stack } from '@mui/material';
import React from 'react';
import useAppStore from '../../configs/store.config';
import { Account } from '@libs';
import { Link } from '@tanstack/react-router';
import logo from '../../../assets/logo-light.svg';
const Navbar: React.FC = () => {
  const user: Account | null = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  return (
    <Container
      sx={{
        height: '100%',
      }}
    >
      <Stack
        direction="row"
        width="100%"
        height="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Box
            component="img"
            src={logo}
            sx={{
              width: 200,
            }}
          />
        </Link>
        <Box>
          <Box>{user?.firstName ?? ''}</Box>
          <Button onClick={logout}>dang xuat</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Navbar;
