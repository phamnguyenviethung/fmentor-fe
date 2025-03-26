import { Appointment, AppointmentApi, AppointmentStatus, Role } from '@libs';
import CanAccess from '@main/components/CanAccess';
import {
  AccessTime,
  CalendarMonth,
  Check,
  Close,
  FolderOpen,
  Person,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';

export const Route = createFileRoute('/_authLayout/request/appointment')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();

  const appointmentsQuery = useQuery({
    queryKey: ['mentorAppointments'],
    queryFn: () => AppointmentApi.getMyAppointments({ pageSize: 10000 }),
  });

  const acceptMutation = useMutation({
    mutationFn: (id: string) =>
      AppointmentApi.updateAppointment(id, AppointmentStatus.Accepted),
    onSuccess: () => {
      appointmentsQuery.refetch();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) =>
      AppointmentApi.updateAppointment(id, AppointmentStatus.Rejected),

    onSuccess: () => {
      appointmentsQuery.refetch();
    },
  });

  const handleAccept = (id: string) => {
    acceptMutation.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectMutation.mutate(id);
  };

  const getStatusChipColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Pending:
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

  const formatAppointmentTime = (startTime: string, endTime: string) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);

    return `${start.format('MMM D, YYYY • h:mm A')} - ${end.format('h:mm A')}`;
  };

  const renderAppointmentList = () => {
    if (appointmentsQuery.isLoading) {
      return Array(3)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.light,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  size={{
                    xs: 12,
                    md: 8,
                  }}
                >
                  <Skeleton width="60%" height={28} />
                  <Skeleton width="90%" height={24} sx={{ mt: 1 }} />
                  <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    }}
                  >
                    <Skeleton width={80} height={32} sx={{ mr: 1 }} />
                    <Skeleton width={80} height={32} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ));
    }

    if (appointmentsQuery.isError) {
      return (
        <Card
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography color="error">
            Error loading appointments. Please try again.
          </Typography>
        </Card>
      );
    }

    const appointments = appointmentsQuery.data?.items || [];

    if (appointments.length === 0) {
      return (
        <Card
          elevation={0}
          sx={{
            p: 4,
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
            No appointment invitations available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When students invite you to appointments, they'll appear here
          </Typography>
        </Card>
      );
    }

    return appointments.map((appointment: Appointment) => (
      <Card
        key={appointment.id}
        elevation={0}
        sx={{
          mb: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: theme.palette.primary.light,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              {/* Appointment Details */}
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Chip
                    label={appointment.statusName}
                    size="small"
                    color={getStatusChipColor(appointment.status)}
                    sx={{ mr: 1.5 }}
                  />
                  <Typography variant="h6" component="h2">
                    {appointment.projectName || 'Unnamed Project'}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: 'text.secondary' }}
                >
                  <AccessTime fontSize="small" />
                  <Typography variant="body2">
                    {formatAppointmentTime(
                      appointment.startTime,
                      appointment.endTime
                    )}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: 'text.secondary' }}
                >
                  <Person fontSize="small" />
                  <Typography variant="body2">
                    Student: {appointment.mentorName || 'Unknown Student'}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'row' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {appointment.status === AppointmentStatus.Pending && (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      onClick={() => handleAccept(appointment.id)}
                      disabled={acceptMutation.isLoading}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Close />}
                      onClick={() => handleReject(appointment.id)}
                      disabled={rejectMutation.isLoading}
                    >
                      Reject
                    </Button>
                  </Stack>
                )}

                {appointment.status !== AppointmentStatus.Pending && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FolderOpen />}
                    sx={{ ml: 'auto' }}
                  >
                    View Details
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  };

  return (
    <CanAccess allowedRoles={[Role.MENTOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
            Appointment Requests
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your appointment invitations and requests
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {renderAppointmentList()}
      </Container>
    </CanAccess>
  );
}
