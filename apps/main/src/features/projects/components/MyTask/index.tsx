import React from 'react';
import { Box, Card, Typography, Skeleton, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ProjectApi } from '@libs';
import dayjs from 'dayjs';

const MyTask: React.FC = () => {
  const query = useQuery({
    queryKey: ['myTasks'],
    queryFn: () =>
      ProjectApi.getMyCheckpointTaskList({
        pageSize: 3,
      }),
  });

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM HH:mm');
  };

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        mx: 'auto',
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        My Tasks
      </Typography>

      {/* Loading state */}
      {query.isLoading &&
        Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={80}
              sx={{ mb: 2, borderRadius: 2 }}
            />
          ))}

      {query.isError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          Failed to load tasks. Please try again.
        </Alert>
      )}

      {query.isSuccess && query.data?.items.length === 0 && (
        <Alert severity="info" sx={{ mt: 1 }}>
          You don't have any tasks right now.
        </Alert>
      )}

      {query.isSuccess &&
        query.data?.items.map((task) => (
          <Card
            key={task.id}
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              boxShadow: 'none',
              '&:last-child': {
                mb: 0,
              },
              '&:hover': {
                borderColor: 'primary.main',
              },
              transition: 'all 0.2s',
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Deadline: {formatDate(task.endTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Project: {task.name}
            </Typography>
          </Card>
        ))}
    </Box>
  );
};

export default MyTask;
