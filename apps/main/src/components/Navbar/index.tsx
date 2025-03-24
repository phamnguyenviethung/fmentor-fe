import { Account, Role } from '@libs';
import { Box, Container, Stack, Typography, Chip, Button } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import React from 'react';
import Avatar from 'react-avatar';
import logo from '../../../assets/logo-light.svg';
import useAppStore from '../../configs/store.config';

const Navbar: React.FC = () => {
  const user: Account | null = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/auth/login' });
  };

  const getRoleName = (role: number) => {
    switch (role.toString()) {
      case Role.ADMIN:
        return 'Admin';
      case Role.STUDENT:
        return 'Student';
      case Role.MENTOR:
        return 'Mentor';
      case Role.LECTURER:
        return 'Lecturer';
      default:
        return 'User';
    }
  };

  const getRoleColor = (role: number) => {
    switch (role.toString()) {
      case Role.ADMIN:
        return 'error';
      case Role.STUDENT:
        return 'info';
      case Role.MENTOR:
        return 'success';
      case Role.LECTURER:
        return 'secondary';
      default:
        return 'default';
    }
  };

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
              width: 180,
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
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center' }}
              >
                <Avatar name={user.firstName} size="40" round="50%" />

                <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: '600',
                      fontSize: '1rem',
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Chip
                      label={getRoleName(user.role)}
                      color={getRoleColor(user.role)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.6rem',
                        fontWeight: 'bold',
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        fontWeight: '500',
                        color: 'success.main',
                        fontSize: '0.75rem',
                      }}
                    >
                      {user?.balance ? user.balance.toLocaleString('en-US') : 0}
                      VNĐ
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleLogout}
                sx={{
                  display: { xs: 'none', lg: 'block' },
                  ml: 1,
                  fontSize: '0.75rem',
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Link to="/auth/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Navbar;
