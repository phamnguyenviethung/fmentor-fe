import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import MemberList from '@main/features/projects/components/details/MemberList';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import {
  Chip,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/project/detail/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  const query = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => ProjectApi.getProjectById(params.id),
    enabled: !!params.id,
  });

  if (query.isLoading) {
    return <ComponentLoader />;
  }

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={3}>
        <Grid2
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <Stack spacing={4}>
            {/* Project Header */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight={700}>
                  {query.data?.name}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    size="small"
                    variant="filled"
                    label={`Code: ${query.data?.code}`}
                    color="info"
                  />
                  <Chip
                    size="small"
                    variant="filled"
                    label={`Faculty: ${query.data?.facultyCode}`}
                    color="secondary"
                  />
                  <Chip
                    size="small"
                    variant="filled"
                    label={`Status: ${query.data?.statusName}`}
                    color="success"
                  />
                </Stack>

                <Divider />

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {query.data?.description || 'No description provided.'}
                </Typography>
              </Stack>
            </Paper>

            {/* Project Checkpoints */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <ProjectCheckpoint projectId={params.id} />
            </Paper>
          </Stack>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <MemberList
            data={query.data?.projectStudents ?? []}
            projectId={params.id}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
}
