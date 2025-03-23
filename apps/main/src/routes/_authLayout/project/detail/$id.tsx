import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import { Chip, Container, Grid2, Stack, Typography } from '@mui/material';
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
    <Container>
      <Grid2 container>
        <Grid2
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={600}>
                {query.data?.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  size="small"
                  variant="filled"
                  label={query.data?.code}
                  color="info"
                />
                <Chip
                  size="small"
                  variant="filled"
                  label={query.data?.facultyCode}
                  color="secondary"
                />
                <Chip
                  size="small"
                  variant="filled"
                  label={query.data?.statusName}
                  color="success"
                />
              </Stack>
              <Typography variant="body1" fontWeight={400}>
                {query.data?.description}
              </Typography>
            </Stack>
            <ProjectCheckpoint projectId={params.id} />
          </Stack>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 3,
          }}
        >
          2
        </Grid2>
      </Grid2>
    </Container>
  );
}
