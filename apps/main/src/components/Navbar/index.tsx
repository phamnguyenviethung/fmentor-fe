import { Account } from '@libs';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import React from 'react';
import Avatar from 'react-avatar';
import logo from '../../../assets/logo-light.svg';
import useAppStore from '../../configs/store.config';

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
          {user ? (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Avatar
                name={user.firstName + ' ' + user.lastName}
                size="40"
                round="50%"
              />
              <Stack>
                <Typography
                  variant="subtitle2"
                  fontSize="1.3rem"
                  sx={{
                    fontWeight: '600',
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: '500',

                    color: 'primary.main',
                  }}
                >
                  {/* {user.balance.toLocaleString('en-us')} VNĐ */}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Navbar;
