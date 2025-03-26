import { Container, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import MyProjects from '@main/features/projects/components/MyProjects';
import MyAppointments from '@main/features/appointments/components/MyAppointments';
import MyTask from '@main/features/projects/components/MyTask';
import QuickNavigate from '@main/components/QuickNavigate';
export const Route = createFileRoute('/_authLayout/')({
  component: Index,
});

function Index() {
  return (
    <Container>
      <Stack spacing={4}>
        <QuickNavigate />

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
          sx={{ width: '100%' }}
        >
          <MyAppointments />
          <MyTask />
        </Stack>
        <MyProjects />
      </Stack>
    </Container>
  );
}
