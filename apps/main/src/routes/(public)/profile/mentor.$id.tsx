import { AccountApi, Role } from '@libs';
import { Email, Payments, Person, School, Verified } from '@mui/icons-material';
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
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/profile/mentor/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ['mentorProfile', id],
    queryFn: () => AccountApi.getMentorProfile(id),
  });

  const isLoading = query.isLoading;
  const mentor = query.data;

  if (query.isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Profile
          </Typography>
          <Typography variant="body1">
            We couldn't load the mentor profile. Please try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: 80,
                bgcolor: 'primary.main',
                position: 'relative',
              }}
            />

            <CardContent sx={{ position: 'relative' }}>
              {isLoading ? (
                <Skeleton
                  variant="circular"
                  width={80}
                  height={80}
                  sx={{
                    position: 'absolute',
                    top: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: `3px solid ${theme.palette.background.paper}`,
                  }}
                />
              ) : (
                <Avatar
                  src={mentor?.imageUrl}
                  alt={`${mentor?.firstName} ${mentor?.lastName}`}
                  sx={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    top: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: `3px solid ${theme.palette.background.paper}`,
                  }}
                />
              )}

              <Box sx={{ mt: 5, textAlign: 'center' }}>
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="text"
                      height={32}
                      width="60%"
                      sx={{ mx: 'auto' }}
                    />
                    <Skeleton
                      variant="text"
                      height={24}
                      width="40%"
                      sx={{ mx: 'auto', mb: 1 }}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight={600}>
                      {mentor?.firstName} {mentor?.lastName}
                    </Typography>

                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
                    >
                      <Chip
                        icon={<School fontSize="small" />}
                        label="Mentor"
                        color="primary"
                        size="small"
                      />
                      {!mentor?.isSuspended ? (
                        <Chip
                          icon={<Verified fontSize="small" />}
                          label="Active"
                          color="success"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      ) : (
                        <Chip
                          label="Suspended"
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  </>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Contact Info */}
                <Stack spacing={1.5}>
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="text"
                        height={24}
                        width="80%"
                        sx={{ mx: 'auto' }}
                      />
                      <Skeleton
                        variant="text"
                        height={24}
                        width="60%"
                        sx={{ mx: 'auto' }}
                      />
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Email fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {mentor?.email}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Payments
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ${mentor?.baseSalaryPerHour}/hour
                        </Typography>
                      </Box>
                    </>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Person fontSize="small" sx={{ mr: 1 }} />
                Profile Information
              </Typography>

              {isLoading ? (
                <>
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" height={24} />
                </>
              ) : (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Full Name
                      </Typography>
                      <Typography variant="body1">
                        {mentor?.firstName} {mentor?.lastName}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Email Address
                      </Typography>
                      <Typography variant="body1">{mentor?.email}</Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Role
                      </Typography>
                      <Typography variant="body1">
                        {mentor?.role === Role.MENTOR ? 'Mentor' : 'N/A'}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Account Status
                      </Typography>
                      <Chip
                        label={mentor?.isSuspended ? 'Suspended' : 'Active'}
                        color={mentor?.isSuspended ? 'error' : 'success'}
                        size="small"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
