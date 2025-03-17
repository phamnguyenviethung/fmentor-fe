import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import useAppStore from '../../configs/store.config';
import { Account } from '@libs';
import { Link } from '@tanstack/react-router';
import logo from '../../../assets/logo-light.svg';
import { deepOrange } from '@mui/material/colors';
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
              <Box
                component="img"
                src="https://cdn.dribbble.com/userupload/3075502/file/original-e45d64f17d751c023f241dea1837c995.jpg?resize=50x50&vertical=center"
                sx={{ width: 50, borderRadius: '50%' }}
              />
              <Stack>
                <Typography
                  variant="body1"
                  fontSize="1.2rem"
                  sx={{
                    fontWeight: '600',
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: '400',

                    color: deepOrange[800],
                  }}
                >
                  {user.balance.toLocaleString('en-us')} VNĐ
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
