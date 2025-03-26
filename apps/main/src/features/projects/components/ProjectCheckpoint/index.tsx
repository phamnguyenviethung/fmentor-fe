import { zodResolver } from '@hookform/resolvers/zod';
import { Checkpoint, CheckpointTaskStatus, ProjectApi, Role } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import useAppStore from '@main/configs/store.config';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import {
  TbCalendar,
  TbCaretDownFilled,
  TbCheckupList,
  TbClock,
  TbPlus,
  TbProgress,
  TbTargetArrow,
} from 'react-icons/tb';
import { z } from 'zod';
import CheckpointTask from './Task';

// Enable relative time plugin
dayjs.extend(relativeTime);

// Helper function to determine checkpoint progress
const getCheckpointProgress = (checkpoint: Checkpoint) => {
  const now = dayjs();
  const startTime = dayjs(checkpoint.startTime);
  const endTime = dayjs(checkpoint.endTime);

  if (now.isBefore(startTime)) return { status: 'upcoming', color: 'info' };
  if (now.isAfter(endTime)) return { status: 'completed', color: 'success' };

  // Calculate progress percentage
  const totalDuration = endTime.diff(startTime);
  const elapsedDuration = now.diff(startTime);
  const percentage = Math.floor((elapsedDuration / totalDuration) * 100);

  return {
    status: 'in-progress',
    color: 'warning',
    percentage,
  };
};

// Task form schema
const taskSchema = z.object({
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(100, 'Task name too long'),
  description: z.string().min(5, 'Description should be at least 5 characters'),
  score: z
    .number()
    .min(0, 'Score must be positive')
    .max(10, 'Score cannot exceed 10'),
});

type TaskFormValues = z.infer<typeof taskSchema>;

