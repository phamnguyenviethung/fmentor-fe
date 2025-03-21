import { Container, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import MyProjects from '../features/projects/components/MyProjects';
import MyAppointments from '@main/features/appointments/components/MyAppointments';
export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Container>
      <Stack spacing={2}>
        <MyProjects />
        <MyAppointments />
      </Stack>
    </Container>
  );
}
