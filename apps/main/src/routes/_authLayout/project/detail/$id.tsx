import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Avatar from 'react-avatar';

export const Route = createFileRoute('/_authLayout/project/detail/$id')({
  component: RouteComponent,
});

const MemberList: React.FC<{
  data: {
    firstName: string;
    lastName: string;
    isLeader: boolean;
    id: string;
  }[];
}> = (props) => {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Members
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            // Add your invite logic here
            console.log('Invite button clicked');
          }}
        >
          Invite
        </Button>
      </Box>
      <List>
        {props.data.map((member) => (
          <ListItem key={member.id}>
            <ListItemAvatar>
              <Avatar
                name={member.firstName + member.lastName}
                size="30"
                round="50%"
              />
            </ListItemAvatar>
            <ListItemText
              primary={member.firstName + ' ' + member.lastName}
              sx={{
                fontWeight: member.isLeader ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

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
      <Grid2 container spacing={2}>
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
          <MemberList data={query.data?.projectStudents ?? []} />
        </Grid2>
      </Grid2>
    </Container>
  );
}