// Task Creation Modal Component
const CreateTaskModal: React.FC<{
  open: boolean;
  onClose: () => void;
  projectId: string;
  checkpointId: string;
}> = ({ open, onClose, projectId, checkpointId }) => {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const formContext = useForm<TaskFormValues>({
    defaultValues: {
      name: '',
      description: '',
      score: 0,
    },
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
  });

  const { formState } = formContext;
  const { isValid, isDirty } = formState;

  const handleCloseAndReset = () => {
    formContext.reset();
    setApiError(null);
    onClose();
  };

  const createTaskMutation = useMutation({
    mutationFn: (
      data: TaskFormValues & { projectId: string; checkpointId: string }
    ) =>
      ProjectApi.createCheckpointTask({
        ...data,
        status: CheckpointTaskStatus.Pending,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskList', projectId, checkpointId],
      });
      handleCloseAndReset();
    },
    onError: (error: any) => {
      setApiError(
        error?.message ||
          error?.response?.data?.message ||
          'Failed to create task. Please try again.'
      );
      console.error('Error creating task:', error);
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    setApiError(null);
    createTaskMutation.mutate({
      ...data,
      projectId,
      checkpointId,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseAndReset}
      maxWidth="sm"
      fullWidth
      scroll="paper"
    >
      <DialogTitle
        sx={{
          fontSize: '1.2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TbCheckupList style={{ marginRight: 8 }} />
        Create New Checkpoint Task
      </DialogTitle>
      <DialogContent dividers>
        <FormContainer formContext={formContext} onSuccess={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            {apiError && (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => setApiError(null)}
              >
                <AlertTitle>Error</AlertTitle>
                {apiError}
              </Alert>
            )}

            <TextFieldElement
              name="name"
              label="Task Name"
              fullWidth
              required
              autoFocus
            />

            <TextFieldElement
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              required
            />

            <TextFieldElement
              name="score"
              label="Task Score"
              type="number"
              fullWidth
              required
              inputProps={{ min: 0, max: 10, step: 0.5 }}
              helperText="Score must be between 0 and 10"
            />
          </Box>
        </FormContainer>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleCloseAndReset}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={formContext.handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid || createTaskMutation.isLoading}
          startIcon={<TbPlus size={18} />}
        >
          {createTaskMutation.isLoading ? 'Creating...' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProjectCheckpoint: React.FC<{
  projectId: string;
}> = (props) => {
  const theme = useTheme();
  const user = useAppStore((state) => state.user);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string | null>(
    null
  );

  // Fetch checkpoint list
  const cpQuery = useQuery({
    queryKey: ['checkpontList'],
    queryFn: ProjectApi.getCheckpointList,
  });

  if (cpQuery.isLoading) {
    return <ComponentLoader />;
  }

  if (cpQuery.isError || !user) {
    return (
      <Box>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to load checkpoints. Please try again.
        </Alert>
      </Box>
    );
  }

  if (!cpQuery.data?.items.length) {
    return (
      <Box sx={{ py: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
          }}
        >
          <TbTargetArrow
            size={52}
            style={{
              color: theme.palette.text.secondary,
              opacity: 0.6,
              marginBottom: 16,
            }}
          />
          <Typography variant="h6" gutterBottom>
            No Checkpoints Available
          </Typography>
          <Typography
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 500 }}
          >
            There are currently no checkpoints defined for this project.
            Checkpoints will appear here once they are added by your lecturer.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const handleOpenCreateModal = (checkpointId: string) => {
    setSelectedCheckpoint(checkpointId);
    setCreateModalOpen(true);
  };

  return (
    <Box pb={6}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Project Checkpoints
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Key milestones and deliverables for this project
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        {cpQuery.data?.items.map((cp) => {
          const progress = getCheckpointProgress(cp);
          const now = dayjs();
          const isActive =
            now.isAfter(cp.startTime) && now.isBefore(cp.endTime);

          return (
            <Accordion
              key={cp.id}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                mb: 1,
                border: '1px solid',
                borderColor: isActive ? `${progress.color}.main` : 'divider',
              }}
            >
              <AccordionSummary
                expandIcon={<TbCaretDownFilled />}
                aria-controls={`checkpoint-content-${cp.id}`}
                id={`checkpoint-header-${cp.id}`}
                sx={{
                  bgcolor: alpha(theme.palette.background.default, 0.6),
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                }}
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={600}>{cp.name}</Typography>

                    {isActive && (
                      <Chip
                        label="Active"
                        size="small"
                        color="primary"
                        sx={{
                          height: 22,
                          fontSize: '0.7rem',
                          animation: isActive ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': {
                              boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)',
                            },
                            '70%': {
                              boxShadow: '0 0 0 6px rgba(25, 118, 210, 0)',
                            },
                            '100%': {
                              boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)',
                            },
                          },
                        }}
                      />
                    )}
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    {/* Date range */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                      }}
                    >
                      <TbCalendar size={14} style={{ marginRight: 6 }} />
                      {dayjs(cp.startTime).format('MMM D, YYYY')} –
                      {dayjs(cp.endTime).format('MMM D, YYYY')}
                    </Typography>

                    {/* Time remaining */}
                    {isActive && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          fontWeight: 500,
                          fontSize: '0.8rem',
                        }}
                      >
                        <TbClock size={14} style={{ marginRight: 6 }} />
                        {dayjs(cp.endTime).fromNow(true)} remaining
                      </Typography>
                    )}

                    {/* Progress */}
                    {progress.status === 'in-progress' && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                        }}
                      >
                        <TbProgress size={14} style={{ marginRight: 6 }} />
                        {progress.percentage}% complete
                      </Typography>
                    )}
                  </Stack>
                </Box>

                {user.role.toString() === Role.LECTURER && (
                  <Tooltip title="Add new task to this checkpoint">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion from expanding
                        handleOpenCreateModal(cp.id);
                      }}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                        },
                      }}
                    >
                      <TbPlus size={18} />
                    </IconButton>
                  </Tooltip>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <CheckpointTask
                  checkpointId={cp.id}
                  projectId={props.projectId}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>

      {selectedCheckpoint && (
        <CreateTaskModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          projectId={props.projectId}
          checkpointId={selectedCheckpoint}
        />
      )}
    </Box>
  );
};

export default ProjectCheckpoint;
