import { Container, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import MyProjects from '../features/projects/components/MyProjects';
export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Container>
      <Stack spacing={2}>
        <MyProjects />
      </Stack>
    </Container>
  );
}
