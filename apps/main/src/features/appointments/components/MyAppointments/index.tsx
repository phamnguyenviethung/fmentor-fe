import React from 'react';
import { AppointmentApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, Typography, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { CalendarMonth } from '@mui/icons-material';

const MyAppointments: React.FC = () => {
  const q = useQuery({
    queryKey: ['myAppointments'],
    queryFn: () =>
      AppointmentApi.getMyAppointments({
        pageSize: 3,
      }),
  });

  // Format time to display in a more readable format
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${dayjs(startTime).format('MMM D, YYYY')} · ${dayjs(
      startTime
    ).format('HH:mm')} - ${dayjs(endTime).format('HH:mm')}`;
  };

  if (q.isLoading) {
    return <ComponentLoader />;
  }

  if (q.isError) {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        Failed to load appointments. Please try again.
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        mx: 'auto',
        width: '100%',
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        Upcoming Appointments
      </Typography>

      {q.data.items.length === 0 && (
        <Alert severity="info" sx={{ mt: 1 }}>
          You don't have any upcoming appointments.
        </Alert>
      )}

      {q.data.items.map((appointment) => (
        <Card
          key={appointment.id}
          sx={{
            p: 2,
            mb: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            boxShadow: 'none',
            '&:last-child': {
              mb: 0,
            },
            '&:hover': {
              borderColor: 'primary.main',
            },
            transition: 'all 0.2s',
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Meeting with {appointment.mentorId || 'Mentor'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Time: {formatTimeRange(appointment.startTime, appointment.endTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Project: {appointment.projectId || 'Unnamed Project'}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default MyAppointments;
