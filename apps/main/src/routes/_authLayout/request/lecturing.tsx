import {
  LectucringProposal,
  LectucringProposalStatus,
  ProjectApi,
} from '@libs';
import useAppStore from '@main/configs/store.config';
import {
  Assignment,
  Check,
  Close,
  FolderOpen,
  NoteAlt,
  School,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/request/lecturing')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const user = useAppStore((state) => state.user);

  const query = useQuery({
    queryKey: ['lecturingProposals'],
    queryFn: () =>
      ProjectApi.getLectucringProposal({
        pageSize: 10000,
        lecturerId: user?.id ?? '',
      }),
    enabled: !!user,
  });

  const acceptMutation = useMutation({
    mutationFn: (id: string) => ProjectApi.updateLectucringProposal(id, true),
    onSuccess: () => {
      query.refetch();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => ProjectApi.updateLectucringProposal(id, false),
    onSuccess: () => {
      query.refetch();
    },
  });

  const handleAccept = (id: string) => {
    acceptMutation.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectMutation.mutate(id);
  };

  const getStatusChipColor = (status: number) => {
    switch (status) {
      case LectucringProposalStatus.Pending:
        return 'warning';
      case LectucringProposalStatus.Accepted:
        return 'success';
      case LectucringProposalStatus.Rejected:
      case LectucringProposalStatus.Closed:
        return 'error';
      default:
        return 'default';
    }
  };

  const renderProposalsList = () => {
    if (query.isLoading) {
      return Array(3)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.light,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  size={{
                    xs: 12,
                    md: 8,
                  }}
                >
                  <Skeleton width="60%" height={28} />
                  <Skeleton width="90%" height={24} sx={{ mt: 1 }} />
                  <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    }}
                  >
                    <Skeleton width={80} height={32} sx={{ mr: 1 }} />
                    <Skeleton width={80} height={32} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ));
    }

    if (query.isError) {
      return (
        <Card
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography color="error">
            Error loading lecturing proposals. Please try again.
          </Typography>
        </Card>
      );
    }

    const proposals = query.data?.items || [];

    if (proposals.length === 0) {
      return (
        <Card
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <School
            sx={{
              fontSize: 48,
              color: theme.palette.text.secondary,
              opacity: 0.4,
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            No lecturing requests available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When students request you to lecture their projects, they'll appear
            here
          </Typography>
        </Card>
      );
    }

    return proposals.map((proposal: LectucringProposal) => (
      <Card
        key={proposal.id}
        elevation={0}
        sx={{
          mb: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: theme.palette.primary.light,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              {/* Proposal Details */}
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Chip
                    label={proposal.statusName}
                    size="small"
                    color={getStatusChipColor(proposal.status)}
                    sx={{ mr: 1.5 }}
                  />
                  <Typography variant="h6" component="h2">
                    {proposal.projectName}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: 'text.secondary' }}
                >
                  <Assignment fontSize="small" />
                  <Typography variant="body2">
                    Project ID: {proposal.projectId}
                  </Typography>
                </Stack>

                {proposal.studentNote && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="flex-start"
                    sx={{ color: 'text.secondary' }}
                  >
                    <NoteAlt fontSize="small" sx={{ mt: 0.3 }} />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      Student note: {proposal.studentNote}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'row' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {proposal.status === LectucringProposalStatus.Pending && (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      onClick={() => handleAccept(proposal.id)}
                      disabled={acceptMutation.isLoading}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Close />}
                      onClick={() => handleReject(proposal.id)}
                      disabled={rejectMutation.isLoading}
                    >
                      Reject
                    </Button>
                  </Stack>
                )}

                {proposal.status !== LectucringProposalStatus.Pending && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FolderOpen />}
                    sx={{ ml: 'auto' }}
                    onClick={() =>
                      window.open(`/project/${proposal.projectId}`, '_blank')
                    }
                  >
                    View Project
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Lecturing Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and respond to projects seeking your lecturing
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {renderProposalsList()}
    </Container>
  );
}
