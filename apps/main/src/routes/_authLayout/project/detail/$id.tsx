import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectApi, ProjectStatus, Role } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import useAppStore from '@main/configs/store.config';
import AppointmentBookingModal from '@main/features/projects/components/details/AppointmentBookingModal';
import MemberList from '@main/features/projects/components/details/MemberList';
import ProjectAppointment from '@main/features/projects/components/details/ProjectAppointment';
import ProjectCheckpoint from '@main/features/projects/components/ProjectCheckpoint';
import { Edit } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';

export const Route = createFileRoute('/_authLayout/project/detail/$id')({
  component: RouteComponent,
});

function UpdateProjectStatusButton({
  projectId,
  currentStatus,
  onSuccess,
}: {
  projectId: string;
  currentStatus?: number;
  onSuccess: () => void;
}) {
  const store = useAppStore();
  const [open, setOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const statusSchema = z.object({
    status: z.number({
      required_error: 'Please select a status',
    }),
  });

  type StatusFormValues = z.infer<typeof statusSchema>;

  // Mutation để cập nhật trạng thái dự án
  const updateStatusMutation = useMutation({
    mutationFn: (data: StatusFormValues) => {
      return ProjectApi.updateProjectStatus(projectId, data.status);
    },
    onError: (error: any) => {
      setSnackbarState({
        open: true,
        message:
          error?.response?.data?.error || 'Failed to update project status',
        severity: 'error',
      });
      handleClose();
    },
    onSuccess: () => {
      setSnackbarState({
        open: true,
        message: 'Project status updated successfully',
        severity: 'success',
      });
      handleClose();
      onSuccess();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const handleUpdateStatus = (data: StatusFormValues) => {
    updateStatusMutation.mutate(data);
  };

  const isLecturer =
    store.user?.role?.toString() === Role.LECTURER.toLowerCase();

  if (!isLecturer) {
    return null;
  }

  return (
    <>
      <Tooltip title="Update Project Status">
        <IconButton
          onClick={handleClickOpen}
          color="secondary"
          sx={{
            bgcolor: 'secondary.light',
            color: 'secondary.contrastText',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
            position: 'absolute',
            top: 16,
            right: 16,
          }}
          size="small"
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Status Update Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Update Project Status</DialogTitle>

        <FormContainer
          defaultValues={{ status: currentStatus || 0 }}
          onSuccess={handleUpdateStatus}
          resolver={zodResolver(statusSchema)}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Change the current status of this project.
            </DialogContentText>

            {/* Đảm bảo sử dụng đúng giá trị của enum ProjectStatus */}
            <SelectElement
              name="status"
              label="Project Status"
              fullWidth
              required
              variant="outlined"
              margin="dense"
              options={[
                { id: ProjectStatus.Pending, label: 'Pending' },
                { id: ProjectStatus.InProgress, label: 'Processing' },
                { id: ProjectStatus.Closed, label: 'Closed' },
                { id: ProjectStatus.PendingReview, label: 'Pending Review' },
                {
                  id: ProjectStatus.RevisionRequired,
                  label: 'RevisionRequired',
                },
                { id: ProjectStatus.Completed, label: 'Completed' },
                { id: ProjectStatus.Failed, label: 'Completed' },
              ]}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={updateStatusMutation.isLoading}
            >
              {updateStatusMutation.isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function MentorInfo({
  mentorName,
  projectId,
}: {
  mentorName?: string;
  projectId: string;
}) {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const inviteSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
  });

  type InviteFormValues = z.infer<typeof inviteSchema>;

  const inviteMutation = useMutation({
    mutationFn: (data: InviteFormValues) => {
      return ProjectApi.inviteMentorToProject(projectId, data.email);
    },
    onError: (error: any) => {
      setError(error?.response?.data.error ?? 'An error occurred');
    },
    onSuccess: () => {
      handleClose();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = (data: InviteFormValues) => {
    inviteMutation.mutate(data);
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
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClickOpen}
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
                <Typography variant="body1" fontWeight={500} component="div">
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

      {/* Invite Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Invite Mentor</DialogTitle>

        <FormContainer
          defaultValues={{ email: '' }}
          onSuccess={handleInvite}
          resolver={zodResolver(inviteSchema)}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the email address of the mentor you want to invite to this
              project.
            </DialogContentText>
            {error && (
              <DialogContentText sx={{ mb: 2 }} color="error" fontWeight={500}>
                {error}
              </DialogContentText>
            )}

            <TextFieldElement
              name="email"
              label="Email Address"
              type="email"
              autoFocus
              fullWidth
              variant="outlined"
              margin="dense"
              sx={{ mb: 1 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Send Invitation
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
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
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const inviteSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
  });

  type InviteFormValues = z.infer<typeof inviteSchema>;

  const inviteMutation = useMutation({
    mutationFn: (data: InviteFormValues) => {
      return ProjectApi.inviteLecturerToProject(projectId, data.email);
    },
    onError: (error: any) => {
      setError(error?.response?.data.error ?? 'An error occurred');
    },
    onSuccess: () => {
      handleClose();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = (data: InviteFormValues) => {
    inviteMutation.mutate(data);
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
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleClickOpen}
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
                <Typography variant="body1" fontWeight={500} component="div">
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

      {/* Invite Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Invite Lecturer</DialogTitle>

        <FormContainer
          defaultValues={{ email: '' }}
          onSuccess={handleInvite}
          resolver={zodResolver(inviteSchema)}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the email address of the lecturer you want to invite to this
              project.
            </DialogContentText>
            {error && (
              <DialogContentText sx={{ mb: 2 }} color="error" fontWeight={500}>
                {error}
              </DialogContentText>
            )}

            <TextFieldElement
              name="email"
              label="Email Address"
              type="email"
              autoFocus
              fullWidth
              variant="outlined"
              margin="dense"
              sx={{ mb: 1 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Send Invitation
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </Paper>
  );
}

// Hàm helper để chọn màu cho Chip trạng thái dự án
function getStatusColor(status?: number) {
  if (status === undefined) return 'default';

  switch (status) {
    case ProjectStatus.Completed:
      return 'success';
    case ProjectStatus.InProgress:
      return 'info';
    case ProjectStatus.Failed:
      return 'warning';
    case ProjectStatus.Closed:
      return 'error';
    default:
      return 'default';
  }
}

function RouteComponent() {
  const params = Route.useParams();
  const store = useAppStore();

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
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                position: 'relative',
              }}
            >
              <UpdateProjectStatusButton
                projectId={params.id}
                currentStatus={query.data?.status}
                onSuccess={() => query.refetch()}
              />

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
                    color={getStatusColor(query.data?.status)}
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
            <ProjectAppointment projectId={params.id} />
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
