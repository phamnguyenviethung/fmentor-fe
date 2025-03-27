import { Container, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import MyProjects from '@main/features/projects/components/MyProjects';
import MyAppointments from '@main/features/appointments/components/MyAppointments';
import MyTask from '@main/features/projects/components/MyTask';
import QuickNavigate from '@main/components/QuickNavigate';
import { Role } from '@libs';
import useAppStore from '@main/configs/store.config';
export const Route = createFileRoute('/_authLayout/')({
  component: Index,
});

function Index() {
  const user = useAppStore((state) => state.user);
  return (
    <Container>
      <Stack spacing={4}>
        <QuickNavigate />
        {user?.role.toString() === Role.STUDENT && (
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
        )}

        <MyProjects />
      </Stack>
    </Container>
  );
}
