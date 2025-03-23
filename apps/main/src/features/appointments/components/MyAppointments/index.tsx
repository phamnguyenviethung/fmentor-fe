import React from 'react';
import { AppointmentApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, Typography } from '@mui/material';

const MyAppointments: React.FC = () => {
  const q = useQuery({
    queryKey: ['myAppointments'],
    queryFn: AppointmentApi.getMyAppointments,
  });

  if (q.isLoading) {
    return <ComponentLoader />;
  }

  const appointments = [
    {
      id: '1',
      title: 'Team Meeting',
      date: '2025-03-23',
      time: '10:00 AM',
    },
    {
      id: '2',
      title: 'Project Discussion',
      date: '2025-03-24',
      time: '2:00 PM',
    },
    {
      id: '3',
      title: 'Client Call',
      date: '2025-03-25',
      time: '4:00 PM',
    },
  ]; // Replace with actual API response structure

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
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Upcoming Appointments
      </Typography>
      {appointments.map((appointment: any) => (
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
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            {appointment.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appointment.date} at {appointment.time}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default MyAppointments;
