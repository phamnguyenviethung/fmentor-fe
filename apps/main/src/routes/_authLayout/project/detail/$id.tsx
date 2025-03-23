import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
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
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
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
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            console.log('Invite button clicked');
          }}
        >
          Invite
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {props.data.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          No members yet
        </Typography>
      ) : (
        <List disablePadding>
          {props.data.map((member) => (
            <ListItem
              key={member.id}
              sx={{
                px: 0,
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  name={member.firstName + member.lastName}
                  size="36"
                  round="50%"
                  textSizeRatio={2}
                  style={{
                    border: member.isLeader ? '2px solid #1976d2' : 'none',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight={member.isLeader ? 600 : 400}
                  >
                    {member.firstName + ' ' + member.lastName}
                    {member.isLeader && (
                      <Chip
                        label="Leader"
                        size="small"
                        color="primary"
                        sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                      />
                    )}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
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
          <MemberList data={query.data?.projectStudents ?? []} />
        </Grid2>
      </Grid2>
    </Container>
  );
}
