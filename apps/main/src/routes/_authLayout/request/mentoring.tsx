import {
  MentoringProposal,
  MentoringProposalStatus,
  ProjectApi,
  Role,
} from '@libs';
import CanAccess from '@main/components/CanAccess';
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
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/request/mentoring')({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAppStore((state) => state.user);

  const query = useQuery({
    queryKey: ['mentoringProposals'],
    queryFn: () =>
      ProjectApi.getMentoringProposal({
        pageSize: 10000,
        mentorId: user?.id ?? '',
      }),
    enabled: !!user,
  });

  const acceptMutation = useMutation({
    mutationFn: (id: string) => ProjectApi.updateMentoringProposal(id, true),
    onSuccess: () => {
      query.refetch();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => ProjectApi.updateMentoringProposal(id, false),
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
      case MentoringProposalStatus.Pending:
        return 'warning';
      case MentoringProposalStatus.Accepted:
        return 'success';
      case MentoringProposalStatus.Rejected:
      case MentoringProposalStatus.Closed:
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
                <Grid item xs={12} md={8}>
                  <Skeleton width="60%" height={28} />
                  <Skeleton width="90%" height={24} sx={{ mt: 1 }} />
                  <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
                </Grid>
                <Grid item xs={12} md={4}>
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
            Error loading mentoring proposals. Please try again.
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
            No mentoring requests available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When students request you to mentor their projects, they'll appear
            here
          </Typography>
        </Card>
      );
    }

    return proposals.map((proposal: MentoringProposal) => (
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
            <Grid item xs={12} md={8}>
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
                    Project Mentoring Request{' '}
                    {proposal.projectId &&
                      `(ID: ${proposal.projectId.slice(0, 8)}...)`}
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

            <Grid item xs={12} md={4}>
              {/* Action Buttons */}
              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'row' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {proposal.status === MentoringProposalStatus.Pending && (
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

                {proposal.status !== MentoringProposalStatus.Pending && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FolderOpen />}
                    sx={{ ml: 'auto' }}
                    onClick={() =>
                      window.open(`/projects/${proposal.projectId}`, '_blank')
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
    <CanAccess allowedRoles={[Role.MENTOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
            Mentoring Requests
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and respond to projects seeking your mentorship
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {renderProposalsList()}
      </Container>
    </CanAccess>
  );
}
