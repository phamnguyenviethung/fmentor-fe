import useAppStore from '@main/configs/store.config';
import { Role } from '@libs';
import { createFileRoute } from '@tanstack/react-router';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  TbMail,
  TbBuildingSkyscraper,
  TbCertificate,
  TbCoin,
  TbSchool,
  TbUserCircle,
  TbBriefcase,
} from 'react-icons/tb';
import { useMemo } from 'react';
import { formatVNDMoney } from '@main/utils/formatMoney';

export const Route = createFileRoute('/_authLayout/me/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const user = useAppStore((state) => state.user);

  const getRoleBadgeInfo = useMemo(() => {
    if (!user)
      return {
        color: 'primary' as const,
        label: 'Unknown',
        icon: <TbUserCircle size={14} />,
      };

    switch (user.role.toString()) {
      case Role.ADMIN:
        return {
          color: 'error' as const,
          label: 'Administrator',
          icon: <TbCertificate size={14} />,
        };
      case Role.STUDENT:
        return {
          color: 'primary' as const,
          label: 'Student',
          icon: <TbSchool size={14} />,
        };
      case Role.MENTOR:
        return {
          color: 'success' as const,
          label: 'Mentor',
          icon: <TbBriefcase size={14} />,
        };
      case Role.LECTURER:
        return {
          color: 'secondary' as const,
          label: 'Lecturer',
          icon: <TbSchool size={14} />,
        };
      default:
        return {
          color: 'default' as const,
          label: 'Unknown',
          icon: <TbUserCircle size={14} />,
        };
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No profile information available
          </Typography>
        </Paper>
      </Box>
    );
  }

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <Container>
      {/* Header section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(to right, ${alpha(
            theme.palette.primary.main,
            0.05
          )}, ${alpha(theme.palette.background.paper, 0.7)})`,
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid
            size={{
              xs: 12,
              sm: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Avatar
                src={user.imageUrl}
                alt={fullName}
                sx={{
                  width: { xs: 100, sm: 120 },
                  height: { xs: 100, sm: 120 },
                  fontSize: '3rem',
                  fontWeight: 500,
                  bgcolor: theme.palette.primary.main,
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                }}
              >
                {(user.firstName?.charAt(0) || '') +
                  (user.lastName?.charAt(0) || '')}
              </Avatar>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 10,
            }}
          >
            <Box
              sx={{
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    wordBreak: 'break-word',
                  }}
                >
                  {fullName}
                </Typography>

                <Chip
                  icon={getRoleBadgeInfo.icon}
                  label={getRoleBadgeInfo.label}
                  color={getRoleBadgeInfo.color}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    height: 24,
                  }}
                />
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  mb: 1,
                  gap: 1,
                }}
              >
                <TbMail size={18} />
                {user.email}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  mt: 2,
                }}
              >
                {user.isSuspended && (
                  <Chip
                    label="Account Suspended"
                    color="error"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                    size="small"
                  />
                )}

                <Chip
                  icon={<TbCoin size={14} />}
                  label={`Balance: ${formatVNDMoney(user.balance)}`}
                  color="primary"
                  variant="outlined"
                  sx={{
                    ml: user.isSuspended ? 2 : 0,
                    fontWeight: 500,
                  }}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Details section */}
      <Grid container spacing={3}>
        {/* Account Information */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            elevation={0}
            variant="outlined"
            sx={{
              borderRadius: 3,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <TbUserCircle />
                Account Information
              </Typography>
              <Divider sx={{ mb: 3, mt: 1 }} />

              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ACCOUNT ID
                  </Typography>
                  <Typography variant="body1">{user.id}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    FULL NAME
                  </Typography>
                  <Typography variant="body1">
                    {fullName || 'Not provided'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    EMAIL ADDRESS
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ACCOUNT STATUS
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={user.isSuspended ? 'Suspended' : 'Active'}
                      color={user.isSuspended ? 'error' : 'success'}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Role-specific information */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            elevation={0}
            variant="outlined"
            sx={{
              borderRadius: 3,
              height: '100%',
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                }}
              >
                {getRoleBadgeInfo.icon}
                {getRoleBadgeInfo.label} Details
              </Typography>
              <Divider sx={{ mb: 3, mt: 1 }} />

              {user.role === Role.MENTOR && (
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      BASE SALARY PER HOUR
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      $
                      {(user as any).baseSalaryPerHour?.toFixed(2) || 'Not set'}
                    </Typography>
                  </Box>
                </Stack>
              )}

              {user.role === Role.LECTURER && (
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <TbBuildingSkyscraper size={14} />
                      FACULTY
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {(user as any).faculty || 'Not assigned'}
                    </Typography>
                  </Box>
                </Stack>
              )}

              {user.role === Role.STUDENT && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Student information will be displayed here.
                  </Typography>
                </Box>
              )}

              {user.role === Role.ADMIN && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Administrator privileges enabled.
                  </Typography>
                </Box>
              )}

              {/* Balance information - shown for all users */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    CURRENT BALANCE
                  </Typography>
                  <TbCoin size={18} color={theme.palette.primary.main} />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  {formatVNDMoney(user.balance)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
