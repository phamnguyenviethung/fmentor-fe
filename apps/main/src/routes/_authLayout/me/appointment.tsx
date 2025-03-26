import { AppointmentApi, AppointmentStatus, Role } from '@libs';
import CanAccess from '@main/components/CanAccess';
import {
  AccessTime,
  CalendarMonth,
  CalendarToday,
  EditCalendar,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';
import Avatar from 'react-avatar';

export const Route = createFileRoute('/_authLayout/me/appointment')({
  component: RouteComponent,
});

// Define the appointment type based on your API response
interface Appointment {
  id: string;
  projectId: string;
  projectName: string;
  mentorId: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  statusName: string;
  baseSalaryPerHour: number;
  totalPayment: number;
  totalTime: number;
  cancelReason: string | null;
  rejectReason: string | null;
  mentorAvatar?: string;
}

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const q = useQuery({
    queryKey: ['myAppointments'],
    queryFn: () => AppointmentApi.getMyAppointments({}),
  });

  // Group appointments by date using lodash
  const appointmentsByDate = useMemo(() => {
    if (!q.data) return {};

    return _.groupBy(q.data.items, (appointment) =>
      dayjs(appointment.startTime).format('YYYY-MM-DD')
    );
  }, [q.data]);

  // Get all dates
  const dates = useMemo(() => {
    return Object.keys(appointmentsByDate);
  }, [appointmentsByDate]);

  // Helper functions
  const formatTime = (time: string) => {
    return dayjs(time).format('HH:mm');
  };

  const isToday = (date: string) => {
    return dayjs(date).isSame(dayjs(), 'day');
  };

  const isTomorrow = (date: string) => {
    return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
  };

  const formatDateHeading = (dateStr: string) => {
    const date = dayjs(dateStr);
    if (isToday(dateStr)) {
      return 'Today';
    } else if (isTomorrow(dateStr)) {
      return 'Tomorrow';
    } else {
      return date.format('dddd, MMMM D');
    }
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Completed:
        return theme.palette.success.main;
      case AppointmentStatus.Canceled:
      case AppointmentStatus.Rejected:
        return theme.palette.error.main;
      case AppointmentStatus.Pending:
        return theme.palette.warning.main;
      case AppointmentStatus.Accepted:
      case AppointmentStatus.PendingConfirmation:
      case AppointmentStatus.ConfirmedByStudent:
      case AppointmentStatus.ConfirmedByMentor:
        return theme.palette.info.main;
      case AppointmentStatus.CancelRequested:
        return theme.palette.warning.dark;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusLabel = (status: AppointmentStatus, statusName: string) => {
    if (statusName) return statusName;

    switch (status) {
      case AppointmentStatus.Pending:
        return 'Pending';
      case AppointmentStatus.Accepted:
        return 'Accepted';
      case AppointmentStatus.Rejected:
        return 'Rejected';
      case AppointmentStatus.PendingConfirmation:
        return 'Pending Confirmation';
      case AppointmentStatus.ConfirmedByStudent:
        return 'Confirmed by Student';
      case AppointmentStatus.ConfirmedByMentor:
        return 'Confirmed by Mentor';
      case AppointmentStatus.Completed:
        return 'Completed';
      case AppointmentStatus.Canceled:
        return 'Canceled';
      case AppointmentStatus.CancelRequested:
        return 'Cancel Requested';
      default:
        return 'Unknown';
    }
  };

  // Rendering loading state
  if (q.isLoading) {
    return (
      <Container>
        <LinearProgress sx={{ mb: 5 }} />
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: 5 }}>
            <Skeleton variant="text" width={240} height={36} sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((j) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                  key={j}
                >
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    );
  }

  // Rendering error state
  if (q.isError) {
    return (
      <Container>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            py: 2,
            '& .MuiAlert-icon': {
              alignItems: 'center',
              fontSize: '1.5rem',
            },
            '& .MuiAlert-message': {
              fontSize: '1rem',
            },
          }}
        >
          Failed to load appointments. Please try again later or contact support
          if the issue persists.
        </Alert>
      </Container>
    );
  }

  // Rendering empty state
  if (dates.length === 0) {
    return (
      <Box sx={{ py: 5, px: { xs: 3, sm: 5 } }}>
        <Paper
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            bgcolor: 'background.paper',
            textAlign: 'center',
          }}
        >
          <CalendarToday
            sx={{ fontSize: 72, color: 'text.secondary', opacity: 0.6, mb: 3 }}
          />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            No appointments scheduled
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mb: 4, fontSize: '1.05rem' }}
          >
            You don't have any upcoming appointments. When you schedule
            appointments, they will appear here.
          </Typography>
          <Link to="/">
            <Chip
              label="Schedule an Appointment"
              color="primary"
              clickable
              sx={{
                py: 3,
                px: 1.5,
                fontWeight: 500,
                fontSize: '0.95rem',
                '& .MuiChip-label': { px: 2 },
              }}
            />
          </Link>
        </Paper>
      </Box>
    );
  }

  // Main content with appointments
  return (
    <CanAccess allowedRoles={[Role.STUDENT, Role.MENTOR]}>
      <Container>
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                fontWeight={700}
                gutterBottom
                sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}
              >
                My Appointments
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.05rem' }}
              >
                Manage your upcoming meetings and consultation sessions
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 3, sm: 1 } }}>
              <Chip
                icon={<CalendarMonth sx={{ fontSize: '1.3rem' }} />}
                label={`${q.data.totalItems} Total Appointments`}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 1,
                  height: 36,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        </Box>

        {dates.map((date) => (
          <Box key={date} sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 5,
                  height: 28,
                  bgcolor: isToday(date) ? 'primary.main' : 'divider',
                  borderRadius: 4,
                  mr: 2.5,
                }}
              />
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontSize: '1.25rem',
                }}
              >
                {formatDateHeading(date)}
                {isToday(date) && (
                  <Chip
                    label="Today"
                    size="small"
                    color="primary"
                    sx={{ ml: 1.5, height: 24, fontSize: '0.8rem' }}
                  />
                )}
                {isTomorrow(date) && (
                  <Chip
                    label="Tomorrow"
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1.5, height: 24, fontSize: '0.8rem' }}
                  />
                )}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1.5, fontSize: '0.95rem' }}
              >
                {dayjs(date).format('(MMM D, YYYY)')}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {appointmentsByDate[date].map((appointment) => {
                const statusColor = getStatusColor(appointment.status);

                return (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                    key={appointment.id}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: '0 3px 14px rgba(0,0,0,0.08)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'visible',
                        position: 'relative',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                          '& .appointment-actions': {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      {/* Status indicator strip */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          bgcolor: statusColor,
                        }}
                      />

                      {/* Time strip at the top */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: alpha(statusColor, 0.07),
                          p: 2.5,
                          pt: 3, // Extra padding to account for status strip
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <AccessTime
                          sx={{
                            fontSize: 18,
                            color: 'text.secondary',
                            mr: 1.5,
                          }}
                        />
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ fontSize: '1rem' }}
                        >
                          {formatTime(appointment.startTime)} -{' '}
                          {formatTime(appointment.endTime)}
                        </Typography>
                      </Box>

                      <Box sx={{ p: 2.5, flexGrow: 1 }}>
                        {/* Display status for all appointments */}
                        <Chip
                          label={getStatusLabel(
                            appointment.status,
                            appointment.statusName
                          )}
                          size="small"
                          sx={{
                            mb: 1.5,
                            height: 24,
                            fontSize: '0.75rem',
                            bgcolor: alpha(statusColor, 0.1),
                            color: statusColor,
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            px: 0.5,
                          }}
                        />

                        {/* Meeting title */}
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          gutterBottom
                          sx={{ fontSize: '1.1rem', mb: 1.5 }}
                        >
                          Meeting with {appointment.mentorName}
                        </Typography>

                        {/* Project name */}
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '0.95rem',
                            }}
                          >
                            Project: {appointment.projectName}
                          </Typography>
                        </Box>

                        {/* Show reason if rejected or canceled */}
                        {appointment.status === AppointmentStatus.Rejected &&
                          appointment.rejectReason && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{
                                display: 'block',
                                mt: 1.5,
                                fontStyle: 'italic',
                                bgcolor: alpha(theme.palette.error.main, 0.05),
                                p: 1.5,
                                borderRadius: 2,
                                fontSize: '0.8rem',
                                lineHeight: 1.4,
                              }}
                            >
                              Rejection reason: {appointment.rejectReason}
                            </Typography>
                          )}

                        {appointment.status === AppointmentStatus.Canceled &&
                          appointment.cancelReason && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{
                                display: 'block',
                                mt: 1.5,
                                fontStyle: 'italic',
                                bgcolor: alpha(theme.palette.error.main, 0.05),
                                p: 1.5,
                                borderRadius: 2,
                                fontSize: '0.8rem',
                                lineHeight: 1.4,
                              }}
                            >
                              Cancellation reason: {appointment.cancelReason}
                            </Typography>
                          )}
                      </Box>

                      {/* Mentor thumbnail & payment info */}
                      <Divider />
                      <Box
                        sx={{
                          p: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Avatar
                            name={appointment.mentorName}
                            size="36"
                            round="50%"
                          >
                            {appointment.mentorName?.[0] || 'M'}
                          </Avatar>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{ fontSize: '0.95rem' }}
                          >
                            {appointment.mentorName}
                          </Typography>
                        </Stack>
                        <Link
                          to="/project/detail/$id"
                          params={{ id: appointment.projectId }}
                        >
                          <Chip
                            label="View Project"
                            size="small"
                            clickable
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              color: 'primary.main',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              height: 30,
                              borderRadius: 1.5,
                              '&:hover': {
                                bgcolor: alpha(
                                  theme.palette.primary.main,
                                  0.15
                                ),
                              },
                            }}
                          />
                        </Link>
                      </Box>

                      {/* Quick action buttons overlay */}
                      <Box
                        className="appointment-actions"
                        sx={{
                          position: 'absolute',
                          top: -14,
                          right: 14,
                          display: 'flex',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                            mr: 1,
                            width: 36,
                            height: 36,
                            '&:hover': {
                              bgcolor: 'background.paper',
                            },
                          }}
                        >
                          <EditCalendar
                            fontSize="small"
                            color="primary"
                            sx={{ fontSize: '1.2rem' }}
                          />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Container>
    </CanAccess>
  );
}
