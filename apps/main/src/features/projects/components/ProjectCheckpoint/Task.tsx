import { CheckpointTaskStatus, ProjectApi } from '@libs';
import {
  Alert,
  AlertTitle,
  Box,
  Grid2 as Grid,
  LinearProgress,
  Paper,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  TbCheck,
  TbClock,
  TbListCheck,
  TbProgress,
  TbRotate,
  TbX,
} from 'react-icons/tb';

// Helper function to get status information
const getStatusInfo = (status: CheckpointTaskStatus) => {
  const statusMap = {
    [CheckpointTaskStatus.Pending]: {
      label: 'Pending',
      color: 'warning',
      icon: <TbClock size={16} />,
      bg: '#FFF8E1',
      borderColor: '#FFB74D',
    },
    [CheckpointTaskStatus.InProgress]: {
      label: 'In Progress',
      color: 'info',
      icon: <TbProgress size={16} />,
      bg: '#E3F2FD',
      borderColor: '#64B5F6',
    },
    [CheckpointTaskStatus.PendingReview]: {
      label: 'Pending Review',
      color: 'secondary',
      icon: <TbRotate size={16} />,
      bg: '#F3E5F5',
      borderColor: '#AB47BC',
    },
    [CheckpointTaskStatus.Completed]: {
      label: 'Completed',
      color: 'success',
      icon: <TbCheck size={16} />,
      bg: '#E8F5E9',
      borderColor: '#66BB6A',
    },
    [CheckpointTaskStatus.Failed]: {
      label: 'Failed',
      color: 'error',
      icon: <TbX size={16} />,
      bg: '#FFEBEE',
      borderColor: '#EF5350',
    },
  };

  return statusMap[status] || statusMap[CheckpointTaskStatus.Pending];
};

const CheckpointTask: React.FC<{
  checkpointId: string;
  projectId: string;
}> = ({ checkpointId, projectId }) => {
  const theme = useTheme();

  const query = useQuery({
    queryKey: ['taskList', projectId, checkpointId],
    queryFn: () =>
      ProjectApi.getCheckpointTaskList({
        projectId,
        checkpointId,
      }),
  });

  if (query.isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {[1, 2].map((i) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
              key={i}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  height: 180,
                  opacity: 0.6,
                  background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (query.isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to load tasks. Please try again.
        </Alert>
      </Box>
    );
  }

  if (!query.data?.items.length) {
    return (
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          bgcolor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Box sx={{ mb: 2, color: theme.palette.text.secondary }}>
          <TbListCheck size={48} style={{ opacity: 0.5 }} />
        </Box>
        <Typography variant="body1" fontWeight={500} gutterBottom>
          No tasks found
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ maxWidth: 300 }}
        >
          Tasks for this checkpoint will appear here once created.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2.5}>
        {query.data.items.map((task) => {
          const statusInfo = getStatusInfo(task.status);

          return (
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
              key={task.id}
            >
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: alpha(statusInfo.borderColor, 0.5),
                  '&:hover': {
                    borderColor: statusInfo.borderColor,
                    boxShadow: `0 4px 12px ${alpha(
                      statusInfo.borderColor,
                      0.2
                    )}`,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                {/* Header with status */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2.5,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: alpha(statusInfo.bg, 0.5),
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: `${statusInfo.color}.dark`,
                      mr: 2,
                    }}
                  >
                    {statusInfo.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color={`${statusInfo.color}.dark`}
                  >
                    {task.statusName || statusInfo.label}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      lineHeight: 1.3,
                      mb: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {task.name}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {task.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CheckpointTask;
