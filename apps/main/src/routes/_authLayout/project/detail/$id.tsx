import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import AppointmentBookingModal from '@main/features/projects/components/details/AppointmentBookingModal';
import MemberList from '@main/features/projects/components/details/MemberList';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import { PersonAdd } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
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

export const Route = createFileRoute('/_authLayout/project/detail/$id')({
  component: RouteComponent,
});

function MentorInfo({
  mentorName,
  projectId,
}: {
  mentorName?: string;
  projectId: string;
}) {
  const handleInviteMentor = () => {
    // Implement invite mentor logic
    console.log('Inviting mentor for project', projectId);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        mb: 3,
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
          Mentor
        </Typography>
        {!mentorName && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonAdd />}
            onClick={handleInviteMentor}
          >
            Invite
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {mentorName ? (
        <List disablePadding>
          <ListItem
            sx={{
              px: 0,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar alt={mentorName} sx={{ bgcolor: 'success.main' }}>
                {mentorName.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight={500}
                  component="div" // Thêm component="div" để tránh lỗi div trong p
                >
                  {mentorName}
                  <Chip
                    label="Mentor"
                    size="small"
                    color="success"
                    sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                  />
                </Typography>
              }
            />
          </ListItem>
        </List>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          No mentor assigned yet
        </Typography>
      )}
    </Paper>
  );
}

function LecturerInfo({
  lecturerName,
  projectId,
}: {
  lecturerName?: string;
  projectId: string;
}) {
  const handleInviteLecturer = () => {
    // Implement invite lecturer logic
    console.log('Inviting lecturer for project', projectId);
  };

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
          Lecturer
        </Typography>
        {!lecturerName && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PersonAdd />}
            onClick={handleInviteLecturer}
          >
            Invite
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {lecturerName ? (
        <List disablePadding>
          <ListItem
            sx={{
              px: 0,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar alt={lecturerName} sx={{ bgcolor: 'secondary.main' }}>
                {lecturerName.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight={500}
                  component="div" // Thêm component="div" để tránh lỗi div trong p
                >
                  {lecturerName}
                  <Chip
                    label="Lecturer"
                    size="small"
                    color="secondary"
                    sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                  />
                </Typography>
              }
            />
          </ListItem>
        </List>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          No lecturer assigned yet
        </Typography>
      )}
    </Paper>
  );
}

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
          <Stack spacing={3}>
            <Box sx={{ width: '100%' }}>
              <AppointmentBookingModal
                mentorName={query.data?.mentorName ?? ''}
                mentorId={query.data?.mentorId ?? ''}
                projectName={query.data?.name ?? ''}
                projectId={params.id}
              />
            </Box>
            <MemberList
              data={query.data?.projectStudents ?? []}
              projectId={params.id}
            />

            <MentorInfo
              mentorName={query.data?.mentorName}
              projectId={params.id}
            />

            <LecturerInfo
              lecturerName={query.data?.lecturerName}
              projectId={params.id}
            />
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}
