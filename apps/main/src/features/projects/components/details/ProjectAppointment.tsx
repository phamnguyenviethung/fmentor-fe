import { AppointmentApi } from '@libs';
import { Appointment, AppointmentStatus } from '@libs';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Divider,
  Button,
  Skeleton,
  useTheme,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AccessTime,
  Event,
  MoreVert,
  CalendarMonth,
  VideocamOutlined,
  PersonOutline,
} from '@mui/icons-material';
import dayjs from 'dayjs';

const ProjectAppointment: React.FC<{ projectId: string }> = ({ projectId }) => {
  const theme = useTheme();

  const query = useQuery({
    queryKey: ['projectAppointment', projectId],
    queryFn: () =>
      AppointmentApi.getAppoinementList({
        projectId,
      }),
    enabled: !!projectId,
  });

  const formatDateTime = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY • h:mm A');
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    const durationMinutes = end.diff(start, 'minute');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
      : `${minutes}m`;
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Pending:
      case AppointmentStatus.PendingConfirmation:
      case AppointmentStatus.CancelRequested:
        return 'warning';
      case AppointmentStatus.Accepted:
      case AppointmentStatus.ConfirmedByMentor:
      case AppointmentStatus.ConfirmedByStudent:
      case AppointmentStatus.Completed:
        return 'success';
      case AppointmentStatus.Rejected:
      case AppointmentStatus.Canceled:
        return 'error';
      default:
        return 'default';
    }
  };

  if (query.isLoading) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Appointments
        </Typography>
        {[1, 2].map((i) => (
          <Card
            key={i}
            elevation={0}
            sx={{
              mb: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="30%" height={24} />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (query.isError) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Appointments
        </Typography>
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: '#FFF5F5',
          }}
        >
          <Typography color="error.main">
            Could not load appointments. Please try again later.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const appointments = query.data?.items || [];

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Appointments</Typography>
      </Box>

      {appointments.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <CalendarMonth
            sx={{
              fontSize: 48,
              color: theme.palette.text.secondary,
              opacity: 0.4,
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            No appointments scheduled
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Schedule your first appointment to meet with your mentor
          </Typography>
        </Card>
      ) : (
        <Stack spacing={2}>
          {appointments.map((appointment: Appointment) => (
            <Card
              key={appointment.id}
              elevation={0}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: theme.palette.primary.light,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                },
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 1.5,
                      }}
                    >
                      <Chip
                        label={appointment.statusName}
                        size="small"
                        color={getStatusColor(appointment.status)}
                        sx={{ mr: 1.5 }}
                      />
                      <Typography variant="subtitle1" fontWeight={500}>
                        Meeting with {appointment.mentorName}
                      </Typography>
                    </Box>

                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime
                          fontSize="small"
                          sx={{ color: 'text.secondary', mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDateTime(appointment.startTime)} (
                          {formatDuration(
                            appointment.startTime,
                            appointment.endTime
                          )}
                          )
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonOutline
                          fontSize="small"
                          sx={{ color: 'text.secondary', mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Mentor: {appointment.mentorName}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      }}
                    >
                      {appointment.status === AppointmentStatus.Accepted && (
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          startIcon={<VideocamOutlined />}
                          sx={{ mr: 1 }}
                        >
                          Join Meeting
                        </Button>
                      )}

                      <Tooltip title="More options">
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>

                {appointment.totalPayment > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Duration: {appointment.totalTime} minutes
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        Payment: {appointment.totalPayment} VNĐ
                      </Typography>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProjectAppointment;
